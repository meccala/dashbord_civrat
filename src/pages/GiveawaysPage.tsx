import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Clock, Users, Plus, Trash2, Gift as GiftIcon } from 'lucide-react'

interface Giveaway {
  id: string
  title: string
  prize: string
  winners: number
  duration: number
  roleRequirement: string
  channelId: string
  status: 'active' | 'ended'
}

export default function GiveawaysPage() {
  const [config, setConfig] = useState({
    enabled: true,
    defaultDuration: 86400,
    defaultWinners: 1,
    defaultRoleRequirement: '',
  })

  const [activeGiveaways] = useState<Giveaway[]>([
    {
      id: '1',
      title: 'Discord Nitro Giveaway',
      prize: '1 Month Discord Nitro',
      winners: 1,
      duration: 86400,
      roleRequirement: '',
      channelId: 'giveaways',
      status: 'active',
    },
    {
      id: '2',
      title: 'Gaming Peripherals',
      prize: 'SteelSeries Mouse',
      winners: 3,
      duration: 172800,
      roleRequirement: 'member',
      channelId: 'giveaways',
      status: 'active',
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Giveaways</h1>
          <p className="text-gray-400">Create and manage server giveaways.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Giveaway
        </motion.button>
      </div>

      {/* Enable Toggle */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-green/5 flex items-center justify-center">
            <Gift className="w-6 h-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Enable Giveaways</h3>
            <p className="text-sm text-gray-400">Allow giveaway creation in the server</p>
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
          {/* Default Settings */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-semibold text-white">Default Duration</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">Duration in hours</p>
              <input
                type="number"
                min={1}
                max={168}
                defaultValue={config.defaultDuration / 3600}
                className="input-field"
              />
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-semibold text-white">Default Winners</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">Number of winners</p>
              <input
                type="number"
                min={1}
                max={50}
                value={config.defaultWinners}
                onChange={(e) => setConfig({ ...config, defaultWinners: parseInt(e.target.value) })}
                className="input-field"
              />
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <GiftIcon className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-semibold text-white">Default Role Req.</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">Required role to participate</p>
              <select
                value={config.defaultRoleRequirement}
                onChange={(e) => setConfig({ ...config, defaultRoleRequirement: e.target.value })}
                className="input-field"
              >
                <option value="">None (Everyone)</option>
                <option value="member">👤 Member</option>
                <option value="booster"> Booster</option>
              </select>
            </div>
          </div>

          {/* Active Giveaways */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Active Giveaways</h3>
            <div className="space-y-4">
              {activeGiveaways.map((giveaway) => (
                <div
                  key={giveaway.id}
                  className="p-4 bg-white/5 rounded-xl flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-yellow/20 to-accent-yellow/5 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-accent-yellow" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{giveaway.title}</h4>
                    <p className="text-sm text-gray-400">{giveaway.prize}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-neon-green">{giveaway.winners} winner(s)</div>
                    <div className="text-gray-400">
                      {Math.round(giveaway.duration / 3600)}h remaining
                    </div>
                  </div>
                  <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Create New Modal Preview */}
          <div className="glass-card p-6 border border-neon-green/30">
            <div className="border-b border-white/10 pb-4 mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-neon-green" />
                New Giveaway Preview
              </h3>
            </div>
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-r from-neon-green/10 to-accent-yellow/10 rounded-xl p-6 text-center">
                <Gift className="w-10 h-10 text-accent-yellow mx-auto mb-3" />
                <h4 className="text-xl font-bold text-white mb-2">Discord Nitro Giveaway</h4>
                <p className="text-gray-300 mb-4">1 Month Discord Nitro</p>
                <div className="flex justify-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> 1 winner
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> 24h
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 px-6 py-2 bg-neon-green text-discord-darker font-semibold rounded-lg"
                >
                  Enter Giveaway
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
