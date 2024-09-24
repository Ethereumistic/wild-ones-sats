import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import customStorage from './customStorage';

interface User {
  publicKey: string;
  npub: string;
  name: string;
  profilePic: string;
}

interface StoreState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: customStorage, // use custom storage
    }
  )
);