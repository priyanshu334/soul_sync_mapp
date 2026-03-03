import { router } from "expo-router"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const conversations = [
    {
        id: "1",
        name: "Riya",
        lastMessage: "Your moon sign is magical ✨",
        time: "2m ago",
        avatar: "https://i.pravatar.cc/150?img=1",
        compatibility: "92%",
    },
    {
        id: "2",
        name: "Aarav",
        lastMessage: "Let’s check our kundli match 😄",
        time: "1h ago",
        avatar: "https://i.pravatar.cc/150?img=2",
        compatibility: "87%",
    },
]

export default function ChatListScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0F172A" }}>
            <Text
                style={{
                    color: "white",
                    fontSize: 26,
                    fontWeight: "700",
                    padding: 20,
                }}
            >
                Messages ✨
            </Text>

            <FlatList
                data={conversations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => router.push(`/(tabs)/chat/${item.id}`)}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 20,
                            paddingVertical: 14,
                        }}
                    >
                        <Image
                            source={{ uri: item.avatar }}
                            style={{
                                width: 55,
                                height: 55,
                                borderRadius: 30,
                                borderWidth: 2,
                                borderColor: "#7C3AED",
                            }}
                        />

                        <View style={{ flex: 1, marginLeft: 14 }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                                {item.name}
                            </Text>
                            <Text style={{ color: "#94A3B8", marginTop: 4 }}>
                                {item.lastMessage}
                            </Text>
                        </View>

                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={{ color: "#7C3AED", fontWeight: "600" }}>
                                {item.compatibility}
                            </Text>
                            <Text style={{ color: "#64748B", fontSize: 12 }}>
                                {item.time}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}