import { createSupabaseServerClient } from '@/lib/supabase/server';
import { format } from 'date-fns';

export async function RecentCheckIns() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: checkins } = await supabase
    .from('pulse.daily_states')
    .select('*')
    .eq('user_id', user.id)
    .order('recorded_at', { ascending: false })
    .limit(5);

  if (!checkins?.length) return null;

  return (
    <div className="glass rounded-xl p-6 border border-zinc-800">
      <h2 className="text-xl font-semibold mb-4">Recent Check-Ins</h2>
      <div className="space-y-3">
        {checkins.map((checkin) => (
          <div key={checkin.id} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
            <div>
              <p className="text-sm font-medium">
                {format(new Date(checkin.recorded_at), 'h:mm a')}
              </p>
              <p className="text-xs text-zinc-400">
                Energy: {checkin.energy} • Focus: {checkin.focus}
              </p>
            </div>
            <div className="text-xs text-zinc-500">
              {format(new Date(checkin.recorded_at), 'MMM d')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
