import { createSupabaseServerClient } from '@/lib/supabase/server';
import { format } from 'date-fns';
import { Icons } from '@/components/icons';

export async function RecentCheckIns() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: logs } = await supabase
    .from('pulse.daily_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('logged_at', { ascending: false })
    .limit(5);

  if (!logs?.length) return null;

  return (
    <div className="glass rounded-xl p-6 border border-zinc-800">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg">
            <div className="flex-shrink-0 mt-1">
              {log.entry_type === 'action' ? (
                <Icons.check className="w-4 h-4 text-emerald-400" />
              ) : log.entry_type === 'event' ? (
                <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500" />
              ) : (
                <div className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{log.description}</p>
              {log.details && (
                <p className="text-xs text-zinc-400 mt-1 truncate">
                  {Object.entries(log.details).map(([key, val]) => `${key}: ${val}`).join(' • ')}
                </p>
              )}
            </div>
            <div className="text-xs text-zinc-500 whitespace-nowrap">
              {format(new Date(log.logged_at), 'h:mm a')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
