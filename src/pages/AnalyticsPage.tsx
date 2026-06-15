import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Users, MessageSquare } from 'lucide-react'
import { useI18n } from '../lib/i18n'

export default function AnalyticsPage() {
  const { t } = useI18n()
  const [timeRange, setTimeRange] = useState('week')

  const stats = [
    { label: t('analytics.members'), value: '15,420', change: '+124', positive: true, icon: Users },
    { label: t('analytics.messages'), value: '89,432', change: '+5,231', positive: true, icon: MessageSquare },
    { label: t('analytics.joins'), value: '156', change: '+23', positive: true, icon: TrendingUp },
    { label: t('analytics.leaves'), value: '32', change: '-5', positive: false, icon: TrendingDown },
  ]

  const activityData = [
    { day: 'Lun', messages: 12450, members: 50 },
    { day: 'Mar', messages: 15320, members: 65 },
    { day: 'Mer', messages: 18200, members: 78 },
    { day: 'Jeu', messages: 16800, members: 72 },
    { day: 'Ven', messages: 21300, members: 89 },
    { day: 'Sam', messages: 19500, members: 82 },
    { day: 'Dim', messages: 14200, members: 58 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('analytics.title')}</h1>
          <p className="text-gray-400">{t('analytics.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
          {[
            { id: 'today', label: t('analytics.today') },
            { id: 'week', label: t('analytics.week') },
            { id: 'month', label: t('analytics.month') },
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                timeRange === range.id
                  ? 'bg-neon-green text-discord-darker font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-neon-green/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-neon-green" />
              </div>
              <span className={`text-sm font-medium ${
                stat.positive ? 'text-neon-green' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Activity Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">{t('analytics.activity')}</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neon-green" />
              <span className="text-gray-400">{t('analytics.messages')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-yellow" />
              <span className="text-gray-400">{t('analytics.members')}</span>
            </div>
          </div>
        </div>

        <div className="h-64 flex items-end gap-4">
          {activityData.map((data, index) => {
            const maxMessages = Math.max(...activityData.map(d => d.messages))
            const height = (data.messages / maxMessages) * 100
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center gap-1" style={{ height: '200px' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="w-full max-w-[40px] bg-gradient-to-t from-neon-green to-neon-green-light rounded-t-lg relative"
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-accent-yellow/60 rounded-t-lg"
                      style={{ height: `${(data.members / 100) * 100}%` }}
                    />
                  </motion.div>
                </div>
                <span className="text-xs text-gray-400">{data.day}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-6">{t('analytics.growth')}</h3>
          <div className="space-y-4">
            {[
              { label: t('analytics.peakOnline'), value: '1,234' },
              { label: t('analytics.avgOnline'), value: '456' },
              { label: t('common.messagesPerDay'), value: '12,786' },
              { label: t('analytics.avgVoiceTime'), value: '45 min' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">{item.label}</span>
                <span className="font-medium text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-6">{t('common.topChannels')}</h3>
          <div className="space-y-3">
            {[
              { name: '💬 general', messages: 45678 },
              { name: '🎮 gaming', messages: 32456 },
              { name: '🎵 music', messages: 21345 },
              { name: '💬 off-topic', messages: 18923 },
            ].map((channel, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white truncate">{channel.name}</div>
                  <div className="text-xs text-gray-500">{channel.messages.toLocaleString()} {t('common.messages').toLowerCase()}</div>
                </div>
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(channel.messages / 45678) * 100}%` }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full bg-neon-green rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
