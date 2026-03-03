import { router } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"

export default function Preferences() {
    return (
        <View style={{ flex: 1, backgroundColor: "#0F172A", padding: 24 }}>
            <Text style={{ color: "white", fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
                Preferences
            </Text>

            <Text style={{ color: "#94A3B8", marginBottom: 10 }}>
                Preferred Age Range
            </Text>

            <View style={{
                backgroundColor: "#1E293B",
                padding: 20,
                borderRadius: 12,
                marginBottom: 20
            }}>
                <Text style={{ color: "white" }}>18 - 30</Text>
            </View>

            <Text style={{ color: "#94A3B8", marginBottom: 10 }}>
                Preferred Gender
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
                {["Male", "Female", "Other"].map((item) => (
                    <View
                        key={item}
                        style={{
                            backgroundColor: "#1E293B",
                            padding: 12,
                            borderRadius: 10,
                        }}
                    >
                        <Text style={{ color: "white" }}>{item}</Text>
                    </View>
                ))}
            </View>

            <TouchableOpacity
                onPress={() => router.push("/(onboarding)/photos")}
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

const buttonStyle = {
    backgroundColor: "#7C3AED",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
}