import { create } from 'zustand';
import { userData } from '../common/types/User';


type State = {
    user: userData;
    setUser: (user: userData) => void;
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
        profileImage: null,
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
            profileImage: null,
        }
    }),
}));

export default useStore;