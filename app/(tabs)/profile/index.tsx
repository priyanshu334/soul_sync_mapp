import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Svg, { Line, Path } from "react-native-svg";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=1080" }}
            style={styles.heroBg}
            blurRadius={10}
          >
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)', '#000']} style={styles.heroOverlay} />
          </ImageBackground>

          <View style={styles.headerContent}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=400" }}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>Priya Sharma</Text>
            <View style={styles.jobBadgeContainer}>
              <LinearGradient
                colors={['#9333ea', '#db2777']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.jobBadge}
              >
                <Text style={styles.jobText}>UI/UX Designer</Text>
              </LinearGradient>
              <Text style={styles.socialHandle}>@priya.sharma</Text>
            </View>
          </View>
        </View>

        {/* STATS / TAGS */}
        <View style={styles.contentWrapper}>
          <View style={styles.tagRow}>
            {['Photography', 'Travel', 'Art'].map(tag => (
              <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
            ))}
          </View>

          <Text style={styles.bioText}>
            I'm a simple designer and very passionate about what I do. Inspired by the everyday world around me.
          </Text>

          {/* KUNDLI CARD - GLASSMORPHISM LOOK */}
          <View style={styles.glassCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="moon-outline" size={18} color="#db2777" />
              <Text style={styles.cardTitle}>My Kundli</Text>
            </View>

            <View style={styles.tabsList}>
              <TabTrigger active={activeTab === 'basic'} label="Basic" onPress={() => setActiveTab('basic')} />
              <TabTrigger active={activeTab === 'chart'} label="Birth Chart" onPress={() => setActiveTab('chart')} />
            </View>

            {activeTab === 'basic' ? (
              <View style={styles.grid}>
                <DetailItem label="Birth Date" val="March 15, 1999" icon="calendar-outline" />
                <DetailItem label="Birth Time" val="05:30 AM" icon="time-outline" />
                <DetailItem label="Birth Place" val="Mumbai, MH" icon="location-outline" />
                <DetailItem label="Zodiac" val="♓ Pisces" icon="star-outline" />
              </View>
            ) : (
              <View style={styles.chartContainer}>
                <View style={styles.chartFrame}>
                  <Svg height="160" width="160" viewBox="0 0 100 100">
                    <Line x1="0" y1="0" x2="100" y2="100" stroke="#334155" strokeWidth="1" />
                    <Line x1="100" y1="0" x2="0" y2="100" stroke="#334155" strokeWidth="1" />
                    <Line x1="50" y1="0" x2="50" y2="100" stroke="#334155" strokeWidth="1" />
                    <Line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="1" />
                    <Path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="#334155" strokeWidth="1" />
                  </Svg>
                </View>
              </View>
            )}
          </View>

          {/* GALLERY */}
          <Text style={styles.sectionHeading}>Gallery</Text>
          <View style={styles.galleryGrid}>
            {[1, 2, 3, 4].map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.galleryItem}
                onPress={() => setSelectedPhoto("https://images.unsplash.com/photo-1546961329-78bef0414d7c")}
              >
                <Image
                  source={{ uri: `https://picsum.photos/id/${idx + 20}/400/400` }}
                  style={styles.galleryImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* PHOTO MODAL */}
      <Modal visible={!!selectedPhoto} transparent animationType="fade">
        <View style={styles.modalBg}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedPhoto(null)}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          {selectedPhoto && <Image source={{ uri: selectedPhoto }} style={styles.fullImg} resizeMode="contain" />}
        </View>
      </Modal>
    </View>
  );
}

const DetailItem = ({ label, val, icon }: any) => (
  <View style={styles.detailItem}>
    <Ionicons name={icon} size={14} color="#64748b" style={{ marginBottom: 4 }} />
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailVal}>{val}</Text>
  </View>
);

const TabTrigger = ({ active, label, onPress }: any) => (
  <TouchableOpacity onPress={onPress} style={[styles.tabBtn, active && styles.tabBtnActive]}>
    <Text style={[styles.tabBtnText, active && { color: '#fff' }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  heroSection: { height: 420, justifyContent: 'flex-end' },
  heroBg: { ...StyleSheet.absoluteFillObject },
  heroOverlay: { flex: 1 },
  headerContent: { alignItems: 'center', paddingBottom: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#000', marginBottom: 15 },
  userName: { color: '#fff', fontSize: 32, fontWeight: '800', letterSpacing: -0.5 },
  jobBadgeContainer: { alignItems: 'center', marginTop: 8 },
  jobBadge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 30 },
  jobText: { color: '#fff', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  socialHandle: { color: '#64748b', fontSize: 14, marginTop: 8, fontWeight: '500' },

  contentWrapper: { paddingHorizontal: 20 },
  tagRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginVertical: 20 },
  tag: { backgroundColor: '#1e293b', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#334155' },
  tagText: { color: '#94a3b8', fontSize: 12, fontWeight: '600' },
  bioText: { color: '#cbd5e1', fontSize: 15, lineHeight: 22, textAlign: 'center', marginBottom: 30 },

  glassCard: { backgroundColor: '#0f172a', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: '#1e293b' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 8 },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },

  tabsList: { flexDirection: 'row', backgroundColor: '#1e293b', borderRadius: 12, padding: 4, marginBottom: 20 },
  tabBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10 },
  tabBtnActive: { backgroundColor: '#334155' },
  tabBtnText: { color: '#64748b', fontSize: 14, fontWeight: '600' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  detailItem: { width: '47%', backgroundColor: '#1e293b', padding: 12, borderRadius: 16 },
  detailLabel: { color: '#64748b', fontSize: 11, marginBottom: 2 },
  detailVal: { color: '#f1f5f9', fontSize: 14, fontWeight: '600' },

  chartContainer: { alignItems: 'center', padding: 10 },
  chartFrame: { padding: 20, backgroundColor: '#1e293b', borderRadius: 20 },

  sectionHeading: { color: '#fff', fontSize: 20, fontWeight: '700', marginTop: 40, marginBottom: 15 },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  galleryItem: { width: '48%', aspectRatio: 1, marginBottom: 15, borderRadius: 20, overflow: 'hidden' },
  galleryImage: { width: '100%', height: '100%' },

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.98)', justifyContent: 'center' },
  fullImg: { width: width, height: width * 1.5 },
  closeBtn: { position: 'absolute', top: 50, right: 20, zIndex: 10 }
});