import type { ReactNode } from 'react';
import Link from 'next/link';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            YouState
          </Link>

          <nav className="mt-8 space-y-3 text-sm text-white/70">
            <Link href="/app" className="block hover:text-white">
              Dashboard
            </Link>
            <Link href="/app/onboarding" className="block hover:text-white">
              Onboarding
            </Link>
            <Link href="/app/settings" className="block hover:text-white">
              Settings
            </Link>
          </nav>
        </aside>

        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
