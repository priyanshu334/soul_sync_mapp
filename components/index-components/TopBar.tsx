import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"

export default function TopBar() {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 14,
            }}
        >
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
                Cosmic
            </Text>

            <View style={{ flexDirection: "row", gap: 18 }}>
                <TouchableOpacity onPress={() => { }}>
                    <Ionicons name="notifications-outline" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/(tabs)/chat")}>
                    <Ionicons name="chatbubble-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}