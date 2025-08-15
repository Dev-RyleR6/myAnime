import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useAnimeData } from '../hooks/useAnimeData';
import SkeletonLoader from '../components/SkeletonLoader';

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user, isAuthenticated } = useAuthContext();
  const { getAnimeInfo } = useAnimeData();

  const handleAnimeClick = (animeId) => {
    navigate(`/anime/${animeId}`);
  };

  // Fetch user's favorites on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Import userDataService dynamically to avoid circular dependencies
        const { default: userDataService } = await import('../services/userDataService');
        
        // Get user's favorites
        const userFavorites = await userDataService.getFavorites(user.uid);
        
        if (userFavorites && userFavorites.length > 0) {
          // Fetch additional anime info for each favorite
          const favoritesWithInfo = await Promise.all(
            userFavorites.map(async (favorite) => {
              try {
                const animeInfo = await getAnimeInfo(favorite.animeId);
                return {
                  ...favorite,
                  ...animeInfo,
                  id: favorite.animeId
                };
              } catch (error) {
                console.error(`Error fetching info for anime ${favorite.animeId}:`, error);
                return favorite;
              }
            })
          );
          
          setFavorites(favoritesWithInfo);
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError('Failed to load favorites. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated, user, getAnimeInfo]);

  const handleRemoveFavorite = async (animeId) => {
    if (!isAuthenticated || !user) return;
    
    try {
      // Import userDataService dynamically
      const { default: userDataService } = await import('../services/userDataService');
      
      // Remove from favorites
      await userDataService.removeFromFavorites(user.uid, animeId);
      
      // Update local state
      setFavorites(prev => prev.filter(fav => fav.id !== animeId));
      
      console.log('Removed from favorites:', animeId);
    } catch (error) {
      console.error('Error removing from favorites:', error);
      setError('Failed to remove from favorites. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">❤️ My Favorites</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Your personal collection of beloved anime series and movies
          </p>
        </div>

        {/* Authentication Check */}
        {!isAuthenticated ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔐</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Sign In Required</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Please sign in to view and manage your favorites
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Sign In
            </button>
          </div>
        ) : loading ? (
          /* Loading state */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        ) : error ? (
          /* Error state */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Error Loading Favorites</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Try Again
            </button>
          </div>
        ) : favorites.length > 0 ? (
          /* Favorites Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((anime) => (
              <div
                key={anime.id}
                className="group bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer"
              >
                {/* Image placeholder */}
                <div 
                  onClick={() => handleAnimeClick(anime.id)}
                  className="relative w-full h-48 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-slate-600/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-2xl">🎬</span>
                    </div>
                  </div>
                  
                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${
                      (anime.status === 'Ongoing' || anime.releaseStatus === 'RELEASING') 
                        ? 'bg-green-500/90 text-white' 
                        : 'bg-blue-500/90 text-white'
                    }`}>
                      {anime.status || anime.releaseStatus || 'Unknown'}
                    </span>
                  </div>

                  {/* Favorite heart */}
                  <div className="absolute top-3 left-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(anime.id);
                      }}
                      className="w-8 h-8 bg-red-500/90 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-red-400 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Content */}
                <div 
                  onClick={() => handleAnimeClick(anime.id)}
                  className="p-4"
                >
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                    {anime.title?.english || anime.title?.romaji || anime.title || 'Unknown Title'}
                  </h3>
                  
                  {/* Rating and info */}
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span>{anime.rating || anime.averageScore || 'N/A'}</span>
                    </div>
                    <span>{anime.episodes || anime.totalEpisodes || 'N/A'} eps</span>
                  </div>

                  {/* Status and type */}
                  <div className="text-sm text-slate-400 mb-2">
                    <span className="text-cyan-400">Status:</span> {anime.status || anime.releaseStatus || 'Unknown'}
                  </div>

                  {/* Added date */}
                  <div className="text-sm text-slate-400">
                    <span className="text-cyan-400">Added:</span> {anime.addedAt ? new Date(anime.addedAt).toLocaleDateString() : 'Recently'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">💔</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Favorites Yet</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Start building your collection by adding anime to your favorites while browsing
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Discover Anime
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
