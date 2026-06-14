import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Save, Check, Languages } from 'lucide-react'

export default function LanguagesPage() {
  const [config, setConfig] = useState({
    defaultLanguage: 'en',
    autoTranslate: false,
    availableLanguages: ['en', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ru', 'zh'],
  })

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', progress: 100 },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', progress: 100 },
    { code: 'fr', name: 'French', flag: '🇫🇷', progress: 95 },
    { code: 'de', name: 'German', flag: '🇩🇪', progress: 90 },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', progress: 85 },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', progress: 80 },
    { code: 'pt', name: 'Portuguese', flag: '🇧🇷', progress: 100 },
    { code: 'ru', name: 'Russian', flag: '🇷🇺', progress: 75 },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', progress: 70 },
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
          <h1 className="text-3xl font-bold text-white mb-2">Languages</h1>
          <p className="text-gray-400">Configure language settings and translations.</p>
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

      {/* Default Language */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-green/5 flex items-center justify-center">
            <Globe className="w-6 h-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Default Language</h3>
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
            <h3 className="text-lg font-semibold text-white">Auto Translation</h3>
            <p className="text-sm text-gray-400">Automatically translate bot messages</p>
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
        <h3 className="text-lg font-semibold text-white mb-6">Available Languages</h3>
        <p className="text-sm text-gray-400 mb-6">
          Select which languages are available for users to choose from.
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
                          Default
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
                    <p className="text-xs text-gray-400 mt-1">{lang.progress}% translated</p>
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
