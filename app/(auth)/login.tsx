import { COLORS } from "@/constants/theme"; // Import your theme
import { login } from "@/src/services/auth.service";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Info", "Please enter both email and password.");
      return;
    }
    
    setLoading(true);
    const { error } = await login(email, password);
    setLoading(false);

    if (error) {
      Alert.alert("Login Failed", error.message);
    } else {
      router.replace("/(tabs)"); // Navigate to home on success
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/s1.jpeg")}
      style={styles.bg}
      resizeMode="cover" // Changed to cover to fill screen properly
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.container}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>
            Enter your details to continue your journey
          </Text>

          {/* Email */}
          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={18} color={COLORS.gray} />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#777"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />
          </View>

          {/* Password */}
          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={18} color={COLORS.gray} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#777"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            style={styles.buttonWrapper} 
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
              colors={[COLORS.primaryStart, COLORS.primaryEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Log In</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/forget-password")}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay, // Using theme overlay
  },
  back: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center", // Center content vertically
  },
  title: {
    fontSize: 32,
    color: COLORS.white,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 40,
    lineHeight: 22,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBg, // The transparent white from theme
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 16,
    height: 60,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  input: {
    flex: 1,
    marginLeft: 12,
    color: COLORS.white, // White text for dark theme
    fontSize: 16,
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 10,
  },
  buttonGradient: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  forgot: {
    color: COLORS.gray,
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
  }
});