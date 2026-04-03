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

export async function submitOnboarding(formData: OnboardingFormData) {
  // ... existing implementation ...
}
