export interface ShoppingOrder {
  id: string
  orderId: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  orderDate: Date
  deliveryDate?: Date
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
  items: OrderItem[]
  subtotal: number
  discount: number
  shippingFee: number
  tax: number
  totalAmount: number
  paymentMethod: string
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  shippingAddress: Address
  trackingNumber?: string
  returnReason?: string
  refundAmount?: number
}

export interface OrderItem {
  productId: string
  productName: string
  category: string
  quantity: number
  price: number
  discount: number
  image: string
  variant?: {
    size?: string
    color?: string
  }
}

export interface Address {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface Product {
  id: string
  name: string
  description: string
  category: string
  subCategory: string
  brand: string
  price: number
  originalPrice?: number
  discount: number
  rating: number
  reviewCount: number
  inStock: boolean
  stockQuantity: number
  images: string[]
  variants: ProductVariant[]
  tags: string[]
  seller: string
  isActive: boolean
  createdAt: Date
}

export interface ProductVariant {
  size?: string
  color?: string
  price?: number
  stock: number
}

export interface Seller {
  id: string
  name: string
  email: string
  phone: string
  businessName: string
  gstNumber?: string
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  rating: number
  status: 'active' | 'inactive' | 'suspended'
  verificationStatus: 'pending' | 'verified' | 'rejected'
  commission: number
  joinedDate: Date
}

export interface Category {
  id: string
  name: string
  icon: string
  productCount: number
  revenue: number
  isActive: boolean
}

export interface Inventory {
  productId: string
  productName: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  reorderLevel: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  lastRestocked?: Date
}

export interface ShoppingAnalytics {
  category: string
  orders: number
  revenue: number
  averageOrderValue: number
  topProduct: string
  growthRate: number
}
