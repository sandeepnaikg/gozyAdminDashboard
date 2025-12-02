import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Search,
  Filter,
  Download,
  UserPlus,
  MoreVertical,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { UserProfileDrawer } from '@/components/users/UserProfileDrawer'
import { mockUsers } from '@/lib/mockData'
import { User } from '@/types/user'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const tableRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP animation for stats cards
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

    // GSAP animation for table rows
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
  }, [users])

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)

    const matchesFilter = filterStatus === 'all' || user.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    blocked: users.filter(u => u.status === 'blocked').length,
    pending: users.filter(u => u.status === 'pending').length,
    kycVerified: users.filter(u => u.kycStatus === 'verified').length,
    highRisk: users.filter(u => u.riskScore > 60).length,
  }

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
    setIsDrawerOpen(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} className="text-green-500" />
      case 'blocked':
        return <AlertTriangle size={16} className="text-red-500" />
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />
      default:
        return null
    }
  }

  const getKYCIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <Shield size={16} className="text-green-500" />
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />
      case 'rejected':
        return <AlertTriangle size={16} className="text-red-500" />
      default:
        return null
    }
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-500'
    if (score < 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage users, KYC verification, and risk assessment
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={18} className="mr-2" />
            Export CSV
          </Button>
          <Button>
            <UserPlus size={18} className="mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-muted-foreground mb-1">Total Users</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </motion.div>
        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-muted-foreground mb-1">Active</p>
          <p className="text-2xl font-bold text-green-500">{stats.active}</p>
        </motion.div>
        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-muted-foreground mb-1">Blocked</p>
          <p className="text-2xl font-bold text-red-500">{stats.blocked}</p>
        </motion.div>
        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-muted-foreground mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
        </motion.div>
        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-muted-foreground mb-1">KYC Verified</p>
          <p className="text-2xl font-bold text-blue-500">{stats.kycVerified}</p>
        </motion.div>
        <motion.div
          className="stat-card glass rounded-lg p-4 hover:shadow-glow transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-muted-foreground mb-1">High Risk</p>
          <p className="text-2xl font-bold text-orange-500">{stats.highRisk}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="glass rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by name, email, or phone..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'active' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('active')}
            >
              Active
            </Button>
            <Button
              variant={filterStatus === 'blocked' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('blocked')}
            >
              Blocked
            </Button>
            <Button
              variant={filterStatus === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('pending')}
            >
              Pending
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div ref={tableRef} className="glass rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>KYC</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Signup Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer hover:bg-primary/5"
                onClick={() => handleUserClick(user)}
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {user.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{user.email}</p>
                    <p className="text-muted-foreground">{user.phone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(user.status)}
                    <span className="capitalize">{user.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getKYCIcon(user.kycStatus)}
                    <span className="capitalize">{user.kycStatus}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`font-semibold ${getRiskColor(user.riskScore)}`}>
                    {user.riskScore}
                  </span>
                </TableCell>
                <TableCell>{user.totalOrders}</TableCell>
                <TableCell className="font-semibold">
                  {formatCurrency(user.totalSpent)}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(user.signupDate)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle menu click
                    }}
                  >
                    <MoreVertical size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* User Profile Drawer */}
      <UserProfileDrawer
        user={selectedUser}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  )
}
