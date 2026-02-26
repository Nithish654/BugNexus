import { HistoryItem } from '../types';

const HISTORY_KEY = 'bugnexus_history';

export const historyService = {
  getHistory: (): HistoryItem[] => {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveHistory: (item: HistoryItem) => {
    const history = historyService.getHistory();
    const updatedHistory = [item, ...history].slice(0, 50); // Keep last 50 items
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  },

  clearHistory: () => {
    localStorage.removeItem(HISTORY_KEY);
  },

  deleteItem: (id: string) => {
    const history = historyService.getHistory();
    const updatedHistory = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  }
};
