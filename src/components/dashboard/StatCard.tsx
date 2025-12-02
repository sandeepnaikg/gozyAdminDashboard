import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency, formatNumber, cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  change: number
  icon: React.ReactNode
  trend?: 'up' | 'down'
  prefix?: string
  delay?: number
}

export const StatCard = ({ title, value, change, icon, trend = 'up', prefix, delay = 0 }: StatCardProps) => {
  const isPositive = change > 0
  const formattedValue = typeof value === 'number' ? formatNumber(value) : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="overflow-hidden relative group hover:shadow-glow transition-all">
        <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            {prefix && <span className="text-2xl font-bold text-muted-foreground">{prefix}</span>}
            <span className="text-3xl font-bold">{formattedValue}</span>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            {isPositive ? (
              <TrendingUp className="text-green-500" size={16} />
            ) : (
              <TrendingDown className="text-red-500" size={16} />
            )}
            <span className={cn(
              'text-sm font-medium',
              isPositive ? 'text-green-500' : 'text-red-500'
            )}>
              {isPositive ? '+' : ''}{change}%
            </span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
