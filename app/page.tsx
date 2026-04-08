'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import Loading from '@/components/loading';

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };
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

          <Suspense fallback={<Loading />}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.h1
                variants={itemVariants}
                className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl"
              >
                Your body already knows what it needs.
                <motion.span 
                  variants={itemVariants}
                  className="block text-white/65"
                >
                  We tell you what to do next.
                </motion.span>
              </motion.h1>
            </motion.div>
          </Suspense>

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
