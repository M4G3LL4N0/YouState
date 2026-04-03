import { AppShell } from '@/components/layout/app-shell';
import { DashboardHeader } from '@/components/dashboard/header';
import { StateOverview } from '@/components/dashboard/state-overview';
import { PrimaryRecommendation } from '@/components/dashboard/primary-recommendation';
import { RecommendationCard } from '@/components/dashboard/recommendation-card';
import { RecentCheckIns } from '@/components/dashboard/recent-checkins';
import { mockDailyStates, mockProfiles } from '@/lib/mock-data';
import { generateRecommendations } from '@/lib/recommendation-engine';

export default async function AppPage() {
  const profile = mockProfiles.knowledgeWorker;
  const currentState = mockDailyStates.morningPeak;
  const recommendations = generateRecommendations(currentState, profile);
  const primaryRecommendation = recommendations[0];
  const secondaryRecommendations = recommendations.slice(1);

  return (
    <AppShell>
      <DashboardHeader state={currentState} profile={profile} />

      <div className="mt-8 grid gap-8">
        <StateOverview state={currentState} />

        <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <PrimaryRecommendation recommendation={primaryRecommendation} />
            
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight">Your Action Plan</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {secondaryRecommendations.map((recommendation, index) => (
                  <RecommendationCard
                    key={`${recommendation.category}-${recommendation.title}-${index}`}
                    recommendation={recommendation}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="glass rounded-3xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold tracking-tight">Why This Matters</h2>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Your current state is stable enough to work, but hydration and meal
                timing will determine whether your energy holds or drops later.
                We'll help you maintain optimal performance throughout the day.
              </p>
            </div>

            <div className="glass rounded-3xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold tracking-tight">Recent Check-Ins</h2>
              <div className="mt-4">
                <RecentCheckIns />
              </div>
            </div>
          </aside>
        </section>
      </div>
    </AppShell>
  );
}
