import { DailyState, Recommendation, UserProfile } from './types';

export function generateRecommendations(
  state: DailyState,
  profile: UserProfile
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Hydration recommendation
  if (state.hydration === 'low') {
    recommendations.push({
      category: 'hydration',
      priority: 1,
      message: 'Drink 300-500ml water',
      reasoning: 'Your hydration levels are low. Maintaining proper hydration improves cognitive function and energy levels.',
      caution: 'Avoid drinking too quickly to prevent water intoxication'
    });
  }

  // Nutrition recommendation
  if (state.hunger === 'high' || state.hunger === 'rising') {
    recommendations.push({
      category: 'nutrition',
      priority: 2,
      message: 'Have a balanced snack',
      reasoning: 'Your hunger levels indicate it\'s time to refuel. Choose a snack with protein and complex carbs for sustained energy.',
      caution: profile.mealPattern === 'strict' ? 'Stick to your meal schedule' : undefined
    });
  }

  // Caffeine recommendation
  if (state.energy === 'low' && 
      state.caffeineLoad === 'low' && 
      profile.caffeine.habits !== 'none') {
    const hoursSinceLastDose = profile.caffeine.lastDose
      ? (Date.now() - profile.caffeine.lastDose.getTime()) / (1000 * 60 * 60)
      : Infinity;

    if (hoursSinceLastDose > 3) {
      recommendations.push({
        category: 'caffeine',
        priority: 3,
        message: 'Consider a small caffeine dose',
        reasoning: 'Your energy is low and it\'s been sufficient time since your last dose. A moderate amount can boost focus.',
        caution: 'Avoid caffeine close to bedtime'
      });
    }
  }

  // Focus recommendation
  if (state.focus === 'low' && state.cognitiveDemand === 'high') {
    recommendations.push({
      category: 'focus',
      priority: 2,
      message: 'Try a focused work session',
      reasoning: 'Your cognitive demand is high but focus is low. Structured work sessions can improve productivity.',
      duration: 25
    });
  }

  // Recovery recommendation
  if (state.stressLoad === 'high' || state.sleepDebt === 'high') {
    recommendations.push({
      category: 'recovery',
      priority: 1,
      message: 'Take a short recovery break',
      reasoning: 'High stress and sleep debt indicate need for recovery. Short breaks can improve overall performance.',
      caution: 'Avoid screens during recovery breaks'
    });
  }

  // Sort by priority
  return recommendations.sort((a, b) => a.priority - b.priority);
}
