import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Line } from "react-native-svg";

const { width } = Dimensions.get("window");

// Mock Data (matching your web code)
const photos = [
  { id: "1", url: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=1080", h: 220 },
  { id: "2", url: "https://images.unsplash.com/photo-1612802969356-391e9d36a474?q=80&w=1080", h: 160 },
  { id: "3", url: "https://images.unsplash.com/photo-1687748025388-ce0e6e900805?q=80&w=1080", h: 260 },
  { id: "4", url: "https://images.unsplash.com/photo-1595368062405-e4d7840cba14?q=80&w=1080", h: 180 },
  { id: "5", url: "https://images.unsplash.com/photo-1635545999375-057ee4013deb?q=80&w=1080", h: 210 },
  { id: "6", url: "https://images.unsplash.com/photo-1716654716572-7b13ad56ba63?q=80&w=1080", h: 150 },
  { id: "7", url: "https://images.unsplash.com/photo-1569498318979-4b9150e04365?q=80&w=1080", h: 200 },
];

const traits = [
  { id: '1', title: "Creative Thinker", desc: "I love to explore new ideas...", img: "https://images.unsplash.com/photo-1608882122140-6693d924367f?q=80&w=400" },
  { id: '2', title: "Nature Lover", desc: "Peace and tranquility...", img: "https://images.unsplash.com/photo-1551127059-b2f01cd9d05e?q=80&w=400" },
  { id: '3', title: "Urban Explorer", desc: "Finding beauty in city life...", img: "https://images.unsplash.com/photo-1643875402004-22631ef914aa?q=80&w=400" },
];

export default function ProfileScreen() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.userName}>Priya Sharma</Text>
          <View style={styles.jobBadgeContainer}>
            <LinearGradient colors={['#9333ea', '#db2777']} start={[0, 0]} end={[1, 0]} style={styles.jobBadge}>
              <Text style={styles.jobText}>UI/UX Designer</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.tagRow}>
            {['Photography', 'Travel', 'Art'].map(tag => (
              <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
            ))}
          </View>

          <Text style={styles.bioText}>
            I'm a simple designer and very passionate about what I do. Im inspired by the everyday world around me.
          </Text>
          <Text style={styles.socialHandle}>@priya.sharma.designer</Text>
        </View>
        
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=400" }} 
          style={styles.profileImage} 
        />
      </View>

      {/* MASONRY GALLERY */}
      <View style={styles.section}>
        <FlatList
          data={photos}
          numColumns={2}
          keyExtractor={(item) => item.id}
          scrollEnabled={false} // Let the main ScrollView handle it
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedPhoto(item.url)} style={styles.photoWrapper}>
              <Image source={{ uri: item.url }} style={[styles.photo, { height: item.h }]} />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* KUNDLI SECTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>my kundli-</Text>
        <View style={styles.card}>
          <View style={styles.tabsList}>
            <TabTrigger active={activeTab === 'basic'} label="Basic" onPress={() => setActiveTab('basic')} />
            <TabTrigger active={activeTab === 'chart'} label="Birth Chart" onPress={() => setActiveTab('chart')} />
          </View>

          {activeTab === 'basic' ? (
            <View style={styles.tabContent}>
               <View style={styles.grid}>
                  <DetailItem label="Birth Date" val="March 15, 1999" />
                  <DetailItem label="Birth Time" val="05:30 AM" />
                  <DetailItem label="Birth Place" val="Mumbai, MH" />
                  <DetailItem label="Zodiac" val="♓ Pisces" />
               </View>
            </View>
          ) : (
            <View style={styles.chartContainer}>
               <Svg height="200" width="200" viewBox="0 0 100 100" style={styles.svg}>
                  <Line x1="0" y1="0" x2="100" y2="100" stroke="#444" strokeWidth="0.5" />
                  <Line x1="100" y1="0" x2="0" y2="100" stroke="#444" strokeWidth="0.5" />
                  <Line x1="50" y1="0" x2="50" y2="100" stroke="#444" strokeWidth="0.5" />
                  <Line x1="0" y1="50" x2="100" y2="50" stroke="#444" strokeWidth="0.5" />
               </Svg>
            </View>
          )}
        </View>
      </View>

      {/* TRAITS SECTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>my traits-</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={traits}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.traitCard}>
              <Image source={{ uri: item.img }} style={styles.traitImg} />
              <Text style={styles.traitTitle}>{item.title}</Text>
              <Text style={styles.traitDesc}>{item.desc}</Text>
            </View>
          )}
        />
      </View>

      {/* QUOTE SECTION */}
      <View style={[styles.section, { paddingBottom: 60 }]}>
        <Text style={styles.sectionTitle}>Quote by user-</Text>
        <View style={styles.quoteWrapper}>
          <Image source={{ uri: photos[0].url }} style={styles.quoteImg} />
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={styles.quoteGradient}>
          </LinearGradient>
        </View>
      </View>

      {/* PHOTO MODAL */}
      <Modal visible={!!selectedPhoto} transparent animationType="fade">
        <View style={styles.modalBg}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedPhoto(null)}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          {selectedPhoto && <Image source={{ uri: selectedPhoto }} style={styles.fullImg} resizeMode="contain" />}
        </View>
      </Modal>

    </ScrollView>
  );
}

// Helper Components
const DetailItem = ({ label, val }: any) => (
  <View style={{ width: '50%', marginBottom: 10 }}>
    <Text style={{ color: '#888', fontSize: 10 }}>{label}</Text>
    <Text style={{ color: '#eee', fontSize: 13 }}>{val}</Text>
  </View>
);

const TabTrigger = ({ active, label, onPress }: any) => (
  <TouchableOpacity onPress={onPress} style={[styles.tabBtn, active && styles.tabBtnActive]}>
    <Text style={[styles.tabBtnText, active && { color: '#fff' }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', padding: 20, paddingTop: 60 },
  headerInfo: { flex: 1 },
  userName: { color: '#fff', fontSize: 28, fontWeight: '700', marginBottom: 8 },
  jobBadgeContainer: { flexDirection: 'row', marginBottom: 10 },
  jobBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  jobText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  tagRow: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  tag: { backgroundColor: '#18181b', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  tagText: { color: '#fff', fontSize: 10 },
  bioText: { color: '#a1a1aa', fontSize: 12, lineHeight: 18 },
  socialHandle: { color: '#60a5fa', fontSize: 12, marginTop: 8 },
  profileImage: { width: 100, height: 130, borderRadius: 50, marginLeft: 15 },
  section: { paddingHorizontal: 20, marginTop: 20 },
  photoWrapper: { padding: 4 },
  photo: { width: '100%', borderRadius: 12, backgroundColor: '#18181b' },
  sectionTitle: { color: '#fff', fontSize: 22, fontWeight: '600', marginBottom: 15 },
  card: { backgroundColor: '#18181b', borderRadius: 16, padding: 15 },
  tabsList: { flexDirection: 'row', backgroundColor: '#27272a', borderRadius: 8, padding: 4 },
  tabBtn: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 6 },
  tabBtnActive: { backgroundColor: '#3f3f46' },
  tabBtnText: { color: '#a1a1aa', fontSize: 14, fontWeight: '600' },
  tabContent: { marginTop: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  chartContainer: { alignItems: 'center', paddingVertical: 20 },
  svg: { borderColor: '#3f3f46', borderWidth: 1 },
  traitCard: { width: 130, backgroundColor: '#18181b', borderRadius: 20, padding: 15, marginRight: 12, alignItems: 'center' },
  traitImg: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  traitTitle: { color: '#fff', fontSize: 12, fontWeight: '600', textAlign: 'center' },
  traitDesc: { color: '#71717a', fontSize: 10, textAlign: 'center', marginTop: 4 },
  quoteWrapper: { width: '100%', height: 250, borderRadius: 20, overflow: 'hidden' },
  quoteImg: { width: '100%', height: '100%' },
  quoteGradient: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', padding: 20 },
  quoteText: { color: '#fff', fontSize: 14, fontStyle: 'italic' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center' },
  fullImg: { width: width, height: width * 1.5 },
  closeBtn: { position: 'absolute', top: 50, right: 20, zIndex: 10 }
});