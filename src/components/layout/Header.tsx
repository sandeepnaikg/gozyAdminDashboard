import { Bell, Search, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useState, useEffect } from 'react'

export const Header = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
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
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          <div className="w-px h-6 bg-white/10" />

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium">Super Admin</p>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-white font-semibold text-sm">SA</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
