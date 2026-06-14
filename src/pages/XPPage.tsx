import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Save, TrendingUp, Award, Clock, Plus, Trash2 } from 'lucide-react'
import { useI18n } from '../lib/i18n'

interface RoleReward {
  level: number
  roleId: string
  keepPrevious: boolean
}

export default function XPPage() {
  const { t } = useI18n()
  const [config, setConfig] = useState({
    enabled: true,
    messageXp: 15,
    voiceXp: 10,
    cooldown: 60,
    levelUpMessage: '🎉 {user} a atteint le niveau {level} !',
    levelUpChannel: '',
    announceInCurrent: false,
    roleRewards: [
      { level: 5, roleId: '1', keepPrevious: true },
      { level: 10, roleId: '2', keepPrevious: true },
    ] as RoleReward[],
  })

  const addReward = () => {
    setConfig({
      ...config,
      roleRewards: [...config.roleRewards, { level: 15, roleId: '', keepPrevious: true }],
    })
  }

  const removeReward = (index: number) => {
    setConfig({
      ...config,
      roleRewards: config.roleRewards.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('xp.title')}</h1>
          <p className="text-gray-400">{t('xp.subtitle')}</p>
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
            <Zap className="w-6 h-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{t('xp.enable')}</h3>
            <p className="text-sm text-gray-400">{t('xp.enableDesc')}</p>
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
          {/* XP Settings */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-semibold text-white">{t('xp.messageXp')}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">{t('xp.messageXpDesc')}</p>
              <input
                type="number"
                min={1}
                max={100}
                value={config.messageXp}
                onChange={(e) => setConfig({ ...config, messageXp: parseInt(e.target.value) })}
                className="input-field"
              />
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-semibold text-white">{t('xp.voiceXp')}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">{t('xp.voiceXpDesc')}</p>
              <input
                type="number"
                min={1}
                max={50}
                value={config.voiceXp}
                onChange={(e) => setConfig({ ...config, voiceXp: parseInt(e.target.value) })}
                className="input-field"
              />
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-semibold text-white">{t('xp.cooldown')}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">{t('xp.cooldownDesc')}</p>
              <input
                type="number"
                min={10}
                max={300}
                value={config.cooldown}
                onChange={(e) => setConfig({ ...config, cooldown: parseInt(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>

          {/* Level Up Settings */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5 text-neon-green" />
              <h3 className="text-lg font-semibold text-white">{t('xp.levelUpSettings')}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('xp.levelUpMessage')}
                </label>
                <input
                  type="text"
                  value={config.levelUpMessage}
                  onChange={(e) => setConfig({ ...config, levelUpMessage: e.target.value })}
                  className="input-field"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Variables: {'{user}'}, {'{level}'}, {'{server}'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('xp.levelUpChannel')}
                  </label>
                  <select
                    value={config.levelUpChannel}
                    onChange={(e) => setConfig({ ...config, levelUpChannel: e.target.value })}
                    className="input-field"
                  >
                    <option value="">{t('common.selectChannel')}</option>
                    <option value="general">💬 general</option>
                    <option value="levels">📊 niveaux</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">{t('xp.announceCurrent')}</h4>
                    <p className="text-sm text-gray-400">{t('xp.announceCurrentDesc')}</p>
                  </div>
                  <button
                    onClick={() => setConfig({ ...config, announceInCurrent: !config.announceInCurrent })}
                    className={`w-14 h-8 rounded-full transition-all ${
                      config.announceInCurrent ? 'bg-neon-green' : 'bg-white/10'
                    } relative`}
                  >
                    <motion.div
                      initial={false}
                      animate={{ x: config.announceInCurrent ? 24 : 4 }}
                      className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Role Rewards */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-semibold text-white">{t('xp.roleRewards')}</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addReward}
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                {t('xp.addReward')}
              </motion.button>
            </div>

            <div className="space-y-3">
              {config.roleRewards.map((reward, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-neon-green font-bold">{t('xp.level')} {reward.level}</div>
                    <select
                      value={reward.roleId}
                      onChange={(e) => {
                        const newRewards = [...config.roleRewards]
                        newRewards[index] = { ...reward, roleId: e.target.value }
                        setConfig({ ...config, roleRewards: newRewards })
                      }}
                      className="input-field w-48"
                    >
                      <option value="">{t('common.selectRole')}</option>
                      <option value="1">🥉 Bronze</option>
                      <option value="2">🥈 Argent</option>
                      <option value="3">🥇 Or</option>
                    </select>
                  </div>
                  <button
                    onClick={() => removeReward(index)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
