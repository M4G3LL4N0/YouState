import { DailyState, UserProfile } from '@/lib/types';
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
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{displayName}</h1>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-sm text-zinc-400">
            Your real-time state and recommendations
          </p>
        </div>
      </div>

      <StateIndicator state={state} />
    </div>
  );
}
