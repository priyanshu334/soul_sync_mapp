import { Redirect } from "expo-router";

export default function OnboardingIndex() {
  // Use a relative href so the redirect is handled by the local (onboarding) stack.
  return <Redirect href="./username" />;
}
