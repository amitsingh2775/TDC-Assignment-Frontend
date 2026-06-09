import axios from 'axios';
import type { Client, MatchSuggestion, IMatcherNote } from '../types';


const API_BASE_URL ='https://tdc-dqxo.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tdc_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  login: async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.success) {
      localStorage.setItem('tdc_token', res.data.data.token);
    }
    return res.data;
  },

  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data.data;
  },

  getClients: async (): Promise<Client[]> => {
    const res = await api.get('/clients');
    return res.data.data;
  },

  getClientById: async (id: string): Promise<Client> => {
    const res = await api.get(`/clients/${id}`);
    return res.data.data;
  },

  getMatches: async (id: string): Promise<MatchSuggestion[]> => {
    const res = await api.get(`/clients/${id}/matches?topN=5`);
    return res.data.data.matches;
  },

  addNote: async (id: string, text: string): Promise<IMatcherNote> => {
    const res = await api.post(`/clients/${id}/notes`, { text, type: 'general' });
    return res.data.data.note;
  },

  sendMatch: async (clientId: string, candidateId: string) => {
    const res = await api.post('/matches/send', { clientId, candidateId });
    return res.data;
  },

  getPoolProfiles: async (): Promise<any[]> => {
    const res = await api.get('/pool');
    return res.data.data;
  }
};