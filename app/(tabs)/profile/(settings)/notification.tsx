import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationScreen() {
  const [settings, setSettings] = useState({
    newMatches: true,
    messages: true,
    promotions: false,
    appUpdates: true,
  });

  const toggleSwitch = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACTIVITY</Text>
          <View style={styles.card}>
            <NotificationItem 
              title="New Matches" 
              description="Get notified when you have a new match."
              value={settings.newMatches}
              onToggle={() => toggleSwitch('newMatches')}
              icon="heart-outline"
            />
            <View style={styles.divider} />
            <NotificationItem 
              title="Messages" 
              description="Get notified when you receive a message."
              value={settings.messages}
              onToggle={() => toggleSwitch('messages')}
              icon="chatbubble-outline"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>MARKETING & UPDATES</Text>
          <View style={styles.card}>
            <NotificationItem 
              title="Promotions" 
              description="Special offers and partner promotions."
              value={settings.promotions}
              onToggle={() => toggleSwitch('promotions')}
              icon="pricetag-outline"
            />
            <View style={styles.divider} />
            <NotificationItem 
              title="App Updates" 
              description="New features and system announcements."
              value={settings.appUpdates}
              onToggle={() => toggleSwitch('appUpdates')}
              icon="rocket-outline"
            />
          </View>
        </View>

        <Text style={styles.footerText}>
          You can also manage notification settings for Soul Sync in your phone's system settings.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const NotificationItem = ({ title, description, value, onToggle, icon }: any) => (
  <View style={styles.itemRow}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={20} color="#8B5CF6" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemDescription}>{description}</Text>
    </View>
    <Switch
      trackColor={{ false: "#1e293b", true: "#8B5CF6" }}
      thumbColor={value ? "#fff" : "#94a3b8"}
      ios_backgroundColor="#1e293b"
      onValueChange={onToggle}
      value={value}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  itemDescription: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#1e293b',
    marginLeft: 68,
  },
  footerText: {
    color: '#64748b',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 10,
    paddingHorizontal: 20,
  },
});