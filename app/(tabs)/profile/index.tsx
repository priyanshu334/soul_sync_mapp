import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
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
  View,
  ActivityIndicator
} from "react-native";
import Svg, { Line, Path } from "react-native-svg";
import { useAuth } from "@/providers/AuthProvider";
import { getProfile, UserProfile } from "@/src/services/profile.service";
import { getZodiacSign } from "@/src/utils/zodiac";

const { width } = Dimensions.get("window");

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=400";
const DEFAULT_COVER = "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=1080";

export default function ProfileScreen() {
  const { session } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    async function fetchProfile() {
      if (!session?.user?.id) return;
      
      try {
        const { data, error } = await getProfile(session.user.id);
        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [session?.user?.id]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#db2777" />
      </View>
    );
  }

  const profileImages = profile?.images || [];
  const primaryImage = profileImages[0] || DEFAULT_AVATAR;
  const coverImage = profileImages[1] || profileImages[0] || DEFAULT_COVER;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <ImageBackground
            source={{ uri: coverImage }}
            style={styles.heroBg}
            blurRadius={10}
          >
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)', '#000']} style={styles.heroOverlay} />
          </ImageBackground>

          <TouchableOpacity
            style={styles.settingsBtn}
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)/profile/(settings)")}
          >
            <Ionicons name="settings-outline" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Image
              source={{ uri: primaryImage }}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>{profile?.username || "Anonymous"}</Text>
            <View style={styles.jobBadgeContainer}>
              <LinearGradient
                colors={['#9333ea', '#db2777']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.jobBadge}
              >
                <Text style={styles.jobText}>Astro Member</Text>
              </LinearGradient>
              <Text style={styles.socialHandle}>@{profile?.username?.toLowerCase().replace(/\s+/g, '.') || "user"}</Text>
              
              <TouchableOpacity 
                style={styles.editProfileBtn}
                onPress={() => router.push("/(tabs)/profile/edit")}
              >
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* STATS / TAGS */}
        <View style={styles.contentWrapper}>
          <View style={styles.tagRow}>
            {(profile?.interests || ['Astrology', 'Spirituality']).map((tag: string) => (
              <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
            ))}
          </View>

          <Text style={styles.bioText}>
            {profile?.bio || "No bio yet."}
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
                <DetailItem label="Birth Date" val={profile?.birth_date || "Not set"} icon="calendar-outline" />
                <DetailItem label="Birth Time" val={profile?.birth_time || "Not set"} icon="time-outline" />
                <DetailItem label="Birth Place" val={profile?.birth_place || "Not set"} icon="location-outline" />
                <DetailItem label="Zodiac" val={getZodiacSign(profile?.birth_date)} icon="star-outline" />
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
            {profileImages.length > 0 ? (
              profileImages.map((img: string, idx: number) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.galleryItem}
                  onPress={() => setSelectedPhoto(img)}
                >
                  <Image
                    source={{ uri: img }}
                    style={styles.galleryImage}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ color: '#64748b', textAlign: 'center', width: '100%', marginTop: 20 }}>No photos uploaded yet.</Text>
            )}
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
  ,
  settingsBtn: {
    position: "absolute",
    top: 52,
    right: 20,
    zIndex: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  editProfileBtn: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#0f172a',
  },
  editProfileText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});