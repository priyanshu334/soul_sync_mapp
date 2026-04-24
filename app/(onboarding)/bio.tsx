import { PremiumButton } from "@/components/ui/PremiumButton"
import { COLORS } from "@/constants/theme"
import { useOnboarding } from "@/providers/OnboardingProvider"
import { BlurView } from "expo-blur"
import { router } from "expo-router"
import { useState } from "react"
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"

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
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header with Step Progress */}
                    <View style={styles.header}>
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressBar, { width: "83.3%" }]} />
                        </View>
                        <Text style={styles.stepText}>STEP 5 <Text style={{ color: COLORS.primary }}>/ 6</Text></Text>
                    </View>

                    {/* Title Section */}
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>Your soul's{"\n"}story</Text>
                        <Text style={styles.subtitle}>
                            Share your passions. Let your personality shine through the cosmos.
                        </Text>
                    </View>

                    {/* Bio Input Section */}
                    <View style={styles.section}>
                        <Text style={styles.label}>The Bio</Text>
                        <BlurView intensity={30} tint="dark" style={styles.bioWrapper}>
                            <TextInput
                                placeholder="Tell the universe something unique about you..."
                                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                                multiline
                                maxLength={250}
                                value={bio}
                                onChangeText={setBio}
                                style={styles.bioInput}
                            />
                            <Text style={styles.charCount}>{bio.length}/250</Text>
                        </BlurView>
                    </View>

                    {/* Interests Section */}
                    <View style={styles.section}>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>Passions</Text>
                            <Text style={styles.labelHint}>{selectedInterests.length} selected</Text>
                        </View>
                        <View style={styles.interestsGrid}>
                            {interestsList.map((item) => {
                                const isSelected = selectedInterests.includes(item);
                                return (
                                    <TouchableOpacity
                                        key={item}
                                        activeOpacity={0.7}
                                        onPress={() => toggleInterest(item)}
                                        style={[
                                            styles.interestTag,
                                            isSelected && styles.interestTagSelected
                                        ]}
                                    >
                                        <Text style={[
                                            styles.interestText,
                                            isSelected && styles.interestTextSelected
                                        ]}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <PremiumButton
                            title="Continue"
                            onPress={handleContinue}
                            disabled={!bio.trim() || selectedInterests.length === 0}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        paddingHorizontal: 28,
        paddingTop: 20,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 40,
    },
    progressTrack: {
        height: 6,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 10,
        marginBottom: 12,
        overflow: 'hidden'
    },
    progressBar: {
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 10,
    },
    stepText: {
        color: COLORS.gray,
        fontSize: 10,
        fontWeight: "800",
        letterSpacing: 1.5,
    },
    titleSection: {
        marginBottom: 32,
    },
    title: {
        color: COLORS.white,
        fontSize: 36,
        fontWeight: "700",
        lineHeight: 44,
    },
    subtitle: {
        color: COLORS.gray,
        fontSize: 16,
        marginTop: 12,
        lineHeight: 24,
        opacity: 0.8,
    },
    section: {
        marginBottom: 36,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    label: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    labelHint: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: '600',
    },
    bioWrapper: {
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.12)",
        overflow: "hidden",
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.03)",
    },
    bioInput: {
        color: COLORS.white,
        fontSize: 16,
        lineHeight: 24,
        height: 140,
        textAlignVertical: "top",
    },
    charCount: {
        textAlign: 'right',
        color: COLORS.gray,
        fontSize: 10,
        marginTop: 8,
    },
    interestsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    interestTag: {
        backgroundColor: "rgba(255, 255, 255, 0.06)",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    interestTagSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        // Optional glow
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    interestText: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 14,
        fontWeight: "600",
    },
    interestTextSelected: {
        color: COLORS.white,
    },
    footer: {
        marginTop: 20,
    },
})