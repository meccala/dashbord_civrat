import { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollText, MessageSquare, Mic, Users, Shield, Server, Save } from 'lucide-react'

export default function LogsPage() {
  const [config, setConfig] = useState({
    enabled: true,
    channel: '',
    logMessages: true,
    logVoice: true,
    logMembers: true,
    logMod: true,
    logServer: true,
  })

  const logTypes = [
    { key: 'logMessages', icon: MessageSquare, label: 'Message Events', desc: 'Message edits, deletions, pins' },
    { key: 'logVoice', icon: Mic, label: 'Voice Events', desc: 'Join, leave, switch channels' },
    { key: 'logMembers', icon: Users, label: 'Member Events', desc: 'Joins, leaves, bans, unbans' },
    { key: 'logMod', icon: Shield, label: 'Moderation Events', desc: 'Kicks, bans, mutes, warns' },
    { key: 'logServer', icon: Server, label: 'Server Events', desc: 'Role, channel, emoji changes' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Server Logs</h1>
          <p className="text-gray-400">Track all server events in a dedicated channel.</p>
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
            <ScrollText className="w-6 h-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Enable Logging</h3>
            <p className="text-sm text-gray-400">Log server events to a channel</p>
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
          className="space-y-6"
        >
          {/* Log Channel */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Log Channel</h3>
            <select
              value={config.channel}
              onChange={(e) => setConfig({ ...config, channel: e.target.value })}
              className="input-field"
            >
              <option value="">Select a channel</option>
              <option value="logs">📋 server-logs</option>
              <option value="audit">🔍 audit-log</option>
              <option value="mod">👮 mod-log</option>
            </select>
          </div>

          {/* Event Types */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {logTypes.map((item) => {
              const isEnabled = config[item.key as keyof typeof config] as boolean
              return (
                <motion.div
                  key={item.key}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setConfig({ ...config, [item.key]: !isEnabled })}
                  className={`glass-card p-6 cursor-pointer transition-all ${
                    isEnabled ? 'border-neon-green/30' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isEnabled ? 'bg-neon-green/20' : 'bg-white/5'
                    }`}>
                      <item.icon className={`w-5 h-5 ${isEnabled ? 'text-neon-green' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white">{item.label}</h4>
                        <button
                          className={`w-10 h-6 rounded-full transition-all ${
                            isEnabled ? 'bg-neon-green' : 'bg-white/10'
                          } relative`}
                        >
                          <motion.div
                            initial={false}
                            animate={{ x: isEnabled ? 16 : 2 }}
                            className="w-4 h-4 bg-white rounded-full shadow-md absolute top-1"
                          />
                        </button>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}
