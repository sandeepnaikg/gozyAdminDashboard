import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  ShoppingBag,
  Package,
  TrendingUp,
  DollarSign,
  Truck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Plus,
  Box,
  Users,
  BarChart3,
  Smartphone,
  Shirt,
  Home,
  BookOpen,
  Sparkles,
  Dumbbell
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { mockShoppingOrders, mockCategories, mockInventory, mockShoppingAnalytics } from '@/lib/shoppingMockData'
import { formatCurrency, formatIndianCurrency, formatDateTime } from '@/lib/utils'

export default function ShoppingPage() {
  const [orders] = useState(mockShoppingOrders)
  const [categories] = useState(mockCategories)
  const [inventory] = useState(mockInventory)
  const [analytics] = useState(mockShoppingAnalytics)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all')
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
  }, [filterStatus])

  const stats = {
    totalOrders: orders.length,
    confirmedOrders: orders.filter(o => ['confirmed', 'processing', 'shipped', 'delivered'].includes(o.status)).length,
    totalRevenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
    avgOrderValue: orders.reduce((sum, o) => sum + o.totalAmount, 0) / orders.length,
    shippedOrders: orders.filter(o => o.status === 'shipped').length,
    deliveredOrders: orders.filter(o => o.status === 'delivered').length
  }

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         o.items.some(item => item.productName.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'danger' | 'secondary'> = {
      pending: 'warning',
      confirmed: 'secondary',
      processing: 'secondary',
      shipped: 'secondary',
      delivered: 'success',
      cancelled: 'danger',
      returned: 'danger'
    }
    return variants[status] || 'secondary'
  }

  const getCategoryIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Smartphone,
      Shirt,
      Home,
      BookOpen,
      Sparkles,
      Dumbbell
    }
    const Icon = icons[iconName] || ShoppingBag
    return <Icon size={20} />
  }

  const getInventoryStatus = (status: string) => {
    const config = {
      'in-stock': { color: 'text-green-500', bg: 'bg-green-500/10' },
      'low-stock': { color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
      'out-of-stock': { color: 'text-red-500', bg: 'bg-red-500/10' }
    }
    return config[status as keyof typeof config] || config['in-stock']
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Shopping & E-Commerce</h1>
          <p className="text-muted-foreground mt-1">
            Manage orders, products, inventory, and seller marketplace
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={18} className="mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus size={18} className="mr-2" />
            Add Product
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
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <ShoppingBag size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
          <p className="text-xs text-green-500 mt-1">+24% this week</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active Orders</p>
            <Package size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-500">{stats.confirmedOrders}</p>
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
            <p className="text-sm text-muted-foreground">Avg Order Value</p>
            <TrendingUp size={20} className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(stats.avgOrderValue)}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">In Transit</p>
            <Truck size={20} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-orange-500">{stats.shippedOrders}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Delivered</p>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.deliveredOrders}</p>
        </motion.div>
      </div>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2" size={20} />
            Category Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="text-primary">{getCategoryIcon(cat.icon)}</div>
                    <h4 className="font-semibold text-sm">{cat.name}</h4>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Products:</span>
                    <span className="font-semibold">{cat.productCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="font-semibold">{formatIndianCurrency(cat.revenue)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inventory Alerts */}
      <Card className="border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-500">
            <AlertTriangle className="mr-2" size={20} />
            Inventory Alerts ({inventory.filter(i => i.status !== 'in-stock').length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {inventory.filter(i => i.status !== 'in-stock').map((item) => {
              const statusConfig = getInventoryStatus(item.status)
              return (
                <div key={item.productId} className="glass rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Box size={18} className={statusConfig.color} />
                        <span className="font-semibold">{item.productName}</span>
                        <Badge variant="secondary">{item.category}</Badge>
                        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.color}`}>
                          {item.status.toUpperCase()}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Current Stock</p>
                          <p className={`font-semibold ${statusConfig.color}`}>{item.currentStock}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Min Stock</p>
                          <p className="font-semibold">{item.minStock}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Reorder Level</p>
                          <p className="font-semibold">{item.reorderLevel}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Restocked</p>
                          <p className="font-semibold">
                            {item.lastRestocked ? new Date(item.lastRestocked).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Reorder Stock
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2" size={20} />
            Sales Analytics by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">{item.category}</h4>
                  <Badge variant="success">+{item.growthRate}% Growth</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Orders</p>
                    <p className="font-semibold text-lg">{item.orders.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Revenue</p>
                    <p className="font-semibold text-lg">{formatIndianCurrency(item.revenue)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg Order Value</p>
                    <p className="font-semibold text-lg">{formatCurrency(item.averageOrderValue)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Top Product</p>
                    <p className="font-semibold text-lg">{item.topProduct}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Growth Rate</p>
                    <p className="font-semibold text-lg text-green-500">+{item.growthRate}%</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search & Filters */}
      <div className="glass rounded-lg p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by order ID, customer, or product..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('pending')}
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === 'processing' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('processing')}
            >
              Processing
            </Button>
            <Button
              variant={filterStatus === 'shipped' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('shipped')}
            >
              Shipped
            </Button>
            <Button
              variant={filterStatus === 'delivered' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('delivered')}
            >
              Delivered
            </Button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div ref={tableRef} className="glass rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Tracking</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow
                key={order.id}
                className="cursor-pointer hover:bg-primary/5"
              >
                <TableCell>
                  <div className="font-medium">{order.orderId}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDateTime(order.orderDate)}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">{order.customerPhone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="text-sm mb-1">
                        <span className="font-medium">{item.productName}</span>
                        {item.variant && (
                          <span className="text-xs text-muted-foreground ml-2">
                            {item.variant.color} {item.variant.size}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {order.deliveryDate ? (
                    <div className="text-sm">
                      <p className="font-medium">{formatDateTime(order.deliveryDate)}</p>
                      <p className="text-xs text-green-500">Delivered</p>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">Pending</span>
                  )}
                </TableCell>
                <TableCell className="font-semibold">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                <TableCell>
                  <div className="font-semibold">{formatCurrency(order.totalAmount)}</div>
                  {order.discount > 0 && (
                    <div className="text-xs text-green-500">
                      Saved: {formatCurrency(order.discount)}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadge(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={order.paymentStatus === 'completed' ? 'success' : order.paymentStatus === 'refunded' ? 'warning' : 'secondary'}>
                    {order.paymentStatus}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {order.paymentMethod}
                  </div>
                </TableCell>
                <TableCell>
                  {order.trackingNumber ? (
                    <div className="text-sm">
                      <p className="font-mono text-xs">{order.trackingNumber}</p>
                      <Button size="sm" variant="ghost" className="h-6 text-xs mt-1">
                        Track
                      </Button>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
