import { create } from 'zustand';
import { userData } from '../common/types/User';
import { getUserCharacters } from '../services/User.service';

// Define the new 'Characters' interface
interface Characters {
    id: string;
    title: string;
    subtitle: string;
    stats: {
        strength: number;
        agility: number;
    };
}

// Update the AppState interface to include new state and actions
interface AppState {
    user: userData;
    setUser: (user: userData) => void;
    clearUser: () => void;
    data: Characters[]; // Added state to store character data
    setData: (data: Characters[]) => void; // Added action to set character data
    currentCharacter: Characters | null; // Added state to store the currently selected character
    setCurrentCharacter: (character: Characters | null) => void; // Added action to set the current character
    loadUserCharacters: () => Promise<void>; // Added asynchronous action to load user characters
}

const useStore = create<AppState>((set, get) => ({
    // Updated 'user' state to include 'profileImage'
    user: {
        uid: null,
        username: null,
        email: null,
        name: null,
        lastName: null,
        date: null,
        profileImage: null, // New field added to user data
    },
    setUser: (user) => set({ user }),
    clearUser: () => set({
        user: {
            uid: null,
            username: null,
            email: null,
            name: null,
            lastName: null,
            date: null,
            profileImage: null, // New field added to user data
        },
    }),
    data: [], // Added initial state for character data
    setData: (data) => set({ data }), // Added action to update character data
    currentCharacter: null, // Added initial state for the current character
    setCurrentCharacter: (character) => set({ currentCharacter: character }), // Added action to set the current character
    loadUserCharacters: async () => { // Added action to load characters based on user ID
        const user = get().user;
        if (user.uid) {
            const characters = await getUserCharacters(user.uid);
            set({ data: characters });
        }
    },
}));

export default useStore;
