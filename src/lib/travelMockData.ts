import { TravelBooking, TravelProvider, Route, PriceRule, APIHealth, FailedBooking } from '@/types/travel'

export const mockTravelBookings: TravelBooking[] = [
  {
    id: 'tb1',
    bookingId: 'TRV-20241202-001',
    customerId: 'c1',
    customerName: 'John Doe',
    customerPhone: '+91 98765-43210',
    type: 'flight',
    status: 'confirmed',
    bookingDate: new Date('2024-12-02T10:30:00'),
    travelDate: new Date('2024-12-15T14:30:00'),
    origin: 'Mumbai (BOM)',
    destination: 'Delhi (DEL)',
    amount: 8500,
    commission: 850,
    provider: 'IndiGo',
    pnr: 'ABC123',
    seatNumbers: ['12A', '12B'],
    passengers: [
      { name: 'John Doe', age: 32, gender: 'male', seatNumber: '12A' },
      { name: 'Jane Doe', age: 28, gender: 'female', seatNumber: '12B' }
    ],
    paymentStatus: 'completed'
  },
  {
    id: 'tb2',
    bookingId: 'TRV-20241202-002',
    customerId: 'c2',
    customerName: 'Alice Williams',
    customerPhone: '+91 98765-43211',
    type: 'bus',
    status: 'confirmed',
    bookingDate: new Date('2024-12-02T09:15:00'),
    travelDate: new Date('2024-12-05T22:00:00'),
    origin: 'Bangalore',
    destination: 'Chennai',
    amount: 1200,
    commission: 120,
    provider: 'RedBus',
    seatNumbers: ['L3', 'L4'],
    passengers: [
      { name: 'Alice Williams', age: 25, gender: 'female', seatNumber: 'L3' }
    ],
    paymentStatus: 'completed'
  },
  {
    id: 'tb3',
    bookingId: 'TRV-20241202-003',
    customerId: 'c3',
    customerName: 'Bob Johnson',
    customerPhone: '+91 98765-43212',
    type: 'train',
    status: 'confirmed',
    bookingDate: new Date('2024-12-02T08:00:00'),
    travelDate: new Date('2024-12-10T06:15:00'),
    origin: 'Delhi',
    destination: 'Kolkata',
    amount: 2400,
    commission: 240,
    provider: 'IRCTC',
    pnr: 'PNR456789',
    seatNumbers: ['A1-22', 'A1-23'],
    passengers: [
      { name: 'Bob Johnson', age: 45, gender: 'male', seatNumber: 'A1-22' },
      { name: 'Sarah Johnson', age: 42, gender: 'female', seatNumber: 'A1-23' }
    ],
    paymentStatus: 'completed'
  },
  {
    id: 'tb4',
    bookingId: 'TRV-20241202-004',
    customerId: 'c4',
    customerName: 'Charlie Brown',
    customerPhone: '+91 98765-43213',
    type: 'cab',
    status: 'completed',
    bookingDate: new Date('2024-12-01T18:30:00'),
    travelDate: new Date('2024-12-01T19:00:00'),
    origin: 'Airport',
    destination: 'Home',
    amount: 650,
    commission: 65,
    provider: 'Uber',
    passengers: [
      { name: 'Charlie Brown', age: 35, gender: 'male' }
    ],
    paymentStatus: 'completed'
  },
  {
    id: 'tb5',
    bookingId: 'TRV-20241202-005',
    customerId: 'c5',
    customerName: 'Diana Prince',
    customerPhone: '+91 98765-43214',
    type: 'flight',
    status: 'cancelled',
    bookingDate: new Date('2024-12-01T15:00:00'),
    travelDate: new Date('2024-12-08T10:00:00'),
    origin: 'Pune (PNQ)',
    destination: 'Goa (GOI)',
    amount: 5500,
    commission: 0,
    provider: 'Air India',
    pnr: 'XYZ789',
    passengers: [
      { name: 'Diana Prince', age: 30, gender: 'female' }
    ],
    paymentStatus: 'refunded',
    refundAmount: 4950,
    cancellationReason: 'Customer request'
  }
]

export const mockTravelProviders: TravelProvider[] = [
  {
    id: 'p1',
    name: 'IndiGo',
    type: 'flight',
    logo: '/logos/indigo.png',
    status: 'active',
    totalBookings: 15420,
    successRate: 98.5,
    avgResponseTime: 1200,
    commission: 10,
    apiEndpoint: 'https://api.goindigo.in',
    lastSync: new Date('2024-12-02T11:30:00')
  },
  {
    id: 'p2',
    name: 'RedBus',
    type: 'bus',
    logo: '/logos/redbus.png',
    status: 'active',
    totalBookings: 28500,
    successRate: 99.2,
    avgResponseTime: 800,
    commission: 8,
    apiEndpoint: 'https://api.redbus.in',
    lastSync: new Date('2024-12-02T11:25:00')
  },
  {
    id: 'p3',
    name: 'IRCTC',
    type: 'train',
    logo: '/logos/irctc.png',
    status: 'active',
    totalBookings: 45200,
    successRate: 96.8,
    avgResponseTime: 2500,
    commission: 5,
    apiEndpoint: 'https://api.irctc.co.in',
    lastSync: new Date('2024-12-02T11:20:00')
  },
  {
    id: 'p4',
    name: 'Uber',
    type: 'cab',
    logo: '/logos/uber.png',
    status: 'active',
    totalBookings: 12800,
    successRate: 99.5,
    avgResponseTime: 500,
    commission: 12,
    apiEndpoint: 'https://api.uber.com',
    lastSync: new Date('2024-12-02T11:35:00')
  },
  {
    id: 'p5',
    name: 'Air India',
    type: 'flight',
    logo: '/logos/airindia.png',
    status: 'maintenance',
    totalBookings: 8900,
    successRate: 94.2,
    avgResponseTime: 3200,
    commission: 9,
    apiEndpoint: 'https://api.airindia.in',
    lastSync: new Date('2024-12-02T09:00:00')
  }
]

export const mockRoutes: Route[] = [
  {
    id: 'r1',
    origin: 'Mumbai',
    destination: 'Delhi',
    type: 'flight',
    providers: ['IndiGo', 'Air India', 'SpiceJet'],
    avgPrice: 7500,
    totalBookings: 4520,
    popularity: 95
  },
  {
    id: 'r2',
    origin: 'Bangalore',
    destination: 'Chennai',
    type: 'bus',
    providers: ['RedBus', 'AbhiBus'],
    avgPrice: 1100,
    totalBookings: 8900,
    popularity: 88
  },
  {
    id: 'r3',
    origin: 'Delhi',
    destination: 'Kolkata',
    type: 'train',
    providers: ['IRCTC'],
    avgPrice: 2200,
    totalBookings: 12400,
    popularity: 92
  }
]

export const mockAPIHealth: APIHealth[] = [
  {
    provider: 'IndiGo',
    type: 'flight',
    status: 'healthy',
    uptime: 99.8,
    avgResponseTime: 1200,
    errorRate: 0.2,
    lastChecked: new Date(),
    incidents: 0
  },
  {
    provider: 'RedBus',
    type: 'bus',
    status: 'healthy',
    uptime: 99.9,
    avgResponseTime: 800,
    errorRate: 0.1,
    lastChecked: new Date(),
    incidents: 0
  },
  {
    provider: 'IRCTC',
    type: 'train',
    status: 'degraded',
    uptime: 97.5,
    avgResponseTime: 2500,
    errorRate: 2.5,
    lastChecked: new Date(),
    incidents: 3
  },
  {
    provider: 'Air India',
    type: 'flight',
    status: 'down',
    uptime: 85.2,
    avgResponseTime: 5000,
    errorRate: 14.8,
    lastChecked: new Date(),
    incidents: 12
  },
  {
    provider: 'Uber',
    type: 'cab',
    status: 'healthy',
    uptime: 99.6,
    avgResponseTime: 500,
    errorRate: 0.4,
    lastChecked: new Date(),
    incidents: 1
  }
]

export const mockFailedBookings: FailedBooking[] = [
  {
    id: 'fb1',
    bookingId: 'TRV-20241202-ERR-001',
    customerId: 'c6',
    customerName: 'Mike Wilson',
    type: 'flight',
    provider: 'Air India',
    origin: 'Mumbai',
    destination: 'Bangalore',
    amount: 6500,
    errorCode: 'API_TIMEOUT',
    errorMessage: 'Provider API timeout after 30 seconds',
    timestamp: new Date('2024-12-02T10:15:00'),
    retryCount: 2,
    canRetry: true
  },
  {
    id: 'fb2',
    bookingId: 'TRV-20241202-ERR-002',
    customerId: 'c7',
    customerName: 'Sarah Connor',
    type: 'train',
    provider: 'IRCTC',
    origin: 'Delhi',
    destination: 'Mumbai',
    amount: 3200,
    errorCode: 'SEAT_UNAVAILABLE',
    errorMessage: 'Requested seats no longer available',
    timestamp: new Date('2024-12-02T09:45:00'),
    retryCount: 0,
    canRetry: false
  },
  {
    id: 'fb3',
    bookingId: 'TRV-20241202-ERR-003',
    customerId: 'c8',
    customerName: 'Tom Hardy',
    type: 'bus',
    provider: 'RedBus',
    origin: 'Pune',
    destination: 'Mumbai',
    amount: 800,
    errorCode: 'PAYMENT_FAILED',
    errorMessage: 'Payment gateway declined transaction',
    timestamp: new Date('2024-12-02T08:30:00'),
    retryCount: 1,
    canRetry: true
  }
]
