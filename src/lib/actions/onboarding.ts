'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export interface OnboardingFormData {
  lifestyleType: string;
  primaryGoal: string;
  sleepSchedule: string;
  caffeineHabits: string;
  caffeineSensitivity: string;
  mealPattern: string;
  activityLevel: string;
  stressLevel: string;
  name: string;
}

export async function saveOnboarding(formData: OnboardingFormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Not authenticated');
  }

  // The Supabase client returned by createClient is typed as `SupabaseClient<Database>`.
  // For the purpose of this action we only need the `schema` method, so we cast to `any`.
  const db = supabase as any;

  const { error } = await db
    .schema('pulse')
    .from('profiles')
    .upsert({
      user_id: user.id,
      lifestyle: formData.lifestyleType,
      goals: [formData.primaryGoal],
      sleep_schedule: formData.sleepSchedule,
      caffeine_habits: formData.caffeineHabits,
      caffeine_sensitivity: formData.caffeineSensitivity,
      meal_pattern: formData.mealPattern,
      activity_level: formData.activityLevel,
      stress_level: formData.stressLevel,
      name: formData.name,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/app');
  redirect('/app');
}

export const completeOnboarding = saveOnboarding;
