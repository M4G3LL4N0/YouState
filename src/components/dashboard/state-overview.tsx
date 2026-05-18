import type { DailyState } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BatteryMedium, Brain, Coffee, Droplets, Gauge, Moon, Utensils, Waves } from 'lucide-react';

interface StateOverviewProps {
  state: DailyState;
}

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
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
        <div className="text-white/50">{icon}</div>
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
        icon={<BatteryMedium className="h-5 w-5" />}
      />
      <MetricCard
        label="Focus"
        value={state.focus}
        description="Your current cognitive sharpness"
        icon={<Brain className="h-5 w-5" />}
      />
      <MetricCard
        label="Hunger"
        value={state.hunger}
        description="Your current hunger state"
        icon={<Utensils className="h-5 w-5" />}
      />
      <MetricCard
        label="Hydration"
        value={state.hydration}
        description="Your hydration status"
        icon={<Droplets className="h-5 w-5" />}
      />
      <MetricCard
        label="Sleep Debt"
        value={state.sleepDebt}
        description="How much recovery debt you're carrying"
        icon={<Moon className="h-5 w-5" />}
      />
      <MetricCard
        label="Caffeine Load"
        value={state.caffeineLoad}
        description="How much caffeine is still in play"
        icon={<Coffee className="h-5 w-5" />}
      />
      <MetricCard
        label="Stress"
        value={state.stressLoad ?? 'medium'}
        description="Your stress level"
        icon={<Waves className="h-5 w-5" />}
      />
      <MetricCard
        label="Crash Risk"
        value={state.crashRisk}
        description="Likelihood of an energy drop later"
        icon={<Gauge className="h-5 w-5" />}
      />
    </section>
  );
}
