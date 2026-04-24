import { PremiumButton } from "@/components/ui/PremiumButton"
import { PremiumInput } from "@/components/ui/PremiumInput"
import { COLORS } from "@/constants/theme"
import { useOnboarding } from "@/providers/OnboardingProvider"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useState } from "react"
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native"

export default function UsernameScreen() {
    const { onboardingData, updateOnboardingData } = useOnboarding()
    const [username, setUsername] = useState(onboardingData.username || "")

    const handleContinue = () => {
        if (!username.trim()) return
        updateOnboardingData({ username })
        router.push("/birth-details")
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: "16.6%" }]} />
                    </View>
                    <Text style={styles.stepText}>Step 1 of 6</Text>
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.title}>What's your cosmic name?</Text>
                    <Text style={styles.subtitle}>
                        This will be visible on your profile. Choose something that represents your soul.
                    </Text>
                </View>

                <PremiumInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter username"
                    autoFocus
                    icon={<Ionicons name="at" size={20} color={COLORS.primary} />}
                />

                <View style={{ flex: 1 }} />

                <PremiumButton
                    title="Continue"
                    onPress={handleContinue}
                    disabled={!username.trim()}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        padding: 24,
        paddingTop: 60,
    },
    header: {
        marginBottom: 40,
    },
    progressContainer: {
        height: 4,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 2,
        marginBottom: 8,
    },
    progressBar: {
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 2,
    },
    stepText: {
        color: COLORS.gray,
        fontSize: 12,
        fontWeight: "600",
    },
    titleSection: {
        marginBottom: 32,
    },
    title: {
        color: COLORS.white,
        fontSize: 32,
        fontWeight: "bold",
        lineHeight: 40,
    },
    subtitle: {
        color: COLORS.gray,
        fontSize: 16,
        marginTop: 12,
        lineHeight: 24,
    },
})