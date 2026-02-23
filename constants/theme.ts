import { StyleSheet } from "react-native";

export const COLORS = {
  background: "#000",
  surface: "#0a0a0a",
  white: "#ffffff",
  gray: "#BFBFBF",

  primaryStart: "#6A00F4",
  primaryEnd: "#C77DFF",

  // Added for Register Screen compatibility
  overlay: "rgba(0,0,0,0.4)", 
  inputBg: "rgba(255, 255, 255, 0.2)", // Light tint so text is visible on dark bg
  textPrimary: "#ffffff",
  textSecondary: "#BFBFBF",
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
    backgroundColor: COLORS.background,
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