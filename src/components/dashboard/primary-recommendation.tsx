import type { Recommendation } from '@/lib/types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PrimaryRecommendationProps {
  recommendation: Recommendation;
}

export function PrimaryRecommendation({ recommendation }: PrimaryRecommendationProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white p-6 text-black shadow-2xl shadow-black/30">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
          <Sparkles className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/45">
                What To Do Next
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                {recommendation.title}
              </h2>
            </div>

            <span className="w-fit rounded-full border border-black/10 px-3 py-1 text-xs uppercase text-black/55">
              {recommendation.priority} priority
            </span>
          </div>

          <p className="mt-4 max-w-2xl text-base leading-7 text-black/70">
            {recommendation.message}
          </p>

          <p className="mt-4 flex items-start gap-2 text-lg font-medium leading-8">
            <ArrowRight className="mt-1 h-5 w-5 shrink-0" />
            {recommendation.action}
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs text-black/48">
            <span className="rounded-full bg-black/[0.06] px-3 py-1">
              {recommendation.timeframe}
            </span>
            <span className="rounded-full bg-black/[0.06] px-3 py-1">
              {Math.round(recommendation.confidence * 100)}% confidence
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
