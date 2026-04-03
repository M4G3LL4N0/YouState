import { AppShell } from '@/components/layout/app-shell';
import { DashboardHeader } from '@/components/dashboard/header';
import { StateOverview } from '@/components/dashboard/state-overview';
import { RecommendationCard } from '@/components/dashboard/recommendation-card';
import { RecentCheckIns } from '@/components/dashboard/recent-checkins';
import { mockDailyStates, mockProfiles } from '@/lib/mock-data';
import { generateRecommendations } from '@/lib/recommendation-engine';

export default async function AppPage() {
  const profile = mockProfiles[0];
  const currentState = mockDailyStates[0];
  const recommendations = generateRecommendations(currentState, profile);

  return (
    <AppShell>
      <DashboardHeader state={currentState} profile={profile} />

      <div className="mt-6 grid gap-6">
        <StateOverview state={currentState} />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <RecommendationCard
                key={`${recommendation.category}-${recommendation.title}-${index}`}
                recommendation={recommendation}
              />
            ))}
          </div>

          <div className="glass rounded-2xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold">Why</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Your current state is stable enough to work, but hydration and meal
              timing will determine whether your energy holds or drops later.
            </p>
          </div>
        </section>

        <section className="glass rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold">Recent check-ins</h2>
          <div className="mt-4">
            <RecentCheckIns />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
