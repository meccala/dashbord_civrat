import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider, useAuth } from './lib/auth'
import LandingPage from './components/LandingPage'
import DashboardLayout from './components/DashboardLayout'
import GuildSelector from './components/GuildSelector'
import WelcomePage from './pages/WelcomePage'
import TicketsPage from './pages/TicketsPage'
import LogsPage from './pages/LogsPage'
import AutoModPage from './pages/AutoModPage'
import CaptchaPage from './pages/CaptchaPage'
import XPPage from './pages/XPPage'
import GiveawaysPage from './pages/GiveawaysPage'
import LanguagesPage from './pages/LanguagesPage'
import SuggestionsPage from './pages/SuggestionsPage'
import AuthCallbackPage from './pages/AuthCallbackPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-discord-darker flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-neon-green border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  const { session } = useAuth()

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route
          path="/"
          element={session ? <Navigate to="/dashboard" replace /> : <LandingPage />}
        />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <GuildSelector />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:guildId"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="welcome" element={<WelcomePage />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="logs" element={<LogsPage />} />
          <Route path="auto-mod" element={<AutoModPage />} />
          <Route path="captcha" element={<CaptchaPage />} />
          <Route path="xp" element={<XPPage />} />
          <Route path="giveaways" element={<GiveawaysPage />} />
          <Route path="languages" element={<LanguagesPage />} />
          <Route path="suggestions" element={<SuggestionsPage />} />
          <Route index element={<Navigate to="welcome" replace />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
