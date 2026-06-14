import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Save, Globe, Bell, Terminal, TriangleAlert as AlertTriangle, Trash2, Shield } from 'lucide-react'
import { useI18n } from '../lib/i18n'

export default function SettingsPage() {
  const { t, language, setLanguage } = useI18n()
  const [config, setConfig] = useState({
    timezone: 'Europe/Paris',
    notifications: true,
    prefix: '!',
    darkMode: true,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('settings.title')}</h1>
          <p className="text-gray-400">{t('settings.subtitle')}</p>
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

      {/* General Settings */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-5 h-5 text-neon-green" />
          <h3 className="text-lg font-semibold text-white">{t('settings.general')}</h3>
        </div>

        <div className="space-y-6">
          {/* Language */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <div>
                <h4 className="font-medium text-white">{t('settings.language')}</h4>
                <p className="text-sm text-gray-400">{t('settings.languageDesc')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setLanguage('fr')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  language === 'fr' ? 'bg-neon-green text-discord-darker font-medium' : 'text-gray-400 hover:text-white'
                }`}
              >
                Français
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  language === 'en' ? 'bg-neon-green text-discord-darker font-medium' : 'text-gray-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Timezone */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <h4 className="font-medium text-white">{t('settings.timezone')}</h4>
              <p className="text-sm text-gray-400">Fuseau horaire pour les logs et statistiques</p>
            </div>
            <select
              value={config.timezone}
              onChange={(e) => setConfig({ ...config, timezone: e.target.value })}
              className="input-field w-48"
            >
              <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
              <option value="America/New_York">America/New York (UTC-5)</option>
              <option value="America/Los_Angeles">America/LA (UTC-8)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <div>
                <h4 className="font-medium text-white">{t('settings.notifications')}</h4>
                <p className="text-sm text-gray-400">{t('settings.notifyDesc')}</p>
              </div>
            </div>
            <button
              onClick={() => setConfig({ ...config, notifications: !config.notifications })}
              className={`w-14 h-8 rounded-full transition-all ${
                config.notifications ? 'bg-neon-green' : 'bg-white/10'
              } relative`}
            >
              <motion.div
                initial={false}
                animate={{ x: config.notifications ? 24 : 4 }}
                className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
              />
            </button>
          </div>

          {/* Bot Prefix */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-gray-400" />
              <div>
                <h4 className="font-medium text-white">{t('settings.prefix')}</h4>
                <p className="text-sm text-gray-400">{t('settings.prefixDesc')}</p>
              </div>
            </div>
            <input
              type="text"
              value={config.prefix}
              onChange={(e) => setConfig({ ...config, prefix: e.target.value })}
              className="input-field w-20 text-center"
              maxLength={3}
            />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card p-6 border-2 border-red-500/30">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-semibold text-red-400">{t('settings.dangerZone')}</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-500/5 rounded-lg border border-red-500/20">
            <div>
              <h4 className="font-medium text-white">{t('settings.resetConfig')}</h4>
              <p className="text-sm text-gray-400">{t('settings.resetDesc')}</p>
            </div>
            <button className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all">
              {t('settings.resetConfig')}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-500/5 rounded-lg border border-red-500/20">
            <div>
              <h4 className="font-medium text-white">{t('settings.removeBot')}</h4>
              <p className="text-sm text-gray-400">{t('settings.removeDesc')}</p>
            </div>
            <button className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              {t('settings.removeBot')}
            </button>
          </div>
        </div>
      </div>

      {/* Server Info */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-neon-green" />
          <h3 className="text-lg font-semibold text-white">Informations du Serveur</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">ID du Serveur:</span>
            <span className="text-white ml-2 font-mono">123456789012345678</span>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Bot rejoint:</span>
            <span className="text-white ml-2">14 juin 2024</span>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Fonctionnalités:</span>
            <span className="text-neon-green ml-2">15 activées</span>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Dernière sauvegarde:</span>
            <span className="text-white ml-2">14 juin 2024 10:30</span>
          </div>
        </div>
      </div>
    </div>
  )
}
