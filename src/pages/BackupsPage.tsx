import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Save, Download, RotateCcw, Trash2, Clock, HardDrive, Check } from 'lucide-react'
import { useI18n } from '../lib/i18n'

export default function BackupsPage() {
  const [config, setConfig] = useState({
    enabled: true,
    frequency: 'weekly',
    retention: 30,
    includeMessages: false,
    includeRoles: true,
    includeChannels: true,
    includeSettings: true,
  })
  const { t } = useI18n()

  const backups = [
    { id: '1', date: '2024-06-14 10:30', size: '2.4 MB', type: 'auto' },
    { id: '2', date: '2024-06-07 10:30', size: '2.3 MB', type: 'auto' },
    { id: '3', date: '2024-06-01 15:45', size: '2.1 MB', type: 'manual' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('backups.title')}</h1>
          <p className="text-gray-400">{t('backups.subtitle')}</p>
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
            <Database className="w-6 h-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{t('backups.enable')}</h3>
            <p className="text-sm text-gray-400">{t('backups.enableDesc')}</p>
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
          {/* Backup Settings */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-semibold text-white">{t('backups.frequency')}</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'daily', label: t('backups.daily') },
                  { id: 'weekly', label: t('backups.weekly') },
                  { id: 'monthly', label: t('backups.monthly') },
                ].map((freq) => (
                  <button
                    key={freq.id}
                    onClick={() => setConfig({ ...config, frequency: freq.id })}
                    className={`p-3 rounded-lg transition-all ${
                      config.frequency === freq.id
                        ? 'bg-neon-green/20 border-2 border-neon-green text-neon-green'
                        : 'bg-white/5 border-2 border-transparent text-gray-400 hover:border-white/20'
                    }`}
                  >
                    {freq.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <HardDrive className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-semibold text-white">Rétention</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Garder les sauvegardes pendant (jours)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={365}
                    value={config.retention}
                    onChange={(e) => setConfig({ ...config, retention: parseInt(e.target.value) })}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* What to backup */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Contenu de la sauvegarde</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { key: 'includeRoles', label: 'Rôles', desc: 'Rôles et permissions' },
                { key: 'includeChannels', label: 'Salons', desc: 'Structure des salons' },
                { key: 'includeSettings', label: 'Paramètres', desc: 'Configuration du bot' },
                { key: 'includeMessages', label: 'Messages', desc: 'Messages récents (Premium)' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setConfig({ ...config, [item.key]: !config[item.key as keyof typeof config] })}
                  className={`p-4 rounded-xl text-left transition-all ${
                    config[item.key as keyof typeof config]
                      ? 'bg-neon-green/10 border border-neon-green/30'
                      : 'bg-white/5 border border-transparent hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{item.label}</span>
                    {config[item.key as keyof typeof config] && (
                      <Check className="w-5 h-5 text-neon-green" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Create Manual Backup */}
          <div className="glass-card p-6 border-neon-green/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{t('backups.create')}</h3>
                <p className="text-sm text-gray-400">Créer une sauvegarde manuelle maintenant</p>
              </div>
              <button className="btn-primary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Sauvegarder
              </button>
            </div>
          </div>

          {/* Backup History */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">{t('backups.history')}</h3>
            <div className="space-y-3">
              {backups.map((backup) => (
                <div
                  key={backup.id}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-lg bg-neon-green/10 flex items-center justify-center">
                    <Database className="w-5 h-5 text-neon-green" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{backup.date}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        backup.type === 'manual' ? 'bg-accent-yellow/20 text-accent-yellow' : 'bg-white/10 text-gray-400'
                      }`}>
                        {backup.type === 'manual' ? 'Manuel' : 'Auto'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">{t('backups.size')}: {backup.size}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-neon-green hover:bg-neon-green/10 rounded-lg transition-all">
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
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
