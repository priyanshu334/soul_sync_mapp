import { Image, Text, TouchableOpacity, View } from "react-native"

export default function MatchStoryItem() {
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
                    source={{ uri: "https://i.pravatar.cc/150?img=1" }}
                    style={{ width: "100%", height: "100%", borderRadius: 35 }}
                />
            </View>

            <Text style={{ color: "white", fontSize: 12, marginTop: 6 }}>
                Riya
            </Text>
        </TouchableOpacity>
    )
}