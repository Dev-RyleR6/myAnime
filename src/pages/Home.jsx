
import SearchBar from '../components/SearchBar';
import AnimeCard from '../components/AnimeCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <header className="text-center mb-16">
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
          </header>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Popular Anime</h2>
          <p className="text-slate-400">Trending shows you might like</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <AnimeCard key={i} />
          ))}
        </div>
        
        {/* Load more button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-white font-medium rounded-xl border border-slate-700/50 transition-all duration-200 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
