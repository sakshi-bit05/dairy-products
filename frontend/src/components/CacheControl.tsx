import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface CacheControlProps {
  children: React.ReactNode;
}

const CacheControl: React.FC<CacheControlProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Set cache control headers for admin routes
    if (location.pathname.startsWith('/admin')) {
      // Prevent caching of admin pages
      const metaTags = [
        { name: 'cache-control', content: 'no-cache, no-store, must-revalidate' },
        { name: 'pragma', content: 'no-cache' },
        { name: 'expires', content: '0' },
        { name: 'surrogate-control', content: 'no-store' }
      ];

      // Update or create meta tags
      metaTags.forEach(tag => {
        let meta = document.querySelector(`meta[name="${tag.name}"]`) as HTMLMetaElement;
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = tag.name;
          document.head.appendChild(meta);
        }
        meta.content = tag.content;
      });

      // Clear browser history for admin routes on logout
      const handleBeforeUnload = () => {
        const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (!isLoggedIn && location.pathname.startsWith('/admin')) {
          // Clear history when user tries to leave admin page while not logged in
          window.history.replaceState(null, '', '/');
        }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [location]);

  return <>{children}</>;
};

export default CacheControl;
