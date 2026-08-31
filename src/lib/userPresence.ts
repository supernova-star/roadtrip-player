import { supabase } from './supabase';
import { getBrowserId } from './browserId';

export const upsertUserPresence = async (userName: string) => {
  const browserId = getBrowserId();

  console.log('Presence payload:', {
    userName,
    browserId,
  });

  const { error } = await supabase.from('casette_users').upsert(
    {
      browser_id: browserId,
      user_name: userName,
      last_seen_at: new Date().toISOString(),
    },
    {
      onConflict: 'browser_id',
    },
  );

  if (error) {
    console.error('Failed to update user presence:', error);
  }
};
