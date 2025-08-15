# 🔥 Firebase + Consumet API Integration Guide

## 🚀 **Quick Start**

### 1. **Firebase Setup**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Enable Storage (optional)
6. Get your config from Project Settings

### 2. **Environment Variables**
Create a `.env` file in your project root:
```bash
# Copy env.example to .env and fill in your values
cp env.example .env
```

Fill in your Firebase config values:
```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 3. **Firestore Rules**
Set up Firestore security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public anime data (optional)
    match /anime/{animeId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🎬 **Consumet API Integration**

### **Available Endpoints**
- **Search**: `/anime/gogoanime/{query}`
- **Info**: `/anime/gogoanime/info/{animeId}`
- **Streaming**: `/anime/gogoanime/watch/{animeId}/{episodeId}`
- **Recent**: `/anime/gogoanime/recent-episodes`
- **Top Airing**: `/anime/gogoanime/top-airing`
- **Seasonal**: `/anime/gogoanime/seasonal`

### **Data Structure**
```javascript
// Anime Info Response
{
  id: "anime-id",
  title: "Anime Title",
  description: "Plot description...",
  episodes: [...],
  genres: [...],
  status: "Ongoing",
  type: "TV",
  releaseDate: "2023",
  season: "WINTER",
  studios: [...],
  totalEpisodes: 12,
  duration: 24,
  rating: 8.5,
  popularity: 1000
}

// Episode Data
{
  id: "episode-id",
  number: 1,
  title: "Episode Title",
  description: "Episode description...",
  airDate: "2023-01-01"
}

// Streaming Links
{
  sources: [
    {
      url: "video-url",
      quality: "1080p",
      isM3U8: true
    }
  ],
  subtitles: [...]
}
```

## 🔐 **Authentication Flow**

### **User Registration**
```javascript
import { useAuth } from '../hooks/useAuth';

const { signUp } = useAuth();

const handleSignUp = async (email, password, displayName) => {
  try {
    await signUp(email, password, displayName);
    // User is automatically signed in
  } catch (error) {
    console.error('Sign up failed:', error);
  }
};
```

### **User Sign In**
```javascript
const { signIn } = useAuth();

const handleSignIn = async (email, password) => {
  try {
    await signIn(email, password);
    // User is signed in
  } catch (error) {
    console.error('Sign in failed:', error);
  }
};
```

### **Protected Routes**
```javascript
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return children;
};
```

## 💾 **User Data Management**

### **Favorites**
```javascript
import userDataService from '../services/userDataService';

// Add to favorites
await userDataService.addToFavorites(userId, animeId, {
  title: "Anime Title",
  image: "image-url",
  rating: 8.5
});

// Get favorites
const favorites = await userDataService.getFavorites(userId);

// Check if in favorites
const isFavorite = await userDataService.isInFavorites(userId, animeId);
```

### **Watch History**
```javascript
// Add to watch history
await userDataService.addToWatchHistory(userId, animeId, episodeId, {
  title: "Episode Title",
  animeTitle: "Anime Title",
  episodeNumber: 1
});

// Get watch history
const history = await userDataService.getWatchHistory(userId, 50);
```

### **Watch Progress**
```javascript
// Update progress
await userDataService.updateWatchProgress(userId, animeId, episodeId, {
  progress: 0.75, // 75% watched
  currentTime: 1200, // 20 minutes
  totalTime: 1600 // 26.67 minutes
});

// Get progress
const progress = await userDataService.getWatchProgress(userId, animeId);
```

## 🎥 **Video Player Integration**

### **Get Streaming Links**
```javascript
import { useAnimeData } from '../hooks/useAnimeData';

const { getStreamingLinks } = useAnimeData();

const loadEpisode = async (animeId, episodeId) => {
  const streamingData = await getStreamingLinks(animeId, episodeId);
  
  if (streamingData?.sources) {
    // Use HLS.js or video.js for M3U8 streams
    const videoUrl = streamingData.sources[0].url;
    // Initialize video player with URL
  }
};
```

### **HLS.js Integration**
```bash
npm install hls.js
```

```javascript
import Hls from 'hls.js';

const initializeVideoPlayer = (videoElement, videoUrl) => {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoUrl);
    hls.attachMedia(videoElement);
  } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari native HLS support
    videoElement.src = videoUrl;
  }
};
```

## 🔄 **State Management**

### **Context Provider Setup**
```javascript
// src/contexts/AuthContext.jsx
import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
```

### **App.jsx Update**
```javascript
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        {/* Your existing app content */}
      </ErrorBoundary>
    </AuthProvider>
  );
}
```

## 📱 **Component Updates**

### **SearchBar.jsx**
```javascript
import { useAnimeData } from '../hooks/useAnimeData';

export default function SearchBar() {
  const { searchAnime, loading, error } = useAnimeData();
  
  const handleSearch = async (query) => {
    const results = await searchAnime(query);
    setSearchResults(results.results || []);
  };
  
  // Replace mock data with real API results
}
```

### **Home.jsx**
```javascript
import { useAnimeData } from '../hooks/useAnimeData';

export default function Home() {
  const { getTopAiring, getRecentEpisodes, loading } = useAnimeData();
  
  useEffect(() => {
    const loadData = async () => {
      const [topAiring, recent] = await Promise.all([
        getTopAiring(),
        getRecentEpisodes()
      ]);
      // Update state with real data
    };
    
    loadData();
  }, []);
}
```

## 🚨 **Error Handling**

### **API Error Boundaries**
```javascript
const handleApiError = (error, fallbackData = []) => {
  console.error('API Error:', error);
  
  // Show user-friendly error message
  setError(error.message);
  
  // Use fallback data if available
  return fallbackData;
};
```

### **Loading States**
```javascript
const { loading, error } = useAnimeData();

if (loading) return <SkeletonLoader />;
if (error) return <ErrorMessage message={error} />;

// Render content
```

## 🔒 **Security Considerations**

### **Firestore Rules**
- Users can only access their own data
- Validate data on both client and server
- Use Firebase Auth for user identification

### **API Rate Limiting**
- Implement request throttling
- Cache responses when possible
- Handle API errors gracefully

### **Data Validation**
- Validate all user inputs
- Sanitize data before storing
- Use TypeScript for type safety (optional)

## 📊 **Performance Optimization**

### **Caching Strategy**
```javascript
// Cache anime info
const animeCache = new Map();

const getCachedAnimeInfo = async (animeId) => {
  if (animeCache.has(animeId)) {
    return animeCache.get(animeId);
  }
  
  const info = await consumetApi.getAnimeInfo(animeId);
  animeCache.set(animeId, info);
  return info;
};
```

### **Lazy Loading**
```javascript
// Lazy load components
const VideoPlayer = lazy(() => import('./VideoPlayer'));
const CommentsSection = lazy(() => import('./CommentsSection'));

// Use Suspense
<Suspense fallback={<SkeletonLoader />}>
  <VideoPlayer />
</Suspense>
```

## 🧪 **Testing**

### **Mock Services**
```javascript
// src/services/__mocks__/consumetApi.js
export default {
  searchAnime: jest.fn(),
  getAnimeInfo: jest.fn(),
  // ... other methods
};
```

### **Test Setup**
```javascript
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';

const renderWithAuth = (component) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};
```

## 🚀 **Deployment**

### **Environment Variables**
- Set production environment variables
- Use Firebase hosting for static files
- Configure custom domains if needed

### **Build Process**
```bash
npm run build
firebase deploy
```

## 📚 **Next Steps**

1. **Set up Firebase project** and get config
2. **Create .env file** with your values
3. **Update components** to use real APIs
4. **Test authentication** flow
5. **Implement video streaming**
6. **Add error handling** and loading states
7. **Deploy and test** in production

## 🆘 **Troubleshooting**

### **Common Issues**
- **Firebase config errors**: Check environment variables
- **CORS issues**: Use Firebase hosting or proxy
- **Authentication failures**: Verify Firestore rules
- **API rate limits**: Implement caching and throttling

### **Debug Mode**
```javascript
// Enable Firebase debug mode
localStorage.setItem('firebase:debug', '*');

// Check network requests in DevTools
// Verify Firestore rules in Firebase Console
```

---

**Happy coding! 🎉** Your frontend is ready for this integration!
