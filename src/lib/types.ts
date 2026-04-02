export type MetricLevel = 'low' | 'medium' | 'high';
export type HungerLevel = 'low' | 'rising' | 'high';
export type HydrationLevel = 'low' | 'ok' | 'good';

export interface DailyState {
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
}

export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code: string;
  };
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface UserPreferences {
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
  updatedAt: Date;
}

export type RecommendationType = 
  | 'eat' 
  | 'hydrate' 
  | 'caffeine' 
  | 'focus' 
  | 'recovery' 
  | 'movement';

export type Recommendation = {
  title: string;
  action: string;
  category: RecommendationType;
  priority: number;
  confidence: number;
  reasoning: string;
  caution?: string;
  idealTime?: string;
  duration?: number;
  supportingActions?: string[];
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
