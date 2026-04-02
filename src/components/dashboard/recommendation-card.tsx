import { Recommendation } from '@/lib/types';
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

  if (compact) {
    return (
      <div className="glass rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate">{recommendation.message}</h3>
            <p className="text-xs text-zinc-400 mt-1 truncate">{recommendation.reasoning}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition-colors">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium">{recommendation.message}</h3>
          <p className="text-sm text-zinc-300 mt-1">{recommendation.reasoning}</p>
          
          {recommendation.caution && (
            <div className="mt-2 text-xs bg-red-500/10 text-red-400 rounded px-2 py-1 inline-flex items-center gap-1">
              <Icons.alert className="w-3 h-3" />
              {recommendation.caution}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
