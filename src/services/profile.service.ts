import { decode } from 'base64-arraybuffer'
import { File } from 'expo-file-system'
import { supabase } from "../lib/supabase"

export type UserProfile = {
  id: string
  username?: string
  birth_date?: string
  birth_time?: string
  birth_place?: string
  preferred_age_range?: string
  preferred_gender?: string
  bio?: string
  interests?: string[]
  images?: string[]
  onboarding_completed?: boolean
  updated_at?: string
}

export const getProfile = async (userId: string) => {
  return supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
}

export const updateProfile = async (profile: Partial<UserProfile> & { id: string }) => {
  return supabase
    .from('profiles')
    .upsert({
      ...profile,
      updated_at: new Date().toISOString(),
    })
}

export const uploadImage = async (userId: string, uri: string) => {
  const fileName = uri.split('/').pop() || `${Date.now()}.jpg`
  const filePath = `${userId}/${fileName}`

  // Determine content type from extension
  const ext = fileName.split('.').pop()?.toLowerCase() || 'jpg'
  const mimeTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    heic: 'image/heic',
  }
  const contentType = mimeTypes[ext] || 'image/jpeg'

  // Read the file as base64 using expo-file-system (reliable for local URIs)
  const file = new File(uri)
  const base64 = await file.base64()

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, decode(base64), {
      upsert: true,
      contentType,
    })

  if (error) throw error

  const { data: publicUrlData } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  return publicUrlData.publicUrl
}
export const getExploreProfiles = async (currentUserId: string) => {
  return supabase
    .from('profiles')
    .select('*')
    .neq('id', currentUserId)
    .eq('onboarding_completed', true)
    .limit(20)
}

export const getMatchSuggestions = async (currentUserId: string) => {
  // For now, just return other users who completed onboarding
  // In a real app, this would use a complex matching algorithm
  return supabase
    .from('profiles')
    .select('*')
    .neq('id', currentUserId)
    .eq('onboarding_completed', true)
    .limit(10)
}
