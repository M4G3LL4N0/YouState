import { DailyState } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StateOverviewProps {
  state: DailyState;
}

export function StateOverview({ state }: StateOverviewProps) {
  return (
    <Card className="col-span-2">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Your Current State</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard 
            label="Energy" 
            value={state.energy} 
            description="Your current energy level"
          />
          <MetricCard 
            label="Focus" 
            value={state.focus}
            description="Your ability to concentrate"
          />
          <MetricCard 
            label="Hydration" 
            value={state.hydration}
            description="Your hydration status"
          />
          <MetricCard 
            label="Stress" 
            value={state.stressLoad}
            description="Your stress level"
          />
        </div>
      </div>
    </Card>
  );
}

function MetricCard({ 
  label, 
  value,
  description
}: { 
  label: string; 
  value: string;
  description: string;
}) {
  const levelMap = {
    low: 30,
    medium: 60,
    high: 90
  };

  return (
    <div className="p-4 bg-zinc-900/50 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-zinc-300">{label}</h3>
        <span className="text-xs bg-zinc-800/50 text-zinc-400 px-2 py-1 rounded-full">
          {value}
        </span>
      </div>
      <Progress value={levelMap[value as keyof typeof levelMap] || 0} />
      <p className="text-xs text-zinc-400 mt-2">{description}</p>
    </div>
  );
}
