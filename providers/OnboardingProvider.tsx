import React, { createContext, useContext, useState } from "react";
import { supabase } from "@/src/lib/supabase";

export type OnboardingData = {
  username?: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  preferredAgeRange?: string;
  preferredGender?: string;
  bio?: string;
  interests?: string[];
  images?: string[];
};

type OnboardingContextType = {
  onboardingData: OnboardingData;
  onboardingCompleted: boolean;

  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  resetOnboardingData: () => void;
  completeOnboarding: () => void;
  checkOnboardingStatus: (userId: string) => Promise<void>;
  loading: boolean;
};

const OnboardingContext = createContext<
  OnboardingContextType | undefined
>(undefined);

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [onboardingData, setOnboardingData] =
    useState<OnboardingData>({
      interests: [],
      images: [],
    });

  const [onboardingCompleted, setOnboardingCompleted] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const updateOnboardingData = (
    data: Partial<OnboardingData>
  ) => {
    setOnboardingData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const resetOnboardingData = () => {
    setOnboardingData({
      interests: [],
      images: [],
    });

    setOnboardingCompleted(false);
  };

  const completeOnboarding = () => {
    setOnboardingCompleted(true);
  };

  const checkOnboardingStatus = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", userId)
        .single();

      if (data) {
        setOnboardingCompleted(!!data.onboarding_completed);
      }
    } catch (error) {
      console.error("Error checking onboarding status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        onboardingCompleted,
        updateOnboardingData,
        resetOnboardingData,
        completeOnboarding,
        checkOnboardingStatus,
        loading,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error(
      "useOnboarding must be used within OnboardingProvider"
    );
  }

  return context;
};