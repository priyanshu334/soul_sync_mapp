import { router } from "expo-router"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

export default function BirthDetails() {
    return (
        <View style={{ flex: 1, backgroundColor: "#0F172A", padding: 24 }}>
            <Text style={{ color: "white", fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
                Birth Details
            </Text>

            <TextInput
                placeholder="Birth Date (DD/MM/YYYY)"
                placeholderTextColor="#94A3B8"
                style={inputStyle}
            />

            <TextInput
                placeholder="Birth Time (HH:MM)"
                placeholderTextColor="#94A3B8"
                style={inputStyle}
            />

            <TextInput
                placeholder="Birth Place"
                placeholderTextColor="#94A3B8"
                style={inputStyle}
            />

            <TouchableOpacity
                onPress={() => router.push("/(onboarding)/prefrenses")}
            >
                <Text style={{ color: "white" }}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

const inputStyle = {
    backgroundColor: "#1E293B",
    color: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
}

const buttonStyle = {
    backgroundColor: "#7C3AED",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
}