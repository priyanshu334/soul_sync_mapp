import { COLORS } from "@/constants/theme";
import { supabase } from "@/src/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const H_PAD = 10;

const cosmic = {
  headerTitle: {
    fontFamily: "Forum_400Regular",
    fontSize: 30,
    color: "#ffffff",
    paddingVertical: 2,
    letterSpacing: 1,
  },
};

const settingsGroups = [
  {
    label: "Account & Security",
    items: [
      {
        title: "Account",
        icon: "person-outline",
        route: "/(tabs)/profile/(settings)/account",
      },
    
      {
        title: "Security",
        icon: "lock-closed-outline",
        route: "/(tabs)/profile/(settings)/security",
      },
      {
        title: "Notifications",
        icon: "notifications-outline",
        route: "/(tabs)/profile/(settings)/notification",
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
      },
      {
        title: "Terms & Conditions",
        icon: "document-outline",
        route: "/(tabs)/profile/(settings)/terms",
      },
      {
        title: "Community Guidelines",
        icon: "people-outline",
        route: "/(tabs)/profile/(settings)/community_guidelines",
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
      },
      {
        title: "Contact Us",
        icon: "mail-outline",
        route: "/(tabs)/profile/(settings)/contact",
      },
    ],
  },
];

export default function SettingsScreen() {
  const handleLogout = () => {
    supabase.auth.signOut();
    router.replace("/(auth)");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Settings</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

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
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name={item.icon as any}
                        size={20}
                        color="#8B5CF6"
                      />
                    </View>

                    <Text style={styles.itemText}>{item.title}</Text>

                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color="#475569"
                    />
                  </TouchableOpacity>

                  {/* Subtle divider between items, but not after the last one */}
                  {itemIndex < group.items.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: H_PAD,
    paddingVertical: 44,
  },
  headerTitle: {
    ...cosmic.headerTitle,
    marginBottom: 32,
  },
  groupContainer: {
    marginBottom: 28,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: H_PAD,
    paddingVertical: 44,
  },
  groupLabel: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    overflow: "hidden", // Ensures dividers and touch effects don't bleed
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(124, 58, 237, 0.15)", // Soft glow around icon
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  logoutButton: {
    backgroundColor: "#EF4444",
    padding: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  itemText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#334155",
    marginLeft: 66, // Aligns divider with the start of the text
  },
});
