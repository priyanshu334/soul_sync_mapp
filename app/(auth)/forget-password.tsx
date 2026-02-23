import { COLORS } from "@/constants/theme";
import { resetPassword } from "@/src/services/auth.service";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const HandleReset = async()=>{
    const {error} = await  resetPassword(email)
    if (error) alert(error.message)
    else alert("reset link on your email")
  }

  return (
    <ImageBackground
      source={require("../../assets/images/s1.jpeg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email to receive reset code
        </Text>

        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/change-password")}
        >
          <Text style={styles.buttonText}>Change your password</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: COLORS.overlay },
  container: { flex: 1, justifyContent: "center", padding: 30 },
  title: { fontSize: 28, color: "#fff", fontWeight: "700" },
  subtitle: { color: COLORS.textSecondary, marginBottom: 30 },

  input: {
    backgroundColor: COLORS.inputBg,
    height: 55,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 20
  },

  button: {
    backgroundColor: COLORS.primaryStart,
    padding: 15,
    borderRadius: 30
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" }
});