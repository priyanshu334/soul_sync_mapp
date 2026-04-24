import React, { useMemo } from "react"
import { Text, View, StyleSheet } from "react-native"
import { UserProfile } from "@/src/services/profile.service"
import { getZodiacSign } from "@/src/utils/zodiac"
import { COLORS, SIZES } from "@/constants/theme"
import { LinearGradient } from "expo-linear-gradient"

const H_PAD = 15;
const GAP = 12;

interface HoroscopeFeedProps {
    userProfile: UserProfile | null;
}

// Seeded random number generator
const mulberry32 = (a: number) => {
    return () => {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

const CATEGORIES = [
    { id: 'love', name: 'Love & Connection', color: '#ff4d6d' },
    { id: 'career', name: 'Career & Purpose', color: '#4cc9f0' },
    { id: 'health', name: 'Body & Vitality', color: '#4ade80' },
    { id: 'cosmic', name: 'Cosmic Energy', color: '#7c3aed' },
];

const PHRASES: Record<string, string[]> = {
    love: [
        "Venus aligns with your heart center today, opening doors to a profound soul connection.",
        "A chance encounter could spark a cosmic flame. Keep your heart open to the unexpected.",
        "Communication is your superpower in romance today. Express your deepest desires clearly.",
        "The universe is nudging you to release past shadows. New love requires fresh space.",
        "Your aura is particularly magnetic today. People are drawn to your celestial light."
    ],
    career: [
        "Jupiter brings an expansion of opportunities. A bold move today could lead to long-term success.",
        "Mercury favors your intellectual pursuits. It's a perfect day for signing contracts or starting projects.",
        "Trust your intuition over logic in a meeting today. Your cosmic compass knows the way.",
        "A hidden talent of yours is ready to be showcased. Don't dim your light for others.",
        "Financial alignment is coming. Stay disciplined with your cosmic resources today."
    ],
    health: [
        "The Moon suggests a focus on inner hydration and emotional rest. Rejuvenate your spirit.",
        "Mars provides a burst of physical energy. Channel this into a transformative workout.",
        "Your nervous system needs a celestial grounding. Spend time near nature or in meditation.",
        "Listen to the subtle whispers of your body today. It's asking for a specific kind of nourishment.",
        "Vitality is high, but don't overextend your cosmic battery. Balance is key."
    ],
    cosmic: [
        "The veil between worlds is thin for you today. Pay close attention to your dreams.",
        "A significant synchronicitiy is coming your way. 11:11 or repeated numbers are signs.",
        "Your planetary ruler is in a favorable aspect. You are fully supported by the universe.",
        "Shadow work done today will yield massive spiritual growth. Face the stars within.",
        "A major shift in your perspective is happening. The cosmos is expanding your consciousness."
    ]
};

export default function HoroscopeFeed({ userProfile }: HoroscopeFeedProps) {
    const zodiacSign = useMemo(() => {
        return getZodiacSign(userProfile?.birth_date);
    }, [userProfile?.birth_date]);

    const readings = useMemo(() => {
        // Create a seed based on today's date and the zodiac sign name
        const dateStr = new Date().toISOString().split('T')[0];
        const seedStr = dateStr + (zodiacSign || "Cosmos");
        let seed = 0;
        for (let i = 0; i < seedStr.length; i++) {
            seed = ((seed << 5) - seed) + seedStr.charCodeAt(i);
            seed |= 0;
        }

        const random = mulberry32(seed);
        
        return CATEGORIES.map(cat => {
            const pool = PHRASES[cat.id];
            const index = Math.floor(random() * pool.length);
            return {
                id: cat.id,
                category: cat.name,
                color: cat.color,
                text: pool[index]
            };
        });
    }, [zodiacSign]);

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Daily Horoscope</Text>
                <View style={styles.zodiacBadge}>
                    <Text style={styles.zodiacText}>{zodiacSign}</Text>
                </View>
            </View>

            <View style={{ gap: GAP }}>
                {readings.map((item) => (
                    <View key={item.id} style={styles.cardContainer}>
                        <LinearGradient
                            colors={['rgba(124, 58, 237, 0.1)', 'rgba(0, 0, 0, 0.8)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.card}
                        >
                            <View style={[styles.indicator, { backgroundColor: item.color }]} />
                            <View style={styles.content}>
                                <Text style={[styles.category, { color: item.color }]}>
                                    {item.category}
                                </Text>
                                <Text style={styles.text}>
                                    {item.text}
                                </Text>
                            </View>
                        </LinearGradient>
                    </View>
                ))}
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Readings updated daily based on your celestial alignment.
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: H_PAD,
        paddingVertical: 30,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Forum_400Regular',
        color: '#ffffff',
        fontSize: 26,
        letterSpacing: 1,
    },
    zodiacBadge: {
        backgroundColor: 'rgba(124, 58, 237, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(124, 58, 237, 0.3)',
    },
    zodiacText: {
        color: '#c7d2fe',
        fontSize: 12,
        fontWeight: '600',
    },
    cardContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    card: {
        flexDirection: 'row',
        padding: 16,
    },
    indicator: {
        width: 3,
        height: '100%',
        borderRadius: 2,
        marginRight: 15,
    },
    content: {
        flex: 1,
    },
    category: {
        fontFamily: 'Forum_400Regular',
        fontSize: 14,
        letterSpacing: 0.5,
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    text: {
        fontFamily: 'Nunito_300Light',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        lineHeight: 22,
        letterSpacing: 0.3,
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerText: {
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: 11,
        fontStyle: 'italic',
    }
});