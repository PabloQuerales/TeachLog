import { create } from 'zustand';

// States
const useStore = create((set) => ({
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  isFlipped: true,


// Actions
  toggleIsFlipped: () => set((state) => ({isFlipped: !state.isFlipped,})),
}));
  
export default useStore;
