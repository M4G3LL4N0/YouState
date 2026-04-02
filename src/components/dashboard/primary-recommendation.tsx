import { Recommendation } from '@/lib/types';

export function PrimaryRecommendation({ recommendation }: { recommendation: Recommendation }) {
  return (
    <div className="glass rounded-xl p-6 border border-blue-500/30 bg-blue-500/10">
      <div className="flex items-start gapIntermediate">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
          <span className="text-blue-400 font-medium">{recommendation.priority}</span>
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{recommendation.message}</h2>
            <span className="text-xs uppercase bg-white/10 rounded px-2 py-1 text-white/80">
              {recommendation.category}
            </span>
          </div>
          
          <p className="text-sm text-zinc-300 mt-2">{recommendation.reasoning}</p>
          
          {recommendation.caution && (
            <div className="mt-3 text-xs bg-red-500/10 text-red-400 rounded px-3 py-2">
              ⚠️ {recommendation.caution}
            </div>
          )}
          
          <div className="mt-4 flex gap-3">
            <button className="text-xs bg-blue-500 hover:bg-blue-400 text-white px-3 py-1.5 rounded-md transition-colors">
              I did this
            </button>
            <button className="text-xs bg-white/5 hover:bg-white/10 text-zinc-300 px-3 py-1.5 rounded-md transition-colors">
              Remind me later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
