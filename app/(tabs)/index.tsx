import HoroscopeFeed from "@/components/index-components/Feed"
import MatchFound from "@/components/index-components/MatchFound"
import MatchesStories from "@/components/index-components/matchstories"
import TopBar from "@/components/index-components/TopBar"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, ActivityIndicator, View } from "react-native"
import React, { useState, useEffect } from "react"
import { useAuth } from "@/providers/AuthProvider"
import { getMatchSuggestions, getProfile, UserProfile } from "@/src/services/profile.service"

export default function HomeScreen() {
  const { session } = useAuth();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!session?.user?.id) return;
      try {
        const [matchesRes, profileRes] = await Promise.all([
          getMatchSuggestions(session.user.id),
          getProfile(session.user.id)
        ]);

        if (matchesRes.data) setProfiles(matchesRes.data);
        if (profileRes.data) setUserProfile(profileRes.data as UserProfile);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [session?.user?.id]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000000ff", justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6A00F4" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000ff" }}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <TopBar />
        <MatchesStories profiles={profiles} />
        <MatchFound profiles={profiles} />
        <HoroscopeFeed userProfile={userProfile} />
      </ScrollView>
    </SafeAreaView>
  )
}