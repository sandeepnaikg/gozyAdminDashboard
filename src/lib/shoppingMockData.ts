import { ShoppingOrder, Product, Seller, Category, Inventory, ShoppingAnalytics } from '@/types/shopping'

export const mockShoppingOrders: ShoppingOrder[] = [
  {
    id: 'so1',
    orderId: 'SHOP-20241202-001',
    customerId: 'c1',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@example.com',
    customerPhone: '+91 98765-43210',
    orderDate: new Date('2024-12-02T10:30:00'),
    deliveryDate: new Date('2024-12-05T18:00:00'),
    status: 'delivered',
    items: [
      {
        productId: 'p1',
        productName: 'Apple iPhone 15 Pro',
        category: 'Electronics',
        quantity: 1,
        price: 134900,
        discount: 5000,
        image: '/products/iphone15pro.jpg',
        variant: { color: 'Titanium Blue', size: '256GB' }
      },
      {
        productId: 'p2',
        productName: 'AirPods Pro (2nd Gen)',
        category: 'Electronics',
        quantity: 1,
        price: 24900,
        discount: 1000,
        image: '/products/airpods.jpg'
      }
    ],
    subtotal: 159800,
    discount: 6000,
    shippingFee: 0,
    tax: 15380,
    totalAmount: 169180,
    paymentMethod: 'Credit Card',
    paymentStatus: 'completed',
    shippingAddress: {
      street: '123 MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      country: 'India'
    },
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'so2',
    orderId: 'SHOP-20241202-002',
    customerId: 'c2',
    customerName: 'Rahul Verma',
    customerEmail: 'rahul.v@example.com',
    customerPhone: '+91 98765-43211',
    orderDate: new Date('2024-12-02T09:15:00'),
    status: 'shipped',
    items: [
      {
        productId: 'p3',
        productName: 'Nike Air Max 270',
        category: 'Fashion',
        quantity: 1,
        price: 12995,
        discount: 2000,
        image: '/products/nike.jpg',
        variant: { size: 'UK 9', color: 'Black' }
      }
    ],
    subtotal: 12995,
    discount: 2000,
    shippingFee: 100,
    tax: 1100,
    totalAmount: 12195,
    paymentMethod: 'UPI',
    paymentStatus: 'completed',
    shippingAddress: {
      street: '456 Park Street',
      city: 'Bangalore',
      state: 'Karnataka',
      zip: '560001',
      country: 'India'
    },
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'so3',
    orderId: 'SHOP-20241202-003',
    customerId: 'c3',
    customerName: 'Anjali Patel',
    customerEmail: 'anjali.p@example.com',
    customerPhone: '+91 98765-43212',
    orderDate: new Date('2024-12-02T08:00:00'),
    status: 'processing',
    items: [
      {
        productId: 'p4',
        productName: 'Samsung 55" 4K Smart TV',
        category: 'Electronics',
        quantity: 1,
        price: 52900,
        discount: 5000,
        image: '/products/samsung-tv.jpg'
      },
      {
        productId: 'p5',
        productName: 'Fire TV Stick 4K',
        category: 'Electronics',
        quantity: 2,
        price: 5999,
        discount: 500,
        image: '/products/firestick.jpg'
      }
    ],
    subtotal: 64898,
    discount: 6000,
    shippingFee: 500,
    tax: 5940,
    totalAmount: 65338,
    paymentMethod: 'EMI',
    paymentStatus: 'completed',
    shippingAddress: {
      street: '789 Link Road',
      city: 'Delhi',
      state: 'Delhi',
      zip: '110001',
      country: 'India'
    }
  },
  {
    id: 'so4',
    orderId: 'SHOP-20241202-004',
    customerId: 'c4',
    customerName: 'Vikram Singh',
    customerEmail: 'vikram.s@example.com',
    customerPhone: '+91 98765-43213',
    orderDate: new Date('2024-12-01T16:30:00'),
    status: 'cancelled',
    items: [
      {
        productId: 'p6',
        productName: 'Boat Rockerz 450',
        category: 'Electronics',
        quantity: 1,
        price: 1999,
        discount: 300,
        image: '/products/boat.jpg',
        variant: { color: 'Blue' }
      }
    ],
    subtotal: 1999,
    discount: 300,
    shippingFee: 50,
    tax: 175,
    totalAmount: 1924,
    paymentMethod: 'COD',
    paymentStatus: 'refunded',
    shippingAddress: {
      street: '321 Station Road',
      city: 'Pune',
      state: 'Maharashtra',
      zip: '411001',
      country: 'India'
    },
    refundAmount: 1924,
    returnReason: 'Changed mind'
  },
  {
    id: 'so5',
    orderId: 'SHOP-20241202-005',
    customerId: 'c5',
    customerName: 'Neha Kapoor',
    customerEmail: 'neha.k@example.com',
    customerPhone: '+91 98765-43214',
    orderDate: new Date('2024-12-02T11:00:00'),
    status: 'confirmed',
    items: [
      {
        productId: 'p7',
        productName: 'Fossil Gen 6 Smartwatch',
        category: 'Fashion',
        quantity: 1,
        price: 21995,
        discount: 2000,
        image: '/products/fossil.jpg',
        variant: { color: 'Rose Gold' }
      },
      {
        productId: 'p8',
        productName: 'Fossil Leather Strap',
        category: 'Fashion',
        quantity: 1,
        price: 2995,
        discount: 0,
        image: '/products/strap.jpg',
        variant: { color: 'Brown' }
      }
    ],
    subtotal: 24990,
    discount: 2000,
    shippingFee: 100,
    tax: 2309,
    totalAmount: 25399,
    paymentMethod: 'Wallet',
    paymentStatus: 'completed',
    shippingAddress: {
      street: '654 Beach Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zip: '600001',
      country: 'India'
    }
  }
]

export const mockCategories: Category[] = [
  {
    id: 'cat1',
    name: 'Electronics',
    icon: 'Smartphone',
    productCount: 1250,
    revenue: 45000000,
    isActive: true
  },
  {
    id: 'cat2',
    name: 'Fashion',
    icon: 'Shirt',
    productCount: 3200,
    revenue: 28000000,
    isActive: true
  },
  {
    id: 'cat3',
    name: 'Home & Kitchen',
    icon: 'Home',
    productCount: 1800,
    revenue: 15000000,
    isActive: true
  },
  {
    id: 'cat4',
    name: 'Books',
    icon: 'BookOpen',
    productCount: 4500,
    revenue: 8000000,
    isActive: true
  },
  {
    id: 'cat5',
    name: 'Beauty',
    icon: 'Sparkles',
    productCount: 980,
    revenue: 12000000,
    isActive: true
  },
  {
    id: 'cat6',
    name: 'Sports',
    icon: 'Dumbbell',
    productCount: 750,
    revenue: 9000000,
    isActive: true
  }
]

export const mockSellers: Seller[] = [
  {
    id: 's1',
    name: 'Rajesh Kumar',
    email: 'rajesh@techstore.com',
    phone: '+91 98765-11111',
    businessName: 'TechStore India',
    gstNumber: 'GST123456789',
    totalProducts: 250,
    totalOrders: 1500,
    totalRevenue: 15000000,
    rating: 4.5,
    status: 'active',
    verificationStatus: 'verified',
    commission: 12,
    joinedDate: new Date('2024-01-15')
  },
  {
    id: 's2',
    name: 'Priya Fashion',
    email: 'contact@priyafashion.com',
    phone: '+91 98765-22222',
    businessName: 'Priya Fashion Hub',
    gstNumber: 'GST987654321',
    totalProducts: 680,
    totalOrders: 2800,
    totalRevenue: 22000000,
    rating: 4.7,
    status: 'active',
    verificationStatus: 'verified',
    commission: 10,
    joinedDate: new Date('2024-02-20')
  },
  {
    id: 's3',
    name: 'HomeEssentials',
    email: 'info@homeessentials.com',
    phone: '+91 98765-33333',
    businessName: 'Home Essentials',
    totalProducts: 420,
    totalOrders: 980,
    totalRevenue: 8500000,
    rating: 4.3,
    status: 'active',
    verificationStatus: 'verified',
    commission: 8,
    joinedDate: new Date('2024-03-10')
  }
]

export const mockInventory: Inventory[] = [
  {
    productId: 'p1',
    productName: 'Apple iPhone 15 Pro',
    category: 'Electronics',
    currentStock: 45,
    minStock: 10,
    maxStock: 100,
    reorderLevel: 20,
    status: 'in-stock',
    lastRestocked: new Date('2024-11-25')
  },
  {
    productId: 'p3',
    productName: 'Nike Air Max 270',
    category: 'Fashion',
    currentStock: 8,
    minStock: 10,
    maxStock: 50,
    reorderLevel: 15,
    status: 'low-stock',
    lastRestocked: new Date('2024-11-20')
  },
  {
    productId: 'p4',
    productName: 'Samsung 55" 4K Smart TV',
    category: 'Electronics',
    currentStock: 0,
    minStock: 5,
    maxStock: 25,
    reorderLevel: 8,
    status: 'out-of-stock',
    lastRestocked: new Date('2024-11-10')
  },
  {
    productId: 'p7',
    productName: 'Fossil Gen 6 Smartwatch',
    category: 'Fashion',
    currentStock: 35,
    minStock: 10,
    maxStock: 60,
    reorderLevel: 15,
    status: 'in-stock',
    lastRestocked: new Date('2024-11-28')
  }
]

export const mockShoppingAnalytics: ShoppingAnalytics[] = [
  {
    category: 'Electronics',
    orders: 3250,
    revenue: 45000000,
    averageOrderValue: 13846,
    topProduct: 'iPhone 15 Pro',
    growthRate: 18.5
  },
  {
    category: 'Fashion',
    orders: 5680,
    revenue: 28000000,
    averageOrderValue: 4930,
    topProduct: 'Nike Air Max 270',
    growthRate: 22.3
  },
  {
    category: 'Home & Kitchen',
    orders: 2100,
    revenue: 15000000,
    averageOrderValue: 7143,
    topProduct: 'Mixer Grinder',
    growthRate: 12.8
  },
  {
    category: 'Beauty',
    orders: 3890,
    revenue: 12000000,
    averageOrderValue: 3084,
    topProduct: 'Lakme Lipstick',
    growthRate: 15.6
  }
]
