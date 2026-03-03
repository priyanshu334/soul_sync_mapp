import { router } from "expo-router"
import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

export default function UsernameScreen() {
    const [username, setUsername] = useState("")

    return (
        <View style={{ flex: 1, backgroundColor: "#0F172A", padding: 24, justifyContent: "center" }}>
            <Text style={{ color: "white", fontSize: 28, fontWeight: "bold", marginBottom: 8 }}>
                Create Username
            </Text>

            <Text style={{ color: "#94A3B8", marginBottom: 24 }}>
                This will be visible on your profile
            </Text>

            <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="username"
                placeholderTextColor="#94A3B8"
                style={{
                    backgroundColor: "#1E293B",
                    color: "white",
                    padding: 16,
                    borderRadius: 12,
                    marginBottom: 30,
                }}
            />

            <TouchableOpacity
                onPress={() => router.push("/(onboarding)/birth-details")}
                style={{
                    backgroundColor: "#7C3AED",
                    padding: 16,
                    borderRadius: 12,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "white", fontWeight: "600" }}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    )
}