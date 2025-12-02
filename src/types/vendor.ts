export type VendorType = 'restaurant' | 'store' | 'service-provider' | 'marketplace-seller'
export type VendorStatus = 'active' | 'inactive' | 'pending-approval' | 'suspended' | 'blacklisted'
export type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'expired'
export type PartnerTier = 'platinum' | 'gold' | 'silver' | 'bronze' | 'basic'

export interface BusinessLicense {
  type: string
  number: string
  issueDate: string
  expiryDate: string
  status: VerificationStatus
  documentUrl?: string
}

export interface BankDetails {
  accountNumber: string
  ifscCode: string
  accountHolderName: string
  bankName: string
  branchName: string
  verified: boolean
  verifiedDate?: string
}

export interface Address {
  street: string
  area: string
  city: string
  state: string
  pincode: string
  landmark?: string
  lat: number
  lng: number
}

export interface ContactPerson {
  name: string
  designation: string
  phone: string
  email: string
  isPrimary: boolean
}

export interface OperatingHours {
  day: string
  open: string
  close: string
  isClosed: boolean
}

export interface Commission {
  type: 'percentage' | 'fixed'
  value: number
  minOrder?: number
  maxCap?: number
}

export interface Performance {
  totalOrders: number
  completedOrders: number
  cancelledOrders: number
  rejectedOrders: number
  averageRating: number
  totalReviews: number
  averagePreparationTime: number // in minutes
  onTimeDeliveryRate: number // percentage
  acceptanceRate: number // percentage
}

export interface Revenue {
  today: number
  thisWeek: number
  thisMonth: number
  lastMonth: number
  totalRevenue: number
  pendingSettlement: number
  lastSettlementDate: string
  lastSettlementAmount: number
}

export interface Compliance {
  fssaiLicense?: BusinessLicense
  gstNumber: string
  gstVerified: boolean
  panNumber: string
  panVerified: boolean
  tradeLicense?: BusinessLicense
  shopEstablishment?: BusinessLicense
  fireNOC?: BusinessLicense
  pollutionCertificate?: BusinessLicense
}

export interface MenuStats {
  totalItems: number
  activeItems: number
  outOfStockItems: number
  popularItems: string[]
  avgItemPrice: number
}

export interface Vendor {
  id: string
  vendorId: string
  businessName: string
  legalName: string
  type: VendorType
  status: VendorStatus
  tier: PartnerTier
  logo?: string
  bannerImage?: string
  address: Address
  contacts: ContactPerson[]
  operatingHours: OperatingHours[]
  commission: Commission
  performance: Performance
  revenue: Revenue
  compliance: Compliance
  bankDetails: BankDetails
  onboardingDate: string
  lastActiveDate: string
  categories: string[]
  tags: string[]
  description: string
  minimumOrder?: number
  deliveryRadius?: number // in km
  avgDeliveryTime?: number // in minutes
  menuStats?: MenuStats
  isExclusive: boolean
  isFeatured: boolean
  verificationStatus: VerificationStatus
}

export interface VendorAnalytics {
  vendorType: VendorType
  totalVendors: number
  activeVendors: number
  pendingApprovals: number
  totalRevenue: number
  averageOrderValue: number
  totalOrders: number
  growthRate: number // percentage
  avgCommissionRate: number
  topPerformers: string[]
}

export interface Settlement {
  id: string
  settlementId: string
  vendorId: string
  vendorName: string
  period: string
  totalOrders: number
  grossRevenue: number
  commission: number
  deductions: number
  netAmount: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  initiatedDate: string
  completedDate?: string
  utrNumber?: string
  remarks?: string
}

export interface Complaint {
  id: string
  complaintId: string
  vendorId: string
  vendorName: string
  customerId: string
  customerName: string
  orderId: string
  type: 'quality' | 'service' | 'delivery' | 'billing' | 'other'
  description: string
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  reportedDate: string
  resolvedDate?: string
  resolution?: string
}

export interface Onboarding {
  id: string
  applicationId: string
  businessName: string
  type: VendorType
  contactName: string
  contactPhone: string
  contactEmail: string
  address: string
  city: string
  status: 'new' | 'documents-pending' | 'under-review' | 'approved' | 'rejected'
  submittedDate: string
  reviewedDate?: string
  reviewedBy?: string
  rejectionReason?: string
  documents: {
    name: string
    uploaded: boolean
    verified: boolean
  }[]
}
