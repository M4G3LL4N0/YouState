import { AppShell } from '@/components/app-shell';
import { DailyState } from '@/lib/types';

// Mock data - will be replaced with real data fetching
const currentState: DailyState = {
  energy: 'medium',
  focus: 'high',
  hunger: 'rising',
  crashRisk: 'low',
  hydration: 'ok',
  sleepDebt: 'medium',
  caffeineLoad: 'moderate',
  physicalDemand: 'medium',
  cognitiveDemand: 'high',
  stressLoad: 'low',
  lastUpdated: new Date(),
};

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
            <RecommendationCard 
              type="hydrate"
              message="Drink 300ml water"
              priority={1}
            />
            <RecommendationCard 
              type="eat"
              message="Have a protein-rich snack"
              priority={2}
            />
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

function RecommendationCard({ type, message, priority }: { 
  type: string; 
  message: string; 
  priority: number 
}) {
  return (
    <div className="flex items-center gap-4 p-3 bg-zinc-800/50 rounded-lg">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
        {priority}
      </div>
      <div>
        <p className="font-medium">{message}</p>
        <p className="text-sm text-zinc-400 capitalize">{type}</p>
      </div>
    </div>
  );
}
