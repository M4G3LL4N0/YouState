import { AppShell } from '@/components/app-shell';
import { mockDailyStates, mockTimeline } from '@/lib/mock-data';
import { generateRecommendations } from '@/lib/recommendation-engine';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const currentState = mockDailyStates.morningPeak;

async function getProfile() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: profile } = await supabase
    .from('pulse.profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return profile;
}

const profile = await getProfile();
const recommendations = profile ? generateRecommendations(currentState, profile) : [];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Your State</h1>
          <p className="text-zinc-400">
            Last updated: {currentState.lastUpdated.toLocaleTimeString()}
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
            <h2 className="text-xl font-semibold mb-4">Vitals</h2>
            <div className="space-y-4">
              <MetricCard label="Energy" value={currentState.energy} />
              <MetricCard label="Focus" value={currentState.focus} />
              <MetricCard label="Crash Risk" value={currentState.crashRisk} />
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
            <h2 className="text-xl font-semibold mb-4">Needs</h2>
            <div className="space-y-4">
              <MetricCard label="Hydration" value={currentState.hydration} />
              <MetricCard label="Hunger" value={currentState.hunger} />
              <MetricCard label="Sleep Debt" value={currentState.sleepDebt} />
            </div>
          </div>
        </section>

        <section className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">What To Do Next</h2>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <RecommendationCard
                key={rec.message}
                type={rec.category}
                message={rec.message}
                priority={rec.priority}
                reasoning={rec.reasoning}
                caution={rec.caution}
              />
            ))}
          </div>
        </section>
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
