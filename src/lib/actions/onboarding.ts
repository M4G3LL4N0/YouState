'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function completeOnboarding(formData: Record<string, string>) {
  const supabase = createSupabaseServerClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error('Not authenticated');
  }

  const { error } = await supabase
    .from('pulse.profiles')
    .upsert({
      user_id: user.id,
      lifestyle: formData.lifestyleType,
      goals: [formData.primaryGoal],
      sleep_schedule: formData.sleepSchedule,
      // Defaults for other fields
      caffeine_habits: 'moderate',
      caffeine_sensitivity: 'medium',
      meal_pattern: 'flexible',
      activity_level: 'medium',
      stress_level: 'medium',
      name: user.email?.split('@')[0] || 'User',
    });

  if (error) {
    throw new Error('Failed to save profile');
  }

  revalidatePath('/app');
  redirect('/app');
}

export async function checkOnboardingComplete() {
  const supabase = createSupabaseServerClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return false;
  }

  const { data: profile, error } = await supabase
    .from('pulse.profiles')
    .select('id')
    .eq('user_id', user.id)
    .single();

  return !!profile && !error;
}
