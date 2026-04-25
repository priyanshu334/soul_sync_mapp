import { PremiumButton } from "@/components/ui/PremiumButton"
import { PremiumInput } from "@/components/ui/PremiumInput"
import { COLORS } from "@/constants/theme"
import { useOnboarding } from "@/providers/OnboardingProvider"
import { Ionicons } from "@expo/vector-icons"
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { router } from "expo-router"
import { useState } from "react"
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

export default function BirthDetails() {
    const { onboardingData, updateOnboardingData } = useOnboarding()
    const [birthDate, setBirthDate] = useState(onboardingData.birthDate || "")
    const [birthTime, setBirthTime] = useState(onboardingData.birthTime || "")
    const [birthPlace, setBirthPlace] = useState(onboardingData.birthPlace || "")

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)

    const handleContinue = () => {
        if (!birthDate || !birthTime || !birthPlace) return
        updateOnboardingData({ birthDate, birthTime, birthPlace })
        router.push("/preferences")
    }

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const y = selectedDate.getFullYear();
            const m = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const d = selectedDate.getDate().toString().padStart(2, '0');
            setBirthDate(`${y}-${m}-${d}`);
        }
    };

    const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
        setShowTimePicker(false);
        if (selectedTime) {
            const hours = selectedTime.getHours().toString().padStart(2, '0');
            const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
            setBirthTime(`${hours}:${minutes}`);
        }
    };

    const formatDateDisplay = (dateStr: string) => {
        if (!dateStr) return "";
        if (dateStr.includes('-')) {
            const [y, m, d] = dateStr.split('-');
            return `${d}/${m}/${y}`;
        }
        return dateStr;
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
                    <Pressable onPress={() => {
                        Keyboard.dismiss();
                        setShowDatePicker(true);
                    }}>
                        <View pointerEvents="none">
                            <PremiumInput
                                placeholder="Birth Date (DD/MM/YYYY)"
                                value={formatDateDisplay(birthDate)}
                                editable={false}
                                icon={<Ionicons name="calendar-outline" size={20} color={COLORS.primary} />}
                            />
                        </View>
                    </Pressable>

                    <Pressable onPress={() => {
                        Keyboard.dismiss();
                        setShowTimePicker(true);
                    }}>
                        <View pointerEvents="none">
                            <PremiumInput
                                placeholder="Birth Time (HH:MM)"
                                value={birthTime}
                                editable={false}
                                icon={<Ionicons name="time-outline" size={20} color={COLORS.primary} />}
                            />
                        </View>
                    </Pressable>

                    <PremiumInput
                        placeholder="Birth Place"
                        value={birthPlace}
                        onChangeText={setBirthPlace}
                        icon={<Ionicons name="location-outline" size={20} color={COLORS.primary} />}
                    />
                </View>

                {showDatePicker && (
                    <DateTimePicker
                        value={birthDate ? new Date(birthDate) : new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onDateChange}
                        maximumDate={new Date()}
                    />
                )}

                {showTimePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="time"
                        is24Hour={true}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onTimeChange}
                    />
                )}

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