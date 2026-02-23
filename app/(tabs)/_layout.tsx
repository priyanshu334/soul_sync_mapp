import { COLORS } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.primaryEnd,
        tabBarInactiveTintColor: COLORS.gray,
        // Using a solid, slightly transparent background
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconBg : null}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={22} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconBg : null}>
              <Ionicons 
                name={focused ? "compass" : "compass-outline"} 
                size={22} 
                color={color} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconBg : null}>
              <Ionicons 
                name={focused ? "settings" : "settings-outline"} 
                size={22} 
                color={color} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 20,
    left: 20,
    right: 20,
    height: 68,
    borderRadius: 35,
    backgroundColor: '#121212', // Solid dark surface
    borderTopWidth: 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 12,
    paddingTop: 10,
    // Strong shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)', // Subtle border for definition
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: -5,
    marginBottom: 5,
  },
  activeIconBg: {
    backgroundColor: 'rgba(199, 125, 255, 0.15)', // Light version of primaryEnd
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 4,
  }
});