// =====================================================
// GraphQL Type Definitions
// =====================================================

export interface DashboardOverview {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: string;
  activeSessions: number;
  userGrowth: number;
  orderGrowth: number;
  revenueGrowth: number;
  sessionGrowth: number;
}

export interface ModuleUsageMetrics {
  total: number;
  growth: number;
}

export interface ModuleUsage {
  foodDelivery: ModuleUsageMetrics;
  travel: ModuleUsageMetrics;
  shopping: ModuleUsageMetrics;
  tickets: ModuleUsageMetrics;
}

export interface RevenueTrend {
  month: string;
  value: number;
  foodRevenue: number;
  travelRevenue: number;
  shoppingRevenue: number;
  ticketsRevenue: number;
}

export interface ServiceRevenue {
  serviceName: string;
  revenue: number;
  bookings: number;
  growth: number;
}

export interface ModuleDistribution {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface LiveOrder {
  id: string;
  customerName: string;
  serviceType: string;
  itemName: string;
  amount: number;
  status: string;
  timestamp: string;
  providerName: string;
}

export interface TopArea {
  area: string;
  orders: number;
  revenue: number;
  growth: number;
  topService: string;
}

export interface VendorDashboard {
  businessName: string;
  serviceType: string;
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  completedBookings: number;
  totalRevenue: number;
  currentMonthRevenue: number;
  lastMonthRevenue: number;
  revenueGrowth: number;
  averageRating: number;
  totalRatings: number;
  positiveRatings: number;
  negativeRatings: number;
}

export interface VendorBooking {
  bookingId: string;
  itemId: string;
  providerName: string;
  serviceType: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: number;
  paymentStatus: string;
  bookingStatus: string;
  bookedAt: string;
  serviceName: string;
  serviceDetails: any;
}

export interface VendorBookingsResponse {
  total: number;
  page: number;
  limit: number;
  bookings: VendorBooking[];
}

export interface Review {
  rating: number;
  review: string;
  customerName: string;
  createdAt: string;
}

export interface VendorServicePerformance {
  providerId: string;
  providerName: string;
  serviceType: string;
  totalServices: number;
  totalRatings: number;
  averageRating: number;
  positiveRatings: number;
  negativeRatings: number;
  recentReviews: Review[];
}

export interface BookingDetails {
  customerName: string;
  serviceType: string;
  serviceName: string;
}

export interface VendorSettlement {
  id: string;
  bookingId: string;
  grossAmount: number;
  commissionRate: number;
  commissionAmount: number;
  netAmount: number;
  settlementStatus: string;
  settledAt: string | null;
  createdAt: string;
  bookingDetails: BookingDetails;
}

export interface VendorSettlementsResponse {
  total: number;
  page: number;
  limit: number;
  settlements: VendorSettlement[];
}

export interface VendorSettlementSummary {
  businessName: string;
  totalSettlements: number;
  totalGrossAmount: number;
  totalCommission: number;
  totalNetAmount: number;
  settledAmount: number;
  pendingAmount: number;
  processingAmount: number;
  lastSettlementDate: string | null;
  nextSettlementDate: string | null;
}

export interface VendorMonthlyAnalytics {
  month: string;
  bookingsCount: number;
  revenue: number;
  uniqueCustomers: number;
  avgBookingValue: number;
  commissionPaid: number;
  netEarnings: number;
}

export interface VendorProfile {
  vendorAccountId: string;
  email: string;
  phone: string;
  isActive: boolean;
  isVerified: boolean;
  businessName: string;
  businessType: string;
  registrationNumber: string;
  taxId: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  createdAt: string;
  updatedAt: string;
}

export interface VendorBankAccount {
  id: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  isPrimary: boolean;
  isVerified: boolean;
  createdAt: string;
}

export interface VendorProvider {
  id: string;
  name: string;
  serviceType: string;
  websiteUrl: string;
  contactEmail: string;
  contactPhone: string;
  isActive: boolean;
  totalServices: number;
  totalBookings: number;
  averageRating: number;
  createdAt: string;
}

export interface VendorService {
  id: string;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  rating: number;
  totalBookings: number;
  imageUrl: string;
  details: any;
}

export interface VendorServicesResponse {
  serviceType: string;
  services: VendorService[];
}

export interface VendorNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  metadata: any;
}

export interface VendorNotificationsResponse {
  total: number;
  unreadCount: number;
  notifications: VendorNotification[];
}

export interface VendorListItem {
  vendorAccountId: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  serviceType: string;
  isActive: boolean;
  isVerified: boolean;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  pendingSettlements: number;
  createdAt: string;
}

export interface AllVendorsResponse {
  total: number;
  page: number;
  limit: number;
  vendors: VendorListItem[];
}

export interface VendorDetailsAdmin {
  profile: VendorProfile;
  analytics: {
    totalBookings: number;
    totalRevenue: number;
    averageRating: number;
    currentMonthRevenue: number;
    lastMonthRevenue: number;
    revenueGrowth: number;
  };
  settlements: {
    totalGrossAmount: number;
    totalCommission: number;
    settledAmount: number;
    pendingAmount: number;
    lastSettlementDate: string | null;
  };
  providers: VendorProvider[];
  bankAccounts: VendorBankAccount[];
}

export interface TopVendor {
  vendorAccountId: string;
  businessName: string;
  serviceType: string;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  currentMonthRevenue: number;
  growth: number;
}

export interface SettlementOverview {
  totalPending: number;
  totalProcessing: number;
  totalCompleted: number;
  pendingAmount: number;
  completedAmount: number;
  totalCommission: number;
}

export interface PendingSettlement {
  id: string;
  vendorAccountId: string;
  businessName: string;
  bookingId: string;
  grossAmount: number;
  commissionAmount: number;
  netAmount: number;
  settlementStatus: string;
  createdAt: string;
  daysOverdue: number;
}

export interface BookingAnalytics {
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  completedBookings: number;
  cancellationRate: number;
  completionRate: number;
  averageBookingValue: number;
  bookingsByService: {
    serviceType: string;
    count: number;
    revenue: number;
  }[];
}

export interface CustomerAnalytics {
  totalCustomers: number;
  newCustomers: number;
  activeCustomers: number;
  repeatCustomers: number;
  customerRetentionRate: number;
  averageLifetimeValue: number;
  topCustomers: {
    userId: string;
    name: string;
    email: string;
    totalBookings: number;
    totalSpent: number;
  }[];
}

export interface PerformanceMetrics {
  averageResponseTime: number;
  successRate: number;
  errorRate: number;
  uptime: number;
  peakHours: {
    hour: number;
    bookings: number;
  }[];
}

export interface CompleteDashboardData {
  dashboardOverview: DashboardOverview;
  moduleUsage: ModuleUsage;
  revenueTrend: RevenueTrend[];
  serviceRevenue: ServiceRevenue[];
  moduleDistribution: ModuleDistribution[];
  liveOrders: LiveOrder[];
  topAreas: TopArea[];
  topVendors: TopVendor[];
  settlementOverview: SettlementOverview;
}

// Input Types for Mutations
export interface VendorProfileInput {
  businessName?: string;
  businessType?: string;
  registrationNumber?: string;
  taxId?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  contactPersonName?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
}

export interface BankAccountInput {
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: 'savings' | 'current';
  isPrimary?: boolean;
}

export interface MutationResponse {
  success: boolean;
  message: string;
}

export interface UpdateVendorProfileResponse extends MutationResponse {
  profile?: VendorProfile;
}

export interface AddBankAccountResponse extends MutationResponse {
  bankAccount?: VendorBankAccount;
}

export interface ProcessSettlementResponse extends MutationResponse {
  settlement?: VendorSettlement;
}
