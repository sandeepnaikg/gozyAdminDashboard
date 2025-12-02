import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  Download,
  FileText,
  PieChart,
  BarChart3,
  AlertCircle,
  Eye,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { formatCurrency, formatIndianCurrency } from '@/lib/utils'

export default function FinancePage() {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [selectedStat, setSelectedStat] = useState<any>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll('.stat-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        }
      )
    }
  }, [])

  const financials = {
    totalRevenue: 185600000,
    monthlyRevenue: 28450000,
    pendingPayouts: 4567800,
    completedPayouts: 15678900,
    commission: 5678900,
    taxCollected: 3456700
  }

  const transactions = [
    { id: 'TXN001', type: 'Food', amount: 45670, status: 'completed', vendor: 'Spice Garden', date: '2024-03-15' },
    { id: 'TXN002', type: 'Shopping', amount: 234500, status: 'pending', vendor: 'TechStore', date: '2024-03-15' },
    { id: 'TXN003', type: 'Travel', amount: 12340, status: 'completed', vendor: 'SkyHigh Airlines', date: '2024-03-14' },
    { id: 'TXN004', type: 'Events', amount: 8900, status: 'completed', vendor: 'PVR Cinemas', date: '2024-03-14' },
    { id: 'TXN005', type: 'Food', amount: 67800, status: 'failed', vendor: 'Delhi Darbar', date: '2024-03-13' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Finance & Revenue</h1>
          <p className="text-muted-foreground mt-1">Financial reports, settlements, and tax management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText size={18} className="mr-2" />
            Generate Report
          </Button>
          <Button>
            <Download size={18} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Total Revenue', value: formatIndianCurrency(financials.totalRevenue), growth: '+24.5%', period: 'This Quarter' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <DollarSign size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">{formatIndianCurrency(financials.totalRevenue)}</p>
          <p className="text-xs text-green-500 mt-1 flex items-center">
            <TrendingUp size={14} className="mr-1" />
            +24.5% this quarter
          </p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Monthly Revenue', value: formatIndianCurrency(financials.monthlyRevenue), period: 'March 2024' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
            <BarChart3 size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{formatIndianCurrency(financials.monthlyRevenue)}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Pending Payouts', value: formatIndianCurrency(financials.pendingPayouts), vendors: 45, status: 'Processing' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Pending Payouts</p>
            <Wallet size={20} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-orange-500">{formatIndianCurrency(financials.pendingPayouts)}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Completed Payouts', value: formatIndianCurrency(financials.completedPayouts), vendors: 234, period: 'This Month' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Completed Payouts</p>
            <CreditCard size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">{formatIndianCurrency(financials.completedPayouts)}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Commission Earned', value: formatIndianCurrency(financials.commission), rate: '15%', period: 'This Month' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Commission</p>
            <PieChart size={20} className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-purple-500">{formatIndianCurrency(financials.commission)}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Tax Collected (GST)', value: formatIndianCurrency(financials.taxCollected), rate: '18%', period: 'This Month' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Tax Collected</p>
            <FileText size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{formatIndianCurrency(financials.taxCollected)}</p>
        </motion.div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((txn, idx) => (
              <motion.div
                key={txn.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-glow transition-all"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedTransaction(txn)}
              >
                <div className="flex items-center gap-4">
                  <DollarSign className="text-green-500" size={20} />
                  <div>
                    <p className="font-medium">{txn.id} - {txn.vendor}</p>
                    <p className="text-sm text-muted-foreground">{txn.date} • {txn.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-bold">{formatCurrency(txn.amount)}</p>
                  <Badge variant={txn.status === 'completed' ? 'success' : txn.status === 'pending' ? 'warning' : 'destructive'}>
                    {txn.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={selectedTransaction !== null}
        onClose={() => setSelectedTransaction(null)}
        title={`Transaction Details - ${selectedTransaction?.id}`}
        size="lg"
      >
        {selectedTransaction && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
                <p className="font-bold">{selectedTransaction.id}</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Vendor</p>
                <p className="font-bold">{selectedTransaction.vendor}</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Type</p>
                <p className="font-bold">{selectedTransaction.type}</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Date</p>
                <p className="font-bold">{selectedTransaction.date}</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Amount</p>
                <p className="text-2xl font-bold text-green-500">{formatCurrency(selectedTransaction.amount)}</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge variant={selectedTransaction.status === 'completed' ? 'success' : selectedTransaction.status === 'pending' ? 'warning' : 'destructive'}>
                  {selectedTransaction.status}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1"><Eye size={16} className="mr-2" />View Receipt</Button>
              <Button variant="outline" className="flex-1"><Download size={16} className="mr-2" />Download</Button>
              {selectedTransaction.status === 'pending' && (
                <Button variant="outline" className="flex-1"><RefreshCw size={16} className="mr-2" />Retry</Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={selectedStat !== null}
        onClose={() => setSelectedStat(null)}
        title={selectedStat?.title || 'Details'}
      >
        {selectedStat && (
          <div className="space-y-4">
            <div className="glass rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">{selectedStat.period || 'Current Period'}</p>
              <p className="text-4xl font-bold text-green-500 mb-2">{selectedStat.value}</p>
              {selectedStat.growth && (
                <p className="text-sm text-green-500 flex items-center justify-center">
                  <TrendingUp size={16} className="mr-1" />
                  {selectedStat.growth}
                </p>
              )}
              {selectedStat.rate && (
                <p className="text-sm text-muted-foreground mt-2">Rate: {selectedStat.rate}</p>
              )}
              {selectedStat.vendors && (
                <p className="text-sm text-muted-foreground mt-2">{selectedStat.vendors} vendors</p>
              )}
            </div>
            <Button className="w-full">View Detailed Report</Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
