
export type AppPhase = 'setup' | 'lobby' | 'ranking' | 'reveal';

export interface Participant {
  id: string;
  name: string;
  rankings: string[]; // List of item IDs in order of preference (1st place at index 0)
}

export interface Item {
  id: string;
  content: string;
}

export interface AppState {
  phase: AppPhase;
  items: Item[];
  participants: Participant[];
}
