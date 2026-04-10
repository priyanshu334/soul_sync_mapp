import React, { useRef } from "react";
import { Animated, Dimensions, PanResponder, Text, View } from "react-native";

import { styles } from "@/components/explore/styles";
import { OverlayType, Profile } from "@/components/explore/types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = 80;

type ProfileCardProps = {
  profile: Profile;
  isTop: boolean;
  overlayType: OverlayType;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

export function ProfileCard({
  profile,
  isTop,
  overlayType,
  onSwipeLeft,
  onSwipeRight,
}: ProfileCardProps) {
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isTop,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          Animated.spring(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gesture.dy },
            useNativeDriver: true,
          }).start(onSwipeRight);
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          Animated.spring(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
            useNativeDriver: true,
          }).start(onSwipeLeft);
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const cardStyle = isTop
    ? {
        transform: [
          { translateX: position.x },
          { translateY: position.y },
          { rotate },
        ],
        zIndex: 2,
      }
    : {
        transform: [{ scale: 0.94 }, { translateY: 12 }],
        zIndex: 0,
      };

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 4, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const likeOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH / 4],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[styles.card, cardStyle]}
      {...(isTop ? panResponder.panHandlers : {})}
    >
      <View style={[styles.coverBg, { backgroundColor: profile.bgColors[0] }]}>
        <View style={styles.coverOverlay} />

        <View style={styles.distBadge}>
          <View style={styles.distDot} />
          <Text style={styles.distText}>{profile.dist}</Text>
        </View>

        <View style={styles.zodiacBadge}>
          <Text style={styles.zodiacText}>{profile.zodiac}</Text>
        </View>

        {isTop && (
          <>
            <Animated.View
              style={[
                styles.overlayLabel,
                styles.overlayNope,
                { opacity: overlayType === "NOPE" ? 1 : nopeOpacity },
              ]}
            >
              <Text
                style={[
                  styles.overlayText,
                  { color: "#ff6b6b", borderColor: "#ff6b6b" },
                ]}
              >
                NOPE
              </Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.overlayLabel,
                styles.overlayLike,
                {
                  opacity:
                    overlayType === "LIKE" || overlayType === "SUPER"
                      ? 1
                      : likeOpacity,
                },
              ]}
            >
              <Text
                style={[
                  styles.overlayText,
                  { color: "#4ade80", borderColor: "#4ade80" },
                ]}
              >
                {overlayType === "SUPER" ? "SUPER" : "LIKE"}
              </Text>
            </Animated.View>
            {overlayType === "FIRE" && (
              <View style={[styles.overlayLabel, { top: "40%", left: "30%" }]}>
                <Text
                  style={[
                    styles.overlayText,
                    { color: "#ff8c42", borderColor: "#ff8c42" },
                  ]}
                >
                  FIRE
                </Text>
              </View>
            )}
          </>
        )}
      </View>

      <View style={styles.cardInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileAge}>{profile.age}</Text>
        </View>
        <Text style={styles.profileLocation}>{profile.location}</Text>
        <View style={styles.tagsRow}>
          {profile.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
}
