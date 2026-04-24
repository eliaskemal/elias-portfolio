import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock user data
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        role: email.includes('admin') ? 'admin' : 'user',
      };
      setUser(mockUser);
      setIsLoading(false);
    }, 1000);
    
    return true;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        role: 'user',
      };
      setUser(mockUser);
      setIsLoading(false);
    }, 1000);
    
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
