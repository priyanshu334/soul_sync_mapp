import { ActionBar } from "@/components/explore/ActionBar";
import { CardStack } from "@/components/explore/CardStack";
import { EXPLORE_PROFILES } from "@/components/explore/data";
import { MessageModal } from "@/components/explore/MessageModal";
import { styles } from "@/components/explore/styles";
import { Toast } from "@/components/explore/Toast";
import { OverlayType } from "@/components/explore/types";
import { useModalState } from "@/providers/ModalStateProvider";
import React, { useState } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

export default function ExploreScreen() {
  const [profiles, setProfiles] = useState(EXPLORE_PROFILES);
  const [overlayType, setOverlayType] = useState<OverlayType>(null);
  const [toast, setToast] = useState({ message: "", visible: false, key: 0 });
  const [msgVisible, setMsgVisible] = useState(false);
  const { setIsModalOpen } = useModalState();

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

  const handleDislike = () => {
    if (!topProfile) return;
    triggerOverlay("NOPE");
    removeTop();
  };

  const handleLike = () => {
    if (!topProfile) return;
    triggerOverlay("LIKE");
    showToast(`Liked ${topProfile.name}!`);
    removeTop();
  };

  const handleFire = () => {
    if (!topProfile) return;
    triggerOverlay("FIRE");
    showToast(`Fire sent to ${topProfile.name}!`);
    removeTop();
  };

  const handleSuperLike = () => {
    if (!topProfile) return;
    triggerOverlay("SUPER");
    showToast(`Super liked ${topProfile.name}!`);
    removeTop();
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

  const handleSendMessage = (msg: string) => {
    closeMessageModal();
    if (msg) showToast("Message sent!");
  };

  const handleRefresh = () => setProfiles(EXPLORE_PROFILES);

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
