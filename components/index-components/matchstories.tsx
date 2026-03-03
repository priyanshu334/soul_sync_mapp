import { ScrollView, Text, View } from "react-native"
import MatchStoryItem from "./MatchStoryItem"

export default function MatchesStories() {
    return (
        <View style={{ marginTop: 10 }}>
            <Text
                style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "600",
                    paddingHorizontal: 20,
                    marginBottom: 12,
                }}
            >
                Your Cosmic Matches ✨
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            >
                {[...Array(8)].map((_, i) => (
                    <MatchStoryItem key={i} />
                ))}
            </ScrollView>
        </View>
    )
}