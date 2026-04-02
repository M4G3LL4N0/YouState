export type Profile = {
  id: string;
  userId: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  lifestyle: string;
  goals: string[];
  caffeineHabits: string;
  caffeineSensitivity: string;
  mealPattern: string;
  activityLevel: string;
  stressLevel: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DailyState = {
  id: string;
  userId: string;
  energy: string;
  focus: string;
  hunger: string;
  crashRisk: string;
  hydration: string;
  sleepDebt: string;
  caffeineLoad: string;
  physicalDemand: string;
  cognitiveDemand: string;
  stressLoad: string;
  recordedAt: Date;
};

export type Recommendation = {
  id: string;
  userId: string;
  category: string;
  priority: number;
  message: string;
  reasoning: string;
  caution?: string;
  duration?: number;
  generatedAt: Date;
};

export type DailyLog = {
  id: string;
  userId: string;
  entryType: string;
  description: string;
  details?: Record<string, unknown>;
  loggedAt: Date;
};

export type UserSettings = {
  id: string;
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  appleHealthEnabled: boolean;
  googleFitEnabled: boolean;
  wearablesEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};
