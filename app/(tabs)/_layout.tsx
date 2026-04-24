import { useModalState } from "@/providers/ModalStateProvider";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import {
  PixelRatio,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const { isModalOpen } = useModalState();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  // 🔥 Device type detection
  const isTablet = width >= 768;

  // 🔥 Responsive scaling function (dynamic for all device sizes)
  const scale = (size: number) => {
    // Adaptive base width detection
    let baseWidth = 375; // Default iPhone width

    if (width < 375) {
      baseWidth = 320; // Small phones (iPhone SE, etc)
    } else if (width >= 768) {
      baseWidth = 800; // Tablets
    }

    const scaleFactor = width / baseWidth;
    return Math.round(PixelRatio.roundToNearestPixel(size * scaleFactor));
  };

  // 🔥 Dynamic values
  const TAB_HEIGHT = isTablet ? scale(70) : scale(60);
  const SIDE_MARGIN = isTablet ? width * 0.08 : width * 0.02;
  const ICON_SIZE = isTablet ? scale(26) : scale(22);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#a78bfa",
        tabBarInactiveTintColor: "rgba(255,255,255,0.4)",

        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",

          // ✅ Proper safe-area handling
          bottom: Math.max(insets.bottom, 10),

          left: SIDE_MARGIN,
          right: SIDE_MARGIN,

          height: TAB_HEIGHT,

          borderRadius: scale(20),
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 0,

          overflow: "hidden",

          display: isModalOpen ? "none" : "flex",
        },

        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={80}
              tint="dark"
              style={StyleSheet.absoluteFill}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.07)", "rgba(255,255,255,0.015)"]}
                style={StyleSheet.absoluteFill}
              />
            </BlurView>
          ) : (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "rgba(10,10,10,0.9)",
                borderRadius: scale(20),
              }}
            />
          ),
      }}
    >
      {(
        [
          { name: "index", icon: "home" },
          { name: "explore", icon: "star" },
          { name: "chat", icon: "chatbubble" },
          { name: "profile", icon: "person-circle" },
        ] as const
      ).map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? tab.icon : `${tab.icon}-outline`}
                size={ICON_SIZE}
                color={color}
                style={{
                  opacity: focused ? 1 : 0.6,
                  transform: [{ scale: focused ? 1.15 : 1 }],
                }}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
