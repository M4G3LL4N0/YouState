import { DailyState, Recommendation, UserProfile, Level, Priority } from './types';

export function generateRecommendations(
  state: DailyState,
  profile: UserProfile
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const priorityMap = {1: 'high', 2: 'medium', 3: 'low'};
  const hydratePriority = priorityMap['hydrate'];
  const caffeinePriority = priorityMap['caffeine'];
  const focusPriority = priorityMap['focus'];
  const recoveryPriority = priorityMap['recovery'];
  const sleepDebtPriority = priorityMap['sleepDebt'];
  const stressLoadPriority = priorityMap['stressLoad'];

  // hydration logic
  if (state.hydration === 'low') {
    const urgency = state.energy === 'low' ? 0.9 : 0.7;
    recommendations.push({
      category: 'hydrate',
      title: 'Hydration Boost',
      action: 'Drink 300-500ml water',
      priority: hydratePriority,
      confidence: urgency,
      reasoning: 'Hydration is critical for cognitive function and energy. Your levels are currently low.',
      caution: 'Avoid drinking more than 1L per hour',
      idealTime: 'Now',
      supportingActions: ['Add electrolytes if sweating']
    });
  }

  // nutrition logic
  if (state.hunger === 'high' || (state.hunger === 'rising' && state.energy === 'low')) {
    const mealType = isMorning ? 'breakfast' : isAfternoon ? 'lunch' : 'dinner';
    const snackType = profile.lifestyle === 'office' ? 'protein-rich snack' : 
                     profile.lifestyle === 'physical' ? 'carb-heavy snack' : 'balanced snack';
    
    recommendations.push({
      category: 'nutrition',
      title: 'Nutrition Refuel',
      action: state.hunger === 'high' ? `Have a ${mealType}` : `Have a ${snackType}`,
      priority: state.hunger === 'high' ? 1 : 2,
      confidence: 0.8,
      reasoning: 'Your body needs fuel. ' + (state.hunger === 'high' ? 'Significant hunger signals indicate meal time.' : 'Rising hunger suggests a snack would help.'),
      duration: state.hunger === 'high' ? 20 : 10,
      supportingActions: [
        'Use noise-cancelling headphones',
        'Close distracting tabs'
      ]
    });
  }

  // caffeine logic
  if (state.energy === 'low' && profile.caffeine.habits !== 'none') {
    const lastDoseHours = profile.caffeine.lastDose ? (now.getTime() - profile.caffeine.lastDose.getTime()) / (1000 * 60 * 60) : Infinity;
    const dose = profile.caffeine.habits === 'heavy' ? 200 : 100;
    recommendations.push({
      category: 'caffeine',
      title: 'Caffeine Optimization',
      action: `Consume ${dose} caffeine`,
      priority: caffeinePriority,
      confidence: 0.7,
      reasoning: `Based on your habits and current energy levels.',
      caution: profile.lifestyle === 'shift' ? 'Consider timing your intake' : undefined,
      idealTime: 'Within 30 minutes'
    });
  }

  // focus logic
  if (state.focus === 'low' && state.cognitiveDemand === 'high') {
    recommendations.push({
      category: 'focus',
      title: 'Deep Work Session',
      action: 'Start focused work block',
      priority: focusPriority,
      confidence: 0.8,
      reasoning: 'Cognitive demand is high. Structured work improves productivity.',
      duration: 25,
      supportingActions: ['Use noise-cancelling headphones', 'Close distracting tabs']
    });
  }

  // recovery logic
  if (state.physicalDemand === 'high' && state.energy === 'low') {
    recommendations.push({
      category: 'recovery',
      title: 'Physical Recovery',
      action: 'Do light stretching or walking',
      priority: recoveryPriority,
      confidence: 0.9,
      reasoning: 'Physical demand is high and energy is low.',
      duration: 15,
      supportingActions: ['Take a 15-minute walk', 'Stretch']
    });
  }

  // sleep debt logic
  if (state.sleepDebt === 'high') {
    recommendations.push({
      category: 'recovery',
      title: 'Sleep Recovery',
      action: 'Go to bed 1 hour earlier tonight',
      priority: sleepDebtPriority,
      confidence: 0.85,
      reasoning: 'Accumulated sleep debt is impairing performance.',
      idealTime: 'Tonight'
    });
  }

  // stress management logic
  if (state.stressLoad === 'high') {
    recommendations.push({
      category: 'stress',
      title: 'Stress Relief',
      action: '5-minute breathing exercise',
      priority: stressLoadPriority,
      confidence: 0.75,
      reasoning: 'High stress levels detected.',
      duration: 5,
      supportingActions: ['5-minute mindfulness session']
    });
  }

  return recommendations;
}
