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

const { width } = Dimensions.get('window');
const CARD_BORDER_RADIUS = 24;

interface Card {
    id: string;
    title: string;
    subtitle: string;
    height: number;
    imageUri?: string;
}

const CARDS: Card[] = [
    {
        id: '1',
        title: 'people with\nsame interests',
        subtitle: 'Find your community',
        height: 180,
    },
    {
        id: '2',
        title: 'make friends',
        subtitle: 'Connect with new people',
        height: 240,
    },
    {
        id: '3',
        title: 'people near\nyou',
        subtitle: 'Discover locals',
        height: 180,
    },
    {
        id: '4',
        title: 'paly date',
        subtitle: 'Schedule meetups',
        height: 240,
    },
    {
        id: '5',
        title: 'explore more',
        subtitle: 'See what\'s new',
        height: 180,
    },
];

const ExplorePage: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>explore</Text>
                <View style={styles.notificationBadge} />
            </View>

            {/* Main Content */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.cardGrid}>
                    {CARDS.map((card, index) => {
                        const isFullWidth = index === 1 || index === 3;

                        return (
                            <TouchableOpacity
                                key={card.id}
                                activeOpacity={0.8}
                                onPress={() => setSelectedCard(card.id)}
                                style={[
                                    styles.cardWrapper,
                                    {
                                        width: isFullWidth ? width - 30 : (width - 40) / 2,
                                        marginRight: !isFullWidth && index % 2 === 0 ? 10 : 0,
                                        marginBottom: 15,
                                    },
                                ]}
                            >
                                <View
                                    style={[
                                        styles.card,
                                        {
                                            height: card.height,
                                            borderRadius: CARD_BORDER_RADIUS,
                                            overflow: 'hidden',
                                        },
                                    ]}
                                >
                                    {/* Card Background with Image or Gradient */}
                                    <LinearGradient
                                        colors={['#3a4571', '#1a1f35']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.cardBackground}
                                    />

                                    {/* Dark Gradient Overlay */}
                                    <LinearGradient
                                        colors={['transparent', 'rgba(10, 14, 39, 0.9)']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }}
                                        style={styles.darkOverlay}
                                    />

                                    {/* Content */}
                                    <View style={styles.contentContainer}>
                                        <Text style={styles.cardTitle}>{card.title}</Text>
                                        <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0e27',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 16,
        backgroundColor: '#0a0e27',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: 0.5,
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
        paddingHorizontal: 15,
        paddingTop: 12,
    },
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    cardWrapper: {
        marginBottom: 15,
    },
    card: {
        backgroundColor: '#1a1f3a',
        borderRadius: CARD_BORDER_RADIUS,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 15,
        elevation: 8,
    },
    cardBackground: {
        ...StyleSheet.absoluteFillObject,
    },
    darkOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 16,
        justifyContent: 'flex-end',
        zIndex: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 8,
        lineHeight: 24,
    },
    cardSubtitle: {
        fontSize: 12,
        fontWeight: '500',
        color: '#a8a8a8',
    },
});

export default ExplorePage;