import { Text, View } from "react-native"

export default function HoroscopeFeed() {
    return (
        <View style={{ padding: 20 }}>
            <Text
                style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "600",
                    marginBottom: 12,
                }}
            >
                Daily Horoscope 🔮
            </Text>

            <View
                style={{
                    backgroundColor: "#1E293B",
                    padding: 18,
                    borderRadius: 16,
                    marginBottom: 16,
                }}
            >
                <Text style={{ color: "#7C3AED", fontWeight: "600", marginBottom: 8 }}>
                    Love
                </Text>
                <Text style={{ color: "#94A3B8" }}>
                    Today is a powerful day for emotional connection. Open your heart.
                </Text>
            </View>

            <View
                style={{
                    backgroundColor: "#1E293B",
                    padding: 18,
                    borderRadius: 16,
                    marginBottom: 16,
                }}
            >
                <Text style={{ color: "#7C3AED", fontWeight: "600", marginBottom: 8 }}>
                    Career
                </Text>
                <Text style={{ color: "#94A3B8" }}>
                    A new opportunity may appear. Trust your intuition.
                </Text>
            </View>
        </View>
    )
}