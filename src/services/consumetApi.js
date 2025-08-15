// Consumet API service for anime data and streaming
const CONSUMET_BASE_URL = 'https://api.consumet.org/anime/gogoanime';

class ConsumetApiService {
  // Search anime by query
  async searchAnime(query, page = 1) {
    try {
      const response = await fetch(`${CONSUMET_BASE_URL}/${encodeURIComponent(query)}?page=${page}`);
      if (!response.ok) throw new Error('Search failed');
      return await response.json();
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  // Get anime info by ID
  async getAnimeInfo(animeId) {
    try {
      const response = await fetch(`${CONSUMET_BASE_URL}/info/${animeId}`);
      if (!response.ok) throw new Error('Failed to fetch anime info');
      return await response.json();
    } catch (error) {
      console.error('Anime info error:', error);
      throw error;
    }
  }

  // Get streaming links for an episode
  async getStreamingLinks(animeId, episodeId) {
    try {
      const response = await fetch(`${CONSUMET_BASE_URL}/watch/${animeId}/${episodeId}`);
      if (!response.ok) throw new Error('Failed to fetch streaming links');
      return await response.json();
    } catch (error) {
      console.error('Streaming links error:', error);
      throw error;
    }
  }

  // Get recent episodes
  async getRecentEpisodes(page = 1) {
    try {
      const response = await fetch(`${CONSUMET_BASE_URL}/recent-episodes?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch recent episodes');
      return await response.json();
    } catch (error) {
      console.error('Recent episodes error:', error);
      throw error;
    }
  }

  // Get top airing anime
  async getTopAiring(page = 1) {
    try {
      const response = await fetch(`${CONSUMET_BASE_URL}/top-airing?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch top airing');
      return await response.json();
    } catch (error) {
      console.error('Top airing error:', error);
      throw error;
    }
  }

  // Get seasonal anime
  async getSeasonal(year, season) {
    try {
      const response = await fetch(`${CONSUMET_BASE_URL}/seasonal?year=${year}&season=${season}`);
      if (!response.ok) throw new Error('Failed to fetch seasonal anime');
      return await response.json();
    } catch (error) {
      console.error('Seasonal anime error:', error);
      throw error;
    }
  }

  // Get anime by genre
  async getAnimeByGenre(genre, page = 1) {
    try {
      const response = await fetch(`${CONSUMET_BASE_URL}/genre/${encodeURIComponent(genre)}?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch genre anime');
      return await response.json();
    } catch (error) {
      console.error('Genre anime error:', error);
      throw error;
    }
  }
}

export default new ConsumetApiService();
