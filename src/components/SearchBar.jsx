
export default function SearchBar() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="w-full pl-12 pr-4 py-4 bg-slate-800/80 border border-slate-700/50 rounded-2xl text-white placeholder-slate-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Search for anime, movies, or TV shows..."
          disabled
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          <div className="px-3 py-1 bg-slate-700/50 rounded-full">
            <span className="text-xs text-slate-400">⌘K</span>
          </div>
        </div>
      </div>
      <p className="text-center text-slate-400 text-sm mt-3">
        Search functionality coming soon...
      </p>
    </div>
  );
}
