import type { DailyState, UserProfile } from '@/lib/types';
import { StateIndicator } from '@/components/dashboard/state-indicator';

interface DashboardHeaderProps {
  state: DailyState;
  profile?: UserProfile;
}

export function DashboardHeader({ state, profile }: DashboardHeaderProps) {
  const displayName =
    profile?.name ||
    profile?.fullName ||
    profile?.email ||
    'Welcome';

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-white/35">Your State</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{displayName}</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-white/58">
          Live demo state with adaptive recommendations. Supabase can be connected without blocking the mock experience.
        </p>
      </div>

      <StateIndicator state={state} />
    </div>
  );
}
