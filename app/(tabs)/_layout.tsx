import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryEnd,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* 1. VISIBLE TAB: Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={22} color={color} />,
        }}
      />

      {/* 2. VISIBLE TAB: Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={22} color={color} />,
        }}
      />

      {/* 3. HIDDEN PAGES: These exist but won't show icons */}
      <Tabs.Screen
        name="profile-edit" 
        options={{ href: null }} // Hides it from the bar
      />
      
      <Tabs.Screen
        name="notifications" 
        options={{ href: null }} // Hides it from the bar
      />

      <Tabs.Screen
        name="security" 
        options={{ href: null }} // Hides it from the bar
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 20,
    left: 40,
    right: 40,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#121212',
    borderTopWidth: 0,
  },
});