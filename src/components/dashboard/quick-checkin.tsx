'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { useRouter } from 'next/navigation';

type CheckInState = {
  energy: number;
  focus: number;
  hunger: number;
  hydration: number;
  stress: number;
  caffeine: number;
  sleep: number;
  activity: string;
};

export function QuickCheckIn() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState<CheckInState>({
    energy: 3,
    focus: 3,
    hunger: 3,
    hydration: 3,
    stress: 3,
    caffeine: 0,
    sleep: 3,
    activity: 'work'
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const supabase = createSupabaseBrowserClient();
    
    const { error } = await supabase
      .from('pulse.daily_states')
      .insert({
        energy: getLevel(state.energy),
        focus: getLevel(state.focus),
        hunger: getLevel(state.hunger),
        hydration: getLevel(state.hydration),
        stress_load: getLevel(state.stress),
        caffeine_load: getLevel(state.caffeine),
        sleep_debt: getLevel(5 - state.sleep), // Invert sleep quality to debt
        physical_demand: state.activity === 'exercise' ? 'high' : 'medium',
        cognitive_demand: state.activity === 'work' ? 'high' : 'medium',
        crash_risk: 'low' // Will be calculated by recommendation engine
      });

    if (!error) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.refresh();
      }, 2000);
    }
    setIsSubmitting(false);
  };

  const getLevel = (value: number): 'low' | 'medium' | 'high' => {
    if (value <= 2) return 'low';
    if (value <= 3) return 'medium';
    return 'high';
  };

  if (success) {
    return (
      <div className="glass rounded-xl p-6 border border-emerald-500/30 bg-emerald-500/10">
        <div className="flex items-center gap-3 text-emerald-400">
          <Icons.check className="w-5 h-5" />
          <span>Check-in complete! Updating your dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6 border border-zinc-800">
      <h2 className="text-xl font-semibold mb-4">Quick Check-In</h2>
      
      <div className="space-y-6">
        <MetricSlider
          label="Energy"
          value={state.energy}
          onChange={(v) => setState({...state, energy: v})}
          min={1}
          max={5}
        />
        <MetricSlider
          label="Focus"
          value={state.focus}
          onChange={(v) => setState({...state, focus: v})}
          min={1}
          max={5}
        />
        <MetricSlider
          label="Hydration"
          value={state.hydration}
          onChange={(v) => setState({...state, hydration: v})}
          min={1}
          max={5}
        />
        <MetricSlider
          label="Stress"
          value={state.stress}
          onChange={(v) => setState({...state, stress: v})}
          min={1}
          max={5}
          reverse
        />
        <div className="grid grid-cols-2 gap-4">
          <MetricSlider
            label="Caffeine"
            value={state.caffeine}
            onChange={(v) => setState({...state, caffeine: v})}
            min={0}
            max={4}
          />
          <MetricSlider
            label="Sleep"
            value={state.sleep}
            onChange={(v) => setState({...state, sleep: v})}
            min={1}
            max={5}
          />
        </div>
        <ActivitySelect
          value={state.activity}
          onChange={(v) => setState({...state, activity: v})}
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="mt-6 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Submit Check-In
      </Button>
    </div>
  );
}

function MetricSlider({
  label,
  value,
  onChange,
  min = 1,
  max = 5,
  reverse = false
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  reverse?: boolean;
}) {
  const levels = [
    { value: 1, label: 'Very Low' },
    { value: 2, label: 'Low' },
    { value: 3, label: 'Medium' },
    { value: 4, label: 'High' },
    { value: 5, label: 'Very High' }
  ].slice(min - 1, max);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-zinc-300">{label}</span>
        <span className="text-xs text-zinc-400">
          {levels.find(l => l.value === value)?.label}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={reverse ? max - value + min : value}
        onChange={(e) => onChange(reverse ? max - +e.target.value + min : +e.target.value)}
        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

function ActivitySelect({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const activities = [
    { value: 'work', label: 'Working' },
    { value: 'exercise', label: 'Exercising' },
    { value: 'rest', label: 'Resting' },
    { value: 'social', label: 'Socializing' }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">
        Current Activity
      </label>
      <div className="grid grid-cols-2 gap-2">
        {activities.map((activity) => (
          <button
            key={activity.value}
            type="button"
            className={`py-2 px-3 rounded-lg text-sm transition-colors ${
              value === activity.value
                ? 'bg-blue-500 text-white'
                : 'bg-zinc-800 hover:bg-zinc-700'
            }`}
            onClick={() => onChange(activity.value)}
          >
            {activity.label}
          </button>
        ))}
      </div>
    </div>
  );
}
