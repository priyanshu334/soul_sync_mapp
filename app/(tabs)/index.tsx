// app/(tabs)/index.tsx

import { useAuth } from '@/providers/AuthProvider'
import { StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
  const {  session } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>

      <Text style={styles.subtitle}>
        Logged in as:
      </Text>

      <Text style={styles.email}>
        {session?.user?.email}
      </Text>

      <View style={{ height: 20 }} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  email: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '500',
  },
})