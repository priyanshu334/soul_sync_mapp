import { PremiumButton } from "@/components/ui/PremiumButton";
import { COLORS } from '@/constants/theme';
import { useOnboarding } from "@/providers/OnboardingProvider";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const GAP = 12;
const ITEM_SIZE = (width - (48 + (COLUMN_COUNT - 1) * GAP)) / COLUMN_COUNT;

export default function Photos() {
    const { onboardingData, updateOnboardingData } = useOnboarding();
    const [images, setImages] = useState<string[]>(onboardingData.images || []);

    const pickImage = async () => {
        if (images.length >= 9) return;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImages([...images, result.assets[0].uri]);
        }
    };

    const removeImage = (uri: string) => {
        setImages(images.filter(img => img !== uri));
    };

    const handleContinue = () => {
        updateOnboardingData({ images });
        router.push("/bio");
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: "66.6%" }]} />
                    </View>
                    <Text style={styles.stepText}>Step 4 of 6</Text>
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.title}>Show your radiance</Text>
                    <Text style={styles.subtitle}>
                        Add at least 2 photos. Good lighting and a clear view of your face work best.
                    </Text>
                </View>

                <FlatList
                    data={[...images, 'add-button']}
                    keyExtractor={(item) => item}
                    numColumns={COLUMN_COUNT}
                    columnWrapperStyle={styles.row}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        if (item === 'add-button') {
                            if (images.length >= 9) return null;
                            return (
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={pickImage}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.addIconCircle}>
                                        <Ionicons name="add" size={24} color={COLORS.white} />
                                    </View>
                                </TouchableOpacity>
                            );
                        }

                        return (
                            <View style={styles.imageWrapper}>
                                <Image source={{ uri: item }} style={styles.image} />
                                <TouchableOpacity
                                    style={styles.deleteBadge}
                                    onPress={() => removeImage(item)}
                                >
                                    <Ionicons name="close" size={14} color={COLORS.white} />
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />

                <View style={styles.footer}>
                    <PremiumButton
                        title="Continue"
                        onPress={handleContinue}
                        disabled={images.length < 2}
                    />
                    <Text style={styles.footerText}>
                        {images.length < 2 ? `Add ${2 - images.length} more photo${2 - images.length > 1 ? 's' : ''}` : "Looking good!"}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        padding: 24,
        paddingTop: 60,
    },
    header: {
        marginBottom: 40,
    },
    progressContainer: {
        height: 4,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 2,
        marginBottom: 8,
    },
    progressBar: {
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 2,
    },
    stepText: {
        color: COLORS.gray,
        fontSize: 12,
        fontWeight: "600",
    },
    titleSection: {
        marginBottom: 32,
    },
    title: {
        color: COLORS.white,
        fontSize: 32,
        fontWeight: "bold",
        lineHeight: 40,
    },
    subtitle: {
        color: COLORS.gray,
        fontSize: 16,
        marginTop: 12,
        lineHeight: 24,
    },
    row: {
        gap: GAP,
        marginBottom: GAP,
    },
    imageWrapper: {
        width: ITEM_SIZE,
        height: ITEM_SIZE * 1.3,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    addButton: {
        width: ITEM_SIZE,
        height: ITEM_SIZE * 1.3,
        borderRadius: 16,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
    },
    footer: {
        paddingTop: 20,
        alignItems: 'center',
    },
    footerText: {
        color: COLORS.gray,
        fontSize: 14,
        marginTop: 12,
    },
});