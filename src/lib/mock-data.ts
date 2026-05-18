import type { DailyLogEntry, DailyState, UserProfile } from './types';

export const mockProfiles: Record<string, UserProfile> = {
  knowledgeWorker: {
    id: 'kw1',
    name: 'Alex',
    fullName: 'Alex Johnson',
    email: 'alex@example.com',
    age: 32,
    weight: 75,
    height: 180,
    lifestyle: 'knowledge-worker',
    primaryGoal: 'better-focus',
    goals: ['better-focus', 'more-energy'],
    caffeine: {
      habits: 'moderate',
      timing: 'morning',
      sensitivity: 'medium',
      lastDose: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    sleep: {
      schedule: 'regular',
      averageHours: 6.5,
      quality: 'medium',
      need: 7.5,
      debt: 1.2
    },
    work: {
      type: 'desk-job',
      hours: '9-5',
      environment: 'office'
    },
    activityLevel: 'medium',
    stressLevel: 'medium',
    mealPattern: 'flexible',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  shiftWorker: {
    id: 'sw1',
    name: 'Jamie',
    age: 28,
    weight: 68,
    height: 175,
    lifestyle: 'shift-worker',
    goals: ['more-energy', 'better-recovery'],
    caffeine: {
      habits: 'high',
      sensitivity: 'low',
      lastDose: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    sleep: {
      schedule: 'shift',
      need: 8,
      debt: 2.5
    },
    activityLevel: 'high',
    stressLevel: 'high',
    mealPattern: 'irregular',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  student: {
    id: 'st1',
    name: 'Taylor',
    age: 21,
    weight: 62,
    height: 170,
    lifestyle: 'student',
    goals: ['better-recovery', 'better-focus'],
    caffeine: {
      habits: 'low',
      sensitivity: 'high',
      lastDose: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    sleep: {
      schedule: 'irregular',
      need: 8,
      debt: 3.0
    },
    activityLevel: 'medium',
    stressLevel: 'high',
    mealPattern: 'irregular',
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

export const mockDailyStates: Record<string, DailyState> = {
  morningPeak: {
    energy: 'high',
    focus: 'high',
    hunger: 'rising',
    crashRisk: 'low',
    hydration: 'ok',
    sleepDebt: 'medium',
    caffeineLoad: 'low',
    physicalDemand: 'low',
    cognitiveDemand: 'high',
    stressLoad: 'medium',
    lastUpdated: new Date()
  },
  afternoonSlump: {
    energy: 'low',
    focus: 'medium',
    hunger: 'high',
    crashRisk: 'high',
    hydration: 'low',
    sleepDebt: 'medium',
    caffeineLoad: 'moderate',
    physicalDemand: 'medium',
    cognitiveDemand: 'high',
    stressLoad: 'high',
    lastUpdated: new Date()
  }
};

export const mockTimeline: DailyLogEntry[] = [
  {
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    type: 'event',
    title: 'Wake state',
    description: 'Woke up feeling refreshed',
    details: {
      sleepDuration: 6.5
    }
  },
  {
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    type: 'action',
    title: 'Breakfast',
    description: 'Had breakfast - oatmeal with berries',
    details: {
      calories: 350,
      macros: {
        protein: 12,
        carbs: 45,
        fat: 8
      }
    }
  },
  {
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: 'state',
    title: 'Focus window',
    description: 'Started deep work session',
    details: {
      focusLevel: 'high'
    }
  }
];
