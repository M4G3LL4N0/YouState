export type LifestyleType =
  | 'knowledge-worker'
  | 'shift-worker'
  | 'physical-labor'
  | 'student'
  | 'busy-parent'
  | 'general';

export type GoalType =
  | 'more-energy'
  | 'better-focus'
  | 'weight-control'
  | 'better-recovery'
  | 'performance'
  | 'focus'
  | 'energy';

export type Level = 'low' | 'medium' | 'high';

export type DailyState = {
  energy: Level;
  focus: Level;
  hunger: 'low' | 'rising' | 'high';
  crashRisk: Level;
  hydration: 'low' | 'ok' | 'good';
  sleepDebt: Level;
  caffeineLoad: 'low' | 'moderate' | 'high';
  physicalDemand?: Level;
  cognitiveDemand?: Level;
  stressLoad?: Level;
  lastUpdated?: Date;
};

export type RecommendationCategory =
  | 'eat'
  | 'hydrate'
  | 'caffeine'
  | 'focus'
  | 'recovery'
  | 'movement';

export type Recommendation = {
  category: RecommendationCategory;
  title: string;
  action: string;
  priority?: Level;
  confidence?: number;
};

export type UserProfile = {
  id: string;
  name?: string;
  fullName?: string;
  email?: string;
  age?: number;
  weight?: number;
  height?: number;
  lifestyle: LifestyleType;
  primaryGoal?: GoalType;
  goals?: GoalType[];

  caffeine?: {
    habits?: 'none' | 'low' | 'moderate' | 'high';
    timing?: string;
    sensitivity?: Level;
    lastDose?: Date;
  };

  sleep?: {
    schedule?: string;
    averageHours?: number;
    quality?: Level;
    need?: number;
    debt?: number;
  };

  work?: {
    type?: string;
    hours?: string;
    environment?: string;
  };

  activityLevel?: Level;
  stressLevel?: Level;
  mealPattern?: string;

  createdAt?: Date;
  updatedAt?: Date;
};

export type DailyLogEntry = {
  id?: string;
  timestamp: string | Date;
  type: 'event' | 'action' | 'state';
  description?: string;
  details?: Record<string, unknown>;
};
