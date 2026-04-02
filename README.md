# Pulse

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
```
4. Run the development server:
```bash
npm run dev
```

## Contributing

We welcome contributions! Please open an issue or pull request on GitHub.
