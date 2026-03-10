import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useFonts, Forum_400Regular } from '@expo-google-fonts/forum';
import { Nunito_300Light } from '@expo-google-fonts/nunito';

const { width, height } = Dimensions.get('window');
const GAP = 10;
const H_PAD = 15;
const CARD_WIDTH = (width - H_PAD * 2 - GAP) / 2;
const CARD_HEIGHT = (height * 0.9 - 80) / 2; // 4 cards visible at once (2 rows of 2)

interface Card {
    id: string;
    title: string;
    subheading: string;
    imageUri?: string;
}

const CARDS: Card[] = [
    { id: '1', title: 'people with same intrests', subheading: 'find your tribe' },
    { id: '2', title: 'make friends',               subheading: 'connect now'    },
    { id: '3', title: 'people near you',             subheading: 'discover locals'},
    { id: '4', title: 'play date',                   subheading: 'schedule fun'  },
    { id: '5', title: 'events',                      subheading: 'what\'s on'    },
    { id: '6', title: 'night out',                   subheading: 'plan the night'},
    { id: '7', title: 'new in town',                 subheading: 'explore around'},
];

interface CardItemProps {
    card: Card;
    selected: boolean;
    onPress: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, selected, onPress }) => (
    <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[styles.cardWrapper, selected && styles.cardSelected]}
    >
        <LinearGradient
            colors={['#1e2340', '#0d1020']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
        />
        {/* Subtle top shimmer */}
        <LinearGradient
            colors={['rgba(255,255,255,0.04)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.4 }}
            style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.contentContainer}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <View style={styles.divider} />
            <Text style={styles.metaText}>{card.subheading}</Text>
        </View>
    </TouchableOpacity>
);

const ExplorePage: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    const [fontsLoaded] = useFonts({
        Forum_400Regular,
        Nunito_300Light,
    });

    // Split cards into rows of 2
    const rows: Card[][] = [];
    for (let i = 0; i < CARDS.length; i += 2) {
        rows.push(CARDS.slice(i, i + 2));
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>explore</Text>
               
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {rows.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((card) => (
                            <CardItem
                                key={card.id}
                                card={card}
                                selected={selectedCard === card.id}
                                onPress={() => setSelectedCard(card.id)}
                            />
                        ))}
                        {/* Fill empty slot if odd card at end */}
                        {row.length === 1 && <View style={styles.cardWrapper} />}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080b1a',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: H_PAD,
        paddingVertical: 24,
        backgroundColor: '#080b1a',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255,255,255,0.06)',
    },
    headerTitle: {
        fontFamily: 'Forum_400Regular',
        fontSize: 30,
        color: '#ffffff',
        letterSpacing: 1,
    },
    notificationBadge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 4,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: H_PAD,
        paddingTop: 14,
        paddingBottom: 40,
        gap: GAP,
    },
    row: {
        flexDirection: 'row',
        gap: GAP,
    },
    cardWrapper: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        overflow: 'hidden',
        backgroundColor: '#0d1020',
        // Sharp border
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
    },
    cardSelected: {
        borderColor: 'rgba(120,80,255,0.7)',
        shadowColor: '#7b4fff',
        shadowOpacity: 0.6,
        shadowRadius: 18,
        elevation: 14,
    },
    contentContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
    },
    cardTitle: {
        fontFamily: 'Forum_400Regular',
        fontSize: 22,
        color: '#f0ecff',
        lineHeight: 28,
        marginBottom: 8,
    },
    divider: {
        width: 28,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 8,
    },
    metaText: {
        fontFamily: 'Nunito_300Light',
        fontSize: 11,
        color: 'rgba(255,255,255,0.38)',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
    },
});

export default ExplorePage;