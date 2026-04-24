import { PremiumButton } from "@/components/ui/PremiumButton"
import { COLORS } from "@/constants/theme"
import { useOnboarding } from "@/providers/OnboardingProvider"
import { BlurView } from "expo-blur"
import { router } from "expo-router"
import { useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function Preferences() {
    const { onboardingData, updateOnboardingData } = useOnboarding()
    const [ageRange, setAgeRange] = useState(onboardingData.preferredAgeRange || "18 - 30")
    const [gender, setGender] = useState(onboardingData.preferredGender || "Female")

    const handleContinue = () => {
        updateOnboardingData({
            preferredAgeRange: ageRange,
            preferredGender: gender
        })
        router.push("/photos")
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: "50%" }]} />
                    </View>
                    <Text style={styles.stepText}>Step 3 of 6</Text>
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.title}>Who are you looking for?</Text>
                    <Text style={styles.subtitle}>
                        We use these preferences to find souls that align with your cosmic energy.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Interested In</Text>
                    <View style={styles.genderContainer}>
                        {["Male", "Female", "Other"].map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => setGender(item)}
                                style={[
                                    styles.genderOption,
                                    gender === item && styles.genderOptionSelected
                                ]}
                            >
                                <Text style={[
                                    styles.genderText,
                                    gender === item && styles.genderTextSelected
                                ]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Preferred Age Range</Text>
                    <BlurView intensity={20} tint="dark" style={styles.ageBox}>
                        <Text style={styles.ageText}>{ageRange}</Text>
                        <Text style={styles.ageSubtext}>You can refine this later in settings.</Text>
                    </BlurView>
                </View>

                <View style={{ flex: 1 }} />

                <PremiumButton
                    title="Continue"
                    onPress={handleContinue}
                />
            </ScrollView>
        </View>
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
        flexGrow: 1,
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
        marginBottom: 40,
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
    section: {
        marginBottom: 32,
    },
    label: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 16,
    },
    genderContainer: {
        flexDirection: "row",
        gap: 12,
    },
    genderOption: {
        flex: 1,
        height: 56,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    genderOptionSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    genderText: {
        color: COLORS.gray,
        fontSize: 16,
        fontWeight: "600",
    },
    genderTextSelected: {
        color: COLORS.white,
    },
    ageBox: {
        padding: 24,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
    },
    ageText: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    ageSubtext: {
        color: COLORS.gray,
        fontSize: 14,
        textAlign: "center",
        marginTop: 8,
    },
})