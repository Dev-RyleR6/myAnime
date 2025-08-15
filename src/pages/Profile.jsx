import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AnimatedButton } from '../components/AnimatedContainer';
import { useAuthContext } from '../contexts/AuthContext';
import SkeletonLoader from '../components/SkeletonLoader';

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  
  const { user, isAuthenticated } = useAuthContext();
  
  const [userProfile, setUserProfile] = useState({
    displayName: '',
    email: '',
    avatar: '😊',
    joinDate: ''
  });

  const [editForm, setEditForm] = useState({
    displayName: '',
    avatar: '😊'
  });

  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const { default: userDataService } = await import('../services/userDataService');
        const profile = await userDataService.getUserProfile(user.uid);
        
        // If profile doesn't exist, create it
        if (!profile) {
          await userDataService.createUserProfile(user.uid, {
            displayName: user.displayName || 'User',
            email: user.email || '',
            avatar: '😊'
          });
        }
        
        // Set profile data - handle case where profile doesn't exist
        setUserProfile({
          displayName: profile?.displayName || user.displayName || 'User',
          email: profile?.email || user.email || '',
          avatar: profile?.avatar || '😊',
          joinDate: profile?.createdAt?.toDate?.() || user.metadata?.creationTime || new Date()
        });
        
        setEditForm({
          displayName: profile?.displayName || user.displayName || '',
          avatar: profile?.avatar || '😊'
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load profile data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, user]);

  // Fetch favorites and history when tab changes
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchData = async () => {
      const { default: userDataService } = await import('../services/userDataService');
      
      if (activeTab === 'favorites') {
        setFavoritesLoading(true);
        try {
          const favs = await userDataService.getFavorites(user.uid);
          setFavorites(favs);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        } finally {
          setFavoritesLoading(false);
        }
      } else if (activeTab === 'history') {
        setHistoryLoading(true);
        try {
          const hist = await userDataService.getWatchHistory(user.uid, 10);
          setHistory(hist);
        } catch (error) {
          console.error('Error fetching history:', error);
        } finally {
          setHistoryLoading(false);
        }
      } else if (activeTab === 'recent') {
        setHistoryLoading(true);
        try {
          const hist = await userDataService.getWatchHistory(user.uid, 5);
          setHistory(hist);
        } catch (error) {
          console.error('Error fetching recent history:', error);
        } finally {
          setHistoryLoading(false);
        }
      }
    };

    fetchData();
  }, [activeTab, isAuthenticated, user]);

  const handleSaveProfile = async () => {
    if (!isAuthenticated || !user) return;
    
    try {
      const { default: userDataService } = await import('../services/userDataService');
      
      await userDataService.updateUserProfile(user.uid, {
        displayName: editForm.displayName,
        avatar: editForm.avatar
      });
      
    setUserProfile(prev => ({
      ...prev,
        displayName: editForm.displayName,
        avatar: editForm.avatar
    }));
      
    setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      displayName: userProfile.displayName,
      avatar: userProfile.avatar
    });
    setIsEditing(false);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'favorites', label: 'Favorites', icon: '❤️' },
    { id: 'recent', label: 'Recently Watched', icon: '🕒' },
    { id: 'history', label: 'Full History', icon: '📺' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">👤 Profile</h1>
          <p className="text-lg text-slate-300">
            Your account information
          </p>
      </div>

        {/* Authentication Check */}
        {!isAuthenticated ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔐</span>
        </div>
            <h3 className="text-xl font-bold text-white mb-4">Sign In Required</h3>
            <p className="text-slate-400 mb-8">
              Please sign in to view your profile
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-all duration-200"
            >
              Sign In
            </button>
        </div>
        ) : loading ? (
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
            <div className="flex items-center space-x-6">
              <SkeletonLoader className="w-16 h-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <SkeletonLoader className="h-6 w-32" />
                <SkeletonLoader className="h-4 w-24" />
        </div>
      </div>
    </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Error Loading Profile</h3>
            <p className="text-slate-400 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-slate-800/50 rounded-xl p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
          ))}
        </div>

            {/* Tab Content */}
            {activeTab === 'profile' && (
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
                {/* Profile Info */}
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-2xl">
                    {userProfile.avatar}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">{userProfile.displayName}</h2>
                    <p className="text-slate-400">{userProfile.email}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-all duration-200"
                  >
                    Edit
                  </button>
      </div>

                {/* Member Since */}
                <div className="border-t border-slate-700/50 pt-6">
                  <p className="text-slate-400">
                    Member since <span className="text-white">{new Date(userProfile.joinDate).toLocaleDateString()}</span>
                  </p>
    </div>

                {/* Edit Form */}
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-slate-700/50 pt-6 mt-6"
                  >
                    <h3 className="text-lg font-bold text-white mb-4">Edit Profile</h3>
                    
        <div className="space-y-4">
          <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Display Name</label>
            <input
              type="text"
                          value={editForm.displayName}
                          onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                          placeholder="Enter display name"
            />
          </div>
                      
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Avatar</label>
            <div className="flex space-x-2">
              {['😊', '🎭', '⚡', '🔥', '🌟', '💫'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setEditForm(prev => ({ ...prev, avatar: emoji }))}
                              className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 ${
                    editForm.avatar === emoji
                      ? 'border-cyan-500 bg-cyan-500/20'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                              <span className="text-lg">{emoji}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
                    
        <div className="flex space-x-3 mt-6">
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-all duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-all duration-200"
                      >
            Cancel
                      </button>
        </div>
                  </motion.div>
                )}
      </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">❤️ Favorites</h3>

                {favoritesLoading ? (
        <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <SkeletonLoader className="w-16 h-16 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <SkeletonLoader className="h-5 w-32" />
                          <SkeletonLoader className="h-4 w-24" />
            </div>
          </div>
                    ))}
            </div>
                ) : favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">❤️</span>
          </div>
                    <h4 className="text-lg font-medium text-white mb-2">No Favorites Yet</h4>
                    <p className="text-slate-400">Start adding anime to your favorites!</p>
            </div>
                ) : (
                  <div className="space-y-4">
                    {favorites.map((favorite) => (
                      <div key={favorite.animeId} className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg">
                        <img
                          src={favorite.image || '/placeholder-anime.jpg'}
                          alt={favorite.title?.english || favorite.title?.romaji || 'Anime'}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = '/placeholder-anime.jpg';
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-white">
                            {favorite.title?.english || favorite.title?.romaji || 'Unknown Title'}
                          </h4>
                          <p className="text-sm text-slate-400">
                            Added {formatTimeAgo(favorite.addedAt)}
                          </p>
          </div>
        </div>
                    ))}
      </div>
                )}
    </div>
            )}

            {activeTab === 'recent' && (
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">🕒 Recently Watched</h3>
                
                {historyLoading ? (
          <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <SkeletonLoader className="w-16 h-16 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <SkeletonLoader className="h-5 w-32" />
                          <SkeletonLoader className="h-4 w-24" />
            </div>
            </div>
                    ))}
            </div>
                ) : history.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🕒</span>
            </div>
                    <h4 className="text-lg font-medium text-white mb-2">No Recent History</h4>
                    <p className="text-slate-400">Start watching anime to see your recent history!</p>
            </div>
                ) : (
          <div className="space-y-4">
                    {history.map((item, index) => (
                      <div key={`${item.animeId}-${index}`} className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg">
                        <img
                          src={item.image || '/placeholder-anime.jpg'}
                          alt={item.title?.english || item.title?.romaji || 'Anime'}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = '/placeholder-anime.jpg';
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-white">
                            {item.title?.english || item.title?.romaji || 'Unknown Title'}
                          </h4>
                          <p className="text-sm text-slate-400">
                            Episode {item.episodeNumber || 'Unknown'} • {formatTimeAgo(item.watchedAt)}
                          </p>
            </div>
          </div>
                    ))}
        </div>
                )}
      </div>
            )}

            {activeTab === 'history' && (
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">📺 Watch History</h3>
                
                {historyLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <SkeletonLoader className="w-16 h-16 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <SkeletonLoader className="h-5 w-32" />
                          <SkeletonLoader className="h-4 w-24" />
          </div>
        </div>
                    ))}
                  </div>
                ) : history.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📺</span>
      </div>
                    <h4 className="text-lg font-medium text-white mb-2">No Watch History</h4>
                    <p className="text-slate-400">Start watching anime to see your history here!</p>
    </div>
                ) : (
                  <div className="space-y-4">
                    {history.map((item, index) => (
                      <div key={`${item.animeId}-${index}`} className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg">
                        <img
                          src={item.image || '/placeholder-anime.jpg'}
                          alt={item.title?.english || item.title?.romaji || 'Anime'}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = '/placeholder-anime.jpg';
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-white">
                            {item.title?.english || item.title?.romaji || 'Unknown Title'}
                          </h4>
                          <p className="text-sm text-slate-400">
                            Episode {item.episodeNumber || 'Unknown'} • {formatTimeAgo(item.watchedAt)}
          </p>
        </div>
                      </div>
          ))}
        </div>
                )}
              </div>
            )}
        </motion.div>
        )}
      </div>
    </div>
  );
}
