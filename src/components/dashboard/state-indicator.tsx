import { DailyState } from '@/lib/types';

interface StateIndicatorProps {
  state: DailyState;
}

function toneClass(value: 'low' | 'medium' | 'high') {
  if (value === 'high') return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20';
  if (value === 'medium') return 'bg-amber-500/15 text-amber-300 border-amber-500/20';
  return 'bg-rose-500/15 text-rose-300 border-rose-500/20';
}

export function StateIndicator({ state }: StateIndicatorProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${toneClass(
          state.energy
        )}`}
      >
        Energy: {state.energy}
      </span>

      <span
        className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${toneClass(
          state.focus
        )}`}
      >
        Focus: {state.focus}
      </span>

      <span
        className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${toneClass(
          state.crashRisk
        )}`}
      >
        Crash risk: {state.crashRisk}
      </span>
    </div>
  );
}
