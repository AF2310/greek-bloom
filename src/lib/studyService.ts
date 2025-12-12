import { supabase } from '@/integrations/supabase/client';

export interface StudySession {
  id: string;
  user_id: string;
  activity_type: string;
  activity_name: string;
  group_id: string | null;
  group_name: string | null;
  correct_count: number;
  wrong_count: number;
  started_at: string;
  completed_at: string | null;
}

export interface WordProgress {
  id: string;
  user_id: string;
  word_id: string;
  correct_count: number;
  wrong_count: number;
  last_reviewed_at: string | null;
}

export async function createSession(
  activityType: string,
  activityName: string,
  groupId?: string,
  groupName?: string
): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('study_sessions')
    .insert({
      user_id: user.id,
      activity_type: activityType,
      activity_name: activityName,
      group_id: groupId || null,
      group_name: groupName || null
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating session:', error);
    return null;
  }

  return data.id;
}

export async function completeSession(
  sessionId: string,
  correctCount: number,
  wrongCount: number
): Promise<boolean> {
  const { error } = await supabase
    .from('study_sessions')
    .update({
      correct_count: correctCount,
      wrong_count: wrongCount,
      completed_at: new Date().toISOString()
    })
    .eq('id', sessionId);

  if (error) {
    console.error('Error completing session:', error);
    return false;
  }

  return true;
}

export async function getUserSessions(): Promise<StudySession[]> {
  const { data, error } = await supabase
    .from('study_sessions')
    .select('*')
    .order('started_at', { ascending: false });

  if (error) {
    console.error('Error fetching sessions:', error);
    return [];
  }

  return data || [];
}

export async function updateWordProgress(
  wordId: string,
  isCorrect: boolean
): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // Check if progress exists
  const { data: existing } = await supabase
    .from('word_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('word_id', wordId)
    .maybeSingle();

  if (existing) {
    // Update existing progress
    await supabase
      .from('word_progress')
      .update({
        correct_count: isCorrect ? existing.correct_count + 1 : existing.correct_count,
        wrong_count: isCorrect ? existing.wrong_count : existing.wrong_count + 1,
        last_reviewed_at: new Date().toISOString()
      })
      .eq('id', existing.id);
  } else {
    // Create new progress
    await supabase
      .from('word_progress')
      .insert({
        user_id: user.id,
        word_id: wordId,
        correct_count: isCorrect ? 1 : 0,
        wrong_count: isCorrect ? 0 : 1,
        last_reviewed_at: new Date().toISOString()
      });
  }
}

export async function getUserWordProgress(): Promise<WordProgress[]> {
  const { data, error } = await supabase
    .from('word_progress')
    .select('*');

  if (error) {
    console.error('Error fetching word progress:', error);
    return [];
  }

  return data || [];
}

export async function getUserStats(): Promise<{
  totalSessions: number;
  totalCorrect: number;
  totalWrong: number;
  accuracy: number;
}> {
  const sessions = await getUserSessions();
  
  const totalSessions = sessions.filter(s => s.completed_at).length;
  const totalCorrect = sessions.reduce((sum, s) => sum + s.correct_count, 0);
  const totalWrong = sessions.reduce((sum, s) => sum + s.wrong_count, 0);
  const total = totalCorrect + totalWrong;
  const accuracy = total > 0 ? Math.round((totalCorrect / total) * 100) : 0;

  return { totalSessions, totalCorrect, totalWrong, accuracy };
}
