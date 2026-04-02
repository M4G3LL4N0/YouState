interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return <div className={`glass rounded-xl border border-zinc-800 ${className || ''}`}>{children}</div>;
}
