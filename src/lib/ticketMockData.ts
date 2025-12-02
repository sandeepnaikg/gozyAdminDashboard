import { TicketBooking, Event, Venue, EventOrganizer, EventAnalytics } from '@/types/ticket'

export const mockTicketBookings: TicketBooking[] = [
  {
    id: 'tb1',
    bookingId: 'TKT-20241202-001',
    customerId: 'c1',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@example.com',
    customerPhone: '+91 98765-43210',
    eventId: 'e1',
    eventName: 'Pushpa 2: The Rule',
    eventType: 'movie',
    venue: 'PVR Cinemas, Phoenix Mall',
    eventDate: new Date('2024-12-15T19:30:00'),
    bookingDate: new Date('2024-12-02T14:30:00'),
    ticketCount: 3,
    tickets: [
      { ticketId: 'T1', seatNumber: 'F12', category: 'Premium', price: 450 },
      { ticketId: 'T2', seatNumber: 'F13', category: 'Premium', price: 450 },
      { ticketId: 'T3', seatNumber: 'F14', category: 'Premium', price: 450 }
    ],
    totalAmount: 1350,
    convenienceFee: 135,
    tax: 150,
    finalAmount: 1635,
    status: 'confirmed',
    paymentStatus: 'completed',
    qrCode: 'QR123456'
  },
  {
    id: 'tb2',
    bookingId: 'TKT-20241202-002',
    customerId: 'c2',
    customerName: 'Priya Patel',
    customerEmail: 'priya.p@example.com',
    customerPhone: '+91 98765-43211',
    eventId: 'e2',
    eventName: 'Coldplay Live in Mumbai',
    eventType: 'concert',
    venue: 'DY Patil Stadium',
    eventDate: new Date('2024-12-20T18:00:00'),
    bookingDate: new Date('2024-12-01T10:15:00'),
    ticketCount: 2,
    tickets: [
      { ticketId: 'T4', seatNumber: 'A-205', category: 'Gold', price: 8500, holderName: 'Priya Patel' },
      { ticketId: 'T5', seatNumber: 'A-206', category: 'Gold', price: 8500, holderName: 'Amit Patel' }
    ],
    totalAmount: 17000,
    convenienceFee: 850,
    tax: 1785,
    finalAmount: 19635,
    status: 'confirmed',
    paymentStatus: 'completed',
    qrCode: 'QR789012'
  },
  {
    id: 'tb3',
    bookingId: 'TKT-20241202-003',
    customerId: 'c3',
    customerName: 'Arjun Singh',
    customerEmail: 'arjun.s@example.com',
    customerPhone: '+91 98765-43212',
    eventId: 'e3',
    eventName: 'IPL 2025: MI vs CSK',
    eventType: 'sports',
    venue: 'Wankhede Stadium',
    eventDate: new Date('2025-03-15T19:30:00'),
    bookingDate: new Date('2024-12-02T09:00:00'),
    ticketCount: 4,
    tickets: [
      { ticketId: 'T6', seatNumber: 'N-45', category: 'Pavilion', price: 3500 },
      { ticketId: 'T7', seatNumber: 'N-46', category: 'Pavilion', price: 3500 },
      { ticketId: 'T8', seatNumber: 'N-47', category: 'Pavilion', price: 3500 },
      { ticketId: 'T9', seatNumber: 'N-48', category: 'Pavilion', price: 3500 }
    ],
    totalAmount: 14000,
    convenienceFee: 700,
    tax: 1470,
    finalAmount: 16170,
    status: 'confirmed',
    paymentStatus: 'completed',
    qrCode: 'QR345678'
  },
  {
    id: 'tb4',
    bookingId: 'TKT-20241202-004',
    customerId: 'c4',
    customerName: 'Sneha Verma',
    customerEmail: 'sneha.v@example.com',
    customerPhone: '+91 98765-43213',
    eventId: 'e4',
    eventName: 'Zakir Khan Stand-up Comedy',
    eventType: 'comedy',
    venue: 'NCPA, Nariman Point',
    eventDate: new Date('2024-12-10T20:00:00'),
    bookingDate: new Date('2024-12-02T11:45:00'),
    ticketCount: 2,
    tickets: [
      { ticketId: 'T10', category: 'General', price: 1200 },
      { ticketId: 'T11', category: 'General', price: 1200 }
    ],
    totalAmount: 2400,
    convenienceFee: 120,
    tax: 252,
    finalAmount: 2772,
    status: 'confirmed',
    paymentStatus: 'completed'
  },
  {
    id: 'tb5',
    bookingId: 'TKT-20241202-005',
    customerId: 'c5',
    customerName: 'Karan Mehta',
    customerEmail: 'karan.m@example.com',
    customerPhone: '+91 98765-43214',
    eventId: 'e5',
    eventName: 'Hamilton - The Musical',
    eventType: 'theatre',
    venue: 'NCPA Theatre',
    eventDate: new Date('2024-12-25T19:00:00'),
    bookingDate: new Date('2024-11-30T16:20:00'),
    ticketCount: 2,
    tickets: [
      { ticketId: 'T12', seatNumber: 'D-12', category: 'Premium', price: 4500 },
      { ticketId: 'T13', seatNumber: 'D-13', category: 'Premium', price: 4500 }
    ],
    totalAmount: 9000,
    convenienceFee: 450,
    tax: 945,
    finalAmount: 10395,
    status: 'cancelled',
    paymentStatus: 'refunded',
    refundAmount: 9346
  }
]

export const mockEvents: Event[] = [
  {
    id: 'e1',
    name: 'Pushpa 2: The Rule',
    type: 'movie',
    category: 'Action',
    description: 'The Rule continues the explosive saga of Pushpa Raj',
    venue: 'PVR Cinemas, Phoenix Mall',
    city: 'Mumbai',
    startDate: new Date('2024-12-05'),
    endDate: new Date('2025-01-05'),
    poster: '/posters/pushpa2.jpg',
    organizer: 'PVR Cinemas',
    status: 'ongoing',
    totalSeats: 300,
    bookedSeats: 245,
    availableSeats: 55,
    basePrice: 250,
    categories: [
      { name: 'Regular', price: 250, available: 30, total: 150 },
      { name: 'Premium', price: 450, available: 25, total: 150 }
    ],
    rating: 4.5,
    tags: ['action', 'thriller', 'indian']
  },
  {
    id: 'e2',
    name: 'Coldplay Live in Mumbai',
    type: 'concert',
    category: 'Rock/Pop',
    description: 'Coldplay brings their Music of the Spheres tour to India',
    venue: 'DY Patil Stadium',
    city: 'Mumbai',
    startDate: new Date('2024-12-20T18:00:00'),
    poster: '/posters/coldplay.jpg',
    organizer: 'BookMyShow Live',
    status: 'upcoming',
    totalSeats: 50000,
    bookedSeats: 47850,
    availableSeats: 2150,
    basePrice: 3500,
    categories: [
      { name: 'Silver', price: 3500, available: 500, total: 20000 },
      { name: 'Gold', price: 8500, available: 850, total: 15000 },
      { name: 'Platinum', price: 15000, available: 800, total: 15000 }
    ],
    rating: 5.0,
    tags: ['concert', 'international', 'rock']
  },
  {
    id: 'e3',
    name: 'IPL 2025: MI vs CSK',
    type: 'sports',
    category: 'Cricket',
    description: 'The epic rivalry continues - Mumbai Indians vs Chennai Super Kings',
    venue: 'Wankhede Stadium',
    city: 'Mumbai',
    startDate: new Date('2025-03-15T19:30:00'),
    poster: '/posters/ipl.jpg',
    organizer: 'BCCI',
    status: 'upcoming',
    totalSeats: 33000,
    bookedSeats: 28500,
    availableSeats: 4500,
    basePrice: 1500,
    categories: [
      { name: 'General', price: 1500, available: 2000, total: 15000 },
      { name: 'Pavilion', price: 3500, available: 1500, total: 10000 },
      { name: 'Corporate Box', price: 12000, available: 1000, total: 8000 }
    ],
    rating: 4.8,
    tags: ['cricket', 'ipl', 'sports']
  },
  {
    id: 'e4',
    name: 'Zakir Khan Stand-up Comedy',
    type: 'comedy',
    category: 'Stand-up',
    description: 'Zakir Khan presents his latest comedy special',
    venue: 'NCPA, Nariman Point',
    city: 'Mumbai',
    startDate: new Date('2024-12-10T20:00:00'),
    poster: '/posters/zakir.jpg',
    organizer: 'Insider.in',
    status: 'upcoming',
    totalSeats: 1200,
    bookedSeats: 1050,
    availableSeats: 150,
    basePrice: 1200,
    categories: [
      { name: 'General', price: 1200, available: 100, total: 800 },
      { name: 'VIP', price: 2500, available: 50, total: 400 }
    ],
    rating: 4.7,
    tags: ['comedy', 'hindi', 'stand-up']
  },
  {
    id: 'e5',
    name: 'Hamilton - The Musical',
    type: 'theatre',
    category: 'Musical',
    description: 'The revolutionary story of founding father Alexander Hamilton',
    venue: 'NCPA Theatre',
    city: 'Mumbai',
    startDate: new Date('2024-12-20'),
    endDate: new Date('2025-01-10'),
    poster: '/posters/hamilton.jpg',
    organizer: 'NCPA',
    status: 'upcoming',
    totalSeats: 800,
    bookedSeats: 620,
    availableSeats: 180,
    basePrice: 2500,
    categories: [
      { name: 'Balcony', price: 2500, available: 80, total: 300 },
      { name: 'Premium', price: 4500, available: 100, total: 500 }
    ],
    rating: 4.9,
    tags: ['musical', 'theatre', 'broadway']
  }
]

export const mockVenues: Venue[] = [
  {
    id: 'v1',
    name: 'PVR Cinemas, Phoenix Mall',
    address: 'Phoenix Marketcity, Kurla West',
    city: 'Mumbai',
    state: 'Maharashtra',
    capacity: 300,
    facilities: ['Parking', 'Food Court', 'Wheelchair Access', '4K Projection'],
    rating: 4.3,
    totalEvents: 1250,
    coordinates: { lat: 19.0883, lng: 72.8912 }
  },
  {
    id: 'v2',
    name: 'DY Patil Stadium',
    address: 'DY Patil Sports Stadium, Nerul',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    capacity: 55000,
    facilities: ['Parking', 'Food Stalls', 'Medical', 'VIP Boxes'],
    rating: 4.5,
    totalEvents: 85,
    coordinates: { lat: 19.0330, lng: 73.0297 }
  },
  {
    id: 'v3',
    name: 'Wankhede Stadium',
    address: 'D Road, Churchgate',
    city: 'Mumbai',
    state: 'Maharashtra',
    capacity: 33000,
    facilities: ['Parking', 'Food Court', 'Medical', 'Corporate Boxes', 'Press Box'],
    rating: 4.7,
    totalEvents: 120,
    coordinates: { lat: 18.9388, lng: 72.8258 }
  }
]

export const mockEventOrganizers: EventOrganizer[] = [
  {
    id: 'o1',
    name: 'BookMyShow Live',
    email: 'live@bookmyshow.com',
    phone: '+91 22-6123-4567',
    totalEvents: 450,
    totalRevenue: 45000000,
    rating: 4.6,
    status: 'active',
    verificationStatus: 'verified',
    commission: 12
  },
  {
    id: 'o2',
    name: 'PVR Cinemas',
    email: 'corporate@pvrcinemas.com',
    phone: '+91 22-6789-0123',
    totalEvents: 12000,
    totalRevenue: 125000000,
    rating: 4.4,
    status: 'active',
    verificationStatus: 'verified',
    commission: 8
  },
  {
    id: 'o3',
    name: 'NCPA',
    email: 'info@ncpamumbai.com',
    phone: '+91 22-6622-3737',
    totalEvents: 850,
    totalRevenue: 28000000,
    rating: 4.8,
    status: 'active',
    verificationStatus: 'verified',
    commission: 10
  }
]

export const mockEventAnalytics: EventAnalytics[] = [
  {
    eventId: 'e1',
    eventName: 'Pushpa 2: The Rule',
    totalBookings: 245,
    totalRevenue: 95000,
    occupancyRate: 81.7,
    averageTicketPrice: 388,
    peakBookingTime: '14:00-16:00'
  },
  {
    eventId: 'e2',
    eventName: 'Coldplay Live in Mumbai',
    totalBookings: 47850,
    totalRevenue: 385000000,
    occupancyRate: 95.7,
    averageTicketPrice: 8045,
    peakBookingTime: '10:00-12:00'
  },
  {
    eventId: 'e3',
    eventName: 'IPL 2025: MI vs CSK',
    totalBookings: 28500,
    totalRevenue: 98000000,
    occupancyRate: 86.4,
    averageTicketPrice: 3439,
    peakBookingTime: '09:00-11:00'
  }
]
