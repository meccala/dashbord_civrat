import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase, User } from './supabase'
import { Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signInWithDiscord: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (!error && data) {
      setUser(data)
    }
  }

  async function signInWithDiscord() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: window.location.origin,
        scopes: 'identify email guilds'
      }
    })
    if (error) throw error
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signInWithDiscord, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
