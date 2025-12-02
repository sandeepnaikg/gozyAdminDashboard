import { Users, ShoppingCart, DollarSign, Activity, UtensilsCrossed, Plane, Ticket, ShoppingBag } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { ChartCard } from '@/components/charts/ChartCard'
import { LiveOrdersFeed } from '@/components/dashboard/LiveOrdersFeed'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mock data
const revenueData = [
  { name: 'Jan', value: 3500000 },
  { name: 'Feb', value: 4200000 },
  { name: 'Mar', value: 3800000 },
  { name: 'Apr', value: 5100000 },
  { name: 'May', value: 4500000 },
  { name: 'Jun', value: 5800000 },
]

const moduleUsageData = [
  { name: 'Food Delivery', value: 4500, color: '#f97316' },
  { name: 'Travel', value: 3200, color: '#3b82f6' },
  { name: 'Shopping', value: 2800, color: '#a855f7' },
  { name: 'Tickets', value: 1900, color: '#ec4899' },
]

const serviceRevenueData = [
  { name: 'Food', revenue: 9500000 },
  { name: 'Travel', revenue: 7500000 },
  { name: 'Shopping', revenue: 6800000 },
  { name: 'Tickets', revenue: 4200000 },
]

const topAreas = [
  { area: 'Downtown', orders: 1234, revenue: 3800000 },
  { area: 'Uptown', orders: 987, revenue: 3200000 },
  { area: 'Midtown', orders: 856, revenue: 2700000 },
  { area: 'Suburbs', orders: 743, revenue: 2300000 },
  { area: 'Airport', orders: 621, revenue: 2100000 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            className="px-4 py-2 rounded-lg glass border border-white/20 text-sm"
            aria-label="Select date range"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={125847}
          change={12.5}
          icon={<Users size={20} />}
          delay={0}
        />
        <StatCard
          title="Total Orders"
          value={45621}
          change={8.2}
          icon={<ShoppingCart size={20} />}
          delay={0.1}
        />
        <StatCard
          title="Total Revenue"
          value="₹18.5Cr"
          change={15.3}
          icon={<DollarSign size={20} />}
          delay={0.2}
        />
        <StatCard
          title="Active Sessions"
          value={2847}
          change={-3.1}
          trend="down"
          icon={<Activity size={20} />}
          delay={0.3}
        />
      </div>

      {/* Module-wise Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Food Delivery"
          value={4500}
          change={9.3}
          icon={<UtensilsCrossed size={20} />}
          delay={0}
        />
        <StatCard
          title="Travel Bookings"
          value={3200}
          change={12.7}
          icon={<Plane size={20} />}
          delay={0.1}
        />
        <StatCard
          title="Shopping Orders"
          value={2800}
          change={6.4}
          icon={<ShoppingBag size={20} />}
          delay={0.2}
        />
        <StatCard
          title="Tickets Sold"
          value={1900}
          change={18.9}
          icon={<Ticket size={20} />}
          delay={0.3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue Trend" data={revenueData} />
        
        <Card>
          <CardHeader>
            <CardTitle>Module Usage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={moduleUsageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {moduleUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Service Revenue & Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue per Service</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(110, 69, 161, 0.5)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="revenue" fill="rgb(110, 69, 161)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <LiveOrdersFeed />
      </div>

      {/* Top Demanded Areas */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Demanded Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topAreas.map((area, index) => (
              <div key={area.area} className="flex items-center justify-between p-4 rounded-lg glass border border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{area.area}</p>
                    <p className="text-sm text-muted-foreground">{area.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${area.revenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
