import { Recommendation } from '@/lib/types';

interface PrimaryRecommendationProps {
  recommendation: Recommendation;
}

export function PrimaryRecommendation({ recommendation }: PrimaryRecommendationProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white/80">
          !
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                Primary recommendation
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                {recommendation.title}
              </h2>
            </div>

            {recommendation.priority ? (
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase text-white/60">
                {recommendation.priority}
              </span>
            ) : null}
          </div>

          <p className="mt-4 text-sm leading-7 text-white/80">
            {recommendation.action}
          </p>

          {typeof recommendation.confidence === 'number' ? (
            <p className="mt-3 text-xs text-white/45">
              Confidence: {Math.round(recommendation.confidence * 100)}%
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
