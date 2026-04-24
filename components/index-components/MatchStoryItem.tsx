import { Image, Text, TouchableOpacity, View } from "react-native"
import { UserProfile } from "@/src/services/profile.service"

export default function MatchStoryItem({ profile }: { profile: UserProfile }) {
    const primaryImage = profile.images?.[0] || `https://i.pravatar.cc/150?u=${profile.id}`;
    
    return (
        <TouchableOpacity style={{ alignItems: "center", marginRight: 14 }}>
            <View
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    borderWidth: 2,
                    borderColor: "#7C3AED",
                    padding: 3,
                }}
            >
                <Image
                    source={{ uri: primaryImage }}
                    style={{ width: "100%", height: "100%", borderRadius: 35 }}
                />
            </View>

            <Text style={{ color: "white", fontSize: 12, marginTop: 6 }} numberOfLines={1}>
                {profile.username?.split(' ')[0] || "User"}
            </Text>
        </TouchableOpacity>
    )
}