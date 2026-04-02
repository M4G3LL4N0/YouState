export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-50">
      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            The Operating System for Human Performance<span className="text-blue-500">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-12">
            Pulse combines real-time biometrics with adaptive AI to optimize your energy, focus, and recovery - delivering personalized recommendations when you need them most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/sign-up"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
            >
              Join the Waitlist
            </a>
            <a
              href="/pricing"
              className="px-8 py-3 border border-zinc-700 hover:bg-zinc-900/50 rounded-lg font-medium transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>

        {/* Value Proposition Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="activity"
            title="Real-Time Optimization" 
            description="Continuous biometric monitoring and adaptive recommendations tailored to your current state."
          />
          <FeatureCard 
            icon="zap"
            title="Personalized Intelligence" 
            description="AI that learns your unique patterns and adapts to your lifestyle and goals."
          />
          <FeatureCard 
            icon="clock"
            title="Proactive Guidance" 
            description="Anticipate energy crashes and optimize performance before you need to."
          />
        </div>

        {/* Why Current Solutions Fail */}
        <section className="mt-32 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Current Solutions Fall Short</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProblemCard
              title="Static Recommendations"
              description="Generic advice that doesn't account for your current state or changing needs."
            />
            <ProblemCard
              title="Reactive Approach"
              description="Most apps only respond after you've already crashed or lost focus."
            />
            <ProblemCard
              title="One-Size-Fits-All"
              description="Solutions that don't adapt to your unique biology and lifestyle."
            />
            <ProblemCard
              title="Data Overload"
              description="Too much information without clear, actionable insights."
            />
          </div>
        </section>

        {/* Who It's For */}
        <section className="mt-32 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Who Pulse is For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AudienceCard
              icon="briefcase"
              title="Professionals"
              description="Optimize focus and energy for peak productivity throughout your workday."
            />
            <AudienceCard
              icon="heart"
              title="Health-Conscious"
              description="Understand and optimize your body's natural rhythms for better health."
            />
            <AudienceCard
              icon="trending-up"
              title="High Performers"
              description="Push your limits while maintaining sustainable energy and recovery."
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: string;
  title: string; 
  description: string 
}) {
  return (
    <div className="glass p-8 rounded-xl">
      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
        {/* Icon would be dynamically rendered based on prop */}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
}

function ProblemCard({ title, description }: { 
  title: string;
  description: string;
}) {
  return (
    <div className="glass p-6 rounded-xl border border-zinc-800">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
}

function AudienceCard({ icon, title, description }: { 
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="glass p-8 rounded-xl">
      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
        {/* Icon would be dynamically rendered based on prop */}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
}
