import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedGrid, AnimatedGridItem, AnimatedButton } from '../components/AnimatedContainer';
import AnimeCard from '../components/AnimeCard';
import { useAnimeData } from '../hooks/useAnimeData';
import SkeletonLoader from '../components/SkeletonLoader';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const query = searchParams.get('q') || '';
  const { searchAnime } = useAnimeData();

  // Perform search when query changes
  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setCurrentPage(1);

        const data = await searchAnime(query, 1);
        setSearchResults(data.results || []);
        setHasMore(data.hasNextPage || false);
      } catch (error) {
        console.error('Search error:', error);
        setError('Failed to perform search. Please try again.');
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query, searchAnime]);

  // Load more results
  const loadMore = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      const data = await searchAnime(query, nextPage);
      
      if (data.results && data.results.length > 0) {
        setSearchResults(prev => [...prev, ...data.results]);
        setCurrentPage(nextPage);
        setHasMore(data.hasNextPage || false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Load more error:', error);
      setError('Failed to load more results.');
    } finally {
      setLoading(false);
    }
  };

  if (!query.trim()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔍</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Search Anime</h1>
            <p className="text-lg text-slate-300 mb-8">
              Enter a search term to find your favorite anime
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Search Results for "{query}"
          </h1>
          <p className="text-lg text-slate-300">
            {loading ? 'Searching...' : `${searchResults.length} results found`}
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Search Error</h3>
            <p className="text-slate-400 mb-8">{error}</p>
                <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-all duration-200"
            >
              Try Again
                </button>
              </div>
        )}

        {/* Loading State */}
        {loading && searchResults.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
                <SkeletonLoader className="w-full h-48" />
                <div className="p-4 space-y-2">
                  <SkeletonLoader className="h-4 w-3/4" />
                  <SkeletonLoader className="h-3 w-1/2" />
              </div>
            </div>
            ))}
              </div>
            )}

        {/* Results */}
        {!loading && !error && (
          <>
            {searchResults.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🔍</span>
            </div>
                <h3 className="text-xl font-bold text-white mb-4">No Results Found</h3>
                <p className="text-slate-400 mb-8">
                  Try searching with different keywords or check your spelling
                </p>
          </div>
            ) : (
              <>
                <AnimatedGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {searchResults.map((anime, index) => (
                    <AnimatedGridItem key={anime.id || index} delay={index * 0.1}>
                      <AnimeCard anime={anime} />
                    </AnimatedGridItem>
                  ))}
                </AnimatedGrid>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-12">
                    <AnimatedButton
                      onClick={loadMore}
                      disabled={loading}
                      className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Loading...' : 'Load More Results'}
                    </AnimatedButton>
          </div>
        )}

                {/* End of Results */}
                {!hasMore && searchResults.length > 0 && (
                  <div className="text-center mt-12">
                    <p className="text-slate-400">You've reached the end of the results</p>
          </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
