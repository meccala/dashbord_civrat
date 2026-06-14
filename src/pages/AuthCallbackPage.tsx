import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader as Loader2 } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { useI18n } from '../lib/i18n'
import { supabase } from '../lib/supabase'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const { session } = useAuth()
  const { t } = useI18n()

  useEffect(() => {
    const handleCallback = async () => {
      const { data: { session: newSession }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Auth callback error:', error)
        navigate('/')
        return
      }

      if (newSession?.user) {
        try {
          await supabase.from('users').upsert({
            id: newSession.user.id,
            email: newSession.user.email,
            discord_id: newSession.user.identities?.find(i => i.provider === 'discord')?.id,
            discord_username: newSession.user.user_metadata?.full_name,
            discord_avatar: newSession.user.user_metadata?.avatar_url,
          })
        } catch (err) {
          console.error('Error creating user profile:', err)
        }
        setTimeout(() => navigate('/dashboard'), 500)
      }
    }

    handleCallback()
  }, [navigate])

  if (session) {
    return (
      <div className="min-h-screen bg-discord-darker flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-neon-green to-accent-yellow flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 className="w-8 h-8 text-discord-darker" />
            </motion.div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{t('auth.completing')}</h1>
          <p className="text-gray-400">{t('auth.wait')}</p>
        </motion.div>
      </div>
    )
  }

  return null
}
