import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Save, Check, Languages } from 'lucide-react'
import { useI18n } from '../lib/i18n'

export default function LanguagesPage() {
  const { t } = useI18n()
  const [config, setConfig] = useState({
    defaultLanguage: 'fr',
    autoTranslate: false,
    availableLanguages: ['fr', 'en', 'es', 'de', 'ja'],
  })

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷', progress: 100 },
    { code: 'en', name: 'English', flag: '🇬🇧', progress: 100 },
    { code: 'es', name: 'Español', flag: '🇪🇸', progress: 95 },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', progress: 90 },
    { code: 'ja', name: '日本語', flag: '🇯🇵', progress: 85 },
    { code: 'ko', name: '한국어', flag: '🇰🇷', progress: 80 },
    { code: 'pt', name: 'Português', flag: '🇧🇷', progress: 100 },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', progress: 75 },
    { code: 'zh', name: '中文', flag: '🇨🇳', progress: 70 },
  ]

  const toggleLanguage = (code: string) => {
    if (config.availableLanguages.includes(code)) {
      if (config.availableLanguages.length > 1) {
        setConfig({
          ...config,
          availableLanguages: config.availableLanguages.filter((l) => l !== code),
        })
      }
    } else {
      setConfig({
        ...config,
        availableLanguages: [...config.availableLanguages, code],
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('languages.title')}</h1>
          <p className="text-gray-400">{t('languages.subtitle')}</p>
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

      {/* Default Language */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-green/5 flex items-center justify-center">
            <Globe className="w-6 h-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">{t('languages.default')}</h3>
            <select
              value={config.defaultLanguage}
              onChange={(e) => setConfig({ ...config, defaultLanguage: e.target.value })}
              className="input-field max-w-xs"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Auto Translate */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-yellow/20 to-accent-yellow/5 flex items-center justify-center">
            <Languages className="w-6 h-6 text-accent-yellow" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{t('languages.autoTranslate')}</h3>
            <p className="text-sm text-gray-400">{t('languages.autoTranslateDesc')}</p>
          </div>
          <button
            onClick={() => setConfig({ ...config, autoTranslate: !config.autoTranslate })}
            className={`w-14 h-8 rounded-full transition-all ${
              config.autoTranslate ? 'bg-neon-green' : 'bg-white/10'
            } relative`}
          >
            <motion.div
              initial={false}
              animate={{ x: config.autoTranslate ? 24 : 4 }}
              className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
            />
          </button>
        </div>
      </div>

      {/* Available Languages */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6">{t('languages.available')}</h3>
        <p className="text-sm text-gray-400 mb-6">
          {t('languages.availableDesc')}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((lang) => {
            const isEnabled = config.availableLanguages.includes(lang.code)
            const isDefault = config.defaultLanguage === lang.code

            return (
              <motion.div
                key={lang.code}
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleLanguage(lang.code)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  isEnabled
                    ? 'bg-neon-green/10 border border-neon-green/30'
                    : 'bg-white/5 border border-transparent hover:bg-white/10'
                } ${isDefault ? 'ring-2 ring-accent-yellow' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-white">{lang.name}</h4>
                      {isDefault && (
                        <span className="text-xs px-2 py-0.5 bg-accent-yellow/20 text-accent-yellow rounded-full">
                          Défaut
                        </span>
                      )}
                    </div>
                    <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-neon-green rounded-full"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{lang.progress}% {t('languages.translated')}</p>
                  </div>
                  {isEnabled && (
                    <Check className="w-5 h-5 text-neon-green" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
