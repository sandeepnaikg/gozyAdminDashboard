// =====================================================
// VENDOR DASHBOARD QUERIES (Vendor Portal)
// =====================================================
// NOTE: This file contains Apollo Client style queries.
// For Hasura direct queries, use: src/graphql/queries/hasura.ts

export const GET_VENDOR_DASHBOARD = `
  query GetVendorDashboard($vendorAccountId: ID!, $dateRange: String) {
    vendorDashboard(vendorAccountId: $vendorAccountId, dateRange: $dateRange) {
      businessName
      serviceType
      totalBookings
      confirmedBookings
      cancelledBookings
      completedBookings
      totalRevenue
      currentMonthRevenue
      lastMonthRevenue
      revenueGrowth
      averageRating
      totalRatings
      positiveRatings
      negativeRatings
    }
  }
`;

// =====================================================
// VENDOR BOOKINGS
// =====================================================

export const GET_VENDOR_BOOKINGS = `
  query GetVendorBookings(
    $vendorAccountId: ID!
    $page: Int
    $limit: Int
    $status: String
    $serviceType: String
    $dateRange: String
  ) {
    vendorBookings(
      vendorAccountId: $vendorAccountId
      page: $page
      limit: $limit
      status: $status
      serviceType: $serviceType
      dateRange: $dateRange
    ) {
      total
      page
      limit
      bookings {
        bookingId
        itemId
        providerName
        serviceType
        customerName
        customerEmail
        customerPhone
        totalAmount
        paymentStatus
        bookingStatus
        bookedAt
        serviceName
        serviceDetails
      }
    }
  }
`;

// =====================================================
// VENDOR SERVICE PERFORMANCE
// =====================================================

export const GET_VENDOR_SERVICE_PERFORMANCE = `
  query GetVendorServicePerformance($vendorAccountId: ID!) {
    vendorServicePerformance(vendorAccountId: $vendorAccountId) {
      providerId
      providerName
      serviceType
      totalServices
      totalRatings
      averageRating
      positiveRatings
      negativeRatings
      recentReviews {
        rating
        review
        customerName
        createdAt
      }
    }
  }
`;

// =====================================================
// VENDOR SETTLEMENTS
// =====================================================

export const GET_VENDOR_SETTLEMENTS = `
  query GetVendorSettlements(
    $vendorAccountId: ID!
    $status: String
    $page: Int
    $limit: Int
  ) {
    vendorSettlements(
      vendorAccountId: $vendorAccountId
      status: $status
      page: $page
      limit: $limit
    ) {
      total
      page
      limit
      settlements {
        id
        bookingId
        grossAmount
        commissionRate
        commissionAmount
        netAmount
        settlementStatus
        settledAt
        createdAt
        bookingDetails {
          customerName
          serviceType
          serviceName
        }
      }
    }
  }
`;

export const GET_VENDOR_SETTLEMENT_SUMMARY = `
  query GetVendorSettlementSummary($vendorAccountId: ID!) {
    vendorSettlementSummary(vendorAccountId: $vendorAccountId) {
      businessName
      totalSettlements
      totalGrossAmount
      totalCommission
      totalNetAmount
      settledAmount
      pendingAmount
      processingAmount
      lastSettlementDate
      nextSettlementDate
    }
  }
`;

// =====================================================
// VENDOR MONTHLY ANALYTICS
// =====================================================

export const GET_VENDOR_MONTHLY_ANALYTICS = `
  query GetVendorMonthlyAnalytics($vendorAccountId: ID!, $months: Int) {
    vendorMonthlyAnalytics(vendorAccountId: $vendorAccountId, months: $months) {
      month
      bookingsCount
      revenue
      uniqueCustomers
      avgBookingValue
      commissionPaid
      netEarnings
    }
  }
`;

// =====================================================
// VENDOR PROFILE
// =====================================================

export const GET_VENDOR_PROFILE = `
  query GetVendorProfile($vendorAccountId: ID!) {
    vendorProfile(vendorAccountId: $vendorAccountId) {
      vendorAccountId
      email
      phone
      isActive
      isVerified
      businessName
      businessType
      registrationNumber
      taxId
      address
      city
      state
      country
      postalCode
      contactPersonName
      contactPersonEmail
      contactPersonPhone
      createdAt
      updatedAt
    }
  }
`;

export const GET_VENDOR_BANK_ACCOUNTS = `
  query GetVendorBankAccounts($vendorAccountId: ID!) {
    vendorBankAccounts(vendorAccountId: $vendorAccountId) {
      id
      bankName
      accountHolderName
      accountNumber
      ifscCode
      accountType
      isPrimary
      isVerified
      createdAt
    }
  }
`;

// =====================================================
// VENDOR PROVIDERS & SERVICES
// =====================================================

export const GET_VENDOR_PROVIDERS = `
  query GetVendorProviders($vendorAccountId: ID!) {
    vendorProviders(vendorAccountId: $vendorAccountId) {
      id
      name
      serviceType
      websiteUrl
      contactEmail
      contactPhone
      isActive
      totalServices
      totalBookings
      averageRating
      createdAt
    }
  }
`;

export const GET_VENDOR_SERVICES = `
  query GetVendorServices(
    $vendorAccountId: ID!
    $providerId: ID
    $serviceType: String
  ) {
    vendorServices(
      vendorAccountId: $vendorAccountId
      providerId: $providerId
      serviceType: $serviceType
    ) {
      serviceType
      services {
        id
        name
        description
        price
        availability
        rating
        totalBookings
        imageUrl
        details
      }
    }
  }
`;

// =====================================================
// VENDOR NOTIFICATIONS
// =====================================================

export const GET_VENDOR_NOTIFICATIONS = `
  query GetVendorNotifications(
    $vendorAccountId: ID!
    $page: Int
    $limit: Int
    $isRead: Boolean
  ) {
    vendorNotifications(
      vendorAccountId: $vendorAccountId
      page: $page
      limit: $limit
      isRead: $isRead
    ) {
      total
      unreadCount
      notifications {
        id
        type
        title
        message
        isRead
        createdAt
        metadata
      }
    }
  }
`;

// =====================================================
// ADMIN - ALL VENDORS LIST
// =====================================================

export const GET_ALL_VENDORS = `
  query GetAllVendors(
    $page: Int
    $limit: Int
    $search: String
    $isActive: Boolean
    $serviceType: String
  ) {
    allVendors(
      page: $page
      limit: $limit
      search: $search
      isActive: $isActive
      serviceType: $serviceType
    ) {
      total
      page
      limit
      vendors {
        vendorAccountId
        email
        phone
        businessName
        businessType
        serviceType
        isActive
        isVerified
        totalBookings
        totalRevenue
        averageRating
        pendingSettlements
        createdAt
      }
    }
  }
`;

// =====================================================
// ADMIN - VENDOR DETAILS
// =====================================================

export const GET_VENDOR_DETAILS_ADMIN = `
  query GetVendorDetailsAdmin($vendorAccountId: ID!) {
    vendorDetailsAdmin(vendorAccountId: $vendorAccountId) {
      profile {
        vendorAccountId
        email
        phone
        businessName
        businessType
        registrationNumber
        taxId
        address
        city
        state
        country
        contactPersonName
        contactPersonEmail
        contactPersonPhone
        isActive
        isVerified
        createdAt
      }
      
      analytics {
        totalBookings
        totalRevenue
        averageRating
        currentMonthRevenue
        lastMonthRevenue
        revenueGrowth
      }
      
      settlements {
        totalGrossAmount
        totalCommission
        settledAmount
        pendingAmount
        lastSettlementDate
      }
      
      providers {
        id
        name
        serviceType
        totalServices
        totalBookings
        averageRating
      }
      
      bankAccounts {
        id
        bankName
        accountHolderName
        accountNumber
        ifscCode
        isPrimary
        isVerified
      }
    }
  }
`;

// =====================================================
// MUTATIONS
// =====================================================

export const UPDATE_VENDOR_PROFILE = `
  mutation UpdateVendorProfile($vendorAccountId: ID!, $input: VendorProfileInput!) {
    updateVendorProfile(vendorAccountId: $vendorAccountId, input: $input) {
      success
      message
      profile {
        vendorAccountId
        businessName
        contactPersonName
        contactPersonEmail
        contactPersonPhone
      }
    }
  }
`;

export const ADD_VENDOR_BANK_ACCOUNT = `
  mutation AddVendorBankAccount($vendorAccountId: ID!, $input: BankAccountInput!) {
    addVendorBankAccount(vendorAccountId: $vendorAccountId, input: $input) {
      success
      message
      bankAccount {
        id
        bankName
        accountNumber
        ifscCode
      }
    }
  }
`;

export const PROCESS_SETTLEMENT = `
  mutation ProcessSettlement($settlementId: ID!, $status: String!) {
    processSettlement(settlementId: $settlementId, status: $status) {
      success
      message
      settlement {
        id
        settlementStatus
        settledAt
      }
    }
  }
`;

export const APPROVE_VENDOR = `
  mutation ApproveVendor($vendorAccountId: ID!) {
    approveVendor(vendorAccountId: $vendorAccountId) {
      success
      message
    }
  }
`;

export const DEACTIVATE_VENDOR = `
  mutation DeactivateVendor($vendorAccountId: ID!) {
    deactivateVendor(vendorAccountId: $vendorAccountId) {
      success
      message
    }
  }
`;

