import { useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, Save } from 'lucide-react'
import { useI18n } from '../lib/i18n'

export default function TempVoicePage() {
  const [config, setConfig] = useState({
    enabled: true,
    category: '',
    joinChannel: '',
    defaultName: '🔊 {user}',
    maxChannels: 3,
    autoLock: false,
    autoBitrate: true,
  })
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('tempVoice.title')}</h1>
          <p className="text-gray-400">{t('tempVoice.subtitle')}</p>
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
            <Volume2 className="w-6 h-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{t('tempVoice.enable')}</h3>
            <p className="text-sm text-gray-400">{t('tempVoice.enableDesc')}</p>
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
              <h3 className="text-lg font-semibold text-white mb-4">{t('tempVoice.category')}</h3>
              <select
                value={config.category}
                onChange={(e) => setConfig({ ...config, category: e.target.value })}
                className="input-field"
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="voice">🔊 Salons Vocaux</option>
                <option value="temp">🎤 Temporaires</option>
              </select>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t('tempVoice.joinChannel')}</h3>
              <select
                value={config.joinChannel}
                onChange={(e) => setConfig({ ...config, joinChannel: e.target.value })}
                className="input-field"
              >
                <option value="">Sélectionner un salon</option>
                <option value="create">🎤 Créer Salon</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">{t('tempVoice.joinDesc')}</p>
            </div>
          </div>

          {/* Name & Options */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Options du Salon</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('tempVoice.defaultName')}
                </label>
                <input
                  type="text"
                  value={config.defaultName}
                  onChange={(e) => setConfig({ ...config, defaultName: e.target.value })}
                  className="input-field"
                />
                <p className="text-xs text-gray-500 mt-2">Variables: {'{user}'}, {'{game}'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('tempVoice.maxChannels')}
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={config.maxChannels}
                  onChange={(e) => setConfig({ ...config, maxChannels: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">Auto-verrouillage</h4>
                  <p className="text-sm text-gray-400">Verrouiller automatiquement le salon</p>
                </div>
                <button
                  onClick={() => setConfig({ ...config, autoLock: !config.autoLock })}
                  className={`w-14 h-8 rounded-full transition-all ${
                    config.autoLock ? 'bg-neon-green' : 'bg-white/10'
                  } relative`}
                >
                  <motion.div
                    initial={false}
                    animate={{ x: config.autoLock ? 24 : 4 }}
                    className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">Auto-bitrate</h4>
                  <p className="text-sm text-gray-400">Ajuster le bitrate selon le jeu</p>
                </div>
                <button
                  onClick={() => setConfig({ ...config, autoBitrate: !config.autoBitrate })}
                  className={`w-14 h-8 rounded-full transition-all ${
                    config.autoBitrate ? 'bg-neon-green' : 'bg-white/10'
                  } relative`}
                >
                  <motion.div
                    initial={false}
                    animate={{ x: config.autoBitrate ? 24 : 4 }}
                    className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
