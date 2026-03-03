import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../constants/theme";

export default function screen_one() {
  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={require("../../assets/images/s1.jpeg")}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        {/* The Magic Sauce: A gradient that fades from transparent to deep black */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.9)"]}
          style={styles.gradientOverlay}
        >
          <View style={styles.contentContainer}>
            {/* Heading - Increased letter spacing and line height */}
            <Text style={styles.mainTitle}>
              the stars are aligned{"\n"}
              your story begins{"\n"}
              <Text style={styles.highlightText}>Ready to connect?</Text>
            </Text>

            {/* Subtitle - Softer color for better hierarchy */}
            <Text style={styles.description}>
              No matter what you’re seeking—companionship, chemistry, or
              destiny—<Text style={{ fontWeight: '700' }}>Lovitche</Text> guides you there.
            </Text>

            {/* Buttons Row */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.primaryButton}
                onPress={() => router.push("/login")}
              >
                <LinearGradient
                  colors={[COLORS.primaryStart || "#9333ea", COLORS.primaryEnd || "#db2777"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientBtn}
                >
                  <Text style={styles.loginText}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.secondaryButton}
                onPress={() => router.push("/register")}
              >
                <Text style={styles.signupText}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    resizeMode: "cover", // Cover looks more professional than stretch
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingBottom: 60,
  },
  contentContainer: {
    width: "100%",
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  highlightText: {
    color: "#db2777", // Or your primary brand color
  },
  description: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 24,
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  primaryButton: {
    flex: 2, // Login button is slightly wider for emphasis
    height: 58,
    borderRadius: 18,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#db2777",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradientBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButton: {
    flex: 1,
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)", // Translucent "Glass" look
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  signupText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});