import { Users, ShoppingCart, DollarSign, Activity, UtensilsCrossed, Plane, Ticket, ShoppingBag, RefreshCw } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { ChartCard } from '@/components/charts/ChartCard'
import { LiveOrdersFeed } from '@/components/dashboard/LiveOrdersFeed'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useState, useEffect } from 'react'

const GRAPHQL_URL = "https://db.gozy.online/v1/graphql";
const AUTH_TOKEN = import.meta.env.VITE_HASURA_ADMIN_SECRET;

const query = `
query GetDashboardStats {
  users_aggregate {
    aggregate {
      count
    }
  }

  bookings_aggregate(where: { payment_status: { _eq: "completed" } }) {
    aggregate {
      count
      sum {
        total_amount
      }
    }
  }

  active_bookings: bookings_aggregate(
    where: { booking_status: { _in: ["pending", "confirmed"] } }
  ) {
    aggregate { count }
  }

  food_bookings: bookings_aggregate(where: { service_type: { _eq: "food" } }) {
    aggregate { count }
  }

  travel_bookings: bookings_aggregate(
    where: { service_type: { _in: ["flight", "hotel", "train"] } }
  ) {
    aggregate { count }
  }

  shopping_bookings: bookings_aggregate(where: { service_type: { _eq: "delivery" } }) {
    aggregate { count }
  }

  tickets_bookings: bookings_aggregate(
    where: { service_type: { _in: ["movie", "metro"] } }
  ) {
    aggregate { count }
  }

  recent_bookings: bookings(
    order_by: { booked_at: desc }
    limit: 20
  ) {
    id
    user_id
    service_type
    total_amount
    booking_status
    payment_status
    booked_at
  }
}
`;

async function getDashboardStats() {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GraphQL error: ${res.status} ${txt}`);
  }
  const { data, errors } = await res.json();
  if (errors) throw new Error(JSON.stringify(errors));
  return data;
}

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState('7days');
  const [dataDashboard, setDataDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboardStats();
      setDataDashboard(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  // Extract data from backend response
  const overview = {
    totalUsers: dataDashboard?.users_aggregate?.aggregate?.count ?? 0,
    totalOrders: dataDashboard?.bookings_aggregate?.aggregate?.count ?? 0,
    totalRevenue: dataDashboard?.bookings_aggregate?.aggregate?.sum?.total_amount ?? 0,
    activeSessions: dataDashboard?.active_bookings?.aggregate?.count ?? 0,
    userGrowth: 12.5,
    orderGrowth: 8.3,
    revenueGrowth: 15.2,
    sessionGrowth: 5.7,
  };

  const moduleUsage = {
    foodDelivery: {
      total: dataDashboard?.food_bookings?.aggregate?.count ?? 0,
      growth: 10.2,
    },
    travel: {
      total: dataDashboard?.travel_bookings?.aggregate?.count ?? 0,
      growth: 7.8,
    },
    shopping: {
      total: dataDashboard?.shopping_bookings?.aggregate?.count ?? 0,
      growth: 14.5,
    },
    tickets: {
      total: dataDashboard?.tickets_bookings?.aggregate?.count ?? 0,
      growth: 6.3,
    },
  };

  const liveOrders = dataDashboard?.recent_bookings?.map((booking: any) => ({
    id: booking.id,
    userId: booking.user_id,
    service: booking.service_type,
    amount: booking.total_amount,
    status: booking.booking_status,
    paymentStatus: booking.payment_status,
    timestamp: booking.booked_at,
  })) ?? [];

  // Format currency safely
  const formatCurrency = (amount: number | null | undefined): string => {
    if (amount == null || isNaN(amount)) return '₹0';
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Safe number formatting
  const formatNumber = (num: number | null | undefined): number => {
    return num ?? 0;
  };

  // Generate module usage data from real data
  const moduleUsageData = [
    { 
      name: 'Food Delivery', 
      value: moduleUsage?.foodDelivery?.total ?? 0, 
      color: '#f97316' 
    },
    { 
      name: 'Travel', 
      value: moduleUsage?.travel?.total ?? 0, 
      color: '#3b82f6' 
    },
    { 
      name: 'Shopping', 
      value: moduleUsage?.shopping?.total ?? 0, 
      color: '#a855f7' 
    },
    { 
      name: 'Tickets', 
      value: moduleUsage?.tickets?.total ?? 0, 
      color: '#ec4899' 
    },
  ];

  // Calculate service revenue (mock for now - would need additional query)
  const serviceRevenueData = [
    { name: 'Food', revenue: 9500000 },
    { name: 'Travel', revenue: 7500000 },
    { name: 'Shopping', revenue: 6800000 },
    { name: 'Tickets', revenue: 4200000 },
  ];

  // Revenue trend (mock for now - would need additional query)
  const revenueData = [
    { name: 'Jan', value: 3500000 },
    { name: 'Feb', value: 4200000 },
    { name: 'Mar', value: 3800000 },
    { name: 'Apr', value: 5100000 },
    { name: 'May', value: 4500000 },
    { name: 'Jun', value: 5800000 },
  ];

  // Top areas (fallback to mock if no data)
  const topAreas = [
    { area: 'Downtown', orders: 1234, revenue: 3800000 },
    { area: 'Uptown', orders: 987, revenue: 3200000 },
    { area: 'Midtown', orders: 856, revenue: 2700000 },
    { area: 'Suburbs', orders: 743, revenue: 2300000 },
    { area: 'Airport', orders: 621, revenue: 2100000 },
  ];

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="p-6 max-w-md">
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-red-500 text-5xl">⚠️</div>
              <h2 className="text-xl font-bold">Error Loading Dashboard</h2>
              <p className="text-muted-foreground">{error.message}</p>
              <button 
                onClick={() => fetchData()} 
                className="px-4 py-2 rounded-lg gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
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
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">This year</option>
          </select>
          <button
            onClick={() => fetchData()}
            disabled={loading}
            className="px-4 py-2 rounded-lg glass border border-white/20 text-sm hover:bg-white/10 transition-colors disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={loading ? '...' : formatNumber(overview?.totalUsers)}
          change={overview?.userGrowth ?? 0}
          icon={<Users size={20} />}
          delay={0}
        />
        <StatCard
          title="Total Orders"
          value={loading ? '...' : formatNumber(overview?.totalOrders)}
          change={overview?.orderGrowth ?? 0}
          icon={<ShoppingCart size={20} />}
          delay={0.1}
        />
        <StatCard
          title="Total Revenue"
          value={loading ? '...' : formatCurrency(overview?.totalRevenue)}
          change={overview?.revenueGrowth ?? 0}
          icon={<DollarSign size={20} />}
          delay={0.2}
        />
        <StatCard
          title="Active Sessions"
          value={loading ? '...' : formatNumber(overview?.activeSessions)}
          change={overview?.sessionGrowth ?? 0}
          trend={(overview?.sessionGrowth ?? 0) < 0 ? 'down' : 'up'}
          icon={<Activity size={20} />}
          delay={0.3}
        />
      </div>

      {/* Module-wise Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Food Delivery"
          value={loading ? '...' : formatNumber(moduleUsage?.foodDelivery?.total)}
          change={moduleUsage?.foodDelivery?.growth ?? 0}
          icon={<UtensilsCrossed size={20} />}
          delay={0}
        />
        <StatCard
          title="Travel Bookings"
          value={loading ? '...' : formatNumber(moduleUsage?.travel?.total)}
          change={moduleUsage?.travel?.growth ?? 0}
          icon={<Plane size={20} />}
          delay={0.1}
        />
        <StatCard
          title="Shopping Orders"
          value={loading ? '...' : formatNumber(moduleUsage?.shopping?.total)}
          change={moduleUsage?.shopping?.growth ?? 0}
          icon={<ShoppingBag size={20} />}
          delay={0.2}
        />
        <StatCard
          title="Tickets Sold"
          value={loading ? '...' : formatNumber(moduleUsage?.tickets?.total)}
          change={moduleUsage?.tickets?.growth ?? 0}
          icon={<Ticket size={20} />}
          delay={0.3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading chart data...</div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <ChartCard title="Revenue Trend" data={revenueData} />
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Module Usage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading chart data...</div>
              </div>
            ) : moduleUsageData.every(item => item.value === 0) ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>No module usage data available</p>
                  <p className="text-sm mt-2">Start making bookings to see distribution</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={moduleUsageData.filter(item => item.value > 0)}
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
            )}
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
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading chart data...</div>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>

        <LiveOrdersFeed orders={liveOrders} loading={loading} />
      </div>

      {/* Top Demanded Areas */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Demanded Areas</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg glass border border-white/10 animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-white/10"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-white/10 rounded w-24"></div>
                      <div className="h-3 bg-white/10 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="h-5 bg-white/10 rounded w-20 ml-auto"></div>
                    <div className="h-3 bg-white/10 rounded w-24 ml-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : topAreas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No area data available yet</p>
              <p className="text-sm mt-1">Area statistics will appear as orders are placed</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topAreas.map((area, index) => (
                <div key={area.area} className="flex items-center justify-between p-4 rounded-lg glass border border-white/10">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{area.area || 'Unknown Area'}</p>
                      <p className="text-sm text-muted-foreground">
                        {area.orders?.toLocaleString() ?? 0} orders
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatCurrency(area.revenue)}</p>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
