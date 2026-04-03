import { Recommendation } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

interface PrimaryRecommendationProps {
  recommendation: Recommendation;
}

export function PrimaryRecommendation({
  recommendation,
}: PrimaryRecommendationProps) {
  const confidencePercent = Math.round((recommendation.confidence ?? 0) * 100);

  return (
    <section className="glass rounded-2xl border border-white/10 p-6">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">{recommendation.title}</h2>
            <span className="rounded-full border border-white/10 px-2 py-1 text-xs uppercase text-white/60">
              {recommendation.category}
            </span>
          </div>

          <p className="mt-3 text-sm leading-7 text-white/80">
            {recommendation.action}
          </p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>Confidence</span>
              <span>{confidencePercent}%</span>
            </div>
            <Progress value={confidencePercent} className="h-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
