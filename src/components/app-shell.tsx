import { cn } from '@/lib/utils';
import { Home, Settings, User, Clock, Activity, Zap } from 'lucide-react';
import Link from 'next/link';

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className={cn(
      "flex min-h-screen bg-zinc-950 text-zinc-50",
      className
    )}>
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 p-6">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="w-6 h-6 text-blue-500" />
          <span className="text-xl font-semibold">Pulse</span>
        </div>
        
        <nav className="space-y-1">
          <NavLink href="/app" icon={Home}>Dashboard</NavLink>
          <NavLink href="/app/history" icon={Clock}>History</NavLink>
          <NavLink href="/app/settings" icon={Settings}>Settings</NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        {/* Topbar */}
        <div className="glass border-b border-zinc-800 p-4 flex justify-end">
          <button className="flex items-center gap-2 hover:bg-zinc-800/50 p-2 rounded-lg">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </div>
        
        {/* Page content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavLink({ href, icon: Icon, children }: { 
  href: string; 
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-3 p-2 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/50 rounded-lg transition-colors"
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </Link>
  );
}
