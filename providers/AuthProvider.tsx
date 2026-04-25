import { Session } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../src/lib/supabase'

type AuthContextType = {
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  signOut: async () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  useEffect(() => {
    console.log('🔵 AuthProvider: Starting session check')
    supabase.auth.getSession().then(({ data }) => {
      console.log('🟢 AuthProvider: Session retrieved', data.session ? 'logged in' : 'not logged in')
      setSession(data.session)
      setLoading(false)
    }).catch((err) => {
      console.error('🔴 AuthProvider: Session error', err)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        console.log('🟡 AuthProvider: Auth state changed')
        setSession(session)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)