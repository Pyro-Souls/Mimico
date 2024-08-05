export interface Stats {
    strength: number;
    agility: number;
    intelligence?: number;
}

export interface Characters {
    id: string;
    userId: string;
    title: string;
    subtitle: string;
    stats: Stats;
}
