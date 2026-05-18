import type { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className, children }: CardProps) {
  return <div className={`rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur ${className || ''}`}>{children}</div>;
}
