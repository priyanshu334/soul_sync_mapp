import { COLORS } from "@/constants/theme";
import { BlurView } from "expo-blur";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface PremiumInputProps extends TextInputProps {
  icon?: React.ReactNode;
}

export function PremiumInput({ icon, style, ...props }: PremiumInputProps) {
  return (
    <View style={styles.container}>
      <BlurView intensity={20} tint="dark" style={styles.blur}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          placeholderTextColor={COLORS.gray + "80"}
          style={[styles.input, style]}
          {...props}
        />
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  blur: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
    height: "100%",
  },
});
