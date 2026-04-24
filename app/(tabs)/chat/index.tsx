import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/providers/AuthProvider";
import { chatService, Conversation } from "@/src/services/chat.service";
import { COLORS, SIZES } from "@/constants/theme";

const H_PAD = 15;

const cosmic = {
  headerTitle: {
    fontFamily: "Forum_400Regular",
    fontSize: 30,
    color: "#ffffff",
    letterSpacing: 1,
  },
};

export default function ChatListScreen() {
  const { session } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchConversations = async () => {
        if (!session?.user?.id) return;
        setLoading(true);
        try {
          const data = await chatService.getConversations(session.user.id);
          setConversations(data);
        } catch (error) {
          console.error("Failed to load conversations:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchConversations();
    }, [session?.user?.id])
  );

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    }
    return date.toLocaleDateString();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View
        style={{
          paddingHorizontal: H_PAD,
          paddingVertical: 8,
          borderBottomWidth: 0.5,
          borderBottomColor: "rgba(255,255,255,0.06)",
        }}
      >
        <Text style={cosmic.headerTitle}>Messages</Text>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color={COLORS.primaryStart} size="large" />
        </View>
      ) : conversations.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: SIZES.padding }}>
          <Text style={{ color: COLORS.textSecondary, fontSize: 16, textAlign: "center" }}>
            No cosmic connections yet. Head to Explore to find your match!
          </Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/(tabs)/chat/${item.otherUser.id}`)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 14,
              }}
            >
              <Image
                source={{ uri: item.otherUser.images?.[0] || "https://i.pravatar.cc/150?img=1" }}
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 30,
                  borderWidth: 2,
                  borderColor: item.unreadCount > 0 ? COLORS.primaryStart : "transparent",
                }}
              />

              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={{ color: COLORS.textPrimary, fontSize: 16, fontWeight: item.unreadCount > 0 ? "bold" : "600" }}>
                  {item.otherUser.username || item.otherUser.id.substring(0, 8)}
                </Text>
                <Text 
                  style={{ 
                    color: item.unreadCount > 0 ? COLORS.textPrimary : COLORS.textSecondary, 
                    marginTop: 4,
                    fontWeight: item.unreadCount > 0 ? "500" : "400" 
                  }}
                  numberOfLines={1}
                >
                  {item.lastMessage.content}
                </Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>
                  {formatTime(item.lastMessage.created_at)}
                </Text>
                {item.unreadCount > 0 && (
                  <View style={{
                    backgroundColor: COLORS.primaryStart,
                    borderRadius: 10,
                    minWidth: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 4,
                    paddingHorizontal: 6
                  }}>
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                      {item.unreadCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}
