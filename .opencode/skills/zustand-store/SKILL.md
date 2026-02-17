---
name: zustand-store
description: Manage app state with Zustand, including persistence and actions for quiz modes, progress, etc.
license: MIT
compatibility: opencode
metadata:
  audience: developers
  state: zustand
---

## What I do
- Define Zustand stores with create and persist middleware.
- Add state slices (e.g., quizMode, reviewedCount) and actions (e.g., setQuizMode, incrementReviewed).
- Ensure persistence for localStorage, following project patterns in store/flashcardStore.ts.

## When to use me
Use for adding or modifying app state. Provide state fields, actions, and persistence needs.

## Examples
For quiz mode state:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuizState {
  quizMode: 'normal' | 'reverse';
  setQuizMode: (mode: 'normal' | 'reverse') => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      quizMode: 'normal',
      setQuizMode: (mode) => set({ quizMode: mode }),
    }),
    { name: 'quiz-storage' }
  )
);
```