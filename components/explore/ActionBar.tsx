import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import {
  IconClose,
  IconFire,
  IconHeart,
  IconProfile,
  IconSend,
  IconStar,
} from "@/components/explore/icons";
import { styles } from "@/components/explore/styles";

type ActionBarProps = {
  hasProfiles: boolean;
  onDislike: () => void;
  onSuperLike: () => void;
  onFire: () => void;
  onLike: () => void;
  onViewProfile: () => void;
  onOpenMessage: () => void;
};

export function ActionBar({
  hasProfiles,
  onDislike,
  onSuperLike,
  onFire,
  onLike,
  onViewProfile,
  onOpenMessage,
}: ActionBarProps) {
  const disabled = !hasProfiles;

  return (
    <View style={styles.bottomArea}>
      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnDislike]}
          onPress={onDislike}
          activeOpacity={0.8}
          disabled={disabled}
        >
          <IconClose />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnStar]}
          onPress={onSuperLike}
          activeOpacity={0.8}
          disabled={disabled}
        >
          <IconStar />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnFire]}
          onPress={onFire}
          activeOpacity={0.8}
          disabled={disabled}
        >
          <IconFire />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnLike]}
          onPress={onLike}
          activeOpacity={0.8}
          disabled={disabled}
        >
          <IconHeart />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnViewProfile]}
          onPress={onViewProfile}
          activeOpacity={0.8}
          disabled={disabled}
        >
          <IconProfile />
        </TouchableOpacity>
      </View>

      <View style={styles.msgRow}>
        <TouchableOpacity
          style={styles.msgBarInput}
          onPress={onOpenMessage}
          activeOpacity={0.8}
          disabled={disabled}
        >
          <Text style={styles.msgPlaceholder}>Write a message...</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.msgSendBtn}
          onPress={onOpenMessage}
          activeOpacity={0.8}
          disabled={disabled}
        >
          <IconSend />
        </TouchableOpacity>
      </View>
    </View>
  );
}
