import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { RbacProvider } from '@/hooks/useRbac'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import UsersPage from '@/pages/UsersPage'
import FoodPage from '@/pages/FoodPage'
import TravelPage from '@/pages/TravelPage'
import TicketsPage from '@/pages/TicketsPage'
import ShoppingPage from '@/pages/ShoppingPage'
import RidersPage from '@/pages/RidersPage'
import VendorsPage from '@/pages/VendorsPage'
import VendorEmployeeManagementPage from '@/pages/VendorEmployeeManagementPage'
import OperationsPage from '@/pages/OperationsPage'
import FinancePage from '@/pages/FinancePage'
import CMSPage from '@/pages/CMSPage'
import NotificationsPage from '@/pages/NotificationsPage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import SettingsPage from '@/pages/SettingsPage'
import LogsPage from '@/pages/LogsPage'
import MonitoringPage from '@/pages/MonitoringPage'
import { getAccessToken } from '@/lib/auth'

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = getAccessToken()
  return token ? <>{children}</> : <Navigate to="/login" replace />
}

function App() {
  return (
    <RbacProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute>
            <MainLayout>
              <UsersPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/food" element={
          <ProtectedRoute>
            <MainLayout>
              <FoodPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/travel" element={
          <ProtectedRoute>
            <MainLayout>
              <TravelPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/tickets" element={
          <ProtectedRoute>
            <MainLayout>
              <TicketsPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/shopping" element={
          <ProtectedRoute>
            <MainLayout>
              <ShoppingPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/riders" element={
          <ProtectedRoute>
            <MainLayout>
              <RidersPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/vendors" element={
          <ProtectedRoute>
            <MainLayout>
              <VendorsPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/vendor/employees" element={
          <ProtectedRoute>
            <MainLayout>
              <VendorEmployeeManagementPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/operations" element={
          <ProtectedRoute>
            <MainLayout>
              <OperationsPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/finance" element={
          <ProtectedRoute>
            <MainLayout>
              <FinancePage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/cms" element={
          <ProtectedRoute>
            <MainLayout>
              <CMSPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <MainLayout>
              <NotificationsPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <MainLayout>
              <AnalyticsPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/logs" element={
          <ProtectedRoute>
            <MainLayout>
              <LogsPage />
            </MainLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
    </RbacProvider>
  )
}

export default App
