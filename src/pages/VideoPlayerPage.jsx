import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoPlayer from '../components/VideoPlayer';
import EpisodeList from '../components/EpisodeList';
import CommentsSection from '../components/CommentsSection';
import { useAnimeData } from '../hooks/useAnimeData';
import { useAuthContext } from '../contexts/AuthContext';
import SkeletonLoader from '../components/SkeletonLoader';

export default function VideoPlayerPage() {
  const { animeId } = useParams();
  const navigate = useNavigate();
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [streamingLinks, setStreamingLinks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [episodeLoading, setEpisodeLoading] = useState(false);

  const { getAnimeInfo, getStreamingLinks } = useAnimeData();
  const { user, isAuthenticated } = useAuthContext();

  // Fetch anime data on component mount
  useEffect(() => {
    const fetchAnimeData = async () => {
      if (!animeId) {
        setError('No anime ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const animeData = await getAnimeInfo(animeId);
        if (!animeData) {
          setError('Anime not found');
          setLoading(false);
          return;
        }

        setAnime(animeData);
        setEpisodes(animeData.episodes || []);
        
        // Set current episode to 1 or the first available episode
        if (animeData.episodes && animeData.episodes.length > 0) {
          setCurrentEpisode(1);
        }
      } catch (error) {
        console.error('Error fetching anime data:', error);
        setError('Failed to load anime data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, [animeId, getAnimeInfo]);

  // Fetch streaming links when episode changes
  useEffect(() => {
    const fetchStreamingLinks = async () => {
      if (!animeId || !currentEpisode) return;

      try {
        setEpisodeLoading(true);
        console.log(`Fetching streaming links for anime ${animeId}, episode ${currentEpisode}`);
        const links = await getStreamingLinks(animeId, currentEpisode);
        console.log('Streaming links received:', links);
        setStreamingLinks(links);
      } catch (error) {
        console.error('Error fetching streaming links:', error);
        setError('Failed to load episode. Please try again.');
      } finally {
        setEpisodeLoading(false);
      }
    };

    fetchStreamingLinks();
  }, [animeId, currentEpisode, getStreamingLinks]);

  // Add to watch history when episode is selected
  useEffect(() => {
    const addToHistory = async () => {
      if (!isAuthenticated || !user || !anime || !currentEpisode) return;

      try {
        const { default: userDataService } = await import('../services/userDataService');
        const episodeData = episodes.find(ep => ep.number === currentEpisode);
        
        if (episodeData) {
          await userDataService.addToWatchHistory(user.uid, animeId, currentEpisode, {
            title: anime.title?.english || anime.title?.romaji || anime.title,
            image: anime.image,
            episodeNumber: currentEpisode,
            episodeTitle: episodeData.title || `Episode ${currentEpisode}`,
            totalEpisodes: episodes.length
          });
        }
      } catch (error) {
        console.error('Error adding to watch history:', error);
      }
    };

    addToHistory();
  }, [isAuthenticated, user, anime, currentEpisode, animeId, episodes]);

  const handleEpisodeSelect = (episodeNumber) => {
    setCurrentEpisode(episodeNumber);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-4 mb-8">
            <SkeletonLoader className="w-8 h-8 rounded-lg" />
            <div className="space-y-2">
              <SkeletonLoader className="h-8 w-64" />
              <SkeletonLoader className="h-4 w-32" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SkeletonLoader className="w-full h-96 rounded-xl" />
            </div>
            <div className="lg:col-span-1">
              <SkeletonLoader className="w-full h-96 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Error Loading Anime</h3>
            <p className="text-slate-400 mb-8">{error}</p>
            <button
              onClick={handleBackToHome}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-all duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Anime Not Found</h3>
            <p className="text-slate-400 mb-8">The anime you're looking for could not be found.</p>
            <button
              onClick={handleBackToHome}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-all duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToHome}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {anime.title?.english || anime.title?.romaji || anime.title}
              </h1>
              <p className="text-slate-400">
                Episode {currentEpisode} of {episodes.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {anime.rating && (
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">⭐</span>
              <span className="text-white font-medium">{anime.rating}</span>
            </div>
            )}
            {anime.status && (
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm font-medium rounded-full border border-cyan-500/30">
              {anime.status}
            </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player - Takes up 2/3 of the space */}
          <div className="lg:col-span-2">
            <VideoPlayer 
              currentEpisode={currentEpisode} 
              streamingLinks={streamingLinks}
              loading={episodeLoading}
            />
          </div>
          
          {/* Episode List - Takes up 1/3 of the space */}
          <div className="lg:col-span-1">
            <EpisodeList 
              episodes={episodes}
              currentEpisode={currentEpisode}
              onEpisodeSelect={handleEpisodeSelect}
            />
          </div>
        </div>

        {/* Anime Description */}
        <div className="mt-8 bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/50 p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            About {anime.title?.english || anime.title?.romaji || anime.title}
          </h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            {anime.description || 'No description available.'}
          </p>
          
          {/* Additional anime info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-700/50">
            {anime.genres && anime.genres.length > 0 && (
            <div>
              <span className="text-slate-400 text-sm">Genre:</span>
                <p className="text-white font-medium">{anime.genres.join(', ')}</p>
            </div>
            )}
            {anime.releaseDate && (
            <div>
              <span className="text-slate-400 text-sm">Year:</span>
                <p className="text-white font-medium">{new Date(anime.releaseDate).getFullYear()}</p>
            </div>
            )}
            {anime.studios && anime.studios.length > 0 && (
            <div>
              <span className="text-slate-400 text-sm">Studio:</span>
                <p className="text-white font-medium">{anime.studios.join(', ')}</p>
            </div>
            )}
            <div>
              <span className="text-slate-400 text-sm">Episodes:</span>
              <p className="text-white font-medium">{episodes.length}</p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <CommentsSection animeId={animeId} />
        </div>
      </div>
    </div>
  );
}
