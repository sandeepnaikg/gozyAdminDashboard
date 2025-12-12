import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { loginUser } from '@/api/auth'
import { Lock, Mail, AlertCircle } from 'lucide-react'

const LoginPage = () => {
  const navigate = useNavigate()
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setIsLoading(true)
    
    try {
      // First, try vendor account owner login from Hasura
      const vendorAccountResult = await tryVendorAccountLogin(loginForm.email, loginForm.password);
      if (vendorAccountResult) {
        return; // Successfully logged in as vendor account owner
      }

      // Second, try vendor employee login (any employee with password123)
      if (loginForm.password === 'password123') {
        const employeeResult = await handleVendorEmployeeLogin(loginForm.email);
        if (employeeResult) {
          return; // Successfully logged in as vendor employee
        }
      }
      
      // If neither vendor owner nor employee login worked, show error
      // (Commenting out API fallback since it's not configured yet)
      setLoginError('Invalid email or password. Use vendor owner/employee credentials.')
      
      /* Uncomment when backend API is ready:
      const result = await loginUser(loginForm.email, loginForm.password)
      if (result.token && result.user) {
        navigate('/dashboard')
        window.location.reload()
      } else {
        setLoginError('Invalid response from server')
      }
      */
    } catch (error: any) {
      console.error('Login error:', error)
      setLoginError(
        error.response?.data?.message || 
        error.message || 
        'Login failed. Please check your credentials.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const tryVendorAccountLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      // Check if vendor account exists (simplified check - in production, validate password hash)
      const response = await fetch('https://db.gozy.online/v1/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'adminsecret'
        },
        body: JSON.stringify({
          query: `
            query GetVendorAccount($email: String!) {
              vendor_accounts(where: {email: {_eq: $email}}, limit: 1) {
                id
                email
                vendor_profile {
                  business_name
                  contact_person_name
                }
              }
            }
          `,
          variables: { email }
        })
      });

      const { data } = await response.json();
      const vendor = data?.vendor_accounts?.[0];

      if (!vendor) {
        return false; // Not a vendor account
      }

      // For now, accept any password for testing (in production, validate bcrypt hash)
      // Create vendor owner user object with full super admin permissions
      const vendorOwner = {
        id: vendor.id,
        email: vendor.email,
        name: vendor.vendor_profile?.contact_person_name || 'Vendor Owner',
        vendor_account_id: vendor.id,
        vendor_name: vendor.vendor_profile?.business_name || 'Vendor Account',
        role: { 
          role_key: 'vendor_owner', 
          display_name: 'Vendor Owner' 
        },
        permissions: {
          dashboard: { view: true, create: true, edit: true, delete: true },
          users: { view: true, create: true, edit: true, delete: true },
          vendors: { view: true, create: true, edit: true, delete: true },
          finance: { view: true, create: true, edit: true, delete: true },
          analytics: { view: true, create: true, edit: true, delete: true },
          food: { view: true, create: true, edit: true, delete: true },
          travel: { view: true, create: true, edit: true, delete: true },
          tickets: { view: true, create: true, edit: true, delete: true },
          shopping: { view: true, create: true, edit: true, delete: true },
          riders: { view: true, create: true, edit: true, delete: true },
          settings: { view: true, create: true, edit: true, delete: true },
          notifications: { view: true, create: true, edit: true, delete: true },
          operations: { view: true, create: true, edit: true, delete: true },
          cms: { view: true, create: true, edit: true, delete: true },
          logs: { view: true, create: true, edit: true, delete: true },
          monitoring: { view: true, create: true, edit: true, delete: true },
          vendor_employees: { view: true, create: true, edit: true, delete: true }
        },
        servicePermissions: [
          { service_type: 'hotel', can_view: true, can_edit: true, can_delete: true },
          { service_type: 'flight', can_view: true, can_edit: true, can_delete: true },
          { service_type: 'train', can_view: true, can_edit: true, can_delete: true },
          { service_type: 'food', can_view: true, can_edit: true, can_delete: true },
          { service_type: 'shopping', can_view: true, can_edit: true, can_delete: true },
          { service_type: 'tickets', can_view: true, can_edit: true, can_delete: true },
          { service_type: 'riders', can_view: true, can_edit: true, can_delete: true }
        ],
        navigationAccess: [
          'dashboard', 'users', 'vendors', 'finance', 'analytics', 
          'food', 'travel', 'tickets', 'shopping', 'riders', 
          'settings', 'notifications', 'operations', 'cms', 'logs', 'monitoring',
          'vendor_employees'
        ],
        accountType: 'vendor_owner'
      };

      // Store in localStorage
      localStorage.setItem('rbac_user', JSON.stringify(vendorOwner));
      localStorage.setItem('rbac_permissions', JSON.stringify(vendorOwner.permissions));
      localStorage.setItem('access_token', 'mock_token_' + Date.now());
      localStorage.setItem('vendorAccountId', vendor.id);

      // Navigate to dashboard
      navigate('/dashboard');
      window.location.reload();
      
      return true;
    } catch (error) {
      console.error('Vendor account check error:', error);
      return false;
    }
  }

  const handleVendorEmployeeLogin = async (email: string): Promise<boolean> => {
    try {
      // Fetch employee data from Hasura
      const response = await fetch('https://db.gozy.online/v1/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'adminsecret'
        },
        body: JSON.stringify({
          query: `
            query GetEmployeeByEmail($email: String!) {
              vendor_employee_accounts(where: {email: {_eq: $email}, is_active: {_eq: true}}, limit: 1) {
                id
                email
                name
                vendor_account_id
                vendor_account {
                  vendor_profile {
                    business_name
                  }
                }
                user_mapping {
                  role {
                    id
                    role_key
                    display_name
                    role_features {
                      feature {
                        feature_key
                        display_name
                      }
                      can_read
                      can_write
                      can_delete
                    }
                  }
                }
                service_permissions {
                  service_type
                  can_read
                  can_write
                  can_delete
                }
              }
            }
          `,
          variables: { email }
        })
      });

      const { data } = await response.json();
      const employee = data?.vendor_employee_accounts?.[0];

      if (!employee) {
        return false; // Not an employee account
      }

      // Map role features to permissions
      const permissions: any = {};
      const navigationAccess: string[] = [];
      const roleFeatures = employee.user_mapping?.role?.role_features || [];
      
      roleFeatures.forEach((rf: any) => {
        const featureKey = rf.feature.feature_key;
        permissions[featureKey] = { 
          view: rf.can_read, 
          create: rf.can_write, 
          edit: rf.can_write, 
          delete: rf.can_delete 
        };
        if (rf.can_read) {
          navigationAccess.push(featureKey);
        }
      });

      // Create user object for localStorage
      const adminUser = {
        id: employee.id,
        email: employee.email,
        name: employee.name,
        vendor_account_id: employee.vendor_account_id,
        vendor_name: employee.vendor_account?.vendor_profile?.business_name || 'Unknown Vendor',
        role: employee.user_mapping?.role || { role_key: 'vendor_viewer', display_name: 'Viewer' },
        permissions,
        servicePermissions: employee.service_permissions || [],
        navigationAccess
      };

      // Store in localStorage
      localStorage.setItem('rbac_user', JSON.stringify(adminUser));
      localStorage.setItem('rbac_permissions', JSON.stringify(permissions));
      localStorage.setItem('access_token', 'mock_token_' + Date.now());
      localStorage.setItem('vendorAccountId', employee.vendor_account_id);

      // Navigate to dashboard
      navigate('/dashboard');
      window.location.reload();
      
      return true;
    } catch (error) {
      console.error('Vendor employee login error:', error);
      return false;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4 shadow-glow">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to access your admin dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{loginError}</span>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email Address</span>
              </label>
              <Input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="admin@gozy.com"
                required
                disabled={isLoading}
                className="h-12 glass border-white/20 focus:border-purple-500/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </label>
              <Input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="h-12 glass border-white/20 focus:border-purple-500/50 transition-all"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold shadow-glow"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>

            <div className="pt-4 text-center space-y-3">
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-1">
                  Vendor Owner Account:
                </p>
                <p className="text-xs text-muted-foreground">
                  contact@skyways.com / any password
                </p>
              </div>
              <div className="border-t border-white/10 pt-2">
                <p className="text-xs text-muted-foreground font-semibold mb-1">
                  Vendor Employee Accounts:
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>admin@skyways.com / password123</p>
                  <p>ops@skyways.com / password123</p>
                  <p>finance@skyways.com / password123</p>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-muted-foreground">
              © 2025 Gozy Admin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
