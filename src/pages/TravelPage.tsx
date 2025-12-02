import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Plane,
  Bus,
  Train,
  Car,
  TrendingUp,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Plus,
  AlertTriangle,
  Activity,
  Zap,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { mockTravelBookings, mockTravelProviders, mockAPIHealth, mockFailedBookings } from '@/lib/travelMockData'
import { formatCurrency, formatIndianCurrency, formatDateTime } from '@/lib/utils'

export default function TravelPage() {
  const [bookings] = useState(mockTravelBookings)
  const [providers] = useState(mockTravelProviders)
  const [apiHealth] = useState(mockAPIHealth)
  const [failedBookings] = useState(mockFailedBookings)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'flight' | 'bus' | 'train' | 'cab'>('all')
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
  }, [filterType])

  const stats = {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.amount, 0),
    totalCommission: bookings.reduce((sum, b) => sum + b.commission, 0),
    failedCount: failedBookings.length,
    activeProviders: providers.filter(p => p.status === 'active').length
  }

  const revenueByType = [
    {
      type: 'flight',
      bookings: bookings.filter(b => b.type === 'flight').length,
      revenue: bookings.filter(b => b.type === 'flight').reduce((sum, b) => sum + b.amount, 0)
    },
    {
      type: 'bus',
      bookings: bookings.filter(b => b.type === 'bus').length,
      revenue: bookings.filter(b => b.type === 'bus').reduce((sum, b) => sum + b.amount, 0)
    },
    {
      type: 'train',
      bookings: bookings.filter(b => b.type === 'train').length,
      revenue: bookings.filter(b => b.type === 'train').reduce((sum, b) => sum + b.amount, 0)
    },
    {
      type: 'cab',
      bookings: bookings.filter(b => b.type === 'cab').length,
      revenue: bookings.filter(b => b.type === 'cab').reduce((sum, b) => sum + b.amount, 0)
    }
  ]

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.destination.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || b.type === filterType
    return matchesSearch && matchesType
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'danger' | 'secondary'> = {
      confirmed: 'success',
      pending: 'warning',
      cancelled: 'danger',
      completed: 'secondary',
      failed: 'danger'
    }
    return variants[status] || 'secondary'
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      flight: <Plane size={18} className="text-blue-500" />,
      bus: <Bus size={18} className="text-green-500" />,
      train: <Train size={18} className="text-purple-500" />,
      cab: <Car size={18} className="text-orange-500" />
    }
    return icons[type as keyof typeof icons] || <Activity size={18} />
  }

  const getAPIStatusColor = (status: string) => {
    const colors = {
      healthy: { bg: 'bg-green-500/10', text: 'text-green-500', dot: 'bg-green-500' },
      degraded: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', dot: 'bg-yellow-500' },
      down: { bg: 'bg-red-500/10', text: 'text-red-500', dot: 'bg-red-500' }
    }
    return colors[status as keyof typeof colors] || colors.healthy
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Travel Bookings</h1>
          <p className="text-muted-foreground mt-1">
            Manage flights, buses, trains, and cab bookings across all providers
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={18} className="mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus size={18} className="mr-2" />
            New Booking
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <TrendingUp size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
          <p className="text-xs text-green-500 mt-1">+12% this week</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Confirmed</p>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.confirmedBookings}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <DollarSign size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">{formatIndianCurrency(stats.totalRevenue)}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Commission</p>
            <DollarSign size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(stats.totalCommission)}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Failed</p>
            <XCircle size={20} className="text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-500">{stats.failedCount}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active APIs</p>
            <Zap size={20} className="text-yellow-500" />
          </div>
          <p className="text-2xl font-bold">{stats.activeProviders}</p>
        </motion.div>
      </div>

      {/* Revenue by Type */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {revenueByType.map((item, index) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <h4 className="font-semibold capitalize">{item.type}</h4>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bookings:</span>
                    <span className="font-semibold">{item.bookings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="font-semibold">{formatIndianCurrency(item.revenue)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Health Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2" size={20} />
            API Integration Health (Real-time)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {apiHealth.map((api, index) => {
              const statusConfig = getAPIStatusColor(api.status)
              return (
                <motion.div
                  key={api.provider}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-lg p-4 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{api.provider}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
                      <div className={`w-2 h-2 rounded-full ${statusConfig.dot} animate-pulse`}></div>
                      {api.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uptime:</span>
                      <span className="font-semibold">{api.uptime}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Response:</span>
                      <span className="font-semibold">{api.avgResponseTime}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Error Rate:</span>
                      <span className={`font-semibold ${api.errorRate > 5 ? 'text-red-500' : 'text-green-500'}`}>
                        {api.errorRate}%
                      </span>
                    </div>
                    {api.incidents > 0 && (
                      <div className="flex items-center text-xs text-red-500 mt-2">
                        <AlertTriangle size={12} className="mr-1" />
                        {api.incidents} incidents
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Failed Bookings */}
      {failedBookings.length > 0 && (
        <Card className="border-red-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-red-500">
              <AlertTriangle className="mr-2" size={20} />
              Failed Bookings ({failedBookings.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {failedBookings.map((fb) => (
                <div key={fb.id} className="glass rounded-lg p-4 border border-red-500/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getTypeIcon(fb.type)}
                        <span className="font-semibold">{fb.bookingId}</span>
                        <Badge variant="danger">{fb.errorCode}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {fb.customerName} • {fb.origin} → {fb.destination}
                      </p>
                      <p className="text-sm text-red-400">{fb.errorMessage}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Provider: {fb.provider}</span>
                        <span>Amount: {formatCurrency(fb.amount)}</span>
                        <span>Retries: {fb.retryCount}</span>
                      </div>
                    </div>
                    {fb.canRetry && (
                      <Button size="sm" variant="outline">
                        <RefreshCw size={14} className="mr-1" />
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search & Filters */}
      <div className="glass rounded-lg p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by booking ID, customer, origin, or destination..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterType('all')}
            >
              All
            </Button>
            <Button
              variant={filterType === 'flight' ? 'default' : 'outline'}
              onClick={() => setFilterType('flight')}
            >
              <Plane size={16} className="mr-1" />
              Flights
            </Button>
            <Button
              variant={filterType === 'bus' ? 'default' : 'outline'}
              onClick={() => setFilterType('bus')}
            >
              <Bus size={16} className="mr-1" />
              Buses
            </Button>
            <Button
              variant={filterType === 'train' ? 'default' : 'outline'}
              onClick={() => setFilterType('train')}
            >
              <Train size={16} className="mr-1" />
              Trains
            </Button>
            <Button
              variant={filterType === 'cab' ? 'default' : 'outline'}
              onClick={() => setFilterType('cab')}
            >
              <Car size={16} className="mr-1" />
              Cabs
            </Button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div ref={tableRef} className="glass rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Travel Date</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow
                key={booking.id}
                className="cursor-pointer hover:bg-primary/5"
              >
                <TableCell>
                  <div className="font-medium">{booking.bookingId}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDateTime(booking.bookingDate)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(booking.type)}
                    <span className="capitalize">{booking.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{booking.customerName}</p>
                    <p className="text-xs text-muted-foreground">{booking.customerPhone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{booking.origin}</p>
                    <p className="text-muted-foreground">→ {booking.destination}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Clock size={14} className="mr-1 text-muted-foreground" />
                    {formatDateTime(booking.travelDate)}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{booking.provider}</span>
                  {booking.pnr && (
                    <p className="text-xs text-muted-foreground">PNR: {booking.pnr}</p>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadge(booking.status)}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold">
                  {formatCurrency(booking.amount)}
                </TableCell>
                <TableCell className="font-semibold text-green-500">
                  {formatCurrency(booking.commission)}
                </TableCell>
                <TableCell>
                  <Badge variant={booking.paymentStatus === 'completed' ? 'success' : booking.paymentStatus === 'refunded' ? 'warning' : 'secondary'}>
                    {booking.paymentStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
