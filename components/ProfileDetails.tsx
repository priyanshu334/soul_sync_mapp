import { COLORS } from "@/constants/theme";
import {
    Ionicons,
    MaterialCommunityIcons
} from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const interests = [
  { icon: "book-outline", label: "Reading", library: Ionicons },
  { icon: "musical-notes-outline", label: "Music", library: Ionicons },
  { icon: "airplane-outline", label: "Travel", library: Ionicons },
  { icon: "coffee-outline", label: "Cafes", library: Ionicons },
  { icon: "yoga", label: "Yoga", library: MaterialCommunityIcons },
  { icon: "heart-outline", label: "Art", library: Ionicons }
];

export function ProfileDetails() {
  return (
    <View style={styles.container}>
      {/* Interests Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Interests</Text>
        <View style={styles.badgeContainer}>
          {interests.map((interest) => {
            const IconLib = interest.library;
            return (
              <View key={interest.label} style={styles.badge}>
                <IconLib name={interest.icon as any} size={14} color={COLORS.gray} />
                <Text style={styles.badgeText}>{interest.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Basic Details Card */}
      <View style={styles.card}>
        <Text style={styles.sectionHeader}>Basic Details</Text>
        <View style={styles.grid}>
          <DetailItem label="Age" value="25 years" />
          <DetailItem label="Education" value="MBA Graduate" />
          <DetailItem label="Occupation" value="Marketing Manager" />
          <DetailItem label="Marital Status" value="Never Married" />
          <DetailItem label="Mother Tongue" value="Hindi" />
          <DetailItem label="Diet" value="Vegetarian" />
          <DetailItem label="Smoking" value="Non-smoker" />
        </View>
      </View>

      {/* Zodiac Sign Card */}
      <View style={styles.card}>
        <Text style={styles.sectionHeader}>Zodiac Sign</Text>
        <View style={styles.zodiacRow}>
          <View style={styles.zodiacIconBg}>
            <Text style={styles.zodiacEmoji}>♓</Text>
          </View>
          <View>
            <Text style={styles.zodiacTitle}>Pisces</Text>
            <Text style={styles.zodiacDate}>Feb 19 - Mar 20</Text>
          </View>
        </View>
        <Text style={styles.zodiacDesc}>
          Creative, intuitive, and compassionate. Known for artistic talents and empathy.
        </Text>
      </View>
    </View>
  );
}

// Sub-component for grid items
const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.gridItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: "600",
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface, // Or "rgba(255,255,255,0.05)"
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    gap: 6,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 13,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "500",
  },
  zodiacRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  zodiacIconBg: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(106, 0, 244, 0.15)", // Primary tint
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  zodiacEmoji: {
    fontSize: 24,
  },
  zodiacTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "600",
  },
  zodiacDate: {
    color: COLORS.gray,
    fontSize: 12,
  },
  zodiacDesc: {
    color: COLORS.gray,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 12,
  },
});