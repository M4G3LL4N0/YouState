"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const links = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/app", label: "App" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-medium tracking-tighter" onClick={() => setOpen(false)}>
          You<span className="text-zinc-400">State</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm transition-colors hover:text-zinc-300">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/auth/sign-up">Get Started</Link>
          </Button>
          <Button asChild size="sm" className="sm:hidden">
            <Link href="/app">App</Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 text-zinc-200 md:hidden"
            aria-expanded={open}
            aria-controls="youstate-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden>{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="youstate-mobile-nav"
          className="border-t border-zinc-800/50 md:hidden"
        >
          <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2.5 text-sm text-zinc-200 hover:bg-zinc-900"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/sign-in" onClick={() => setOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up" onClick={() => setOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
            <p className="px-3 pt-1 text-[11px] leading-relaxed text-zinc-500">
              Performance and wellness planning guidance — not medical diagnosis, treatment, or emergency care.
            </p>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
