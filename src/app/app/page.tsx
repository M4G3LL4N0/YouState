import { AppShell } from '@/components/app-shell';
import { generateRecommendations } from '@/lib/recommendation-engine';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { DashboardHeader } from '@/components/dashboard/header';
import { StateOverview } from '@/components/dashboard/state-overview';
import { PrimaryRecommendation } from '@/components/dashboard/primary-recommendation';
import { RecommendationCard } from '@/components/dashboard/recommendation-card';
import { QuickCheckIn } from '@/components/dashboard/quick-checkin';
import { RecentCheckIns } from '@/components/dashboard/recent-checkins';

async function getLatestData() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { profile: null, state: null, logs: null };

  const { data: profile } = await supabase
    .from('pulse.profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const { data: state } = await supabase
    .from('pulse.daily_states')
    .select('*')
    .eq('user_id', user.id)
    .order('recorded_at', { ascending: false })
    .limit(1)
    .single();

  const { data: logs } = await supabase
    .from('pulse.daily_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('logged_at', { ascending: false })
    .limit(5);

  return { profile, state, logs };
}

const { profile, state, logs } = await getLatestData();
const recommendations = profile && state 
  ? generateRecommendations(state, profile) 
  : [];

export default function DashboardPage() {
  const primaryRecommendation = recommendations[0];
  const secondaryRecommendations = recommendations.slice(1, 3);

  return (
    <AppShell>
      {/* Header with status */}
      <DashboardHeader state={currentState} profile={profile} />

      {/* Current state overview */}
      <StateOverview state={currentState} />

      {/* Main recommendation area */}
      {primaryRecommendation ? (
        <>
          <PrimaryRecommendation recommendation={primaryRecommendation} />
          <div className="space-y-4">
            {secondaryRecommendations.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </>
      ) : null}

      {/* Daily Timeline */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Daily Timeline</h2>
        <RecentCheckIns logs={logs} />
      </div>
    </AppShell>
  );
}
