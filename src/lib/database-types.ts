import type { UserProfile, DailyLogEntry, Recommendation, LifestyleType, GoalType, Level } from './types';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
  pulse: {
    Tables: {
      profiles: {
        row: UserProfile;
        insert: Omit<UserProfile, 'id'>;
        update: Partial<Omit<UserProfile, 'id'>>;
      };
      daily_logs: {
        row: DailyLogEntry;
        insert: Omit<DailyLogEntry, 'id'>;
        update: Partial<Omit<DailyLogEntry, 'id'>>;
      };
      recommendations: {
        row: Recommendation;
        insert: Recommendation;
        update: Partial<Recommendation>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      lifestyle_type: LifestyleType;
      goal_type: GoalType;
      level: Level;
    };
    CompositeTypes: Record<string, never>;
  };
};
