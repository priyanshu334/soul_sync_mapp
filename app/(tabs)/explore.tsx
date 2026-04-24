import { ActionBar } from "@/components/explore/ActionBar";
import { CardStack } from "@/components/explore/CardStack";
import { MessageModal } from "@/components/explore/MessageModal";
import { styles } from "@/components/explore/styles";
import { Toast } from "@/components/explore/Toast";
import { OverlayType, Profile } from "@/components/explore/types";
import { useModalState } from "@/providers/ModalStateProvider";
import { useAuth } from "@/providers/AuthProvider";
import { getExploreProfiles, UserProfile } from "@/src/services/profile.service";
import { getZodiacSign } from "@/src/utils/zodiac";
import { recordInteraction } from "@/src/services/interaction.service";
import { chatService } from "@/src/services/chat.service";
import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const mapToProfile = (p: UserProfile): Profile => {
  const birthDate = p.birth_date ? new Date(p.birth_date) : new Date();
  const age = new Date().getFullYear() - birthDate.getFullYear();
  
  return {
    id: p.id,
    name: p.username || "Anonymous",
    age: age,
    location: p.birth_place || "Unknown",
    dist: "Near you",
    zodiac: getZodiacSign(p.birth_date),
    tags: p.interests || [],
    bgColors: ["#3a2060", "#1a3050"],
    images: p.images
  };
};

export default function ExploreScreen() {
  const { session } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [overlayType, setOverlayType] = useState<OverlayType>(null);
  const [toast, setToast] = useState({ message: "", visible: false, key: 0 });
  const [msgVisible, setMsgVisible] = useState(false);
  const { setIsModalOpen } = useModalState();

  const fetchProfiles = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const { data, error } = await getExploreProfiles(session.user.id);
      if (error) throw error;
      setProfiles((data || []).map(mapToProfile));
    } catch (error) {
      console.error("Error fetching explore profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [session?.user?.id]);

  const topProfile = profiles[0];

  const showToast = (message: string) => {
    setToast((prev) => ({ message, visible: true, key: prev.key + 1 }));
  };

  const triggerOverlay = (type: OverlayType, delay = 200) => {
    setOverlayType(type);
    setTimeout(() => setOverlayType(null), delay);
  };

  const removeTop = () => {
    setTimeout(() => setProfiles((prev) => prev.slice(1)), 350);
  };

  const handleDislike = async () => {
    if (!topProfile || !session?.user?.id) return;
    triggerOverlay("NOPE");
    removeTop();
    await recordInteraction(session.user.id, topProfile.id, 'DISLIKE');
  };

  const handleLike = async () => {
    if (!topProfile || !session?.user?.id) return;
    triggerOverlay("LIKE");
    showToast(`Liked ${topProfile.name}!`);
    removeTop();
    await recordInteraction(session.user.id, topProfile.id, 'LIKE');
  };

  const handleFire = async () => {
    if (!topProfile || !session?.user?.id) return;
    triggerOverlay("FIRE");
    showToast(`Fire sent to ${topProfile.name}!`);
    removeTop();
    await recordInteraction(session.user.id, topProfile.id, 'FIRE');
  };

  const handleSuperLike = async () => {
    if (!topProfile || !session?.user?.id) return;
    triggerOverlay("SUPER");
    showToast(`Super liked ${topProfile.name}!`);
    removeTop();
    await recordInteraction(session.user.id, topProfile.id, 'SUPER_LIKE');
  };

  const handleViewProfile = () => {
    if (!topProfile) return;
    showToast(`Opening ${topProfile.name}'s profile`);
  };

  const openMessageModal = () => {
    if (!topProfile) return;
    setMsgVisible(true);
    setIsModalOpen(true);
  };

  const closeMessageModal = () => {
    setMsgVisible(false);
    setIsModalOpen(false);
  };

  const handleSendMessage = async (msg: string) => {
    closeMessageModal();
    if (msg && topProfile && session?.user?.id) {
      showToast("Message sent!");
      await chatService.sendMessage(session.user.id, topProfile.id, msg);
    }
  };

  const handleRefresh = () => fetchProfiles();

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#6A00F4" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
        </View>

        <CardStack
          profiles={profiles}
          overlayType={overlayType}
          onDislike={handleDislike}
          onLike={handleLike}
          onRefresh={handleRefresh}
        />

        <ActionBar
          hasProfiles={Boolean(topProfile)}
          onDislike={handleDislike}
          onSuperLike={handleSuperLike}
          onFire={handleFire}
          onLike={handleLike}
          onViewProfile={handleViewProfile}
          onOpenMessage={openMessageModal}
        />

        <Toast
          key={toast.key}
          message={toast.message}
          visible={toast.visible}
        />

        <MessageModal
          visible={msgVisible}
          targetName={topProfile?.name ?? ""}
          onClose={closeMessageModal}
          onSend={handleSendMessage}
        />
      </View>
    </SafeAreaView>
  );
}
