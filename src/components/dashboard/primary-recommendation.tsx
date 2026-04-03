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
    <section className="glass rounded-3xl border border-white/10 p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
            <Activity className="h-5 w-5 text-white/80" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold tracking-tight">{recommendation.title}</h2>
            <p className="mt-1 text-sm text-white/60">{recommendation.category}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg leading-7 text-white/80">
            {recommendation.action}
          </p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>Confidence</span>
              <span>{confidencePercent}%</span>
            </div>
            <Progress value={confidencePercent} className="h-2" />
          </div>
        </div>

        <div className="mt-4">
          <button className="w-full rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90">
            Mark as Complete
          </button>
        </div>
      </div>
    </section>
  );
}
