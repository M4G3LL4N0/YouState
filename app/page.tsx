import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowRight, Brain, Coffee, Droplets, Moon, Utensils, Zap } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { ProductHonestyNote } from "@/components/ProductHonestyNote";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <Navbar />
        <div className="h-16 shrink-0" aria-hidden />

        <section className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Real-time human optimization OS
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
              Your body already knows what it needs.
              <span className="block text-white/60">YouState tells you what to do next.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
              A calm adaptive decision layer for energy, nutrition, hydration, caffeine, focus, sleep debt, hunger,
              stress, and the day you are actually living.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/app"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-90"
              >
                Open app
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/app/onboarding"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
              >
                Start onboarding
              </Link>
            </div>
          </div>

          <ProductPreview />
        </section>

        <section className="grid gap-6 border-t border-white/10 py-10 md:grid-cols-3">
          <LandingPanel
            title="Your State"
            body="A live read on energy, focus, hunger, hydration, caffeine load, sleep debt, crash risk, and context."
          />
          <LandingPanel
            title="What To Do Next"
            body="One prioritized move for the next useful window, not a pile of metrics for you to interpret."
          />
          <LandingPanel
            title="Why"
            body="Plain reasoning that connects the recommendation to your current state and reduces second guessing."
          />
        </section>

        <section className="grid gap-8 border-t border-white/10 py-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/40">Built for real days</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Not another tracker. A decision layer.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Knowledge workers protecting deep work",
              "Founders trying to avoid decision fatigue",
              "Shift workers managing odd energy curves",
              "Physical labor workers balancing strain and fuel",
              "Students timing focus and recovery",
              "Busy parents making the next sane choice",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/72">
                {item}
              </div>
            ))}
          </div>
        </section>

        <ProductHonestyNote status="demo" />
      </div>
    </main>
  );
}

function ProductPreview() {
  const metrics: Array<[string, string, ComponentType<{ className?: string }>]> = [
    ["Energy", "High", Zap],
    ["Focus", "High", Brain],
    ["Hydration", "Okay", Droplets],
    ["Caffeine", "Low", Coffee],
    ["Fuel", "Rising", Utensils],
    ["Sleep debt", "Medium", Moon],
  ];

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/40">Your State · sample</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Ready, but fragile</h2>
          </div>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
            Sample 82
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {metrics.map(([label, value, Icon]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <Icon className="h-4 w-4 text-white/52" />
              <p className="mt-4 text-xs text-white/45">{label}</p>
              <p className="mt-1 text-lg font-medium text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white p-5 text-black">
          <p className="text-xs uppercase tracking-[0.22em] text-black/45">What To Do Next</p>
          <h3 className="mt-2 text-xl font-semibold">Drink water before more caffeine.</h3>
          <p className="mt-3 text-sm leading-6 text-black/65">
            Hydration is only okay, caffeine load is low, and your focus window is valuable. Stabilize first, then
            decide whether stimulation is still needed.
          </p>
        </div>
      </div>
    </div>
  );
}

function LandingPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-white/62">{body}</p>
    </div>
  );
}
