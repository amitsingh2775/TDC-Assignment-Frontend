import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { Client } from '../types';
import { apiService } from '../services/api';

interface AppState {
  isAuthenticated: boolean;
  matchmakerName: string;
  matchmakerAvatar: string; 
  clients: Client[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchClients: () => Promise<void>;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('tdc_token'));
  const [matchmakerName, setMatchmakerName] = useState('Matchmaker');
  

  const [matchmakerAvatar, setMatchmakerAvatar] = useState(''); 
  
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      apiService.getMe()
        .then(data => {
          setMatchmakerName(data.name);
         
        })
        .catch(() => logout());
    }
  }, [isAuthenticated]);

  const login = async (email: string, password: string) => {
    try {
      const res = await apiService.login(email, password);
      setIsAuthenticated(true);
      setMatchmakerName(res.data.matcher.name);
   
      return true;
    } catch (e) {
      console.error('Login Failed', e);
      return false;
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('tdc_token');
    setIsAuthenticated(false);
    setClients([]);
    setMatchmakerName('Matchmaker');
    setMatchmakerAvatar('');
  }, []);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getClients();
      setClients(data);
    } catch (e) {
      console.error('Failed to fetch clients', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      matchmakerName,
      matchmakerAvatar, 
      clients,
      isLoading,
      login,
      logout,
      fetchClients,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}