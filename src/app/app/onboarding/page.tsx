'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { completeOnboarding, type OnboardingFormData } from '@/lib/actions/onboarding';

const steps = [
  { key: 'name', title: 'What should we call you?', description: 'This helps personalize your experience.' },
  { key: 'lifestyleType', title: 'What best describes your lifestyle?', description: 'We adapt recommendations to your real day-to-day context.' },
  { key: 'primaryGoal', title: 'What do you want most right now?', description: 'Choose the main thing you want YouState to optimize.' },
  { key: 'sleepSchedule', title: 'How is your sleep schedule?', description: 'Your sleep pattern shapes energy recommendations.' },
  { key: 'caffeineHabits', title: 'What are your caffeine habits?', description: 'We use this to tune stimulation and crash prevention.' },
  { key: 'caffeineSensitivity', title: 'How sensitive are you to caffeine?', description: 'Some people can handle more. Some cannot.' },
  { key: 'mealPattern', title: 'How do you usually eat?', description: 'Structured or flexible, we adapt either way.' },
  { key: 'activityLevel', title: 'How active are your days?', description: 'This helps adjust energy and fueling guidance.' },
  { key: 'stressLevel', title: 'What is your usual stress level lately?', description: 'Stress changes recovery, hunger, and focus patterns.' },
] as const;

const initialFormData: OnboardingFormData = {
  name: '',
  lifestyleType: 'knowledge-worker',
  primaryGoal: 'better-focus',
  sleepSchedule: 'regular',
  caffeineHabits: 'moderate',
  caffeineSensitivity: 'medium',
  mealPattern: 'flexible',
  activityLevel: 'medium',
  stressLevel: 'medium',
};

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  function handleNext() {
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
  }

  function handleBack() {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  }

  function updateField<K extends keyof OnboardingFormData>(key: K, value: OnboardingFormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);

    try {
      await completeOnboarding(formData);
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  }

  function renderStep() {
    switch (step.key) {
      case 'name':
        return (
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/30"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
          />
        );

      case 'lifestyleType':
        return (
          <div className="grid gap-3">
            {[
              ['knowledge-worker', 'Knowledge worker'],
              ['shift-worker', 'Shift worker'],
              ['physical-labor', 'Physical labor'],
              ['student', 'Student'],
              ['busy-parent', 'Busy parent'],
              ['general', 'General'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => updateField('lifestyleType', value)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  formData.lifestyleType === value
                    ? 'border-white/30 bg-white/10 text-white'
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/8'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        );

      case 'primaryGoal':
        return (
          <div className="grid gap-3">
            {[
              ['better-focus', 'Better focus'],
              ['more-energy', 'More energy'],
              ['weight-control', 'Weight control'],
              ['better-recovery', 'Better recovery'],
              ['performance', 'Performance'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => updateField('primaryGoal', value)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  formData.primaryGoal === value
                    ? 'border-white/30 bg-white/10 text-white'
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/8'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        );

      default: {
        const key = step.key as keyof OnboardingFormData;
        return (
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/30"
            value={formData[key]}
            onChange={(e) => updateField(key, e.target.value)}
          />
        );
      }
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/40">Onboarding</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Build your adaptive profile</h1>
          </div>
          <div className="text-sm text-white/45">
            Step {currentStep + 1} / {steps.length}
          </div>
        </div>

        <div className="mb-8 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-white transition-all"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div>
          <h2 className="text-2xl font-medium">{step.title}</h2>
          <p className="mt-2 text-white/60">{step.description}</p>

          <div className="mt-6">{renderStep()}</div>

          {error ? (
            <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0 || submitting}>
            Back
          </Button>

          {isLastStep ? (
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Saving...' : 'Complete onboarding'}
            </Button>
          ) : (
            <Button onClick={handleNext}>Continue</Button>
          )}
        </div>
      </div>
    </div>
  );
}
