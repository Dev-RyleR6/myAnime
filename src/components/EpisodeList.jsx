
export default function EpisodeList() {
  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/50 p-6 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Episodes</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-400">24 episodes</span>
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="group bg-slate-700/50 hover:bg-slate-700/70 rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-200 cursor-pointer border border-transparent hover:border-cyan-500/30"
          >
            {/* Episode number */}
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-200">
              {i + 1}
            </div>
            
            {/* Episode info */}
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-slate-600 rounded mb-2 animate-pulse" />
              <div className="h-3 bg-slate-600 rounded w-2/3 animate-pulse" />
            </div>
            
            {/* Duration */}
            <div className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">
              24m
            </div>
            
            {/* Play indicator */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* View all episodes button */}
      <div className="mt-6 pt-4 border-t border-slate-700/50">
        <button className="w-full py-3 bg-slate-700/50 hover:bg-slate-700/70 text-white font-medium rounded-xl transition-all duration-200 hover:bg-cyan-500/20 hover:border-cyan-500/30 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed" disabled>
          View All Episodes
        </button>
      </div>
    </div>
  );
}
