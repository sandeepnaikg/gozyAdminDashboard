import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { formatDateTime } from '@/lib/utils'
import { Package, CheckCircle, Clock, XCircle } from 'lucide-react'

interface Order {
  id: string
  customerName: string
  module: 'food' | 'travel' | 'shopping' | 'tickets'
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
  amount: number
  timestamp: Date
}

const mockOrders: Order[] = [
  {
    id: '#ORD-12345',
    customerName: 'John Doe',
    module: 'food',
    status: 'confirmed',
    amount: 45.99,
    timestamp: new Date(),
  },
  {
    id: '#ORD-12346',
    customerName: 'Jane Smith',
    module: 'travel',
    status: 'pending',
    amount: 299.00,
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: '#ORD-12347',
    customerName: 'Bob Johnson',
    module: 'shopping',
    status: 'delivered',
    amount: 129.99,
    timestamp: new Date(Date.now() - 300000),
  },
]

const statusConfig = {
  pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  confirmed: { icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  delivered: { icon: Package, color: 'text-green-500', bg: 'bg-green-500/10' },
  cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
}

const moduleColors = {
  food: 'bg-orange-500/20 text-orange-500',
  travel: 'bg-blue-500/20 text-blue-500',
  shopping: 'bg-purple-500/20 text-purple-500',
  tickets: 'bg-pink-500/20 text-pink-500',
}

export const LiveOrdersFeed = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Live Orders Feed</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockOrders.map((order, index) => {
            const StatusIcon = statusConfig[order.status].icon
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg glass border border-white/10 hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold">{order.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${moduleColors[order.module]}`}>
                        {order.module}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDateTime(order.timestamp)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg ${statusConfig[order.status].bg} mb-2`}>
                      <StatusIcon size={14} className={statusConfig[order.status].color} />
                      <span className={`text-xs ${statusConfig[order.status].color}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-lg font-bold">${order.amount.toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
