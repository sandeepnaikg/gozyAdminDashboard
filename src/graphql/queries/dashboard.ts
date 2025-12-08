// =====================================================
// DASHBOARD OVERVIEW QUERIES
// =====================================================
// NOTE: This file contains Apollo Client style queries.
// For Hasura direct queries, use: src/graphql/queries/hasura.ts

export const GET_DASHBOARD_OVERVIEW = `
  query GetDashboardOverview($dateRange: String) {
    dashboardOverview(dateRange: $dateRange) {
      totalUsers
      totalOrders
      totalRevenue
      activeSessions
      userGrowth
      orderGrowth
      revenueGrowth
      sessionGrowth
    }
  }
`;

// =====================================================
// MODULE-WISE USAGE QUERIES
// =====================================================

export const GET_MODULE_USAGE = `
  query GetModuleUsage($dateRange: String) {
    moduleUsage(dateRange: $dateRange) {
      foodDelivery {
        total
        growth
      }
      travel {
        total
        growth
      }
      shopping {
        total
        growth
      }
      tickets {
        total
        growth
      }
    }
  }
`;

// =====================================================
// REVENUE TREND QUERY
// =====================================================

export const GET_REVENUE_TREND = `
  query GetRevenueTrend($months: Int) {
    revenueTrend(months: $months) {
      month
      value
      foodRevenue
      travelRevenue
      shoppingRevenue
      ticketsRevenue
    }
  }
`;

// =====================================================
// SERVICE REVENUE QUERY
// =====================================================

export const GET_SERVICE_REVENUE = `
  query GetServiceRevenue($dateRange: String) {
    serviceRevenue(dateRange: $dateRange) {
      serviceName
      revenue
      bookings
      growth
    }
  }
`;

// =====================================================
// MODULE USAGE DISTRIBUTION
// =====================================================

export const GET_MODULE_DISTRIBUTION = `
  query GetModuleDistribution($dateRange: String) {
    moduleDistribution(dateRange: $dateRange) {
      name
      value
      percentage
      color
    }
  }
`;

// =====================================================
// LIVE ORDERS FEED
// =====================================================

export const GET_LIVE_ORDERS = `
  query GetLiveOrders($limit: Int) {
    liveOrders(limit: $limit) {
      id
      customerName
      serviceType
      itemName
      amount
      status
      timestamp
      providerName
    }
  }
`;

export const SUBSCRIBE_LIVE_ORDERS = `
  subscription OnNewOrder {
    newOrder {
      id
      customerName
      serviceType
      itemName
      amount
      status
      timestamp
      providerName
    }
  }
`;

// =====================================================
// TOP DEMANDED AREAS
// =====================================================

export const GET_TOP_AREAS = `
  query GetTopAreas($limit: Int, $dateRange: String) {
    topAreas(limit: $limit, dateRange: $dateRange) {
      area
      orders
      revenue
      growth
      topService
    }
  }
`;

// =====================================================
// VENDOR ANALYTICS (Admin View)
// =====================================================

export const GET_ALL_VENDORS_OVERVIEW = `
  query GetAllVendorsOverview {
    vendorsOverview {
      totalVendors
      activeVendors
      totalProviders
      pendingApprovals
    }
  }
`;

export const GET_TOP_VENDORS = `
  query GetTopVendors($limit: Int, $sortBy: String) {
    topVendors(limit: $limit, sortBy: $sortBy) {
      vendorAccountId
      businessName
      serviceType
      totalBookings
      totalRevenue
      averageRating
      currentMonthRevenue
      growth
    }
  }
`;

// =====================================================
// SETTLEMENT OVERVIEW (Admin)
// =====================================================

export const GET_SETTLEMENT_OVERVIEW = `
  query GetSettlementOverview {
    settlementOverview {
      totalPending
      totalProcessing
      totalCompleted
      pendingAmount
      completedAmount
      totalCommission
    }
  }
`;

export const GET_PENDING_SETTLEMENTS = `
  query GetPendingSettlements($limit: Int) {
    pendingSettlements(limit: $limit) {
      id
      vendorAccountId
      businessName
      bookingId
      grossAmount
      commissionAmount
      netAmount
      settlementStatus
      createdAt
      daysOverdue
    }
  }
`;

// =====================================================
// BOOKING ANALYTICS
// =====================================================

export const GET_BOOKING_ANALYTICS = `
  query GetBookingAnalytics($dateRange: String) {
    bookingAnalytics(dateRange: $dateRange) {
      totalBookings
      confirmedBookings
      cancelledBookings
      completedBookings
      cancellationRate
      completionRate
      averageBookingValue
      bookingsByService {
        serviceType
        count
        revenue
      }
    }
  }
`;

// =====================================================
// CUSTOMER ANALYTICS
// =====================================================

export const GET_CUSTOMER_ANALYTICS = `
  query GetCustomerAnalytics($dateRange: String) {
    customerAnalytics(dateRange: $dateRange) {
      totalCustomers
      newCustomers
      activeCustomers
      repeatCustomers
      customerRetentionRate
      averageLifetimeValue
      topCustomers {
        userId
        name
        email
        totalBookings
        totalSpent
      }
    }
  }
`;

// =====================================================
// PERFORMANCE METRICS
// =====================================================

export const GET_PERFORMANCE_METRICS = `
  query GetPerformanceMetrics($dateRange: String) {
    performanceMetrics(dateRange: $dateRange) {
      averageResponseTime
      successRate
      errorRate
      uptime
      peakHours {
        hour
        bookings
      }
    }
  }
`;

// =====================================================
// COMBINED DASHBOARD QUERY (Single Request)
// =====================================================

export const GET_COMPLETE_DASHBOARD = `
  query GetCompleteDashboard($dateRange: String) {
    dashboardOverview(dateRange: $dateRange) {
      totalUsers
      totalOrders
      totalRevenue
      activeSessions
      userGrowth
      orderGrowth
      revenueGrowth
      sessionGrowth
    }
    
    moduleUsage(dateRange: $dateRange) {
      foodDelivery {
        total
        growth
      }
      travel {
        total
        growth
      }
      shopping {
        total
        growth
      }
      tickets {
        total
        growth
      }
    }
    
    revenueTrend(months: 6) {
      month
      value
      foodRevenue
      travelRevenue
      shoppingRevenue
      ticketsRevenue
    }
    
    serviceRevenue(dateRange: $dateRange) {
      serviceName
      revenue
      bookings
      growth
    }
    
    moduleDistribution(dateRange: $dateRange) {
      name
      value
      percentage
      color
    }
    
    liveOrders(limit: 10) {
      id
      customerName
      serviceType
      itemName
      amount
      status
      timestamp
      providerName
    }
    
    topAreas(limit: 5, dateRange: $dateRange) {
      area
      orders
      revenue
      growth
      topService
    }
    
    topVendors(limit: 10, sortBy: "revenue") {
      vendorAccountId
      businessName
      serviceType
      totalBookings
      totalRevenue
      averageRating
      currentMonthRevenue
      growth
    }
    
    settlementOverview {
      totalPending
      totalProcessing
      totalCompleted
      pendingAmount
      completedAmount
      totalCommission
    }
  }
`;

