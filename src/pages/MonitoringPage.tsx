import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  Activity,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Database,
  Cloud,
  Zap,
  BarChart3,
  Eye,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'

export default function MonitoringPage() {
  const [selectedService, setSelectedService] = useState<any>(null)
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

  const systemStats = {
    uptime: '99.9%',
    activeServers: 24,
    cpuUsage: 45.3,
    memoryUsage: 67.8,
    diskUsage: 54.2,
    networkLatency: 23
  }

  const cpuData = [
    { time: '00:00', usage: 30 },
    { time: '04:00', usage: 25 },
    { time: '08:00', usage: 45 },
    { time: '12:00', usage: 65 },
    { time: '16:00', usage: 55 },
    { time: '20:00', usage: 40 },
    { time: '24:00', usage: 35 }
  ]

  const memoryData = [
    { time: '00:00', usage: 50 },
    { time: '04:00', usage: 48 },
    { time: '08:00', usage: 60 },
    { time: '12:00', usage: 75 },
    { time: '16:00', usage: 70 },
    { time: '20:00', usage: 65 },
    { time: '24:00', usage: 55 }
  ]

  const services = [
    { name: 'API Gateway', status: 'healthy', uptime: 99.9, latency: 12, requests: 125678 },
    { name: 'Auth Service', status: 'healthy', uptime: 99.8, latency: 18, requests: 89234 },
    { name: 'Payment Service', status: 'degraded', uptime: 98.5, latency: 145, requests: 45678 },
    { name: 'Database', status: 'healthy', uptime: 99.9, latency: 8, requests: 234567 },
    { name: 'Cache Server', status: 'healthy', uptime: 99.7, latency: 3, requests: 567890 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">System Monitoring</h1>
          <p className="text-muted-foreground mt-1">Real-time infrastructure and service monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Activity size={18} className="mr-2" />
            Live View
          </Button>
          <Button>
            <BarChart3 size={18} className="mr-2" />
            Reports
          </Button>
        </div>
      </div>

      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'System Uptime', value: systemStats.uptime, status: 'Excellent', servers: systemStats.activeServers })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Uptime</p>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">{systemStats.uptime}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Active Servers', value: systemStats.activeServers, total: 30, status: 'Healthy' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active Servers</p>
            <Server size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{systemStats.activeServers}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'CPU Usage', value: `${systemStats.cpuUsage}%`, status: 'Normal', threshold: '80%' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">CPU Usage</p>
            <Cpu size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{systemStats.cpuUsage}%</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Memory Usage', value: `${systemStats.memoryUsage}%`, total: '64 GB', used: '43.4 GB' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Memory</p>
            <Database size={20} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-orange-500">{systemStats.memoryUsage}%</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Disk Usage', value: `${systemStats.diskUsage}%`, total: '2 TB', used: '1.08 TB' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Disk Usage</p>
            <HardDrive size={20} className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold">{systemStats.diskUsage}%</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Network Latency', value: `${systemStats.networkLatency}ms`, status: 'Excellent', threshold: '50ms' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Latency</p>
            <Wifi size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">{systemStats.networkLatency}ms</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cpu className="mr-2" size={20} />
              CPU Usage (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={cpuData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="usage" stroke="rgb(110,69,161)" strokeWidth={2} dot={{ fill: 'rgb(110,69,161)' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2" size={20} />
              Memory Usage (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={memoryData}>
                <defs>
                  <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="usage" stroke="#f59e0b" fillOpacity={1} fill="url(#colorMemory)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.map((service, idx) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-glow transition-all"
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedService(service)}
              >
                <div className="flex items-center gap-4">
                  <Cloud className={service.status === 'healthy' ? 'text-green-500' : 'text-orange-500'} size={20} />
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">Uptime: {service.uptime}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Latency</p>
                    <p className="font-bold">{service.latency}ms</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Requests</p>
                    <p className="font-bold">{service.requests.toLocaleString()}</p>
                  </div>
                  <Badge variant={service.status === 'healthy' ? 'success' : 'warning'}>
                    {service.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        title={`Service - ${selectedService?.name}`}
        size="lg"
      >
        {selectedService && (
          <div className="space-y-6">
            <div className="glass rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cloud className={selectedService.status === 'healthy' ? 'text-green-500' : 'text-orange-500'} size={32} />
                <div>
                  <p className="font-bold text-lg">{selectedService.name}</p>
                  <Badge variant={selectedService.status === 'healthy' ? 'success' : 'warning'}>
                    {selectedService.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Uptime</p>
                <p className="text-2xl font-bold text-green-500">{selectedService.uptime}%</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Latency</p>
                <p className="text-2xl font-bold">{selectedService.latency}ms</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Requests</p>
                <p className="text-2xl font-bold">{selectedService.requests.toLocaleString()}</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Avg Response Time</p>
                <p className="text-2xl font-bold">{selectedService.latency}ms</p>
              </div>
            </div>
            <div className="glass rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-3">Recent Activity</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Health Check</span>
                  <span className="font-medium">2 minutes ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Restart</span>
                  <span className="font-medium">5 days ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Error Rate</span>
                  <span className="font-medium text-green-500">0.02%</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1"><Eye size={16} className="mr-2" />View Logs</Button>
              <Button variant="outline" className="flex-1"><RefreshCw size={16} className="mr-2" />Restart Service</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={selectedStat !== null}
        onClose={() => setSelectedStat(null)}
        title={selectedStat?.title || 'System Metric'}
      >
        {selectedStat && (
          <div className="space-y-4">
            <div className="glass rounded-lg p-6 text-center">
              <p className="text-4xl font-bold mb-2">{selectedStat.value}</p>
              {selectedStat.status && <p className="text-muted-foreground">Status: {selectedStat.status}</p>}
              {selectedStat.threshold && <p className="text-sm text-muted-foreground mt-2">Threshold: {selectedStat.threshold}</p>}
              {selectedStat.servers && <p className="text-sm text-muted-foreground mt-2">{selectedStat.servers} servers active</p>}
              {selectedStat.total && <p className="text-sm text-muted-foreground mt-2">Total: {selectedStat.total}</p>}
              {selectedStat.used && <p className="text-sm text-muted-foreground">Used: {selectedStat.used}</p>}
            </div>
            <Button className="w-full"><BarChart3 size={16} className="mr-2" />View Detailed Metrics</Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
