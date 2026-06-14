import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Save, Link, MessageCircle, AtSign, TriangleAlert as AlertTriangle, Type } from 'lucide-react'
import { useI18n } from '../lib/i18n'

export default function AutoModPage() {
  const { t } = useI18n()
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
    { key: 'inviteLinks', icon: Link, label: 'Liens d\'invitation', desc: 'Bloquer les invitations Discord' },
    { key: 'spam', icon: MessageCircle, label: 'Protection Spam', desc: 'Empêcher le spam de messages' },
    { key: 'massMention', icon: AtSign, label: 'Mentions de masse', desc: 'Bloquer les mentions multiples' },
    { key: 'badWords', icon: AlertTriangle, label: 'Mots interdits', desc: 'Filtrer le langage inapproprié' },
    { key: 'caps', icon: Type, label: 'Majuscules excessives', desc: 'Bloquer les messages en majuscules' },
    { key: 'links', icon: Link, label: 'Tous les liens', desc: 'Bloquer tous les liens externes' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('autoMod.title')}</h1>
          <p className="text-gray-400">{t('autoMod.subtitle')}</p>
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
            <Shield className="w-6 h-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{t('autoMod.enable')}</h3>
            <p className="text-sm text-gray-400">{t('autoMod.enableDesc')}</p>
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
              <h3 className="text-lg font-semibold text-white mb-4">{t('logs.logChannel')}</h3>
              <select
                value={config.logChannel}
                onChange={(e) => setConfig({ ...config, logChannel: e.target.value })}
                className="input-field"
              >
                <option value="">{t('common.selectChannel')}</option>
                <option value="mod-log">👮 mod-log</option>
                <option value="automod">🤖 auto-mod</option>
              </select>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Rôle Muet</h3>
              <select
                value={config.muteRole}
                onChange={(e) => setConfig({ ...config, muteRole: e.target.value })}
                className="input-field"
              >
                <option value="">{t('common.selectRole')}</option>
                <option value="muted">🔇 Muet</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">{t('autoMod.filters')}</h3>
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
            <h3 className="text-lg font-semibold text-white mb-6">{t('autoMod.thresholds')}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('autoMod.spamThreshold')}
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
                  {t('autoMod.mentionThreshold')}
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
                  {t('autoMod.capsThreshold')}
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
