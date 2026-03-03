import { COLORS } from '@/constants/theme';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const GAP = 12;
const ITEM_SIZE = (width - (40 + (COLUMN_COUNT - 1) * GAP)) / COLUMN_COUNT;

export default function Photos() {
    const [images, setImages] = useState<string[]>([]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], // Updated for modern Expo versions
            allowsEditing: true,
            aspect: [1, 1], // Square looks better in grids
            quality: 0.8,
        });

        if (!result.canceled) {
            setImages([...images, result.assets[0].uri]);
        }
    };

    const removeImage = (uri: string) => {
        setImages(images.filter(img => img !== uri));
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.title}>Your Gallery</Text>
                <Text style={styles.subtitle}>{images.length} / 9 photos added</Text>
            </View>

            <FlatList
                data={[...images, 'add-button']} // Trick to put the button inside the grid
                keyExtractor={(item) => item}
                numColumns={COLUMN_COUNT}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.gridPadding}
                renderItem={({ item }) => {
                    if (item === 'add-button') {
                        return (
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={pickImage}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="add" size={32} color={COLORS.primaryStart} />
                                <Text style={styles.addText}>Add</Text>
                            </TouchableOpacity>
                        );
                    }

                    return (
                        <View style={styles.imageWrapper}>
                            <Image source={{ uri: item }} style={styles.image} />
                            <Pressable
                                style={styles.deleteBadge}
                                onPress={() => removeImage(item)}
                            >
                                <Ionicons name="close" size={14} color={COLORS.white} />
                            </Pressable>
                        </View>
                    );
                }}
            />

            {/* Bottom Action */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.continueButton, { opacity: images.length > 0 ? 1 : 0.5 }]}
                    disabled={images.length === 0}
                    onPress={() => router.push("/(onboarding)/bio")}
                >
                    <Text style={styles.buttonText}>Save Gallery</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "800",
        color: COLORS.white,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.gray,
        marginTop: 4,
    },
    gridPadding: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    row: {
        justifyContent: 'flex-start',
        gap: GAP,
        marginBottom: GAP,
    },
    imageWrapper: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    addButton: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.1)',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addText: {
        color: COLORS.primaryStart,
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 4,
    },
    deleteBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#FF4B4B',
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        backgroundColor: COLORS.background,
    },
    continueButton: {
        backgroundColor: COLORS.primaryStart,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    }
});