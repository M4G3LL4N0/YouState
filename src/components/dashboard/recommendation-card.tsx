import { Recommendation } from '@/lib/types';

export function RecommendationCard({ 
  recommendation,
  compact = false
}: { 
  recommendation: Recommendation;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="glass rounded-lg p-4 border border-zinc-700">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-blue-400">
            {recommendation.priority}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate">{recommendation.message}</h3>
            <p className="text-xs text-zinc-400 mt-1 truncate">{recommendation.reasoning}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-lg p-4 border border-zinc-700">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
          <span className="text-sm font-medium text-blue-400">{recommendation.priority}</span>
        </div>
        <div>
          <h3 className="font-medium">{recommendation.message}</h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs text-zinc-400 capitalize">{recommendation.category}</span>
            <span className="text-xs text-zinc-500">•</span>
            <span className="text-xs text-zinc-500">{recommendation.reasoning}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
