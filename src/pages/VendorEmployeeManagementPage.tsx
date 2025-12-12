import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus,
  Search,
  Filter,
  Shield,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
  Key,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { graphqlRequest } from '@/lib/apolloClient';
import {
  GET_VENDOR_EMPLOYEES,
  GET_RBAC_ROLES,
  GET_APP_FEATURES,
  CREATE_VENDOR_EMPLOYEE,
  UPDATE_VENDOR_EMPLOYEE,
  DELETE_VENDOR_EMPLOYEE,
  ASSIGN_EMPLOYEE_ROLE,
  GRANT_SERVICE_PERMISSION,
  LOG_AUDIT_ENTRY,
} from '@/graphql/queries/rbac';
import { VendorEmployee, RbacRole, AppFeature, ServiceType } from '@/types/rbac';
import { formatDate } from '@/lib/utils';
import EmployeeFormModal from '@/components/vendor/EmployeeFormModal';
import EmployeePermissionsDrawer from '@/components/vendor/EmployeePermissionsDrawer';
import RoleAssignmentModal from '@/components/vendor/RoleAssignmentModal';

export default function VendorEmployeeManagementPage() {
  const [employees, setEmployees] = useState<VendorEmployee[]>([]);
  const [roles, setRoles] = useState<RbacRole[]>([]);
  const [features, setFeatures] = useState<AppFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isPermissionsDrawerOpen, setIsPermissionsDrawerOpen] = useState(false);
  
  const [selectedEmployee, setSelectedEmployee] = useState<VendorEmployee | null>(null);

  // Get vendor account ID from localStorage or auth context
  const vendorAccountId = localStorage.getItem('vendorAccountId') || '';
  const currentEmployeeId = localStorage.getItem('employeeId') || '';

  useEffect(() => {
    fetchData();
  }, [vendorAccountId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch employees
      const employeesResponse = await graphqlRequest({
        query: GET_VENDOR_EMPLOYEES,
        variables: { vendorAccountId },
      });
      
      // Fetch roles
      const rolesResponse = await graphqlRequest({
        query: GET_RBAC_ROLES,
        variables: { vendorAccountId },
      });
      
      // Fetch features
      const featuresResponse = await graphqlRequest({
        query: GET_APP_FEATURES,
      });

      if (employeesResponse.data) {
        setEmployees(employeesResponse.data.vendor_employee_accounts || []);
      }
      
      if (rolesResponse.data) {
        setRoles(rolesResponse.data.rbac_roles || []);
      }
      
      if (featuresResponse.data) {
        setFeatures(featuresResponse.data.app_features || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEmployee = async (formData: any) => {
    try {
      // Hash password (in production, do this on backend)
      const passwordHash = btoa(formData.password); // Replace with proper bcrypt in production
      
      const response = await graphqlRequest({
        query: CREATE_VENDOR_EMPLOYEE,
        variables: {
          vendorAccountId,
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          passwordHash,
        },
      });

      if (response.data?.insert_vendor_employee_accounts_one) {
        const newEmployee = response.data.insert_vendor_employee_accounts_one;
        
        // Assign role if provided
        if (formData.role_id) {
          await assignRole(newEmployee.id, formData.role_id);
        }
        
        // Log audit
        await logAudit({
          action: 'create_employee',
          targetEmployeeId: newEmployee.id,
          payload: { email: formData.email, name: formData.name },
        });
        
        // Refresh data
        await fetchData();
        setIsCreateModalOpen(false);
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Failed to create employee. Please try again.');
    }
  };

  const handleUpdateEmployee = async (employeeId: string, formData: any) => {
    try {
      const response = await graphqlRequest({
        query: UPDATE_VENDOR_EMPLOYEE,
        variables: {
          employeeId,
          ...formData,
        },
      });

      if (response.data) {
        await logAudit({
          action: 'update_employee',
          targetEmployeeId: employeeId,
          payload: formData,
        });
        
        await fetchData();
        setIsEditModalOpen(false);
        setSelectedEmployee(null);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee. Please try again.');
    }
  };

  const handleDeleteEmployee = async () => {
    if (!selectedEmployee) return;
    
    try {
      const response = await graphqlRequest({
        query: DELETE_VENDOR_EMPLOYEE,
        variables: { employeeId: selectedEmployee.id },
      });

      if (response.data) {
        await logAudit({
          action: 'delete_employee',
          targetEmployeeId: selectedEmployee.id,
          payload: { email: selectedEmployee.email },
        });
        
        await fetchData();
        setIsDeleteModalOpen(false);
        setSelectedEmployee(null);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee. Please try again.');
    }
  };

  const assignRole = async (employeeId: string, roleId: string) => {
    try {
      // Get role features to build navigation access
      const role = roles.find(r => r.id === roleId);
      const navigationAccess = {
        features: features
          .filter(f => f.is_active)
          .map(f => ({
            key: f.feature_key,
            label: f.label,
            route: f.route,
            icon: f.icon,
            canView: true, // Will be refined based on role_features
            canEdit: false,
            canDelete: false,
          })),
      };

      const response = await graphqlRequest({
        query: ASSIGN_EMPLOYEE_ROLE,
        variables: {
          employeeId,
          roleId,
          vendorAccountId,
          navigationAccess,
        },
      });

      if (response.data) {
        await logAudit({
          action: 'assign_role',
          targetEmployeeId: employeeId,
          resourceType: 'role',
          resourceId: roleId,
          payload: { role_key: role?.role_key },
        });
      }
    } catch (error) {
      console.error('Error assigning role:', error);
      throw error;
    }
  };

  const handleRoleAssignment = async (employeeId: string, roleId: string) => {
    try {
      await assignRole(employeeId, roleId);
      await fetchData();
      setIsRoleModalOpen(false);
      setSelectedEmployee(null);
    } catch (error) {
      alert('Failed to assign role. Please try again.');
    }
  };

  const logAudit = async (params: {
    action: string;
    targetEmployeeId?: string;
    resourceType?: string;
    resourceId?: string;
    payload?: any;
  }) => {
    try {
      await graphqlRequest({
        query: LOG_AUDIT_ENTRY,
        variables: {
          vendorAccountId,
          actorEmployeeId: currentEmployeeId || null,
          targetEmployeeId: params.targetEmployeeId || null,
          action: params.action,
          resourceType: params.resourceType || null,
          resourceId: params.resourceId || null,
          payload: params.payload || {},
          ipAddress: null, // Get from request in production
          userAgent: navigator.userAgent,
        },
      });
    } catch (error) {
      console.error('Error logging audit:', error);
    }
  };

  // Filter employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole =
      filterRole === 'all' ||
      emp.user_mapping?.role?.role_key === filterRole;
    
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && emp.is_active) ||
      (filterStatus === 'inactive' && !emp.is_active);

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Stats
  const stats = {
    total: employees.length,
    active: employees.filter((e) => e.is_active).length,
    inactive: employees.filter((e) => !e.is_active).length,
    withRoles: employees.filter((e) => e.user_mapping?.role).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600 mt-1">Manage vendor employees and their permissions</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">With Roles</p>
                <p className="text-2xl font-bold text-purple-600">{stats.withRoles}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Key className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4 text-gray-400" />}
              />
            </div>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              {roles.map((role) => (
                <option key={role.id} value={role.role_key}>
                  {role.display_name}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employees ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredEmployees.map((employee) => (
                    <motion.tr
                      key={employee.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.phone || '-'}</TableCell>
                      <TableCell>
                        {employee.user_mapping?.role ? (
                          <Badge variant="default">
                            {employee.user_mapping.role.display_name}
                          </Badge>
                        ) : (
                          <Badge variant="secondary">No Role</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {employee.is_active ? (
                          <Badge variant="success">Active</Badge>
                        ) : (
                          <Badge variant="destructive">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {employee.last_login_at
                          ? formatDate(employee.last_login_at)
                          : 'Never'}
                      </TableCell>
                      <TableCell>{formatDate(employee.created_at)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setIsRoleModalOpen(true);
                            }}
                            title="Assign Role"
                          >
                            <Key className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setIsPermissionsDrawerOpen(true);
                            }}
                            title="Manage Permissions"
                          >
                            <Shield className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setIsEditModalOpen(true);
                            }}
                            title="Edit Employee"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setIsDeleteModalOpen(true);
                            }}
                            title="Delete Employee"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>

            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No employees found</p>
                <p className="text-sm text-gray-500 mt-1">
                  {searchQuery || filterRole !== 'all' || filterStatus !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Add your first employee to get started'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <EmployeeFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateEmployee}
        roles={roles}
        mode="create"
      />

      {selectedEmployee && (
        <>
          <EmployeeFormModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedEmployee(null);
            }}
            onSubmit={(data) => handleUpdateEmployee(selectedEmployee.id, data)}
            employee={selectedEmployee}
            roles={roles}
            mode="edit"
          />

          <RoleAssignmentModal
            isOpen={isRoleModalOpen}
            onClose={() => {
              setIsRoleModalOpen(false);
              setSelectedEmployee(null);
            }}
            onAssign={handleRoleAssignment}
            employee={selectedEmployee}
            roles={roles}
          />

          <EmployeePermissionsDrawer
            isOpen={isPermissionsDrawerOpen}
            onClose={() => {
              setIsPermissionsDrawerOpen(false);
              setSelectedEmployee(null);
            }}
            employee={selectedEmployee}
            features={features}
            onUpdate={fetchData}
          />

          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedEmployee(null);
            }}
            title="Delete Employee"
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                Are you sure you want to delete employee <strong>{selectedEmployee.name}</strong>?
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedEmployee(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteEmployee}
                >
                  Delete Employee
                </Button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}
