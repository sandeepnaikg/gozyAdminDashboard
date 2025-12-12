// =====================================================
// REAL DATABASE DASHBOARD QUERIES
// =====================================================
// These are raw GraphQL query strings for use with fetch-based client
// Supports vendor-specific filtering via Hasura permissions

export const GET_DASHBOARD_STATS = `
  query GetDashboardStats {
    # Fetch ALL bookings for vendor (Hasura RLS filters automatically)
    # We'll calculate aggregates in JavaScript since vendor role can't access bookings_aggregate
    bookings {
      id
      booked_at
      user_id
      service_type
      total_amount
      payment_status
      booking_status
    }
  }
`;

export const GET_DASHBOARD_STATS_ADMIN = `
  query GetDashboardStatsAdmin {
    # Total Users
    users_aggregate {
      aggregate {
        count
      }
    }
    
    # Total Bookings
    bookings_aggregate {
      aggregate {
        count
        sum {
          total_amount
        }
      }
    }
    
    # Active Sessions (users with wallets)
    wallets_aggregate {
      aggregate {
        count
      }
    }
    
    # Service-wise booking counts
    bookings_by_service: bookings_aggregate {
      nodes {
        service_type
      }
    }
    
    # Recent bookings with growth calculation
    recent_bookings: bookings(
      order_by: { booked_at: desc }
      limit: 100
    ) {
      id
      booked_at
    }
    
    # All users (we'll calculate growth on frontend)
    all_users: users(order_by: { created_at: desc }) {
      id
      created_at
    }
  }
`;

export const GET_MODULE_USAGE = `
  query GetModuleUsage {
    # Fetch all bookings with service_type (Hasura RLS filters automatically)
    # We'll count by service type in JavaScript since vendor can't access bookings_aggregate
    bookings {
      service_type
    }
  }
`;

export const GET_MODULE_USAGE_ADMIN = `
  query GetModuleUsageAdmin {
    # Food bookings
    food_bookings: bookings_aggregate(
      where: { service_type: { _eq: "food" } }
    ) {
      aggregate {
        count
      }
    }
    
    # Travel bookings (flight + hotel + train + metro)
    flight_bookings: bookings_aggregate(
      where: { service_type: { _eq: "flight" } }
    ) {
      aggregate {
        count
      }
    }
    
    hotel_bookings: bookings_aggregate(
      where: { service_type: { _eq: "hotel" } }
    ) {
      aggregate {
        count
      }
    }
    
    train_bookings: bookings_aggregate(
      where: { service_type: { _eq: "train" } }
    ) {
      aggregate {
        count
      }
    }
    
    metro_bookings: bookings_aggregate(
      where: { service_type: { _eq: "metro" } }
    ) {
      aggregate {
        count
      }
    }
    
    # Shopping (delivery items)
    shopping_bookings: bookings_aggregate(
      where: { service_type: { _eq: "delivery" } }
    ) {
      aggregate {
        count
      }
    }
    
    # Tickets (movies)
    ticket_bookings: bookings_aggregate(
      where: { service_type: { _eq: "movie" } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_RECENT_BOOKINGS = `
  query GetRecentBookings($limit: Int = 10) {
    bookings(
      order_by: { booked_at: desc }
      limit: $limit
    ) {
      id
      user_id
      service_type
      total_amount
      payment_status
      booking_status
      booked_at
      provider {
        name
      }
    }
  }
`;

export const GET_RECENT_BOOKINGS_ADMIN = `
  query GetRecentBookingsAdmin($limit: Int = 10) {
    bookings(
      order_by: { booked_at: desc }
      limit: $limit
    ) {
      id
      user_id
      service_type
      total_amount
      payment_status
      booking_status
      booked_at
      provider {
        name
      }
      user {
        name
        email
      }
    }
  }
`;

export const GET_REVENUE_TREND = `
  query GetRevenueTrend {
    bookings(
      where: { 
        payment_status: { _eq: "completed" }
      }
      order_by: { booked_at: asc }
      limit: 100
    ) {
      booked_at
      total_amount
      service_type
    }
  }
`;

export const GET_SERVICE_DISTRIBUTION = `
  query GetServiceDistribution {
    bookings_aggregate(
      where: { payment_status: { _eq: "completed" } }
    ) {
      aggregate {
        count
        sum {
          total_amount
        }
      }
    }
    
    food_stats: bookings_aggregate(
      where: { 
        service_type: { _eq: "food" },
        payment_status: { _eq: "completed" }
      }
    ) {
      aggregate {
        count
        sum {
          total_amount
        }
      }
    }
    
    travel_stats: bookings_aggregate(
      where: { 
        service_type: { _in: ["flight", "hotel", "train", "metro"] },
        payment_status: { _eq: "completed" }
      }
    ) {
      aggregate {
        count
        sum {
          total_amount
        }
      }
    }
    
    shopping_stats: bookings_aggregate(
      where: { 
        service_type: { _eq: "delivery" },
        payment_status: { _eq: "completed" }
      }
    ) {
      aggregate {
        count
        sum {
          total_amount
        }
      }
    }
    
    ticket_stats: bookings_aggregate(
      where: { 
        service_type: { _eq: "movie" },
        payment_status: { _eq: "completed" }
      }
    ) {
      aggregate {
        count
        sum {
          total_amount
        }
      }
    }
  }
`;

export const GET_TOP_PROVIDERS = `
  query GetTopProviders($limit: Int = 10) {
    providers(
      order_by: { 
        bookings_aggregate: { count: desc }
      }
      limit: $limit
    ) {
      id
      name
      service_type
      bookings_aggregate {
        aggregate {
          count
          sum {
            total_amount
          }
        }
      }
    }
  }
`;

export const GET_WALLET_STATS = `
  query GetWalletStats {
    wallets_aggregate {
      aggregate {
        count
        sum {
          balance
        }
        avg {
          balance
        }
      }
    }
    
    # Recent transactions
    wallet_transactions(
      order_by: { created_at: desc }
      limit: 20
    ) {
      id
      type
      amount
      description
      created_at
      wallet {
        user {
          name
          email
        }
      }
    }
  }
`;
