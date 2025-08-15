import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function AnimeCard({ anime = {} }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, isAuthenticated } = useAuthContext();
  
  // Extract real anime data with fallbacks
  const {
    id = '1',
    title = anime.title?.english || anime.title?.romaji || anime.title || 'Anime Title',
    rating = anime.averageScore || anime.rating || 8.5,
    episodes = anime.totalEpisodes || anime.episodes || 24,
    status = anime.releaseStatus || anime.status || 'Ongoing',
    image = anime.coverImage || anime.image || null,
    genres = anime.genres || []
  } = anime;

  const handleClick = () => {
    navigate(`/anime/${id}`);
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    try {
      setIsLoading(true);
      
      // Import userDataService dynamically
      const { default: userDataService } = await import('../services/userDataService');
      
      if (isFavorite) {
        // Remove from favorites
        await userDataService.removeFromFavorites(user.uid, id);
        setIsFavorite(false);
      } else {
        // Add to favorites
        await userDataService.addToFavorites(user.uid, id, {
          title,
          rating,
          episodes,
          status,
          genres
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if anime is in favorites on mount
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!isAuthenticated || !user || !id) return;
      
      try {
        const { default: userDataService } = await import('../services/userDataService');
        const inFavorites = await userDataService.isInFavorites(user.uid, id);
        setIsFavorite(inFavorites);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };
    
    checkFavoriteStatus();
  }, [isAuthenticated, user, id]);

  return (
    <div 
      onClick={handleClick}
      className="group bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer will-change-transform"
    >
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
            {status}
          </span>
        </div>

        {/* Favorite button */}
        {isAuthenticated && (
          <div className="absolute top-3 left-3">
            <button
              onClick={handleFavoriteClick}
              disabled={isLoading}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
                isFavorite 
                  ? 'bg-red-500/90 hover:bg-red-400 text-white' 
                  : 'bg-slate-600/50 hover:bg-slate-500/50 text-slate-300 hover:text-white'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Anime title */}
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors duration-200 truncate">
          {title}
        </h3>
        
        {/* Genres */}
        {genres.length > 0 && (
          <div className="mb-2">
            <div className="flex flex-wrap gap-1">
              {genres.slice(0, 2).map((genre, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full"
                >
                  {genre}
                </span>
              ))}
              {genres.length > 2 && (
                <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full">
                  +{genres.length - 2}
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Rating and info */}
        <div className="flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">⭐</span>
            <span>{rating}</span>
          </div>
          <span>{episodes} eps</span>
        </div>
      </div>
    </div>
  );
}
