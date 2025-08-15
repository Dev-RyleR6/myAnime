import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AnimatedGrid, AnimatedGridItem, AnimatedButton } from '../components/AnimatedContainer';
import AnimeCard from '../components/AnimeCard';

export default function TopAnime() {
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [sortBy, setSortBy] = useState('rating');

  // Enhanced anime database with more details
  const animeDatabase = [
    { id: '1', title: 'Attack on Titan', rating: 9.0, episodes: 25, status: 'Completed', genre: 'Action, Drama, Fantasy', year: 2013, studio: 'Wit Studio', views: 1500000, trending: true },
    { id: '2', title: 'Demon Slayer', rating: 8.8, episodes: 26, status: 'Ongoing', genre: 'Action, Fantasy, Historical', year: 2019, studio: 'ufotable', views: 1200000, trending: true },
    { id: '3', title: 'My Hero Academia', rating: 8.5, episodes: 25, status: 'Ongoing', genre: 'Action, Comedy, Superhero', year: 2016, studio: 'Bones', views: 980000, trending: true },
    { id: '4', title: 'One Piece', rating: 9.2, episodes: 1000, status: 'Ongoing', genre: 'Action, Adventure, Comedy', year: 1999, studio: 'Toei Animation', views: 2000000, trending: false },
    { id: '5', title: 'Naruto Shippuden', rating: 8.7, episodes: 500, status: 'Completed', genre: 'Action, Adventure, Fantasy', year: 2007, studio: 'Studio Pierrot', views: 1800000, trending: false },
    { id: '6', title: 'Death Note', rating: 9.1, episodes: 37, status: 'Completed', genre: 'Mystery, Thriller, Supernatural', year: 2006, studio: 'Madhouse', views: 1100000, trending: false },
    { id: '7', title: 'Fullmetal Alchemist', rating: 9.3, episodes: 64, status: 'Completed', genre: 'Action, Adventure, Fantasy', year: 2003, studio: 'Bones', views: 950000, trending: false },
    { id: '8', title: 'Hunter x Hunter', rating: 8.9, episodes: 148, status: 'Completed', genre: 'Action, Adventure, Fantasy', year: 2011, studio: 'Madhouse', views: 850000, trending: false },
    { id: '9', title: 'Steins;Gate', rating: 9.0, episodes: 24, status: 'Completed', genre: 'Sci-Fi, Thriller, Romance', year: 2011, studio: 'White Fox', views: 750000, trending: false },
    { id: '10', title: 'Code Geass', rating: 8.8, episodes: 25, status: 'Completed', genre: 'Action, Drama, Mecha', year: 2006, studio: 'Sunrise', views: 700000, trending: false },
    { id: '11', title: 'Jujutsu Kaisen', rating: 8.6, episodes: 24, status: 'Ongoing', genre: 'Action, Fantasy, Supernatural', year: 2020, studio: 'MAPPA', views: 1300000, trending: true },
    { id: '12', title: 'Spy x Family', rating: 8.4, episodes: 25, status: 'Ongoing', genre: 'Action, Comedy, Slice of Life', year: 2022, studio: 'Wit Studio', views: 1400000, trending: true },
    { id: '13', title: 'Bleach', rating: 8.2, episodes: 366, status: 'Completed', genre: 'Action, Adventure, Supernatural', year: 2004, studio: 'Studio Pierrot', views: 1600000, trending: false },
    { id: '14', title: 'Dragon Ball Z', rating: 8.7, episodes: 291, status: 'Completed', genre: 'Action, Adventure, Fantasy', year: 1989, studio: 'Toei Animation', views: 1700000, trending: false },
    { id: '15', title: 'Fairy Tail', rating: 8.0, episodes: 328, status: 'Completed', genre: 'Action, Adventure, Fantasy', year: 2009, studio: 'A-1 Pictures', views: 900000, trending: false }
  ];

  // Filter and sort anime based on selected category and sort option
  const filteredAndSortedAnime = useMemo(() => {
    let filtered = [...animeDatabase];

    // Filter by category
    switch (selectedCategory) {
      case 'trending':
        filtered = filtered.filter(anime => anime.trending);
        break;
      case 'highest-rated':
        filtered = filtered.filter(anime => anime.rating >= 8.5);
        break;
      case 'most-watched':
        filtered = filtered.filter(anime => anime.views >= 1000000);
        break;
      case 'completed':
        filtered = filtered.filter(anime => anime.status === 'Completed');
        break;
      case 'ongoing':
        filtered = filtered.filter(anime => anime.status === 'Ongoing');
        break;
      case 'recent':
        filtered = filtered.filter(anime => anime.year >= 2020);
        break;
      default:
        break;
    }

    // Sort by selected criteria
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'year':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'episodes':
        filtered.sort((a, b) => b.episodes - a.episodes);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  const categories = [
    { key: 'trending', label: '🔥 Trending Now', description: 'Currently popular anime' },
    { key: 'highest-rated', label: '⭐ Highest Rated', description: 'Top-rated anime series' },
    { key: 'most-watched', label: '👀 Most Watched', description: 'Most viewed anime' },
    { key: 'completed', label: '✅ Completed', description: 'Finished series' },
    { key: 'ongoing', label: '📺 Ongoing', description: 'Currently airing' },
    { key: 'recent', label: '🆕 Recent', description: 'Latest releases' }
  ];

  const sortOptions = [
    { value: 'rating', label: 'Rating' },
    { value: 'views', label: 'Views' },
    { value: 'year', label: 'Year' },
    { value: 'episodes', label: 'Episodes' },
    { value: 'title', label: 'Title' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">🏆 Top Anime</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover the best anime series and movies ranked by popularity, ratings, and more
          </p>
        </motion.div>

        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  selectedCategory === category.key
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-800/80 border-slate-700/50 text-slate-300 hover:bg-slate-700/80 hover:border-cyan-500/30'
                }`}
              >
                <div className="text-lg mb-1">{category.label.split(' ')[0]}</div>
                <div className="text-xs opacity-80">{category.description}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Sort Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {categories.find(cat => cat.key === selectedCategory)?.label}
            </h2>
            <p className="text-slate-400">
              Showing {filteredAndSortedAnime.length} anime
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-slate-300">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-slate-800/80 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Anime Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          {filteredAndSortedAnime.length > 0 ? (
            <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredAndSortedAnime.map((anime, index) => (
                <AnimatedGridItem key={anime.id} delay={index * 0.1}>
                  <div className="relative">
                    <AnimeCard anime={anime} />
                    {/* Rank badge for top 10 */}
                    {index < 10 && (
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        #{index + 1}
                      </div>
                    )}
                  </div>
                </AnimatedGridItem>
              ))}
            </AnimatedGrid>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🏆</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Anime Found</h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                No anime match the selected criteria. Try changing the category or sort option.
              </p>
              <AnimatedButton
                onClick={() => setSelectedCategory('trending')}
                variant="secondary"
              >
                Show Trending
              </AnimatedButton>
            </div>
          )}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">
              {animeDatabase.length}
            </div>
            <div className="text-slate-400">Total Anime</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {animeDatabase.filter(anime => anime.rating >= 9.0).length}
            </div>
            <div className="text-slate-400">9+ Rated</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {animeDatabase.filter(anime => anime.status === 'Ongoing').length}
            </div>
            <div className="text-slate-400">Currently Airing</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
