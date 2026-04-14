import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import { TOKEN_STORAGE_KEY } from '../utils/constants';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (storedToken) {
      setToken(storedToken);
      authService
        .getProfile()
        .then((response) => {
          if (response.success) {
            setUser(response.data.user);
          }
        })
        .catch(() => {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await authService.login({ email, password });

    if (response.success && response.data?.token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, response.data.token);
      setToken(response.data.token);
      setUser(response.data.user || null);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(token && user),
      token,
      loading,
      login,
      logout,
      updateUser,
    }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}