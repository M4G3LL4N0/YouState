import { Recommendation } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/icons';

const categoryIcons = {
  nutrition: 'utensils',
  hydration: 'droplet',
  caffeine: 'coffee',
  focus: 'target',
  recovery: 'moon',
  movement: 'activity'
} as const;

export function RecommendationCard({ 
  recommendation,
  compact = false
}: { 
  recommendation: Recommendation;
  compact?: boolean;
}) {
  const Icon = Icons[categoryIcons[recommendation.category as keyof typeof categoryIcons] || 'sparkle'];
  const confidencePercent = Math.round(recommendation.confidence * 100);

  if (compact) {
    return (
      <Card className="hover:border-zinc-600 transition-colors">
        <div className="p-4 flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate">{recommendation.title}</h3>
            <p className="text-xs text-zinc-400 mt-1 truncate">{recommendation.action}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs text-blue-400">{confidencePercent}% match</span>
              {recommendation.idealTime && (
                <span className="text-xs text-zinc-500">• {recommendation.idealTime}</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="hover:border-zinc-600 transition-colors">
      <div className="p-6 flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium">{recommendation.title}</h3>
            <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full">
              {confidencePercent}% match
            </span>
          </div>
          
          <p className="text-sm font-medium text-zinc-100 mt-1">{recommendation.action}</p>
          <p className="text-sm text-zinc-300 mt-2">{recommendation.reasoning}</p>
          
          <div className="mt-3 space-y-2">
            {recommendation.idealTime && (
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Icons.clock className="w-3 h-3" />
                <span>Best time: {recommendation.idealTime}</span>
              </div>
            )}
            
            {recommendation.duration && (
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Icons.timer className="w-3 h-3" />
                <span>Duration: ~{recommendation.duration} minutes</span>
              </div>
            )}
            
            {recommendation.caution && (
              <div className="flex items-start gap-2 text-xs text-red-400">
                <Icons.alert className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{recommendation.caution}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
