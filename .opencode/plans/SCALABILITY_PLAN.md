# Scalability Plan for Vibe Flashcard

This document outlines the plan to make the Vibe Flashcard codebase more scalable, maintainable, and ready for new features like user accounts, shared decks, advanced quiz modes, and multi-language support.

## Overview
The app started as a monolithic single-page Next.js app with localStorage. The goal is to refactor into modular components, implement robust state management, add backend preparation, enable routing, include testing, and optimize performance.

## Completed Tasks
- **Component Modularity**: Broke down `page.tsx` into reusable components (`Header`, `Footer`, `QuizArea`, `CardList`, `AddCardModal`, `ToastNotification`) in `src/components/`.
- **Custom Hooks**: Extracted logic into hooks (`useQuiz`, `useCards`, `useAddModal`), then migrated to Zustand.
- **State Management with Zustand**: Created `flashcardStore.ts` with actions for cards, presets, and quiz state; added persist middleware for localStorage.
- **State Migration**: Replaced local useState with Zustand store.
- **API Routes**: Added `src/app/api/cards/route.ts` for CRUD (removed as unused placeholder).
- **Testing Setup**: Installed Jest + React Testing Library and Playwright.
- **Write Tests**: Added unit tests for components (QuizArea, CardList) and store (flashcardStore).

## Remaining Tasks
- **Supabase Integration**: Connect to Supabase for database, auth, and shared decks.
- **Routing and Pages**: Implement App Router pages (`/dashboard`, `/decks`, `/decks/[id]`, `/modes/[mode]`).
- **Navigation and Auth**: Add navbar, breadcrumbs, and middleware for protected routes.
- **Performance Optimizations**: Add memoization, lazy loading, virtualization.

## Priorities
- High: State management (done), Modularity (done).
- Medium: Routing, Testing, Supabase.
- Low: Performance.

## Potential New Features
- User Accounts: Auth with Supabase, user-specific cards/decks.
- Shared Decks: Public/private decks with API.
- Advanced Modes: Spaced repetition, typing quizzes via routing.
- Multi-Language: i18n support.

## Notes
- Build and lint pass after each change.
- Removed unused hooks/API as per review.
- Feature branch `feature/scalability-refactor` created with commits.</content>
<parameter name="filePath">SCALABILITY_PLAN.md