import type { ComponentType } from 'react';
import type { Recommendation, RecommendationCategory } from '@/lib/types';
import { Activity, Brain, Coffee, Droplets, Moon, Utensils, Waves } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: Recommendation;
  compact?: boolean;
}

export function RecommendationCard({
  recommendation,
  compact = false,
}: RecommendationCardProps) {
  const confidencePercent = Math.round((recommendation.confidence ?? 0) * 100);
  const Icon = categoryIcons[recommendation.category] ?? Activity;

  if (compact) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
        <div className="flex items-start gap-3">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
          <div>
            <p className="text-sm font-medium text-white/90">{recommendation.title}</p>
            <p className="mt-2 text-xs leading-5 text-white/55">{recommendation.action}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
      <div className="flex items-start gap-4">
        <Icon className="mt-1 h-5 w-5 text-white/65" />

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

const categoryIcons: Record<RecommendationCategory, ComponentType<{ className?: string }>> = {
  caffeine: Coffee,
  focus: Brain,
  fuel: Utensils,
  hydrate: Droplets,
  movement: Activity,
  recovery: Moon,
  stress: Waves,
};
