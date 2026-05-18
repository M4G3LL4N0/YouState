export type Level = 'low' | 'medium' | 'high';

export type LifestyleType =
  | 'knowledge-worker'
  | 'founder'
  | 'shift-worker'
  | 'physical-labor'
  | 'student'
  | 'busy-parent'
  | 'general';

export type GoalType =
  | 'more-energy'
  | 'better-focus'
  | 'stable-mood'
  | 'better-recovery'
  | 'performance'
  | 'less-crashing'
  | 'nutrition-timing';

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
  | 'fuel'
  | 'hydrate'
  | 'caffeine'
  | 'focus'
  | 'recovery'
  | 'movement'
  | 'stress';

export type Recommendation = {
  id: string;
  category: RecommendationCategory;
  title: string;
  message: string;
  action: string;
  why: string;
  reasoning: string[];
  priority: Level;
  confidence: number;
  timeframe: string;
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

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          full_name: string | null;
          email: string | null;
          age: number | null;
          weight: number | null;
          height: number | null;
          lifestyle: LifestyleType;
          primary_goal: GoalType | null;
          goals: GoalType[] | null;
          caffeine_habits: 'none' | 'low' | 'moderate' | 'high' | null;
          caffeine_sensitivity: Level | null;
          sleep_schedule: string | null;
          sleep_quality: Level | null;
          activity_level: Level | null;
          stress_level: Level | null;
          meal_pattern: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
  };
  pulse: {
    Tables: {
      profiles: {
        Row: {
          user_id: string;
          name: string | null;
          lifestyle: LifestyleType;
          goals: GoalType[] | null;
          sleep_schedule: string | null;
          caffeine_habits: 'none' | 'low' | 'moderate' | 'high' | null;
          caffeine_sensitivity: Level | null;
          meal_pattern: string | null;
          activity_level: Level | null;
          stress_level: Level | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
  };
};

export type DailyLogEntry = {
  id?: string;
  timestamp: string | Date;
  type: 'event' | 'action' | 'state' | 'recommendation';
  title?: string;
  description?: string;
  details?: Record<string, unknown>;
};
