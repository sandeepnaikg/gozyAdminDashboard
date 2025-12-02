import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Users,
  Bike,
  Car,
  Truck,
  ShoppingBag,
  UtensilsCrossed,
  TrendingUp,
  MapPin,
  Clock,
  Star,
  DollarSign,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  BarChart3,
  Navigation,
  Phone,
  FileText
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { mockRiders, mockDeliveries, mockRiderAnalytics, mockZoneMetrics } from '@/lib/riderMockData'
import { formatCurrency, formatIndianCurrency, formatDateTime } from '@/lib/utils'
import type { RiderStatus, DeliveryType } from '@/types/rider'

export default function RidersPage() {
  const [riders] = useState(mockRiders)
  const [deliveries] = useState(mockDeliveries)
  const [analytics] = useState(mockRiderAnalytics)
  const [zoneMetrics] = useState(mockZoneMetrics)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<RiderStatus | 'all'>('all')
  const [filterDeliveryType, setFilterDeliveryType] = useState<DeliveryType | 'all'>('all')
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
  }, [filterStatus, filterDeliveryType])

  const stats = {
    totalRiders: riders.length,
    activeRiders: riders.filter(r => r.status === 'active' || r.status === 'on-trip').length,
    onTripRiders: riders.filter(r => r.status === 'on-trip').length,
    offlineRiders: riders.filter(r => r.status === 'offline').length,
    totalDeliveries: deliveries.length,
    totalEarnings: riders.reduce((sum, r) => sum + r.earnings.today, 0),
    avgRating: riders.reduce((sum, r) => sum + r.performance.averageRating, 0) / riders.length,
    totalPendingPayout: riders.reduce((sum, r) => sum + r.earnings.pendingPayout, 0)
  }

  const filteredRiders = riders.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.riderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.phone.includes(searchQuery)
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus
    const matchesDeliveryType = filterDeliveryType === 'all' || r.deliveryTypes.includes(filterDeliveryType)
    return matchesSearch && matchesStatus && matchesDeliveryType
  })

  const getStatusBadge = (status: RiderStatus) => {
    const variants: Record<RiderStatus, 'success' | 'warning' | 'danger' | 'secondary'> = {
      active: 'success',
      'on-trip': 'secondary',
      offline: 'danger',
      break: 'warning',
      suspended: 'danger'
    }
    return variants[status] || 'secondary'
  }

  const getDeliveryTypeIcon = (type: DeliveryType) => {
    const icons = {
      food: UtensilsCrossed,
      shopping: ShoppingBag,
      cab: Car,
      bike: Bike,
      auto: Truck
    }
    const Icon = icons[type] || Bike
    return <Icon size={16} />
  }

  const getDeliveryTypeColor = (type: DeliveryType) => {
    const colors = {
      food: 'text-orange-500',
      shopping: 'text-purple-500',
      cab: 'text-blue-500',
      bike: 'text-green-500',
      auto: 'text-yellow-500'
    }
    return colors[type] || 'text-gray-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Riders Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage delivery partners across food, shopping, cab, bike & auto services
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={18} className="mr-2" />
            Export Report
          </Button>
          <Button>
            <Users size={18} className="mr-2" />
            Add Rider
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
            <p className="text-sm text-muted-foreground">Total Riders</p>
            <Users size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{stats.totalRiders}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active</p>
            <Activity size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.activeRiders}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">On Trip</p>
            <Navigation size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-500">{stats.onTripRiders}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Offline</p>
            <XCircle size={20} className="text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-500">{stats.offlineRiders}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Today's Earnings</p>
            <DollarSign size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(stats.totalEarnings)}</p>
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
            <p className="text-sm text-muted-foreground">Deliveries</p>
            <CheckCircle size={20} className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold">{stats.totalDeliveries}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Pending Payout</p>
            <TrendingUp size={20} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold">{formatIndianCurrency(stats.totalPendingPayout)}</p>
        </motion.div>
      </div>

      {/* Delivery Type Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2" size={20} />
            Delivery Type Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {analytics.map((item, index) => (
              <motion.div
                key={item.deliveryType}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex items-center gap-2 ${getDeliveryTypeColor(item.deliveryType)}`}>
                    {getDeliveryTypeIcon(item.deliveryType)}
                    <h4 className="font-semibold text-sm capitalize">{item.deliveryType}</h4>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-semibold">{item.totalRiders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active:</span>
                    <span className="font-semibold text-green-500">{item.activeRiders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">On Trip:</span>
                    <span className="font-semibold text-blue-500">{item.onTripRiders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="font-semibold">{formatIndianCurrency(item.revenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Time:</span>
                    <span className="font-semibold">{item.averageDeliveryTime}m</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Zone Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2" size={20} />
            Zone-wise Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {zoneMetrics.map((zone, index) => (
              <motion.div
                key={zone.zoneName}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">{zone.zoneName}</h4>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-500" />
                    <span className="font-semibold">{zone.customerSatisfaction}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Riders</p>
                    <p className="font-semibold text-lg">{zone.totalRiders}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Active</p>
                    <p className="font-semibold text-lg text-green-500">{zone.activeRiders}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Response Time</p>
                    <p className="font-semibold text-lg">{zone.avgResponseTime}m</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Completion</p>
                    <p className="font-semibold text-lg text-green-500">{zone.completionRate}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Deliveries</p>
                    <p className="font-semibold text-lg">{zone.totalDeliveries.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Satisfaction</p>
                    <p className="font-semibold text-lg text-yellow-500">{zone.customerSatisfaction}/5</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2" size={20} />
            Live Deliveries ({deliveries.filter(d => d.status !== 'delivered').length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {deliveries.filter(d => d.status !== 'delivered').map((delivery, index) => (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-4 border border-white/10 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`font-mono text-sm ${getDeliveryTypeColor(delivery.type)}`}>
                        {delivery.deliveryId}
                      </span>
                      <Badge variant={getStatusBadge(delivery.status === 'in-transit' ? 'on-trip' : 'active')}>
                        {delivery.status}
                      </Badge>
                      <div className={`flex items-center gap-1 ${getDeliveryTypeColor(delivery.type)}`}>
                        {getDeliveryTypeIcon(delivery.type)}
                        <span className="text-sm capitalize">{delivery.type}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <MapPin size={14} /> Pickup
                        </p>
                        <p className="font-medium">{delivery.pickupLocation.address}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <MapPin size={14} /> Drop
                        </p>
                        <p className="font-medium">{delivery.dropLocation.address}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Customer</p>
                        <p className="font-medium">{delivery.customerName}</p>
                        <p className="text-xs text-muted-foreground">{delivery.customerPhone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Earnings</p>
                        <p className="font-semibold text-green-500">{formatCurrency(delivery.amount + delivery.tip)}</p>
                        <p className="text-xs text-muted-foreground">{delivery.distance}km</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Track
                  </Button>
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
              placeholder="Search by name, ID, or phone..."
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
              variant={filterStatus === 'on-trip' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('on-trip')}
              size="sm"
            >
              On Trip
            </Button>
            <Button
              variant={filterStatus === 'offline' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('offline')}
              size="sm"
            >
              Offline
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterDeliveryType === 'food' ? 'default' : 'outline'}
              onClick={() => setFilterDeliveryType('food')}
              size="sm"
            >
              <UtensilsCrossed size={16} className="mr-1" />
              Food
            </Button>
            <Button
              variant={filterDeliveryType === 'shopping' ? 'default' : 'outline'}
              onClick={() => setFilterDeliveryType('shopping')}
              size="sm"
            >
              <ShoppingBag size={16} className="mr-1" />
              Shopping
            </Button>
            <Button
              variant={filterDeliveryType === 'cab' ? 'default' : 'outline'}
              onClick={() => setFilterDeliveryType('cab')}
              size="sm"
            >
              <Car size={16} className="mr-1" />
              Cab
            </Button>
            <Button
              variant={filterDeliveryType === 'bike' ? 'default' : 'outline'}
              onClick={() => setFilterDeliveryType('bike')}
              size="sm"
            >
              <Bike size={16} className="mr-1" />
              Bike
            </Button>
            <Button
              variant={filterDeliveryType === 'auto' ? 'default' : 'outline'}
              onClick={() => setFilterDeliveryType('auto')}
              size="sm"
            >
              <Truck size={16} className="mr-1" />
              Auto
            </Button>
          </div>
        </div>
      </div>

      {/* Riders Table */}
      <div ref={tableRef} className="glass rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rider</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Today's Earnings</TableHead>
              <TableHead>Pending Payout</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRiders.map((rider) => (
              <TableRow
                key={rider.id}
                className="cursor-pointer hover:bg-primary/5"
              >
                <TableCell>
                  <div>
                    <p className="font-semibold">{rider.name}</p>
                    <p className="text-xs text-muted-foreground">{rider.riderId}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="text-yellow-500" />
                      <span className="text-xs font-semibold">{rider.performance.averageRating}</span>
                      <span className="text-xs text-muted-foreground">({rider.performance.totalRatings})</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="flex items-center gap-1">
                      <Phone size={12} />
                      {rider.phone}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{rider.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="font-medium">{rider.vehicle.model}</p>
                    <p className="text-xs text-muted-foreground">{rider.vehicle.registrationNumber}</p>
                    <Badge variant={rider.vehicle.verified ? 'success' : 'warning'} className="mt-1">
                      {rider.vehicle.verified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {rider.deliveryTypes.map(type => (
                      <div key={type} className={`flex items-center gap-1 ${getDeliveryTypeColor(type)}`}>
                        {getDeliveryTypeIcon(type)}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadge(rider.status)}>
                    {rider.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(rider.lastActiveTime).toLocaleTimeString()}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {rider.currentLocation ? (
                      <>
                        <p className="font-medium flex items-center gap-1">
                          <MapPin size={12} className="text-green-500" />
                          {rider.currentLocation.zone}
                        </p>
                        <p className="text-xs text-muted-foreground">{rider.currentLocation.address}</p>
                      </>
                    ) : (
                      <p className="text-muted-foreground">Home</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deliveries:</span>
                      <span className="font-semibold">{rider.performance.completedDeliveries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">On-Time:</span>
                      <span className="font-semibold text-green-500">{rider.performance.onTimeDeliveryRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Acceptance:</span>
                      <span className="font-semibold">{rider.performance.acceptanceRate}%</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold text-green-500">
                    {formatCurrency(rider.earnings.today)}
                  </div>
                  {rider.currentShift && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {rider.currentShift.deliveries} trips • {rider.currentShift.distance.toFixed(1)}km
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="font-semibold">
                    {formatCurrency(rider.earnings.pendingPayout)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    This week: {formatCurrency(rider.earnings.thisWeek)}
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
