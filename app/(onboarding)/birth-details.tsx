import { PremiumButton } from "@/components/ui/PremiumButton"
import { PremiumInput } from "@/components/ui/PremiumInput"
import { COLORS } from "@/constants/theme"
import { useOnboarding } from "@/providers/OnboardingProvider"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useState } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native"

export default function BirthDetails() {
    const { onboardingData, updateOnboardingData } = useOnboarding()
    const [birthDate, setBirthDate] = useState(onboardingData.birthDate || "")
    const [birthTime, setBirthTime] = useState(onboardingData.birthTime || "")
    const [birthPlace, setBirthPlace] = useState(onboardingData.birthPlace || "")

    const handleContinue = () => {
        if (!birthDate || !birthTime || !birthPlace) return
        updateOnboardingData({ birthDate, birthTime, birthPlace })
        router.push("/preferences")
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: "33.3%" }]} />
                    </View>
                    <Text style={styles.stepText}>Step 2 of 6</Text>
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.title}>Your cosmic entry</Text>
                    <Text style={styles.subtitle}>
                        Your birth details help us calculate your astrological profile and find compatible souls.
                    </Text>
                </View>

                <View style={styles.form}>
                    <PremiumInput
                        placeholder="Birth Date (DD/MM/YYYY)"
                        value={birthDate}
                        onChangeText={setBirthDate}
                        icon={<Ionicons name="calendar-outline" size={20} color={COLORS.primary} />}
                    />

                    <PremiumInput
                        placeholder="Birth Time (HH:MM)"
                        value={birthTime}
                        onChangeText={setBirthTime}
                        icon={<Ionicons name="time-outline" size={20} color={COLORS.primary} />}
                    />

                    <PremiumInput
                        placeholder="Birth Place"
                        value={birthPlace}
                        onChangeText={setBirthPlace}
                        icon={<Ionicons name="location-outline" size={20} color={COLORS.primary} />}
                    />
                </View>

                <View style={{ height: 40 }} />

                <PremiumButton
                    title="Continue"
                    onPress={handleContinue}
                    disabled={!birthDate || !birthTime || !birthPlace}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        padding: 24,
        paddingTop: 60,
        paddingBottom: 40,
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
    form: {
        gap: 8,
    },
})