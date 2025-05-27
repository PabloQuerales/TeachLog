import { create } from 'zustand';

// States
const useStore = create((set) => ({
  // Estado inicial
  isRegistered: false,
  theme: "light",
  isFlipped: true,
  backendUrl: import.meta.env.VITE_BACKEND_URL,


// Actions
  setIsRegistered: (value) => set({ isRegistered: value }),
  toggleIsRegistered: () => set((state) => ({isRegistered: !state.isRegistered,})),
  toggleIsFlipped: () => set((state) => ({isFlipped: !state.isFlipped,})),
  setTheme: (theme) => set({ theme }),
}));
  
export default useStore;
