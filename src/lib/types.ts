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

export type UserProfile = {
  age: number;
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
  sleepNeed: number; // hours
  caffeineSensitivity: 'low' | 'medium' | 'high';
  goals: string[];
};
