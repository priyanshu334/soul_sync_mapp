import { useLocalSearchParams, router } from "expo-router";
import { useModalState } from "@/providers/ModalStateProvider";
import { useAuth } from "@/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useRef } from "react";
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { chatService, Message } from "@/src/services/chat.service";
import { COLORS, SIZES } from "@/constants/theme";

export default function ChatScreen() {
  const { id: otherUserId } = useLocalSearchParams<{ id: string }>();
  const { session } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { setIsModalOpen } = useModalState();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Hide navigation when entering this chat screen
    setIsModalOpen(true);
    return () => {
      // Show navigation when leaving this chat screen
      setIsModalOpen(false);
    };
  }, [setIsModalOpen]);

  useEffect(() => {
    if (!session?.user?.id || !otherUserId) return;

    const currentUserId = session.user.id;

    // Load initial messages
    const loadMessages = async () => {
      setLoading(true);
      const fetchedMessages = await chatService.getMessages(currentUserId, otherUserId);
      setMessages(fetchedMessages);
      setLoading(false);
      
      // Mark as read
      await chatService.markAsRead(currentUserId, otherUserId);
    };

    loadMessages();

    // Subscribe to real-time new messages
    const subscription = chatService.subscribeToMessages(
      currentUserId,
      otherUserId,
      (newMsg) => {
        setMessages((prev) => {
          // Check if message already exists (e.g. from optimistic update)
          if (prev.some((m) => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
        
        // Mark as read if we received it
        if (newMsg.receiver_id === currentUserId) {
          chatService.markAsRead(currentUserId, otherUserId);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [session?.user?.id, otherUserId]);

  const handleSend = async () => {
    if (!input.trim() || !session?.user?.id || !otherUserId) return;

    const content = input.trim();
    setInput("");

    // Optimistic update
    const tempId = `temp-${Date.now()}`;
    const newMsg: Message = {
      id: tempId,
      sender_id: session.user.id,
      receiver_id: otherUserId,
      content,
      read_at: null,
      created_at: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, newMsg]);

    // Send to Supabase
    const { data, error } = await chatService.sendMessage(session.user.id, otherUserId, content);
    
    if (error) {
      // Revert if error
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      console.error("Failed to send message:", error);
    } else if (data) {
      // Replace temp with real
      setMessages((prev) => prev.map((m) => m.id === tempId ? data : m));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Custom Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(255,255,255,0.06)",
      }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 15 }}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>Chat</Text>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={COLORS.primaryStart} />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            renderItem={({ item }) => {
              const isMe = item.sender_id === session?.user?.id;
              return (
                <View
                  style={{
                    alignSelf: isMe ? "flex-end" : "flex-start",
                    backgroundColor: isMe ? COLORS.primaryStart : COLORS.surface,
                    padding: 14,
                    borderRadius: 18,
                    marginBottom: 10,
                    maxWidth: "75%",
                    borderBottomRightRadius: isMe ? 4 : 18,
                    borderBottomLeftRadius: !isMe ? 4 : 18,
                  }}
                >
                  <Text style={{ color: "white" }}>{item.content}</Text>
                  <Text style={{ 
                    color: isMe ? "rgba(255,255,255,0.7)" : COLORS.textSecondary, 
                    fontSize: 10, 
                    alignSelf: "flex-end",
                    marginTop: 4 
                  }}>
                    {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              );
            }}
          />
        )}

        {/* Input Bar */}
        <View
          style={{
            flexDirection: "row",
            padding: 14,
            borderTopWidth: 1,
            borderTopColor: COLORS.surface,
            alignItems: "center",
            backgroundColor: COLORS.background,
          }}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Send a cosmic message..."
            placeholderTextColor={COLORS.textSecondary}
            style={{
              flex: 1,
              backgroundColor: COLORS.surface,
              borderRadius: 25,
              paddingHorizontal: 16,
              paddingVertical: 12,
              color: "white",
              fontSize: 16,
            }}
            onSubmitEditing={handleSend}
          />

          <TouchableOpacity
            onPress={handleSend}
            disabled={!input.trim()}
            style={{
              marginLeft: 10,
              backgroundColor: input.trim() ? COLORS.primaryStart : COLORS.surface,
              width: 44,
              height: 44,
              borderRadius: 22,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="send" size={20} color={input.trim() ? "white" : COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
