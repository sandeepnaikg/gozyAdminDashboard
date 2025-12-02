import { Restaurant, MenuItem, FoodOrder, DeliveryZone, KitchenLoad, Complaint, OfferSchedule } from '@/types/food'

export const mockRestaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'Pizza Palace',
    email: 'contact@pizzapalace.com',
    phone: '+1 234-567-8900',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    cuisine: ['Italian', 'Pizza', 'Pasta'],
    rating: 4.5,
    totalOrders: 2450,
    totalRevenue: 9500000,
    status: 'active',
    onboardedDate: new Date('2024-01-15'),
    commission: 15,
    deliveryZones: ['zone1', 'zone2'],
    healthScore: 95,
    avgPrepTime: 25,
    owner: {
      name: 'John Smith',
      email: 'john@pizzapalace.com',
      phone: '+1 234-567-8901'
    }
  },
  {
    id: 'r2',
    name: 'Burger Bliss',
    email: 'info@burgerbliss.com',
    phone: '+1 234-567-8902',
    address: {
      street: '456 Oak Avenue',
      city: 'New York',
      state: 'NY',
      zip: '10002',
      coordinates: { lat: 40.7614, lng: -73.9776 }
    },
    cuisine: ['American', 'Burgers', 'Fast Food'],
    rating: 4.2,
    totalOrders: 3100,
    totalRevenue: 7500000,
    status: 'active',
    onboardedDate: new Date('2024-02-20'),
    commission: 12,
    deliveryZones: ['zone1'],
    healthScore: 88,
    avgPrepTime: 20,
    owner: {
      name: 'Sarah Johnson',
      email: 'sarah@burgerbliss.com',
      phone: '+1 234-567-8903'
    }
  },
  {
    id: 'r3',
    name: 'Sushi Symphony',
    email: 'orders@sushisymphony.com',
    phone: '+1 234-567-8904',
    address: {
      street: '789 Elm Street',
      city: 'New York',
      state: 'NY',
      zip: '10003',
      coordinates: { lat: 40.7489, lng: -73.9680 }
    },
    cuisine: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.8,
    totalOrders: 1850,
    totalRevenue: 11000000,
    status: 'active',
    onboardedDate: new Date('2024-03-10'),
    commission: 18,
    deliveryZones: ['zone2', 'zone3'],
    healthScore: 98,
    avgPrepTime: 30,
    owner: {
      name: 'Kenji Tanaka',
      email: 'kenji@sushisymphony.com',
      phone: '+1 234-567-8905'
    }
  }
]

export const mockMenuItems: MenuItem[] = [
  {
    id: 'm1',
    restaurantId: 'r1',
    name: 'Margherita Pizza',
    description: 'Classic tomato sauce, mozzarella, and fresh basil',
    category: 'Pizza',
    price: 299,
    images: ['/menu/margherita.jpg'],
    isAvailable: true,
    preparationTime: 20,
    isVeg: true,
    spiceLevel: 'mild',
    nutritionInfo: {
      calories: 850,
      protein: 35,
      carbs: 120,
      fat: 25
    }
  },
  {
    id: 'm2',
    restaurantId: 'r2',
    name: 'Classic Cheeseburger',
    description: 'Angus beef patty, cheddar, lettuce, tomato, onion',
    category: 'Burgers',
    price: 249,
    images: ['/menu/cheeseburger.jpg'],
    isAvailable: true,
    preparationTime: 15,
    isVeg: false,
    nutritionInfo: {
      calories: 680,
      protein: 32,
      carbs: 45,
      fat: 38
    }
  }
]

export const mockFoodOrders: FoodOrder[] = [
  {
    id: 'fo1',
    orderId: 'ORD-20241202-001',
    customerId: 'c1',
    customerName: 'Alice Williams',
    restaurantId: 'r1',
    restaurantName: 'Pizza Palace',
    items: [
      {
        menuItemId: 'm1',
        name: 'Margherita Pizza',
        quantity: 2,
        price: 299,
        customizations: ['Extra cheese']
      }
    ],
    subtotal: 598,
    deliveryFee: 50,
    tax: 65,
    total: 713,
    status: 'preparing',
    orderTime: new Date('2024-12-02T18:30:00'),
    estimatedDelivery: new Date('2024-12-02T19:15:00'),
    deliveryAddress: '123 Park Ave, New York, NY 10001',
    paymentMethod: 'Credit Card',
    paymentStatus: 'completed',
    timeline: [
      { status: 'pending', timestamp: new Date('2024-12-02T18:30:00') },
      { status: 'confirmed', timestamp: new Date('2024-12-02T18:32:00') },
      { status: 'preparing', timestamp: new Date('2024-12-02T18:35:00') }
    ]
  },
  {
    id: 'fo2',
    orderId: 'ORD-20241202-002',
    customerId: 'c2',
    customerName: 'Bob Johnson',
    restaurantId: 'r2',
    restaurantName: 'Burger Bliss',
    items: [
      {
        menuItemId: 'm2',
        name: 'Classic Cheeseburger',
        quantity: 1,
        price: 249
      }
    ],
    subtotal: 249,
    deliveryFee: 40,
    tax: 29,
    total: 318,
    status: 'delivered',
    orderTime: new Date('2024-12-02T17:00:00'),
    estimatedDelivery: new Date('2024-12-02T17:45:00'),
    actualDelivery: new Date('2024-12-02T17:42:00'),
    deliveryAddress: '456 Broadway, New York, NY 10002',
    riderId: 'rider1',
    riderName: 'Mike Chen',
    paymentMethod: 'Cash',
    paymentStatus: 'completed',
    timeline: [
      { status: 'pending', timestamp: new Date('2024-12-02T17:00:00') },
      { status: 'confirmed', timestamp: new Date('2024-12-02T17:02:00') },
      { status: 'preparing', timestamp: new Date('2024-12-02T17:05:00') },
      { status: 'ready', timestamp: new Date('2024-12-02T17:20:00') },
      { status: 'picked-up', timestamp: new Date('2024-12-02T17:25:00') },
      { status: 'delivered', timestamp: new Date('2024-12-02T17:42:00') }
    ]
  }
]

export const mockKitchenLoad: KitchenLoad[] = [
  {
    restaurantId: 'r1',
    restaurantName: 'Pizza Palace',
    currentOrders: 8,
    avgPrepTime: 25,
    predictedLoad: 12,
    status: 'medium',
    timestamp: new Date()
  },
  {
    restaurantId: 'r2',
    restaurantName: 'Burger Bliss',
    currentOrders: 15,
    avgPrepTime: 20,
    predictedLoad: 18,
    status: 'high',
    timestamp: new Date()
  },
  {
    restaurantId: 'r3',
    restaurantName: 'Sushi Symphony',
    currentOrders: 3,
    avgPrepTime: 30,
    predictedLoad: 5,
    status: 'low',
    timestamp: new Date()
  }
]

export const mockComplaints: Complaint[] = [
  {
    id: 'cmp1',
    orderId: 'ORD-20241201-045',
    customerId: 'c3',
    customerName: 'Charlie Brown',
    restaurantId: 'r1',
    type: 'food-quality',
    description: 'Pizza was cold when delivered',
    status: 'investigating',
    priority: 'medium',
    createdAt: new Date('2024-12-01T20:30:00')
  }
]
