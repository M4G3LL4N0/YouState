export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-50">
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Optimize Your Human<span className="text-blue-500">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-12">
            Pulse adapts to your body and life in real time, telling you exactly what to do next.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/sign-up"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="px-8 py-3 border border-zinc-700 hover:bg-zinc-900/50 rounded-lg font-medium transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            title="Your State" 
            description="Real-time dashboard of your energy, focus, and needs."
          />
          <FeatureCard 
            title="What To Do" 
            description="Clear, prioritized recommendations tailored to you."
          />
          <FeatureCard 
            title="Why It Matters" 
            description="Understand the science behind each suggestion."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="glass p-6 rounded-xl">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
}
