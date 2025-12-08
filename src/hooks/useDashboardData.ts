import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch complete dashboard data
 * 
 * CONFIGURATION:
 * - To use real backend: Set VITE_API_ENDPOINT in .env file
 * - Otherwise: Uses mock data for development
 */
export const useDashboardData = (dateRange: string = '30days') => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // If API endpoint is configured, fetch from backend
      if (API_ENDPOINT) {
        const response = await fetch(`${API_ENDPOINT}/api/dashboard/stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add auth header if needed
            // 'Authorization': `Bearer ${yourToken}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } else {
        // Use mock data for development
        console.log('📊 Using mock data - Set VITE_API_ENDPOINT in .env to use real backend');
        
        setData({
          overview: {
            totalUsers: 125847,
            totalOrders: 45621,
            totalRevenue: 18500000,
            activeSessions: 2847,
            userGrowth: 12.5,
            orderGrowth: 8.2,
            revenueGrowth: 15.3,
            sessionGrowth: -3.1,
          },
          moduleUsage: {
            foodDelivery: {
              total: 4500,
              growth: 9.3,
            },
            travel: {
              total: 3200,
              growth: 12.7,
            },
            shopping: {
              total: 2800,
              growth: 6.4,
            },
            tickets: {
              total: 1900,
              growth: 18.9,
            },
          },
          liveOrders: [
            {
              id: '#ORD-12345',
              customerName: 'John Doe',
              serviceType: 'food',
              itemName: 'Biryani Combo',
              amount: 450.99,
              status: 'confirmed',
              timestamp: new Date().toISOString(),
              providerName: 'Paradise Restaurant',
            },
            {
              id: '#ORD-12346',
              customerName: 'Jane Smith',
              serviceType: 'flight',
              itemName: 'Mumbai to Delhi',
              amount: 5299.00,
              status: 'pending',
              timestamp: new Date(Date.now() - 120000).toISOString(),
              providerName: 'IndiGo Airlines',
            },
            {
              id: '#ORD-12347',
              customerName: 'Bob Johnson',
              serviceType: 'delivery',
              itemName: 'iPhone 15 Pro',
              amount: 129999.99,
              status: 'completed',
              timestamp: new Date(Date.now() - 300000).toISOString(),
              providerName: 'Amazon India',
            },
            {
              id: '#ORD-12348',
              customerName: 'Alice Williams',
              serviceType: 'movie',
              itemName: 'Avengers 2 Tickets',
              amount: 800.00,
              status: 'confirmed',
              timestamp: new Date(Date.now() - 450000).toISOString(),
              providerName: 'PVR Cinemas',
            },
          ],
        });
      }

      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, [dateRange]);

  return {
    overview: data?.overview,
    moduleUsage: data?.moduleUsage,
    revenueTrend: [],
    serviceRevenue: [],
    moduleDistribution: [],
    liveOrders: data?.liveOrders || [],
    topAreas: [],
    topVendors: [],
    settlementOverview: null,
    loading,
    error,
    refetch: fetchData,
  };
};
