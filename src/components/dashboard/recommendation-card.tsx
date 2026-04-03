import { Recommendation } from '@/lib/types';
import { Activity } from '@/components/icons';

interface RecommendationCardProps {
  recommendation: Recommendation;
  compact?: boolean;
}

export function RecommendationCard({
  recommendation,
  compact = false,
}: RecommendationCardProps) {
  const confidencePercent = Math.round((recommendation.confidence ?? 0) * 100);

  if (compact) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3">
          <Activity className="h-4 w-4 text-white/70" />
          <span className="text-sm text-white/90">{recommendation.title}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-start gap-4">
        <Activity className="mt-1 h-5 w-5 text-white/70" />

        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold">{recommendation.title}</h3>

            {recommendation.priority && (
              <span className="rounded-full border border-white/10 px-2 py-1 text-xs uppercase text-white/60">
                {recommendation.priority}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-white/80">{recommendation.action}</p>

          <div className="mt-4 text-xs text-white/50">
            Confidence: {confidencePercent}%
          </div>
        </div>
      </div>
    </div>
  );
}
