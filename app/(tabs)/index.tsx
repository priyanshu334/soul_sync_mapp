import HoroscopeFeed from "@/components/index-components/Feed"
import MatchFound from "@/components/index-components/MatchFound"
import MatchesStories from "@/components/index-components/matchstories"
import TopBar from "@/components/index-components/TopBar"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, ActivityIndicator, View } from "react-native"
import React, { useState, useEffect } from "react"
import { useAuth } from "@/providers/AuthProvider"
import { getMatchSuggestions, UserProfile } from "@/src/services/profile.service"

export default function HomeScreen() {
  const { session } = useAuth();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      if (!session?.user?.id) return;
      try {
        const { data, error } = await getMatchSuggestions(session.user.id);
        if (error) throw error;
        setProfiles(data || []);
      } catch (error) {
        console.error("Error fetching match suggestions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopBar />
        <MatchesStories profiles={profiles} />
        <MatchFound profiles={profiles} />
        <HoroscopeFeed />
      </ScrollView>
    </SafeAreaView>
  )
}