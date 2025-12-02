export interface TicketBooking {
  id: string
  bookingId: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  eventId: string
  eventName: string
  eventType: 'movie' | 'concert' | 'sports' | 'theatre' | 'comedy' | 'conference'
  venue: string
  eventDate: Date
  bookingDate: Date
  ticketCount: number
  tickets: Ticket[]
  totalAmount: number
  convenienceFee: number
  tax: number
  finalAmount: number
  status: 'confirmed' | 'pending' | 'cancelled' | 'used' | 'expired'
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  qrCode?: string
  refundAmount?: number
}

export interface Ticket {
  ticketId: string
  seatNumber?: string
  category: string
  price: number
  holderName?: string
}

export interface Event {
  id: string
  name: string
  type: 'movie' | 'concert' | 'sports' | 'theatre' | 'comedy' | 'conference'
  category: string
  description: string
  venue: string
  city: string
  startDate: Date
  endDate?: Date
  poster: string
  organizer: string
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  totalSeats: number
  bookedSeats: number
  availableSeats: number
  basePrice: number
  categories: SeatCategory[]
  rating?: number
  tags: string[]
}

export interface SeatCategory {
  name: string
  price: number
  available: number
  total: number
}

export interface Venue {
  id: string
  name: string
  address: string
  city: string
  state: string
  capacity: number
  facilities: string[]
  rating: number
  totalEvents: number
  coordinates: { lat: number; lng: number }
}

export interface EventOrganizer {
  id: string
  name: string
  email: string
  phone: string
  totalEvents: number
  totalRevenue: number
  rating: number
  status: 'active' | 'inactive' | 'suspended'
  verificationStatus: 'pending' | 'verified' | 'rejected'
  commission: number
}

export interface ShowTime {
  id: string
  eventId: string
  startTime: Date
  endTime: Date
  availableSeats: number
  totalSeats: number
  bookedSeats: number
}

export interface EventAnalytics {
  eventId: string
  eventName: string
  totalBookings: number
  totalRevenue: number
  occupancyRate: number
  averageTicketPrice: number
  peakBookingTime: string
}
