import { DailyState, Recommendation, UserProfile } from './types';

export function generateRecommendations(
  state: DailyState,
  profile: UserProfile
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const now = new Date();
  const currentHour = now.getHours();
  const isMorning = currentHour >= 5 && currentHour < 12;
  const isAfternoon = currentHour >= 12 && currentHour < 17;
  const isEvening = currentHour >= 17 || currentHour < 5;

  // Hydration logic
  if (state.hydration === 'low') {
    const urgency = state.energy === 'low' ? 0.9 : 0.7;
    recommendations.push({
      title: 'Hydration Boost',
      action: 'Drink 300-500ml water',
      category: 'hydration',
      priority: 1,
      confidence: urgency,
      reasoning: 'Hydration is critical for cognitive function and energy. Your levels are currently low.',
      caution: 'Avoid drinking more than 1L per hour',
      idealTime: 'Now',
      supportingActions: [
        'Add electrolytes if sweating',
        'Set reminder for next drink'
      ]
    });
  }

  // Nutrition logic
  if (state.hunger === 'high' || (state.hunger === 'rising' && state.energy === 'low')) {
    const mealType = isMorning ? 'breakfast' : isAfternoon ? 'lunch' : 'dinner';
    const snackType = profile.lifestyle === 'office' ? 'protein-rich snack' : 
                     profile.lifestyle === 'physical' ? 'carb-heavy snack' : 'balanced snack';
    
    recommendations.push({
      title: 'Nutrition Refuel',
      action: state.hunger === 'high' ? `Have a ${mealType}` : `Have a ${snackType}`,
      category: 'nutrition',
      priority: state.hunger === 'high' ? 1 : 2,
      confidence: 0.8,
      reasoning: 'Your body needs fuel. ' + 
        (state.hunger === 'high' 
          ? 'Significant hunger signals indicate meal time.' 
          : 'Rising hunger suggests a snack would help maintain energy.'),
      idealTime: isMorning ? 'Within 30 minutes' : 'Now',
      duration: state.hunger === 'high' ? 20 : 10
    });
  }

  // Caffeine logic
  if (state.energy === 'low' && profile.caffeine.habits !== 'none') {
    const lastDoseHours = profile.caffeine.lastDose 
      ? (now.getTime() - profile.caffeine.lastDose.getTime()) / (1000 * 60 * 60)
      : Infinity;

    if (lastDoseHours > 3 && !isEvening) {
      const dose = profile.caffeine.habits === 'heavy' ? '200mg' :
                   profile.caffeine.habits === 'moderate' ? '100mg' : '50mg';
      
      recommendations.push({
        title: 'Caffeine Optimization',
        action: `Consume ${dose} caffeine`,
        category: 'caffeine',
        priority: state.cognitiveDemand === 'high' ? 2 : 3,
        confidence: 0.7,
        reasoning: `Based on your ${profile.caffeine.habits} caffeine habits and current energy levels.`,
        caution: isAfternoon ? 'May affect sleep if taken too late' : undefined,
        idealTime: isMorning ? 'Before 10am' : 'Before 2pm'
      });
    }
  }

  // Focus logic for knowledge workers
  if (profile.lifestyle === 'office' || profile.lifestyle === 'remote') {
    if (state.focus === 'low' && state.cognitiveDemand === 'high') {
      recommendations.push({
        title: 'Deep Work Session',
        action: 'Start focused work block',
        category: 'focus',
        priority: 2,
        confidence: 0.8,
        reasoning: 'Cognitive demand is high but focus is low. Structured work improves productivity.',
        duration: 25,
        idealTime: isMorning ? 'Next 2 hours' : 'Now',
        supportingActions: [
          'Use noise-cancelling headphones',
          'Close distracting tabs'
        ]
      });
    }
  }

  // Physical recovery for active lifestyles
  if (profile.lifestyle === 'physical' || profile.lifestyle === 'shift') {
    if (state.physicalDemand === 'high' && state.energy === 'low') {
      recommendations.push({
        title: 'Active Recovery',
        action: 'Do light stretching or walking',
        category: 'recovery',
        priority: 1,
        confidence: 0.9,
        reasoning: 'Physical demand has been high. Active recovery prevents injury and fatigue.',
        duration: 15,
        idealTime: 'Within 1 hour'
      });
    }
  }

  // Sleep debt recovery
  if (state.sleepDebt === 'high') {
    const napRec = profile.lifestyle === 'shift' 
      ? 'Consider a 20-minute power nap'
      : 'Go to bed 1 hour earlier tonight';

    recommendations.push({
      title: 'Sleep Recovery',
      action: napRec,
      category: 'recovery',
      priority: 1,
      confidence: 0.85,
      reasoning: 'Accumulated sleep debt is impairing performance and health.',
      caution: profile.lifestyle === 'shift' ? 'Limit naps to 20-30 minutes' : undefined,
      idealTime: isAfternoon ? 'Next 3 hours' : 'Tonight'
    });
  }

  // Stress management
  if (state.stressLoad === 'high') {
    const technique = profile.lifestyle === 'parent' ? '5-minute breathing exercise' :
                     profile.lifestyle === 'student' ? '10-minute walk outside' :
                     '3-minute mindfulness practice';

    recommendations.push({
      title: 'Stress Relief',
      action: technique,
      category: 'recovery',
      priority: state.stressLoad === 'high' ? 1 : 2,
      confidence: 0.75,
      reasoning: 'High stress levels detected. Short breaks improve resilience and focus.',
      duration: technique.includes('minute') ? parseInt(technique) : 5,
      idealTime: 'Within 30 minutes'
    });
  }

  // Final prioritization
  return recommendations
    .sort((a, b) => {
      // Higher priority first
      if (a.priority !== b.priority) return a.priority - b.priority;
      // Then higher confidence
      return b.confidence - a.confidence;
    })
    .map(rec => ({
      ...rec,
      // Format confidence as percentage
      confidence: parseFloat(rec.confidence.toFixed(2))
    }));
}
