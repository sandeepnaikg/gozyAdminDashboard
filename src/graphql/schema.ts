// NOTE: This file is NOT USED in the current implementation.
// We use direct Hasura queries (see src/graphql/queries/hasura.ts)
// This schema was created for Apollo Server approach which we didn't implement.

// import { gql } from 'graphql-tag';

/**
 * GRAPHQL SCHEMA DEFINITION
 * Based on the Vendor Management System Database
 * 
 * This schema can be used with any GraphQL server implementation:
 * - Apollo Server (Node.js)
 * - Hasura (Auto-generated from PostgreSQL)
 * - PostGraphile (PostgreSQL to GraphQL)
 * - Prisma + GraphQL
 */

export const typeDefs = gql`
  # =====================================================
  # SCALAR TYPES
  # =====================================================
  scalar DateTime
  scalar JSON

  # =====================================================
  # ENUMS
  # =====================================================
  enum UserRole {
    ADMIN
    VENDOR
    CUSTOMER
  }

  enum ServiceType {
    FLIGHT
    HOTEL
    TRAIN
    METRO
    MOVIE
    DELIVERY
    FOOD
  }

  enum PaymentStatus {
    PENDING
    COMPLETED
    FAILED
    REFUNDED
  }

  enum BookingStatus {
    PENDING
    CONFIRMED
    CANCELLED
    COMPLETED
  }

  enum SettlementStatus {
    PENDING
    PROCESSING
    COMPLETED
    FAILED
  }

  enum AccountType {
    SAVINGS
    CURRENT
  }

  # =====================================================
  # INPUT TYPES
  # =====================================================
  input DateRangeInput {
    startDate: DateTime
    endDate: DateTime
    preset: String # "7days", "30days", "90days", "year"
  }

  input PaginationInput {
    page: Int
    limit: Int
  }

  input VendorProfileInput {
    businessName: String
    businessType: String
    registrationNumber: String
    taxId: String
    address: String
    city: String
    state: String
    country: String
    postalCode: String
    contactPersonName: String
    contactPersonEmail: String
    contactPersonPhone: String
  }

  input BankAccountInput {
    bankName: String!
    accountHolderName: String!
    accountNumber: String!
    ifscCode: String!
    accountType: AccountType!
    isPrimary: Boolean
  }

  # =====================================================
  # DASHBOARD TYPES
  # =====================================================
  type DashboardOverview {
    totalUsers: Int!
    totalOrders: Int!
    totalRevenue: Float!
    activeSessions: Int!
    userGrowth: Float!
    orderGrowth: Float!
    revenueGrowth: Float!
    sessionGrowth: Float!
  }

  type ModuleUsageMetrics {
    total: Int!
    growth: Float!
  }

  type ModuleUsage {
    foodDelivery: ModuleUsageMetrics!
    travel: ModuleUsageMetrics!
    shopping: ModuleUsageMetrics!
    tickets: ModuleUsageMetrics!
  }

  type RevenueTrend {
    month: String!
    value: Float!
    foodRevenue: Float!
    travelRevenue: Float!
    shoppingRevenue: Float!
    ticketsRevenue: Float!
  }

  type ServiceRevenue {
    serviceName: String!
    revenue: Float!
    bookings: Int!
    growth: Float!
  }

  type ModuleDistribution {
    name: String!
    value: Int!
    percentage: Float!
    color: String!
  }

  type LiveOrder {
    id: ID!
    customerName: String!
    serviceType: ServiceType!
    itemName: String!
    amount: Float!
    status: BookingStatus!
    timestamp: DateTime!
    providerName: String!
  }

  type TopArea {
    area: String!
    orders: Int!
    revenue: Float!
    growth: Float!
    topService: ServiceType!
  }

  # =====================================================
  # VENDOR TYPES
  # =====================================================
  type VendorProfile {
    vendorAccountId: ID!
    email: String!
    phone: String
    isActive: Boolean!
    isVerified: Boolean!
    businessName: String!
    businessType: String
    registrationNumber: String
    taxId: String
    address: String
    city: String
    state: String
    country: String!
    postalCode: String
    contactPersonName: String
    contactPersonEmail: String
    contactPersonPhone: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type VendorDashboard {
    businessName: String!
    serviceType: ServiceType!
    totalBookings: Int!
    confirmedBookings: Int!
    cancelledBookings: Int!
    completedBookings: Int!
    totalRevenue: Float!
    currentMonthRevenue: Float!
    lastMonthRevenue: Float!
    revenueGrowth: Float!
    averageRating: Float!
    totalRatings: Int!
    positiveRatings: Int!
    negativeRatings: Int!
  }

  type VendorBooking {
    bookingId: ID!
    itemId: ID!
    providerName: String!
    serviceType: ServiceType!
    customerName: String!
    customerEmail: String!
    customerPhone: String
    totalAmount: Float!
    paymentStatus: PaymentStatus!
    bookingStatus: BookingStatus!
    bookedAt: DateTime!
    serviceName: String!
    serviceDetails: JSON
  }

  type VendorBookingsResponse {
    total: Int!
    page: Int!
    limit: Int!
    bookings: [VendorBooking!]!
  }

  type Review {
    rating: Int!
    review: String
    customerName: String!
    createdAt: DateTime!
  }

  type VendorServicePerformance {
    providerId: ID!
    providerName: String!
    serviceType: ServiceType!
    totalServices: Int!
    totalRatings: Int!
    averageRating: Float!
    positiveRatings: Int!
    negativeRatings: Int!
    recentReviews: [Review!]!
  }

  type BookingDetails {
    customerName: String!
    serviceType: ServiceType!
    serviceName: String!
  }

  type VendorSettlement {
    id: ID!
    bookingId: ID!
    grossAmount: Float!
    commissionRate: Float!
    commissionAmount: Float!
    netAmount: Float!
    settlementStatus: SettlementStatus!
    settledAt: DateTime
    createdAt: DateTime!
    bookingDetails: BookingDetails!
  }

  type VendorSettlementsResponse {
    total: Int!
    page: Int!
    limit: Int!
    settlements: [VendorSettlement!]!
  }

  type VendorSettlementSummary {
    businessName: String!
    totalSettlements: Int!
    totalGrossAmount: Float!
    totalCommission: Float!
    totalNetAmount: Float!
    settledAmount: Float!
    pendingAmount: Float!
    processingAmount: Float!
    lastSettlementDate: DateTime
    nextSettlementDate: DateTime
  }

  type VendorMonthlyAnalytics {
    month: String!
    bookingsCount: Int!
    revenue: Float!
    uniqueCustomers: Int!
    avgBookingValue: Float!
    commissionPaid: Float!
    netEarnings: Float!
  }

  type VendorBankAccount {
    id: ID!
    bankName: String!
    accountHolderName: String!
    accountNumber: String!
    ifscCode: String!
    accountType: AccountType!
    isPrimary: Boolean!
    isVerified: Boolean!
    createdAt: DateTime!
  }

  type VendorProvider {
    id: ID!
    name: String!
    serviceType: ServiceType!
    websiteUrl: String
    contactEmail: String
    contactPhone: String
    isActive: Boolean!
    totalServices: Int!
    totalBookings: Int!
    averageRating: Float!
    createdAt: DateTime!
  }

  type VendorService {
    id: ID!
    name: String!
    description: String
    price: Float!
    availability: Boolean!
    rating: Float!
    totalBookings: Int!
    imageUrl: String
    details: JSON
  }

  type VendorServicesResponse {
    serviceType: ServiceType!
    services: [VendorService!]!
  }

  type VendorNotification {
    id: ID!
    type: String!
    title: String!
    message: String!
    isRead: Boolean!
    createdAt: DateTime!
    metadata: JSON
  }

  type VendorNotificationsResponse {
    total: Int!
    unreadCount: Int!
    notifications: [VendorNotification!]!
  }

  type TopVendor {
    vendorAccountId: ID!
    businessName: String!
    serviceType: ServiceType!
    totalBookings: Int!
    totalRevenue: Float!
    averageRating: Float!
    currentMonthRevenue: Float!
    growth: Float!
  }

  type SettlementOverview {
    totalPending: Int!
    totalProcessing: Int!
    totalCompleted: Int!
    pendingAmount: Float!
    completedAmount: Float!
    totalCommission: Float!
  }

  type PendingSettlement {
    id: ID!
    vendorAccountId: ID!
    businessName: String!
    bookingId: ID!
    grossAmount: Float!
    commissionAmount: Float!
    netAmount: Float!
    settlementStatus: SettlementStatus!
    createdAt: DateTime!
    daysOverdue: Int!
  }

  # =====================================================
  # ADMIN TYPES
  # =====================================================
  type VendorListItem {
    vendorAccountId: ID!
    email: String!
    phone: String
    businessName: String!
    businessType: String
    serviceType: ServiceType!
    isActive: Boolean!
    isVerified: Boolean!
    totalBookings: Int!
    totalRevenue: Float!
    averageRating: Float!
    pendingSettlements: Float!
    createdAt: DateTime!
  }

  type AllVendorsResponse {
    total: Int!
    page: Int!
    limit: Int!
    vendors: [VendorListItem!]!
  }

  type VendorAnalytics {
    totalBookings: Int!
    totalRevenue: Float!
    averageRating: Float!
    currentMonthRevenue: Float!
    lastMonthRevenue: Float!
    revenueGrowth: Float!
  }

  type VendorSettlements {
    totalGrossAmount: Float!
    totalCommission: Float!
    settledAmount: Float!
    pendingAmount: Float!
    lastSettlementDate: DateTime
  }

  type VendorDetailsAdmin {
    profile: VendorProfile!
    analytics: VendorAnalytics!
    settlements: VendorSettlements!
    providers: [VendorProvider!]!
    bankAccounts: [VendorBankAccount!]!
  }

  type VendorsOverview {
    totalVendors: Int!
    activeVendors: Int!
    totalProviders: Int!
    pendingApprovals: Int!
  }

  # =====================================================
  # MUTATION RESPONSE TYPES
  # =====================================================
  type MutationResponse {
    success: Boolean!
    message: String!
  }

  type UpdateVendorProfileResponse {
    success: Boolean!
    message: String!
    profile: VendorProfile
  }

  type AddBankAccountResponse {
    success: Boolean!
    message: String!
    bankAccount: VendorBankAccount
  }

  type ProcessSettlementResponse {
    success: Boolean!
    message: String!
    settlement: VendorSettlement
  }

  # =====================================================
  # QUERIES
  # =====================================================
  type Query {
    # Dashboard Queries (Admin)
    dashboardOverview(dateRange: String): DashboardOverview!
    moduleUsage(dateRange: String): ModuleUsage!
    revenueTrend(months: Int): [RevenueTrend!]!
    serviceRevenue(dateRange: String): [ServiceRevenue!]!
    moduleDistribution(dateRange: String): [ModuleDistribution!]!
    liveOrders(limit: Int): [LiveOrder!]!
    topAreas(limit: Int, dateRange: String): [TopArea!]!

    # Vendor Portal Queries
    vendorDashboard(vendorAccountId: ID!, dateRange: String): VendorDashboard!
    vendorBookings(
      vendorAccountId: ID!
      page: Int
      limit: Int
      status: String
      serviceType: String
      dateRange: String
    ): VendorBookingsResponse!
    vendorServicePerformance(vendorAccountId: ID!): [VendorServicePerformance!]!
    vendorSettlements(
      vendorAccountId: ID!
      status: String
      page: Int
      limit: Int
    ): VendorSettlementsResponse!
    vendorSettlementSummary(vendorAccountId: ID!): VendorSettlementSummary!
    vendorMonthlyAnalytics(vendorAccountId: ID!, months: Int): [VendorMonthlyAnalytics!]!
    vendorProfile(vendorAccountId: ID!): VendorProfile!
    vendorBankAccounts(vendorAccountId: ID!): [VendorBankAccount!]!
    vendorProviders(vendorAccountId: ID!): [VendorProvider!]!
    vendorServices(
      vendorAccountId: ID!
      providerId: ID
      serviceType: String
    ): [VendorServicesResponse!]!
    vendorNotifications(
      vendorAccountId: ID!
      page: Int
      limit: Int
      isRead: Boolean
    ): VendorNotificationsResponse!

    # Admin - Vendor Management Queries
    vendorsOverview: VendorsOverview!
    topVendors(limit: Int, sortBy: String): [TopVendor!]!
    settlementOverview: SettlementOverview!
    pendingSettlements(limit: Int): [PendingSettlement!]!
    allVendors(
      page: Int
      limit: Int
      search: String
      isActive: Boolean
      serviceType: String
    ): AllVendorsResponse!
    vendorDetailsAdmin(vendorAccountId: ID!): VendorDetailsAdmin!
  }

  # =====================================================
  # MUTATIONS
  # =====================================================
  type Mutation {
    # Vendor Profile Management
    updateVendorProfile(
      vendorAccountId: ID!
      input: VendorProfileInput!
    ): UpdateVendorProfileResponse!
    
    addVendorBankAccount(
      vendorAccountId: ID!
      input: BankAccountInput!
    ): AddBankAccountResponse!

    # Admin - Settlement Processing
    processSettlement(
      settlementId: ID!
      status: String!
    ): ProcessSettlementResponse!

    # Admin - Vendor Management
    approveVendor(vendorAccountId: ID!): MutationResponse!
    deactivateVendor(vendorAccountId: ID!): MutationResponse!
  }

  # =====================================================
  # SUBSCRIPTIONS (Real-time Updates)
  # =====================================================
  type Subscription {
    # Real-time order updates
    newOrder: LiveOrder!
    
    # Vendor-specific subscription
    vendorNewBooking(vendorAccountId: ID!): VendorBooking!
    
    # Settlement updates
    settlementStatusChanged(vendorAccountId: ID!): VendorSettlement!
  }
`;
