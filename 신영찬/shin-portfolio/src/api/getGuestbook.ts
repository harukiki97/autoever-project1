import { supabase } from './supabase';
import { type Tables } from '../types/supabase';

// 전체 리스트
export const getGuestbookEntries = async (): Promise<Tables<'guestbook'>[]> => {
  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// 특정 방명록
export const getGuestbookEntry = async (id: number): Promise<Tables<'guestbook'>> => {
  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// 공개 방명록만
export const getVisibleGuestbookEntries = async (): Promise<Tables<'guestbook'>[]> => {
  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .eq('is_hidden', false)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};