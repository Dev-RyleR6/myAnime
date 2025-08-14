
export default function Favorites() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-cyan-500/25">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Your Favorites</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Keep track of all the anime you love. Your favorites will appear here once you start adding them.
          </p>
        </div>

        {/* Empty state */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/50 p-12 text-center">
          <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">No favorites yet</h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Start exploring anime and add your favorites by clicking the heart icon on any anime card.
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Browse Anime
            </button>
            <button className="px-8 py-3 bg-slate-700/50 hover:bg-slate-700/70 text-white font-medium rounded-xl border border-slate-600/50 hover:border-cyan-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Discover New Shows
            </button>
          </div>
        </div>

        {/* Coming soon features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Smart Recommendations</h4>
            <p className="text-slate-400 text-sm">Get personalized anime suggestions based on your favorites.</p>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Watch History</h4>
            <p className="text-slate-400 text-sm">Track your progress and resume where you left off.</p>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Share Lists</h4>
            <p className="text-slate-400 text-sm">Share your favorite anime with friends and family.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
