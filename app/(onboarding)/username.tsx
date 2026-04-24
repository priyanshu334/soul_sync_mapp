import { PremiumButton } from "@/components/ui/PremiumButton"
import { PremiumInput } from "@/components/ui/PremiumInput"
import { COLORS } from "@/constants/theme"
import { useOnboarding } from "@/providers/OnboardingProvider"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useState } from "react"
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native"

export default function UsernameScreen() {
    const { onboardingData, updateOnboardingData } = useOnboarding()
    const [username, setUsername] = useState(onboardingData.username || "")

    const handleContinue = () => {
        if (!username.trim()) return
        updateOnboardingData({ username })
        router.push("/birth-details")
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    {/* Header with improved progress bar */}
                    <View style={styles.header}>
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressBar, { width: "16.6%" }]} />
                        </View>
                        <Text style={styles.stepText}>STEP 1 <Text style={{ color: COLORS.primary }}>/ 6</Text></Text>
                    </View>

                    {/* Title Section with better hierarchy */}
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>What's your{"\n"}cosmic name?</Text>
                        <Text style={styles.subtitle}>
                            This is how you'll be known in the galaxy. Choose a name that resonates with your spirit.
                        </Text>
                    </View>

                    {/* Input Area */}
                    <View style={styles.inputContainer}>
                        <PremiumInput
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Enter username"
                            autoFocus
                            autoCapitalize="none"
                            icon={<Ionicons name="at-outline" size={22} color={COLORS.primary} />}
                        />
                        {username.length > 0 && (
                            <Text style={styles.inputHint}>Unique and magical</Text>
                        )}
                    </View>

                    <View style={{ flex: 1 }} />

                    {/* Footer Button with spacing for keyboard */}
                    <View style={styles.footer}>
                        <PremiumButton
                            title="Continue"
                            onPress={handleContinue}
                            disabled={username.trim().length < 3}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 28,
        paddingBottom: Platform.OS === 'ios' ? 20 : 40,
    },
    header: {
        marginTop: 20,
        marginBottom: 48,
    },
    progressTrack: {
        height: 6,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 12,
    },
    progressBar: {
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        // Optional: add shadow to progress bar to make it glow
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    stepText: {
        color: COLORS.gray,
        fontSize: 10,
        fontWeight: "800",
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    titleSection: {
        marginBottom: 40,
    },
    title: {
        color: COLORS.white,
        fontSize: 36,
        fontWeight: "700",
        lineHeight: 44,
        letterSpacing: -0.5,
    },
    subtitle: {
        color: COLORS.gray,
        fontSize: 16,
        marginTop: 16,
        lineHeight: 24,
        opacity: 0.8,
    },
    inputContainer: {
        width: '100%',
    },
    inputHint: {
        color: COLORS.primary,
        fontSize: 12,
        marginTop: 8,
        opacity: 0.6,
        textAlign: 'right',
    },
    footer: {
        paddingTop: 20,
    }
})