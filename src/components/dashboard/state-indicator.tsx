type MetricLevel = 'low' | 'medium' | 'high';
type HungerLevel = 'low' | 'rising' | 'high';

interface StateIndicatorProps {
  energy: MetricLevel;
  focus: MetricLevel;
  hunger: HungerLevel;
  className?: string;
}

export function StateIndicator({ energy, focus, hunger, className }: StateIndicatorProps) {
  const getMetricColor = (level: MetricLevel) => {
    switch (level) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-red-500';
    }
  };

  const getHungerColor = (level: HungerLevel) => {
    switch (level) {
      case 'low':
        return 'bg-green-500';
      case 'rising':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-red-500';
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className || ''}`}>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${getMetricColor(energy)}`} />
        <span className="text-xs">Energy</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${getMetricColor(focus)}`} />
        <span className="text-xs">Focus</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${getHungerColor(hunger)}`} />
        <span className="text-xs">Hunger</span>
      </div>
    </div>
  );
}
