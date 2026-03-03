import { router } from "expo-router"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

const interests = ["Travel", "Music", "Astrology", "Fitness", "Art", "Tech"]

export default function Bio() {
    return (
        <View style={{ flex: 1, backgroundColor: "#0F172A", padding: 24 }}>
            <Text style={{ color: "white", fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
                About You
            </Text>

            <TextInput
                placeholder="Write your bio..."
                placeholderTextColor="#94A3B8"
                multiline
                style={{
                    backgroundColor: "#1E293B",
                    color: "white",
                    padding: 16,
                    borderRadius: 12,
                    height: 120,
                    marginBottom: 20,
                }}
            />

            <Text style={{ color: "#94A3B8", marginBottom: 10 }}>
                Select Interests
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                {interests.map((item) => (
                    <View
                        key={item}
                        style={{
                            backgroundColor: "#1E293B",
                            paddingHorizontal: 14,
                            paddingVertical: 8,
                            borderRadius: 20,
                        }}
                    >
                        <Text style={{ color: "white" }}>{item}</Text>
                    </View>
                ))}
            </View>

            <TouchableOpacity
                onPress={() => router.push("/(onboarding)/review")}
                style={{
                    backgroundColor: "#7C3AED",
                    padding: 16,
                    borderRadius: 12,
                    alignItems: "center",
                    marginTop: 20,
                }}
            >
                <Text style={{ color: "white" }}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}