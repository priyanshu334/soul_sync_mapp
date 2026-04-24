import { supabase } from '@/src/lib/supabase';

import { UserProfile } from './profile.service';

export type InteractionType = 'LIKE' | 'DISLIKE' | 'SUPER_LIKE' | 'FIRE';

export interface InteractionWithProfile {
  id: string;
  user_id: string;
  target_id: string;
  action_type: InteractionType;
  created_at: string;
  profiles: UserProfile;
}

export const recordInteraction = async (
  userId: string,
  targetId: string,
  actionType: InteractionType
) => {
  try {
    const { data, error } = await supabase
      .from('interactions')
      .upsert(
        { 
          user_id: userId, 
          target_id: targetId, 
          action_type: actionType,
          created_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,target_id' } // Note: requires a unique constraint on (user_id, target_id)
      )
      .select();

    if (error) {
      console.error('Error recording interaction:', error);
      return { error };
    }
    return { data };
  } catch (error) {
    console.error('Exception recording interaction:', error);
    return { error };
  }
};

export const getReceivedInteractions = async (targetId: string) => {
  try {
    const { data, error } = await supabase
      .from('interactions')
      .select(`
        *,
        profiles:user_id (*)
      `)
      .eq('target_id', targetId)
      .neq('action_type', 'DISLIKE')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching received interactions:', error);
      return { error };
    }
    return { data: data as unknown as InteractionWithProfile[] };
  } catch (error) {
    console.error('Exception fetching received interactions:', error);
    return { error };
  }
};

