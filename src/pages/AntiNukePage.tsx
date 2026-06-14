import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Save, Shield, Trash2, Ban, UserX, Webhook, Smile, CircleAlert as AlertCircle } from 'lucide-react'
import { useI18n } from '../lib/i18n'

export default function AntiNukePage() {
  const [config, setConfig] = useState({
    enabled: true,
    logChannel: '',
    punishment: 'removeRoles',
    thresholds: {
      channelDelete: 3,
      roleDelete: 3,
      emojiDelete: 5,
      webhookDelete: 5,
      banCreate: 5,
      kickCreate: 5,
    },
    trustedAdmins: ['user1', 'user2'],
  })
  const { t } = useI18n()

  const actions = [
    { key: 'channelDelete', icon: Trash2, label: t('antiNuke.channelDelete') },
    { key: 'roleDelete', icon: Shield, label: t('antiNuke.roleDelete') },
    { key: 'emojiDelete', icon: Smile, label: t('antiNuke.emojiDelete') },
    { key: 'webhookDelete', icon: Webhook, label: t('antiNuke.webhookDelete') },
    { key: 'banCreate', icon: Ban, label: t('antiNuke.banCreate') },
    { key: 'kickCreate', icon: UserX, label: t('antiNuke.kickCreate') },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('antiNuke.title')}</h1>
          <p className="text-gray-400">{t('antiNuke.subtitle')}</p>
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
      <div className="glass-card p-6 border-2 border-red-500/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{t('antiNuke.enable')}</h3>
            <p className="text-sm text-gray-400">{t('antiNuke.enableDesc')}</p>
          </div>
          <button
            onClick={() => setConfig({ ...config, enabled: !config.enabled })}
            className={`w-14 h-8 rounded-full transition-all ${
              config.enabled ? 'bg-red-500' : 'bg-white/10'
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
          {/* Punishment */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('antiNuke.punishment')}</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'removeRoles', label: t('antiNuke.removeRoles') },
                { id: 'kick', label: t('antiNuke.kick') },
                { id: 'ban', label: t('antiNuke.ban') },
              ].map((punishment) => (
                <button
                  key={punishment.id}
                  onClick={() => setConfig({ ...config, punishment: punishment.id })}
                  className={`p-4 rounded-xl transition-all ${
                    config.punishment === punishment.id
                      ? 'bg-red-500/20 border-2 border-red-500 text-red-400'
                      : 'bg-white/5 border-2 border-transparent hover:border-white/20 text-gray-400'
                  }`}
                >
                  {punishment.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions & Thresholds */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-accent-yellow" />
              <h3 className="text-lg font-semibold text-white">{t('antiNuke.actions')}</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {actions.map((action) => (
                <div key={action.key} className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <action.icon className="w-5 h-5 text-red-400" />
                    <span className="text-sm font-medium text-white">{action.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={config.thresholds[action.key as keyof typeof config.thresholds]}
                      onChange={(e) => setConfig({
                        ...config,
                        thresholds: { ...config.thresholds, [action.key]: parseInt(e.target.value) }
                      })}
                      className="input-field w-20"
                    />
                    <span className="text-sm text-gray-400">/ 10 min</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trusted Admins */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-2">{t('antiNuke.trustedAdmins')}</h3>
            <p className="text-sm text-gray-400 mb-4">{t('antiNuke.trustedDesc')}</p>
            <button className="btn-secondary">+ Ajouter un Admin de Confiance</button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
