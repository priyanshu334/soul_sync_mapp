import { Stack } from "expo-router";

export default function OnBoardingLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
            <Stack.Screen name="username" />
            <Stack.Screen name="birth-details" />
            <Stack.Screen name="prefrenses" />
            <Stack.Screen name="bio" />
            <Stack.Screen name="review" />
        </Stack>
    )
}