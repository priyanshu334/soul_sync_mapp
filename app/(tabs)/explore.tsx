import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, Line, Path, Polygon, Rect, G, Defs, LinearGradient, Stop } from "react-native-svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = 80;
const H_PAD = 15;

const cosmic = {
  headerTitle: {
    fontFamily: "Forum_400Regular",
    fontSize: 30,
    color: "#ffffff",
    letterSpacing: 1,
  },
};

const PROFILES = [
  {
    id: "1",
    name: "Priya Sharma",
    age: 25,
    location: "Mumbai, MH",
    dist: "1.2 km",
    zodiac: "Pisces",
    tags: ["Photography", "Travel", "Art"],
    bgColors: ["#3a2060", "#1a3050"],
  },
  {
    id: "2",
    name: "Arjun Mehta",
    age: 27,
    location: "Delhi, DL",
    dist: "4.7 km",
    zodiac: "Scorpio",
    tags: ["Music", "Coffee", "City life"],
    bgColors: ["#1a2a4a", "#2a1a3a"],
  },
  {
    id: "3",
    name: "Neha Kapoor",
    age: 24,
    location: "Pune, MH",
    dist: "8.3 km",
    zodiac: "Libra",
    tags: ["Reading", "Hiking", "Nature"],
    bgColors: ["#1a3030", "#2a2040"],
  },
  {
    id: "4",
    name: "Rohan Das",
    age: 28,
    location: "Kolkata, WB",
    dist: "12.1 km",
    zodiac: "Capricorn",
    tags: ["Foodie", "Films", "Night owl"],
    bgColors: ["#2a1a20", "#1a2030"],
  },
];

type Profile = (typeof PROFILES)[0];
type OverlayType = "NOPE" | "LIKE" | "FIRE" | "SUPER" | null;

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const IconClose = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="11" fill="none" stroke="#ff6b6b" strokeWidth="1.5" opacity="0.8" />
    <Line
      x1="8"
      y1="8"
      x2="16"
      y2="16"
      stroke="#ff6b6b"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <Line
      x1="16"
      y1="8"
      x2="8"
      y2="16"
      stroke="#ff6b6b"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

const IconStar = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Polygon
      points="12,2 15.09,8.26 22,9.27 17.77,14.14 18.54,21.09 12,17.77 5.46,21.09 6.23,14.14 2,9.27 8.91,8.26"
      fill="none"
      stroke="#ffd700"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconFire = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Path
      d="M12 2C12 2 13 6 13 9C13 10.5 12.2 11.8 11 12.5C11.5 11.5 11.5 10.2 10.5 9.5C10.5 11 9.5 12 8.5 12.5C8 11.5 8 10 9 9C7.5 10 7 11.5 7 13C7 15.8 8.8 18 12 18C15.2 18 17 15.8 17 13C17 13 18 10.5 18 7.5C18 4 16 2 12 2Z"
      fill="none"
      stroke="#ff8c42"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconHeart = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill="none"
      stroke="#ff1493"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconProfile = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24">
    <Circle cx="12" cy="8" r="4" fill="none" stroke="#a8a8b8" strokeWidth="1.2" />
    <Path
      d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8"
      stroke="#a8a8b8"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);

const IconSend = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24">
    <Path
      d="M3 3l18 9-18 9V13L8 12 3 11v-8z"
      fill="none"
      stroke="#a8a8b8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ─── Toast ────────────────────────────────────────────────────────────────────

const Toast = ({ message, visible }: { message: string; visible: boolean }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(1400),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, message]);

  return (
    <Animated.View style={[styles.toast, { opacity }]} pointerEvents="none">
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

// ─── Profile Card ─────────────────────────────────────────────────────────────

const ProfileCard = ({
  profile,
  isTop,
  onSwipeLeft,
  onSwipeRight,
  onSwipeFire,
  overlayType,
}: {
  profile: Profile;
  isTop: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeFire: () => void;
  overlayType: OverlayType;
}) => {
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
};

// ─── Message Modal ────────────────────────────────────────────────────────────

const MessageModal = ({
  visible,
  targetName,
  onClose,
  onSend,
}: {
  visible: boolean;
  targetName: string;
  onClose: () => void;
  onSend: (msg: string) => void;
}) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    onSend(text.trim());
    setText("");
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalBackdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} style={styles.msgSheet}>
          <Text style={styles.msgSheetTitle}>Message {targetName}</Text>
          <TextInput
            style={styles.msgInput}
            placeholder="Say something nice..."
            placeholderTextColor="#555"
            multiline
            value={text}
            onChangeText={setText}
            autoFocus
            textAlignVertical="top"
          />
          <View style={styles.msgSheetRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

// ─── Main Explore Screen ──────────────────────────────────────────────────────

export default function ExploreScreen() {
  const [profiles, setProfiles] = useState(PROFILES);
  const [overlayType, setOverlayType] = useState<OverlayType>(null);
  const [toast, setToast] = useState({ message: "", visible: false, key: 0 });
  const [msgVisible, setMsgVisible] = useState(false);

  const showToast = (message: string) => {
    setToast((prev) => ({ message, visible: true, key: prev.key + 1 }));
  };

  const triggerOverlay = (type: OverlayType, delay = 200) => {
    setOverlayType(type);
    setTimeout(() => setOverlayType(null), delay);
  };

  const removeTop = () => {
    setTimeout(() => setProfiles((prev) => prev.slice(1)), 350);
  };

  const handleDislike = () => {
    triggerOverlay("NOPE");
    removeTop();
  };

  const handleLike = () => {
    triggerOverlay("LIKE");
    showToast(`Liked ${profiles[0]?.name}!`);
    removeTop();
  };

  const handleFire = () => {
    triggerOverlay("FIRE");
    showToast(`Fire sent to ${profiles[0]?.name}!`);
    removeTop();
  };

  const handleSuperLike = () => {
    triggerOverlay("SUPER");
    showToast(`Super liked ${profiles[0]?.name}!`);
    removeTop();
  };

  const handleViewProfile = () => {
    if (profiles[0]) {
      showToast(`Opening ${profiles[0].name}'s profile`);
    }
  };

  const handleSendMessage = (msg: string) => {
    setMsgVisible(false);
    if (msg) showToast("Message sent!");
  };

  const handleRefresh = () => setProfiles(PROFILES);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
        </View>

        <View style={styles.cardStack}>
          {profiles.length === 0 ? (
            <View style={styles.noMore}>
              <Text style={styles.noMoreIcon}>✨</Text>
              <Text style={styles.noMoreText}>You've seen everyone nearby</Text>
              <TouchableOpacity
                style={styles.refreshBtn}
                onPress={handleRefresh}
              >
                <Text style={styles.refreshText}>Refresh</Text>
              </TouchableOpacity>
            </View>
          ) : (
            [...profiles]
              .slice(0, 2)
              .reverse()
              .map((profile, i, arr) => {
                const isTop = i === arr.length - 1;
                return (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    isTop={isTop}
                    overlayType={isTop ? overlayType : null}
                    onSwipeLeft={handleDislike}
                    onSwipeRight={handleLike}
                    onSwipeFire={handleFire}
                  />
                );
              })
          )}
        </View>

        <View style={styles.bottomArea}>
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.btnDislike]}
              onPress={handleDislike}
              activeOpacity={0.8}
            >
              <IconClose />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.btnStar]}
              onPress={handleSuperLike}
              activeOpacity={0.8}
            >
              <IconStar />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.btnFire]}
              onPress={handleFire}
              activeOpacity={0.8}
            >
              <IconFire />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.btnLike]}
              onPress={handleLike}
              activeOpacity={0.8}
            >
              <IconHeart />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.btnViewProfile]}
              onPress={handleViewProfile}
              activeOpacity={0.8}
            >
              <IconProfile />
            </TouchableOpacity>
          </View>

          <View style={styles.msgRow}>
            <TouchableOpacity
              style={styles.msgBarInput}
              onPress={() => setMsgVisible(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.msgPlaceholder}>Write a message...</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.msgSendBtn}
              onPress={() => setMsgVisible(true)}
              activeOpacity={0.8}
            >
              <IconSend />
            </TouchableOpacity>
          </View>
        </View>

        <Toast
          key={toast.key}
          message={toast.message}
          visible={toast.visible}
        />

        <MessageModal
          visible={msgVisible}
          targetName={profiles[0]?.name ?? ""}
          onClose={() => setMsgVisible(false)}
          onSend={handleSendMessage}
        />
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    paddingHorizontal: H_PAD,
    paddingVertical: 44,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  headerTitle: cosmic.headerTitle,

  // Card stack
  cardStack: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#1a1a2a",
    // Glassmorphism effect
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  coverBg: {
    height: "62%",
    position: "relative",
    justifyContent: "flex-end",
  },
  coverOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "55%",
    backgroundColor: "transparent",
  },
  distBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(20,20,30,0.6)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    gap: 5,
  },
  distDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#f9a8d4",
  },
  distText: {
    fontSize: 11,
    color: "#e8e8f0",
    fontWeight: "500",
  },
  zodiacBadge: {
    position: "absolute",
    bottom: 14,
    left: 14,
    backgroundColor: "rgba(20,20,30,0.6)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  zodiacText: {
    fontSize: 11,
    color: "#e2d9f3",
    fontWeight: "500",
  },
  overlayLabel: {
    position: "absolute",
    top: "40%",
  },
  overlayNope: {
    left: "10%",
  },
  overlayLike: {
    right: "10%",
  },
  overlayText: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 2.5,
    borderWidth: 3.5,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  cardInfo: {
    flex: 1,
    backgroundColor: "rgba(15,15,24,0.7)",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.1)",
    padding: 14,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  profileAge: {
    fontSize: 13,
    color: "#9994aa",
    fontWeight: "500",
  },
  profileLocation: {
    fontSize: 11,
    color: "#7770a0",
    marginTop: 2,
    letterSpacing: 0.7,
    textTransform: "uppercase",
    fontWeight: "500",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 10,
  },
  tag: {
    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  tagText: {
    fontSize: 11,
    color: "#c0bdd0",
    fontWeight: "500",
  },

  // No more cards
  noMore: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  noMoreIcon: {
    fontSize: 36,
  },
  noMoreText: {
    fontSize: 14,
    color: "#555",
  },
  refreshBtn: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 8,
  },
  refreshText: {
    color: "#ccc",
    fontSize: 13,
    fontWeight: "600",
  },

  // Bottom action area
  bottomArea: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.07)",
    paddingBottom: 0,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 16,
  },
  actionBtn: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20,20,30,0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  btnDislike: {
    width: 52,
    height: 52,
    backgroundColor: "rgba(255,107,107,0.08)",
    borderColor: "rgba(255,107,107,0.35)",
  },
  btnStar: {
    width: 52,
    height: 52,
    backgroundColor: "rgba(255,215,0,0.08)",
    borderColor: "rgba(255,215,0,0.35)",
  },
  btnFire: {
    width: 52,
    height: 52,
    backgroundColor: "rgba(255,140,66,0.08)",
    borderColor: "rgba(255,140,66,0.35)",
  },
  btnLike: {
    width: 52,
    height: 52,
    backgroundColor: "rgba(255,20,147,0.08)",
    borderColor: "rgba(255,20,147,0.35)",
  },
  btnViewProfile: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: "rgba(255,255,255,0.2)",
  },

  // Message bar
  msgRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 100,
  },
  msgBarInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  msgPlaceholder: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  msgSendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(20,20,30,0.5)",
    borderWidth: 1.2,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  // Toast
  toast: {
    position: "absolute",
    bottom: 145,
    alignSelf: "center",
    backgroundColor: "rgba(30,28,48,0.7)",
    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  toastText: {
    fontSize: 12,
    color: "#d0c8e8",
    fontWeight: "500",
  },

  // Message modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  msgSheet: {
    backgroundColor: "rgba(0,0,0,0.8)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    borderTopWidth: 0.8,
    borderLeftWidth: 0.8,
    borderRightWidth: 0.8,
    borderColor: "rgba(255,255,255,0.1)",
  },
  msgSheetTitle: {
    fontSize: 13,
    color: "#999",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
  msgInput: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 12,
    fontSize: 13,
    color: "#fff",
    minHeight: 80,
  },
  msgSheetRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 10,
  },
  cancelBtn: {
    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  cancelText: {
    fontSize: 12,
    color: "#999",
    fontWeight: "600",
  },
  sendBtn: {
    backgroundColor: "rgba(100,200,255,0.15)",
    borderWidth: 1.2,
    borderColor: "rgba(100,200,255,0.5)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  sendText: {
    fontSize: 12,
    color: "#64c8ff",
    fontWeight: "700",
  },
});