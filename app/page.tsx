import Link from 'next/link';
import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            YouState
          </Link>

          <nav className="flex items-center gap-6 text-sm text-white/70">
            <Link href="/about">About</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/app">App</Link>
          </nav>
        </header>

        <section className="flex flex-1 flex-col justify-center py-20">
          <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Real-time personal optimization
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl"
          >
            Your body already knows what it needs.
            <span className="block text-white/65">We tell you what to do next.</span>
          </motion.h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            YouState adapts energy, nutrition, hydration, focus, and recovery guidance
            to your real life in real time.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/app"
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-90"
            >
              Open app
            </Link>

            <Link
              href="/pricing"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              View pricing
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
