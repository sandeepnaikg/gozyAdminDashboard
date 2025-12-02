import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  Activity,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Truck,
  BarChart3,
  Settings,
  Download,
  Eye,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { formatCurrency, formatIndianCurrency } from '@/lib/utils'

export default function OperationsPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [selectedZone, setSelectedZone] = useState<any>(null)
  const statsRef = useRef<HTMLDivElement>(null)

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
  }, [])

  const stats = {
    activeOrders: 1247,
    activeRiders: 856,
    activeVendors: 432,
    revenue: 2845600,
    avgDeliveryTime: 28,
    successRate: 94.5
  }

  const liveOrders = [
    { id: 'ORD12345', customer: 'Rajesh Kumar', type: 'Food', status: 'preparing', restaurant: 'Spice Garden', rider: 'Amit Singh', eta: 25, amount: 450 },
    { id: 'ORD12346', customer: 'Priya Sharma', type: 'Shopping', status: 'picked', store: 'TechStore', rider: 'Vijay Kumar', eta: 15, amount: 12340 },
    { id: 'ORD12347', customer: 'Arjun Patel', type: 'Food', status: 'delivering', restaurant: 'Delhi Darbar', rider: 'Rahul Verma', eta: 8, amount: 680 },
    { id: 'ORD12348', customer: 'Sneha Reddy', type: 'Shopping', status: 'preparing', store: 'Fashion Hub', rider: null, eta: 35, amount: 2340 },
    { id: 'ORD12349', customer: 'Karan Malhotra', type: 'Food', status: 'delivered', restaurant: 'Taste of India', rider: 'Suresh Yadav', eta: 0, amount: 890 }
  ]

  const zones = [
    { name: 'Central Delhi', activeOrders: 234, riders: 45, avgTime: 23, revenue: 456700, efficiency: 96 },
    { name: 'South Delhi', activeOrders: 189, riders: 38, avgTime: 28, revenue: 389200, efficiency: 92 },
    { name: 'North Delhi', activeOrders: 167, riders: 32, avgTime: 31, revenue: 345600, efficiency: 88 },
    { name: 'East Delhi', activeOrders: 145, riders: 28, avgTime: 29, revenue: 298400, efficiency: 90 },
    { name: 'West Delhi', activeOrders: 198, riders: 41, avgTime: 26, revenue: 412300, efficiency: 94 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'warning'
      case 'picked': return 'default'
      case 'delivering': return 'default'
      case 'delivered': return 'success'
      default: return 'secondary'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Operations Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time operational metrics and monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Zap size={18} className="mr-2" />
            Auto Dispatch
          </Button>
          <Button>
            <Download size={18} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedOrder({ title: 'Active Orders', value: stats.activeOrders })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active Orders</p>
            <Package size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{stats.activeOrders}</p>
          <p className="text-xs text-green-500 mt-1">+12% from yesterday</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedOrder({ title: 'Active Riders', value: stats.activeRiders })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active Riders</p>
            <Truck size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-500">{stats.activeRiders}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedOrder({ title: 'Active Vendors', value: stats.activeVendors })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active Vendors</p>
            <Users size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.activeVendors}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Today Revenue</p>
            <DollarSign size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">{formatIndianCurrency(stats.revenue)}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Avg Delivery</p>
            <Clock size={20} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold">{stats.avgDeliveryTime}m</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.successRate}%</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Activity className="mr-2" size={20} />
                Live Orders
              </span>
              <Badge>{liveOrders.length} Active</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {liveOrders.map((order, idx) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass rounded-lg p-3 hover:shadow-glow transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-primary" />
                      <span className="font-bold text-sm">{order.id}</span>
                      <Badge variant={getStatusColor(order.status) as any} className="text-xs">
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-bold">{formatCurrency(order.amount)}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{order.customer}</span>
                    {order.eta > 0 && (
                      <span className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {order.eta}m
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" size={20} />
              Zone Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {zones.map((zone, idx) => (
                <motion.div
                  key={zone.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass rounded-lg p-3 hover:shadow-glow transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedZone(zone)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{zone.name}</span>
                    <Badge variant={zone.efficiency > 93 ? 'success' : 'warning'}>
                      {zone.efficiency}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <div>
                      <p className="text-xs">Orders</p>
                      <p className="font-bold text-white">{zone.activeOrders}</p>
                    </div>
                    <div>
                      <p className="text-xs">Riders</p>
                      <p className="font-bold text-white">{zone.riders}</p>
                    </div>
                    <div>
                      <p className="text-xs">Avg Time</p>
                      <p className="font-bold text-white">{zone.avgTime}m</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal
        isOpen={selectedOrder !== null && selectedOrder.id}
        onClose={() => setSelectedOrder(null)}
        title={`Order Details - ${selectedOrder?.id}`}
        size="lg"
      >
        {selectedOrder && selectedOrder.id && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Customer</p>
                <p className="font-bold">{selectedOrder.customer}</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Order Type</p>
                <p className="font-bold">{selectedOrder.type}</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Amount</p>
                <p className="font-bold text-green-500">{formatCurrency(selectedOrder.amount)}</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge variant={getStatusColor(selectedOrder.status) as any}>{selectedOrder.status}</Badge>
              </div>
              {selectedOrder.rider && (
                <div className="glass rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Rider</p>
                  <p className="font-bold">{selectedOrder.rider}</p>
                </div>
              )}
              {selectedOrder.eta > 0 && (
                <div className="glass rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">ETA</p>
                  <p className="font-bold">{selectedOrder.eta} minutes</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">Track Order</Button>
              <Button variant="outline" className="flex-1">Contact Customer</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={selectedZone !== null}
        onClose={() => setSelectedZone(null)}
        title={`Zone Details - ${selectedZone?.name}`}
      >
        {selectedZone && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Active Orders</p>
                <p className="text-2xl font-bold">{selectedZone.activeOrders}</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Active Riders</p>
                <p className="text-2xl font-bold text-blue-500">{selectedZone.riders}</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Avg Delivery Time</p>
                <p className="text-2xl font-bold">{selectedZone.avgTime}m</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Efficiency</p>
                <p className="text-2xl font-bold text-green-500">{selectedZone.efficiency}%</p>
              </div>
            </div>
            <div className="glass rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Revenue</p>
              <p className="text-3xl font-bold text-green-500">{formatIndianCurrency(selectedZone.revenue)}</p>
            </div>
            <Button className="w-full">View Zone Details</Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
