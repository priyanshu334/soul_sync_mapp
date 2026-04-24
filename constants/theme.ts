import { StyleSheet } from "react-native";

export const COLORS = {
  background: "#0F172A",
  surface: "#1E293B",
  white: "#ffffff",
  gray: "#94A3B8",
  primary: "#7C3AED",
  primaryStart: "#7C3AED",
  primaryEnd: "#C026D3",
  accent: "#F472B6",
  error: "#EF4444",
  success: "#10B981",

  // Added for Register Screen compatibility
  overlay: "rgba(0,0,0,0.6)", 
  inputBg: "rgba(30, 41, 59, 0.7)", 
  textPrimary: "#ffffff",
  textSecondary: "#94A3B8",
};

export const SIZES = {
  padding: 20,
  radius: 30,
  title: 28,
  subtitle: 14,
};

export const GLOBAL = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: SIZES.title,
    color: COLORS.white,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: SIZES.subtitle,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  }
});