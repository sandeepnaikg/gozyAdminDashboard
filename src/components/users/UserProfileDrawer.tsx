import { useEffect, useRef } from 'react'
import { X, Mail, Phone, MapPin, Calendar, Shield, TrendingUp, Package, DollarSign } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { User } from '@/types/user'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatDate, formatCurrency } from '@/lib/utils'

interface UserProfileDrawerProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
}

export const UserProfileDrawer = ({ user, isOpen, onClose }: UserProfileDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const items = contentRef.current.querySelectorAll('.animate-item')
      gsap.fromTo(
        items,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
        }
      )
    }
  }, [isOpen, user])

  if (!user) return null

  const getRiskBadgeVariant = (score: number) => {
    if (score < 30) return 'success'
    if (score < 60) return 'warning'
    return 'danger'
  }

  const getStatusBadgeVariant = (status: string) => {
    if (status === 'active') return 'success'
    if (status === 'pending') return 'warning'
    return 'danger'
  }

  const getKYCBadgeVariant = (status: string) => {
    if (status === 'verified') return 'success'
    if (status === 'pending') return 'warning'
    return 'danger'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-2xl bg-background border-l border-border z-50 overflow-y-auto shadow-2xl"
          >
            <div ref={contentRef} className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6 animate-item">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold shadow-glow">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X size={20} />
                </Button>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2 mb-6 animate-item">
                <Badge variant={getStatusBadgeVariant(user.status)}>
                  {user.status}
                </Badge>
                <Badge variant={getKYCBadgeVariant(user.kycStatus)}>
                  KYC: {user.kycStatus}
                </Badge>
                <Badge variant={getRiskBadgeVariant(user.riskScore)}>
                  Risk Score: {user.riskScore}
                </Badge>
                {user.tags?.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Contact Info */}
              <div className="glass rounded-lg p-4 mb-6 animate-item">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Shield className="mr-2" size={18} />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail className="mr-3 text-primary" size={16} />
                    <span className="text-muted-foreground mr-2">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="mr-3 text-primary" size={16} />
                    <span className="text-muted-foreground mr-2">Phone:</span>
                    <span>{user.phone}</span>
                  </div>
                  {user.address && (
                    <div className="flex items-start text-sm">
                      <MapPin className="mr-3 text-primary flex-shrink-0 mt-0.5" size={16} />
                      <div>
                        <span className="text-muted-foreground mr-2">Address:</span>
                        <span>
                          {user.address.street}, {user.address.city}, {user.address.state} {user.address.zip}, {user.address.country}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-3 text-primary" size={16} />
                    <span className="text-muted-foreground mr-2">Signup Date:</span>
                    <span>{formatDate(user.signupDate)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-3 text-primary" size={16} />
                    <span className="text-muted-foreground mr-2">Last Login:</span>
                    <span>{user.lastLogin ? formatDate(user.lastLogin) : 'Never'}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <motion.div
                  className="glass rounded-lg p-4 text-center animate-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <Package className="mx-auto mb-2 text-primary" size={24} />
                  <p className="text-2xl font-bold">{user.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">Total Orders</p>
                </motion.div>
                <motion.div
                  className="glass rounded-lg p-4 text-center animate-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <DollarSign className="mx-auto mb-2 text-green-500" size={24} />
                  <p className="text-2xl font-bold">{formatCurrency(user.totalSpent)}</p>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                </motion.div>
                <motion.div
                  className="glass rounded-lg p-4 text-center animate-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <TrendingUp className="mx-auto mb-2 text-blue-500" size={24} />
                  <p className="text-2xl font-bold">${(user.totalSpent / user.totalOrders).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Avg Order</p>
                </motion.div>
              </div>

              {/* Devices */}
              {user.devices && user.devices.length > 0 && (
                <div className="glass rounded-lg p-4 mb-6 animate-item">
                  <h3 className="font-semibold mb-4">Devices</h3>
                  <div className="space-y-3">
                    {user.devices.map(device => (
                      <div key={device.id} className="text-sm border-b border-white/10 pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{device.deviceType}</span>
                          <Badge variant="secondary">v{device.appVersion}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <p>IP: {device.lastIP}</p>
                          <p>Last seen: {formatDate(device.lastSeen)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 animate-item">
                <Button
                  variant={user.status === 'blocked' ? 'default' : 'destructive'}
                  className="flex-1"
                >
                  {user.status === 'blocked' ? 'Unblock User' : 'Block User'}
                </Button>
                <Button variant="outline" className="flex-1">
                  View Orders
                </Button>
                <Button variant="outline" className="flex-1">
                  View KYC
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
