import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, GLOBAL } from "../../constants/theme";

export default function screen_one() {
  return (
    <View style={[GLOBAL.container, styles.wrapper]}>
      <ImageBackground
        source={require("../../assets/images/s1.jpeg")}
        style={styles.card}
        imageStyle={styles.cardImage}
      >
        {/* Heading */}
        <Text style={GLOBAL.title}>
          the stars are aligned{"\n"}
          your story begins now{"\n"}
          Ready to{"\n"}
          connect?
        </Text>

        {/* Subtitle */}
        <Text style={GLOBAL.subtitle}>
          No matter what you’re seeking—companionship, chemistry, or
          destiny—Lovitche guides you there.
        </Text>

        {/* Buttons */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.loginBtn} onPress={()=>router.push("/login")}>
            <LinearGradient
              colors={[COLORS.primaryStart, COLORS.primaryEnd]}
              style={styles.btnGradient}
            >
              <Text style={styles.loginText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupBtn} onPress={()=>router.push("/register")}>
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "88%",
    height: "82%",
    borderRadius: 40,
    padding: 25,
    justifyContent: "flex-end",
    backgroundColor: COLORS.surface,
    overflow: "hidden",
  },

  cardImage: {
    borderRadius: 40,
    resizeMode: "stretch",
    opacity: 1,
  },

  

  row: {
    flexDirection: "row",
    marginTop: 30,
    gap: 10,
  },

  loginBtn: {
    flex: 1,
    borderRadius: 30,
    overflow: "hidden",
  },

  btnGradient: {
    paddingVertical: 15,
    alignItems: "center",
  },

  signupBtn: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "#eee",
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  signupText: {
    fontSize: 16,
    fontWeight: "600",
  },
});