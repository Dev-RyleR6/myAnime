import { useState, useEffect, useCallback } from 'react';
import consumetApi from '../services/consumetApi';

export const useAnimeData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search anime
  const searchAnime = useCallback(async (query, page = 1) => {
    if (!query.trim()) return { results: [] };
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await consumetApi.searchAnime(query, page);
      return data;
    } catch (err) {
      setError(err.message);
      return { results: [], error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get anime info
  const getAnimeInfo = useCallback(async (animeId) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await consumetApi.getAnimeInfo(animeId);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get streaming links
  const getStreamingLinks = useCallback(async (animeId, episodeId) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await consumetApi.getStreamingLinks(animeId, episodeId);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get recent episodes
  const getRecentEpisodes = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await consumetApi.getRecentEpisodes(page);
      return data;
    } catch (err) {
      setError(err.message);
      return { results: [], error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get top airing
  const getTopAiring = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await consumetApi.getTopAiring(page);
      return data;
    } catch (err) {
      setError(err.message);
      return { results: [], error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get seasonal anime
  const getSeasonal = useCallback(async (year, season) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await consumetApi.getSeasonal(year, season);
      return data;
    } catch (err) {
      setError(err.message);
      return { results: [], error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get anime by genre
  const getAnimeByGenre = useCallback(async (genre, page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await consumetApi.getAnimeByGenre(genre, page);
      return data;
    } catch (err) {
      setError(err.message);
      return { results: [], error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    searchAnime,
    getAnimeInfo,
    getStreamingLinks,
    getRecentEpisodes,
    getTopAiring,
    getSeasonal,
    getAnimeByGenre,
    clearError
  };
};
