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
      <div className="space-y-6">
        {/* Header with status */}
        <DashboardHeader state={currentState} profile={profile} />

        {/* Current state overview */}
        <StateOverview state={currentState} />

        {/* Main recommendation area */}
        {primaryRecommendation ? (
          <>
            <PrimaryRecommendation recommendation={primaryRecommendation} />
            
            {/* Supporting recommendations */}
            {secondaryRecommendations.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {secondaryRecommendations.map((rec) => (
                  <RecommendationCard
                    key={rec.message}
                    recommendation={rec}
                    compact
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="glass rounded-xl p-6 border border-zinc-800">
            <div className="text-center py-8">
              <p className="text-zinc-400">No recommendations yet</p>
              <p className="text-sm text-zinc-500 mt-2">
                Complete your first check-in to get personalized suggestions
              </p>
            </div>
          </div>
        )}

        {/* Timeline pattern */}
        <TimelineSection logs={mockTimeline} />

        {/* Check-in and history */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickCheckIn />
          <RecentCheckIns />
        </div>
      </div>
    </AppShell>
        {/* Daily Timeline */}
        <section className="glass rounded-xl p-6 border border-zinc-800 mt-8">
          <h2 className="text-xl font-semibold mb-4">Daily Timeline</h2>
          <div className="space-y-3">
            <TimelineEvent 
              time="08:30"
              type="wake"
              description="Woke up feeling refreshed"
            />
            <TimelineEvent 
              time="09:00"
              type="eat"
              description="Had breakfast - oatmeal with berries"
            />
            <TimelineEvent 
              time="10:30"
              type="focus"
              description="Deep work session started"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="glass rounded-xl p-6 border border-zinc-800 mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAction 
              icon="water"
              label="Hydrate"
              onClick={() => console.log('Hydrate')}
            />
            <QuickAction 
              icon="snack"
              label="Log Meal"
              onClick={() => console.log('Log Meal')}
            />
            <QuickAction 
              icon="focus"
              label="Start Focus"
              onClick={() => console.log('Start Focus')}
            />
            <QuickAction 
              icon="rest"
              label="Take Break"
              onClick={() => console.log('Take Break')}
            />
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-zinc-300">{label}</span>
      <span className="font-medium capitalize">{value}</span>
    </div>
  );
}

function RecommendationCard({ 
  type, 
  message, 
  priority,
  reasoning,
  caution 
}: { 
  type: string; 
  message: string; 
  priority: number;
  reasoning?: string;
  caution?: string;
}) {
  return (
    <div className="flex items-center gap-4 p-3 bg-zinc-800/50 rounded-lg">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
        {priority}
      </div>
      <div className="flex-1">
        <p className="font-medium">{message}</p>
        <p className="text-sm text-zinc-400 capitalize">{type}</p>
        {reasoning && (
          <p className="text-xs text-zinc-500 mt-1">{reasoning}</p>
        )}
        {caution && (
          <p className="text-xs text-red-400 mt-1">⚠️ {caution}</p>
        )}
      </div>
    </div>
  );
}
