import type { Rider, Delivery, RiderAnalytics, ZoneMetrics } from '@/types/rider'

export const mockRiders: Rider[] = [
  {
    id: '1',
    riderId: 'RDR001',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@gozy.com',
    status: 'on-trip',
    vehicle: {
      type: 'bike',
      model: 'Honda Activa 6G',
      registrationNumber: 'DL-1C-AB-1234',
      color: 'Red',
      year: 2023,
      insuranceExpiry: '2025-12-31',
      pollutionExpiry: '2026-06-30',
      verified: true
    },
    currentLocation: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Connaught Place',
      city: 'New Delhi',
      zone: 'Central Delhi'
    },
    homeLocation: {
      lat: 28.5355,
      lng: 77.3910,
      address: 'Sector 18, Noida',
      city: 'Noida',
      zone: 'Noida'
    },
    deliveryTypes: ['food', 'shopping'],
    joinDate: '2023-06-15',
    lastActiveTime: new Date().toISOString(),
    performance: {
      totalDeliveries: 2847,
      completedDeliveries: 2789,
      cancelledDeliveries: 58,
      averageRating: 4.8,
      totalRatings: 2456,
      onTimeDeliveryRate: 94.2,
      acceptanceRate: 89.5,
      availabilityRate: 92.1
    },
    earnings: {
      today: 1850,
      thisWeek: 12450,
      thisMonth: 48920,
      lastMonth: 52340,
      totalEarnings: 658700,
      pendingPayout: 12450,
      lastPayoutDate: '2025-11-25',
      lastPayoutAmount: 52340
    },
    currentShift: {
      id: 'SH001',
      date: '2025-12-02',
      type: 'morning',
      startTime: '2025-12-02T09:00:00',
      totalHours: 4.5,
      deliveries: 12,
      earnings: 1850,
      distance: 45.8
    },
    documents: {
      aadhar: {
        number: '1234 5678 9012',
        verified: true,
        uploadDate: '2023-06-10'
      },
      pan: {
        number: 'ABCDE1234F',
        verified: true,
        uploadDate: '2023-06-10'
      },
      drivingLicense: {
        number: 'DL-0120230012345',
        verified: true,
        expiryDate: '2028-06-15',
        uploadDate: '2023-06-10'
      },
      rcBook: {
        number: 'DL1CAB123456789',
        verified: true,
        uploadDate: '2023-06-10'
      }
    },
    bankAccount: {
      accountNumber: '1234567890123456',
      ifscCode: 'HDFC0001234',
      accountHolderName: 'Rajesh Kumar',
      verified: true
    },
    emergencyContact: {
      name: 'Sunita Kumar',
      phone: '+91 98765 11111',
      relation: 'Wife'
    }
  },
  {
    id: '2',
    riderId: 'RDR002',
    name: 'Mohammed Alam',
    phone: '+91 98765 43211',
    email: 'mohammed.alam@gozy.com',
    status: 'active',
    vehicle: {
      type: 'auto',
      model: 'Bajaj RE',
      registrationNumber: 'DL-1L-XY-5678',
      color: 'Yellow-Green',
      year: 2022,
      insuranceExpiry: '2025-11-30',
      pollutionExpiry: '2026-05-31',
      verified: true
    },
    currentLocation: {
      lat: 28.5494,
      lng: 77.2501,
      address: 'Saket',
      city: 'New Delhi',
      zone: 'South Delhi'
    },
    homeLocation: {
      lat: 28.5494,
      lng: 77.2501,
      address: 'Govindpuri',
      city: 'New Delhi',
      zone: 'South Delhi'
    },
    deliveryTypes: ['auto'],
    joinDate: '2022-03-20',
    lastActiveTime: new Date(Date.now() - 5 * 60000).toISOString(),
    performance: {
      totalDeliveries: 4521,
      completedDeliveries: 4398,
      cancelledDeliveries: 123,
      averageRating: 4.6,
      totalRatings: 3987,
      onTimeDeliveryRate: 91.8,
      acceptanceRate: 87.2,
      availabilityRate: 88.5
    },
    earnings: {
      today: 2340,
      thisWeek: 15890,
      thisMonth: 62450,
      lastMonth: 58920,
      totalEarnings: 892340,
      pendingPayout: 15890,
      lastPayoutDate: '2025-11-25',
      lastPayoutAmount: 58920
    },
    currentShift: {
      id: 'SH002',
      date: '2025-12-02',
      type: 'morning',
      startTime: '2025-12-02T08:00:00',
      totalHours: 5.5,
      deliveries: 8,
      earnings: 2340,
      distance: 62.3
    },
    documents: {
      aadhar: {
        number: '2345 6789 0123',
        verified: true,
        uploadDate: '2022-03-15'
      },
      pan: {
        number: 'BCDEF2345G',
        verified: true,
        uploadDate: '2022-03-15'
      },
      drivingLicense: {
        number: 'DL-0120220023456',
        verified: true,
        expiryDate: '2027-03-20',
        uploadDate: '2022-03-15'
      },
      rcBook: {
        number: 'DL1LXY567890123',
        verified: true,
        uploadDate: '2022-03-15'
      }
    },
    bankAccount: {
      accountNumber: '2345678901234567',
      ifscCode: 'SBIN0001234',
      accountHolderName: 'Mohammed Alam',
      verified: true
    },
    emergencyContact: {
      name: 'Fatima Alam',
      phone: '+91 98765 22222',
      relation: 'Wife'
    }
  },
  {
    id: '3',
    riderId: 'RDR003',
    name: 'Priya Sharma',
    phone: '+91 98765 43212',
    email: 'priya.sharma@gozy.com',
    status: 'on-trip',
    vehicle: {
      type: 'cab',
      model: 'Maruti Swift Dzire',
      registrationNumber: 'DL-3C-MN-9012',
      color: 'White',
      year: 2024,
      insuranceExpiry: '2026-03-31',
      pollutionExpiry: '2026-09-30',
      verified: true
    },
    currentLocation: {
      lat: 28.7041,
      lng: 77.1025,
      address: 'Rohini',
      city: 'New Delhi',
      zone: 'North Delhi'
    },
    homeLocation: {
      lat: 28.7041,
      lng: 77.1025,
      address: 'Sector 9, Rohini',
      city: 'New Delhi',
      zone: 'North Delhi'
    },
    deliveryTypes: ['cab'],
    joinDate: '2024-01-10',
    lastActiveTime: new Date().toISOString(),
    performance: {
      totalDeliveries: 856,
      completedDeliveries: 831,
      cancelledDeliveries: 25,
      averageRating: 4.9,
      totalRatings: 789,
      onTimeDeliveryRate: 96.5,
      acceptanceRate: 91.8,
      availabilityRate: 94.2
    },
    earnings: {
      today: 3450,
      thisWeek: 22340,
      thisMonth: 89670,
      lastMonth: 92450,
      totalEarnings: 456780,
      pendingPayout: 22340,
      lastPayoutDate: '2025-11-25',
      lastPayoutAmount: 92450
    },
    currentShift: {
      id: 'SH003',
      date: '2025-12-02',
      type: 'full-day',
      startTime: '2025-12-02T07:00:00',
      totalHours: 6.5,
      deliveries: 5,
      earnings: 3450,
      distance: 78.5
    },
    documents: {
      aadhar: {
        number: '3456 7890 1234',
        verified: true,
        uploadDate: '2024-01-05'
      },
      pan: {
        number: 'CDEFG3456H',
        verified: true,
        uploadDate: '2024-01-05'
      },
      drivingLicense: {
        number: 'DL-0120240034567',
        verified: true,
        expiryDate: '2029-01-10',
        uploadDate: '2024-01-05'
      },
      rcBook: {
        number: 'DL3CMN901234567',
        verified: true,
        uploadDate: '2024-01-05'
      }
    },
    bankAccount: {
      accountNumber: '3456789012345678',
      ifscCode: 'ICIC0001234',
      accountHolderName: 'Priya Sharma',
      verified: true
    },
    emergencyContact: {
      name: 'Vikram Sharma',
      phone: '+91 98765 33333',
      relation: 'Husband'
    }
  },
  {
    id: '4',
    riderId: 'RDR004',
    name: 'Amit Singh',
    phone: '+91 98765 43213',
    email: 'amit.singh@gozy.com',
    status: 'active',
    vehicle: {
      type: 'bike',
      model: 'TVS Apache',
      registrationNumber: 'UP-16-CD-3456',
      color: 'Black',
      year: 2023,
      insuranceExpiry: '2026-01-31',
      pollutionExpiry: '2026-07-31',
      verified: true
    },
    currentLocation: {
      lat: 28.4089,
      lng: 77.3178,
      address: 'Sector 62, Noida',
      city: 'Noida',
      zone: 'Noida'
    },
    homeLocation: {
      lat: 28.4089,
      lng: 77.3178,
      address: 'Sector 62, Noida',
      city: 'Noida',
      zone: 'Noida'
    },
    deliveryTypes: ['bike', 'food', 'shopping'],
    joinDate: '2023-09-05',
    lastActiveTime: new Date(Date.now() - 3 * 60000).toISOString(),
    performance: {
      totalDeliveries: 1923,
      completedDeliveries: 1867,
      cancelledDeliveries: 56,
      averageRating: 4.7,
      totalRatings: 1654,
      onTimeDeliveryRate: 93.1,
      acceptanceRate: 88.9,
      availabilityRate: 90.5
    },
    earnings: {
      today: 1980,
      thisWeek: 13560,
      thisMonth: 54230,
      lastMonth: 56780,
      totalEarnings: 387650,
      pendingPayout: 13560,
      lastPayoutDate: '2025-11-25',
      lastPayoutAmount: 56780
    },
    documents: {
      aadhar: {
        number: '4567 8901 2345',
        verified: true,
        uploadDate: '2023-09-01'
      },
      pan: {
        number: 'DEFGH4567I',
        verified: true,
        uploadDate: '2023-09-01'
      },
      drivingLicense: {
        number: 'UP-1620230045678',
        verified: true,
        expiryDate: '2028-09-05',
        uploadDate: '2023-09-01'
      },
      rcBook: {
        number: 'UP16CD345678901',
        verified: true,
        uploadDate: '2023-09-01'
      }
    },
    bankAccount: {
      accountNumber: '4567890123456789',
      ifscCode: 'HDFC0005678',
      accountHolderName: 'Amit Singh',
      verified: true
    },
    emergencyContact: {
      name: 'Ravi Singh',
      phone: '+91 98765 44444',
      relation: 'Brother'
    }
  },
  {
    id: '5',
    riderId: 'RDR005',
    name: 'Suresh Reddy',
    phone: '+91 98765 43214',
    email: 'suresh.reddy@gozy.com',
    status: 'offline',
    vehicle: {
      type: 'bike',
      model: 'Hero Splendor',
      registrationNumber: 'DL-8S-PQ-7890',
      color: 'Blue',
      year: 2021,
      insuranceExpiry: '2025-10-31',
      pollutionExpiry: '2026-04-30',
      verified: true
    },
    homeLocation: {
      lat: 28.6692,
      lng: 77.4538,
      address: 'Indirapuram',
      city: 'Ghaziabad',
      zone: 'Ghaziabad'
    },
    deliveryTypes: ['food', 'shopping'],
    joinDate: '2021-11-20',
    lastActiveTime: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    performance: {
      totalDeliveries: 5632,
      completedDeliveries: 5421,
      cancelledDeliveries: 211,
      averageRating: 4.5,
      totalRatings: 4987,
      onTimeDeliveryRate: 89.7,
      acceptanceRate: 85.3,
      availabilityRate: 86.8
    },
    earnings: {
      today: 0,
      thisWeek: 9870,
      thisMonth: 42150,
      lastMonth: 48920,
      totalEarnings: 1234560,
      pendingPayout: 9870,
      lastPayoutDate: '2025-11-25',
      lastPayoutAmount: 48920
    },
    documents: {
      aadhar: {
        number: '5678 9012 3456',
        verified: true,
        uploadDate: '2021-11-15'
      },
      pan: {
        number: 'EFGHI5678J',
        verified: true,
        uploadDate: '2021-11-15'
      },
      drivingLicense: {
        number: 'DL-0820210056789',
        verified: true,
        expiryDate: '2026-11-20',
        uploadDate: '2021-11-15'
      },
      rcBook: {
        number: 'DL8SPQ789012345',
        verified: true,
        uploadDate: '2021-11-15'
      }
    },
    bankAccount: {
      accountNumber: '5678901234567890',
      ifscCode: 'SBIN0006789',
      accountHolderName: 'Suresh Reddy',
      verified: true
    },
    emergencyContact: {
      name: 'Lakshmi Reddy',
      phone: '+91 98765 55555',
      relation: 'Wife'
    }
  }
]

export const mockDeliveries: Delivery[] = [
  {
    id: '1',
    deliveryId: 'DEL001',
    type: 'food',
    pickupLocation: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'McDonald\'s, Connaught Place',
      city: 'New Delhi',
      zone: 'Central Delhi'
    },
    dropLocation: {
      lat: 28.6289,
      lng: 77.2065,
      address: 'Kasturba Gandhi Marg',
      city: 'New Delhi',
      zone: 'Central Delhi'
    },
    distance: 2.3,
    amount: 150,
    commission: 30,
    tip: 20,
    status: 'in-transit',
    orderTime: new Date(Date.now() - 25 * 60000).toISOString(),
    pickupTime: new Date(Date.now() - 15 * 60000).toISOString(),
    customerName: 'Arjun Mehta',
    customerPhone: '+91 98765 11111'
  },
  {
    id: '2',
    deliveryId: 'DEL002',
    type: 'shopping',
    pickupLocation: {
      lat: 28.5494,
      lng: 77.2501,
      address: 'Select Citywalk Mall, Saket',
      city: 'New Delhi',
      zone: 'South Delhi'
    },
    dropLocation: {
      lat: 28.5244,
      lng: 77.2066,
      address: 'Hauz Khas',
      city: 'New Delhi',
      zone: 'South Delhi'
    },
    distance: 4.7,
    amount: 280,
    commission: 42,
    tip: 0,
    status: 'picked',
    orderTime: new Date(Date.now() - 35 * 60000).toISOString(),
    pickupTime: new Date(Date.now() - 10 * 60000).toISOString(),
    customerName: 'Neha Gupta',
    customerPhone: '+91 98765 22222'
  },
  {
    id: '3',
    deliveryId: 'DEL003',
    type: 'cab',
    pickupLocation: {
      lat: 28.7041,
      lng: 77.1025,
      address: 'Rohini Sector 9',
      city: 'New Delhi',
      zone: 'North Delhi'
    },
    dropLocation: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Connaught Place',
      city: 'New Delhi',
      zone: 'Central Delhi'
    },
    distance: 18.5,
    amount: 485,
    commission: 97,
    tip: 50,
    status: 'in-transit',
    orderTime: new Date(Date.now() - 45 * 60000).toISOString(),
    pickupTime: new Date(Date.now() - 40 * 60000).toISOString(),
    customerName: 'Rahul Kapoor',
    customerPhone: '+91 98765 33333'
  },
  {
    id: '4',
    deliveryId: 'DEL004',
    type: 'food',
    pickupLocation: {
      lat: 28.4089,
      lng: 77.3178,
      address: 'Domino\'s, Sector 62 Noida',
      city: 'Noida',
      zone: 'Noida'
    },
    dropLocation: {
      lat: 28.5355,
      lng: 77.3910,
      address: 'Sector 18, Noida',
      city: 'Noida',
      zone: 'Noida'
    },
    distance: 6.2,
    amount: 195,
    commission: 39,
    tip: 30,
    status: 'delivered',
    orderTime: new Date(Date.now() - 90 * 60000).toISOString(),
    pickupTime: new Date(Date.now() - 75 * 60000).toISOString(),
    deliveryTime: new Date(Date.now() - 45 * 60000).toISOString(),
    rating: 5,
    customerName: 'Pooja Malhotra',
    customerPhone: '+91 98765 44444'
  },
  {
    id: '5',
    deliveryId: 'DEL005',
    type: 'auto',
    pickupLocation: {
      lat: 28.5494,
      lng: 77.2501,
      address: 'Saket Metro Station',
      city: 'New Delhi',
      zone: 'South Delhi'
    },
    dropLocation: {
      lat: 28.4595,
      lng: 77.0266,
      address: 'Gurugram Cyber City',
      city: 'Gurugram',
      zone: 'Gurugram'
    },
    distance: 12.8,
    amount: 320,
    commission: 64,
    tip: 20,
    status: 'delivered',
    orderTime: new Date(Date.now() - 120 * 60000).toISOString(),
    pickupTime: new Date(Date.now() - 110 * 60000).toISOString(),
    deliveryTime: new Date(Date.now() - 75 * 60000).toISOString(),
    rating: 4,
    customerName: 'Sanjay Verma',
    customerPhone: '+91 98765 55555'
  }
]

export const mockRiderAnalytics: RiderAnalytics[] = [
  {
    deliveryType: 'food',
    totalRiders: 1250,
    activeRiders: 845,
    onTripRiders: 523,
    totalDeliveries: 8945,
    averageDeliveryTime: 32,
    revenue: 2845600,
    avgEarningsPerRider: 48920,
    peakHours: ['12:00-14:00', '19:00-22:00']
  },
  {
    deliveryType: 'shopping',
    totalRiders: 680,
    activeRiders: 412,
    onTripRiders: 267,
    totalDeliveries: 3421,
    averageDeliveryTime: 45,
    revenue: 1567800,
    avgEarningsPerRider: 42340,
    peakHours: ['10:00-13:00', '17:00-20:00']
  },
  {
    deliveryType: 'cab',
    totalRiders: 420,
    activeRiders: 298,
    onTripRiders: 189,
    totalDeliveries: 1876,
    averageDeliveryTime: 28,
    revenue: 4234500,
    avgEarningsPerRider: 89670,
    peakHours: ['08:00-10:00', '18:00-21:00']
  },
  {
    deliveryType: 'bike',
    totalRiders: 890,
    activeRiders: 623,
    onTripRiders: 398,
    totalDeliveries: 5632,
    averageDeliveryTime: 25,
    revenue: 1892300,
    avgEarningsPerRider: 54230,
    peakHours: ['09:00-11:00', '17:00-19:00']
  },
  {
    deliveryType: 'auto',
    totalRiders: 560,
    activeRiders: 387,
    onTripRiders: 234,
    totalDeliveries: 2987,
    averageDeliveryTime: 35,
    revenue: 2456700,
    avgEarningsPerRider: 62450,
    peakHours: ['07:00-10:00', '17:00-20:00']
  }
]

export const mockZoneMetrics: ZoneMetrics[] = [
  {
    zoneName: 'Central Delhi',
    totalRiders: 458,
    activeRiders: 312,
    avgResponseTime: 8,
    completionRate: 94.5,
    customerSatisfaction: 4.7,
    totalDeliveries: 4523
  },
  {
    zoneName: 'South Delhi',
    totalRiders: 623,
    activeRiders: 445,
    avgResponseTime: 6,
    completionRate: 96.2,
    customerSatisfaction: 4.8,
    totalDeliveries: 6234
  },
  {
    zoneName: 'North Delhi',
    totalRiders: 389,
    activeRiders: 267,
    avgResponseTime: 10,
    completionRate: 91.8,
    customerSatisfaction: 4.6,
    totalDeliveries: 3456
  },
  {
    zoneName: 'Noida',
    totalRiders: 512,
    activeRiders: 378,
    avgResponseTime: 7,
    completionRate: 93.7,
    customerSatisfaction: 4.7,
    totalDeliveries: 5123
  },
  {
    zoneName: 'Gurugram',
    totalRiders: 687,
    activeRiders: 498,
    avgResponseTime: 9,
    completionRate: 92.4,
    customerSatisfaction: 4.5,
    totalDeliveries: 5987
  },
  {
    zoneName: 'Ghaziabad',
    totalRiders: 331,
    activeRiders: 215,
    avgResponseTime: 11,
    completionRate: 89.6,
    customerSatisfaction: 4.4,
    totalDeliveries: 2538
  }
]
