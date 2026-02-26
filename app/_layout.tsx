import { AuthProvider, useAuth } from '@/providers/AuthProvider'
import { Stack, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

function RootNavigator() {
  const { session, loading } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    const inAuthGroup = segments[0] === '(auth)'

    if (!session && !inAuthGroup) {
      // Redirect to login if not authenticated and not in auth group
      router.replace('/login')
    } else if (session && inAuthGroup) {
      // Redirect to tabs if authenticated and in auth group
      router.replace('/(tabs)')
    }
  }, [session, loading, segments])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {session ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  )
}


export default function Layout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  )
}