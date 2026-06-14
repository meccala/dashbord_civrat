import { motion } from 'framer-motion'
import { Bot, Shield, Zap, Gift, MessageSquare, TrendingUp, ChevronRight, Star, Sparkles, Globe, Lock, Users, ArrowRight, Check, Plus } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { useI18n } from '../lib/i18n'
import { SUPPORT_DISCORD_URL, BOT_INVITE_URL } from '../lib/constants'

const features = [
  {
    icon: Bot,
    titleKey: 'landing.features.welcome.title',
    descKey: 'landing.features.welcome.desc',
    gradient: 'from-neon-green to-emerald-400',
  },
  {
    icon: MessageSquare,
    titleKey: 'landing.features.tickets.title',
    descKey: 'landing.features.tickets.desc',
    gradient: 'from-emerald-400 to-teal-400',
  },
  {
    icon: Shield,
    titleKey: 'landing.features.automod.title',
    descKey: 'landing.features.automod.desc',
    gradient: 'from-teal-400 to-cyan-400',
  },
  {
    icon: Zap,
    titleKey: 'landing.features.xp.title',
    descKey: 'landing.features.xp.desc',
    gradient: 'from-cyan-400 to-blue-400',
  },
  {
    icon: Gift,
    titleKey: 'landing.features.giveaways.title',
    descKey: 'landing.features.giveaways.desc',
    gradient: 'from-accent-yellow to-orange-400',
  },
  {
    icon: TrendingUp,
    titleKey: 'landing.features.stats.title',
    descKey: 'landing.features.stats.desc',
    gradient: 'from-orange-400 to-red-400',
  },
]

const stats = [
  { value: '10K+', key: 'landing.stats.servers' },
  { value: '500K+', key: 'landing.stats.users' },
  { value: '99.9%', key: 'landing.stats.uptime' },
  { value: '24/7', key: 'landing.stats.support' },
]

const testimonials = [
  {
    name: 'Serveur Gaming FR',
    avatar: '🎮',
    quote: 'CIVRAT a transformé la gestion de notre serveur. Les fonctionnalités sont incroyables et le support est réactif.',
    stars: 5,
  },
  {
    name: 'Communauté Crypto',
    avatar: '💎',
    quote: 'Le système de tickets et l\'auto-modération sont parfaits. Notre serveur est maintenant beaucoup plus sécurisé.',
    stars: 5,
  },
  {
    name: 'Art & Design Hub',
    avatar: '🎨',
    quote: 'Interface magnifique et facile à utiliser. Nos membres adorent le système de XP et de suggestions.',
    stars: 5,
  },
]

export default function LandingPage() {
  const { signInWithDiscord } = useAuth()
  const { t, language, setLanguage } = useI18n()

  return (
    <div className="min-h-screen bg-discord-darker relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-accent-yellow/5" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-neon-green/10 rounded-full blur-3xl animate-pulse-neon" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-yellow/10 rounded-full blur-3xl animate-pulse-neon" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green to-accent-yellow flex items-center justify-center shadow-neon">
            <span className="text-2xl font-bold text-discord-darker">C</span>
          </div>
          <span className="text-2xl font-bold neon-text">CIVRAT</span>
        </motion.div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setLanguage('fr')}
              className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                language === 'fr' ? 'bg-neon-green text-discord-darker font-medium' : 'text-gray-400 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                language === 'en' ? 'bg-neon-green text-discord-darker font-medium' : 'text-gray-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <motion.a
            href={BOT_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Ajouter le Bot
          </motion.a>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={signInWithDiscord}
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.089 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            {t('landing.login')}
          </motion.button>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/30 mb-8"
            >
              <Sparkles className="w-4 h-4 text-neon-green" />
              <span className="text-sm font-medium text-neon-green">Version 2.0 - Nouvelles fonctionnalités</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
              <span className="text-white">{t('landing.hero.title').split(' ').slice(0, 2).join(' ')}</span>
              <br />
              <span className="neon-text">{t('landing.hero.title').split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
              {t('landing.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={signInWithDiscord}
                className="group btn-primary text-lg px-10 py-4 flex items-center justify-center gap-2"
              >
                {t('landing.hero.getStarted')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.a
                href={BOT_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-accent text-lg px-10 py-4 flex items-center justify-center gap-2"
              >
                <Bot className="w-5 h-5" />
                Ajouter le Bot
              </motion.a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-gray-500">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-neon-green" />
                <span className="text-sm">Sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-neon-green" />
                <span className="text-sm">Multi-langue</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-neon-green" />
                <span className="text-sm">500K+ Utilisateurs</span>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass-card p-6 text-center group hover:border-neon-green/30 transition-all"
              >
                <div className="text-3xl md:text-4xl font-bold neon-text mb-2 group-hover:scale-105 transition-transform">{stat.value}</div>
                <div className="text-gray-400">{t(stat.key)}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Showcase Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-discord-darker via-transparent to-transparent z-10" />
            <div className="glass-card p-2 md:p-4 rounded-2xl border border-white/10">
              <div className="bg-discord-dark rounded-xl p-4 md:p-8 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-neon-green to-accent-yellow flex items-center justify-center">
                    <span className="text-4xl font-bold text-discord-darker">C</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Tableau de Bord CIVRAT</h3>
                  <p className="text-gray-400">Capture d'écran du tableau de bord</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">{t('landing.features.title').split(' ')[0]} </span>
              <span className="neon-text">{t('landing.features.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover p-8 group relative overflow-hidden"
              >
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-discord-darker" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{t(feature.titleKey)}</h3>
                <p className="text-gray-400">{t(feature.descKey)}</p>
                <ChevronRight className="absolute bottom-8 right-8 w-5 h-5 text-gray-600 group-hover:text-neon-green group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 bg-gradient-to-b from-transparent via-discord-dark/50 to-transparent">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Ils </span>
              <span className="neon-text">nous font confiance</span>
            </h2>
            <p className="text-xl text-gray-400">Découvrez ce que nos utilisateurs pensent de CIVRAT</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-yellow text-accent-yellow" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <span className="font-medium text-white">{testimonial.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Des tarifs </span>
              <span className="neon-text">accessibles</span>
            </h2>
            <p className="text-xl text-gray-400">Commencez gratuitement, passez Premium quand vous êtes prêt</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h3 className="text-xl font-bold text-white mb-2">{t('premium.free')}</h3>
              <div className="text-4xl font-bold text-white mb-6">0€<span className="text-lg text-gray-500">{t('premium.price')}</span></div>
              <ul className="space-y-3 mb-8">
                {['3 Serveurs', 'Fonctionnalités de base', 'Support communautaire'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-400">
                    <Check className="w-5 h-5 text-neon-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full btn-secondary">Commencer</button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-2 border-neon-green relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-neon-green text-discord-darker text-sm font-bold rounded-full">
                Populaire
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('premium.pro')}</h3>
              <div className="text-4xl font-bold neon-text mb-6">9.99€<span className="text-lg text-gray-500">{t('premium.price')}</span></div>
              <ul className="space-y-3 mb-8">
                {['Serveurs illimités', 'Toutes les fonctionnalités', 'Support prioritaire', 'Statistiques avancées', 'Export de données'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-neon-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full btn-primary">{t('premium.upgrade')}</button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h3 className="text-xl font-bold text-white mb-2">{t('premium.enterprise')}</h3>
              <div className="text-4xl font-bold text-white mb-6">Sur mesure</div>
              <ul className="space-y-3 mb-8">
                {['Tout de Pro', 'API dédiée', 'SLA garanti', 'Account manager', 'Support 24/7'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-400">
                    <Check className="w-5 h-5 text-neon-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full btn-accent">Nous contacter</button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 to-accent-yellow/10" />
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-neon-green/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-accent-yellow/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('landing.cta.title')}
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                {t('landing.cta.subtitle')}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={signInWithDiscord}
                className="btn-primary text-lg px-12 py-4 flex items-center gap-3 mx-auto"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.089 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                {t('landing.cta.button')}
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-green to-accent-yellow flex items-center justify-center">
                    <span className="text-lg font-bold text-discord-darker">C</span>
                  </div>
                  <span className="font-bold neon-text text-xl">CIVRAT</span>
                </div>
                <p className="text-gray-400 text-sm">Le bot Discord ultime pour gérer votre communauté.</p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Produit</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-neon-green transition-colors">Fonctionnalités</a></li>
                  <li><a href="#" className="hover:text-neon-green transition-colors">Tarifs</a></li>
                  <li><a href="#" className="hover:text-neon-green transition-colors">Changelog</a></li>
                  <li><a href="#" className="hover:text-neon-green transition-colors">Roadmap</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Ressources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-neon-green transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-neon-green transition-colors">API</a></li>
                  <li><a href="#" className="hover:text-neon-green transition-colors">Status</a></li>
                  <li><a href="#" className="hover:text-neon-green transition-colors">Blog</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Légal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-neon-green transition-colors">CGU</a></li>
                  <li><a href="#" className="hover:text-neon-green transition-colors">Confidentialité</a></li>
                  <li><a href="#" className="hover:text-neon-green transition-colors">Cookies</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Liens</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href={BOT_INVITE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-neon-green transition-colors">Ajouter le Bot</a></li>
                  <li><a href={SUPPORT_DISCORD_URL} target="_blank" rel="noopener noreferrer" className="hover:text-neon-green transition-colors">Serveur Support</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                &copy; 2024 CIVRAT. {t('landing.footer.rights')}
              </div>
              <div className="flex items-center gap-4">
                <a href={BOT_INVITE_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors" title="Ajouter le Bot">
                  <Plus className="w-5 h-5" />
                </a>
                <a href={SUPPORT_DISCORD_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors" title="Serveur Support">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.089 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.395 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
