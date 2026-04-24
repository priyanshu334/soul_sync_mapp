import { ScrollView, Text, View } from "react-native"
import MatchStoryItem from "./MatchStoryItem"
import { UserProfile } from "@/src/services/profile.service"

export default function MatchesStories({ profiles }: { profiles: UserProfile[] }) {
    if (!profiles || profiles.length === 0) return null;

    return (
        <View style={{ marginTop: 20 }}>
            <Text
                style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "600",
                    paddingHorizontal: 20,
                    marginBottom: 12,
                }}
            >
                Your Cosmic Matches 
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            >
                {profiles.map((profile) => (
                    <MatchStoryItem key={profile.id} profile={profile} />
                ))}
            </ScrollView>
        </View>
    )
}