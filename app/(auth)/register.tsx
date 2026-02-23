import { COLORS } from "@/constants/theme";
import { register } from "@/src/services/auth.service";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleRegister =async () => {
    const {error} = await register(email,password)
    if(error) alert(error.message)
    else alert("check your email for verification")

  };

  return (
    <ImageBackground
      source={require("../../assets/images/s1.jpeg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />

      {/* Dark Overlay */}
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Form Container */}
        <View style={styles.container}>
          <Text style={[styles.title, { color: "white" }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: "white" }]}>
            Begin your Lovitche journey today
          </Text>

          {/* Name */}
       

          {/* Email */}
          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={18} color="#999" />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={18} color="#999" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
          </View>

          {/* Register Button */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Login Navigation */}
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.loginText}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay
  },

  back: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30
  },

  title: {
    fontSize: 28,
    color: COLORS.textPrimary,
    fontWeight: "700",
    marginBottom: 6
  },

  subtitle: {
    color: COLORS.textSecondary,
    marginBottom: 30
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderRadius: 30,
    paddingHorizontal: 16,
    marginBottom: 15,
    height: 55
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#333"
  },

  button: {
    backgroundColor: COLORS.primaryStart,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 10
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16
  },

  loginText: {
    color: "#ddd",
    marginTop: 18,
    textAlign: "center"
  }
});