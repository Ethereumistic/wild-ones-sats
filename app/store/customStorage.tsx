import { PersistStorage } from 'zustand/middleware';

const customStorage: PersistStorage<any> = {
  getItem: (name) => {
    const value = localStorage.getItem(name);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export default customStorage;