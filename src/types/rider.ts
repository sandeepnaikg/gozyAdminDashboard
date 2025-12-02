export type VehicleType = 'bike' | 'auto' | 'cab' | 'bicycle'
export type DeliveryType = 'food' | 'shopping' | 'cab' | 'bike' | 'auto'
export type RiderStatus = 'active' | 'offline' | 'on-trip' | 'break' | 'suspended'
export type ShiftType = 'morning' | 'afternoon' | 'evening' | 'night' | 'full-day'

export interface Vehicle {
  type: VehicleType
  model: string
  registrationNumber: string
  color: string
  year: number
  insuranceExpiry: string
  pollutionExpiry: string
  verified: boolean
}

export interface Location {
  lat: number
  lng: number
  address: string
  city: string
  zone: string
}

export interface Delivery {
  id: string
  deliveryId: string
  type: DeliveryType
  pickupLocation: Location
  dropLocation: Location
  distance: number // in km
  amount: number
  commission: number
  tip: number
  status: 'pending' | 'picked' | 'in-transit' | 'delivered' | 'cancelled'
  orderTime: string
  pickupTime?: string
  deliveryTime?: string
  rating?: number
  customerName: string
  customerPhone: string
}

export interface Shift {
  id: string
  date: string
  type: ShiftType
  startTime: string
  endTime?: string
  totalHours: number
  deliveries: number
  earnings: number
  distance: number // in km
}

export interface Performance {
  totalDeliveries: number
  completedDeliveries: number
  cancelledDeliveries: number
  averageRating: number
  totalRatings: number
  onTimeDeliveryRate: number // percentage
  acceptanceRate: number // percentage
  availabilityRate: number // percentage
}

export interface Earnings {
  today: number
  thisWeek: number
  thisMonth: number
  lastMonth: number
  totalEarnings: number
  pendingPayout: number
  lastPayoutDate: string
  lastPayoutAmount: number
}

export interface Documents {
  aadhar: {
    number: string
    verified: boolean
    uploadDate: string
  }
  pan: {
    number: string
    verified: boolean
    uploadDate: string
  }
  drivingLicense?: {
    number: string
    verified: boolean
    expiryDate: string
    uploadDate: string
  }
  rcBook?: {
    number: string
    verified: boolean
    uploadDate: string
  }
}

export interface Rider {
  id: string
  riderId: string
  name: string
  phone: string
  email: string
  avatar?: string
  status: RiderStatus
  vehicle: Vehicle
  currentLocation?: Location
  homeLocation: Location
  deliveryTypes: DeliveryType[]
  joinDate: string
  lastActiveTime: string
  performance: Performance
  earnings: Earnings
  currentShift?: Shift
  documents: Documents
  bankAccount: {
    accountNumber: string
    ifscCode: string
    accountHolderName: string
    verified: boolean
  }
  emergencyContact: {
    name: string
    phone: string
    relation: string
  }
}

export interface RiderAnalytics {
  deliveryType: DeliveryType
  totalRiders: number
  activeRiders: number
  onTripRiders: number
  totalDeliveries: number
  averageDeliveryTime: number // in minutes
  revenue: number
  avgEarningsPerRider: number
  peakHours: string[]
}

export interface ZoneMetrics {
  zoneName: string
  totalRiders: number
  activeRiders: number
  avgResponseTime: number // in minutes
  completionRate: number // percentage
  customerSatisfaction: number // rating
  totalDeliveries: number
}
