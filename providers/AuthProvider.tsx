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
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => {
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