export interface Restaurant {
  id: string
  name: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    coordinates: { lat: number; lng: number }
  }
  cuisine: string[]
  rating: number
  totalOrders: number
  totalRevenue: number
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  onboardedDate: Date
  commission: number
  deliveryZones: string[]
  healthScore: number
  avgPrepTime: number
  owner: {
    name: string
    email: string
    phone: string
  }
}

export interface MenuItem {
  id: string
  restaurantId: string
  name: string
  description: string
  category: string
  price: number
  images: string[]
  isAvailable: boolean
  preparationTime: number
  isVeg: boolean
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'extra-hot'
  nutritionInfo?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

export interface FoodOrder {
  id: string
  orderId: string
  customerId: string
  customerName: string
  restaurantId: string
  restaurantName: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  tax: number
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked-up' | 'delivered' | 'cancelled'
  orderTime: Date
  estimatedDelivery?: Date
  actualDelivery?: Date
  deliveryAddress: string
  riderId?: string
  riderName?: string
  paymentMethod: string
  paymentStatus: 'pending' | 'completed' | 'failed'
  timeline: OrderTimeline[]
}

export interface OrderItem {
  menuItemId: string
  name: string
  quantity: number
  price: number
  customizations?: string[]
}

export interface OrderTimeline {
  status: string
  timestamp: Date
  note?: string
}

export interface DeliveryZone {
  id: string
  name: string
  coordinates: { lat: number; lng: number }[]
  surgeMultiplier: number
  isActive: boolean
  restaurants: string[]
}

export interface KitchenLoad {
  restaurantId: string
  restaurantName: string
  currentOrders: number
  avgPrepTime: number
  predictedLoad: number
  status: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
}

export interface Complaint {
  id: string
  orderId: string
  customerId: string
  customerName: string
  restaurantId: string
  type: 'food-quality' | 'delivery-delay' | 'missing-item' | 'wrong-order' | 'other'
  description: string
  status: 'open' | 'investigating' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  createdAt: Date
  resolvedAt?: Date
  refundAmount?: number
}

export interface OfferSchedule {
  id: string
  name: string
  description: string
  discountType: 'percentage' | 'flat'
  discountValue: number
  minOrderValue?: number
  maxDiscount?: number
  startDate: Date
  endDate: Date
  applicableOn: 'all' | 'specific-restaurants' | 'specific-cuisines'
  targetRestaurants?: string[]
  targetCuisines?: string[]
  isActive: boolean
  theme: 'festival' | 'weekend' | 'flash-sale' | 'regular'
}
