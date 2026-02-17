# AGENTS.md

This file provides guidelines for agentic coding agents (e.g., opencode with GitHub Copilot) working in the Vibe Flashcard repository. It covers essential commands, code style conventions, and any project-specific rules.

## Build/Lint/Test Commands

- **Development Server**: `npm run dev` (runs Next.js with Turbopack for fast development).
- **Production Build**: `npm run build` (builds the app for production).
- **Production Start**: `npm run start` (starts the built production app).
- **Linting**: `npm run lint` (runs ESLint with Next.js core-web-vitals and TypeScript rules).
- **Testing**: No test scripts or frameworks configured. There are no existing tests, so run `npm run lint` for basic checks. For single-test runs: N/A (add Jest or similar if needed).

## Code Style Guidelines

Follow these conventions to maintain consistency. Enforce with `npm run lint` and TypeScript strict mode.

### Imports
- Group imports logically: "use client" directive first (if needed), then React, third-party, local.
- Use named imports (e.g., `import { useState } from "react"`).
- Use `import type` for TypeScript types (e.g., `import type { Metadata } from "next"`).
- Use path aliases: `@/*` for src-relative paths (e.g., `import { Component } from "@/components"`).
- Avoid unused imports; keep import blocks clean.

### Formatting
- Indentation: 2 spaces.
- Semicolons: Omit except where required (e.g., after `export default`).
- Quotes: Single quotes for strings.
- Line Length: No strict limit; keep readable (break long JSX).
- JSX: Indent multi-line elements; self-closing tags where appropriate.
- Spacing: Single space around operators, after commas, before/after braces.
- Comments: Use inline `//` for descriptions; avoid block comments.

### Types
- Enable strict TypeScript (`strict: true` in tsconfig.json).
- Define interfaces in PascalCase (e.g., `interface Flashcard { id: number; word: string; translation: string; }`).
- Use explicit types for state, props, and parameters (e.g., `useState<Flashcard[]>([])`).
- Use union types for variants (e.g., `"success" | "error" | null`).
- Avoid `any`; prefer specific types or interfaces.
- For components, use `Readonly<{ children: React.ReactNode }>` for props.

### Naming Conventions
- Components: PascalCase (e.g., `Home`).
- Variables/Functions: camelCase (e.g., `currentCard`, `handleAddCard`).
- Interfaces: PascalCase (e.g., `Flashcard`).
- Files: PascalCase for components (e.g., `PresetCards.tsx`), kebab-case for configs (e.g., `next.config.ts`).
- Hooks: Standard React (e.g., `useState`, `useCallback`).
- CSS Classes: Tailwind utilities with DaisyUI (e.g., `btn btn-primary`).

### Error Handling
- Use defensive programming: Trim inputs, check for empty values.
- Handle errors minimally: Empty catches for non-critical ops (e.g., localStorage).
- Provide user feedback via state (e.g., toasts for success/error).
- No global error boundaries; avoid silent failures.
- Validate forms client-side (e.g., required fields).

### General Patterns
- Component Structure: Functional with hooks; "use client" for interactivity.
- State Management: Local `useState`; sync to localStorage via `useEffect`.
- Styling: Tailwind + DaisyUI (theme: "cupcake"); utility-first, no custom CSS.
- File Organization: App router (`src/app/`); presets in JSON with utility modules.
- Performance: Use `useCallback` for memoized functions; proper dependency arrays.
- Accessibility: Basic ARIA (e.g., `aria-label`); responsive with Tailwind.
- Dependencies: Modern stack (React 19, Next.js 15); use `react-icons` for icons.

## Additional Rules
- No Cursor or Copilot-specific rules found (no `.cursorrules`, `.cursor/rules/`, or `.github/copilot-instructions.md`).
- Follow Next.js best practices; keep code simple for a client-side app.
- For changes, run `npm run lint` and `npm run build` to verify.
- Commit conventions: Use conventional commits (e.g., `feat: add new feature`, `fix: resolve bug`, `refactor: improve code structure`, `test: add unit tests`). Include scope if relevant (e.g., `feat(auth): implement login`).
- After implementation, always update remaining and completed tasks in plans/*.md files.
- Commit after completing a todo/feature; ask user to confirm first before commit.