'use server';

import { createSupabaseServerClient, hasSupabaseEnv } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import type { GoalType, Level, LifestyleType } from '@/lib/types';

export type OnboardingFormData = {
  lifestyleType: LifestyleType;
  primaryGoal: GoalType;
  sleepSchedule: string;
  caffeineHabits: 'none' | 'low' | 'moderate' | 'high';
  caffeineSensitivity: Level;
  mealPattern: string;
  activityLevel: Level;
  stressLevel: Level;
  name: string;
};

export async function completeOnboarding(formData: OnboardingFormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath('/app');
    redirect('/app?onboarding=demo');
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    revalidatePath('/app');
    redirect('/app?onboarding=local');
  }

  const { error } = await supabase
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

export const saveOnboarding = completeOnboarding;
