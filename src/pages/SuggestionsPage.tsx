import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Save, ThumbsUp, MessageSquare, Check, X } from 'lucide-react'
import { useI18n } from '../lib/i18n'

export default function SuggestionsPage() {
  const { t } = useI18n()
  const [config, setConfig] = useState({
    enabled: true,
    channelId: '',
    approvedChannelId: '',
    deniedChannelId: '',
    upvoteEmoji: '👍',
    downvoteEmoji: '👎',
    autoApprove: false,
    autoApproveThreshold: 10,
  })

  const [activeSuggestions] = useState([
    { id: '1', title: 'Ajouter un bot musical', votes: 15, status: 'pending' },
    { id: '2', title: 'Créer un salon gaming', votes: 42, status: 'approved' },
    { id: '3', title: 'Ajouter des rôles automatiques', votes: 8, status: 'pending' },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('suggestions.title')}</h1>
          <p className="text-gray-400">{t('suggestions.subtitle')}</p>
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
            <Lightbulb className="w-6 h-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{t('suggestions.enable')}</h3>
            <p className="text-sm text-gray-400">{t('suggestions.enableDesc')}</p>
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
          {/* Channel Settings */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-semibold text-white">{t('suggestions.channel')}</h3>
              </div>
              <select
                value={config.channelId}
                onChange={(e) => setConfig({ ...config, channelId: e.target.value })}
                className="input-field"
              >
                <option value="">{t('common.selectChannel')}</option>
                <option value="suggestions">💡 suggestions</option>
                <option value="ideas">💭 idees</option>
              </select>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Check className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-semibold text-white">{t('suggestions.approvedChannel')}</h3>
              </div>
              <select
                value={config.approvedChannelId}
                onChange={(e) => setConfig({ ...config, approvedChannelId: e.target.value })}
                className="input-field"
              >
                <option value="">{t('common.selectChannel')}</option>
                <option value="approved-suggestions">✅ approuvees</option>
              </select>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <X className="w-5 h-5 text-red-400" />
                <h3 className="text-lg font-semibold text-white">{t('suggestions.deniedChannel')}</h3>
              </div>
              <select
                value={config.deniedChannelId}
                onChange={(e) => setConfig({ ...config, deniedChannelId: e.target.value })}
                className="input-field"
              >
                <option value="">{t('common.selectChannel')}</option>
                <option value="denied-suggestions">❌ refusees</option>
              </select>
            </div>
          </div>

          {/* Emoji Settings */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">{t('suggestions.emojis')}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('suggestions.upvote')}
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-2xl">
                    {config.upvoteEmoji}
                  </div>
                  <input
                    type="text"
                    value={config.upvoteEmoji}
                    onChange={(e) => setConfig({ ...config, upvoteEmoji: e.target.value })}
                    className="input-field"
                    maxLength={2}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('suggestions.downvote')}
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-2xl">
                    {config.downvoteEmoji}
                  </div>
                  <input
                    type="text"
                    value={config.downvoteEmoji}
                    onChange={(e) => setConfig({ ...config, downvoteEmoji: e.target.value })}
                    className="input-field"
                    maxLength={2}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Auto Approve */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{t('suggestions.autoApprove')}</h3>
                <p className="text-sm text-gray-400">
                  {t('suggestions.autoApproveDesc')}
                </p>
              </div>
              <button
                onClick={() => setConfig({ ...config, autoApprove: !config.autoApprove })}
                className={`w-14 h-8 rounded-full transition-all ${
                  config.autoApprove ? 'bg-neon-green' : 'bg-white/10'
                } relative`}
              >
                <motion.div
                  initial={false}
                  animate={{ x: config.autoApprove ? 24 : 4 }}
                  className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
                />
              </button>
            </div>

            {config.autoApprove && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-white/10"
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('suggestions.voteThreshold')}
                </label>
                <input
                  type="number"
                  min={5}
                  max={100}
                  value={config.autoApproveThreshold}
                  onChange={(e) => setConfig({ ...config, autoApproveThreshold: parseInt(e.target.value) })}
                  className="input-field max-w-xs"
                />
              </motion.div>
            )}
          </div>

          {/* Recent Suggestions */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">{t('suggestions.recent')}</h3>
            <div className="space-y-3">
              {activeSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-4 bg-white/5 rounded-xl flex items-center gap-4"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{suggestion.title}</h4>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-neon-green">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{suggestion.votes}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        suggestion.status === 'approved'
                          ? 'bg-neon-green/20 text-neon-green'
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      {suggestion.status === 'approved' ? t('suggestions.approved') : t('suggestions.pending')}
                    </span>
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
