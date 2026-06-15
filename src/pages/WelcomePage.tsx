import { motion } from 'framer-motion'
import { Bot, UserPlus, UserMinus, Save, RotateCcw, Eye, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useGuildConfig } from '../lib/useGuildConfig'

interface WelcomeConfig {
  enabled: boolean
  welcomeChannel: string
  goodbyeChannel: string
  welcomeMessage: string
  goodbyeMessage: string
  dmWelcome: boolean
  dmMessage: string
}

const defaultConfig: WelcomeConfig = {
  enabled: true,
  welcomeChannel: '',
  goodbyeChannel: '',
  welcomeMessage: 'Bienvenue sur le serveur, {user} !',
  goodbyeMessage: '{user} a quitté le serveur.',
  dmWelcome: false,
  dmMessage: 'Bienvenue sur notre serveur Discord !',
}

export default function WelcomePage() {
  const { t } = useI18n()
  const {
    config,
    setConfig,
    saveConfig,
    loading,
    saving,
    saveSuccess,
    error
  } = useGuildConfig<WelcomeConfig>('welcome_config', defaultConfig)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('welcome.title')}</h1>
          <p className="text-gray-400">{t('welcome.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-neon-green text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              {t('common.savedSuccess')}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={saveConfig}
            disabled={saving || loading}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? t('common.saving') : t('common.save')}
          </motion.button>
        </div>
      </div>

      {/* Enable Toggle */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-green/5 flex items-center justify-center">
            <Bot className="w-6 h-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{t('welcome.enableTitle')}</h3>
            <p className="text-sm text-gray-400">{t('welcome.enableDesc')}</p>
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

      {/* Welcome Settings */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <UserPlus className="w-5 h-5 text-neon-green" />
            <h3 className="text-lg font-semibold text-white">{t('welcome.welcomeMessage')}</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('welcome.welcomeChannel')}
              </label>
              <select
                value={config.welcomeChannel}
                onChange={(e) => setConfig({ ...config, welcomeChannel: e.target.value })}
                className="input-field"
              >
                <option value="">{t('common.selectChannel')}</option>
                <option value="welcome">👋 bienvenue</option>
                <option value="general">💬 general</option>
                <option value="rules">📜 regles</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('welcome.welcomeMessage')}
              </label>
              <textarea
                value={config.welcomeMessage}
                onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                rows={3}
                className="input-field resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {t('welcome.variables')}
              </p>
            </div>

            <button className="btn-secondary flex items-center gap-2 text-sm">
              <Eye className="w-4 h-4" />
              {t('common.preview')}
            </button>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <UserMinus className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-white">{t('welcome.goodbyeMessage')}</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('welcome.goodbyeChannel')}
              </label>
              <select
                value={config.goodbyeChannel}
                onChange={(e) => setConfig({ ...config, goodbyeChannel: e.target.value })}
                className="input-field"
              >
                <option value="">{t('common.selectChannel')}</option>
                <option value="leaves">👋 departs</option>
                <option value="general">💬 general</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('welcome.goodbyeMessage')}
              </label>
              <textarea
                value={config.goodbyeMessage}
                onChange={(e) => setConfig({ ...config, goodbyeMessage: e.target.value })}
                rows={3}
                className="input-field resize-none"
              />
            </div>

            <button className="btn-secondary flex items-center gap-2 text-sm">
              <Eye className="w-4 h-4" />
              {t('common.preview')}
            </button>
          </div>
        </div>
      </div>

      {/* DM Welcome */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">{t('welcome.dmWelcome')}</h3>
            <p className="text-sm text-gray-400">{t('welcome.dmDesc')}</p>
          </div>
          <button
            onClick={() => setConfig({ ...config, dmWelcome: !config.dmWelcome })}
            className={`w-14 h-8 rounded-full transition-all ${
              config.dmWelcome ? 'bg-neon-green' : 'bg-white/10'
            } relative`}
          >
            <motion.div
              initial={false}
              animate={{ x: config.dmWelcome ? 24 : 4 }}
              className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
            />
          </button>
        </div>

        {config.dmWelcome && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 pt-6 border-t border-white/10"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('welcome.dmMessage')}
              </label>
              <textarea
                value={config.dmMessage}
                onChange={(e) => setConfig({ ...config, dmMessage: e.target.value })}
                rows={4}
                className="input-field resize-none"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setConfig(defaultConfig)}
          className="btn-secondary flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          {t('common.reset')}
        </button>
      </div>
    </div>
  )
}
