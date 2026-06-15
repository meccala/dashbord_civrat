import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldAlert, Save, TriangleAlert as AlertTriangle, UserX, Shield } from 'lucide-react'
import { useI18n } from '../lib/i18n'

export default function SecurityPage() {
  const { t } = useI18n()
  const [config, setConfig] = useState({
    enabled: true,
    logChannel: '',
    raidProtection: true,
    newAccountProtection: true,
    joinRate: 10,
    accountAge: 7,
    autoBan: false,
    quarantineRole: '',
    alertRole: '',
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('security.title')}</h1>
          <p className="text-gray-400">{t('security.subtitle')}</p>
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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{t('security.enable')}</h3>
            <p className="text-sm text-gray-400">{t('security.enableDesc')}</p>
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
          {/* Alert Channel */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('security.logChannel')}</h3>
            <select
              value={config.logChannel}
              onChange={(e) => setConfig({ ...config, logChannel: e.target.value })}
              className="input-field"
            >
              <option value="">{t('common.selectChannel')}</option>
              <option value="alerts">🚨 security-alerts</option>
              <option value="mod-log">👮 mod-log</option>
            </select>
          </div>

          {/* Protection Options */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{t('security.raidProtection')}</h4>
                    <button
                      onClick={() => setConfig({ ...config, raidProtection: !config.raidProtection })}
                      className={`w-14 h-8 rounded-full transition-all ${
                        config.raidProtection ? 'bg-neon-green' : 'bg-white/10'
                      } relative`}
                    >
                      <motion.div
                        initial={false}
                        animate={{ x: config.raidProtection ? 24 : 4 }}
                        className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{t('security.raidDesc')}</p>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('security.joinRate')}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={config.joinRate}
                      onChange={(e) => setConfig({ ...config, joinRate: parseInt(e.target.value) })}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent-yellow/10 flex items-center justify-center">
                  <UserX className="w-5 h-5 text-accent-yellow" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{t('security.newAccountProtection')}</h4>
                    <button
                      onClick={() => setConfig({ ...config, newAccountProtection: !config.newAccountProtection })}
                      className={`w-14 h-8 rounded-full transition-all ${
                        config.newAccountProtection ? 'bg-neon-green' : 'bg-white/10'
                      } relative`}
                    >
                      <motion.div
                        initial={false}
                        animate={{ x: config.newAccountProtection ? 24 : 4 }}
                        className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{t('security.newAccountDesc')}</p>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('security.accountAge')}
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={365}
                      value={config.accountAge}
                      onChange={(e) => setConfig({ ...config, accountAge: parseInt(e.target.value) })}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quarantine Settings */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-neon-green" />
              <h3 className="text-lg font-semibold text-white">{t('common.quarantineSettings')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('security.quarantineRole')}
                </label>
                <select
                  value={config.quarantineRole}
                  onChange={(e) => setConfig({ ...config, quarantineRole: e.target.value })}
                  className="input-field"
                >
                  <option value="">{t('common.selectRole')}</option>
                  <option value="quarantine">🔒 Quarantaine</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('security.alertRole')}
                </label>
                <select
                  value={config.alertRole}
                  onChange={(e) => setConfig({ ...config, alertRole: e.target.value })}
                  className="input-field"
                >
                  <option value="">{t('common.selectRole')}</option>
                  <option value="moderator">👮 Modérateur</option>
                  <option value="admin">👑 Admin</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
