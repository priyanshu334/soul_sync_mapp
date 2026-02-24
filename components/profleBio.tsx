import { COLORS } from "@/constants/theme"; // Using your project theme
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function ProfileBio() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>About Me</Text>
      <Text style={styles.bioText}>
        A creative soul who finds joy in life's simple pleasures. Love exploring
        new places, trying different cuisines, and having deep conversations
        over coffee. Yoga enthusiast and avid reader. Looking for someone who
        values authenticity and enjoys meaningful connections.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 14,
    color: COLORS.gray, // Using the gray from your theme
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase", // Subtle 2026 style for section headers
    letterSpacing: 0.5,
  },
  bioText: {
    fontSize: 15,
    color: COLORS.white,
    lineHeight: 22, // Equivalent to leading-relaxed for better readability
    fontWeight: "400",
  },
});