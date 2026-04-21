import HoroscopeFeed from "@/components/index-components/Feed"
import MatchFound from "@/components/index-components/MatchFound"
import MatchesStories from "@/components/index-components/matchstories"
import TopBar from "@/components/index-components/TopBar"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "react-native"

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000ff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopBar />
        <MatchesStories />
        <MatchFound />
        <HoroscopeFeed />
      </ScrollView>
    </SafeAreaView>
  )
}