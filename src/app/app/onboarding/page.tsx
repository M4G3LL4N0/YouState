import { AppShell } from '@/components/app-shell';
import { PrimaryGoal, LifestyleType, SleepSchedule, CaffeineHabits, MealRegularity, StressLevel } from '@/lib/types';

export default function OnboardingPage() {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Pulse</h1>
          <p className="text-zinc-400">
            Let's personalize your experience by understanding your lifestyle and goals.
          </p>
        </header>

        <form className="space-y-8">
          <OnboardingStep 
            title="What's your primary goal?"
            options={[
              { value: 'energy', label: 'Boost Energy' },
              { value: 'focus', label: 'Improve Focus' },
              { value: 'recovery', label: 'Enhance Recovery' },
              { value: 'performance', label: 'Maximize Performance' },
              { value: 'balance', label: 'Find Balance' },
            ]}
            name="primaryGoal"
          />

          <OnboardingStep 
            title="What's your lifestyle type?"
            options={[
              { value: 'office', label: 'Office Job' },
              { value: 'remote', label: 'Remote Work' },
              { value: 'shift', label: 'Shift Work' },
              { value: 'freelance', label: 'Freelance' },
              { value: 'other', label: 'Other' },
            ]}
            name="lifestyleType"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
            >
              Complete Setup
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

function OnboardingStep({ title, options, name }: { 
  title: string;
  options: { value: string; label: string }[];
  name: string;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <label 
            key={option.value}
            className="glass p-4 rounded-lg cursor-pointer hover:bg-zinc-800/50 transition-colors"
          >
            <input 
              type="radio"
              name={name}
              value={option.value}
              className="sr-only"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
