import Link from 'next/link';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-medium tracking-tighter">
          You<span className="text-zinc-400">State</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/about" className="text-sm hover:text-zinc-300 transition-colors">
            About
          </Link>
          <Link href="/pricing" className="text-sm hover:text-zinc-300 transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/auth/sign-in">
              Sign In
            </Link>
          </Button>
          <Button asChild>
            <Link href="/auth/sign-up">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
