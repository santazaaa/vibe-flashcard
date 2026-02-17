import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Flashcard } from '../types/flashcard';

interface FlashcardState {
  cards: Flashcard[];
  currentCard: Flashcard | null;
  choices: string[];
  addCard: (card: Flashcard) => void;
  removeCard: (id: number) => void;
  addPresetCards: (newCards: Flashcard[]) => void;
  setCurrentCard: (card: Flashcard | null) => void;
  setChoices: (choices: string[]) => void;
  getRandomCard: (excludeId?: number) => Flashcard | null;
  getRandomChoices: (correct: string) => string[];
}

export const useFlashcardStore = create<FlashcardState>()(
  persist(
    (set, get) => ({
      cards: [],
      currentCard: null,
      choices: [],

      addCard: (card) =>
        set((state) => {
          const newCards = [...state.cards, card];
          return { cards: newCards };
        }),

      removeCard: (id) =>
        set((state) => {
          const newCards = state.cards.filter((c) => c.id !== id);
          let newCurrent = state.currentCard;
          if (newCurrent && newCurrent.id === id) {
            newCurrent = get().getRandomCard(id);
          }
          return { cards: newCards, currentCard: newCurrent };
        }),

      addPresetCards: (newCards) =>
        set((state) => {
          const existing = new Set(state.cards.map(c => c.word + c.translation));
          const filtered = newCards.filter(c => !existing.has(c.word + c.translation));
          return { cards: [...state.cards, ...filtered] };
        }),

      setCurrentCard: (card) => set({ currentCard: card }),

      setChoices: (choices) => set({ choices }),

      getRandomCard: (excludeId) => {
        const state = get();
        const filtered = excludeId ? state.cards.filter((c) => c.id !== excludeId) : state.cards;
        if (filtered.length === 0) return null;
        return filtered[Math.floor(Math.random() * filtered.length)];
      },

      getRandomChoices: (correct) => {
        const state = get();
        const translations = state.cards.map((c) => c.translation).filter((t) => t !== correct);
        const shuffled = translations.sort(() => 0.5 - Math.random()).slice(0, 3);
        const allChoices = [...shuffled, correct].sort(() => 0.5 - Math.random());
        return allChoices;
      },
    }),
    {
      name: 'flashcard-storage',
      partialize: (state) => ({ cards: state.cards }), // Only persist cards
    }
  )
);