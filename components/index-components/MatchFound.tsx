import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { UserProfile } from "@/src/services/profile.service";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.44;

const MatchCard = ({ item }: { item: UserProfile }) => {
  const primaryImage = item.images?.[0] || `https://i.pravatar.cc/300?u=${item.id}`;
  
  return (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => router.push({
        pathname: "/(tabs)/profile/[id]",
        params: { id: item.id }
      } as any)}
    >
      <ImageBackground
        source={{ uri: primaryImage }}
        style={styles.image}
        imageStyle={{ borderRadius: 20 }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.overlay}
        >
          <Text style={styles.location}>📍 {item.birth_place || "Unknown"}</Text>

          <View style={styles.bottom}>
            <View style={styles.statusRow}>
              <View style={styles.dot} />
              <Text style={styles.active}>Active</Text>
            </View>

            <Text style={styles.name}>{item.username || "Anonymous"}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default function MatchFound({ profiles }: { profiles: UserProfile[] }) {
  if (!profiles || profiles.length === 0) return null;

  // Render pairs of cards in rows to mimic numColumns={2}
  const rows: (UserProfile)[] [] = [];
  for (let i = 0; i < profiles.length; i += 2) {
    rows.push(profiles.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Found you{"\n"}matches!!
      </Text>

      <View style={styles.grid}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <MatchCard key={item.id} item={item} />
            ))}
            {/* Fill empty slot if odd number of items */}
            {row.length < 2 && <View style={{ width: CARD_WIDTH }} />}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000ff",
    paddingHorizontal: 16,
    paddingTop: 60,
  },

  grid: {
    paddingBottom: 100,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
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