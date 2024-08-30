import { create } from "zustand";
import { userData } from "../common/types/User";
import { getUserCharacters } from "../services/User.service";

// Define the 'CharacterData' interface
interface CharacterData {
  id: string;
  title: string;
  nombre?: string; // Если нужно, добавьте дополнительные поля
  competencias?: Competencia[]; // Если нужно, добавьте дополнительные поля
}

interface Competencia {
  title: string;
  value: string;
}
export interface Characteristicas {
  title: string;
  type?: "number" | "text";
}

// Update the AppState interface to include new state and actions
interface AppState {
  user: userData;
  setUser: (user: userData) => void;
  clearUser: () => void;
  data: CharacterData[]; // State to store character data
  setData: (data: CharacterData[]) => void; // Action to set character data
  currentCharacter: CharacterData | null; // State to store the currently selected character
  setCurrentCharacter: (character: CharacterData | null) => void; // Action to set the current character
  loadUserCharacters: () => Promise<void>; // Async action to load user characters
}

const useStore = create<AppState>((set, get) => ({
  user: {
    uid: null,
    username: null,
    email: null,
    name: null,
    lastName: null,
    date: null,
    profileImage: null,
    mimicoins: null,
    notes: null,
  },
  setUser: (user) => set({ user }),
  clearUser: () =>
    set({
      user: {
        uid: null,
        username: null,
        email: null,
        name: null,
        lastName: null,
        date: null,
        profileImage: null,
        mimicoins: null,
        notes: null,
      },
    }),
  data: [], // Initial state for character data
  setData: (data) => set({ data }), // Action to update character data
  currentCharacter: null, // Initial state for the current character
  setCurrentCharacter: (character) => set({ currentCharacter: character }), // Action to set the current character
  loadUserCharacters: async () => {
    const user = get().user;
    if (user.uid) {
      const characters = await getUserCharacters(user.uid);
      set({ data: characters });
    }
  },
}));

export default useStore;
