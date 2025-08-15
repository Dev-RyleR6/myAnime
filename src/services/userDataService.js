import { 
  doc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  setDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

class UserDataService {
  // Add anime to favorites
  async addToFavorites(userId, animeId, animeData) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        favorites: arrayUnion({
          animeId,
          addedAt: new Date(),
          ...animeData
        })
      });
    } catch (error) {
      console.error('Add to favorites error:', error);
      throw error;
    }
  }

  // Remove anime from favorites
  async removeFromFavorites(userId, animeId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      
      const updatedFavorites = userData.favorites.filter(
        fav => fav.animeId !== animeId
      );
      
      await updateDoc(userRef, { favorites: updatedFavorites });
    } catch (error) {
      console.error('Remove from favorites error:', error);
      throw error;
    }
  }

  // Get user favorites
  async getFavorites(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      return userData?.favorites || [];
    } catch (error) {
      console.error('Get favorites error:', error);
      throw error;
    }
  }

  // Add to watch history
  async addToWatchHistory(userId, animeId, episodeId, episodeData) {
    try {
      const userRef = doc(db, 'users', userId);
      const watchEntry = {
        animeId,
        episodeId,
        watchedAt: new Date(),
        ...episodeData
      };
      
      await updateDoc(userRef, {
        watchHistory: arrayUnion(watchEntry)
      });
    } catch (error) {
      console.error('Add to watch history error:', error);
      throw error;
    }
  }

  // Get watch history
  async getWatchHistory(userId, limit = 50) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      const history = userData?.watchHistory || [];
      
      // Sort by most recent and limit results
      return history
        .sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt))
        .slice(0, limit);
    } catch (error) {
      console.error('Get watch history error:', error);
      throw error;
    }
  }

  // Remove from watch history
  async removeFromWatchHistory(userId, animeId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      
      const updatedHistory = userData.watchHistory.filter(
        item => item.animeId !== animeId
      );
      
      await updateDoc(userRef, { watchHistory: updatedHistory });
    } catch (error) {
      console.error('Remove from watch history error:', error);
      throw error;
    }
  }

  // Add to watchlist
  async addToWatchlist(userId, animeId, animeData) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        watchlist: arrayUnion({
          animeId,
          addedAt: new Date(),
          ...animeData
        })
      });
    } catch (error) {
      console.error('Add to watchlist error:', error);
      throw error;
    }
  }

  // Remove from watchlist
  async removeFromWatchlist(userId, animeId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      
      const updatedWatchlist = userData.watchlist.filter(
        item => item.animeId !== animeId
      );
      
      await updateDoc(userRef, { watchlist: updatedWatchlist });
    } catch (error) {
      console.error('Remove from watchlist error:', error);
      throw error;
    }
  }

  // Get watchlist
  async getWatchlist(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      return userData?.watchlist || [];
    } catch (error) {
      console.error('Get watchlist error:', error);
      throw error;
    }
  }

  // Update watch progress
  async updateWatchProgress(userId, animeId, episodeId, progress) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      
      // Find and update existing progress or add new
      const progressIndex = userData.watchProgress?.findIndex(
        p => p.animeId === animeId
      );
      
      if (progressIndex >= 0) {
        // Update existing progress
        const updatedProgress = [...userData.watchProgress];
        updatedProgress[progressIndex] = {
          ...updatedProgress[progressIndex],
          currentEpisode: episodeId,
          lastWatched: new Date(),
          ...progress
        };
        
        await updateDoc(userRef, { watchProgress: updatedProgress });
      } else {
        // Add new progress
        const newProgress = {
          animeId,
          currentEpisode: episodeId,
          lastWatched: new Date(),
          ...progress
        };
        
        await updateDoc(userRef, {
          watchProgress: arrayUnion(newProgress)
        });
      }
    } catch (error) {
      console.error('Update watch progress error:', error);
      throw error;
    }
  }

  // Get watch progress for an anime
  async getWatchProgress(userId, animeId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      
      return userData?.watchProgress?.find(p => p.animeId === animeId) || null;
    } catch (error) {
      console.error('Get watch progress error:', error);
      throw error;
    }
  }

  // Check if anime is in favorites
  async isInFavorites(userId, animeId) {
    try {
      const favorites = await this.getFavorites(userId);
      return favorites.some(fav => fav.animeId === animeId);
    } catch (error) {
      console.error('Check favorites error:', error);
      return false;
    }
  }

  // Check if anime is in watchlist
  async isInWatchlist(userId, animeId) {
    try {
      const watchlist = await this.getWatchlist(userId);
      return watchlist.some(item => item.animeId === animeId);
    } catch (error) {
      console.error('Check watchlist error:', error);
      return false;
    }
  }

  // Get user profile
  async getUserProfile(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  }

  // Create user profile if it doesn't exist
  async createUserProfile(userId, userData) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          ...userData,
          createdAt: new Date(),
          favorites: [],
          watchHistory: [],
          watchlist: [],
          watchProgress: []
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Create user profile error:', error);
      throw error;
    }
  }

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Create user profile if it doesn't exist
        await this.createUserProfile(userId, {
          displayName: updates.displayName || 'User',
          avatar: updates.avatar || '😊',
          favorites: [],
          watchHistory: [],
          watchlist: [],
          watchProgress: []
        });
      } else {
        // Update existing profile
        await updateDoc(userRef, updates);
      }
    } catch (error) {
      console.error('Update user profile error:', error);
      throw error;
    }
  }
}

export default new UserDataService();
