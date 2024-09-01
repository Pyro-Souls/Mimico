import { create } from 'zustand';
import { userData } from '../common/types/User';

type State = {
    user: userData;
    setUser: (user: userData) => void;
    updateUsername: (username: string) => void;
    updateProfileImage: (profileImage: string) => void;
    clearUser: () => void;
};

const useStore = create<State>((set) => ({
    user: {
        uid: null,
        username: null,
        email: null,
        name: null,
        lastName: null,
        date: null,
        profileImageUrl: null,
    },
    setUser: (user) => set({ user }),

    updateUsername: (username) => set((state) => ({
        user: {
            ...state.user,
            username,
        },
    })),

    updateProfileImage: (profileImage) => set((state) => ({
        user: {
            ...state.user,
            profileImage,
        },
    })),

    clearUser: () => set({
        user: {
            uid: null,
            username: null,
            email: null,
            name: null,
            lastName: null,
            date: null,
            profileImageUrl: null,
        },
    }),
}));

export default useStore;