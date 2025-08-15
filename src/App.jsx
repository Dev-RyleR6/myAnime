
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import TopAnime from './pages/TopAnime';
import Seasonal from './pages/Seasonal';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import History from './pages/History';
import Login from './pages/Login';
import WelcomeModal from './components/WelcomeModal';
import HelpModal from './components/HelpModal';
import VideoPlayerPage from './pages/VideoPlayerPage';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { AuthProvider } from './contexts/AuthContext';

// TODO: Add global state/providers if needed

function App() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  const handleShowInfo = () => {
    setShowWelcomeModal(true);
  };

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
  };

  const handleShowHelp = () => {
    setShowHelpModal(true);
  };

  const handleCloseHelp = () => {
    setShowHelpModal(false);
  };

  return (
    <AuthProvider>
      <ErrorBoundary>
        <WelcomeModal isOpen={showWelcomeModal} onClose={handleCloseModal} />
        <HelpModal isOpen={showHelpModal} onClose={handleCloseHelp} />
        <Navbar onShowInfo={handleShowInfo} onShowHelp={handleShowHelp} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/top-anime" element={<TopAnime />} />
          <Route path="/seasonal" element={<Seasonal />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/anime/:animeId" element={<VideoPlayerPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer className="w-full py-4 mt-8 bg-slate-800 text-center text-slate-400 text-sm rounded-t-xl shadow-inner">
          <p>© 2025 my𝘼nime. All rights reserved.</p>
          <p>Developed by Ryle Gabotero. For personal use only.</p>
        </footer>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
