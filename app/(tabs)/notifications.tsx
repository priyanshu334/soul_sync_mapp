import { COLORS, SIZES } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/providers/AuthProvider";
import { getReceivedInteractions, InteractionWithProfile } from "@/src/services/interaction.service";
import { BlurView } from "expo-blur";

export default function NotificationsScreen() {
  const { session } = useAuth();
  const [interactions, setInteractions] = useState<InteractionWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const { data, error } = await getReceivedInteractions(session.user.id);
      if (error) throw error;
      setInteractions(data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [session?.user?.id]);

  const getActionText = (type: string) => {
    switch (type) {
      case 'LIKE': return 'liked your profile';
      case 'SUPER_LIKE': return 'super liked you!';
      case 'FIRE': return 'sent you some fire!';
      default: return 'interacted with you';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'LIKE': return { name: 'heart', color: '#ef4444' };
      case 'SUPER_LIKE': return { name: 'star', color: '#3b82f6' };
      case 'FIRE': return { name: 'flame', color: '#f97316' };
      default: return { name: 'notifications', color: '#8b5cf6' };
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const then = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const renderItem = ({ item }: { item: InteractionWithProfile }) => {
    const icon = getActionIcon(item.action_type);
    const profile = item.profiles;
    const profileImage = profile?.images?.[0];

    return (
      <BlurView intensity={10} tint="dark" style={styles.notificationItem}>
        <TouchableOpacity 
          style={styles.itemContent}
          onPress={() => router.push(`/(tabs)/profile`)} // Could navigate to specific user profile if implemented
        >
          <View style={styles.imageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.placeholderAvatar]}>
                <Ionicons name="person" size={24} color={COLORS.gray} />
              </View>
            )}
            <View style={[styles.badge, { backgroundColor: icon.color }]}>
              <Ionicons name={icon.name as any} size={10} color="white" />
            </View>
          </View>

          <View style={styles.textContent}>
            <Text style={styles.userName}>
              {profile?.username || 'Someone'} <Text style={styles.actionText}>{getActionText(item.action_type)}</Text>
            </Text>
            <Text style={styles.timeText}>{formatRelativeTime(item.created_at)}</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.2)" />
        </TouchableOpacity>
      </BlurView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Activity</Text>
        <TouchableOpacity onPress={fetchNotifications} style={styles.refreshButton}>
          <Ionicons name="refresh" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primaryStart} />
        </View>
      ) : interactions.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="notifications-off-outline" size={64} color="rgba(255,255,255,0.1)" />
          <Text style={styles.emptyTitle}>No activity yet</Text>
          <Text style={styles.emptySubtitle}>When people interact with you, they'll show up here.</Text>
        </View>
      ) : (
        <FlatList
          data={interactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  notificationItem: {
    marginBottom: 12,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  imageContainer: {
    position: 'relative',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  placeholderAvatar: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    lineHeight: 22,
  },
  actionText: {
    fontWeight: '400',
    color: 'rgba(255,255,255,0.6)',
  },
  timeText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 4,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
});
