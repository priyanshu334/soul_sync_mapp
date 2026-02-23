import { supabase } from "../lib/supabase"

export const login = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password })

export const register = (email: string, password: string) =>
  supabase.auth.signUp({ email, password })

export const logout = () =>
  supabase.auth.signOut()

export const resetPassword = (email: string) =>
  supabase.auth.resetPasswordForEmail(email)