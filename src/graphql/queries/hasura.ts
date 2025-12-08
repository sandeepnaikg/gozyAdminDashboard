/**
 * HASURA-SPECIFIC QUERIES
 * 
 * Hasura auto-generates GraphQL from your PostgreSQL schema.
 * These queries use Hasura's query format which directly maps to your tables and views.
 * 
 * These are plain string queries used with the fetch-based GraphQL client.
 */

// =====================================================
// DASHBOARD QUERIES
// =====================================================

export const GET_DASHBOARD_STATS = `
  query GetDashboardStats {
    # Total users count
    users_aggregate {
      aggregate {
        count
      }
    }
    
    # Total bookings and revenue
    bookings_aggregate(where: { payment_status: { _eq: "completed" } }) {
      aggregate {
        count
        sum {
          total_amount
        }
      }
    }
    
    # Active bookings count
    active_bookings: bookings_aggregate(
      where: { booking_status: { _in: ["pending", "confirmed"] } }
    ) {
      aggregate {
        count
      }
    }
    
    # Bookings by service type
    food_bookings: bookings_aggregate(where: { service_type: { _eq: "food" } }) {
      aggregate {
        count
      }
    }
    
    travel_bookings: bookings_aggregate(
      where: { service_type: { _in: ["flight", "hotel", "train"] } }
    ) {
      aggregate {
        count
      }
    }
    
    shopping_bookings: bookings_aggregate(where: { service_type: { _eq: "delivery" } }) {
      aggregate {
        count
      }
    }
    
    tickets_bookings: bookings_aggregate(
      where: { service_type: { _in: ["movie", "metro"] } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_REVENUE_TREND = `
  query GetRevenueTrend($startDate: timestamptz!, $months: Int!) {
    bookings(
      where: {
        booked_at: { _gte: $startDate }
        payment_status: { _eq: "completed" }
      }
      order_by: { booked_at: asc }
    ) {
      booked_at
      total_amount
      service_type
    }
  }
`;

export const GET_SERVICE_REVENUE = `
  query GetServiceRevenue($startDate: timestamptz!) {
    food_revenue: bookings_aggregate(
      where: {
        service_type: { _eq: "food" }
        payment_status: { _eq: "completed" }
        booked_at: { _gte: $startDate }
      }
    ) {
      aggregate {
        count
        sum {
          total_amount
        }
      }
    }
    
    travel_revenue: bookings_aggregate(
      where: {
        service_type: { _in: ["flight", "hotel", "train"] }
        payment_status: { _eq: "completed" }
        booked_at: { _gte: $startDate }
      }
    ) {
      aggregate {
        count
        sum {
          total_amount
        }
      }
    }
    
    shopping_revenue: bookings_aggregate(
      where: {
        service_type: { _eq: "delivery" }
        payment_status: { _eq: "completed" }
        booked_at: { _gte: $startDate }
      }
    ) {
      aggregate {
        count
        sum {
          total_amount
        }
      }
    }
    
    tickets_revenue: bookings_aggregate(
      where: {
        service_type: { _in: ["movie", "metro"] }
        payment_status: { _eq: "completed" }
        booked_at: { _gte: $startDate }
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

export const GET_LIVE_ORDERS = `
  query GetLiveOrders($limit: Int!) {
    bookings(
      order_by: { booked_at: desc }
      limit: $limit
    ) {
      id
      total_amount
      booking_status
      payment_status
      service_type
      booked_at
      user {
        name
        email
      }
      provider {
        name
      }
    }
  }
`;

export const SUBSCRIBE_LIVE_ORDERS = `
  subscription OnNewBooking {
    bookings(
      order_by: { booked_at: desc }
      limit: 10
    ) {
      id
      total_amount
      booking_status
      payment_status
      service_type
      booked_at
      user {
        name
        email
      }
      provider {
        name
      }
    }
  }
`;

export const GET_TOP_AREAS = `
  query GetTopAreas {
    users(
      where: { 
        bookings: { 
          payment_status: { _eq: "completed" } 
        } 
      }
      distinct_on: city
    ) {
      city
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
    }
  }
`;

// =====================================================
// VENDOR QUERIES
// =====================================================

export const GET_VENDOR_DASHBOARD = `
  query GetVendorDashboard($vendorId: uuid!) {
    vendor_revenue_dashboard(
      where: { vendor_account_id: { _eq: $vendorId } }
    ) {
      business_name
      service_type
      total_bookings
      confirmed_bookings
      cancelled_bookings
      completed_bookings
      total_revenue
      current_month_revenue
      last_month_revenue
    }
  }
`;

export const GET_VENDOR_BOOKINGS = `
  query GetVendorBookings(
    $vendorId: uuid!
    $limit: Int!
    $offset: Int!
    $status: String
    $serviceType: String
  ) {
    vendor_booking_details(
      where: {
        vendor_account_id: { _eq: $vendorId }
        booking_status: { _eq: $status }
        service_type: { _eq: $serviceType }
      }
      order_by: { booked_at: desc }
      limit: $limit
      offset: $offset
    ) {
      booking_id
      item_id
      provider_name
      service_type
      customer_name
      customer_email
      customer_phone
      total_amount
      payment_status
      booking_status
      booked_at
    }
    
    vendor_booking_details_aggregate(
      where: {
        vendor_account_id: { _eq: $vendorId }
        booking_status: { _eq: $status }
        service_type: { _eq: $serviceType }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_VENDOR_SERVICE_PERFORMANCE = `
  query GetVendorServicePerformance($vendorId: uuid!) {
    vendor_service_performance(
      where: { vendor_account_id: { _eq: $vendorId } }
    ) {
      provider_id
      provider_name
      service_type
      total_services
      total_ratings
      average_rating
      positive_ratings
      negative_ratings
    }
  }
`;

export const GET_VENDOR_SETTLEMENTS = `
  query GetVendorSettlements(
    $vendorId: uuid!
    $status: String
    $limit: Int!
    $offset: Int!
  ) {
    vendor_settlements(
      where: {
        vendor_account_id: { _eq: $vendorId }
        settlement_status: { _eq: $status }
      }
      order_by: { created_at: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      booking_id
      gross_amount
      commission_rate
      commission_amount
      net_amount
      settlement_status
      settled_at
      created_at
      booking {
        user {
          name
        }
        service_type
      }
    }
    
    vendor_settlements_aggregate(
      where: {
        vendor_account_id: { _eq: $vendorId }
        settlement_status: { _eq: $status }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_VENDOR_SETTLEMENT_SUMMARY = `
  query GetVendorSettlementSummary($vendorId: uuid!) {
    vendor_settlement_summary(
      where: { vendor_account_id: { _eq: $vendorId } }
    ) {
      business_name
      total_settlements
      total_gross_amount
      total_commission
      total_net_amount
      settled_amount
      pending_amount
      last_settlement_date
    }
  }
`;

export const GET_VENDOR_MONTHLY_ANALYTICS = `
  query GetVendorMonthlyAnalytics($vendorId: uuid!, $startDate: timestamptz!) {
    vendor_monthly_analytics(
      where: {
        vendor_account_id: { _eq: $vendorId }
        month: { _gte: $startDate }
      }
      order_by: { month: desc }
    ) {
      month
      bookings_count
      revenue
      unique_customers
      avg_booking_value
    }
  }
`;

export const GET_VENDOR_PROFILE = `
  query GetVendorProfile($vendorId: uuid!) {
    vendor_accounts_by_pk(id: $vendorId) {
      id
      email
      phone
      is_active
      is_verified
      created_at
      vendor_profile {
        business_name
        business_type
        registration_number
        tax_id
        address
        city
        state
        country
        postal_code
        contact_person_name
        contact_person_email
        contact_person_phone
        updated_at
      }
    }
  }
`;

export const GET_VENDOR_BANK_ACCOUNTS = `
  query GetVendorBankAccounts($vendorId: uuid!) {
    vendor_bank_accounts(
      where: { vendor_account_id: { _eq: $vendorId } }
      order_by: [{ is_primary: desc }, { created_at: desc }]
    ) {
      id
      bank_name
      account_holder_name
      account_number
      ifsc_code
      account_type
      is_primary
      is_verified
      created_at
    }
  }
`;

export const GET_VENDOR_PROVIDERS = `
  query GetVendorProviders($vendorId: uuid!) {
    providers(
      where: { vendor_account_id: { _eq: $vendorId } }
    ) {
      id
      name
      service_type
      website_url
      contact_email
      contact_phone
      is_active
      created_at
      bookings_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

// =====================================================
// ADMIN QUERIES
// =====================================================

export const GET_ALL_VENDORS = `
  query GetAllVendors(
    $limit: Int!
    $offset: Int!
    $search: String
    $isActive: Boolean
  ) {
    vendor_accounts(
      where: {
        is_active: { _eq: $isActive }
        _or: [
          { email: { _ilike: $search } }
          { vendor_profile: { business_name: { _ilike: $search } } }
        ]
      }
      order_by: { created_at: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      email
      phone
      is_active
      is_verified
      created_at
      vendor_profile {
        business_name
        business_type
      }
      providers_aggregate {
        aggregate {
          count
        }
      }
    }
    
    vendor_accounts_aggregate(
      where: {
        is_active: { _eq: $isActive }
        _or: [
          { email: { _ilike: $search } }
          { vendor_profile: { business_name: { _ilike: $search } } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_TOP_VENDORS = `
  query GetTopVendors($limit: Int!) {
    vendor_revenue_dashboard(
      order_by: { total_revenue: desc }
      limit: $limit
    ) {
      vendor_account_id
      business_name
      service_type
      total_bookings
      total_revenue
      current_month_revenue
    }
  }
`;

export const GET_SETTLEMENT_OVERVIEW = `
  query GetSettlementOverview {
    pending: vendor_settlements_aggregate(
      where: { settlement_status: { _eq: "pending" } }
    ) {
      aggregate {
        count
        sum {
          net_amount
        }
      }
    }
    
    processing: vendor_settlements_aggregate(
      where: { settlement_status: { _eq: "processing" } }
    ) {
      aggregate {
        count
        sum {
          net_amount
        }
      }
    }
    
    completed: vendor_settlements_aggregate(
      where: { settlement_status: { _eq: "completed" } }
    ) {
      aggregate {
        count
        sum {
          net_amount
          commission_amount
        }
      }
    }
  }
`;

export const GET_PENDING_SETTLEMENTS = `
  query GetPendingSettlements($limit: Int!) {
    vendor_settlements(
      where: { settlement_status: { _eq: "pending" } }
      order_by: { created_at: asc }
      limit: $limit
    ) {
      id
      vendor_account_id
      booking_id
      gross_amount
      commission_amount
      net_amount
      settlement_status
      created_at
      vendor_account {
        vendor_profile {
          business_name
        }
      }
    }
  }
`;

// =====================================================
// MUTATIONS
// =====================================================

export const UPDATE_VENDOR_PROFILE = `
  mutation UpdateVendorProfile($vendorId: uuid!, $input: vendor_profiles_set_input!) {
    update_vendor_profiles(
      where: { vendor_account_id: { _eq: $vendorId } }
      _set: $input
    ) {
      affected_rows
      returning {
        business_name
        contact_person_name
        contact_person_email
        contact_person_phone
        address
        city
        state
        postal_code
        updated_at
      }
    }
  }
`;

export const ADD_VENDOR_BANK_ACCOUNT = `
  mutation AddVendorBankAccount($input: vendor_bank_accounts_insert_input!) {
    insert_vendor_bank_accounts_one(object: $input) {
      id
      bank_name
      account_holder_name
      account_number
      ifsc_code
      account_type
      is_primary
      is_verified
      created_at
    }
  }
`;

export const PROCESS_SETTLEMENT = `
  mutation ProcessSettlement($settlementId: uuid!, $status: String!, $settledAt: timestamptz) {
    update_vendor_settlements_by_pk(
      pk_columns: { id: $settlementId }
      _set: { settlement_status: $status, settled_at: $settledAt }
    ) {
      id
      settlement_status
      settled_at
    }
  }
`;

export const APPROVE_VENDOR = `
  mutation ApproveVendor($vendorId: uuid!) {
    update_vendor_accounts_by_pk(
      pk_columns: { id: $vendorId }
      _set: { is_verified: true, is_active: true }
    ) {
      id
      is_verified
      is_active
    }
  }
`;

export const DEACTIVATE_VENDOR = `
  mutation DeactivateVendor($vendorId: uuid!) {
    update_vendor_accounts_by_pk(
      pk_columns: { id: $vendorId }
      _set: { is_active: false }
    ) {
      id
      is_active
    }
  }
`;

