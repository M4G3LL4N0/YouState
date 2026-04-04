import { createClient } from '@/lib/supabase/server';
import { format } from 'date-fns';
import * as Icons from '@/components/icons';

export async function RecentCheckIns() {
  try {
    await createClient();
  } catch {
    // ignore until Supabase is fully wired
  }

  const items = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      title: 'Energy check-in',
      description: 'Energy stable, focus improving.',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      title: 'Hydration',
      description: 'Water intake increased.',
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      title: 'Caffeine',
      description: 'Moderate caffeine dose logged.',
    },
  ];

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <Icons.Activity className="mt-0.5 h-4 w-4 text-white/60" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-white">{item.title}</p>
              <p className="text-xs text-white/45">
                {format(item.timestamp, 'p')}
              </p>
            </div>
            <p className="mt-1 text-sm text-white/65">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
