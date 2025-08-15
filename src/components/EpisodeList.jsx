import { useState } from 'react';

export default function EpisodeList({ episodes = [], currentEpisode = 1, onEpisodeSelect }) {
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);

  const handleEpisodeClick = (episodeNumber) => {
    if (onEpisodeSelect) {
      onEpisodeSelect(episodeNumber);
    }
  };

  // Display episodes (show all or limit to 10)
  const displayEpisodes = showAllEpisodes ? episodes : episodes.slice(0, 10);

  if (episodes.length === 0) {
    return (
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/50 p-6 w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Episodes</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-400">0 episodes</span>
          </div>
        </div>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📺</span>
          </div>
          <p className="text-slate-400">No episodes available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/50 p-6 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Episodes</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-400">{episodes.length} episodes</span>
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {displayEpisodes.map((episode, index) => {
          const episodeNumber = episode.number || index + 1;
          const isCurrentEpisode = episodeNumber === currentEpisode;
          
          return (
            <div 
              key={episode.id || index} 
              onClick={() => handleEpisodeClick(episodeNumber)}
              className={`group bg-slate-700/50 hover:bg-slate-700/70 rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-200 cursor-pointer border ${
                isCurrentEpisode 
                  ? 'border-cyan-500 bg-cyan-500/20' 
                  : 'border-transparent hover:border-cyan-500/30'
              }`}
            >
              {/* Episode number */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transition-all duration-200 ${
                isCurrentEpisode
                  ? 'bg-cyan-500 shadow-cyan-500/50'
                  : 'bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:shadow-cyan-500/25'
              }`}>
                {episodeNumber}
              </div>
              
              {/* Episode info */}
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium text-sm mb-1 ${
                  isCurrentEpisode ? 'text-cyan-400' : 'text-white'
                }`}>
                  {episode.title || `Episode ${episodeNumber}`}
                </h4>
                {episode.description && (
                  <p className={`text-xs truncate ${
                    isCurrentEpisode ? 'text-cyan-300' : 'text-slate-400'
                  }`}>
                    {episode.description}
                  </p>
                )}
              </div>
              
              {/* Duration */}
              {episode.duration && (
                <div className={`text-xs px-2 py-1 rounded-full ${
                  isCurrentEpisode 
                    ? 'text-cyan-400 bg-cyan-500/20' 
                    : 'text-slate-400 bg-slate-800/50'
                }`}>
                  {Math.floor(episode.duration / 60)}m
                </div>
              )}
              
              {/* Play indicator */}
              <div className={`transition-opacity duration-200 ${
                isCurrentEpisode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCurrentEpisode ? 'bg-cyan-500' : 'bg-cyan-500'
                }`}>
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* View all episodes button */}
      {episodes.length > 10 && (
        <div className="mt-6 pt-4 border-t border-slate-700/50">
          <button 
            onClick={() => setShowAllEpisodes(!showAllEpisodes)}
            className="w-full py-3 bg-slate-700/50 hover:bg-slate-700/70 text-white font-medium rounded-xl transition-all duration-200 hover:bg-cyan-500/20 hover:border-cyan-500/30 border border-transparent"
          >
            {showAllEpisodes ? 'Show Less' : `View All ${episodes.length} Episodes`}
          </button>
        </div>
      )}
    </div>
  );
}
