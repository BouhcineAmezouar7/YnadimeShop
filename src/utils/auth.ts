const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const auth = {
  // Get stored token
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },

  // Remove token (logout)
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('token_type');
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!auth.getToken();
  },

  // API call with auth header
  fetchWithAuth: async (url: string, options: RequestInit = {}) => {
    const token = auth.getToken();
    
    return fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    });
  },

  // GET user data
  getUser: async () => {
    try {
      const response = await auth.fetchWithAuth('/user');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  },

  // Logout API call
  logout: async () => {
    try {
      await auth.fetchWithAuth('/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      auth.removeToken();
    }
  }
};