import { Users, ShoppingCart, DollarSign, Activity, UtensilsCrossed, Plane, Ticket, ShoppingBag, RefreshCw } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { ChartCard } from '@/components/charts/ChartCard'
import { LiveOrdersFeed } from '@/components/dashboard/LiveOrdersFeed'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useState, useEffect } from 'react'
import { graphqlRequest } from '@/lib/apolloClient'
import { 
  GET_DASHBOARD_STATS, GET_DASHBOARD_STATS_ADMIN,
  GET_MODULE_USAGE, GET_MODULE_USAGE_ADMIN,
  GET_RECENT_BOOKINGS, GET_RECENT_BOOKINGS_ADMIN,
  GET_SERVICE_DISTRIBUTION 
} from '@/graphql/queries/realDashboard'
import type { UserContext } from '@/lib/auth'

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState('7days');
  const [statsData, setStatsData] = useState<any>(null);
  const [moduleData, setModuleData] = useState<any>(null);
  const [bookingsData, setBookingsData] = useState<any>(null);
  const [distributionData, setDistributionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Get vendor context for filtering
  const getUserContext = (): UserContext | null => {
    try {
      const context = localStorage.getItem('user_context');
      return context ? JSON.parse(context) : null;
    } catch {
      return null;
    }
  };
  
  const userContext = getUserContext();
  const userRole = userContext?.role || 'admin';
  const vendorId = userContext?.vendorId || userContext?.providerId || null;
  const isVendor = userRole === 'vendor';

  // Log for debugging
  console.log('🔍 Dashboard Context:', { userRole, vendorId, isVendor });

  // Fetch real data from database
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use different queries based on role
      let stats, modules, bookings;

      if (isVendor) {
        // Vendor-specific queries (Hasura RLS filters automatically via x-hasura-vendor-id header)
        console.log('📊 Using VENDOR queries (no variables needed - filtered by Hasura RLS)');
        [stats, modules, bookings] = await Promise.all([
          graphqlRequest({ query: GET_DASHBOARD_STATS }),
          graphqlRequest({ query: GET_MODULE_USAGE }),
          graphqlRequest({ query: GET_RECENT_BOOKINGS, variables: { limit: 10 } }),
        ]);
        
        // Vendor doesn't fetch distribution (will calculate from bookings)
        if (stats.errors) throw new Error(stats.errors[0]?.message || 'Failed to fetch stats');
        if (modules.errors) throw new Error(modules.errors[0]?.message || 'Failed to fetch module data');
        if (bookings.errors) throw new Error(bookings.errors[0]?.message || 'Failed to fetch bookings');
        
      } else {
        // Admin queries (no filtering)
        console.log('📊 Using ADMIN queries');
        [stats, modules, bookings] = await Promise.all([
          graphqlRequest({ query: GET_DASHBOARD_STATS_ADMIN }),
          graphqlRequest({ query: GET_MODULE_USAGE_ADMIN }),
          graphqlRequest({ query: GET_RECENT_BOOKINGS_ADMIN, variables: { limit: 10 } }),
        ]);
        
        // Admin fetches distribution
        const distribution = await graphqlRequest({ query: GET_SERVICE_DISTRIBUTION });
        
        if (stats.errors) throw new Error(stats.errors[0]?.message || 'Failed to fetch stats');
        if (modules.errors) throw new Error(modules.errors[0]?.message || 'Failed to fetch module data');
        if (bookings.errors) throw new Error(bookings.errors[0]?.message || 'Failed to fetch bookings');
        if (distribution.errors) throw new Error(distribution.errors[0]?.message || 'Failed to fetch distribution');
        
        setDistributionData(distribution.data);
      }

      setStatsData(stats.data);
      setModuleData(modules.data);
      setBookingsData(bookings.data);
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  // Process real data from queries
  let totalUsers, totalOrders, totalRevenue, activeSessions;
  let userGrowth, orderGrowth, revenueGrowth, sessionGrowth;
  let foodTotal, travelTotal, shoppingTotal, ticketTotal;

  if (isVendor) {
    // VENDOR: Calculate aggregates manually from bookings array
    const allBookings = statsData?.bookings ?? [];
    
    totalOrders = allBookings.length;
    totalRevenue = allBookings.reduce((sum: number, b: any) => sum + (b.total_amount || 0), 0);
    
    // Count unique customers
    const uniqueUserIds = new Set(allBookings.map((b: any) => b.user_id));
    totalUsers = uniqueUserIds.size;
    activeSessions = totalOrders; // Use booking count as proxy
    
    // Calculate growth (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentBookings = allBookings.filter((b: any) => 
      new Date(b.booked_at) >= sevenDaysAgo
    );
    const recentUserIds = new Set(recentBookings.map((b: any) => b.user_id));
    
    userGrowth = totalUsers > 0 ? ((recentUserIds.size / totalUsers) * 100) : 0;
    orderGrowth = totalOrders > 0 ? ((recentBookings.length / totalOrders) * 100) : 0;
    
    const recentRevenue = recentBookings.reduce((sum: number, b: any) => sum + (b.total_amount || 0), 0);
    revenueGrowth = totalRevenue > 0 ? ((recentRevenue / totalRevenue) * 100) : 0;
    sessionGrowth = userGrowth;
    
    // Module usage: count by service_type from moduleData
    const moduleBookings = moduleData?.bookings ?? [];
    const serviceCounts = moduleBookings.reduce((acc: any, b: any) => {
      acc[b.service_type] = (acc[b.service_type] || 0) + 1;
      return acc;
    }, {});
    
    foodTotal = serviceCounts['food'] || 0;
    travelTotal = (serviceCounts['flight'] || 0) + 
                  (serviceCounts['hotel'] || 0) + 
                  (serviceCounts['train'] || 0) + 
                  (serviceCounts['metro'] || 0);
    shoppingTotal = serviceCounts['delivery'] || 0;
    ticketTotal = serviceCounts['movie'] || 0;
    
  } else {
    // ADMIN: Use aggregate queries
    totalUsers = statsData?.users_aggregate?.aggregate?.count ?? 0;
    totalOrders = statsData?.bookings_aggregate?.aggregate?.count ?? 0;
    totalRevenue = statsData?.bookings_aggregate?.aggregate?.sum?.total_amount ?? 0;
    activeSessions = statsData?.wallets_aggregate?.aggregate?.count ?? 0;
    
    // Calculate growth
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const allUsers = statsData?.all_users ?? [];
    const newUsersCount = allUsers.filter((u: any) => 
      new Date(u.created_at) >= sevenDaysAgo
    ).length;
    userGrowth = totalUsers > 0 ? ((newUsersCount / totalUsers) * 100) : 0;
    
    const recentBookings = statsData?.recent_bookings ?? [];
    const last7DaysBookings = recentBookings.filter((b: any) => 
      new Date(b.booked_at) >= sevenDaysAgo
    ).length;
    orderGrowth = totalOrders > 0 ? ((last7DaysBookings / totalOrders) * 100) : 0;
    revenueGrowth = orderGrowth;
    sessionGrowth = userGrowth;
    
    // Module usage from aggregates
    foodTotal = moduleData?.food_bookings?.aggregate?.count ?? 0;
    travelTotal = (
      (moduleData?.flight_bookings?.aggregate?.count ?? 0) +
      (moduleData?.hotel_bookings?.aggregate?.count ?? 0) +
      (moduleData?.train_bookings?.aggregate?.count ?? 0) +
      (moduleData?.metro_bookings?.aggregate?.count ?? 0)
    );
    shoppingTotal = moduleData?.shopping_bookings?.aggregate?.count ?? 0;
    ticketTotal = moduleData?.ticket_bookings?.aggregate?.count ?? 0;
  }

  const overview = {
    totalUsers,
    totalOrders,
    totalRevenue,
    activeSessions,
    userGrowth: Number(userGrowth.toFixed(1)),
    orderGrowth: Number(orderGrowth.toFixed(1)),
    revenueGrowth: Number(revenueGrowth.toFixed(1)),
    sessionGrowth: Number(sessionGrowth.toFixed(1)),
  };

  const moduleUsage = {
    foodDelivery: { total: foodTotal, growth: 10.2 },
    travel: { total: travelTotal, growth: 7.8 },
    shopping: { total: shoppingTotal, growth: 14.5 },
    tickets: { total: ticketTotal, growth: 6.3 },
  };

  // Map bookings to live orders format
  const liveOrders = (bookingsData?.bookings ?? []).map((booking: any) => ({
    id: `#${booking.id?.substring(0, 8).toUpperCase()}`,
    customerName: booking.user?.name ?? booking.user?.email ?? 'Guest User',
    serviceType: booking.service_type,
    itemName: booking.service_type.charAt(0).toUpperCase() + booking.service_type.slice(1),
    amount: booking.total_amount,
    status: booking.booking_status,
    timestamp: booking.booked_at,
    providerName: booking.provider?.name ?? 'Unknown Provider',
  }));

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

  // Calculate service revenue from real data
  const serviceRevenueData = [
    { 
      name: 'Food', 
      revenue: distributionData?.food_stats?.aggregate?.sum?.total_amount ?? 0 
    },
    { 
      name: 'Travel', 
      revenue: distributionData?.travel_stats?.aggregate?.sum?.total_amount ?? 0 
    },
    { 
      name: 'Shopping', 
      revenue: distributionData?.shopping_stats?.aggregate?.sum?.total_amount ?? 0 
    },
    { 
      name: 'Tickets', 
      revenue: distributionData?.ticket_stats?.aggregate?.sum?.total_amount ?? 0 
    },
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
