import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  FileText,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Download,
  Filter,
  Search,
  Clock,
  Eye,
  Copy
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

export default function LogsPage() {
  const [selectedLog, setSelectedLog] = useState<any>(null)
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

  const stats = {
    totalLogs: 456789,
    errors: 2345,
    warnings: 5678,
    info: 448766
  }

  const logs = [
    { id: 1, level: 'error', message: 'Payment gateway timeout', service: 'Payment Service', timestamp: '2024-03-15 10:45:23', user: 'user_12345' },
    { id: 2, level: 'warning', message: 'High memory usage detected', service: 'App Server', timestamp: '2024-03-15 10:42:15', user: 'system' },
    { id: 3, level: 'info', message: 'User login successful', service: 'Auth Service', timestamp: '2024-03-15 10:40:08', user: 'user_67890' },
    { id: 4, level: 'error', message: 'Database connection failed', service: 'Database', timestamp: '2024-03-15 10:38:45', user: 'system' },
    { id: 5, level: 'info', message: 'Order placed successfully', service: 'Order Service', timestamp: '2024-03-15 10:35:12', user: 'user_34567' },
    { id: 6, level: 'warning', message: 'API rate limit approaching', service: 'API Gateway', timestamp: '2024-03-15 10:30:00', user: 'system' },
    { id: 7, level: 'success', message: 'Backup completed', service: 'Backup Service', timestamp: '2024-03-15 10:25:34', user: 'system' },
    { id: 8, level: 'info', message: 'Email sent to customer', service: 'Notification', timestamp: '2024-03-15 10:20:11', user: 'user_89012' }
  ]

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <XCircle className="text-red-500" size={18} />
      case 'warning':
        return <AlertTriangle className="text-orange-500" size={18} />
      case 'success':
        return <CheckCircle className="text-green-500" size={18} />
      default:
        return <Info className="text-blue-500" size={18} />
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'error':
        return 'destructive'
      case 'warning':
        return 'warning'
      case 'success':
        return 'success'
      default:
        return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">System Logs</h1>
          <p className="text-muted-foreground mt-1">Monitor system logs, audit trails, and error tracking</p>
        </div>
        <Button>
          <Download size={18} className="mr-2" />
          Export Logs
        </Button>
      </div>

      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Total Logs', value: stats.totalLogs.toLocaleString(), period: 'Last 30 Days' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Logs</p>
            <FileText size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{stats.totalLogs.toLocaleString()}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Error Logs', value: stats.errors.toLocaleString(), severity: 'High', action: 'Requires Attention' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Errors</p>
            <XCircle size={20} className="text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-500">{stats.errors.toLocaleString()}</p>
          <p className="text-xs text-red-500 mt-1">Requires attention</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Warnings', value: stats.warnings.toLocaleString(), severity: 'Medium' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Warnings</p>
            <AlertTriangle size={20} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-orange-500">{stats.warnings.toLocaleString()}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Info Logs', value: stats.info.toLocaleString(), type: 'Informational' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Info</p>
            <Info size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{stats.info.toLocaleString()}</p>
        </motion.div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Logs</CardTitle>
            <div className="flex gap-2">
              <Input placeholder="Search logs..." className="w-64" />
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {logs.map((log, idx) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass rounded-lg p-3 flex items-center justify-between hover:shadow-glow transition-all cursor-pointer"
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedLog(log)}
              >
                <div className="flex items-center gap-3 flex-1">
                  {getLevelIcon(log.level)}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{log.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {log.service} • {log.user}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock size={12} className="mr-1" />
                      {log.timestamp}
                    </p>
                  </div>
                  <Badge variant={getLevelBadge(log.level) as any}>
                    {log.level}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={selectedLog !== null}
        onClose={() => setSelectedLog(null)}
        title="Log Details"
        size="lg"
      >
        {selectedLog && (
          <div className="space-y-4">
            <div className="glass rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {getLevelIcon(selectedLog.level)}
                <Badge variant={getLevelBadge(selectedLog.level) as any}>{selectedLog.level}</Badge>
              </div>
              <p className="font-bold text-lg mb-2">{selectedLog.message}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Service</p>
                <p className="font-bold">{selectedLog.service}</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">User/System</p>
                <p className="font-bold">{selectedLog.user}</p>
              </div>
              <div className="glass rounded-lg p-4 col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Timestamp</p>
                <p className="font-bold flex items-center">
                  <Clock size={16} className="mr-2" />
                  {selectedLog.timestamp}
                </p>
              </div>
            </div>
            <div className="glass rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Stack Trace</p>
              <pre className="bg-black/40 rounded p-3 text-xs overflow-x-auto">
                <code>{`Error: ${selectedLog.message}\n  at ${selectedLog.service}\n  at processRequest (core.js:234:15)\n  at handleRequest (server.js:567:23)`}</code>
              </pre>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1"><Eye size={16} className="mr-2" />View Full Log</Button>
              <Button variant="outline" className="flex-1"><Copy size={16} className="mr-2" />Copy</Button>
              <Button variant="outline" className="flex-1"><Download size={16} className="mr-2" />Export</Button>
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
              <p className="text-4xl font-bold mb-2">{selectedStat.value}</p>
              {selectedStat.period && <p className="text-muted-foreground">{selectedStat.period}</p>}
              {selectedStat.severity && <p className="text-sm text-muted-foreground mt-2">Severity: {selectedStat.severity}</p>}
              {selectedStat.type && <p className="text-sm text-muted-foreground mt-2">Type: {selectedStat.type}</p>}
              {selectedStat.action && <p className="text-sm text-orange-500 mt-2">{selectedStat.action}</p>}
            </div>
            <Button className="w-full">View All Logs</Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
