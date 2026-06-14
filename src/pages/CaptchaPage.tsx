import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Save, Image, Calculator, MousePointer } from 'lucide-react'

export default function CaptchaPage() {
  const [config, setConfig] = useState({
    enabled: true,
    type: 'image' as 'image' | 'math' | 'button',
    roleId: '',
    channelId: '',
    timeout: 300,
    kickOnFail: false,
    maxAttempts: 3,
  })

  const captchaTypes = [
    { id: 'image', icon: Image, label: 'Image Captcha', desc: 'Text-based image captcha' },
    { id: 'math', icon: Calculator, label: 'Math Captcha', desc: 'Simple math problems' },
    { id: 'button', icon: MousePointer, label: 'Button Captcha', desc: 'Simple button click' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Captcha Verification</h1>
          <p className="text-gray-400">Protect your server from bots with captcha verification.</p>
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

      {/* Enable Toggle */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-green/5 flex items-center justify-center">
            <Lock className="w-6 h-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Enable Captcha</h3>
            <p className="text-sm text-gray-400">Verify new members with captcha</p>
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
          {/* Captcha Type */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Captcha Type</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {captchaTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setConfig({ ...config, type: type.id as typeof config.type })}
                  className={`p-6 rounded-xl cursor-pointer transition-all text-center ${
                    config.type === type.id
                      ? 'bg-neon-green/10 border-2 border-neon-green'
                      : 'bg-white/5 border-2 border-transparent hover:border-white/20'
                  }`}
                >
                  <type.icon className={`w-8 h-8 mx-auto mb-3 ${
                    config.type === type.id ? 'text-neon-green' : 'text-gray-400'
                  }`} />
                  <h4 className="font-semibold text-white mb-1">{type.label}</h4>
                  <p className="text-sm text-gray-400">{type.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Verification Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Verified Role
                  </label>
                  <select
                    value={config.roleId}
                    onChange={(e) => setConfig({ ...config, roleId: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select a role</option>
                    <option value="verified">✅ Verified</option>
                    <option value="member">👤 Member</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Verification Channel
                  </label>
                  <select
                    value={config.channelId}
                    onChange={(e) => setConfig({ ...config, channelId: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select a channel</option>
                    <option value="verify">🔐 verify</option>
                    <option value="welcome">👋 welcome</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Timeout & Actions</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Verification Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    min={60}
                    max={600}
                    value={config.timeout}
                    onChange={(e) => setConfig({ ...config, timeout: parseInt(e.target.value) })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Maximum Attempts
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={config.maxAttempts}
                    onChange={(e) => setConfig({ ...config, maxAttempts: parseInt(e.target.value) })}
                    className="input-field"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <h4 className="font-medium text-white">Kick on Failed</h4>
                    <p className="text-sm text-gray-400">Kick members who fail captcha</p>
                  </div>
                  <button
                    onClick={() => setConfig({ ...config, kickOnFail: !config.kickOnFail })}
                    className={`w-14 h-8 rounded-full transition-all ${
                      config.kickOnFail ? 'bg-red-500' : 'bg-white/10'
                    } relative`}
                  >
                    <motion.div
                      initial={false}
                      animate={{ x: config.kickOnFail ? 24 : 4 }}
                      className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
