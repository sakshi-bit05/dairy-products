// Admin Users Database
export interface AdminUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

// MongoDB API functions for admin authentication
const API_BASE_URL = 'http://localhost:3001/api';

export const authenticateAdmin = async (email: string, password: string): Promise<AdminUser | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (data.success) {
      // Store session in localStorage
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('adminEmail', data.user.email);
      localStorage.setItem('adminName', data.user.name);
      localStorage.setItem('adminRole', data.user.role);
      localStorage.setItem('adminId', data.user.id);
      
      return data.user as AdminUser;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

// Local session functions
export const getCurrentAdmin = (): AdminUser | null => {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
  if (isLoggedIn !== 'true') {
    return null;
  }

  const adminName = localStorage.getItem('adminName');
  const adminEmail = localStorage.getItem('adminEmail');
  
  // Return null if no user data is available
  if (!adminName && !adminEmail) {
    return null;
  }

  return {
    id: localStorage.getItem('adminId') || '1',
    email: adminEmail || 'umeshsurya4832@gmail.com',
    name: adminName || 'Umesh Suryawanshi',
    role: localStorage.getItem('adminRole') || 'super_admin',
    createdAt: new Date().toISOString(),
    isActive: true
  } as AdminUser;
};

export const logoutAdmin = (): void => {
  // Clear all admin-related localStorage items
  localStorage.removeItem('isAdminLoggedIn');
  localStorage.removeItem('adminEmail');
  localStorage.removeItem('adminName');
  localStorage.removeItem('adminRole');
  localStorage.removeItem('adminId');
  localStorage.removeItem('adminLastLogin');
  
  // Clear any additional session-related items
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('admin') || key.includes('session') || key.includes('token')) {
      localStorage.removeItem(key);
    }
  });
  
  // Clear sessionStorage completely
  sessionStorage.clear();
};
