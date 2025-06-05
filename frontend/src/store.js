import { create } from 'zustand';

// States
const useStore = create((set) => ({
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  isFlipped: true,
  userLogged: {},


// Actions
  toggleIsFlipped: () => set((state) => ({isFlipped: !state.isFlipped})),
  setUserLogged: (value) => set(() => ({userLogged: value})),

}));
  
export default useStore;
