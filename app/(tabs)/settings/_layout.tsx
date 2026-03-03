import { Stack } from "expo-router"

export default function SettingsLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "#0F172A" },
                headerTintColor: "white",
                headerTitleStyle: { color: "white" },
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="account" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="security" />
            <Stack.Screen name="privacy_policy" />
            <Stack.Screen name="terms" />
            <Stack.Screen name="about" />
            <Stack.Screen name="contact" />
            <Stack.Screen name="community_guidelines" />
        </Stack>

    )
}