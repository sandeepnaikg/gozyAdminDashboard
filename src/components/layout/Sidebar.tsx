import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  Plane,
  Ticket,
  ShoppingBag,
  Bike,
  Store,
  Headphones,
  DollarSign,
  FileText,
  Bell,
  BarChart3,
  Settings,
  FileWarning,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'User Management', href: '/users', icon: Users },
  { name: 'Food Delivery', href: '/food', icon: UtensilsCrossed },
  { name: 'Travel Bookings', href: '/travel', icon: Plane },
  { name: 'Tickets & Events', href: '/tickets', icon: Ticket },
  { name: 'Shopping', href: '/shopping', icon: ShoppingBag },
  { name: 'Riders', href: '/riders', icon: Bike },
  { name: 'Vendors & Partners', href: '/vendors', icon: Store },
  { name: 'Operations', href: '/operations', icon: Headphones },
  { name: 'Finance', href: '/finance', icon: DollarSign },
  { name: 'CMS', href: '/cms', icon: FileText },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Logs & Monitoring', href: '/logs', icon: FileWarning },
]

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0, width: collapsed ? 80 : 280 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-screen glass border-r border-white/10 overflow-hidden z-50"
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <motion.div
            animate={{ opacity: collapsed ? 0 : 1 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            {!collapsed && (
              <span className="text-xl font-bold text-gradient">Gozy Admin</span>
            )}
          </motion.div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link key={item.name} to={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer',
                      isActive
                        ? 'bg-primary text-white shadow-glow'
                        : 'hover:bg-white/5 text-muted-foreground'
                    )}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    {!collapsed && (
                      <span className="text-sm font-medium truncate">
                        {item.name}
                      </span>
                    )}
                    {isActive && !collapsed && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className={cn('flex items-center space-x-3', collapsed && 'justify-center')}>
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-white font-semibold text-sm">SA</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Super Admin</p>
                <p className="text-xs text-muted-foreground truncate">admin@gozy.com</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
