import { create } from 'zustand';

// States
const useStore = create((set) => ({
  // Estado inicial
  isRegistered: false,
  theme: "light",

// Actions
  setIsRegistered: (value) => set({ isRegistered: value }),
  toggleIsRegistered: () =>
    set((state) => ({
      isRegistered: !state.isRegistered,
    })),
  setTheme: (theme) => set({ theme }),
}));
  
export default useStore;
