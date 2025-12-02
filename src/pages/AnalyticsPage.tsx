import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Download,
  Calendar,
  Filter,
  PieChart,
  Activity,
  Eye
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { formatIndianCurrency } from '@/lib/utils'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'

export default function AnalyticsPage() {
  const [selectedMetric, setSelectedMetric] = useState<any>(null)
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
    totalUsers: 125678,
    activeUsers: 45678,
    revenue: 185600000,
    orders: 234567,
    growth: 24.5
  }

  const revenueData = [
    { month: 'Jan', revenue: 12500000 },
    { month: 'Feb', revenue: 15600000 },
    { month: 'Mar', revenue: 18900000 },
    { month: 'Apr', revenue: 22300000 },
    { month: 'May', revenue: 26700000 },
    { month: 'Jun', revenue: 28450000 }
  ]

  const categoryData = [
    { name: 'Food', value: 45, color: '#f59e0b' },
    { name: 'Shopping', value: 30, color: '#8b5cf6' },
    { name: 'Travel', value: 15, color: '#3b82f6' },
    { name: 'Events', value: 10, color: '#ec4899' }
  ]

  const performanceData = [
    { metric: 'Orders', value: 12345 },
    { metric: 'Revenue', value: 8934 },
    { metric: 'Users', value: 15678 },
    { metric: 'Sessions', value: 23456 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Analytics & Insights</h1>
          <p className="text-muted-foreground mt-1">Advanced analytics, reports, and data visualization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar size={18} className="mr-2" />
            Date Range
          </Button>
          <Button>
            <Download size={18} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedMetric({ title: 'Total Users', value: stats.totalUsers.toLocaleString(), growth: '+15%', period: 'This Month' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <Users size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedMetric({ title: 'Active Users', value: stats.activeUsers.toLocaleString(), percentage: '36.3%' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active Users</p>
            <Activity size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.activeUsers.toLocaleString()}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedMetric({ title: 'Total Revenue', value: formatIndianCurrency(stats.revenue), growth: '+24.5%', period: 'This Quarter' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <DollarSign size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">{formatIndianCurrency(stats.revenue)}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedMetric({ title: 'Total Orders', value: stats.orders.toLocaleString(), avgValue: '₹791' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <ShoppingCart size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{stats.orders.toLocaleString()}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedMetric({ title: 'Growth Rate', value: `+${stats.growth}%`, trend: 'Upward', period: 'YoY' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Growth Rate</p>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">+{stats.growth}%</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2" size={20} />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(110,69,161)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="rgb(110,69,161)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                  formatter={(value: number) => formatIndianCurrency(value)}
                />
                <Area type="monotone" dataKey="revenue" stroke="rgb(110,69,161)" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2" size={20} />
              Revenue by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="metric" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
              <Bar dataKey="value" fill="rgb(110,69,161)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Modal
        isOpen={selectedMetric !== null}
        onClose={() => setSelectedMetric(null)}
        title={selectedMetric?.title || 'Metric Details'}
      >
        {selectedMetric && (
          <div className="space-y-4">
            <div className="glass rounded-lg p-6 text-center">
              <p className="text-4xl font-bold text-green-500 mb-2">{selectedMetric.value}</p>
              {selectedMetric.period && <p className="text-muted-foreground">{selectedMetric.period}</p>}
              {selectedMetric.growth && (
                <p className="text-sm text-green-500 mt-2 flex items-center justify-center">
                  <TrendingUp size={16} className="mr-1" />
                  {selectedMetric.growth}
                </p>
              )}
              {selectedMetric.percentage && <p className="text-muted-foreground mt-2">{selectedMetric.percentage} of total</p>}
              {selectedMetric.avgValue && <p className="text-muted-foreground mt-2">Avg Value: {selectedMetric.avgValue}</p>}
              {selectedMetric.trend && <p className="text-muted-foreground mt-2">Trend: {selectedMetric.trend}</p>}
            </div>
            <Button className="w-full"><Eye size={16} className="mr-2" />View Detailed Analytics</Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
