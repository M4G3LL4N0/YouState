import { Recommendation } from '@/lib/types';

interface PrimaryRecommendationProps {
  recommendation: Recommendation;
}

export function PrimaryRecommendation({
  recommendation,
}: PrimaryRecommendationProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{recommendation.title}</h2>
            <span className="rounded bg-white/10 px-2 py-1 text-xs uppercase text-white/80">
              {recommendation.category}
            </span>
          </div>

          <p className="mt-3 text-sm leading-7 text-white/80">
            {recommendation.action}
          </p>
        </div>

        {'priority' in recommendation && recommendation.priority ? (
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase text-white/60">
            {recommendation.priority}
          </span>
        ) : null}
      </div>
    </section>
  );
}
