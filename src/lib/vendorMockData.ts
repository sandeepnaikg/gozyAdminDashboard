import type { Vendor, VendorAnalytics, Settlement, Complaint, Onboarding } from '@/types/vendor'

export const mockVendors: Vendor[] = [
  {
    id: '1',
    vendorId: 'VEN001',
    businessName: 'Spice Garden Restaurant',
    legalName: 'Spice Garden Hospitality Pvt Ltd',
    type: 'restaurant',
    status: 'active',
    tier: 'platinum',
    logo: '/vendors/spice-garden.png',
    address: {
      street: '45, MG Road',
      area: 'Connaught Place',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001',
      landmark: 'Near Metro Station',
      lat: 28.6289,
      lng: 77.2065
    },
    contacts: [
      {
        name: 'Vikram Singh',
        designation: 'Owner',
        phone: '+91 98765 11111',
        email: 'vikram@spicegarden.com',
        isPrimary: true
      },
      {
        name: 'Priya Sharma',
        designation: 'Manager',
        phone: '+91 98765 11112',
        email: 'priya@spicegarden.com',
        isPrimary: false
      }
    ],
    operatingHours: [
      { day: 'Monday', open: '11:00', close: '23:00', isClosed: false },
      { day: 'Tuesday', open: '11:00', close: '23:00', isClosed: false },
      { day: 'Wednesday', open: '11:00', close: '23:00', isClosed: false },
      { day: 'Thursday', open: '11:00', close: '23:00', isClosed: false },
      { day: 'Friday', open: '11:00', close: '23:30', isClosed: false },
      { day: 'Saturday', open: '11:00', close: '23:30', isClosed: false },
      { day: 'Sunday', open: '11:00', close: '23:00', isClosed: false }
    ],
    commission: {
      type: 'percentage',
      value: 18,
      minOrder: 0,
      maxCap: 500
    },
    performance: {
      totalOrders: 8945,
      completedOrders: 8234,
      cancelledOrders: 456,
      rejectedOrders: 255,
      averageRating: 4.6,
      totalReviews: 7832,
      averagePreparationTime: 28,
      onTimeDeliveryRate: 92.5,
      acceptanceRate: 94.3
    },
    revenue: {
      today: 125600,
      thisWeek: 892300,
      thisMonth: 3456700,
      lastMonth: 3234500,
      totalRevenue: 45678900,
      pendingSettlement: 892300,
      lastSettlementDate: '2025-11-25',
      lastSettlementAmount: 3234500
    },
    compliance: {
      fssaiLicense: {
        type: 'FSSAI License',
        number: '12345678901234',
        issueDate: '2024-01-15',
        expiryDate: '2029-01-14',
        status: 'verified'
      },
      gstNumber: '07AABCU9603R1ZM',
      gstVerified: true,
      panNumber: 'AABCU9603R',
      panVerified: true,
      tradeLicense: {
        type: 'Trade License',
        number: 'TL-DL-2024-001234',
        issueDate: '2024-01-10',
        expiryDate: '2025-12-31',
        status: 'verified'
      }
    },
    bankDetails: {
      accountNumber: '12345678901234',
      ifscCode: 'HDFC0001234',
      accountHolderName: 'Spice Garden Hospitality Pvt Ltd',
      bankName: 'HDFC Bank',
      branchName: 'Connaught Place',
      verified: true,
      verifiedDate: '2024-01-20'
    },
    onboardingDate: '2024-01-20',
    lastActiveDate: new Date().toISOString(),
    categories: ['North Indian', 'Chinese', 'Continental'],
    tags: ['Popular', 'Fast Delivery', 'Top Rated'],
    description: 'Premium multi-cuisine restaurant serving authentic North Indian and Chinese delicacies',
    minimumOrder: 199,
    deliveryRadius: 8,
    avgDeliveryTime: 35,
    menuStats: {
      totalItems: 156,
      activeItems: 142,
      outOfStockItems: 14,
      popularItems: ['Butter Chicken', 'Dal Makhani', 'Hakka Noodles'],
      avgItemPrice: 285
    },
    isExclusive: true,
    isFeatured: true,
    verificationStatus: 'verified'
  },
  {
    id: '2',
    vendorId: 'VEN002',
    businessName: 'TechStore Electronics',
    legalName: 'TechStore India Pvt Ltd',
    type: 'store',
    status: 'active',
    tier: 'gold',
    address: {
      street: '23, Nehru Place',
      area: 'Nehru Place',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110019',
      lat: 28.5494,
      lng: 77.2501
    },
    contacts: [
      {
        name: 'Rahul Gupta',
        designation: 'Store Manager',
        phone: '+91 98765 22222',
        email: 'rahul@techstore.com',
        isPrimary: true
      }
    ],
    operatingHours: [
      { day: 'Monday', open: '10:00', close: '21:00', isClosed: false },
      { day: 'Tuesday', open: '10:00', close: '21:00', isClosed: false },
      { day: 'Wednesday', open: '10:00', close: '21:00', isClosed: false },
      { day: 'Thursday', open: '10:00', close: '21:00', isClosed: false },
      { day: 'Friday', open: '10:00', close: '21:00', isClosed: false },
      { day: 'Saturday', open: '10:00', close: '21:00', isClosed: false },
      { day: 'Sunday', open: '10:00', close: '20:00', isClosed: false }
    ],
    commission: {
      type: 'percentage',
      value: 12,
      minOrder: 0
    },
    performance: {
      totalOrders: 3421,
      completedOrders: 3198,
      cancelledOrders: 145,
      rejectedOrders: 78,
      averageRating: 4.4,
      totalReviews: 2987,
      averagePreparationTime: 45,
      onTimeDeliveryRate: 89.7,
      acceptanceRate: 91.2
    },
    revenue: {
      today: 234500,
      thisWeek: 1567800,
      thisMonth: 6234500,
      lastMonth: 5892300,
      totalRevenue: 78456700,
      pendingSettlement: 1567800,
      lastSettlementDate: '2025-11-25',
      lastSettlementAmount: 5892300
    },
    compliance: {
      gstNumber: '07AABCT1234R1ZM',
      gstVerified: true,
      panNumber: 'AABCT1234R',
      panVerified: true,
      tradeLicense: {
        type: 'Trade License',
        number: 'TL-DL-2023-005678',
        issueDate: '2023-06-10',
        expiryDate: '2026-06-09',
        status: 'verified'
      }
    },
    bankDetails: {
      accountNumber: '23456789012345',
      ifscCode: 'ICIC0001234',
      accountHolderName: 'TechStore India Pvt Ltd',
      bankName: 'ICICI Bank',
      branchName: 'Nehru Place',
      verified: true,
      verifiedDate: '2023-06-15'
    },
    onboardingDate: '2023-06-15',
    lastActiveDate: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    categories: ['Electronics', 'Mobile Accessories', 'Laptops'],
    tags: ['Trusted Seller', 'Wide Range'],
    description: 'One-stop shop for all electronics and accessories',
    minimumOrder: 299,
    deliveryRadius: 12,
    avgDeliveryTime: 60,
    menuStats: {
      totalItems: 450,
      activeItems: 423,
      outOfStockItems: 27,
      popularItems: ['iPhone 15 Pro', 'MacBook Air M3', 'AirPods Pro'],
      avgItemPrice: 25400
    },
    isExclusive: false,
    isFeatured: true,
    verificationStatus: 'verified'
  },
  {
    id: '3',
    vendorId: 'VEN003',
    businessName: 'HomeCare Services',
    legalName: 'HomeCare Solutions LLP',
    type: 'service-provider',
    status: 'active',
    tier: 'silver',
    address: {
      street: '67, Saket',
      area: 'Saket',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110017',
      lat: 28.5244,
      lng: 77.2066
    },
    contacts: [
      {
        name: 'Anjali Verma',
        designation: 'Operations Head',
        phone: '+91 98765 33333',
        email: 'anjali@homecare.com',
        isPrimary: true
      }
    ],
    operatingHours: [
      { day: 'Monday', open: '08:00', close: '20:00', isClosed: false },
      { day: 'Tuesday', open: '08:00', close: '20:00', isClosed: false },
      { day: 'Wednesday', open: '08:00', close: '20:00', isClosed: false },
      { day: 'Thursday', open: '08:00', close: '20:00', isClosed: false },
      { day: 'Friday', open: '08:00', close: '20:00', isClosed: false },
      { day: 'Saturday', open: '08:00', close: '20:00', isClosed: false },
      { day: 'Sunday', open: '09:00', close: '18:00', isClosed: false }
    ],
    commission: {
      type: 'percentage',
      value: 15,
      minOrder: 0
    },
    performance: {
      totalOrders: 1876,
      completedOrders: 1734,
      cancelledOrders: 98,
      rejectedOrders: 44,
      averageRating: 4.7,
      totalReviews: 1598,
      averagePreparationTime: 120,
      onTimeDeliveryRate: 94.8,
      acceptanceRate: 92.5
    },
    revenue: {
      today: 45600,
      thisWeek: 298700,
      thisMonth: 1234500,
      lastMonth: 1156700,
      totalRevenue: 15678900,
      pendingSettlement: 298700,
      lastSettlementDate: '2025-11-25',
      lastSettlementAmount: 1156700
    },
    compliance: {
      gstNumber: '07AABCH5678R1ZM',
      gstVerified: true,
      panNumber: 'AABCH5678R',
      panVerified: true,
      tradeLicense: {
        type: 'Service License',
        number: 'SL-DL-2024-003456',
        issueDate: '2024-03-01',
        expiryDate: '2027-02-28',
        status: 'verified'
      }
    },
    bankDetails: {
      accountNumber: '34567890123456',
      ifscCode: 'SBIN0001234',
      accountHolderName: 'HomeCare Solutions LLP',
      bankName: 'State Bank of India',
      branchName: 'Saket',
      verified: true,
      verifiedDate: '2024-03-05'
    },
    onboardingDate: '2024-03-05',
    lastActiveDate: new Date(Date.now() - 30 * 60000).toISOString(),
    categories: ['Cleaning', 'Plumbing', 'Electrical', 'Appliance Repair'],
    tags: ['Verified Professionals', 'Quick Response'],
    description: 'Professional home services with trained technicians',
    minimumOrder: 499,
    deliveryRadius: 15,
    avgDeliveryTime: 90,
    isExclusive: false,
    isFeatured: false,
    verificationStatus: 'verified'
  },
  {
    id: '4',
    vendorId: 'VEN004',
    businessName: 'Fashion Hub',
    legalName: 'Fashion Hub Retail Pvt Ltd',
    type: 'marketplace-seller',
    status: 'active',
    tier: 'gold',
    address: {
      street: '89, Lajpat Nagar',
      area: 'Lajpat Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024',
      lat: 28.5677,
      lng: 77.2431
    },
    contacts: [
      {
        name: 'Neha Kapoor',
        designation: 'Owner',
        phone: '+91 98765 44444',
        email: 'neha@fashionhub.com',
        isPrimary: true
      }
    ],
    operatingHours: [
      { day: 'Monday', open: '10:00', close: '21:00', isClosed: false },
      { day: 'Tuesday', open: '10:00', close: '21:00', isClosed: false },
      { day: 'Wednesday', open: '10:00', close: '21:00', isClosed: false },
      { day: 'Thursday', open: '10:00', close: '21:00', isClosed: false },
      { day: 'Friday', open: '10:00', close: '21:00', isClosed: false },
      { day: 'Saturday', open: '10:00', close: '21:00', isClosed: false },
      { day: 'Sunday', open: '10:00', close: '21:00', isClosed: false }
    ],
    commission: {
      type: 'percentage',
      value: 20,
      minOrder: 0
    },
    performance: {
      totalOrders: 5632,
      completedOrders: 5234,
      cancelledOrders: 267,
      rejectedOrders: 131,
      averageRating: 4.5,
      totalReviews: 4876,
      averagePreparationTime: 48,
      onTimeDeliveryRate: 91.3,
      acceptanceRate: 93.7
    },
    revenue: {
      today: 89700,
      thisWeek: 567800,
      thisMonth: 2345600,
      lastMonth: 2198700,
      totalRevenue: 28976500,
      pendingSettlement: 567800,
      lastSettlementDate: '2025-11-25',
      lastSettlementAmount: 2198700
    },
    compliance: {
      gstNumber: '07AABCF9012R1ZM',
      gstVerified: true,
      panNumber: 'AABCF9012R',
      panVerified: true,
      tradeLicense: {
        type: 'Trade License',
        number: 'TL-DL-2023-007890',
        issueDate: '2023-09-01',
        expiryDate: '2026-08-31',
        status: 'verified'
      }
    },
    bankDetails: {
      accountNumber: '45678901234567',
      ifscCode: 'HDFC0005678',
      accountHolderName: 'Fashion Hub Retail Pvt Ltd',
      bankName: 'HDFC Bank',
      branchName: 'Lajpat Nagar',
      verified: true,
      verifiedDate: '2023-09-05'
    },
    onboardingDate: '2023-09-05',
    lastActiveDate: new Date(Date.now() - 15 * 60000).toISOString(),
    categories: ['Men Fashion', 'Women Fashion', 'Accessories'],
    tags: ['Trending', 'Fast Shipping'],
    description: 'Latest fashion trends for men and women',
    minimumOrder: 399,
    deliveryRadius: 10,
    avgDeliveryTime: 48,
    menuStats: {
      totalItems: 680,
      activeItems: 645,
      outOfStockItems: 35,
      popularItems: ['Denim Jeans', 'Cotton T-Shirts', 'Leather Bags'],
      avgItemPrice: 1250
    },
    isExclusive: false,
    isFeatured: true,
    verificationStatus: 'verified'
  },
  {
    id: '5',
    vendorId: 'VEN005',
    businessName: 'Quick Bites Cafe',
    legalName: 'Quick Bites F&B Services',
    type: 'restaurant',
    status: 'pending-approval',
    tier: 'bronze',
    address: {
      street: '12, Sector 18',
      area: 'Sector 18',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      lat: 28.5677,
      lng: 77.3210
    },
    contacts: [
      {
        name: 'Amit Patel',
        designation: 'Owner',
        phone: '+91 98765 55555',
        email: 'amit@quickbites.com',
        isPrimary: true
      }
    ],
    operatingHours: [
      { day: 'Monday', open: '09:00', close: '22:00', isClosed: false },
      { day: 'Tuesday', open: '09:00', close: '22:00', isClosed: false },
      { day: 'Wednesday', open: '09:00', close: '22:00', isClosed: false },
      { day: 'Thursday', open: '09:00', close: '22:00', isClosed: false },
      { day: 'Friday', open: '09:00', close: '23:00', isClosed: false },
      { day: 'Saturday', open: '09:00', close: '23:00', isClosed: false },
      { day: 'Sunday', open: '09:00', close: '22:00', isClosed: false }
    ],
    commission: {
      type: 'percentage',
      value: 22,
      minOrder: 0
    },
    performance: {
      totalOrders: 234,
      completedOrders: 198,
      cancelledOrders: 28,
      rejectedOrders: 8,
      averageRating: 4.2,
      totalReviews: 156,
      averagePreparationTime: 35,
      onTimeDeliveryRate: 87.5,
      acceptanceRate: 88.9
    },
    revenue: {
      today: 12400,
      thisWeek: 78900,
      thisMonth: 298700,
      lastMonth: 267800,
      totalRevenue: 892300,
      pendingSettlement: 78900,
      lastSettlementDate: '2025-11-25',
      lastSettlementAmount: 267800
    },
    compliance: {
      fssaiLicense: {
        type: 'FSSAI License',
        number: '23456789012345',
        issueDate: '2025-10-01',
        expiryDate: '2030-09-30',
        status: 'pending'
      },
      gstNumber: '09AABCQ1234R1ZM',
      gstVerified: true,
      panNumber: 'AABCQ1234R',
      panVerified: true
    },
    bankDetails: {
      accountNumber: '56789012345678',
      ifscCode: 'SBIN0006789',
      accountHolderName: 'Quick Bites F&B Services',
      bankName: 'State Bank of India',
      branchName: 'Sector 18 Noida',
      verified: false
    },
    onboardingDate: '2025-10-15',
    lastActiveDate: new Date(Date.now() - 60 * 60000).toISOString(),
    categories: ['Fast Food', 'Beverages', 'Snacks'],
    tags: ['New Partner'],
    description: 'Quick service cafe offering fast food and beverages',
    minimumOrder: 149,
    deliveryRadius: 5,
    avgDeliveryTime: 25,
    menuStats: {
      totalItems: 45,
      activeItems: 42,
      outOfStockItems: 3,
      popularItems: ['Burger', 'Pizza', 'Coffee'],
      avgItemPrice: 180
    },
    isExclusive: false,
    isFeatured: false,
    verificationStatus: 'pending'
  }
]

export const mockVendorAnalytics: VendorAnalytics[] = [
  {
    vendorType: 'restaurant',
    totalVendors: 450,
    activeVendors: 389,
    pendingApprovals: 23,
    totalRevenue: 45678900,
    averageOrderValue: 385,
    totalOrders: 125678,
    growthRate: 23.5,
    avgCommissionRate: 19.5,
    topPerformers: ['Spice Garden', 'Delhi Darbar', 'Taste of India']
  },
  {
    vendorType: 'store',
    totalVendors: 280,
    activeVendors: 245,
    pendingApprovals: 12,
    totalRevenue: 78456700,
    averageOrderValue: 1850,
    totalOrders: 42345,
    growthRate: 18.7,
    avgCommissionRate: 13.2,
    topPerformers: ['TechStore', 'MegaMart', 'Super Store']
  },
  {
    vendorType: 'service-provider',
    totalVendors: 120,
    activeVendors: 98,
    pendingApprovals: 8,
    totalRevenue: 15678900,
    averageOrderValue: 650,
    totalOrders: 24123,
    growthRate: 31.2,
    avgCommissionRate: 16.5,
    topPerformers: ['HomeCare', 'FixIt Services', 'Urban Company']
  },
  {
    vendorType: 'marketplace-seller',
    totalVendors: 680,
    activeVendors: 598,
    pendingApprovals: 34,
    totalRevenue: 28976500,
    averageOrderValue: 980,
    totalOrders: 29568,
    growthRate: 27.8,
    avgCommissionRate: 21.3,
    topPerformers: ['Fashion Hub', 'Style Store', 'Trend Mart']
  }
]

export const mockModuleVendors = {
  food: {
    module: 'Food Delivery',
    totalVendors: 450,
    activeVendors: 389,
    revenue: 45678900,
    totalOrders: 125678,
    avgRating: 4.6,
    growthRate: 23.5,
    topVendors: [
      { name: 'Spice Garden Restaurant', orders: 8945, revenue: 3456700, rating: 4.6 },
      { name: 'Delhi Darbar', orders: 7823, revenue: 2987600, rating: 4.8 },
      { name: 'Taste of India', orders: 6543, revenue: 2567800, rating: 4.5 }
    ]
  },
  shopping: {
    module: 'Shopping & E-Commerce',
    totalVendors: 680,
    activeVendors: 598,
    revenue: 78456700,
    totalOrders: 42345,
    avgRating: 4.4,
    growthRate: 18.7,
    topVendors: [
      { name: 'TechStore Electronics', orders: 3421, revenue: 6234500, rating: 4.4 },
      { name: 'Fashion Hub', orders: 5632, revenue: 2345600, rating: 4.5 },
      { name: 'MegaMart', orders: 4567, revenue: 5678900, rating: 4.3 }
    ]
  },
  travel: {
    module: 'Travel Booking',
    totalVendors: 280,
    activeVendors: 245,
    revenue: 34567800,
    totalOrders: 18934,
    avgRating: 4.5,
    growthRate: 21.3,
    topVendors: [
      { name: 'SkyHigh Airlines', orders: 3456, revenue: 12345600, rating: 4.6 },
      { name: 'FastTrack Bus', orders: 2987, revenue: 4567800, rating: 4.4 },
      { name: 'Metro Railways', orders: 4123, revenue: 6789200, rating: 4.5 }
    ]
  },
  events: {
    module: 'Tickets & Events',
    totalVendors: 185,
    activeVendors: 156,
    revenue: 23456700,
    totalOrders: 15678,
    avgRating: 4.7,
    growthRate: 28.9,
    topVendors: [
      { name: 'PVR Cinemas', orders: 4567, revenue: 8976500, rating: 4.8 },
      { name: 'BookMyShow Events', orders: 3421, revenue: 6543200, rating: 4.7 },
      { name: 'Live Nation India', orders: 2345, revenue: 5678900, rating: 4.6 }
    ]
  }
}

export const mockSettlements: Settlement[] = [
  {
    id: '1',
    settlementId: 'SET-2025-001',
    vendorId: 'VEN001',
    vendorName: 'Spice Garden Restaurant',
    period: 'Nov 18 - Nov 24, 2025',
    totalOrders: 456,
    grossRevenue: 3234500,
    commission: 582210,
    deductions: 12500,
    netAmount: 2639790,
    status: 'completed',
    initiatedDate: '2025-11-25T10:00:00',
    completedDate: '2025-11-25T14:30:00',
    utrNumber: 'UTR2025112501234',
    remarks: 'Settlement completed successfully'
  },
  {
    id: '2',
    settlementId: 'SET-2025-002',
    vendorId: 'VEN002',
    vendorName: 'TechStore Electronics',
    period: 'Nov 18 - Nov 24, 2025',
    totalOrders: 198,
    grossRevenue: 5892300,
    commission: 707076,
    deductions: 8900,
    netAmount: 5176324,
    status: 'processing',
    initiatedDate: '2025-11-25T11:00:00',
    remarks: 'Processing payment'
  },
  {
    id: '3',
    settlementId: 'SET-2025-003',
    vendorId: 'VEN003',
    vendorName: 'HomeCare Services',
    period: 'Nov 18 - Nov 24, 2025',
    totalOrders: 87,
    grossRevenue: 1156700,
    commission: 173505,
    deductions: 3200,
    netAmount: 979995,
    status: 'pending',
    initiatedDate: '2025-12-02T09:00:00',
    remarks: 'Pending bank verification'
  }
]

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    complaintId: 'CMP-001',
    vendorId: 'VEN001',
    vendorName: 'Spice Garden Restaurant',
    customerId: 'CUS123',
    customerName: 'Arjun Mehta',
    orderId: 'ORD12345',
    type: 'quality',
    description: 'Food was cold and not fresh',
    status: 'resolved',
    priority: 'high',
    reportedDate: '2025-12-01T18:30:00',
    resolvedDate: '2025-12-01T20:15:00',
    resolution: 'Full refund processed. Kitchen staff reminded about food quality standards.'
  },
  {
    id: '2',
    complaintId: 'CMP-002',
    vendorId: 'VEN002',
    vendorName: 'TechStore Electronics',
    customerId: 'CUS456',
    customerName: 'Priya Sharma',
    orderId: 'ORD12346',
    type: 'delivery',
    description: 'Product delivered was damaged',
    status: 'in-progress',
    priority: 'critical',
    reportedDate: '2025-12-02T10:00:00',
    resolution: 'Replacement being arranged'
  },
  {
    id: '3',
    complaintId: 'CMP-003',
    vendorId: 'VEN004',
    vendorName: 'Fashion Hub',
    customerId: 'CUS789',
    customerName: 'Rahul Kumar',
    orderId: 'ORD12347',
    type: 'billing',
    description: 'Overcharged for the order',
    status: 'open',
    priority: 'medium',
    reportedDate: '2025-12-02T11:30:00'
  }
]

export const mockOnboarding: Onboarding[] = [
  {
    id: '1',
    applicationId: 'APP-2025-001',
    businessName: 'Fresh Bakery',
    type: 'restaurant',
    contactName: 'Suresh Kumar',
    contactPhone: '+91 98765 66666',
    contactEmail: 'suresh@freshbakery.com',
    address: 'Sector 15, Noida',
    city: 'Noida',
    status: 'under-review',
    submittedDate: '2025-11-28T14:00:00',
    documents: [
      { name: 'FSSAI License', uploaded: true, verified: true },
      { name: 'GST Certificate', uploaded: true, verified: true },
      { name: 'PAN Card', uploaded: true, verified: false },
      { name: 'Trade License', uploaded: true, verified: false },
      { name: 'Bank Statement', uploaded: false, verified: false }
    ]
  },
  {
    id: '2',
    applicationId: 'APP-2025-002',
    businessName: 'AutoFix Services',
    type: 'service-provider',
    contactName: 'Karan Malhotra',
    contactPhone: '+91 98765 77777',
    contactEmail: 'karan@autofix.com',
    address: 'Mayur Vihar, Delhi',
    city: 'Delhi',
    status: 'documents-pending',
    submittedDate: '2025-11-30T09:00:00',
    documents: [
      { name: 'GST Certificate', uploaded: true, verified: false },
      { name: 'PAN Card', uploaded: true, verified: false },
      { name: 'Trade License', uploaded: false, verified: false },
      { name: 'Bank Statement', uploaded: false, verified: false }
    ]
  },
  {
    id: '3',
    applicationId: 'APP-2025-003',
    businessName: 'GreenMart Organic',
    type: 'store',
    contactName: 'Meera Reddy',
    contactPhone: '+91 98765 88888',
    contactEmail: 'meera@greenmart.com',
    address: 'Vasant Kunj, Delhi',
    city: 'Delhi',
    status: 'new',
    submittedDate: '2025-12-01T16:00:00',
    documents: [
      { name: 'GST Certificate', uploaded: false, verified: false },
      { name: 'PAN Card', uploaded: false, verified: false },
      { name: 'Trade License', uploaded: false, verified: false },
      { name: 'Bank Statement', uploaded: false, verified: false }
    ]
  }
]
