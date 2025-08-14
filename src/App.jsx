
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import History from './pages/History';
import Login from './pages/Login';
import WelcomeModal from './components/WelcomeModal';

// TODO: Add global state/providers if needed

function App() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const handleShowInfo = () => {
    setShowWelcomeModal(true);
  };

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
  };

  return (
    <>
      <WelcomeModal isOpen={showWelcomeModal} onClose={handleCloseModal} />
      <Navbar onShowInfo={handleShowInfo} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <footer className="w-full py-4 mt-8 bg-slate-800 text-center text-slate-400 text-sm rounded-t-xl shadow-inner">
        <p>© 2025 my𝘼nime. All rights reserved.</p>
        <p>Developed by Ryle Gabotero. For personal use only.</p>
      </footer>

    </>
  );
}

export default App;
