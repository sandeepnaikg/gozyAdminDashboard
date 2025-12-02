import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Ticket,
  Film,
  Music,
  Trophy,
  Laugh,
  Theater,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  Star,
  Search,
  Filter,
  Download,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { mockTicketBookings, mockEvents, mockEventAnalytics } from '@/lib/ticketMockData'
import { formatCurrency, formatIndianCurrency, formatDateTime } from '@/lib/utils'

export default function TicketsPage() {
  const [bookings] = useState(mockTicketBookings)
  const [events] = useState(mockEvents)
  const [analytics] = useState(mockEventAnalytics)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'movie' | 'concert' | 'sports' | 'theatre' | 'comedy'>('all')
  const statsRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

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

    if (tableRef.current) {
      const rows = tableRef.current.querySelectorAll('tbody tr')
      gsap.fromTo(
        rows,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
        }
      )
    }
  }, [filterType])

  const stats = {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.finalAmount, 0),
    totalTickets: bookings.reduce((sum, b) => sum + b.ticketCount, 0),
    activeEvents: events.filter(e => e.status === 'upcoming' || e.status === 'ongoing').length,
    avgOccupancy: (events.reduce((sum, e) => sum + (e.bookedSeats / e.totalSeats * 100), 0) / events.length).toFixed(1)
  }

  const revenueByType = [
    {
      type: 'movie',
      icon: Film,
      bookings: bookings.filter(b => b.eventType === 'movie').length,
      revenue: bookings.filter(b => b.eventType === 'movie').reduce((sum, b) => sum + b.finalAmount, 0),
      color: 'text-purple-500'
    },
    {
      type: 'concert',
      icon: Music,
      bookings: bookings.filter(b => b.eventType === 'concert').length,
      revenue: bookings.filter(b => b.eventType === 'concert').reduce((sum, b) => sum + b.finalAmount, 0),
      color: 'text-pink-500'
    },
    {
      type: 'sports',
      icon: Trophy,
      bookings: bookings.filter(b => b.eventType === 'sports').length,
      revenue: bookings.filter(b => b.eventType === 'sports').reduce((sum, b) => sum + b.finalAmount, 0),
      color: 'text-green-500'
    },
    {
      type: 'comedy',
      icon: Laugh,
      bookings: bookings.filter(b => b.eventType === 'comedy').length,
      revenue: bookings.filter(b => b.eventType === 'comedy').reduce((sum, b) => sum + b.finalAmount, 0),
      color: 'text-orange-500'
    },
    {
      type: 'theatre',
      icon: Theater,
      bookings: bookings.filter(b => b.eventType === 'theatre').length,
      revenue: bookings.filter(b => b.eventType === 'theatre').reduce((sum, b) => sum + b.finalAmount, 0),
      color: 'text-blue-500'
    }
  ]

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || b.eventType === filterType
    return matchesSearch && matchesType
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'danger' | 'secondary'> = {
      confirmed: 'success',
      pending: 'warning',
      cancelled: 'danger',
      used: 'secondary',
      expired: 'secondary'
    }
    return variants[status] || 'secondary'
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      movie: <Film size={18} className="text-purple-500" />,
      concert: <Music size={18} className="text-pink-500" />,
      sports: <Trophy size={18} className="text-green-500" />,
      comedy: <Laugh size={18} className="text-orange-500" />,
      theatre: <Theater size={18} className="text-blue-500" />
    }
    return icons[type as keyof typeof icons] || <Ticket size={18} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Tickets & Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage bookings for movies, concerts, sports, comedy shows, and theatre
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={18} className="mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus size={18} className="mr-2" />
            Create Event
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <Ticket size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
          <p className="text-xs text-green-500 mt-1">+18% this week</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Confirmed</p>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.confirmedBookings}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <DollarSign size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">{formatIndianCurrency(stats.totalRevenue)}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Tickets</p>
            <Users size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{stats.totalTickets}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active Events</p>
            <Calendar size={20} className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-purple-500">{stats.activeEvents}</p>
        </motion.div>

        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Avg Occupancy</p>
            <BarChart3 size={20} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold">{stats.avgOccupancy}%</p>
        </motion.div>
      </div>

      {/* Revenue by Event Type */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Event Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {revenueByType.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-lg p-4 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon size={20} className={item.color} />
                      <h4 className="font-semibold capitalize">{item.type}</h4>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bookings:</span>
                      <span className="font-semibold">{item.bookings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Revenue:</span>
                      <span className="font-semibold">{formatIndianCurrency(item.revenue)}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Events Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2" size={20} />
            Top Performing Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.map((event, index) => (
              <motion.div
                key={event.eventId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">{event.eventName}</h4>
                  <Badge variant="success">{event.occupancyRate}% Occupied</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Bookings</p>
                    <p className="font-semibold text-lg">{event.totalBookings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Revenue</p>
                    <p className="font-semibold text-lg">{formatIndianCurrency(event.totalRevenue)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg Ticket Price</p>
                    <p className="font-semibold text-lg">{formatCurrency(event.averageTicketPrice)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Peak Booking Time</p>
                    <p className="font-semibold text-lg">{event.peakBookingTime}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search & Filters */}
      <div className="glass rounded-lg p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by booking ID, customer, or event name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterType('all')}
            >
              All
            </Button>
            <Button
              variant={filterType === 'movie' ? 'default' : 'outline'}
              onClick={() => setFilterType('movie')}
            >
              <Film size={16} className="mr-1" />
              Movies
            </Button>
            <Button
              variant={filterType === 'concert' ? 'default' : 'outline'}
              onClick={() => setFilterType('concert')}
            >
              <Music size={16} className="mr-1" />
              Concerts
            </Button>
            <Button
              variant={filterType === 'sports' ? 'default' : 'outline'}
              onClick={() => setFilterType('sports')}
            >
              <Trophy size={16} className="mr-1" />
              Sports
            </Button>
            <Button
              variant={filterType === 'comedy' ? 'default' : 'outline'}
              onClick={() => setFilterType('comedy')}
            >
              <Laugh size={16} className="mr-1" />
              Comedy
            </Button>
            <Button
              variant={filterType === 'theatre' ? 'default' : 'outline'}
              onClick={() => setFilterType('theatre')}
            >
              <Theater size={16} className="mr-1" />
              Theatre
            </Button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div ref={tableRef} className="glass rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead>Tickets</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow
                key={booking.id}
                className="cursor-pointer hover:bg-primary/5"
              >
                <TableCell>
                  <div className="font-medium">{booking.bookingId}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDateTime(booking.bookingDate)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 mb-1">
                    {getTypeIcon(booking.eventType)}
                    <span className="font-medium">{booking.eventName}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {booking.eventType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{booking.customerName}</p>
                    <p className="text-xs text-muted-foreground">{booking.customerPhone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-1 text-sm">
                    <MapPin size={14} className="text-muted-foreground mt-0.5" />
                    <span>{booking.venue}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Calendar size={14} className="mr-1 text-muted-foreground" />
                    {formatDateTime(booking.eventDate)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold">{booking.ticketCount} tickets</div>
                  {booking.tickets[0]?.seatNumber && (
                    <div className="text-xs text-muted-foreground">
                      {booking.tickets.map(t => t.seatNumber).join(', ')}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="font-semibold">{formatCurrency(booking.finalAmount)}</div>
                  <div className="text-xs text-muted-foreground">
                    Base: {formatCurrency(booking.totalAmount)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadge(booking.status)}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={booking.paymentStatus === 'completed' ? 'success' : booking.paymentStatus === 'refunded' ? 'warning' : 'secondary'}>
                    {booking.paymentStatus}
                  </Badge>
                  {booking.refundAmount && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Refund: {formatCurrency(booking.refundAmount)}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
