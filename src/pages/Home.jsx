
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedGrid, AnimatedGridItem, AnimatedButton } from '../components/AnimatedContainer';
import SearchBar from '../components/SearchBar';
import AnimeCard from '../components/AnimeCard';
import { useAnimeData } from '../hooks/useAnimeData';
import { useAuthContext } from '../contexts/AuthContext';
import SkeletonLoader from '../components/SkeletonLoader';

export default function Home() {
  const [activeSection, setActiveSection] = useState('trending');
  const [animeData, setAnimeData] = useState({
    trending: [],
    recent: [],
    topRated: [],
    popular: []
  });
  const [loading, setLoading] = useState(true);
  
  const { getTopAiring, getRecentEpisodes, getSeasonal } = useAnimeData();
  const { isAuthenticated } = useAuthContext();

  // Fetch anime data on component mount
  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        setLoading(true);
        
        // Fetch different types of anime data
        const [trending, recent, seasonal] = await Promise.all([
          getTopAiring(1),
          getRecentEpisodes(1),
          getSeasonal(new Date().getFullYear(), getCurrentSeason())
        ]);

        setAnimeData({
          trending: trending?.results?.slice(0, 10) || [],
          recent: recent?.results?.slice(0, 10) || [],
          topRated: trending?.results?.slice(0, 10) || [], // Using top airing as top rated
          popular: seasonal?.results?.slice(0, 10) || []
        });
      } catch (error) {
        console.error('Error fetching anime data:', error);
        // Fallback to mock data if API fails
        setAnimeData(getMockAnimeData());
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, [getTopAiring, getRecentEpisodes, getSeasonal]);

  // Helper function to get current season
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'SPRING';
    if (month >= 5 && month <= 7) return 'SUMMER';
    if (month >= 8 && month <= 10) return 'FALL';
    return 'WINTER';
  };

  // Fallback mock data
  const getMockAnimeData = () => ({
    trending: [
      { id: '1', title: 'Attack on Titan', rating: 9.0, episodes: 25, status: 'Completed', genre: 'Action, Drama, Fantasy', year: 2013, studio: 'Wit Studio', trending: true },
      { id: '2', title: 'Demon Slayer', rating: 8.8, episodes: 26, status: 'Ongoing', genre: 'Action, Fantasy, Historical', year: 2019, studio: 'ufotable', trending: true }
    ],
    recent: [
      { id: '12', title: 'Spy x Family', rating: 8.4, episodes: 25, status: 'Ongoing', genre: 'Action, Comedy, Slice of Life', year: 2022, studio: 'Wit Studio' }
    ],
    topRated: [
      { id: '7', title: 'Fullmetal Alchemist', rating: 9.3, episodes: 64, status: 'Completed', genre: 'Action, Adventure, Fantasy', year: 2003, studio: 'Bones' }
    ],
    popular: [
      { id: '4', title: 'One Piece', rating: 9.2, episodes: 1000, status: 'Ongoing', genre: 'Action, Adventure, Comedy', year: 1999, studio: 'Toei Animation' }
    ]
  });

  const sections = [
    { key: 'trending', label: '🔥 Trending Now', description: 'Currently popular anime' },
    { key: 'recent', label: '🆕 Recently Added', description: 'Latest releases' },
    { key: 'topRated', label: '⭐ Top Rated', description: 'Highest rated series' },
    { key: 'popular', label: '👀 Most Popular', description: 'Most watched anime' }
  ];

  const currentAnime = animeData[activeSection] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="mb-8">
              <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
                my𝘼nime
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Discover, watch, and track your favorite anime series and movies in one beautiful place without ads
              </p>
            </div>
            
            <div className="w-full max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Section Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                  activeSection === section.key
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-800/80 border-slate-700/50 text-slate-300 hover:bg-slate-700/80 hover:border-cyan-500/30'
                }`}
              >
                <div className="font-medium">{section.label}</div>
                <div className="text-xs opacity-80">{section.description}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {sections.find(s => s.key === activeSection)?.label}
              </h2>
              <p className="text-slate-400">
                {sections.find(s => s.key === activeSection)?.description}
              </p>
            </div>
            
            <AnimatedButton
              onClick={() => window.location.href = '/top-anime'}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              View All
            </AnimatedButton>
          </div>
        </motion.div>
        
        {/* Anime Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(10)].map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </div>
          ) : currentAnime.length > 0 ? (
            <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {currentAnime.map((anime, index) => (
                <AnimatedGridItem key={anime.id || index} delay={index * 0.1}>
                  <AnimeCard anime={anime} />
                </AnimatedGridItem>
              ))}
            </AnimatedGrid>
          ) : (
            <div className="text-center py-12">
              <div className="text-slate-400 text-lg mb-4">No anime found</div>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          )}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">15+</div>
            <div className="text-slate-400">Anime Series</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">9.0+</div>
            <div className="text-slate-400">Average Rating</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
            <div className="text-slate-400">Available</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">0</div>
            <div className="text-slate-400">Ads</div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Watching?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Join thousands of anime fans and discover your next favorite series. 
              Create an account to track your progress and build your watchlist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton
                onClick={() => window.location.href = '/login'}
                className="w-full sm:w-auto"
              >
                Get Started
              </AnimatedButton>
              <AnimatedButton
                onClick={() => window.location.href = '/categories'}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Browse Categories
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
