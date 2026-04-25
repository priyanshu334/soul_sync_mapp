import { PremiumButton } from "@/components/ui/PremiumButton"
import { COLORS } from "@/constants/theme"
import { useAuth } from "@/providers/AuthProvider"
import { useOnboarding } from "@/providers/OnboardingProvider"
import { updateProfile, uploadImage } from "@/src/services/profile.service"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"

export default function Review() {
    const { session } = useAuth()
    const { onboardingData, completeOnboarding } = useOnboarding()
    const [isSaving, setIsSaving] = useState(false)

    const handleFinish = async () => {
        if (!session?.user) return

        setIsSaving(true)
        try {
            // Validate birth details format
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/
            const timeRegex = /^\d{2}:\d{2}$/

            if (onboardingData.birthDate && !dateRegex.test(onboardingData.birthDate)) {
                throw new Error("Invalid birth date format. Please go back and correct it.")
            }
            if (onboardingData.birthTime && !timeRegex.test(onboardingData.birthTime)) {
                throw new Error("Invalid birth time format. Please go back and correct it.")
            }

            // 1. Upload images if any
            let uploadedImageUrls: string[] = []
            if (onboardingData.images && onboardingData.images.length > 0) {
                const uploadPromises = onboardingData.images.map(uri =>
                    uploadImage(session.user.id, uri).catch(err => {
                        console.error("Image upload failed:", err)
                        return null
                    })
                )
                const results = await Promise.all(uploadPromises)
                uploadedImageUrls = results.filter((url): url is string => url !== null)
            }

            // 2. Update profile in Supabase
            const { error } = await updateProfile({
                id: session.user.id,
                username: onboardingData.username,
                birth_date: onboardingData.birthDate,
                birth_time: onboardingData.birthTime,
                birth_place: onboardingData.birthPlace,
                preferred_age_range: onboardingData.preferredAgeRange,
                preferred_gender: onboardingData.preferredGender,
                bio: onboardingData.bio,
                interests: onboardingData.interests,
                images: uploadedImageUrls,
                onboarding_completed: true,
            })

            if (error) throw error

            completeOnboarding()
            router.replace("/(tabs)")
        } catch (error: any) {
            console.error("Failed to save profile:", error)
            Alert.alert("Error", error.message || "Failed to save your profile. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: "100%" }]} />
                    </View>
                    <Text style={styles.stepText}>Step 6 of 6</Text>
                </View>

                <View style={styles.celebrationSection}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="sparkles" size={60} color={COLORS.white} />
                    </View>
                    <Text style={styles.title}>You're All Set 🎉</Text>
                    <Text style={styles.subtitle}>
                        Your cosmic profile is ready. Step into a world of celestial connections and aligned souls.
                    </Text>
                </View>

                <View style={styles.previewCard}>
                    <Text style={styles.previewTitle}>Welcome, {onboardingData.username}!</Text>
                    <Text style={styles.previewSubtitle}>Your journey starts now.</Text>
                </View>

                <View style={{ flex: 1 }} />

                <PremiumButton
                    title={isSaving ? "Creating Profile..." : "Enter Lovitché"}
                    onPress={handleFinish}
                    loading={isSaving}
                />
            </View>
        </View>
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
        marginBottom: 60,
    },
    progressContainer: {
        height: 4,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 2,
        marginBottom: 8,
    },
    progressBar: {
        height: "100%",
        backgroundColor: COLORS.success,
        borderRadius: 2,
    },
    stepText: {
        color: COLORS.gray,
        fontSize: 12,
        fontWeight: "600",
    },
    celebrationSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        color: COLORS.white,
        fontSize: 32,
        fontWeight: "bold",
        textAlign: 'center',
    },
    subtitle: {
        color: COLORS.gray,
        fontSize: 16,
        marginTop: 16,
        lineHeight: 24,
        textAlign: 'center',
    },
    previewCard: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        alignItems: 'center',
    },
    previewTitle: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: "bold",
    },
    previewSubtitle: {
        color: COLORS.gray,
        fontSize: 14,
        marginTop: 4,
    },
})