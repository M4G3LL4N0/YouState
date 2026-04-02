export type MetricLevel = 'low' | 'medium' | 'high';
export type HungerLevel = 'low' | 'rising' | 'high';
export type HydrationLevel = 'low' | 'ok' | 'good';

export type DailyState = {
  energy: MetricLevel;
  focus: MetricLevel;
  hunger: HungerLevel;
  crashRisk: MetricLevel;
  hydration: HydrationLevel;
  sleepDebt: MetricLevel;
  caffeineLoad: MetricLevel;
  physicalDemand: MetricLevel;
  cognitiveDemand: MetricLevel;
  stressLoad: MetricLevel;
  lastUpdated: Date;
};

export type RecommendationType = 
  | 'eat' 
  | 'hydrate' 
  | 'caffeine' 
  | 'focus' 
  | 'recovery' 
  | 'movement';

export type Recommendation = {
  type: RecommendationType;
  priority: number;
  message: string;
  duration?: number;
  details?: string;
};

export type PrimaryGoal = 'energy' | 'focus' | 'recovery' | 'performance' | 'balance';
export type LifestyleType = 'office' | 'remote' | 'shift' | 'freelance' | 'other';
export type SleepSchedule = 'early' | 'late' | 'irregular' | 'shift';
export type CaffeineHabits = 'none' | 'light' | 'moderate' | 'heavy';
export type MealRegularity = 'strict' | 'flexible' | 'irregular';
export type StressLevel = 'low' | 'medium' | 'high';

export type UserProfile = {
  primaryGoal: PrimaryGoal;
  lifestyleType: LifestyleType;
  sleepSchedule: SleepSchedule;
  caffeineHabits: CaffeineHabits;
  mealRegularity: MealRegularity;
  physicalActivity: MetricLevel;
  stressLevel: StressLevel;
  age?: number;
  weight?: number;
  height?: number;
  sleepNeed?: number;
  caffeineSensitivity?: 'low' | 'medium' | 'high';
  goals?: string[];
};

export type Settings = {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    dataSharing: boolean;
    analytics: boolean;
  };
  integrations: {
    appleHealth: boolean;
    googleFit: boolean;
    wearables: boolean;
  };
};
