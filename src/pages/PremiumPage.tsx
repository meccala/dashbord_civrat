import { useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Check, Zap, Globe, BarChart3, Code, Shield, Headphones, Star } from 'lucide-react'
import { useI18n } from '../lib/i18n'

export default function PremiumPage() {
  const [billingPeriod, setBillingPeriod] = useState('monthly')
  const { t } = useI18n()

  const plans = [
    {
      name: t('premium.free'),
      price: 0,
      features: ['3 Serveurs', 'Fonctionnalités de base', 'Support communautaire', '500 commandes/jour'],
      current: true,
    },
    {
      name: t('premium.pro'),
      price: billingPeriod === 'monthly' ? 9.99 : 99.99,
      features: [
        'Serveurs illimités',
        'Toutes les fonctionnalités',
        'Support prioritaire',
        'Statistiques avancées',
        'Export de données',
        'API access',
        'Pas de limite de commandes',
      ],
      popular: true,
    },
    {
      name: t('premium.enterprise'),
      price: null,
      features: [
        'Tout de Pro',
        'API dédiée',
        'SLA garanti 99.9%',
        'Account manager',
        'Support 24/7',
        'Formation équipe',
        'Custom branding',
      ],
    },
  ]

  const premiumFeatures = [
    { icon: Zap, title: 'Serveurs illimités', desc: 'Gérez autant de serveurs que vous voulez' },
    { icon: BarChart3, title: t('premium.advancedStats'), desc: 'Analytiques détaillés de votre serveur' },
    { icon: Globe, title: t('premium.customBranding'), desc: 'Personnalisez les messages du bot' },
    { icon: Code, title: t('premium.api'), desc: 'Intégrez CIVRAT à vos systèmes' },
    { icon: Shield, title: 'Fonctionnalités exclusives', desc: 'Accès anticipé aux nouvelles features' },
    { icon: Headphones, title: t('premium.prioritySupport'), desc: 'Réponse garantie sous 24h' },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-yellow/10 border border-accent-yellow/30 mb-6"
        >
          <Crown className="w-5 h-5 text-accent-yellow" />
          <span className="text-accent-yellow font-medium">CIVRAT Premium</span>
        </motion.div>
        <h1 className="text-4xl font-bold text-white mb-4">{t('premium.subtitle')}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Débloquez toutes les fonctionnalités et portez votre serveur Discord au niveau supérieur.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              billingPeriod === 'monthly' ? 'bg-neon-green text-discord-darker font-medium' : 'text-gray-400'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
              billingPeriod === 'yearly' ? 'bg-neon-green text-discord-darker font-medium' : 'text-gray-400'
            }`}
          >
            Annuel
            <span className="text-xs bg-accent-yellow/20 text-accent-yellow px-1.5 py-0.5 rounded">-30%</span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-8 ${plan.popular ? 'border-2 border-neon-green relative' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-neon-green text-discord-darker text-sm font-bold rounded-full">
                Populaire
              </div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="text-4xl font-bold text-white mb-6">
              {plan.price !== null ? (
                <>
                  {plan.price}€
                  <span className="text-lg text-gray-500">/{billingPeriod === 'monthly' ? t('premium.price').replace('/', '') : 'an'}</span>
                </>
              ) : (
                'Sur mesure'
              )}
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-neon-green flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            {plan.current ? (
              <button className="w-full btn-secondary" disabled>
                Plan actuel
              </button>
            ) : plan.popular ? (
              <button className="w-full btn-primary flex items-center justify-center gap-2">
                <Crown className="w-4 h-4" />
                {t('premium.upgrade')}
              </button>
            ) : (
              <button className="w-full btn-accent">
                Nous contacter
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">{t('premium.features')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green/20 to-accent-yellow/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-neon-green" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Ce que disent nos utilisateurs Premium</h2>
        <div className="glass-card p-8">
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
              <div className="text-sm text-gray-400">25,000+ membres • Premium depuis 6 mois</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Questions Fréquentes</h2>
        <div className="space-y-4">
          {[
            { q: 'Puis-je annuler à tout moment ?', a: 'Oui, vous pouvez annuler votre abonnement à tout moment depuis vos paramètres.' },
            { q: 'Y a-t-il une garantie satisfait ou remboursé ?', a: 'Nous offrons une garantie de 7 jours satisfait ou remboursé.' },
            { q: 'Puis-je passer de Pro à Enterprise ?', a: 'Absolument ! Contactez notre équipe pour un upgrade personnalisé.' },
            { q: 'Quels modes de paiement acceptez-vous ?', a: 'Nous acceptons les cartes bancaires, PayPal et les virements pour Enterprise.' },
          ].map((faq, index) => (
            <div key={index} className="glass-card p-6">
              <h4 className="font-semibold text-white mb-2">{faq.q}</h4>
              <p className="text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
