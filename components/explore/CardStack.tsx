import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { ProfileCard } from "@/components/explore/ProfileCard";
import { styles } from "@/components/explore/styles";
import { OverlayType, Profile } from "@/components/explore/types";

type CardStackProps = {
  profiles: Profile[];
  overlayType: OverlayType;
  onDislike: () => void;
  onLike: () => void;
  onRefresh: () => void;
};

export function CardStack({
  profiles,
  overlayType,
  onDislike,
  onLike,
  onRefresh,
}: CardStackProps) {
  return (
    <View style={styles.cardStack}>
      {profiles.length === 0 ? (
        <View style={styles.noMore}>
          <Text style={styles.noMoreIcon}>✨</Text>
          <Text style={styles.noMoreText}>You&apos;ve seen everyone nearby</Text>
          <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      ) : (
        [...profiles]
          .slice(0, 2)
          .reverse()
          .map((profile, i, arr) => {
            const isTop = i === arr.length - 1;
            return (
              <ProfileCard
                key={profile.id}
                profile={profile}
                isTop={isTop}
                overlayType={isTop ? overlayType : null}
                onSwipeLeft={onDislike}
                onSwipeRight={onLike}
              />
            );
          })
      )}
    </View>
  );
}
