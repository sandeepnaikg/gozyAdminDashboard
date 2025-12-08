import { Bell, Search, Moon, Sun, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '@/api/auth'
import { getAccessToken } from '@/lib/auth.js'

export const Header = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = getAccessToken()
      if (token) {
        // Try to get user data from localStorage
        try {
          const userDataStr = localStorage.getItem('user_data')
          if (userDataStr) {
            setUser(JSON.parse(userDataStr))
          }
        } catch (error) {
          console.error('Failed to get user data:', error)
        }
      }
    }
    checkAuth()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleLogout = () => {
    logoutUser()
    localStorage.removeItem('user_data')
    setUser(null)
    setShowUserMenu(false)
    navigate('/login')
  }

  return (
    <header className="h-16 glass border-b border-white/10 sticky top-0 z-40 backdrop-blur-lg">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search orders, users, vendors..."
              className="pl-10 glass border-white/20"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          <div className="w-px h-6 bg-white/10" />

          <div className="relative" ref={userMenuRef}>
            {user ? (
              // Logged in user profile
              <>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                >
                  <div className="text-right">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                    <span className="text-white font-semibold text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl glass border border-white/20 shadow-2xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-white/10 bg-white/5">
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors text-left group"
                      >
                        <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Guest user profile - redirects to login
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="text-right">
                  <p className="text-sm font-medium">Guest</p>
                  <p className="text-xs text-muted-foreground">Sign in</p>
                </div>
                <div className="w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center hover:border-purple-500/50 transition-colors">
                  <span className="text-muted-foreground font-semibold text-sm">?</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
