import { motion } from 'framer-motion'
import { Crown, Check, Zap, Globe, BarChart3, Code, Shield, Headphones, Star, Sparkles } from 'lucide-react'
import { useI18n } from '../lib/i18n'

const premiumFeatures = [
  { icon: Zap, title: 'Serveurs illimités', desc: 'Gérez autant de serveurs que vous voulez' },
  { icon: BarChart3, title: 'Statistiques avancées', desc: 'Analytiques détaillés de votre serveur' },
  { icon: Globe, title: 'Marque personnalisée', desc: 'Personnalisez les messages du bot' },
  { icon: Code, title: 'Accès API', desc: 'Intégrez CIVRAT à vos systèmes' },
  { icon: Shield, title: 'Fonctionnalités exclusives', desc: 'Accès anticipé aux nouvelles features' },
  { icon: Headphones, title: 'Support prioritaire', desc: 'Réponse garantie sous 24h' },
]

export default function PremiumPage() {
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/30 mb-6"
        >
          <Sparkles className="w-5 h-5 text-neon-green" />
          <span className="text-neon-green font-medium">{t('premium.testingMode')}</span>
        </motion.div>
        <h1 className="text-4xl font-bold text-white mb-4">{t('premium.title')}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          {t('premium.testingDesc')}
        </p>
      </div>

      {/* All Features Unlocked */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center border-2 border-neon-green/30"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-neon-green to-accent-yellow flex items-center justify-center">
          <Crown className="w-10 h-10 text-discord-darker" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{t('premium.allUnlocked')}</h2>
        <p className="text-gray-400 mb-6">{t('premium.allUnlockedDesc')}</p>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green/10 rounded-lg border border-neon-green/30">
          <Check className="w-5 h-5 text-neon-green" />
          <span className="text-neon-green font-medium">{t('premium.everythingFree')}</span>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">{t('premium.features')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="glass-card p-6 border-neon-green/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green/20 to-accent-yellow/20 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-neon-green" />
                </div>
                <Check className="w-5 h-5 text-neon-green" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 max-w-4xl mx-auto mt-12"
      >
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-accent-yellow text-accent-yellow" />
          ))}
        </div>
        <p className="text-xl text-gray-300 mb-4 italic">
          "Premium a complètement transformé notre façon de gérer le serveur. Les statistiques avancées et l'accès API valent chaque centime. Le support prioritaire est incroyable !"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-accent-yellow/20 flex items-center justify-center">
            <span className="text-xl">👑</span>
          </div>
          <div>
            <div className="font-medium text-white">Gaming Community FR</div>
            <div className="text-sm text-gray-400">25,000+ membres</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
