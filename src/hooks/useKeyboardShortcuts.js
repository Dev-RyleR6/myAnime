import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Ctrl/Cmd + K: Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Ctrl/Cmd + /: Toggle help
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        // You can implement a help modal here
        console.log('Help shortcut pressed');
      }

      // Escape: Close modals or go back
      if (e.key === 'Escape') {
        // Close any open modals
        const modals = document.querySelectorAll('[data-modal]');
        modals.forEach(modal => {
          if (modal.style.display !== 'none') {
            modal.style.display = 'none';
          }
        });
      }

      // Navigation shortcuts (only when not in input fields)
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        switch (e.key) {
          case 'h':
          case 'H':
            if (location.pathname !== '/') {
              e.preventDefault();
              navigate('/');
            }
            break;
          
          case 's':
          case 'S':
            if (location.pathname !== '/search') {
              e.preventDefault();
              navigate('/search');
            }
            break;
          
          case 'f':
          case 'F':
            if (location.pathname !== '/favorites') {
              e.preventDefault();
              navigate('/favorites');
            }
            break;
          
          case 't':
          case 'T':
            if (location.pathname !== '/top-anime') {
              e.preventDefault();
              navigate('/top-anime');
            }
            break;
          
          case 'c':
          case 'C':
            if (location.pathname !== '/categories') {
              e.preventDefault();
              navigate('/categories');
            }
            break;
          
          case 'r':
          case 'R':
            if (location.pathname !== '/history') {
              e.preventDefault();
              navigate('/history');
            }
            break;

          case 'p':
          case 'P':
            if (location.pathname !== '/profile') {
              e.preventDefault();
              navigate('/profile');
            }
            break;

          case 'e':
          case 'E':
            if (location.pathname !== '/seasonal') {
              e.preventDefault();
              navigate('/seasonal');
            }
            break;
        }
      }

      // Video player shortcuts (when on video page)
      if (location.pathname.includes('/anime/')) {
        switch (e.key) {
          case ' ':
            e.preventDefault();
            // Toggle play/pause
            console.log('Space: Toggle play/pause');
            break;
          
          case 'ArrowLeft':
            e.preventDefault();
            // Rewind 10 seconds
            console.log('Left Arrow: Rewind 10s');
            break;
          
          case 'ArrowRight':
            e.preventDefault();
            // Forward 10 seconds
            console.log('Right Arrow: Forward 10s');
            break;
          
          case 'ArrowUp':
            e.preventDefault();
            // Volume up
            console.log('Up Arrow: Volume up');
            break;
          
          case 'ArrowDown':
            e.preventDefault();
            // Volume down
            console.log('Down Arrow: Volume down');
            break;
          
          case 'f':
          case 'F':
            e.preventDefault();
            // Toggle fullscreen
            console.log('F: Toggle fullscreen');
            break;
          
          case 'm':
          case 'M':
            e.preventDefault();
            // Toggle mute
            console.log('M: Toggle mute');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, location]);

  // Return shortcut info for UI display
  return {
    shortcuts: {
      'Ctrl/Cmd + K': 'Search',
      'Ctrl/Cmd + /': 'Help',
      'H': 'Home',
      'S': 'Search',
      'F': 'Favorites',
      'T': 'Top Anime',
      'C': 'Categories',
      'R': 'History',
      'P': 'Profile',
      'E': 'Seasonal',
      'Space': 'Play/Pause (Video)',
      '←/→': 'Seek (Video)',
      '↑/↓': 'Volume (Video)',
      'F': 'Fullscreen (Video)',
      'M': 'Mute (Video)'
    }
  };
};
