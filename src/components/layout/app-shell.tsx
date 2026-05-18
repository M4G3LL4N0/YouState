import type { ReactNode } from 'react';
import Link from 'next/link';
import { Gauge, Settings, Sparkles, UserRound } from 'lucide-react';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="border-b border-white/10 bg-white/[0.025] p-5 lg:border-b-0 lg:border-r lg:p-6">
          <div className="flex items-center justify-between gap-4 lg:block">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              YouState
            </Link>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/45">
              Demo
            </span>
          </div>

          <nav className="mt-6 flex gap-2 overflow-x-auto text-sm text-white/70 lg:block lg:space-y-2">
            <NavLink href="/app" icon={Gauge}>Dashboard</NavLink>
            <NavLink href="/app/onboarding" icon={UserRound}>Onboarding</NavLink>
            <NavLink href="/app/settings" icon={Settings}>Settings</NavLink>
          </nav>

          <div className="mt-8 hidden rounded-2xl border border-white/10 bg-black/20 p-4 lg:block">
            <Sparkles className="h-4 w-4 text-white/55" />
            <p className="mt-3 text-sm font-medium text-white">Your State. What To Do Next. Why.</p>
            <p className="mt-2 text-xs leading-6 text-white/48">
              Mock fallback is active so the product stays demo-ready without Supabase.
            </p>
          </div>
        </aside>

        <main className="p-5 lg:p-10">{children}</main>
      </div>
    </div>
  );
}

function NavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 transition hover:bg-white/10 lg:flex lg:rounded-xl"
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </Link>
  );
}
