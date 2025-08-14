
export default function AnimeCard() {
  return (
    <div className="group bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer">
      {/* Image placeholder with gradient */}
      <div className="relative w-full h-48 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-slate-600/50 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl">🎬</span>
          </div>
        </div>
        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-cyan-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            Ongoing
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Title skeleton */}
        <div className="h-5 bg-slate-700 rounded mb-2 animate-pulse" />
        <div className="h-4 bg-slate-700 rounded w-3/4 mb-3 animate-pulse" />
        
        {/* Anime title */}
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors duration-200">
          Anime Title
        </h3>
        
        {/* Rating and info */}
        <div className="flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">⭐</span>
            <span>8.5</span>
          </div>
          <span>TV • 24 eps</span>
        </div>
      </div>
    </div>
  );
}
