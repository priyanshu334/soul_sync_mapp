import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const H_PAD = 15;

const cosmic = {
  headerTitle: {
    fontFamily: "Forum_400Regular",
    fontSize: 30,
    color: "#ffffff",
    letterSpacing: 1,
  },
};

export default function TopBar() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: H_PAD,
        paddingVertical: 44,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(255,255,255,0.06)",
      }}
    >
      <Text style={cosmic.headerTitle}>Cosmic</Text>

      <View style={{ flexDirection: "row", gap: 18 }}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>

      
      </View>
    </View>
  );
}