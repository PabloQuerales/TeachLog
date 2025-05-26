import { create } from 'zustand';

// States
const useStore = create((set) => ({
  // Estado inicial
  isRegistered: false,
  theme: "light",
  isFlipped: true,

// Actions
  setIsRegistered: (value) => set({ isRegistered: value }),
  toggleIsRegistered: () => set((state) => ({isRegistered: !state.isRegistered,})),
  toggleIsFlipped: () => set((state) => ({isFlipped: !state.isFlipped,})),
  setTheme: (theme) => set({ theme }),
}));
  
export default useStore;
