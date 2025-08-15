import React from 'react';

// Skeleton for anime cards
export const AnimeCardSkeleton = () => (
  <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/50 overflow-hidden animate-pulse">
    {/* Image placeholder */}
    <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-600"></div>
    
    {/* Content */}
    <div className="p-4">
      {/* Title */}
      <div className="h-6 bg-slate-700 rounded mb-3"></div>
      
      {/* Rating and episodes */}
      <div className="flex justify-between items-center mb-3">
        <div className="h-4 w-16 bg-slate-700 rounded"></div>
        <div className="h-4 w-20 bg-slate-700 rounded"></div>
      </div>
      
      {/* Status */}
      <div className="h-5 w-24 bg-slate-700 rounded"></div>
    </div>
  </div>
);

// Skeleton for text content
export const TextSkeleton = ({ lines = 3, className = "" }) => (
  <div className={className}>
    {Array.from({ length: lines }).map((_, index) => (
      <div
        key={index}
        className={`h-4 bg-slate-700 rounded mb-2 ${
          index === lines - 1 ? 'w-3/4' : 'w-full'
        }`}
      ></div>
    ))}
  </div>
);

// Skeleton for search results
export const SearchResultSkeleton = () => (
  <div className="p-4 border-b border-slate-700/30 last:border-b-0 animate-pulse">
    <div className="flex items-center space-x-3">
      {/* Image placeholder */}
      <div className="w-8 h-10 bg-slate-700 rounded flex-shrink-0"></div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="h-4 bg-slate-700 rounded mb-2 w-3/4"></div>
        <div className="h-3 bg-slate-700 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

// Skeleton for video player
export const VideoPlayerSkeleton = () => (
  <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/50 p-6 animate-pulse">
    {/* Video placeholder */}
    <div className="w-full h-96 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl mb-4"></div>
    
    {/* Episode title */}
    <div className="h-6 bg-slate-700 rounded mb-3 w-1/2"></div>
    
    {/* Controls */}
    <div className="flex items-center justify-between">
      <div className="h-10 bg-slate-700 rounded w-32"></div>
      <div className="h-10 bg-slate-700 rounded w-10"></div>
    </div>
  </div>
);

// Skeleton for episode list
export const EpisodeListSkeleton = () => (
  <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/50 p-6 animate-pulse">
    {/* Header */}
    <div className="h-6 bg-slate-700 rounded mb-4 w-1/3"></div>
    
    {/* Episodes grid */}
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="h-12 bg-slate-700 rounded"></div>
      ))}
    </div>
  </div>
);

// Skeleton for filters
export const FilterSkeleton = () => (
  <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/50 p-6 animate-pulse">
    {/* Title */}
    <div className="h-6 bg-slate-700 rounded mb-4 w-1/4"></div>
    
    {/* Filter options */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="h-10 bg-slate-700 rounded"></div>
      ))}
    </div>
  </div>
);

// Main skeleton component
export default function SkeletonLoader({ type = 'anime', ...props }) {
  switch (type) {
    case 'anime':
      return <AnimeCardSkeleton {...props} />;
    case 'text':
      return <TextSkeleton {...props} />;
    case 'search':
      return <SearchResultSkeleton {...props} />;
    case 'video':
      return <VideoPlayerSkeleton {...props} />;
    case 'episodes':
      return <EpisodeListSkeleton {...props} />;
    case 'filters':
      return <FilterSkeleton {...props} />;
    default:
      return <AnimeCardSkeleton {...props} />;
  }
}
