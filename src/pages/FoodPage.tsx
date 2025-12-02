import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  Store,
  TrendingUp,
  Clock,
  DollarSign,
  MapPin,
  Star,
  Heart,
  MoreVertical,
  Plus,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Eye,
  Phone
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { mockRestaurants, mockFoodOrders, mockKitchenLoad } from '@/lib/foodMockData'
import { formatCurrency, formatIndianCurrency } from '@/lib/utils'
import { Modal } from '@/components/ui/Modal'

export default function FoodPage() {
  const [restaurants] = useState(mockRestaurants)
  const [orders] = useState(mockFoodOrders)
  const [kitchenLoad] = useState(mockKitchenLoad)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null)
  const [selectedStat, setSelectedStat] = useState<any>(null)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
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
  }, [])

  const stats = {
    totalRestaurants: restaurants.length,
    activeRestaurants: restaurants.filter(r => r.status === 'active').length,
    totalOrders: orders.length,
    activeOrders: orders.filter(o => ['pending', 'confirmed', 'preparing'].includes(o.status)).length,
    totalRevenue: restaurants.reduce((sum, r) => sum + r.totalRevenue, 0),
    avgRating: (restaurants.reduce((sum, r) => sum + r.rating, 0) / restaurants.length).toFixed(1)
  }

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 75) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'danger' | 'secondary'> = {
      active: 'success',
      pending: 'warning',
      inactive: 'secondary',
      suspended: 'danger'
    }
    return variants[status] || 'secondary'
  }

  const getLoadStatus = (status: string) => {
    const config = {
      low: { color: 'text-green-500', bg: 'bg-green-500/10' },
      medium: { color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
      high: { color: 'text-orange-500', bg: 'bg-orange-500/10' },
      critical: { color: 'text-red-500', bg: 'bg-red-500/10' }
    }
    return config[status as keyof typeof config] || config.low
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Food Delivery Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage restaurants, menus, orders, and kitchen operations
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={18} className="mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus size={18} className="mr-2" />
            Add Restaurant
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Total Restaurants', value: stats.totalRestaurants, growth: '+2 this week', active: stats.activeRestaurants })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Restaurants</p>
            <Store size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{stats.totalRestaurants}</p>
          <p className="text-xs text-green-500 mt-1">+2 this week</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Active Restaurants', value: stats.activeRestaurants, total: stats.totalRestaurants, percentage: `${((stats.activeRestaurants/stats.totalRestaurants)*100).toFixed(1)}%` })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active Now</p>
            <Heart size={20} className="text-red-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.activeRestaurants}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Total Orders', value: stats.totalOrders, active: stats.activeOrders, completed: stats.totalOrders - stats.activeOrders })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <TrendingUp size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Active Orders', value: stats.activeOrders, status: 'In Progress', avgTime: '28 mins' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active Orders</p>
            <Clock size={20} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-orange-500">{stats.activeOrders}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Total Revenue', value: formatIndianCurrency(stats.totalRevenue), growth: '+18.5%', period: 'This Month' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <DollarSign size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">{formatIndianCurrency(stats.totalRevenue)}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Average Rating', value: stats.avgRating, total: stats.totalRestaurants, topRated: '45 restaurants above 4.5' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Avg Rating</p>
            <Star size={20} className="text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-2xl font-bold">{stats.avgRating}</p>
        </motion.div>
      </div>

      {/* Kitchen Load Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2" size={20} />
            Kitchen Load Prediction (Real-time)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {kitchenLoad.map((kitchen, index) => {
              const loadConfig = getLoadStatus(kitchen.status)
              return (
                <motion.div
                  key={kitchen.restaurantId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-lg p-4 border border-white/10 cursor-pointer hover:shadow-glow transition-all"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedRestaurant({ ...kitchen, type: 'kitchen' })}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{kitchen.restaurantName}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${loadConfig.bg} ${loadConfig.color}`}>
                      {kitchen.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Orders:</span>
                      <span className="font-semibold">{kitchen.currentOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Prep Time:</span>
                      <span className="font-semibold">{kitchen.avgPrepTime} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Predicted Load:</span>
                      <span className={`font-semibold ${loadConfig.color}`}>{kitchen.predictedLoad}</span>
                    </div>
                  </div>
                  {kitchen.status === 'critical' && (
                    <div className="mt-3 flex items-center text-xs text-red-500">
                      <AlertTriangle size={14} className="mr-1" />
                      High load detected!
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="glass rounded-lg p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search restaurants by name or cuisine..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Restaurants Table */}
      <div ref={tableRef} className="glass rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restaurant</TableHead>
              <TableHead>Cuisine</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Health Score</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Avg Prep Time</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRestaurants.map((restaurant) => (
              <TableRow
                key={restaurant.id}
                className="cursor-pointer hover:bg-primary/5"
                onClick={() => setSelectedRestaurant(restaurant)}
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-white font-semibold">
                      {restaurant.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{restaurant.name}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPin size={12} className="mr-1" />
                        {restaurant.address.city}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {restaurant.cuisine.slice(0, 2).map(c => (
                      <Badge key={c} variant="secondary">{c}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadge(restaurant.status)}>
                    {restaurant.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-semibold">{restaurant.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`font-semibold ${getHealthScoreColor(restaurant.healthScore)}`}>
                    {restaurant.healthScore}%
                  </span>
                </TableCell>
                <TableCell className="font-semibold">{restaurant.totalOrders}</TableCell>
                <TableCell className="font-semibold">{formatIndianCurrency(restaurant.totalRevenue)}</TableCell>
                <TableCell>{restaurant.commission}%</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1 text-muted-foreground" />
                    {restaurant.avgPrepTime} min
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal
        isOpen={selectedRestaurant !== null}
        onClose={() => setSelectedRestaurant(null)}
        title={selectedRestaurant?.restaurantName || selectedRestaurant?.name || 'Restaurant Details'}
        size="lg"
      >
        {selectedRestaurant && (
          <div className="space-y-4">
            {selectedRestaurant.type === 'kitchen' ? (
              <>
                <div className="glass rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">Kitchen Load Status</p>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getLoadStatus(selectedRestaurant.status).bg} ${getLoadStatus(selectedRestaurant.status).color}`}>
                    {selectedRestaurant.status.toUpperCase()}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Current Orders</p>
                    <p className="text-2xl font-bold">{selectedRestaurant.currentOrders}</p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Avg Prep Time</p>
                    <p className="text-2xl font-bold">{selectedRestaurant.avgPrepTime} min</p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Predicted Load</p>
                    <p className={`text-xl font-bold ${getLoadStatus(selectedRestaurant.status).color}`}>{selectedRestaurant.predictedLoad}</p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Peak Hours</p>
                    <p className="text-xl font-bold">{selectedRestaurant.peakHours}</p>
                  </div>
                </div>
                {selectedRestaurant.status === 'critical' && (
                  <div className="glass rounded-lg p-4 border border-red-500/50">
                    <div className="flex items-center text-red-500 mb-2">
                      <AlertTriangle size={18} className="mr-2" />
                      <p className="font-semibold">High Load Alert</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Consider redistributing orders or increasing kitchen capacity.</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="glass rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-lg font-bold">{selectedRestaurant.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin size={14} className="mr-1" />
                        {selectedRestaurant.address?.area}, {selectedRestaurant.address?.city}
                      </div>
                    </div>
                    <Badge variant={getStatusBadge(selectedRestaurant.status)}>{selectedRestaurant.status}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedRestaurant.cuisine?.map((c: string) => (
                      <Badge key={c} variant="secondary">{c}</Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">{selectedRestaurant.rating}</p>
                      <Star size={18} className="text-yellow-500 fill-yellow-500" />
                    </div>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Health Score</p>
                    <p className={`text-2xl font-bold ${getHealthScoreColor(selectedRestaurant.healthScore || 0)}`}>{selectedRestaurant.healthScore}</p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold">{selectedRestaurant.totalOrders}</p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Avg Prep Time</p>
                    <p className="text-2xl font-bold">{selectedRestaurant.avgPrepTime} min</p>
                  </div>
                </div>
                <div className="glass rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-3">Revenue & Commission</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Revenue</p>
                      <p className="text-xl font-bold">{formatIndianCurrency(selectedRestaurant.totalRevenue)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Commission ({selectedRestaurant.commissionRate}%)</p>
                      <p className="text-xl font-bold">{formatCurrency(selectedRestaurant.commission)}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1"><Eye size={16} className="mr-2" />View Menu</Button>
                  <Button variant="outline" className="flex-1"><Phone size={16} className="mr-2" />Contact</Button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={selectedStat !== null}
        onClose={() => setSelectedStat(null)}
        title={selectedStat?.title || 'Statistics'}
      >
        {selectedStat && (
          <div className="space-y-4">
            <div className="glass rounded-lg p-6 text-center">
              <p className="text-4xl font-bold mb-2">{selectedStat.value}</p>
              {selectedStat.growth && <p className="text-green-500 font-medium">{selectedStat.growth}</p>}
              {selectedStat.period && <p className="text-muted-foreground text-sm mt-2">{selectedStat.period}</p>}
            </div>
            {selectedStat.active !== undefined && (
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-green-500">{selectedStat.active}</p>
                </div>
                {selectedStat.total && (
                  <div className="glass rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold">{selectedStat.total}</p>
                  </div>
                )}
                {selectedStat.completed && (
                  <div className="glass rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{selectedStat.completed}</p>
                  </div>
                )}
              </div>
            )}
            {selectedStat.percentage && (
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Percentage Active</p>
                <p className="text-2xl font-bold text-primary">{selectedStat.percentage}</p>
              </div>
            )}
            {selectedStat.topRated && (
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Top Performers</p>
                <p className="text-sm">{selectedStat.topRated}</p>
              </div>
            )}
            {selectedStat.status && (
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Status</p>
                <Badge variant="success">{selectedStat.status}</Badge>
                {selectedStat.avgTime && <p className="text-sm mt-2">Avg Time: {selectedStat.avgTime}</p>}
              </div>
            )}
            <Button className="w-full"><Eye size={16} className="mr-2" />View Detailed Report</Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
