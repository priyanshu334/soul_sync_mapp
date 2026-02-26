// app/(tabs)/index.tsx

import { COLORS, SIZES } from '@/constants/theme'
import { useAuth } from '@/providers/AuthProvider'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function HomeScreen() {
  const { session, signOut } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>

      <Text style={styles.subtitle}>
        Logged in as:
      </Text>

      <Text style={styles.email}>
        {session?.user?.email}
      </Text>

      <View style={{ height: 40 }} />

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Ionicons name="log-out-outline" size={20} color="#FF453A" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.white,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.gray,
  },
  email: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 69, 58, 0.2)', // Subtle red tint
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: '#FF453A',
  },
  logoutText: {
    color: '#FF453A',
    fontSize: 16,
    fontWeight: '600',
  },
})