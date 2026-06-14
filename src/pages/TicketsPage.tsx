import { useState } from 'react'
import { motion } from 'framer-motion'
import { Ticket, Save, Users, MessageSquare } from 'lucide-react'

export default function TicketsPage() {
  const [config, setConfig] = useState({
    enabled: true,
    category: '',
    maxTickets: 3,
    creationMessage: 'Ticket created! Support will be with you shortly.',
    closeMessage: 'This ticket has been closed.',
    supportRoles: [] as string[],
    logChannel: '',
  })

  const availableRoles = [
    { id: '1', name: 'Admin', color: '#ff0000' },
    { id: '2', name: 'Moderator', color: '#00ff00' },
    { id: '3', name: 'Support', color: '#0000ff' },
    { id: '4', name: 'Helper', color: '#ffff00' },
  ]

  const toggleRole = (roleId: string) => {
    setConfig({
      ...config,
      supportRoles: config.supportRoles.includes(roleId)
        ? config.supportRoles.filter((r) => r !== roleId)
        : [...config.supportRoles, roleId],
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Ticket System</h1>
          <p className="text-gray-400">Configure support tickets for your server.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </motion.button>
      </div>

      {/* Enable Toggle */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-green/5 flex items-center justify-center">
            <Ticket className="w-6 h-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Enable Ticket System</h3>
            <p className="text-sm text-gray-400">Allow members to create support tickets</p>
          </div>
          <button
            onClick={() => setConfig({ ...config, enabled: !config.enabled })}
            className={`w-14 h-8 rounded-full transition-all ${
              config.enabled ? 'bg-neon-green' : 'bg-white/10'
            } relative`}
          >
            <motion.div
              initial={false}
              animate={{ x: config.enabled ? 24 : 4 }}
              className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
            />
          </button>
        </div>
      </div>

      {config.enabled && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Basic Settings */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Basic Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Ticket Category
                </label>
                <select
                  value={config.category}
                  onChange={(e) => setConfig({ ...config, category: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select a category</option>
                  <option value="support">🎫 Tickets</option>
                  <option value="help">❓ Help</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Tickets Per User
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={config.maxTickets}
                  onChange={(e) => setConfig({ ...config, maxTickets: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Log Channel
                </label>
                <select
                  value={config.logChannel}
                  onChange={(e) => setConfig({ ...config, logChannel: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select a channel</option>
                  <option value="ticket-logs">📋 ticket-logs</option>
                  <option value="mods">👮 mod-log</option>
                </select>
              </div>
            </div>
          </div>

          {/* Support Roles */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-neon-green" />
              <h3 className="text-lg font-semibold text-white">Support Roles</h3>
            </div>
            <div className="space-y-2">
              {availableRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => toggleRole(role.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    config.supportRoles.includes(role.id)
                      ? 'bg-neon-green/10 border border-neon-green/30'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: role.color }}
                  />
                  <span className="flex-1 text-left text-white">{role.name}</span>
                  {config.supportRoles.includes(role.id) && (
                    <span className="text-xs text-neon-green font-medium">Selected</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="glass-card p-6 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-neon-green" />
              <h3 className="text-lg font-semibold text-white">Ticket Messages</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Creation Message
                </label>
                <textarea
                  value={config.creationMessage}
                  onChange={(e) => setConfig({ ...config, creationMessage: e.target.value })}
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Close Message
                </label>
                <textarea
                  value={config.closeMessage}
                  onChange={(e) => setConfig({ ...config, closeMessage: e.target.value })}
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
