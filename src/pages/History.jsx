import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useAnimeData } from '../hooks/useAnimeData';
import SkeletonLoader from '../components/SkeletonLoader';

export default function History() {
  const navigate = useNavigate();
  const [watchHistory, setWatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user, isAuthenticated } = useAuthContext();
  const { getAnimeInfo } = useAnimeData();

  // Fetch user's watch history on component mount
  useEffect(() => {
    const fetchWatchHistory = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Import userDataService dynamically to avoid circular dependencies
        const { default: userDataService } = await import('../services/userDataService');
        
        // Get user's watch history
        const history = await userDataService.getWatchHistory(user.uid);
        
        if (history && history.length > 0) {
          // Fetch additional anime info for each history item
          const historyWithInfo = await Promise.all(
            history.map(async (item) => {
              try {
                const animeInfo = await getAnimeInfo(item.animeId);
                return {
                  ...item,
                  ...animeInfo,
                  id: item.animeId,
                  title: animeInfo?.title?.english || animeInfo?.title?.romaji || animeInfo?.title || 'Unknown Title',
                  totalEpisodes: animeInfo?.totalEpisodes || animeInfo?.episodes || 0,
                  progress: item.progress || 0,
                  watchTime: formatTime(item.progress || 0),
                  totalDuration: '24:00', // Default episode duration
                  lastWatched: formatTimeAgo(item.watchedAt),
                  status: item.progress >= 90 ? 'Completed' : 'In Progress',
                  seriesProgress: calculateSeriesProgress(item.episodeId, animeInfo?.totalEpisodes || 0)
                };
              } catch (error) {
                console.error(`Error fetching info for anime ${item.animeId}:`, error);
                return item;
              }
            })
          );
          
          setWatchHistory(historyWithInfo);
        } else {
          setWatchHistory([]);
        }
      } catch (error) {
        console.error('Error fetching watch history:', error);
        setError('Failed to load watch history. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchHistory();
  }, [isAuthenticated, user, getAnimeInfo]);

  // Helper function to format time
  const formatTime = (progress) => {
    const totalMinutes = 24; // 24 minutes per episode
    const watchedMinutes = Math.round((progress / 100) * totalMinutes);
    const minutes = Math.floor(watchedMinutes);
    const seconds = Math.round((watchedMinutes - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Helper function to format time ago
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Unknown';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} day${Math.floor(diffInHours / 24) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInHours / 168)} week${Math.floor(diffInHours / 24) > 1 ? 's' : ''} ago`;
  };

  // Helper function to calculate series progress
  const calculateSeriesProgress = (episodeId, totalEpisodes) => {
    if (!episodeId || !totalEpisodes) return 0;
    
    // Extract episode number from episodeId (assuming format like "episode-1")
    const episodeNum = parseInt(episodeId.toString().replace(/\D/g, '')) || 1;
    return Math.round((episodeNum / totalEpisodes) * 100);
  };

  const handleContinueWatching = (anime) => {
    navigate(`/anime/${anime.id}`);
  };

  const handleRemoveFromHistory = async (animeId) => {
    if (!isAuthenticated || !user) return;
    
    try {
      // Import userDataService dynamically
      const { default: userDataService } = await import('../services/userDataService');
      
      // Remove from watch history
      await userDataService.removeFromWatchHistory(user.uid, animeId);
      
      // Update local state
      setWatchHistory(prev => prev.filter(item => item.id !== animeId));
      
      console.log('Removed from history:', animeId);
    } catch (error) {
      console.error('Error removing from history:', error);
      setError('Failed to remove from history. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-cyan-500';
  };

  const formatWatchTime = (watchTime, totalDuration, progress) => {
    if (progress === 100) {
      return `Completed • ${totalDuration}`;
    }
    return `${watchTime} / ${totalDuration}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">📺 Watch History</h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto px-4">
            Pick up where you left off and track your anime journey
          </p>
        </div>

        {/* Authentication Check */}
        {!isAuthenticated ? (
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl sm:text-4xl">🔐</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Sign In Required</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm sm:text-base">
              Please sign in to view your watch history
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-6 sm:px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 text-sm sm:text-base"
            >
              Sign In
            </button>
          </div>
        ) : loading ? (
          /* Loading state */
          <div className="space-y-3 sm:space-y-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <SkeletonLoader className="w-16 h-20 sm:w-20 sm:h-28 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <SkeletonLoader className="h-6 w-48" />
                    <SkeletonLoader className="h-4 w-32" />
                    <SkeletonLoader className="h-4 w-40" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error state */
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl sm:text-4xl">⚠️</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Error Loading History</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm sm:text-base">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 sm:px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        ) : watchHistory.length > 0 ? (
          /* Watch History */
          <div className="space-y-3 sm:space-y-4">
            {watchHistory.map((anime) => (
              <div
                key={`${anime.id}-${anime.episode}`}
                className="group bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/50 p-4 sm:p-6 hover:border-cyan-500/30 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  {/* Anime placeholder image */}
                  <div 
                    onClick={() => handleContinueWatching(anime)}
                    className="w-16 h-20 sm:w-20 sm:h-28 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 self-start sm:self-auto"
                  >
                    <span className="text-xl sm:text-2xl">🎬</span>
                  </div>
                  
                  {/* Anime info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-2 sm:space-y-0">
                      <h3 className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors duration-200 truncate">
                        {anime.title}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(anime.status)} self-start sm:self-auto`}>
                        {anime.status}
                      </span>
                    </div>
                    
                    <p className="text-slate-400 text-sm mb-3 leading-relaxed">
                      Episode {anime.episode} of {anime.totalEpisodes} • {formatWatchTime(anime.watchTime, anime.totalDuration, anime.progress)} • {anime.lastWatched}
                    </p>
                    
                    {/* Episode Progress */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
                        <span>Episode Progress</span>
                        <span>{anime.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(anime.progress)}`}
                          style={{ width: `${anime.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Series Progress */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
                        <span>Series Progress</span>
                        <span>{anime.seriesProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300 bg-blue-500"
                          style={{ width: `${anime.seriesProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex items-center space-x-3 self-start sm:self-auto">
                    <button
                      onClick={() => handleContinueWatching(anime)}
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 text-sm sm:text-base"
                    >
                      Continue
                    </button>
                    <button
                      onClick={() => handleRemoveFromHistory(anime.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                      title="Remove from history"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl sm:text-4xl">📺</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">No Watch History</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm sm:text-base">
              Start watching anime to build your viewing history and track your progress
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 sm:px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 text-sm sm:text-base"
            >
              Start Watching
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
