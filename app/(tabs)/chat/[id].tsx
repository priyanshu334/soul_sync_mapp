import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const messages = [
    { id: "1", text: "Hey ✨", sender: "other" },
    { id: "2", text: "Hi! I checked our zodiac match 😄", sender: "me" },
    { id: "3", text: "Omg what does it say?", sender: "other" },
]

export default function ChatScreen() {
    const [input, setInput] = useState("")

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0F172A" }}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 20 }}
                renderItem={({ item }) => (
                    <View
                        style={{
                            alignSelf:
                                item.sender === "me" ? "flex-end" : "flex-start",
                            backgroundColor:
                                item.sender === "me" ? "#7C3AED" : "#1E293B",
                            padding: 14,
                            borderRadius: 18,
                            marginBottom: 10,
                            maxWidth: "75%",
                        }}
                    >
                        <Text style={{ color: "white" }}>{item.text}</Text>
                    </View>
                )}
            />

            {/* Input Bar */}
            <View
                style={{
                    flexDirection: "row",
                    padding: 14,
                    borderTopWidth: 1,
                    borderTopColor: "#1E293B",
                    alignItems: "center",
                }}
            >
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Send a cosmic message..."
                    placeholderTextColor="#64748B"
                    style={{
                        flex: 1,
                        backgroundColor: "#1E293B",
                        borderRadius: 25,
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                        color: "white",
                    }}
                />

                <TouchableOpacity
                    style={{
                        marginLeft: 10,
                        backgroundColor: "#7C3AED",
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Ionicons name="send" size={18} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}