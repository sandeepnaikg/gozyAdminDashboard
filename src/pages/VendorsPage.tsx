import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Store,
  UtensilsCrossed,
  Wrench,
  ShoppingCart,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Search,
  Filter,
  Download,
  Plus,
  BarChart3,
  FileText,
  MapPin,
  Phone,
  Mail,
  Shield,
  Award,
  CreditCard,
  AlertTriangle,
  Plane,
  Ticket
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { mockVendors, mockVendorAnalytics, mockSettlements, mockComplaints, mockOnboarding, mockModuleVendors } from '@/lib/vendorMockData'
import { formatCurrency, formatIndianCurrency, formatDateTime } from '@/lib/utils'
import type { VendorType, VendorStatus } from '@/types/vendor'

export default function VendorsPage() {
  const [vendors] = useState(mockVendors)
  const [analytics] = useState(mockVendorAnalytics)
  const [settlements] = useState(mockSettlements)
  const [complaints] = useState(mockComplaints)
  const [onboarding] = useState(mockOnboarding)
  const [moduleVendors] = useState(mockModuleVendors)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<VendorStatus | 'all'>('all')
  const [filterType, setFilterType] = useState<VendorType | 'all'>('all')
  const statsRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll('.stat-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        }
      )
    }

    if (tableRef.current) {
      const rows = tableRef.current.querySelectorAll('tbody tr')
      gsap.fromTo(
        rows,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
        }
      )
    }
  }, [filterStatus, filterType])

  const stats = {
    totalVendors: vendors.length,
    activeVendors: vendors.filter(v => v.status === 'active').length,
    pendingApproval: vendors.filter(v => v.status === 'pending-approval').length,
    totalRevenue: vendors.reduce((sum, v) => sum + v.revenue.thisMonth, 0),
    pendingSettlement: vendors.reduce((sum, v) => sum + v.revenue.pendingSettlement, 0),
    avgRating: vendors.reduce((sum, v) => sum + v.performance.averageRating, 0) / vendors.length,
    totalOrders: vendors.reduce((sum, v) => sum + v.performance.totalOrders, 0),
    activeComplaints: complaints.filter(c => c.status !== 'resolved' && c.status !== 'closed').length
  }

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         v.vendorId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         v.legalName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || v.status === filterStatus
    const matchesType = filterType === 'all' || v.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: VendorStatus) => {
    const variants: Record<VendorStatus, 'success' | 'warning' | 'danger' | 'secondary'> = {
      active: 'success',
      inactive: 'secondary',
      'pending-approval': 'warning',
      suspended: 'danger',
      blacklisted: 'danger'
    }
    return variants[status] || 'secondary'
  }

  const getTierColor = (tier: string) => {
    const colors = {
      platinum: 'text-purple-500',
      gold: 'text-yellow-500',
      silver: 'text-gray-400',
      bronze: 'text-orange-500',
      basic: 'text-gray-500'
    }
    return colors[tier as keyof typeof colors] || 'text-gray-500'
  }

  const getVendorTypeIcon = (type: VendorType) => {
    const icons = {
      restaurant: UtensilsCrossed,
      store: Store,
      'service-provider': Wrench,
      'marketplace-seller': ShoppingCart
    }
    const Icon = icons[type]
    return <Icon size={16} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Vendors & Partners</h1>
          <p className="text-muted-foreground mt-1">
            Manage restaurants, stores, service providers, and marketplace sellers
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={18} className="mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus size={18} className="mr-2" />
            Add Vendor
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Vendors</p>
            <Store size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{stats.totalVendors}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active</p>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.activeVendors}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Pending</p>
            <Clock size={20} className="text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-500">{stats.pendingApproval}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <BarChart3 size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Month Revenue</p>
            <DollarSign size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">{formatIndianCurrency(stats.totalRevenue)}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Pending Payout</p>
            <CreditCard size={20} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold">{formatIndianCurrency(stats.pendingSettlement)}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Avg Rating</p>
            <Star size={20} className="text-yellow-500" />
          </div>
          <p className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Complaints</p>
            <AlertCircle size={20} className="text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-500">{stats.activeComplaints}</p>
        </motion.div>
      </div>

      {/* Vendor Type Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2" size={20} />
            Partner Category Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analytics.map((item, index) => (
              <motion.div
                key={item.vendorType}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getVendorTypeIcon(item.vendorType)}
                    <h4 className="font-semibold text-sm capitalize">
                      {item.vendorType.replace('-', ' ')}
                    </h4>
                  </div>
                  <Badge variant="success">+{item.growthRate}%</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-semibold">{item.totalVendors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active:</span>
                    <span className="font-semibold text-green-500">{item.activeVendors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="font-semibold">{formatIndianCurrency(item.totalRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Order:</span>
                    <span className="font-semibold">{formatCurrency(item.averageOrderValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Commission:</span>
                    <span className="font-semibold">{item.avgCommissionRate}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Module-wise Vendor Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2" size={20} />
            Vendors by Business Module
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Food Delivery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <UtensilsCrossed size={20} className="text-orange-500" />
                <h4 className="font-semibold">{moduleVendors.food.module}</h4>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Vendors:</span>
                  <span className="font-semibold">{moduleVendors.food.totalVendors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active:</span>
                  <span className="font-semibold text-green-500">{moduleVendors.food.activeVendors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenue:</span>
                  <span className="font-semibold">{formatIndianCurrency(moduleVendors.food.revenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Orders:</span>
                  <span className="font-semibold">{moduleVendors.food.totalOrders.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Rating:</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Star size={12} className="text-yellow-500" />
                    {moduleVendors.food.avgRating}
                  </span>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Top Performers:</p>
                {moduleVendors.food.topVendors.map((vendor, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between">
                      <span className="font-medium">{vendor.name}</span>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-yellow-500" />
                        <span>{vendor.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>{vendor.orders} orders</span>
                      <span>{formatIndianCurrency(vendor.revenue)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Shopping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <ShoppingCart size={20} className="text-purple-500" />
                <h4 className="font-semibold">{moduleVendors.shopping.module}</h4>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Vendors:</span>
                  <span className="font-semibold">{moduleVendors.shopping.totalVendors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active:</span>
                  <span className="font-semibold text-green-500">{moduleVendors.shopping.activeVendors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenue:</span>
                  <span className="font-semibold">{formatIndianCurrency(moduleVendors.shopping.revenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Orders:</span>
                  <span className="font-semibold">{moduleVendors.shopping.totalOrders.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Rating:</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Star size={12} className="text-yellow-500" />
                    {moduleVendors.shopping.avgRating}
                  </span>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Top Performers:</p>
                {moduleVendors.shopping.topVendors.map((vendor, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between">
                      <span className="font-medium">{vendor.name}</span>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-yellow-500" />
                        <span>{vendor.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>{vendor.orders} orders</span>
                      <span>{formatIndianCurrency(vendor.revenue)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Travel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <Plane size={20} className="text-blue-500" />
                <h4 className="font-semibold">{moduleVendors.travel.module}</h4>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Vendors:</span>
                  <span className="font-semibold">{moduleVendors.travel.totalVendors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active:</span>
                  <span className="font-semibold text-green-500">{moduleVendors.travel.activeVendors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenue:</span>
                  <span className="font-semibold">{formatIndianCurrency(moduleVendors.travel.revenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Orders:</span>
                  <span className="font-semibold">{moduleVendors.travel.totalOrders.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Rating:</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Star size={12} className="text-yellow-500" />
                    {moduleVendors.travel.avgRating}
                  </span>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Top Performers:</p>
                {moduleVendors.travel.topVendors.map((vendor, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between">
                      <span className="font-medium">{vendor.name}</span>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-yellow-500" />
                        <span>{vendor.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>{vendor.orders} bookings</span>
                      <span>{formatIndianCurrency(vendor.revenue)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Events & Tickets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <Ticket size={20} className="text-pink-500" />
                <h4 className="font-semibold">{moduleVendors.events.module}</h4>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Vendors:</span>
                  <span className="font-semibold">{moduleVendors.events.totalVendors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active:</span>
                  <span className="font-semibold text-green-500">{moduleVendors.events.activeVendors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenue:</span>
                  <span className="font-semibold">{formatIndianCurrency(moduleVendors.events.revenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bookings:</span>
                  <span className="font-semibold">{moduleVendors.events.totalOrders.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Rating:</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Star size={12} className="text-yellow-500" />
                    {moduleVendors.events.avgRating}
                  </span>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Top Performers:</p>
                {moduleVendors.events.topVendors.map((vendor, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between">
                      <span className="font-medium">{vendor.name}</span>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-yellow-500" />
                        <span>{vendor.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>{vendor.orders} tickets</span>
                      <span>{formatIndianCurrency(vendor.revenue)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Settlements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2" size={20} />
            Pending Settlements ({settlements.filter(s => s.status !== 'completed').length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {settlements.filter(s => s.status !== 'completed').map((settlement, index) => (
              <motion.div
                key={settlement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-primary">{settlement.settlementId}</span>
                      <Badge variant={settlement.status === 'processing' ? 'warning' : 'secondary'}>
                        {settlement.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{settlement.period}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Vendor</p>
                        <p className="font-semibold">{settlement.vendorName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Orders</p>
                        <p className="font-semibold">{settlement.totalOrders}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Gross Revenue</p>
                        <p className="font-semibold">{formatIndianCurrency(settlement.grossRevenue)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Commission</p>
                        <p className="font-semibold text-orange-500">{formatCurrency(settlement.commission)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Net Amount</p>
                        <p className="font-semibold text-green-500">{formatIndianCurrency(settlement.netAmount)}</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Process
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Complaints */}
      <Card className="border-red-500/20">
        <CardHeader>
          <CardTitle className="flex items-center text-red-500">
            <AlertTriangle className="mr-2" size={20} />
            Active Complaints ({complaints.filter(c => c.status !== 'resolved').length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {complaints.filter(c => c.status !== 'resolved').map((complaint, index) => (
              <motion.div
                key={complaint.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-red-500">{complaint.complaintId}</span>
                      <Badge variant={complaint.priority === 'critical' ? 'danger' : complaint.priority === 'high' ? 'warning' : 'secondary'}>
                        {complaint.priority}
                      </Badge>
                      <Badge variant="secondary">{complaint.type}</Badge>
                      <Badge variant={complaint.status === 'in-progress' ? 'warning' : 'secondary'}>
                        {complaint.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-2">
                      <div>
                        <p className="text-muted-foreground">Vendor</p>
                        <p className="font-semibold">{complaint.vendorName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Customer</p>
                        <p className="font-semibold">{complaint.customerName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Order ID</p>
                        <p className="font-semibold">{complaint.orderId}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Reported</p>
                        <p className="font-semibold">{formatDateTime(complaint.reportedDate)}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{complaint.description}</p>
                    {complaint.resolution && (
                      <p className="text-sm text-green-500 mt-2">Resolution: {complaint.resolution}</p>
                    )}
                  </div>
                  <Button size="sm" variant="outline">
                    Resolve
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2" size={20} />
            Onboarding Applications ({onboarding.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {onboarding.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm">{app.applicationId}</span>
                      <Badge variant={app.status === 'under-review' ? 'warning' : app.status === 'documents-pending' ? 'secondary' : 'secondary'}>
                        {app.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {getVendorTypeIcon(app.type)}
                        <span className="text-sm capitalize">{app.type.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Business Name</p>
                        <p className="font-semibold">{app.businessName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Contact</p>
                        <p className="font-semibold">{app.contactName}</p>
                        <p className="text-xs text-muted-foreground">{app.contactPhone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-semibold">{app.city}</p>
                        <p className="text-xs text-muted-foreground">{app.address}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Submitted</p>
                        <p className="font-semibold">{formatDateTime(app.submittedDate)}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {app.documents.map((doc, idx) => (
                        <Badge 
                          key={idx}
                          variant={doc.verified ? 'success' : doc.uploaded ? 'warning' : 'secondary'}
                        >
                          {doc.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <FileText size={14} />
                    </Button>
                    <Button size="sm" variant="default">
                      Review
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search & Filters */}
      <div className="glass rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by name, ID, or legal name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'active' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('active')}
              size="sm"
            >
              Active
            </Button>
            <Button
              variant={filterStatus === 'pending-approval' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('pending-approval')}
              size="sm"
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === 'inactive' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('inactive')}
              size="sm"
            >
              Inactive
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterType === 'restaurant' ? 'default' : 'outline'}
              onClick={() => setFilterType('restaurant')}
              size="sm"
            >
              <UtensilsCrossed size={16} className="mr-1" />
              Restaurant
            </Button>
            <Button
              variant={filterType === 'store' ? 'default' : 'outline'}
              onClick={() => setFilterType('store')}
              size="sm"
            >
              <Store size={16} className="mr-1" />
              Store
            </Button>
            <Button
              variant={filterType === 'service-provider' ? 'default' : 'outline'}
              onClick={() => setFilterType('service-provider')}
              size="sm"
            >
              <Wrench size={16} className="mr-1" />
              Service
            </Button>
            <Button
              variant={filterType === 'marketplace-seller' ? 'default' : 'outline'}
              onClick={() => setFilterType('marketplace-seller')}
              size="sm"
            >
              <ShoppingCart size={16} className="mr-1" />
              Marketplace
            </Button>
          </div>
        </div>
      </div>

      {/* Vendors Table */}
      <div ref={tableRef} className="glass rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Compliance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVendors.map((vendor) => (
              <TableRow
                key={vendor.id}
                className="cursor-pointer hover:bg-primary/5"
              >
                <TableCell>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{vendor.businessName}</p>
                      {vendor.isFeatured && <Award size={14} className="text-yellow-500" />}
                      {vendor.isExclusive && <Star size={14} className="text-purple-500" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{vendor.vendorId}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className={getTierColor(vendor.tier)}>
                        {vendor.tier}
                      </Badge>
                      {vendor.verificationStatus === 'verified' && (
                        <Shield size={12} className="text-green-500" />
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getVendorTypeIcon(vendor.type)}
                    <span className="text-sm capitalize">{vendor.type.replace('-', ' ')}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadge(vendor.status)}>
                    {vendor.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(vendor.lastActiveDate).toLocaleDateString()}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {vendor.contacts.filter(c => c.isPrimary).map(contact => (
                      <div key={contact.email}>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone size={10} />
                          {contact.phone}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail size={10} />
                          {contact.email}
                        </p>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="font-medium flex items-center gap-1">
                      <MapPin size={12} />
                      {vendor.address.city}
                    </p>
                    <p className="text-xs text-muted-foreground">{vendor.address.area}</p>
                    <p className="text-xs text-muted-foreground">{vendor.address.pincode}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-500" />
                      <span className="font-semibold">{vendor.performance.averageRating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({vendor.performance.totalReviews})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Orders:</span>
                      <span className="font-semibold">{vendor.performance.completedOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">On-Time:</span>
                      <span className="font-semibold text-green-500">
                        {vendor.performance.onTimeDeliveryRate}%
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="font-semibold text-green-500">
                      {formatIndianCurrency(vendor.revenue.thisMonth)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      This month
                    </div>
                    <div className="text-xs text-orange-500 mt-1">
                      Pending: {formatCurrency(vendor.revenue.pendingSettlement)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="font-semibold">{vendor.commission.value}%</p>
                    <p className="text-xs text-muted-foreground">
                      {vendor.commission.type}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs">
                      {vendor.compliance.gstVerified ? (
                        <CheckCircle size={12} className="text-green-500" />
                      ) : (
                        <XCircle size={12} className="text-red-500" />
                      )}
                      <span>GST</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {vendor.compliance.panVerified ? (
                        <CheckCircle size={12} className="text-green-500" />
                      ) : (
                        <XCircle size={12} className="text-red-500" />
                      )}
                      <span>PAN</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {vendor.bankDetails.verified ? (
                        <CheckCircle size={12} className="text-green-500" />
                      ) : (
                        <XCircle size={12} className="text-red-500" />
                      )}
                      <span>Bank</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <FileText size={14} />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MapPin size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
