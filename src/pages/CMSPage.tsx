import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  FileText,
  Image,
  Video,
  Edit,
  Trash2,
  Plus,
  Eye,
  Upload,
  Check,
  Clock,
  Copy,
  Share2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

export default function CMSPage() {
  const [selectedContent, setSelectedContent] = useState<any>(null)
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
    totalContent: 456,
    published: 389,
    drafts: 45,
    scheduled: 22
  }

  const content = [
    { id: 1, title: 'Summer Sale 2024', type: 'Banner', status: 'published', views: 45678, date: '2024-03-15' },
    { id: 2, title: 'New Restaurant Partners', type: 'Blog', status: 'published', views: 12340, date: '2024-03-14' },
    { id: 3, title: 'Travel Offers', type: 'Promotion', status: 'scheduled', views: 0, date: '2024-03-20' },
    { id: 4, title: 'App Update Guide', type: 'Article', status: 'draft', views: 0, date: '2024-03-13' },
    { id: 5, title: 'Event Highlights', type: 'Video', status: 'published', views: 23450, date: '2024-03-12' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Content Management</h1>
          <p className="text-muted-foreground mt-1">Manage banners, notifications, and promotional content</p>
        </div>
        <Button>
          <Plus size={18} className="mr-2" />
          Create Content
        </Button>
      </div>

      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Total Content', value: stats.totalContent, type: 'All Types' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Content</p>
            <FileText size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{stats.totalContent}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Published Content', value: stats.published, status: 'Live' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Published</p>
            <Check size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.published}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Draft Content', value: stats.drafts, status: 'Pending Review' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Drafts</p>
            <Edit size={20} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-orange-500">{stats.drafts}</p>
        </motion.div>

        <motion.div 
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedStat({ title: 'Scheduled Content', value: stats.scheduled, nextPublish: 'Mar 20, 2024' })}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Scheduled</p>
            <Clock size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-500">{stats.scheduled}</p>
        </motion.div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Content Library</CardTitle>
            <Input placeholder="Search content..." className="w-64" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {content.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-glow transition-all"
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedContent(item)}
              >
                <div className="flex items-center gap-4">
                  {item.type === 'Banner' && <Image className="text-purple-500" size={20} />}
                  {item.type === 'Video' && <Video className="text-blue-500" size={20} />}
                  {item.type === 'Blog' && <FileText className="text-green-500" size={20} />}
                  {item.type === 'Article' && <FileText className="text-orange-500" size={20} />}
                  {item.type === 'Promotion' && <Image className="text-pink-500" size={20} />}
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.type} • {item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Views</p>
                    <p className="font-bold">{item.views.toLocaleString()}</p>
                  </div>
                  <Badge variant={item.status === 'published' ? 'success' : item.status === 'scheduled' ? 'default' : 'secondary'}>
                    {item.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedContent(item); }}><Eye size={16} /></Button>
                    <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}><Edit size={16} /></Button>
                    <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}><Trash2 size={16} /></Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={selectedContent !== null}
        onClose={() => setSelectedContent(null)}
        title={selectedContent?.title || 'Content Details'}
        size="lg"
      >
        {selectedContent && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Content Type</p>
                <p className="font-bold">{selectedContent.type}</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge variant={selectedContent.status === 'published' ? 'success' : selectedContent.status === 'scheduled' ? 'default' : 'secondary'}>
                  {selectedContent.status}
                </Badge>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Views</p>
                <p className="text-2xl font-bold">{selectedContent.views.toLocaleString()}</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Date</p>
                <p className="font-bold">{selectedContent.date}</p>
              </div>
            </div>
            <div className="glass rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Preview</p>
              <div className="bg-black/20 rounded-lg p-8 text-center">
                {selectedContent.type === 'Video' && <Video size={48} className="mx-auto text-muted-foreground" />}
                {(selectedContent.type === 'Banner' || selectedContent.type === 'Promotion') && <Image size={48} className="mx-auto text-muted-foreground" />}
                {(selectedContent.type === 'Blog' || selectedContent.type === 'Article') && <FileText size={48} className="mx-auto text-muted-foreground" />}
                <p className="text-muted-foreground mt-2">Content preview would appear here</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1"><Edit size={16} className="mr-2" />Edit Content</Button>
              <Button variant="outline" className="flex-1"><Copy size={16} className="mr-2" />Duplicate</Button>
              <Button variant="outline" className="flex-1"><Share2 size={16} className="mr-2" />Share</Button>
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
              {selectedStat.type && <p className="text-muted-foreground">{selectedStat.type}</p>}
              {selectedStat.status && <p className="text-muted-foreground">{selectedStat.status}</p>}
              {selectedStat.nextPublish && (
                <p className="text-sm text-muted-foreground mt-2">Next Publish: {selectedStat.nextPublish}</p>
              )}
            </div>
            <Button className="w-full">View All Items</Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
