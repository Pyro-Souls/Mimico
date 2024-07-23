import { create } from 'zustand';

interface Character {
    id: string;
    title: string;
    subtitle: string;
    stats: {
        strength: number;
        agility: number;
    };
}

interface AppState {
    data: Character[];
    setData: (data: Character[]) => void;
    currentCharacter: Character | null;
    setCurrentCharacter: (character: Character | null) => void;
}

export const useStore = create<AppState>((set) => ({
    data: [
        { id: '1', title: 'Mascarpone Toblerone', subtitle: 'Caballero Sagrado', stats: { strength: 10, agility: 8 } },
        { id: '2', title: 'Elna Vajazo', subtitle: 'Asesina', stats: { strength: 6, agility: 6 } },
        { id: '3', title: 'Nano el Hermano', subtitle: 'Clèrigo Corrupto', stats: { strength: 7, agility: 9 } },
        { id: '4', title: 'Monja Mon', subtitle: 'Monja carnicera', stats: { strength: 6, agility: 6 } },
        { id: 'add', title: '', subtitle: '', stats: { strength: 0, agility: 0 } },
    ],
    setData: (data) => set({ data }),
    currentCharacter: null,
    setCurrentCharacter: (character) => set({ currentCharacter: character }),
}));
