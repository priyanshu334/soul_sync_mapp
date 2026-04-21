import React from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.44;

const data = [
  {
    id: "1",
    name: "Azalea M",
    location: "Bushwick, NY",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
  {
    id: "2",
    name: "Imani J",
    location: "Harlem, NY",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
  {
    id: "3",
    name: "Elodie S",
    location: "Tribeca, NY",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  },
  {
    id: "4",
    name: "Naomi L",
    location: "Astoria, NY",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
];

const MatchCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.image}
        imageStyle={{ borderRadius: 20 }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.overlay}
        >
          <Text style={styles.location}>📍 {item.location}</Text>

          <View style={styles.bottom}>
            <View style={styles.statusRow}>
              <View style={styles.dot} />
              <Text style={styles.active}>Active</Text>
            </View>

            <Text style={styles.name}>{item.name}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default function MatchFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Found you{"\n"}matches!!
      </Text>

      <FlatList
        data={data}
        renderItem={({ item }) => <MatchCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000ff",
    paddingHorizontal: 16,
    paddingTop: 60,
  },

  heading: {
    fontSize: 42,
    fontWeight: "900",
    color: "#c084fc", // purple tone
    marginBottom: 20,
    lineHeight: 44,
    letterSpacing: -1,
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.4,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
  },

  image: {
    flex: 1,
    justifyContent: "flex-end",
  },

  overlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },

  location: {
    color: "#ddd",
    fontSize: 12,
  },

  bottom: {
    gap: 4,
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#00ff88",
    borderRadius: 4,
  },

  active: {
    color: "#ccc",
    fontSize: 12,
  },
});