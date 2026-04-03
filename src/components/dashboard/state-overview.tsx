import { DailyState } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StateOverviewProps {
  state: DailyState;
}

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function MetricCard({ label, value, description, icon }: MetricCardProps) {
  const progressValue =
    value === 'high' ? 100 : value === 'medium' || value === 'rising' || value === 'ok' ? 60 : 25;
  const toneClass = 
    value === 'high' ? 'text-emerald-300' :
    value === 'medium' || value === 'rising' || value === 'ok' ? 'text-amber-300' :
    'text-rose-300';

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-white/70">{label}</p>
            <span className={`text-sm font-semibold capitalize ${toneClass}`}>
              {value}
            </span>
          </div>
          <div className="mt-4">
            <Progress value={progressValue} />
          </div>
          <p className="mt-3 text-xs text-white/50">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function StateOverview({ state }: StateOverviewProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Energy" value={state.energy} description="Your current energy level" />
      <MetricCard label="Focus" value={state.focus} description="Your current cognitive sharpness" />
      <MetricCard label="Hunger" value={state.hunger} description="Your current hunger state" />
      <MetricCard label="Hydration" value={state.hydration} description="Your hydration status" />
      <MetricCard
        label="Sleep Debt"
        value={state.sleepDebt}
        description="How much recovery debt you're carrying"
      />
      <MetricCard
        label="Caffeine Load"
        value={state.caffeineLoad}
        description="How much caffeine is still in play"
      />
      <MetricCard
        label="Stress"
        value={state.stressLoad ?? 'medium'}
        description="Your stress level"
      />
      <MetricCard
        label="Crash Risk"
        value={state.crashRisk}
        description="Likelihood of an energy drop later"
      />
    </section>
  );
}
