import { PremiumButton } from "@/components/ui/PremiumButton"
import { COLORS } from "@/constants/theme"
import { useOnboarding } from "@/providers/OnboardingProvider"
import { BlurView } from "expo-blur"
import { router } from "expo-router"
import { useState } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const interestsList = ["Travel", "Music", "Astrology", "Fitness", "Art", "Tech", "Cooking", "Nature", "Movies", "Gaming"]

export default function Bio() {
    const { onboardingData, updateOnboardingData } = useOnboarding()
    const [bio, setBio] = useState(onboardingData.bio || "")
    const [selectedInterests, setSelectedInterests] = useState<string[]>(onboardingData.interests || [])

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        )
    }

    const handleContinue = () => {
        updateOnboardingData({ bio, interests: selectedInterests })
        router.push("/review")
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: "83.3%" }]} />
                    </View>
                    <Text style={styles.stepText}>Step 5 of 6</Text>
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.title}>Your soul's story</Text>
                    <Text style={styles.subtitle}>
                        Share a bit about yourself and your passions. Let your personality shine through.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Bio</Text>
                    <BlurView intensity={20} tint="dark" style={styles.bioContainer}>
                        <TextInput
                            placeholder="Write something unique about you..."
                            placeholderTextColor={COLORS.gray + "80"}
                            multiline
                            numberOfLines={4}
                            value={bio}
                            onChangeText={setBio}
                            style={styles.bioInput}
                        />
                    </BlurView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Interests</Text>
                    <View style={styles.interestsGrid}>
                        {interestsList.map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => toggleInterest(item)}
                                style={[
                                    styles.interestTag,
                                    selectedInterests.includes(item) && styles.interestTagSelected
                                ]}
                            >
                                <Text style={[
                                    styles.interestText,
                                    selectedInterests.includes(item) && styles.interestTextSelected
                                ]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={{ height: 40 }} />

                <PremiumButton
                    title="Continue"
                    onPress={handleContinue}
                    disabled={!bio.trim() || selectedInterests.length === 0}
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
    section: {
        marginBottom: 32,
    },
    label: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 16,
    },
    bioContainer: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
        padding: 16,
    },
    bioInput: {
        color: COLORS.white,
        fontSize: 16,
        lineHeight: 24,
        height: 120,
        textAlignVertical: "top",
    },
    interestsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    interestTag: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    interestTagSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    interestText: {
        color: COLORS.gray,
        fontSize: 14,
        fontWeight: "600",
    },
    interestTextSelected: {
        color: COLORS.white,
    },
})