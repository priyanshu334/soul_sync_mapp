import { COLORS } from "@/constants/theme";
import { supabase } from "@/src/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/providers/AuthProvider";

const H_PAD = 20;

const settingsGroups = [
  {
    label: "Account & Security",
    items: [
      {
        title: "Account",
        icon: "person-outline",
        route: "/(tabs)/profile/(settings)/account",
        color: "#a855f7",
      },
      {
        title: "Security",
        icon: "shield-checkmark-outline",
        route: "/(tabs)/profile/(settings)/security",
        color: "#ec4899",
      },
      {
        title: "Notifications",
        icon: "notifications-outline",
        route: "/(tabs)/profile/(settings)/notification",
        color: "#3b82f6",
      },
    ],
  },
  {
    label: "Legal & Privacy",
    items: [
      {
        title: "Privacy Policy",
        icon: "document-text-outline",
        route: "/(tabs)/profile/(settings)/privacy",
        color: "#10b981",
      },
      {
        title: "Terms & Conditions",
        icon: "document-outline",
        route: "/(tabs)/profile/(settings)/terms",
        color: "#f59e0b",
      },
      {
        title: "Community Guidelines",
        icon: "people-outline",
        route: "/(tabs)/profile/(settings)/community_guidelines",
        color: "#6366f1",
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        title: "About Us",
        icon: "information-circle-outline",
        route: "/(tabs)/profile/(settings)/about",
        color: "#8b5cf6",
      },
      {
        title: "Contact Us",
        icon: "mail-outline",
        route: "/(tabs)/profile/(settings)/contact",
        color: "#ef4444",
      },
    ],
  },
];

export default function SettingsScreen() {
  const { session } = useAuth();

  const handleLogout = () => {
    supabase.auth.signOut();
    router.replace("/(auth)");
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} /> {/* Spacer for centering */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* User Summary Card */}
        <View style={styles.profileSummaryCard}>
          <LinearGradient
            colors={['#1e293b', '#0f172a']}
            style={styles.profileGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.profileInfo}>
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={32} color="#8b5cf6" />
              </View>
              <View>
                <Text style={styles.userEmail}>{session?.user?.email || 'Logged in'}</Text>
                <Text style={styles.accountStatus}>Astro Member</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.groupContainer}>
            <Text style={styles.groupLabel}>{group.label}</Text>

            <View style={styles.card}>
              {group.items.map((item, itemIndex) => (
                <View key={item.title}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push(item.route as Href)}
                    style={styles.itemRow}
                  >
                    <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                      <Ionicons
                        name={item.icon as any}
                        size={20}
                        color={item.color}
                      />
                    </View>

                    <Text style={styles.itemText}>{item.title}</Text>

                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#475569"
                    />
                  </TouchableOpacity>

                  {itemIndex < group.items.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogout}
          style={styles.logoutWrapper}
        >
          <LinearGradient
            colors={['#ef4444', '#dc2626']}
            style={styles.logoutButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Log Out</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: H_PAD,
    paddingVertical: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: "Forum_400Regular",
    letterSpacing: 1,
  },
  scrollContent: {
    paddingHorizontal: H_PAD,
    paddingTop: 10,
    paddingBottom: 40,
  },
  profileSummaryCard: {
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  profileGradient: {
    padding: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  userEmail: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  accountStatus: {
    color: '#a855f7',
    fontSize: 13,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  groupContainer: {
    marginBottom: 25,
  },
  groupLabel: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 10,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
    overflow: "hidden",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  itemText: {
    color: "#f1f5f9",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#1e293b",
    marginLeft: 69,
  },
  logoutWrapper: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  versionText: {
    textAlign: 'center',
    color: '#475569',
    fontSize: 13,
    fontWeight: '500',
  }
});
