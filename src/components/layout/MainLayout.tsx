import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { AnimatedBackground } from '@/components/animations/AnimatedBackground'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(110,69,161)]/5 via-background to-background">
      <AnimatedBackground />
      <Sidebar />
      <div className="pl-[280px] transition-all duration-300">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
