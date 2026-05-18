import { cn } from '@/lib/utils';
import { Home, Settings, User, Clock, Zap } from 'lucide-react';
import Link from 'next/link';

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className={cn(
      "flex flex-col min-h-screen bg-zinc-950 text-zinc-50 antialiased",
      className
    )}>
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800/50 bg-zinc-950/50 backdrop-blur-lg p-6">
        <div className="flex items-center gap-3 mb-10">
          <Zap className="w-6 h-6 text-blue-400" />
          <span className="text-xl font-semibold tracking-tight bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Pulse</span>
        </div>
        
        <nav className="space-y-2">
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

      {/* Footer */}
      <footer className="glass border-t border-zinc-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-semibold">Pulse</span>
            </div>
            <p className="text-zinc-400 text-sm">
              The operating system for human performance.
            </p>
          </div>
          
          <div>
            <h4 className="text-zinc-300 font-medium mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="/features" className="hover:text-zinc-50">Features</a></li>
              <li><a href="/pricing" className="hover:text-zinc-50">Pricing</a></li>
              <li><a href="/integrations" className="hover:text-zinc-50">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-300 font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="/about" className="hover:text-zinc-50">About</a></li>
              <li><a href="/careers" className="hover:text-zinc-50">Careers</a></li>
              <li><a href="/press" className="hover:text-zinc-50">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-300 font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="/blog" className="hover:text-zinc-50">Blog</a></li>
              <li><a href="/research" className="hover:text-zinc-50">Research</a></li>
              <li><a href="/support" className="hover:text-zinc-50">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 py-4 text-center text-sm text-zinc-400">
          © {new Date().getFullYear()} Pulse Technologies. All rights reserved.
        </div>
      </footer>
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
