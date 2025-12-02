export interface User {
  id: string
  name: string
  email: string
  phone: string
  signupDate: Date
  lastLogin: Date | null
  status: 'active' | 'blocked' | 'pending'
  kycStatus: 'pending' | 'verified' | 'rejected'
  riskScore: number
  totalOrders: number
  totalSpent: number
  avatar?: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  devices?: Device[]
  tags?: string[]
}

export interface Device {
  id: string
  deviceType: string
  appVersion: string
  lastIP: string
  lastSeen: Date
}

export interface KYCDocument {
  id: string
  userId: string
  type: 'aadhaar' | 'pan' | 'driving_license' | 'passport'
  documentNumber: string
  status: 'pending' | 'verified' | 'rejected'
  fileUrl: string
  uploadedAt: Date
  verifiedAt?: Date
  rejectionReason?: string
}

export interface UserActivity {
  id: string
  userId: string
  action: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface RiskMetric {
  userId: string
  score: number
  factors: {
    refundRate: number
    cancelRate: number
    deviceChanges: number
    suspiciousActivity: boolean
  }
  lastUpdated: Date
}
