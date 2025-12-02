import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  Globe,
  Palette,
  Database,
  Mail,
  Shield,
  Save,
  ToggleLeft,
  ToggleRight,
  Eye,
  Edit2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [selectedSetting, setSelectedSetting] = useState<any>(null)

  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll('.settings-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      )
    }
  }, [])

  const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button onClick={onChange} className="focus:outline-none">
      {enabled ? (
        <ToggleRight size={32} className="text-green-500" />
      ) : (
        <ToggleLeft size={32} className="text-gray-500" />
      )}
    </button>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Settings</h1>
          <p className="text-muted-foreground mt-1">Platform settings and configurations</p>
        </div>
        <Button>
          <Save size={18} className="mr-2" />
          Save Changes
        </Button>
      </div>

      <div ref={statsRef} className="space-y-4">
        <motion.div 
          className="settings-card cursor-pointer" 
          whileHover={{ scale: 1.01 }}
          onClick={() => setSelectedSetting({
            category: 'Account',
            title: 'Account Settings',
            fields: [
              { label: 'Admin Name', value: 'Gozy Admin', type: 'text' },
              { label: 'Email Address', value: 'admin@gozy.com', type: 'email' },
              { label: 'Phone Number', value: '+91 98765 43210', type: 'tel' }
            ],
            lastUpdated: '5 days ago'
          })}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" size={20} />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Admin Name</label>
                <Input defaultValue="Gozy Admin" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input type="email" defaultValue="admin@gozy.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input type="tel" defaultValue="+91 98765 43210" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="settings-card cursor-pointer" 
          whileHover={{ scale: 1.01 }}
          onClick={() => setSelectedSetting({
            category: 'Notifications',
            title: 'Notification Settings',
            settings: [
              { name: 'Push Notifications', enabled: notificationsEnabled, description: 'Receive push notifications for important updates' },
              { name: 'Email Notifications', enabled: true, description: 'Receive email notifications for reports and alerts' },
              { name: 'SMS Alerts', enabled: false, description: 'Critical alerts via SMS' }
            ],
            channels: 3,
            activeChannels: 2
          })}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2" size={20} />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive push notifications for important updates</p>
                </div>
                <Toggle enabled={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} />
              </div>
              <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email notifications for reports and alerts</p>
                </div>
                <Toggle enabled={true} onChange={() => {}} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="settings-card cursor-pointer" 
          whileHover={{ scale: 1.01 }}
          onClick={() => setSelectedSetting({
            category: 'Security',
            title: 'Security Settings',
            settings: [
              { name: 'Two-Factor Authentication', enabled: twoFactorAuth, description: 'Add an extra layer of security to your account', method: 'SMS' },
              { name: 'Session Timeout', value: '30 minutes', description: 'Auto logout after inactivity' },
              { name: 'Password Policy', value: 'Strong', requirements: ['12+ characters', 'Uppercase & lowercase', 'Numbers & symbols'] }
            ],
            lastPasswordChange: '23 days ago'
          })}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2" size={20} />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Toggle enabled={twoFactorAuth} onChange={() => setTwoFactorAuth(!twoFactorAuth)} />
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <label className="block text-sm font-medium mb-2">Change Password</label>
                <div className="flex gap-2">
                  <Input type="password" placeholder="New password" />
                  <Button>Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="settings-card cursor-pointer" 
          whileHover={{ scale: 1.01 }}
          onClick={() => setSelectedSetting({
            category: 'Appearance',
            title: 'Appearance Settings',
            settings: [
              { name: 'Dark Mode', enabled: darkMode, description: 'Toggle dark mode theme' },
              { name: 'Theme Color', value: 'Purple', options: ['Purple', 'Blue', 'Green', 'Orange'] },
              { name: 'Font Size', value: 'Medium', options: ['Small', 'Medium', 'Large'] }
            ]
          })}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2" size={20} />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
                </div>
                <Toggle enabled={darkMode} onChange={() => setDarkMode(!darkMode)} />
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <label className="block text-sm font-medium mb-2">Theme Color</label>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-600 cursor-pointer border-2 border-white" />
                  <div className="w-10 h-10 rounded-full bg-blue-600 cursor-pointer" />
                  <div className="w-10 h-10 rounded-full bg-green-600 cursor-pointer" />
                  <div className="w-10 h-10 rounded-full bg-orange-600 cursor-pointer" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="settings-card cursor-pointer" 
          whileHover={{ scale: 1.01 }}
          onClick={() => setSelectedSetting({
            category: 'System',
            title: 'System Settings',
            settings: [
              { name: 'API Endpoint', value: 'https://api.gozy.com/v1', type: 'url' },
              { name: 'Database Connection', value: 'postgres://gozy-prod.db', type: 'connection' },
              { name: 'Cache Duration', value: '15 minutes', type: 'duration' }
            ],
            version: '2.1.0',
            lastRestart: '12 hours ago'
          })}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2" size={20} />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div onClick={(e) => e.stopPropagation()}>
                <label className="block text-sm font-medium mb-2">API Endpoint</label>
                <Input defaultValue="https://api.gozy.com/v1" />
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <label className="block text-sm font-medium mb-2">Database Connection</label>
                <Input defaultValue="postgres://gozy-prod.db" />
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <label className="block text-sm font-medium mb-2">Cache Duration (minutes)</label>
                <Input type="number" defaultValue="15" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Modal
        isOpen={selectedSetting !== null}
        onClose={() => setSelectedSetting(null)}
        title={selectedSetting?.title || 'Setting Details'}
        size="md"
      >
        {selectedSetting && (
          <div className="space-y-4">
            <div className="glass rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Category</p>
              <p className="font-bold text-lg">{selectedSetting.category}</p>
            </div>
            {selectedSetting.fields && (
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-3">Account Information</p>
                <div className="space-y-3">
                  {selectedSetting.fields.map((field: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{field.label}</span>
                      <span className="font-medium">{field.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedSetting.settings && (
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-3">Settings ({selectedSetting.settings.length})</p>
                <div className="space-y-2">
                  {selectedSetting.settings.map((setting: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-black/20 rounded">
                      <div className="flex-1">
                        <p className="font-medium">{setting.name}</p>
                        {setting.description && <p className="text-xs text-muted-foreground">{setting.description}</p>}
                      </div>
                      {setting.enabled !== undefined ? (
                        <Badge variant={setting.enabled ? 'success' : 'destructive'}>
                          {setting.enabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                      ) : (
                        <span className="text-sm font-medium">{setting.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedSetting.channels && (
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">Total Channels</p>
                  <p className="text-2xl font-bold">{selectedSetting.channels}</p>
                </div>
                <div className="glass rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-green-500">{selectedSetting.activeChannels}</p>
                </div>
              </div>
            )}
            {selectedSetting.version && (
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">Version</p>
                  <p className="text-xl font-bold">{selectedSetting.version}</p>
                </div>
                <div className="glass rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">Last Restart</p>
                  <p className="text-xl font-bold">{selectedSetting.lastRestart}</p>
                </div>
              </div>
            )}
            {selectedSetting.lastUpdated && (
              <p className="text-sm text-muted-foreground">Last updated: {selectedSetting.lastUpdated}</p>
            )}
            {selectedSetting.lastPasswordChange && (
              <p className="text-sm text-muted-foreground">Last password change: {selectedSetting.lastPasswordChange}</p>
            )}
            <div className="flex gap-2">
              <Button className="flex-1"><Edit2 size={16} className="mr-2" />Edit Setting</Button>
              <Button variant="outline" className="flex-1"><Eye size={16} className="mr-2" />View History</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
