export interface TravelBooking {
  id: string
  bookingId: string
  customerId: string
  customerName: string
  customerPhone: string
  type: 'flight' | 'bus' | 'train' | 'cab'
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'failed'
  bookingDate: Date
  travelDate: Date
  origin: string
  destination: string
  amount: number
  commission: number
  provider: string
  pnr?: string
  seatNumbers?: string[]
  passengers: Passenger[]
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  refundAmount?: number
  cancellationReason?: string
}

export interface Passenger {
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  seatNumber?: string
}

export interface TravelProvider {
  id: string
  name: string
  type: 'flight' | 'bus' | 'train' | 'cab'
  logo: string
  status: 'active' | 'inactive' | 'maintenance'
  totalBookings: number
  successRate: number
  avgResponseTime: number
  commission: number
  apiEndpoint: string
  lastSync: Date
}

export interface Route {
  id: string
  origin: string
  destination: string
  type: 'flight' | 'bus' | 'train'
  providers: string[]
  avgPrice: number
  totalBookings: number
  popularity: number
}

export interface PriceRule {
  id: string
  name: string
  type: 'flight' | 'bus' | 'train' | 'cab' | 'all'
  ruleType: 'markup' | 'discount' | 'dynamic'
  value: number
  conditions: {
    minAmount?: number
    maxAmount?: number
    routes?: string[]
    providers?: string[]
    days?: string[]
    timeSlots?: string[]
  }
  isActive: boolean
  priority: number
  createdAt: Date
}

export interface APIHealth {
  provider: string
  type: 'flight' | 'bus' | 'train' | 'cab'
  status: 'healthy' | 'degraded' | 'down'
  uptime: number
  avgResponseTime: number
  errorRate: number
  lastChecked: Date
  incidents: number
}

export interface FailedBooking {
  id: string
  bookingId: string
  customerId: string
  customerName: string
  type: 'flight' | 'bus' | 'train' | 'cab'
  provider: string
  origin: string
  destination: string
  amount: number
  errorCode: string
  errorMessage: string
  timestamp: Date
  retryCount: number
  canRetry: boolean
}

export interface RevenueByType {
  type: string
  bookings: number
  revenue: number
  commission: number
  avgTicketSize: number
}
