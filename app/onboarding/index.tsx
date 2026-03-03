import { COLORS } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ProfileSetup() {
    const router = useRouter();
    const [userName, setUserName] = useState("")
    const [bio, setBio] = useState("")
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background, padding: 20, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: COLORS.white }}>Profile Setup</Text>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>Let's get to know you better</Text>
            <TextInput
                placeholder="Username"
                placeholderTextColor={COLORS.gray}
                value={userName}
                onChangeText={setUserName}
                style={{ width: "100%", height: 50, backgroundColor: COLORS.gray, borderRadius: 10, padding: 10, marginTop: 20 }}
            />
            <TextInput
                placeholder="Bio"
                placeholderTextColor={COLORS.gray}
                value={bio}
                onChangeText={setBio}
                style={{ width: "100%", height: 50, backgroundColor: COLORS.gray, borderRadius: 10, padding: 10, marginTop: 20 }}
            />
            <TouchableOpacity
                style={{ width: "100%", height: 50, backgroundColor: COLORS.primaryStart, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 20 }}
                onPress={() => router.push("/(tabs)")}
            >
                <Text style={{ color: COLORS.white }}>Next</Text>
            </TouchableOpacity>


        </View>
    )
}