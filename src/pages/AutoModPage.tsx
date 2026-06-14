import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Save, Link, MessageCircle, AtSign, TriangleAlert as AlertTriangle, Type } from 'lucide-react'

export default function AutoModPage() {
  const [config, setConfig] = useState({
    enabled: true,
    logChannel: '',
    muteRole: '',
    inviteLinks: true,
    spam: true,
    massMention: true,
    badWords: true,
    caps: false,
    links: false,
    spamThreshold: 5,
    mentionThreshold: 5,
    capsThreshold: 70,
  })

  const filters = [
    { key: 'inviteLinks', icon: Link, label: 'Invite Links', desc: 'Block Discord invite links' },
    { key: 'spam', icon: MessageCircle, label: 'Spam Protection', desc: 'Prevent message spam' },
    { key: 'massMention', icon: AtSign, label: 'Mass Mention', desc: 'Block mass mentioning' },
    { key: 'badWords', icon: AlertTriangle, label: 'Bad Words', desc: 'Filter inappropriate language' },
    { key: 'caps', icon: Type, label: 'Excessive Caps', desc: 'Block messages with too many caps' },
    { key: 'links', icon: Link, label: 'All Links', desc: 'Block all external links' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Auto Moderation</h1>
          <p className="text-gray-400">Automatically moderate your server.</p>
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
            <Shield className="w-6 h-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Enable Auto Moderation</h3>
            <p className="text-sm text-gray-400">Automatically filter and moderate messages</p>
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
          {/* Basic Settings */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Log Channel</h3>
              <select
                value={config.logChannel}
                onChange={(e) => setConfig({ ...config, logChannel: e.target.value })}
                className="input-field"
              >
                <option value="">Select a channel</option>
                <option value="mod-log">👮 mod-log</option>
                <option value="automod">🤖 auto-mod</option>
              </select>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Mute Role</h3>
              <select
                value={config.muteRole}
                onChange={(e) => setConfig({ ...config, muteRole: e.target.value })}
                className="input-field"
              >
                <option value="">Select a role</option>
                <option value="muted">🔇 Muted</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Auto Moderation Filters</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filters.map((filter) => {
                const isEnabled = config[filter.key as keyof typeof config] as boolean
                return (
                  <div
                    key={filter.key}
                    onClick={() => setConfig({ ...config, [filter.key]: !isEnabled })}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      isEnabled
                        ? 'bg-neon-green/10 border border-neon-green/30'
                        : 'bg-white/5 border border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <filter.icon className={`w-5 h-5 ${isEnabled ? 'text-neon-green' : 'text-gray-400'}`} />
                      <h4 className="font-medium text-white">{filter.label}</h4>
                    </div>
                    <p className="text-sm text-gray-400">{filter.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Thresholds */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Thresholds</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Spam Threshold (messages)
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={config.spamThreshold}
                  onChange={(e) => setConfig({ ...config, spamThreshold: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mention Threshold
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={config.mentionThreshold}
                  onChange={(e) => setConfig({ ...config, mentionThreshold: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Caps Threshold (%)
                </label>
                <input
                  type="number"
                  min={50}
                  max={100}
                  value={config.capsThreshold}
                  onChange={(e) => setConfig({ ...config, capsThreshold: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
