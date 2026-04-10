import { Text, View } from "react-native"

const H_PAD = 15;
const GAP = 10;

const readings = [
    {
        id: '1',
        category: 'Love',
        text: 'Today is a powerful day for emotional connection. Open your heart.',
    },
    {
        id: '2',
        category: 'Career',
        text: 'A new opportunity may appear. Trust your intuition.',
    },
]

export default function HoroscopeFeed() {
    return (
        <View style={{ paddingHorizontal: H_PAD, paddingVertical: 44 }}>
            <Text
                style={{
                    fontFamily: 'Forum_400Regular',
                    color: '#ffffff',
                    fontSize: 22,
                    letterSpacing: 1,
                    marginBottom: 14,
                }}
            >
                Daily Horoscope 
            </Text>

            <View style={{ gap: GAP }}>
                {readings.map((item) => (
                    <View
                        key={item.id}
                        style={{
                            backgroundColor: '#0d1020',
                            padding: 18,
                            borderRadius: 0,
                            borderWidth: 1,
                            borderColor: 'rgba(255,255,255,0.1)',
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'Forum_400Regular',
                                color: '#a78bfa',
                                fontSize: 16,
                                letterSpacing: 0.5,
                                marginBottom: 8,
                            }}
                        >
                            {item.category}
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'Nunito_300Light',
                                color: 'rgba(255,255,255,0.38)',
                                fontSize: 13,
                                lineHeight: 20,
                                letterSpacing: 0.3,
                            }}
                        >
                            {item.text}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}