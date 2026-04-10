import { Stack } from "expo-router"

export default function SettingsLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "#000000ff" },
                headerTintColor: "white",
                headerTitleStyle: {
                    fontFamily: "Forum_400Regular",
                    color: "#ffffff",
                    fontSize: 22,
                    letterSpacing:1,
                },
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