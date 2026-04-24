import { supabase } from '@/src/lib/supabase';
import { UserProfile } from './profile.service';

export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
};

export type Conversation = {
  id: string;
  otherUser: UserProfile;
  lastMessage: Message;
  unreadCount: number;
};

export const chatService = {
  /**
   * Fetch all conversations for a user by getting unique message pairs
   */
  async getConversations(userId: string): Promise<Conversation[]> {
    try {
      // Get all messages where user is sender or receiver
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group by the *other* user
      const conversationsMap = new Map<string, Conversation>();

      for (const msg of messages) {
        const otherUserId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;

        if (!conversationsMap.has(otherUserId)) {
          // Fetch the profile for this user
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', otherUserId)
            .single();

          if (profileData) {
            conversationsMap.set(otherUserId, {
              id: otherUserId, // Use the other user's ID as conversation ID for simplicity
              otherUser: profileData,
              lastMessage: msg,
              unreadCount: msg.receiver_id === userId && !msg.read_at ? 1 : 0, // Simplified unread count
            });
          }
        } else {
          // Accumulate unread count if we've already found the last message
          const existing = conversationsMap.get(otherUserId)!;
          if (msg.receiver_id === userId && !msg.read_at) {
            existing.unreadCount += 1;
          }
        }
      }

      return Array.from(conversationsMap.values());
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }
  },

  /**
   * Fetch messages between two users
   */
  async getMessages(userId: string, otherUserId: string): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
        .order('created_at', { ascending: true }); // Chronological order

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  },

  /**
   * Send a new message
   */
  async sendMessage(senderId: string, receiverId: string, content: string) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            sender_id: senderId,
            receiver_id: receiverId,
            content,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return { data };
    } catch (error) {
      console.error('Error sending message:', error);
      return { error };
    }
  },

  /**
   * Subscribe to new incoming messages for a specific conversation
   */
  subscribeToMessages(userId: string, otherUserId: string, onNewMessage: (msg: Message) => void) {
    return supabase
      .channel(`chat_${userId}_${otherUserId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          // Filter for messages where either user is sender and the other is receiver
          // Supabase realtime filters are somewhat limited with OR, so we subscribe to all
          // and filter client-side for safety.
        },
        (payload) => {
          const newMsg = payload.new as Message;
          const isRelevant = 
            (newMsg.sender_id === userId && newMsg.receiver_id === otherUserId) ||
            (newMsg.sender_id === otherUserId && newMsg.receiver_id === userId);
            
          if (isRelevant) {
            onNewMessage(newMsg);
          }
        }
      )
      .subscribe();
  },

  /**
   * Mark messages as read
   */
  async markAsRead(userId: string, senderId: string) {
    try {
      await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('receiver_id', userId)
        .eq('sender_id', senderId)
        .is('read_at', null);
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  }
};
