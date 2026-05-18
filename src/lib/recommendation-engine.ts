import type { DailyState, Recommendation, UserProfile, Level } from '@/lib/types';

function levelToPriority(level: number): Level {
  if (level >= 0.8) return 'high';
  if (level >= 0.5) return 'medium';
  return 'low';
}

function sortByConfidence(a: Recommendation, b: Recommendation): number {
  // Sort by confidence, then by priority
  const confidenceDiff = (b.confidence ?? 0) - (a.confidence ?? 0);
  if (confidenceDiff !== 0) return confidenceDiff;
  
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return priorityOrder[b.priority ?? 'low'] - priorityOrder[a.priority ?? 'low'];
}

function buildRecommendation(recommendation: Recommendation): Recommendation {
  return recommendation;
}

export function generateRecommendations(
  state: DailyState,
  profile?: UserProfile
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const now = new Date();
  const hour = now.getHours();

  // Hydration recommendations
  if (state.hydration === 'low' || state.hydration === 'ok') {
    const urgency = state.hydration === 'low' ? 0.9 : 0.6;
    recommendations.push(buildRecommendation({
      id: 'hydrate-now',
      title: 'Hydration Boost',
      message: 'Stabilize the system before you ask it for more output.',
      action: 'Drink 300-500ml of water now.',
      why: 'Low or merely okay hydration raises crash risk and makes caffeine feel less predictable.',
      reasoning: [
        `Hydration is currently ${state.hydration}.`,
        `Crash risk is ${state.crashRisk}.`,
        'Water is the lowest-friction move with the fastest downside protection.',
      ],
      category: 'hydrate',
      priority: levelToPriority(urgency),
      confidence: urgency,
      timeframe: 'Next 10 minutes',
    }));
  }

  // Nutrition recommendations
  if (state.hunger === 'high' || state.hunger === 'rising') {
    const urgency = state.hunger === 'high' ? 0.85 : 0.55;
    recommendations.push(buildRecommendation({
      id: 'fuel-next-window',
      title: 'Fuel Your Next Window',
      message: 'Eat before hunger starts making decisions for you.',
      action: 'Have a balanced meal with protein and moderate carbs.',
      why: 'Your hunger signal is already moving, and steady fuel is more useful than willpower for sustained focus.',
      reasoning: [
        `Hunger is ${state.hunger}.`,
        `Energy is ${state.energy}.`,
        'Protein plus moderate carbs supports a longer focus window without a sharp rebound.',
      ],
      category: 'fuel',
      priority: levelToPriority(urgency),
      confidence: urgency,
      timeframe: state.hunger === 'high' ? 'Next 20 minutes' : 'Within 60 minutes',
    }));
  }

  // Caffeine recommendations
  if (state.caffeineLoad === 'low' && state.energy === 'low' && hour < 15) {
    const urgency = profile?.caffeine?.sensitivity === 'high' ? 0.6 : 0.7;
    recommendations.push(buildRecommendation({
      id: 'careful-caffeine',
      title: 'Use Caffeine Carefully',
      message: 'Use stimulation as a tool, not as a rescue plan.',
      action: 'Take a small to moderate caffeine dose only if focus matters in the next hour.',
      why: 'Your current caffeine load is low, but sleep debt and sensitivity determine whether caffeine helps or steals from later.',
      reasoning: [
        `Caffeine load is ${state.caffeineLoad}.`,
        `Energy is ${state.energy}.`,
        `Reported sensitivity is ${profile?.caffeine?.sensitivity ?? 'unknown'}.`,
      ],
      category: 'caffeine',
      priority: 'medium',
      confidence: urgency,
      timeframe: 'Only before mid-afternoon',
    }));
  }

  // Recovery recommendations
  if (state.sleepDebt === 'high') {
    recommendations.push(buildRecommendation({
      id: 'protect-recovery',
      title: 'Protect Recovery',
      message: 'Stop borrowing from tomorrow unless the trade is worth it.',
      action: 'Reduce unnecessary strain and favor recovery-supportive choices.',
      why: 'High sleep debt makes crashes, cravings, stress load, and poor caffeine timing more likely.',
      reasoning: [
        `Sleep debt is ${state.sleepDebt}.`,
        `Stress load is ${state.stressLoad ?? 'unknown'}.`,
        'Recovery protection preserves decision quality later in the day.',
      ],
      category: 'recovery',
      priority: 'high',
      confidence: 0.8,
      timeframe: 'For the rest of today',
    }));
  }

  // Focus recommendations
  if (state.focus === 'high' && state.energy !== 'low') {
    recommendations.push(buildRecommendation({
      id: 'use-focus-window',
      title: 'Use the Focus Window',
      message: 'This is a good window for important work. Spend it deliberately.',
      action: 'Stay on your highest-value task for the next 60-90 minutes.',
      why: 'High focus with usable energy is a scarce state. Protecting it beats task switching.',
      reasoning: [
        `Focus is ${state.focus}.`,
        `Energy is ${state.energy}.`,
        `Cognitive demand is ${state.cognitiveDemand ?? 'unknown'}.`,
      ],
      category: 'focus',
      priority: 'medium',
      confidence: 0.75,
      timeframe: 'Next 60-90 minutes',
    }));
  }

  // Default recommendation
  if (recommendations.length === 0) {
    recommendations.push(buildRecommendation({
      id: 'maintain-momentum',
      title: 'Maintain Momentum',
      message: 'Your current state does not need a dramatic intervention.',
      action: 'Keep your current pace and check in again later.',
      why: 'No major state signal is demanding action right now, so consistency is the highest leverage move.',
      reasoning: [
        `Energy is ${state.energy}.`,
        `Focus is ${state.focus}.`,
        `Crash risk is ${state.crashRisk}.`,
      ],
      category: 'movement',
      priority: 'low',
      confidence: 0.5,
      timeframe: 'Check again in 90 minutes',
    }));
  }

  return recommendations.sort(sortByConfidence);
}
