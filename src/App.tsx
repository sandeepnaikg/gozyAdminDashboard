import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import DashboardPage from '@/pages/DashboardPage'
import UsersPage from '@/pages/UsersPage'
import FoodPage from '@/pages/FoodPage'
import TravelPage from '@/pages/TravelPage'
import TicketsPage from '@/pages/TicketsPage'
import ShoppingPage from '@/pages/ShoppingPage'
import RidersPage from '@/pages/RidersPage'
import VendorsPage from '@/pages/VendorsPage'
import OperationsPage from '@/pages/OperationsPage'
import FinancePage from '@/pages/FinancePage'
import CMSPage from '@/pages/CMSPage'
import NotificationsPage from '@/pages/NotificationsPage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import SettingsPage from '@/pages/SettingsPage'
import LogsPage from '@/pages/LogsPage'
import MonitoringPage from '@/pages/MonitoringPage'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/shopping" element={<ShoppingPage />} />
          <Route path="/riders" element={<RidersPage />} />
          <Route path="/vendors" element={<VendorsPage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/cms" element={<CMSPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
