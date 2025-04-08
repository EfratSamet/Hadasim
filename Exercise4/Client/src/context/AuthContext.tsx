import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  userId: string | null;
  login: (token: string, name: string, id: string) => void;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Check if the user is already authenticated on mount
    const token = localStorage.getItem('authToken');
    const name = localStorage.getItem('userName');
    const id = localStorage.getItem('userId');
    
    if (token) {
      setIsAuthenticated(true);
      setUserName(name);
      setUserId(id);
    }
  }, []);

  const login = (token: string, name: string, id: string) => {
    console.log('Logging in with:', token, name, id);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', name);
    localStorage.setItem('userId', id);
    setIsAuthenticated(true);
    setUserName(name);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserName(null);
    setUserId(null);
  };

  const getToken = (): string | null => {
    return localStorage.getItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, userId, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
