import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentAdmin } from '@/data/adminUsers';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const admin = getCurrentAdmin();
      
      if (!admin) {
        // Not authenticated, redirect to admin login
        navigate('/admin-login', { 
          state: { from: location.pathname },
          replace: true 
        });
        return false;
      }
      
      setIsAuthenticated(true);
      return true;
    };

    checkAuth();
  }, [navigate, location]);

  useEffect(() => {
    // Prevent back button access to admin routes after logout
    const handlePopState = (event: PopStateEvent) => {
      const admin = getCurrentAdmin();
      if (!admin && location.pathname.startsWith('/admin')) {
        // Push a new state to prevent going back to admin route
        window.history.pushState(null, '', '/');
        navigate('/', { replace: true });
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Set initial history state
    window.history.pushState(null, '', location.pathname);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, location]);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dairy-green-light/20 via-white to-dairy-cream/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Render children only if authenticated
  return isAuthenticated ? <>{children}</> : null;
};

export default AdminRouteGuard;
