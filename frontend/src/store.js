import { create } from 'zustand';

// States
const useStore = create((set) => ({
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  isFlipped: true,
  userLoged: "",


// Actions
  toggleIsFlipped: () => set((state) => ({isFlipped: !state.isFlipped})),
  setUserLoged: (value) => set(() => ({userLoged: value})),

}));
  
export default useStore;
