import { COLORS } from "@/constants/theme"; // Using your theme file
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function ContactUs() {
  const socials = [
    {
      name: "Instagram",
      icon: <FontAwesome6 name="instagram" size={24} color={COLORS.white} />,
      link: "https://instagram.com/yourapp"
    },
    {
      name: "Facebook",
      icon: <FontAwesome6 name="facebook" size={24} color={COLORS.white} />,
      link: "https://facebook.com/yourapp"
    },
    {
      name: "Threads",
      icon: <FontAwesome6 name="threads" size={24} color={COLORS.white} />,
      link: "https://threads.net/@yourapp"
    },
    {
      name: "X",
      icon: <FontAwesome6 name="x-twitter" size={24} color={COLORS.white} />,
      link: "https://x.com/yourapp"
    },
    {
      name: "LinkedIn",
      icon: <FontAwesome6 name="linkedin" size={24} color={COLORS.white} />,
      link: "https://linkedin.com/company/yourapp"
    },
    {
      name: "Reddit",
      icon: <FontAwesome6 name="reddit" size={24} color={COLORS.white} />,
      link: "https://reddit.com/r/yourapp"
    }
  ];

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.subtitle}>
            Reach out through any platform below. We usually respond within 24 hours.
          </Text>
        </View>

        {/* Email Section */}
        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => openLink("mailto:support@yourapp.com")}
        >
          <Ionicons name="mail-outline" size={20} color="white" />
          <Text style={styles.emailText}>Email Support</Text>
        </TouchableOpacity>

        {/* Social Links Grid */}
        <View style={styles.grid}>
          {socials.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.socialItem}
              onPress={() => openLink(item.link)}
            >
              <View style={styles.iconContainer}>{item.icon}</View>
              <Text style={styles.socialName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer Note */}
        <Text style={styles.footerNote}>
          Your privacy and messages are always protected.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.surface, // From your theme
    borderRadius: 20,
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 8,
  },
  emailButton: {
    flexDirection: "row",
    backgroundColor: COLORS.primaryStart,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 30,
    gap: 10,
  },
  emailText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  socialItem: {
    width: "30%", // Creates a 3-column grid
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 12,
    borderRadius: 15,
    marginBottom: 8,
  },
  socialName: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: "500",
  },
  footerNote: {
    textAlign: "center",
    fontSize: 12,
    color: "#555",
    marginTop: 20,
  },
});