import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  Bell,
  Send,
  Mail,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Filter,
  Plus,
  Eye,
  BarChart3,
  Copy
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

export default function NotificationsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
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
    totalSent: 456789,
    delivered: 432156,
    failed: 2345,
    pending: 22288
  }

  const notifications = [
    { id: 1, title: 'Flash Sale Alert', type: 'Push', audience: 45678, status: 'delivered', sent: '2024-03-15 10:30', deliveryRate: 98.5 },
    { id: 2, title: 'Order Confirmation', type: 'Email', audience: 12340, status: 'delivered', sent: '2024-03-15 09:15', deliveryRate: 99.2 },
    { id: 3, title: 'Ride Status Update', type: 'SMS', audience: 8923, status: 'pending', sent: '2024-03-15 11:00', deliveryRate: 0 },
    { id: 4, title: 'Event Reminder', type: 'Push', audience: 23450, status: 'delivered', sent: '2024-03-14 18:00', deliveryRate: 97.8 },
    { id: 5, title: 'Payment Receipt', type: 'Email', audience: 5678, status: 'failed', sent: '2024-03-14 16:30', deliveryRate: 45.2 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Notifications</h1>
          <p className="text-muted-foreground mt-1">Manage push notifications, emails, and SMS</p>
        </div>
        <Button>
          <Plus size={18} className="mr-2" />
          Create Campaign
        </Button>
      </div>

      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Total Sent', value: stats.totalSent.toLocaleString(), period: 'All Time' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Sent</p>
            <Send size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{stats.totalSent.toLocaleString()}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Delivered', value: stats.delivered.toLocaleString(), rate: '94.6%' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Delivered</p>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.delivered.toLocaleString()}</p>
          <p className="text-xs text-green-500 mt-1">94.6% delivery rate</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Failed Notifications', value: stats.failed.toLocaleString(), action: 'Retry Available' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Failed</p>
            <XCircle size={20} className="text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-500">{stats.failed.toLocaleString()}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Pending Notifications', value: stats.pending.toLocaleString(), status: 'Processing' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Pending</p>
            <Clock size={20} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-orange-500">{stats.pending.toLocaleString()}</p>
        </motion.div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Campaigns</CardTitle>
            <div className="flex gap-2">
              <Input placeholder="Search campaigns..." className="w-64" />
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notif, idx) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-glow transition-all"
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedCampaign(notif)}
              >
                <div className="flex items-center gap-4">
                  {notif.type === 'Push' && <Bell className="text-purple-500" size={20} />}
                  {notif.type === 'Email' && <Mail className="text-blue-500" size={20} />}
                  {notif.type === 'SMS' && <MessageSquare className="text-green-500" size={20} />}
                  <div>
                    <p className="font-medium">{notif.title}</p>
                    <p className="text-sm text-muted-foreground">{notif.type} • {notif.sent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Audience</p>
                    <p className="font-bold flex items-center">
                      <Users size={14} className="mr-1" />
                      {notif.audience.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Delivery</p>
                    <p className="font-bold">{notif.deliveryRate}%</p>
                  </div>
                  <Badge variant={notif.status === 'delivered' ? 'success' : notif.status === 'pending' ? 'warning' : 'destructive'}>
                    {notif.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={selectedCampaign !== null}
        onClose={() => setSelectedCampaign(null)}
        title={`Campaign - ${selectedCampaign?.title}`}
        size="lg"
      >
        {selectedCampaign && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Type</p>
                <div className="flex items-center gap-2">
                  {selectedCampaign.type === 'Push' && <Bell size={16} className="text-purple-500" />}
                  {selectedCampaign.type === 'Email' && <Mail size={16} className="text-blue-500" />}
                  {selectedCampaign.type === 'SMS' && <MessageSquare size={16} className="text-green-500" />}
                  <p className="font-bold">{selectedCampaign.type}</p>
                </div>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge variant={selectedCampaign.status === 'delivered' ? 'success' : selectedCampaign.status === 'pending' ? 'warning' : 'destructive'}>
                  {selectedCampaign.status}
                </Badge>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Audience</p>
                <p className="text-2xl font-bold flex items-center">
                  <Users size={20} className="mr-2" />
                  {selectedCampaign.audience.toLocaleString()}
                </p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Delivery Rate</p>
                <p className="text-2xl font-bold text-green-500">{selectedCampaign.deliveryRate}%</p>
              </div>
              <div className="glass rounded-lg p-4 col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Sent At</p>
                <p className="font-bold">{selectedCampaign.sent}</p>
              </div>
            </div>
            <div className="glass rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Performance Metrics</p>
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">{Math.floor(selectedCampaign.audience * selectedCampaign.deliveryRate / 100).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Delivered</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-500">{Math.floor(selectedCampaign.audience * 0.65).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Opened</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-500">{Math.floor(selectedCampaign.audience * 0.12).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Clicked</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1"><BarChart3 size={16} className="mr-2" />View Analytics</Button>
              <Button variant="outline" className="flex-1"><Copy size={16} className="mr-2" />Duplicate</Button>
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
              {selectedStat.rate && <p className="text-sm text-green-500 mt-2">Delivery Rate: {selectedStat.rate}</p>}
              {selectedStat.status && <p className="text-sm text-muted-foreground mt-2">{selectedStat.status}</p>}
              {selectedStat.action && <p className="text-sm text-orange-500 mt-2">{selectedStat.action}</p>}
            </div>
            <Button className="w-full">View All Notifications</Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
