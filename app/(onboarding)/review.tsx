import { router } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"

export default function Review() {
    return (
        <View style={{ flex: 1, backgroundColor: "#0F172A", padding: 24, justifyContent: "center" }}>
            <Text style={{ color: "white", fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
                You're All Set 🎉
            </Text>

            <Text style={{ color: "#94A3B8", marginBottom: 30 }}>
                Your profile is ready to explore cosmic matches.
            </Text>

            <TouchableOpacity
                onPress={() => router.replace("/(tabs)")}
                style={{
                    backgroundColor: "#7C3AED",
                    padding: 16,
                    borderRadius: 12,
                    alignItems: "center",
                    marginTop: 20,
                }}
            >
                <Text style={{ color: "white" }}>Go to App</Text>
            </TouchableOpacity>
        </View>
    )
}