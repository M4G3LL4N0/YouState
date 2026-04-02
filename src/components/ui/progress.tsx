interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export function Progress({ value, max = 100, className }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-zinc-800 ${className || ''}`}>
      <div
        className="h-full bg-blue-500 transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
