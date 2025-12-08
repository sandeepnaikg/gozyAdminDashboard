import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { formatDateTime } from '@/lib/utils'
import { Package, CheckCircle, Clock, XCircle } from 'lucide-react'

interface Order {
  id: string
  customerName: string
  serviceType: string
  itemName?: string
  amount: number
  status: string
  timestamp: string
  providerName?: string
}

interface LiveOrdersFeedProps {
  orders?: Order[]
  loading?: boolean
}

const statusConfig: Record<string, { icon: any, color: string, bg: string }> = {
  pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  confirmed: { icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  completed: { icon: Package, color: 'text-green-500', bg: 'bg-green-500/10' },
  delivered: { icon: Package, color: 'text-green-500', bg: 'bg-green-500/10' },
  cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
}

const getStatusConfig = (status: string) => {
  return statusConfig[status.toLowerCase()] || statusConfig.pending;
}

const moduleColors: Record<string, string> = {
  food: 'bg-orange-500/20 text-orange-500',
  flight: 'bg-blue-500/20 text-blue-500',
  hotel: 'bg-cyan-500/20 text-cyan-500',
  train: 'bg-indigo-500/20 text-indigo-500',
  travel: 'bg-blue-500/20 text-blue-500',
  delivery: 'bg-purple-500/20 text-purple-500',
  shopping: 'bg-purple-500/20 text-purple-500',
  movie: 'bg-pink-500/20 text-pink-500',
  metro: 'bg-pink-500/20 text-pink-500',
  tickets: 'bg-pink-500/20 text-pink-500',
}

const getModuleColor = (serviceType: string) => {
  return moduleColors[serviceType.toLowerCase()] || 'bg-gray-500/20 text-gray-500';
}

const formatCurrency = (amount: number | null | undefined): string => {
  if (amount == null || isNaN(amount)) return '₹0';
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export const LiveOrdersFeed = ({ orders = [], loading = false }: LiveOrdersFeedProps) => {
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
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-lg glass border border-white/10 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Package size={48} className="mx-auto mb-2 opacity-50" />
            <p>No recent orders</p>
            <p className="text-sm mt-1">Orders will appear here as they come in</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order, index) => {
              const config = getStatusConfig(order.status);
              const StatusIcon = config.icon;
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
                        <span className="font-semibold text-sm">{order.id.slice(0, 13)}...</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getModuleColor(order.serviceType)}`}>
                          {order.serviceType}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.customerName || 'Unknown Customer'}
                      </p>
                      {order.providerName && (
                        <p className="text-xs text-muted-foreground">
                          Provider: {order.providerName}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDateTime(new Date(order.timestamp))}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg ${config.bg} mb-2`}>
                        <StatusIcon size={14} className={config.color} />
                        <span className={`text-xs ${config.color} capitalize`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-lg font-bold">{formatCurrency(order.amount)}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
