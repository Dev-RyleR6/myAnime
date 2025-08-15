import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AnimatedGrid, AnimatedGridItem, AnimatedButton } from '../components/AnimatedContainer';
import AnimeCard from '../components/AnimeCard';

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('genre');
  const [selectedValue, setSelectedValue] = useState('');
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced anime database
  const animeDatabase = [
    { id: '1', title: 'Attack on Titan', rating: 9.0, episodes: 25, status: 'Completed', genre: 'Action, Drama, Fantasy', year: 2013, studio: 'Wit Studio', synonyms: ['Shingeki no Kyojin', 'AoT', 'SNK'] },
    { id: '2', title: 'Demon Slayer', rating: 8.8, episodes: 26, status: 'Ongoing', genre: 'Action, Fantasy, Historical', year: 2019, studio: 'ufotable', synonyms: ['Kimetsu no Yaiba', 'KNY'] },
    { id: '3', title: 'My Hero Academia', rating: 8.5, episodes: 25, status: 'Ongoing', genre: 'Action, Comedy, Superhero', year: 2016, studio: 'Bones', synonyms: ['Boku no Hero Academia', 'BNHA', 'HeroAca'] },
    { id: '4', title: 'One Piece', rating: 9.2, episodes: 1000, status: 'Ongoing', genre: 'Action, Adventure, Comedy', year: 1999, studio: 'Toei Animation', synonyms: ['Wan Pisu', 'OP'] },
    { id: '5', title: 'Naruto Shippuden', rating: 8.7, episodes: 500, status: 'Completed', genre: 'Action, Adventure, Fantasy', year: 2007, studio: 'Studio Pierrot', synonyms: ['Naruto', 'Naruto Shipudden'] },
    { id: '6', title: 'Death Note', rating: 9.1, episodes: 37, status: 'Completed', genre: 'Mystery, Thriller, Supernatural', year: 2006, studio: 'Madhouse', synonyms: ['Desu Noto'] },
    { id: '7', title: 'Fullmetal Alchemist', rating: 9.3, episodes: 64, status: 'Completed', genre: 'Action, Adventure, Fantasy', year: 2003, studio: 'Bones', synonyms: ['FMA', 'Full Metal Alchemist', 'Hagane no Renkinjutsushi'] },
    { id: '8', title: 'Hunter x Hunter', rating: 8.9, episodes: 148, status: 'Completed', genre: 'Action, Adventure, Fantasy', year: 2011, studio: 'Madhouse', synonyms: ['HxH', 'HxH 2011'] },
    { id: '9', title: 'Steins;Gate', rating: 9.0, episodes: 24, status: 'Completed', genre: 'Sci-Fi, Thriller, Romance', year: 2011, studio: 'White Fox', synonyms: ['Steins Gate', 'SteinsGate'] },
    { id: '10', title: 'Code Geass', rating: 8.8, episodes: 25, status: 'Completed', genre: 'Action, Drama, Mecha', year: 2006, studio: 'Sunrise', synonyms: ['Code Geass: Lelouch of the Rebellion', 'Geass'] },
    { id: '11', title: 'Jujutsu Kaisen', rating: 8.6, episodes: 24, status: 'Ongoing', genre: 'Action, Fantasy, Supernatural', year: 2020, studio: 'MAPPA', synonyms: ['JJK', 'Jujutsu Kaisen'] },
    { id: '12', title: 'Spy x Family', rating: 8.4, episodes: 25, status: 'Ongoing', genre: 'Action, Comedy, Slice of Life', year: 2022, studio: 'Wit Studio', synonyms: ['Spy Family', 'Spy x Family'] },
    { id: '13', title: 'Bleach', rating: 8.2, episodes: 366, status: 'Completed', genre: 'Action, Adventure, Supernatural', year: 2004, studio: 'Studio Pierrot', synonyms: ['Burichi'] },
    { id: '14', title: 'Dragon Ball Z', rating: 8.7, episodes: 291, status: 'Completed', genre: 'Action, Adventure, Fantasy', year: 1989, studio: 'Toei Animation', synonyms: ['DBZ', 'Dragon Ball Zetto'] },
    { id: '15', title: 'Fairy Tail', rating: 8.0, episodes: 328, status: 'Completed', genre: 'Action, Adventure, Fantasy', year: 2009, studio: 'A-1 Pictures', synonyms: ['Feari Teiru'] }
  ];

  // Get unique values for each category - memoized to prevent recalculation
  const categoryOptions = useMemo(() => {
    const genres = [...new Set(animeDatabase.flatMap(anime => anime.genre.split(', ')))];
    const years = [...new Set(animeDatabase.map(anime => anime.year))].sort((a, b) => b - a);
    const studios = [...new Set(animeDatabase.map(anime => anime.studio))].sort();
    const statuses = [...new Set(animeDatabase.map(anime => anime.status))];
    
    return { genres, years, studios, statuses };
  }, []);

  // Filter anime based on selected category and value
  const filterAnime = (category, value) => {
    if (!value) return [];
    
    return animeDatabase.filter(anime => {
      switch (category) {
        case 'genre':
          return anime.genre.includes(value);
        case 'year':
          return anime.year.toString() === value;
        case 'studio':
          return anime.studio === value;
        case 'status':
          return anime.status === value;
        default:
          return false;
      }
    });
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedValue('');
    setFilteredAnime([]);
  };

  // Handle value change
  const handleValueChange = (value) => {
    setSelectedValue(value);
    
    if (value) {
      setIsLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        const filtered = filterAnime(selectedCategory, value);
        setFilteredAnime(filtered);
        setIsLoading(false);
      }, 300);
    } else {
      setFilteredAnime([]);
    }
  };

  const categories = [
    { key: 'genre', label: 'Genre', icon: '🎭', description: 'Browse by anime genre' },
    { key: 'year', label: 'Year', icon: '📅', description: 'Browse by release year' },
    { key: 'studio', label: 'Studio', icon: '🎨', description: 'Browse by animation studio' },
    { key: 'status', label: 'Status', icon: '📊', description: 'Browse by completion status' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            🗂️ Browse Categories
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover amazing anime by exploring different categories. 
            Find your next favorite series based on genre, year, studio, or status.
          </p>
        </motion.div>

        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.key}
                onClick={() => handleCategoryChange(category.key)}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                  selectedCategory === category.key
                    ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                    : 'border-slate-700/50 bg-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-700/80 text-slate-300 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{category.label}</h3>
                <p className="text-sm opacity-80">{category.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Value Selection */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/50 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Select {categories.find(c => c.key === selectedCategory)?.label}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {categoryOptions[selectedCategory + 's']?.map((option) => (
                  <motion.button
                    key={option}
                    onClick={() => handleValueChange(option)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      selectedValue === option
                        ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                        : 'border-slate-600/50 bg-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {selectedValue && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedValue} Anime
              </h2>
              <p className="text-slate-400">
                Found {filteredAnime.length} anime in this category
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <p className="text-slate-400">Loading anime...</p>
              </div>
            ) : filteredAnime.length > 0 ? (
              <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredAnime.map((anime, index) => (
                  <AnimatedGridItem key={anime.id}>
                    <AnimeCard anime={anime} />
                  </AnimatedGridItem>
                ))}
              </AnimatedGrid>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No Results Found</h3>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                  No anime found for "{selectedValue}" in the {selectedCategory} category. 
                  Try selecting a different value or category.
                </p>
                <AnimatedButton
                  onClick={() => {
                    setSelectedValue('');
                    setFilteredAnime([]);
                  }}
                  variant="secondary"
                >
                  Clear Selection
                </AnimatedButton>
              </div>
            )}
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl mb-2">🎬</div>
            <div className="text-2xl font-bold text-white">{animeDatabase.length}</div>
            <div className="text-slate-400">Total Anime</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl mb-2">🎭</div>
            <div className="text-2xl font-bold text-white">{categoryOptions.genres.length}</div>
            <div className="text-slate-400">Genres</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl mb-2">🎨</div>
            <div className="text-2xl font-bold text-white">{categoryOptions.studios.length}</div>
            <div className="text-slate-400">Studios</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-2xl font-bold text-white">{categoryOptions.years.length}</div>
            <div className="text-slate-400">Years</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
