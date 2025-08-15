
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnimeData } from '../hooks/useAnimeData';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { searchAnime } = useAnimeData();

  // Enhanced anime database with more details for better search
  const mockAnimes = [
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

  // Defer search logic initialization for better LCP
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100); // Small delay to prioritize main content
    return () => clearTimeout(timer);
  }, []);

  const searchAnimeLocal = useCallback((searchQuery) => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    const results = [];

    // First: Exact title matches (highest priority)
    const exactMatches = mockAnimes.filter(anime => 
      anime.title.toLowerCase() === query
    );
    results.push(...exactMatches);

    // Second: Title contains query
    const titleMatches = mockAnimes.filter(anime => 
      anime.title.toLowerCase().includes(query) && 
      !exactMatches.find(exact => exact.id === anime.id)
    );
    results.push(...titleMatches);

    // Third: Synonym matches
    const synonymMatches = mockAnimes.filter(anime => 
      anime.synonyms.some(synonym => 
        synonym.toLowerCase().includes(query)
      ) && 
      !results.find(result => result.id === anime.id)
    );
    results.push(...synonymMatches);

    // Fourth: Genre matches
    const genreMatches = mockAnimes.filter(anime => 
      anime.genre.toLowerCase().includes(query) && 
      !results.find(result => result.id === anime.id)
    );
    results.push(...genreMatches);

    // Fifth: Studio matches
    const studioMatches = mockAnimes.filter(anime => 
      anime.studio.toLowerCase().includes(query) && 
      !results.find(result => result.id === anime.id)
    );
    results.push(...studioMatches);

    // Sixth: Year matches
    const yearMatches = mockAnimes.filter(anime => 
      anime.year.toString().includes(query) && 
      !results.find(result => result.id === anime.id)
    );
    results.push(...yearMatches);

    // Seventh: Fuzzy search for similar titles
    const fuzzyMatches = mockAnimes.filter(anime => {
      const title = anime.title.toLowerCase();
      const words = query.split(' ');
      return words.some(word => 
        word.length > 2 && title.includes(word)
      ) && !results.find(result => result.id === anime.id);
    });
    results.push(...fuzzyMatches);

    return results;
  }, []);

  const handleSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      // Try real API search first
      const apiResults = await searchAnime(searchQuery, 1);
      if (apiResults?.results && apiResults.results.length > 0) {
        setSearchResults(apiResults.results);
      } else {
        // Fallback to local search
        const filtered = searchAnimeLocal(searchQuery);
        setSearchResults(filtered);
      }
    } catch (error) {
      console.error('API search failed, using local search:', error);
      // Fallback to local search
      const filtered = searchAnimeLocal(searchQuery);
      setSearchResults(filtered);
    } finally {
      setIsSearching(false);
    }
  }, [searchAnime, searchAnimeLocal]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim() && isInitialized) {
      handleSearch(value);
    } else {
      setSearchResults([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to search results page with the query
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          {/* Search icon */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Search input */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for anime, movies, or series..."
            className="w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200 shadow-lg"
          />
          
          {/* Loading indicator */}
          {isSearching && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </form>

      {/* Quick search suggestions (optional) */}
      {query.trim() && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl z-50 max-h-48 overflow-y-auto">
          <div className="p-3 border-b border-slate-700/30">
            <p className="text-xs text-slate-400">Quick results - Press Enter for full search</p>
          </div>
          {searchResults.slice(0, 3).map((anime) => (
            <div
              key={anime.id}
              onClick={() => navigate(`/anime/${anime.id}`)}
              className="p-3 hover:bg-slate-700/50 cursor-pointer transition-colors duration-200 border-b border-slate-700/30 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded flex items-center justify-center">
                  <span className="text-sm">🎬</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm truncate">
                    {anime.title?.english || anime.title?.romaji || anime.title || 'Unknown Title'}
                  </h4>
                  <p className="text-slate-400 text-xs">
                    {anime.genres?.join(', ') || anime.genre || 'Unknown Genre'} • {anime.releaseDate || anime.year || 'Unknown Year'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
