import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#a78bfa", // Purple glow
        tabBarInactiveTintColor: "rgba(255,255,255,0.4)",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: "Nunito_300Light",
          fontSize: 11,
          letterSpacing: 0.4,
          marginBottom: 4,
        },
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 1,
          borderTopColor: "rgba(255, 255, 255, 0.1)",
          bottom: 20,
          left: 15,
          right: 15,
          height: 64,
          borderRadius: 20,
          backgroundColor: "transparent",
          elevation: 0,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView intensity={95} tint="dark" style={StyleSheet.absoluteFill}>
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.08)",
                  "rgba(255, 255, 255, 0.02)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
            </BlurView>
          ) : (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                backgroundColor: "rgba(20, 20, 20, 0.6)",
                borderRadius: 20,
              }}
            />
          ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={color}
              style={focused ? { opacity: 1 } : { opacity: 0.6 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "planet" : "planet-outline"}
              size={22}
              color={color}
              style={focused ? { opacity: 1 } : { opacity: 0.6 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={22}
              color={color}
              style={focused ? { opacity: 1 } : { opacity: 0.6 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={22}
              color={color}
              style={focused ? { opacity: 1 } : { opacity: 0.6 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={22}
              color={color}
              style={focused ? { opacity: 1 } : { opacity: 0.6 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}