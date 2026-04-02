import { DailyState } from '@/lib/types';

export function StateOverview({ state }: { state: DailyState }) {
  return (
    <div className="glass rounded-xl border border-zinc-800 overflow-hidden">
      <div className="grid grid-cols-2 divide-x divide-zinc-800">
        {/* Focus quadrant */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-300">Focus</h3>
            <MetricLevelBadge level={state.focus} />
          </div>
          <div className="h-2 bg-zinc-800 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full ${
                state.focus === 'high' ? 'bg-blue-500' :
                state.focus === 'medium' ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${state.focus === 'high' ? 90 : state.focus === 'medium' ? 60 : 30}%` }}
            />
          </div>
        </div>
        
        {/* Energy quadrant */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-300">Energy</h3>
            <MetricLevelBadge level={state.energy} />
          </div>
          <div className="h-2 bg-zinc-800 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full ${
                state.energy === 'high' ? 'bg-blue-500' :
                state.energy === 'medium' ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${state.energy === 'high' ? 90 : state.energy === 'medium' ? 60 : 30}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-zinc-800 border-t border-zinc-800">
        {[
          { label: 'Hydration', value: state.hydration },
          { label: 'Crash Risk', value: state.crashRisk },
          { label: 'Stress', value: state.stressLoad }
        ].map((metric) => (
          <div key={metric.label} className="p-3">
            <h3 className="text-xs text-zinc-400">{metric.label}</h3>
            <p className="text-sm font-medium mt-1 capitalize">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricLevelBadge({ level }: { level: string }) {
  const colorMap = {
    high: 'bg-blue-500/20 text-blue-400',
    medium: 'bg-amber-500/20 text-amber-400',
    low: 'bg-red-500/20 text-red-400'
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${colorMap[level as keyof typeof colorMap] || ''}`}>
      {level.toUpperCase()}
    </span>
  );
}
