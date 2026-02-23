import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";

interface PolicySection {
  title: string;
  content: string;
}

interface PolicySectionProps {
  title: string;
  sections: PolicySection[];
}

export default function PolicySection({ title, sections }: PolicySectionProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.mainTitle}>{title}</Text>

        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  content: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
    opacity: 0.8,
  },
});