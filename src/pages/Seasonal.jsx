import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AnimatedGrid, AnimatedGridItem, AnimatedButton } from '../components/AnimatedContainer';
import AnimeCard from '../components/AnimeCard';

export default function Seasonal() {
  const [selectedSeason, setSelectedSeason] = useState('current');
  const [selectedYear, setSelectedYear] = useState(2024);

  // Enhanced seasonal anime database
  const seasonalAnime = {
    current: [
      { id: 's1', title: 'Demon Slayer: Hashira Training Arc', rating: 9.1, episodes: 8, status: 'Airing', genre: 'Action, Fantasy, Historical', year: 2024, studio: 'ufotable', season: 'Winter 2024', airingDay: 'Sunday', episodeCount: 8, currentEpisode: 3, trending: true },
      { id: 's2', title: 'Spy x Family Season 2', rating: 8.8, episodes: 12, status: 'Airing', genre: 'Action, Comedy, Slice of Life', year: 2024, studio: 'Wit Studio', season: 'Winter 2024', airingDay: 'Saturday', episodeCount: 12, currentEpisode: 5, trending: true },
      { id: 's3', title: 'Jujutsu Kaisen Season 3', rating: 9.0, episodes: 24, status: 'Airing', genre: 'Action, Fantasy, Supernatural', year: 2024, studio: 'MAPPA', season: 'Winter 2024', airingDay: 'Thursday', episodeCount: 24, currentEpisode: 8, trending: true },
      { id: 's4', title: 'One Piece: Egghead Arc', rating: 8.9, episodes: 50, status: 'Airing', genre: 'Action, Adventure, Comedy', year: 2024, studio: 'Toei Animation', season: 'Winter 2024', airingDay: 'Sunday', episodeCount: 50, currentEpisode: 15, trending: false },
      { id: 's5', title: 'My Hero Academia Season 7', rating: 8.6, episodes: 25, status: 'Airing', genre: 'Action, Comedy, Superhero', year: 2024, studio: 'Bones', season: 'Winter 2024', airingDay: 'Saturday', episodeCount: 25, currentEpisode: 12, trending: false }
    ],
    upcoming: [
      { id: 'u1', title: 'Attack on Titan: Final Season Part 3', rating: 0, episodes: 1, status: 'Upcoming', genre: 'Action, Drama, Fantasy', year: 2024, studio: 'MAPPA', season: 'Spring 2024', airingDay: 'TBA', episodeCount: 1, currentEpisode: 0, trending: true },
      { id: 'u2', title: 'Demon Slayer: Infinity Castle Arc', rating: 0, episodes: 26, status: 'Upcoming', genre: 'Action, Fantasy, Historical', year: 2024, studio: 'ufotable', season: 'Summer 2024', airingDay: 'TBA', episodeCount: 26, currentEpisode: 0, trending: true },
      { id: 'u3', title: 'One Punch Man Season 3', rating: 0, episodes: 12, status: 'Upcoming', genre: 'Action, Comedy, Superhero', year: 2024, studio: 'MAPPA', season: 'Fall 2024', airingDay: 'TBA', episodeCount: 12, currentEpisode: 0, trending: true },
      { id: 'u4', title: 'Hunter x Hunter: Dark Continent', rating: 0, episodes: 50, status: 'Upcoming', genre: 'Action, Adventure, Fantasy', year: 2024, studio: 'Madhouse', season: 'TBA 2024', airingDay: 'TBA', episodeCount: 50, currentEpisode: 0, trending: false },
      { id: 'u5', title: 'Bleach: Thousand-Year Blood War Part 3', rating: 0, episodes: 13, status: 'Upcoming', genre: 'Action, Adventure, Supernatural', year: 2024, studio: 'Studio Pierrot', season: 'Summer 2024', airingDay: 'TBA', episodeCount: 13, currentEpisode: 0, trending: false }
    ],
    winter2024: [
      { id: 'w1', title: 'Demon Slayer: Hashira Training Arc', rating: 9.1, episodes: 8, status: 'Airing', genre: 'Action, Fantasy, Historical', year: 2024, studio: 'ufotable', season: 'Winter 2024', airingDay: 'Sunday', episodeCount: 8, currentEpisode: 3, trending: true },
      { id: 'w2', title: 'Spy x Family Season 2', rating: 8.8, episodes: 12, status: 'Airing', genre: 'Action, Comedy, Slice of Life', year: 2024, studio: 'Wit Studio', season: 'Winter 2024', airingDay: 'Saturday', episodeCount: 12, currentEpisode: 5, trending: true },
      { id: 'w3', title: 'Jujutsu Kaisen Season 3', rating: 9.0, episodes: 24, status: 'Airing', genre: 'Action, Fantasy, Supernatural', year: 2024, studio: 'MAPPA', season: 'Winter 2024', airingDay: 'Thursday', episodeCount: 24, currentEpisode: 8, trending: true },
      { id: 'w4', title: 'One Piece: Egghead Arc', rating: 8.9, episodes: 50, status: 'Airing', genre: 'Action, Adventure, Comedy', year: 2024, studio: 'Toei Animation', season: 'Winter 2024', airingDay: 'Sunday', episodeCount: 50, currentEpisode: 15, trending: false },
      { id: 'w5', title: 'My Hero Academia Season 7', rating: 8.6, episodes: 25, status: 'Airing', genre: 'Action, Comedy, Superhero', year: 2024, studio: 'Bones', season: 'Winter 2024', airingDay: 'Saturday', episodeCount: 25, currentEpisode: 12, trending: false }
    ],
    spring2024: [
      { id: 'sp1', title: 'Attack on Titan: Final Season Part 3', rating: 0, episodes: 1, status: 'Upcoming', genre: 'Action, Drama, Fantasy', year: 2024, studio: 'MAPPA', season: 'Spring 2024', airingDay: 'TBA', episodeCount: 1, currentEpisode: 0, trending: true },
      { id: 'sp2', title: 'Demon Slayer: Infinity Castle Arc', rating: 0, episodes: 26, status: 'Upcoming', genre: 'Action, Fantasy, Historical', year: 2024, studio: 'ufotable', season: 'Spring 2024', airingDay: 'TBA', episodeCount: 26, currentEpisode: 0, trending: true },
      { id: 'sp3', title: 'One Punch Man Season 3', rating: 0, episodes: 12, status: 'Upcoming', genre: 'Action, Comedy, Superhero', year: 2024, studio: 'MAPPA', season: 'Spring 2024', airingDay: 'TBA', episodeCount: 12, currentEpisode: 0, trending: true }
    ]
  };

  const seasons = [
    { key: 'current', label: '❄️ Current Season', description: 'Winter 2024' },
    { key: 'upcoming', label: '🌸 Upcoming', description: 'Next releases' },
    { key: 'winter2024', label: '❄️ Winter 2024', description: 'January - March' },
    { key: 'spring2024', label: '🌸 Spring 2024', description: 'April - June' }
  ];

  const years = [2024, 2023, 2022, 2021, 2020];

  const currentAnime = seasonalAnime[selectedSeason] || [];

  const getSeasonTheme = (season) => {
    switch (season) {
      case 'current':
      case 'winter2024':
        return {
          gradient: 'from-blue-500/20 via-cyan-500/20 to-indigo-500/20',
          border: 'border-blue-500/30',
          accent: 'text-blue-400'
        };
      case 'spring2024':
        return {
          gradient: 'from-pink-500/20 via-purple-500/20 to-rose-500/20',
          border: 'border-pink-500/30',
          accent: 'text-pink-400'
        };
      case 'upcoming':
        return {
          gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
          border: 'border-green-500/30',
          accent: 'text-green-400'
        };
      default:
        return {
          gradient: 'from-slate-500/20 via-gray-500/20 to-zinc-500/20',
          border: 'border-slate-500/30',
          accent: 'text-slate-400'
        };
    }
  };

  const theme = getSeasonTheme(selectedSeason);

  const getAiringStatus = (anime) => {
    if (anime.status === 'Upcoming') return 'Coming Soon';
    if (anime.currentEpisode === anime.episodeCount) return 'Final Episode';
    return `Episode ${anime.currentEpisode}/${anime.episodeCount}`;
  };

  const getAiringProgress = (anime) => {
    if (anime.status === 'Upcoming') return 0;
    return (anime.currentEpisode / anime.episodeCount) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with seasonal theme */}
      <div className={`relative overflow-hidden bg-gradient-to-r ${theme.gradient} border-b ${theme.border}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80" />
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4">🌸 Seasonal Anime</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Discover the latest seasonal releases, track airing schedules, and never miss your favorite shows
            </p>
          </motion.div>

          {/* Season Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {seasons.map((season) => (
                <button
                  key={season.key}
                  onClick={() => setSelectedSeason(season.key)}
                  className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                    selectedSeason === season.key
                      ? `bg-${theme.accent.split('-')[1]}-500/20 border-${theme.accent.split('-')[1]}-500/50 text-${theme.accent.split('-')[1]}-400 shadow-lg shadow-${theme.accent.split('-')[1]}-500/10`
                      : 'bg-slate-800/80 border-slate-700/50 text-slate-300 hover:bg-slate-700/80 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="font-medium">{season.label}</div>
                  <div className="text-xs opacity-80">{season.description}</div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Year Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-slate-300">Year:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-4 py-2 bg-slate-800/80 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {seasons.find(s => s.key === selectedSeason)?.label}
              </h2>
              <p className="text-slate-400">
                {currentAnime.length} anime • {selectedYear}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <AnimatedButton
                onClick={() => setSelectedSeason('current')}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                View Current
              </AnimatedButton>
            </div>
          </div>
        </motion.div>

        {/* Anime Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        >
          {currentAnime.length > 0 ? (
            <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {currentAnime.map((anime, index) => (
                <AnimatedGridItem key={anime.id} delay={index * 0.1}>
                  <div className="relative group">
                    <AnimeCard anime={anime} />
                    
                    {/* Airing Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${
                        anime.status === 'Airing' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }`}>
                        {anime.status}
                      </span>
                    </div>

                    {/* Episode Progress */}
                    {anime.status === 'Airing' && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-900/90 to-transparent">
                        <div className="flex items-center justify-between text-xs text-white mb-1">
                          <span>{getAiringStatus(anime)}</span>
                          <span>{anime.airingDay}</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-1">
                          <div 
                            className="bg-cyan-500 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${getAiringProgress(anime)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </AnimatedGridItem>
              ))}
            </AnimatedGrid>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🌸</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Seasonal Anime</h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                No anime found for the selected season and year. Try changing the season or year.
              </p>
              <AnimatedButton
                onClick={() => setSelectedSeason('current')}
                variant="secondary"
              >
                View Current Season
              </AnimatedButton>
            </div>
          )}
        </motion.div>

        {/* Seasonal Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">
              {currentAnime.filter(a => a.status === 'Airing').length}
            </div>
            <div className="text-slate-400">Currently Airing</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {currentAnime.filter(a => a.status === 'Upcoming').length}
            </div>
            <div className="text-slate-400">Upcoming</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {currentAnime.filter(a => a.trending).length}
            </div>
            <div className="text-slate-400">Trending</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {Math.round(currentAnime.reduce((sum, anime) => sum + (anime.rating || 0), 0) / currentAnime.filter(a => a.rating > 0).length * 10) / 10}
            </div>
            <div className="text-slate-400">Avg Rating</div>
          </div>
        </motion.div>

        {/* Seasonal Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="mt-16"
        >
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-6">📅 Airing Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                <div key={day} className="text-center">
                  <h4 className="font-medium text-slate-300 mb-3">{day}</h4>
                  <div className="space-y-2">
                    {currentAnime
                      .filter(anime => anime.airingDay === day && anime.status === 'Airing')
                      .map((anime) => (
                        <div
                          key={anime.id}
                          className="p-2 bg-slate-700/30 rounded-lg border border-slate-600/30 text-xs"
                        >
                          <div className="font-medium text-white truncate">{anime.title}</div>
                          <div className="text-slate-400">Ep {anime.currentEpisode}</div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
