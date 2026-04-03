import type { DailyState, Recommendation, UserProfile, Level } from '@/lib/types';

function levelToPriority(level: number): Level {
  if (level >= 0.75) return 'high';
  if (level >= 0.4) return 'medium';
  return 'low';
}

function sortByConfidence(a: Recommendation, b: Recommendation): number {
  return (b.confidence ?? 0) - (a.confidence ?? 0);
}

export function generateRecommendations(
  state: DailyState,
  profile?: UserProfile
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Hydration recommendations
  if (state.hydration === 'low' || state.hydration === 'ok') {
    const urgency = state.hydration === 'low' ? 0.9 : 0.6;
    recommendations.push({
      title: 'Hydration Boost',
      action: 'Drink 300–500ml of water now.',
      category: 'hydrate',
      priority: levelToPriority(urgency),
      confidence: urgency,
    });
  }

  // Nutrition recommendations
  if (state.hunger === 'high' || state.hunger === 'rising') {
    const urgency = state.hunger === 'high' ? 0.85 : 0.55;
    recommendations.push({
      title: 'Fuel Your Next Window',
      action: 'Have a balanced meal with protein and moderate carbs.',
      category: 'eat',
      priority: levelToPriority(urgency),
      confidence: urgency,
    });
  }

  // Caffeine recommendations
  if (state.caffeineLoad === 'low' && state.energy === 'low') {
    const urgency = profile?.caffeine?.sensitivity === 'high' ? 0.6 : 0.7;
    recommendations.push({
      title: 'Use Caffeine Carefully',
      action: 'A moderate caffeine dose may help if you need to focus soon.',
      category: 'caffeine',
      priority: 'medium',
      confidence: urgency,
    });
  }

  // Recovery recommendations
  if (state.sleepDebt === 'high') {
    recommendations.push({
      title: 'Protect Recovery',
      action: 'Reduce unnecessary strain and favor recovery-supportive choices.',
      category: 'recovery',
      priority: 'high',
      confidence: 0.8,
    });
  }

  // Focus recommendations
  if (state.focus === 'high' && state.energy !== 'low') {
    recommendations.push({
      title: 'Use the Focus Window',
      action: 'Stay on your highest-value task for the next 60–90 minutes.',
      category: 'focus',
      priority: 'medium',
      confidence: 0.75,
    });
  }

  // Default recommendation
  if (recommendations.length === 0) {
    recommendations.push({
      title: 'Maintain Momentum',
      action: 'Keep your current pace and check in again later.',
      category: 'movement',
      priority: 'low',
      confidence: 0.5,
    });
  }

  return recommendations.sort(sortByConfidence);
}
