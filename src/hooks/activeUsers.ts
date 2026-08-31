import { supabase } from '@/lib/supabase';

export interface User {
  id: number;
  user_name: string;
  browser_id: string;
  last_seen_at: string;
  created_at: string;
}

export const getActiveUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('casette_users')
    .select('id, user_name, browser_id, last_seen_at, created_at')
    .gt('last_seen_at', new Date(Date.now() - 2 * 60 * 1000).toISOString())
    .order('last_seen_at', {
      ascending: false,
    });

  if (error) {
    console.error('Failed to fetch active users:', error);
    return [];
  }

  return data ?? [];
};

export const getUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('casette_users')
    .select('id, user_name, browser_id, last_seen_at, created_at')
    .order('last_seen_at', {
      ascending: false,
      nullsFirst: false,
    });

  if (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }

  return data ?? [];
};
