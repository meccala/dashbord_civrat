import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Save, Plus, Trash2, Eye, Copy, Send, Image, Clock } from 'lucide-react'
import { useI18n } from '../lib/i18n'

export default function EmbedBuilderPage() {
  const { t } = useI18n()
  const [embed, setEmbed] = useState({
    title: 'Titre de l\'Embed',
    description: 'Description de l\'embed. Vous pouvez utiliser **gras**, *italique*, et des [liens](https://example.com).',
    color: '#39ff14',
    footer: 'CIVRAT Bot',
    imageUrl: '',
    thumbnailUrl: '',
    timestamp: true,
    authorName: '',
    authorUrl: '',
  })
  const [previewMode, setPreviewMode] = useState(false)

  const savedEmbeds = [
    { id: '1', name: 'Bienvenue', title: 'Bienvenue sur le serveur !' },
    { id: '2', name: 'Règles', title: 'Règlement du Serveur' },
    { id: '3', name: '_ticket', title: 'Ticket Créé' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('embed.title')}</h1>
          <p className="text-gray-400">{t('embed.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`btn-secondary flex items-center gap-2 ${previewMode ? 'bg-neon-green/10 border-neon-green' : ''}`}
          >
            <Eye className="w-4 h-4" />
            {t('common.preview')}
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {t('common.save')}
          </motion.button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('embed.content')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t('embed.titleField')}</label>
                <input
                  type="text"
                  value={embed.title}
                  onChange={(e) => setEmbed({ ...embed, title: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t('embed.description')}</label>
                <textarea
                  value={embed.description}
                  onChange={(e) => setEmbed({ ...embed, description: e.target.value })}
                  rows={5}
                  className="input-field resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('embed.color')}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={embed.color}
                      onChange={(e) => setEmbed({ ...embed, color: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={embed.color}
                      onChange={(e) => setEmbed({ ...embed, color: e.target.value })}
                      className="input-field flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('embed.footer')}</label>
                  <input
                    type="text"
                    value={embed.footer}
                    onChange={(e) => setEmbed({ ...embed, footer: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('embed.media')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    {t('embed.thumbnail')}
                  </div>
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={embed.thumbnailUrl}
                  onChange={(e) => setEmbed({ ...embed, thumbnailUrl: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    {t('embed.image')}
                  </div>
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={embed.imageUrl}
                  onChange={(e) => setEmbed({ ...embed, imageUrl: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{t('embed.timestamp')}</span>
                </div>
                <button
                  onClick={() => setEmbed({ ...embed, timestamp: !embed.timestamp })}
                  className={`w-14 h-8 rounded-full transition-all ${
                    embed.timestamp ? 'bg-neon-green' : 'bg-white/10'
                  } relative`}
                >
                  <motion.div
                    initial={false}
                    animate={{ x: embed.timestamp ? 24 : 4 }}
                    className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Send Options */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('embed.sendTo')}</h3>
            <div className="flex gap-3">
              <select className="input-field flex-1">
                <option value="">{t('common.selectChannel')}</option>
                <option value="general">💬 general</option>
                <option value="announcements">📢 announcements</option>
              </select>
              <button className="btn-primary flex items-center gap-2">
                <Send className="w-4 h-4" />
                {t('embed.send')}
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('embed.preview')}</h3>
            <div className="bg-[#36393f] rounded-lg p-4">
              {/* Discord Embed Preview */}
              <div className="border-l-4 rounded bg-[#2f3136] p-4" style={{ borderColor: embed.color }}>
                {embed.title && (
                  <div className="text-white font-medium mb-2">{embed.title}</div>
                )}
                {embed.description && (
                  <div className="text-gray-300 text-sm whitespace-pre-line">{embed.description}</div>
                )}
                {embed.footer && (
                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                    {embed.timestamp && <span>Aujourd'hui à ...</span>}
                    <span>•</span>
                    <span>{embed.footer}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Saved Embeds */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{t('embed.saved')}</h3>
              <button className="btn-secondary flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" />
                {t('embed.new')}
              </button>
            </div>
            <div className="space-y-2">
              {savedEmbeds.map((saved) => (
                <div
                  key={saved.id}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-all"
                >
                  <Code className="w-5 h-5 text-neon-green" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white truncate">{saved.name}</div>
                    <div className="text-xs text-gray-400 truncate">{saved.title}</div>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-white">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
