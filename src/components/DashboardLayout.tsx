import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Bot, Shield, Zap, Gift, Globe, Lightbulb,
  LogOut, Menu, X, ChevronLeft, Ticket, ScrollText, Lock
} from 'lucide-react'
import { useAuth } from '../lib/auth'

const navigation = [
  { name: 'Welcome & Goodbye', icon: Bot, path: 'welcome' },
  { name: 'Tickets', icon: Ticket, path: 'tickets' },
  { name: 'Logs', icon: ScrollText, path: 'logs' },
  { name: 'Auto Moderation', icon: Shield, path: 'auto-mod' },
  { name: 'Captcha', icon: Lock, path: 'captcha' },
  { name: 'XP & Levels', icon: Zap, path: 'xp' },
  { name: 'Giveaways', icon: Gift, path: 'giveaways' },
  { name: 'Languages', icon: Globe, path: 'languages' },
  { name: 'Suggestions', icon: Lightbulb, path: 'suggestions' },
]

export default function DashboardLayout() {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const guildId = location.pathname.split('/')[2]

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-discord-darker">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-discord-dark/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 hover:bg-white/5 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-green to-accent-yellow flex items-center justify-center">
            <span className="text-sm font-bold text-discord-darker">C</span>
          </div>
          <span className="font-semibold neon-text">CIVRAT</span>
        </div>
        <img
          src={user?.discord_avatar
            ? `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.discord_avatar}.png`
            : `https://ui-avatars.com/api/?name=${user?.discord_username || 'User'}&background=39ff14&color=0d0d1a`}
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-discord-dark z-50 p-4"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-green to-accent-yellow flex items-center justify-center">
                    <span className="text-sm font-bold text-discord-darker">C</span>
                  </div>
                  <span className="font-semibold neon-text">CIVRAT</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname.includes(item.path)
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(`/dashboard/${guildId}/${item.path}`)
                        setMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-white/5 text-neon-green border-l-2 border-neon-green'
                          : 'text-gray-300 hover:bg-white/5 hover:text-neon-green'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </button>
                  )
                })}
              </nav>
              <div className="absolute bottom-4 left-4 right-4">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 72 }}
          className="fixed left-0 top-0 bottom-0 bg-discord-dark border-r border-white/10 z-40 flex flex-col"
        >
          <div className="p-4 flex items-center justify-between h-16">
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-green to-accent-yellow flex items-center justify-center">
                    <span className="text-sm font-bold text-discord-darker">C</span>
                  </div>
                  <span className="font-semibold neon-text">CIVRAT</span>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-all"
            >
              <motion.div
                initial={false}
                animate={{ rotate: sidebarOpen ? 0 : 180 }}
              >
                <ChevronLeft className="w-5 h-5 text-gray-400" />
              </motion.div>
            </button>
          </div>

          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname.includes(item.path)
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(`/dashboard/${guildId}/${item.path}`)}
                  whileHover={{ x: 4 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/5 text-neon-green border-l-2 border-neon-green'
                      : 'text-gray-300 hover:bg-white/5 hover:text-neon-green'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="whitespace-nowrap"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <AnimatePresence>
              {sidebarOpen ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <img
                    src={user?.discord_avatar
                      ? `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.discord_avatar}.png`
                      : `https://ui-avatars.com/api/?name=${user?.discord_username || 'User'}&background=39ff14&color=0d0d1a`}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white truncate">{user?.discord_username}</div>
                    <div className="text-sm text-gray-400 truncate">Administrator</div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center"
                >
                  <button
                    onClick={handleSignOut}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>
      </div>

      {/* Main Content */}
      <main className="lg:ml-[280px] min-h-screen pt-16 lg:pt-0 transition-all duration-300">
        <motion.div
          initial={false}
          animate={{ marginLeft: !sidebarOpen ? 72 : 0 }}
          className="p-4 lg:p-8"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}
