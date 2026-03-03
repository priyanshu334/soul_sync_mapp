import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

function RootNavigator() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Check if the user is currently in the (auth) group
    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      // If no session, send them to the auth group
      // Make sure you have an index.tsx or login.tsx inside (auth)
      router.replace('/(auth)');
    } else if (session && inAuthGroup) {
      // If they ARE logged in but trying to see login screens, send to tabs
      router.replace('/(tabs)');
    }
  }, [session, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* These names MUST match the folder names in your file tree */}
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  )
}