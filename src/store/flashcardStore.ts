import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Flashcard } from '../types/flashcard';

interface FlashcardState {
  cards: Flashcard[];
  currentCard: Flashcard | null;
  choices: string[];
  reviewedCount: number;
  lastPracticedDate: string | null;
  streak: number;
  quizMode: 'normal' | 'reverse';
  addCard: (card: Flashcard) => void;
  removeCard: (id: number) => void;
  addPresetCards: (newCards: Flashcard[]) => void;
  setCurrentCard: (card: Flashcard | null) => void;
  setChoices: (choices: string[]) => void;
  getRandomCard: (excludeId?: number) => Flashcard | null;
  getRandomChoices: (correct: string) => string[];
  incrementReviewed: () => void;
  setQuizMode: (mode: 'normal' | 'reverse') => void;
}

export const useFlashcardStore = create<FlashcardState>()(
  persist(
    (set, get) => ({
      cards: [],
      currentCard: null,
      choices: [],
      reviewedCount: 0,
      lastPracticedDate: null,
      streak: 0,
      quizMode: 'normal',

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
        let options;
        if (state.quizMode === 'normal') {
          // Correct is translation, choices are other translations
          options = state.cards.map((c) => c.translation).filter((t) => t !== correct);
        } else {
          // Reverse: correct is word, choices are other words
          options = state.cards.map((c) => c.word).filter((w) => w !== correct);
        }
        const shuffled = options.sort(() => 0.5 - Math.random()).slice(0, 3);
        const allChoices = [...shuffled, correct].sort(() => 0.5 - Math.random());
        return allChoices;
      },

      incrementReviewed: () =>
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          let newStreak = state.streak;
          if (state.lastPracticedDate === today) {
            // Already practiced today, no change
          } else if (state.lastPracticedDate === new Date(Date.now() - 86400000).toISOString().split('T')[0]) {
            // Yesterday, increment streak
            newStreak += 1;
          } else {
            // Gap, reset to 1
            newStreak = 1;
          }
          return {
            reviewedCount: state.reviewedCount + 1,
            lastPracticedDate: today,
            streak: newStreak,
          };
        }),

      setQuizMode: (mode) => set({ quizMode: mode }),
    }),
    {
      name: 'flashcard-storage',
      partialize: (state) => ({ cards: state.cards, reviewedCount: state.reviewedCount, lastPracticedDate: state.lastPracticedDate, streak: state.streak, quizMode: state.quizMode }), // Persist cards and progress
    }
  )
);