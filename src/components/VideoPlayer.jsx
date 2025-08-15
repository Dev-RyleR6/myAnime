import { useState, useEffect, useRef } from 'react';
import SkeletonLoader from './SkeletonLoader';

export default function VideoPlayer({ currentEpisode = 1, streamingLinks = null, loading = false }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('auto');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen();
      }
      if (e.key === ' ' && videoRef.current) {
        e.preventDefault();
        togglePlay();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Reset video error when streaming links change
  useEffect(() => {
    setVideoError(null);
  }, [streamingLinks]);

  // Get the best quality video source
  const getVideoSource = () => {
    if (!streamingLinks || !streamingLinks.sources) {
      console.log('No streaming links available:', streamingLinks);
      return null;
    }
    
    const sources = streamingLinks.sources;
    console.log('Available sources:', sources);
    
    // Try to find the best quality
    const qualityOrder = ['1080p', '720p', '480p', '360p', 'auto'];
    
    for (const quality of qualityOrder) {
      const source = sources.find(s => s.quality === quality);
      if (source) {
        console.log('Selected source:', source);
        return source;
      }
    }
    
    // Fallback to first available source
    const fallbackSource = sources[0];
    console.log('Fallback source:', fallbackSource);
    return fallbackSource || null;
  };

  const handleVideoError = (error) => {
    console.error('Video error:', error);
    setVideoError('Failed to load video. Please try again.');
  };

  const videoSource = getVideoSource();
  const episodeTitle = streamingLinks?.episodeTitle || `Episode ${currentEpisode}`;

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative w-full aspect-video bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-300">Loading episode...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Video container */}
      <div 
        ref={videoContainerRef}
        className="relative w-full aspect-video bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden group"
      >
        {videoSource && !videoError ? (
          // Real video player
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              autoPlay={false}
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={handleVideoError}
              crossOrigin="anonymous"
            >
              <source src={videoSource.url} type="video/mp4" />
              <source src={videoSource.url} type="video/webm" />
              Your browser does not support the video tag.
            </video>
            
            {/* Custom controls overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-2">{episodeTitle}</h3>
                    <p className="text-slate-300 text-sm">
                      {videoSource.quality} • {streamingLinks?.subtitle ? 'Subtitles Available' : 'No Subtitles'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={togglePlay}
                      className="w-12 h-12 bg-cyan-500 hover:bg-cyan-600 rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      {isPlaying ? (
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Placeholder when no video source or error
          <>
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700/50 via-slate-600/30 to-slate-800/50" />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="group-hover:scale-110 transition-transform duration-300">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/25 group-hover:shadow-cyan-400/40 transition-all duration-300">
                  <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Video info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2">{episodeTitle}</h3>
                  <p className="text-slate-300 text-sm">
                    {videoError ? videoError : (streamingLinks ? 'Video source not available' : 'Click to start watching')}
                  </p>
                  {videoSource && (
                    <p className="text-xs text-slate-400 mt-1">
                      Source: {videoSource.url.substring(0, 50)}...
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-slate-300 text-sm">
                    <span>HD</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Video controls */}
      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <div className="flex items-center space-x-4">
          {videoSource && !videoError ? (
            <span>Video loaded successfully</span>
          ) : videoError ? (
            <span className="text-red-400">Video error: {videoError}</span>
          ) : (
            <span>Video player coming soon...</span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {videoSource && (
            <>
              <div className="flex items-center space-x-2">
                <span>Quality: {videoSource.quality}</span>
                <span>•</span>
                <span>Speed: {playbackSpeed}x</span>
              </div>
            </>
          )}
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200 hover:text-white"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
