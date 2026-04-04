import { DailyState, UserProfile } from '@/lib/types';

interface DashboardHeaderProps {
  state: DailyState;
  profile?: UserProfile;
}

export function DashboardHeader({ state, profile }: DashboardHeaderProps) {
  const displayName =
    (profile as UserProfile & {
      name?: string;
      fullName?: string;
      full_name?: string;
      email?: string;
    })?.name ||
    (profile as UserProfile & {
      fullName?: string;
      full_name?: string;
      email?: string;
    })?.fullName ||
    (profile as UserProfile & {
      full_name?: string;
      email?: string;
    })?.full_name ||
    (profile as UserProfile & {
      email?: string;
    })?.email ||
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
