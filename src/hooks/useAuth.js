import { useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import userDataService from '../services/userDataService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange(async (user) => {
      if (user) {
        setUser(user);
        try {
          const profile = await userDataService.getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (err) {
          console.error('Failed to load user profile:', err);
          setUserProfile(null);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign up
  const signUp = useCallback(async (email, password, displayName) => {
    setLoading(true);
    setError(null);
    
    try {
      const user = await authService.signUp(email, password, displayName);
      setUser(user);
      
      // Profile will be loaded by the auth state change listener
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Sign in
  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const user = await authService.signIn(email, password);
      setUser(user);
      
      // Profile will be loaded by the auth state change listener
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.signOut();
      setUser(null);
      setUserProfile(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset password
  const resetPassword = useCallback(async (email) => {
    setError(null);
    
    try {
      await authService.resetPassword(email);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (updates) => {
    if (!user) return;
    
    setError(null);
    
    try {
      await userDataService.updateUserProfile(user.uid, updates);
      setUserProfile(prev => ({ ...prev, ...updates }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [user]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Check if user is authenticated
  const isAuthenticated = !!user;

  return {
    user,
    userProfile,
    loading,
    error,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    clearError
  };
};
