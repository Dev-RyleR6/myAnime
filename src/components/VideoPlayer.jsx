
export default function VideoPlayer() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Video container */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden group">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/50 via-slate-600/30 to-slate-800/50" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="group-hover:scale-110 transition-transform duration-300">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/25 group-hover:shadow-cyan-400/40 transition-all duration-300">
              <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Video info overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white text-xl font-semibold mb-2">Episode 1: The Beginning</h3>
              <p className="text-slate-300 text-sm">Click to start watching</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-slate-300 text-sm">
                <span>24:30</span>
                <span>•</span>
                <span>HD</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Loading indicator */}
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
      
      {/* Video controls placeholder */}
      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <div className="flex items-center space-x-4">
          <span>Video player coming soon...</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Quality: Auto</span>
          <span>•</span>
          <span>Speed: 1x</span>
        </div>
      </div>
    </div>
  );
}
