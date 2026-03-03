import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const settingsGroups = [
    {
        label: "Account & Security",
        items: [
            { title: "Account", icon: "person-outline", route: "/(tabs)/settings/account" },
            { title: "Notifications", icon: "notifications-outline", route: "/(tabs)/settings/notifications" },
            { title: "Security", icon: "lock-closed-outline", route: "/(tabs)/settings/security" },
        ],
    },
    {
        label: "Legal & Privacy",
        items: [
            { title: "Privacy Policy", icon: "document-text-outline", route: "/(tabs)/settings/privacy_policy" },
            { title: "Terms & Conditions", icon: "document-outline", route: "/(tabs)/settings/terms" },
            { title: "Community Guidelines", icon: "people-outline", route: "/(tabs)/settings/community_guidelines" },
        ],
    },
    {
        label: "Support",
        items: [
            { title: "About Us", icon: "information-circle-outline", route: "/(tabs)/settings/about" },
            { title: "Contact Us", icon: "mail-outline", route: "/(tabs)/settings/contact" },
        ],
    },
];

export default function SettingsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.headerTitle}>Settings</Text>

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
                                            <Ionicons name={item.icon as any} size={20} color="#8B5CF6" />
                                        </View>

                                        <Text style={styles.itemText}>{item.title}</Text>

                                        <Ionicons name="chevron-forward" size={18} color="#475569" />
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
        backgroundColor: "#0F172A", // Deeper navy for a more premium dark mode
    },
    scrollContent: {
        padding: 20,
        paddingTop: 40,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: "800",
        color: "white",
        marginBottom: 32,
    },
    groupContainer: {
        marginBottom: 28,
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
        backgroundColor: "#1E293B",
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