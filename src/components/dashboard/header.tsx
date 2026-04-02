import { DailyState, UserProfile } from '@/lib/types';
import { StateIndicator } from './state-indicator';

export function DashboardHeader({
  state,
  profile
}: {
  state: DailyState;
  profile?: UserProfile | null;
}) {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {profile?.name || 'Welcome'}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-zinc-400">
            Current Status
          </p>
          <StateIndicator state={state} />
        </div>
      </div>

      <div className="text-zinc-400 text-sm">
        Last updated: {state.lastUpdated.toLocaleTimeString()}
      </div>
    </header>
  );
}
