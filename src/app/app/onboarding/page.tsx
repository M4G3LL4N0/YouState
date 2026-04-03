'use client';

import { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { submitOnboarding } from '@/lib/actions/onboarding'; // Updated import

const steps = [
  {
    title: "What's your primary goal?",
    name: "primaryGoal",
    options: [
      { value: 'energy', label: 'Boost Energy' },
      { value: 'focus', label: 'Improve Focus' },
      { value: 'recovery', label: 'Enhance Recovery' },
      { value: 'performance', label: 'Maximize Performance' },
      { value: 'balance', label: 'Find Balance' },
    ]
  },
  {
    title: "What's your lifestyle type?",
    name: "lifestyleType",
    options: [
      { value: 'office', label: 'Office Job' },
      { value: 'remote', label: 'Remote Work' },
      { value: 'shift', label: 'Shift Work' },
      { value: 'freelance', label: 'Freelance' },
      { value: 'student', label: 'Student' },
      { value: 'parent', label: 'Parent' },
      { value: 'physical', label: 'Physical Labor' },
    ]
  },
  // ... other steps omitted for brevity
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentStepData = steps[currentStep];

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await submitOnboarding(formData); // Updated function call
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Pulse</h1>
          <p className="text-zinc-400">
            Let's personalize your experience ({currentStep + 1}/{steps.length})
          </p>
        </header>

        <div className="space-y-8">
          <OnboardingStep
            title={currentStepData.title}
            options={currentStepData.options}
            name={currentStepData.name}
            value={formData[currentStepData.name]}
            onChange={handleChange}
          />

          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!formData[currentStepData.name]}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData[currentStepData.name] || isSubmitting}
              >
                {isSubmitting ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Complete Setup
              </Button>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-4">
              {error}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function OnboardingStep({
  title,
  options,
  name,
  value,
  onChange,
}: {
  title: string;
  options: { value: string; label: string }[];
  name: string;
  value?: string;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className={`glass p-4 rounded-lg cursor-pointer transition-colors ${
              value === option.value
                ? 'bg-blue-500/20 border-blue-500'
                : 'hover:bg-zinc-800/50'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(name, option.value)}
              className="sr-only"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
