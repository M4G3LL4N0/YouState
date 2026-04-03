import { DailyState, Level } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StateOverviewProps {
  state: DailyState;
}

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  icon?: React.ReactNode;
}

function getProgressValue(value: string) {
  if (value === 'high') return 100;
  if (value === 'medium' || value === 'rising' || value === 'ok' || value === 'moderate') return 60;
  return 25;
}

function MetricCard({ label, value, description, icon }: MetricCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-white/50">{label}</p>
          <p className="mt-2 text-2xl font-semibold capitalize text-white">{value}</p>
        </div>
        {icon && <div className="text-white/50">{icon}</div>}
      </div>

      <div className="mt-4">
        <Progress value={getProgressValue(value)} />
      </div>

      <p className="mt-3 text-xs text-white/45">{description}</p>
    </Card>
  );
}

export function StateOverview({ state }: StateOverviewProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Energy"
        value={state.energy}
        description="Your current energy level"
      />
      <MetricCard
        label="Focus"
        value={state.focus}
        description="Your current cognitive sharpness"
      />
      <MetricCard
        label="Hunger"
        value={state.hunger}
        description="Your current hunger state"
      />
      <MetricCard
        label="Hydration"
        value={state.hydration}
        description="Your hydration status"
      />
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
