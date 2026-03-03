import HoroscopeFeed from "@/components/index-components/Feed"
import MatchesStories from "@/components/index-components/matchstories"
import TopBar from "@/components/index-components/TopBar"
import { SafeAreaView, ScrollView } from "react-native"

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopBar />
        <MatchesStories />
        <HoroscopeFeed />
      </ScrollView>
    </SafeAreaView>
  )
}