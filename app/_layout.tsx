import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { ModalStateProvider } from "@/providers/ModalStateProvider";
import {
  OnboardingProvider,
  useOnboarding,
} from "@/providers/OnboardingProvider";
import { Stack, useRootNavigationState, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

function RootNavigator() {
  const { session, loading } = useAuth();
  const { onboardingCompleted, checkOnboardingStatus, loading: onboardingLoading } = useOnboarding();

  const segments = useSegments();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (session?.user?.id) {
      checkOnboardingStatus(session.user.id);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (!rootNavigationState?.key) return; // Wait until navigation tree is ready
    if (loading || onboardingLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboardingGroup = segments[0] === "(onboarding)";
    const inTabsGroup = segments[0] === "(tabs)";

    // User not logged in
    if (!session && !inAuthGroup) {
      router.replace("/(auth)");
      return;
    }

    // User logged in but onboarding not done
    if (session && !onboardingCompleted && !inOnboardingGroup) {
      // Explicitly go to the first onboarding screen
      router.replace("/(onboarding)/username");
      return;
    }

    // User logged in and onboarding done
    if (session && onboardingCompleted && !inTabsGroup) {
      router.replace("/(tabs)");
      return;
    }
  }, [session, loading, onboardingCompleted, segments, rootNavigationState?.key, onboardingLoading]);

  if (loading || (session && onboardingLoading)) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator size="large" color="#6A00F4" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <ModalStateProvider>
          <RootNavigator />
        </ModalStateProvider>
      </OnboardingProvider>
    </AuthProvider>
  );
}