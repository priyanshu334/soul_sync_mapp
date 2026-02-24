import { COLORS } from "@/constants/theme";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export function ProfileHeader() {
  const userImage = "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=400";

  return (
    <View style={styles.headerContainer}>
      {/* Top Bar: Title and Actions */}
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="share-2" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => router.push("/(tabs)/settings/AboutUs")}
          >
            <Ionicons name="settings-outline" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Info Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          <Image 
            source={{ uri: userImage }} 
            style={styles.avatar} 
          />
          {/* Online/Verified Badge (Optional extra for 2026 feel) */}
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#6A00F4" />
          </View>
        </View>

        <View style={styles.infoContent}>
          <Text style={styles.userName}>Priya Sharma</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={COLORS.gray} />
            <Text style={styles.locationText}>25 · Mumbai, India</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === "ios" ? 10 : 40, // Space for Status Bar
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.white,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    borderWidth: 2,
    borderColor: COLORS.primaryStart,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  infoContent: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: COLORS.gray,
  },
});