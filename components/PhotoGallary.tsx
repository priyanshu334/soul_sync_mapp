import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const photos = [
  { id: 1, url: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=1080", height: 200 },
  { id: 2, url: "https://images.unsplash.com/photo-1612802969356-391e9d36a474?q=80&w=1080", height: 150 },
  { id: 3, url: "https://images.unsplash.com/photo-1687748025388-ce0e6e900805?q=80&w=1080", height: 250 },
  { id: 4, url: "https://images.unsplash.com/photo-1595368062405-e4d7840cba14?q=80&w=1080", height: 180 },
  { id: 5, url: "https://images.unsplash.com/photo-1635545999375-057ee4013deb?q=80&w=1080", height: 220 },
  { id: 6, url: "https://images.unsplash.com/photo-1716654716572-7b13ad56ba63?q=80&w=1080", height: 140 },
  { id: 7, url: "https://images.unsplash.com/photo-1569498318979-4b9150e04365?q=80&w=1080", height: 190 },
];

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Photos</Text>

      <FlatList
        data={photos}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listPadding}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => setSelectedPhoto(item.url)}
            style={styles.imageContainer}
          >
            <Image 
              source={{ uri: item.url }} 
              style={[styles.image, { height: item.height }]} 
            />
          </TouchableOpacity>
        )}
      />

      {/* Full Screen Image Modal (Dialog) */}
      <Modal 
        visible={selectedPhoto !== null} 
        transparent={true} 
        animationType="fade"
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setSelectedPhoto(null)}
        >
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setSelectedPhoto(null)}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          
          {selectedPhoto && (
            <Image 
              source={{ uri: selectedPhoto }} 
              style={styles.fullImage} 
              resizeMode="contain" 
            />
          )}
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  listPadding: {
    paddingHorizontal: 12,
  },
  imageContainer: {
    padding: 4,
  },
  image: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 8,
    borderRadius: 20,
  },
  fullImage: {
    width: width,
    height: height * 0.8,
  },
});