# Pulse

<p align="center">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="assets/hero/hero-reduced.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/hero/hero-light.svg">
    <img src="assets/hero/hero-motion.svg" alt="YouState — animated project plate showing request &rarr; authenticate &rarr; authorise &rarr; record &rarr; reject. Motion depicts this project's real state transition." width="100%">
  </picture>
</p>

<p align="center">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="assets/hero/computational-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/hero/computational-light.svg">
    <img src="assets/hero/computational-motion.svg" alt="State machine: request &rarr; authenticate &rarr; authorise &rarr; record &rarr; reject." width="100%">
  </picture>
</p>

Pulse is a universal human optimization OS that adapts nutrition, energy, recovery, focus, and daily performance recommendations to each person's real life in real time.

## Features

- Real-time state visualization (energy, focus, hydration, etc.)
- Personalized recommendations (what to do next)
- Daily timeline and history
- Lifestyle-based onboarding
- Premium dark UI with glassmorphism effects
- Settings and integrations management

## Tech Stack

- Next.js App Router
- React
- Tailwind CSS
- Supabase (auth/database)
- Vercel deployment

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create `.env.local` file:
```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Required for email auth
NEXT_PUBLIC_SUPABASE_EMAIL_REDIRECT_URL=http://localhost:3000/auth/callback

# Optional analytics providers
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_SEGMENT_KEY=your-segment-key
NEXT_PUBLIC_AMPLITUDE_KEY=your-amplitude-key
```

### Waitlist Setup

The waitlist feature requires the following database setup:

1. Create the waitlist table in Supabase using the migration file
2. Enable Row Level Security with public insert permissions
3. Create an index on the email column for faster lookups

### Analytics Setup

Pulse includes a lightweight analytics abstraction that supports multiple providers:

- PostHog
- Segment
- Amplitude
- Supabase (built-in)

To enable analytics, set the appropriate environment variables for your chosen provider(s).
4. Apply database migrations:
```bash
psql -U postgres -h your-supabase-db-host -d your-db-name -f migrations/20240401000000_initial_pulse_schema.sql
```
5. Run the development server:
```bash
npm run dev
```

## Contributing

We welcome contributions! Please open an issue or pull request on GitHub.

<!-- TRILLIONX:presentation:begin -->

### Animated surfaces

Generated from this repository's own source tree: every count, route and module below was measured, not written by hand.

#### Identity

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/hero-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/hero-light.svg">
  <img alt="Identity diagram for YouState" src="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/hero.svg">
</picture>

#### Entry points

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/terminal-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/terminal-light.svg">
  <img alt="Entry points diagram for YouState" src="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/terminal.svg">
</picture>

#### Modules

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/architecture-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/architecture-light.svg">
  <img alt="Modules diagram for YouState" src="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/architecture.svg">
</picture>

#### Routes

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/data_flow-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/data_flow-light.svg">
  <img alt="Routes diagram for YouState" src="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/data_flow.svg">
</picture>

#### Primitives

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/state_machine-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/state_machine-light.svg">
  <img alt="Primitives diagram for YouState" src="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/state_machine.svg">
</picture>

#### Composition

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/component_map-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/component_map-light.svg">
  <img alt="Composition diagram for YouState" src="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/component_map.svg">
</picture>

#### Build and tests

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/build-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/build-light.svg">
  <img alt="Build and tests diagram for YouState" src="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/build.svg">
</picture>

#### Workflow

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/workflow-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/workflow-light.svg">
  <img alt="Workflow diagram for YouState" src="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/workflow.svg">
</picture>

#### Domain

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/domain-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/domain-light.svg">
  <img alt="Domain diagram for YouState" src="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/domain.svg">
</picture>

#### Identity object

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/footer-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/footer-light.svg">
  <img alt="Identity object diagram for YouState" src="https://raw.githubusercontent.com/M4G3LL4N0/YouState/main/.github-art/surfaces/footer.svg">
</picture>

<!-- TRILLIONX:presentation:end -->

<!-- TRILLIONX:evidence:begin -->

## What is measurable here

Generated by `.github-art` from the source tree at publish time.

| Signal | Value |
| --- | --- |
| HTTP routes | 24 |
| Entry points | 1 |
| Module roots | 4 |
| Test files | 0 |
| CI workflows | 0 |
| Distinctive stack | Supabase, Zod |
| Status | PROTOTYPE |
| Evidence confidence | E3 |
| Animated surfaces | 10 |

<!-- TRILLIONX:evidence:end -->
