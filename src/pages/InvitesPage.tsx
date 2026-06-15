import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link2, Save, TrendingUp, Crown, Medal, RefreshCw } from 'lucide-react'
import { useI18n } from '../lib/i18n'

export default function InvitesPage() {
  const { t } = useI18n()
  const [config, setConfig] = useState({
    enabled: true,
    joinMessage: 'Bienvenue {user} ! Tu as été invité par {inviter} ({invites} invitations)',
    showLeaderboard: true,
    trackFake: true,
    trackLeaves: true,
  })

  const leaderboard = [
    { rank: 1, name: 'Admin', invites: 156, valid: 145, fake: 11 },
    { rank: 2, name: 'Moderator1', invites: 89, valid: 85, fake: 4 },
    { rank: 3, name: 'HelperBot', invites: 67, valid: 65, fake: 2 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('invites.title')}</h1>
          <p className="text-gray-400">{t('invites.subtitle')}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {t('common.save')}
        </motion.button>
      </div>

      {/* Enable Toggle */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-green/5 flex items-center justify-center">
            <Link2 className="w-6 h-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{t('invites.enable')}</h3>
            <p className="text-sm text-gray-400">{t('invites.enableDesc')}</p>
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
          {/* Join Message */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('invites.joinMessage')}</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('invites.joinMessageDesc')}
              </label>
              <textarea
                value={config.joinMessage}
                onChange={(e) => setConfig({ ...config, joinMessage: e.target.value })}
                rows={3}
                className="input-field resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                Variables: {'{user}'}, {'{inviter}'}, {'{invites}'}, {'{server}'}
              </p>
            </div>
          </div>

          {/* Tracking Options */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">{t('invites.trackFake')}</h4>
                  <p className="text-sm text-gray-400">{t('invites.trackFakeDesc')}</p>
                </div>
                <button
                  onClick={() => setConfig({ ...config, trackFake: !config.trackFake })}
                  className={`w-14 h-8 rounded-full transition-all ${
                    config.trackFake ? 'bg-neon-green' : 'bg-white/10'
                  } relative`}
                >
                  <motion.div
                    initial={false}
                    animate={{ x: config.trackFake ? 24 : 4 }}
                    className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
                  />
                </button>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">{t('invites.trackLeaves')}</h4>
                  <p className="text-sm text-gray-400">{t('invites.trackLeavesDesc')}</p>
                </div>
                <button
                  onClick={() => setConfig({ ...config, trackLeaves: !config.trackLeaves })}
                  className={`w-14 h-8 rounded-full transition-all ${
                    config.trackLeaves ? 'bg-neon-green' : 'bg-white/10'
                  } relative`}
                >
                  <motion.div
                    initial={false}
                    animate={{ x: config.trackLeaves ? 24 : 4 }}
                    className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-semibold text-white">{t('invites.leaderboard')}</h3>
              </div>
              <button className="btn-secondary flex items-center gap-2 text-sm">
                <RefreshCw className="w-4 h-4" />
                {t('common.refresh')}
              </button>
            </div>

            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-accent-yellow' :
                    index === 1 ? 'bg-gray-400' :
                    'bg-amber-600'
                  }`}>
                    {index === 0 ? <Crown className="w-5 h-5 text-discord-darker" /> :
                     index === 1 ? <Medal className="w-5 h-5 text-discord-darker" /> :
                     <Medal className="w-5 h-5 text-discord-darker" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{user.name}</h4>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>{t('invites.totalInvites')}: <span className="text-neon-green">{user.invites}</span></span>
                      <span>{t('invites.validInvites')}: {user.valid}</span>
                      <span>{t('invites.fakeInvites')}: {user.fake}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
