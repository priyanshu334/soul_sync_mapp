import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="dark-content" />

      {/* Header Area */}
      <View style={styles.header}>
        <Text style={styles.mainTitle}>{title}</Text>
        <View style={styles.divider} />
      </View>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <View key={index} style={styles.sectionCard}>
          <View style={styles.titleRow}>
            <Text style={styles.indexNumber}>{(index + 1).toString().padStart(2, '0')}</Text>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          <Text style={styles.sectionContent}>{section.content}</Text>
        </View>
      ))}

      {/* Bottom Padding for aesthetic finish */}
      <View style={styles.footerSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // Assuming this is a light/neutral color
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 40,
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  divider: {
    width: 50,
    height: 4,
    backgroundColor: COLORS.primaryStart || "#000", // A brand accent color
    marginTop: 12,
    borderRadius: 2,
  },
  sectionCard: {
    marginBottom: 32,
    // Optional: add a very light border or shadow if surface is white
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0,0,0,0.05)',
    paddingLeft: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  indexNumber: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primaryStart || "#000",
    marginRight: 8,
    opacity: 0.5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    flex: 1,
  },
  sectionContent: {
    fontSize: 15,
    lineHeight: 24, // Increased leading for readability
    color: COLORS.textSecondary,
    opacity: 0.9,
    letterSpacing: 0.2,
  },
  footerSpacer: {
    height: 100,
  }
});