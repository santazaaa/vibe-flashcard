# Monetization Feature Plan for Vibe Flashcard

This document outlines prioritized features to support monetization via Google AdSense, focusing on quick wins first to increase user engagement and ad impressions.

## Quick Wins (1-3 days, high impact, low effort)
1. **Implement AdSense Ads** (Completed)
   - Added AdSense script to layout.tsx.
   - Created Ad component with banners in Header/Footer, rectangle in CardList.
   - Added /privacy page.
   - Status: Done. Replace publisher ID and ad slots with real values.

2. **Add Basic Progress Tracking** (Completed)
   - Added reviewedCount, streak to Zustand store with persist.
   - Display stats in QuizArea using daisyUI stats component.
   - Increment on correct answers; streak tracks consecutive days.

3. **Expand Quiz Modes** (Completed)
   - Added quizMode ('normal' | 'reverse') to Zustand store with persistence.
   - Normal: word → translation; Reverse: translation → word.
   - Added dropdown toggle in Header.
   - Updated logic for correct answers and choices generation.

## Short-Term Features (1-2 weeks, moderate effort)
4. **User Accounts via Supabase**
   - Add auth for saving cards/decks online.
   - Why: Personalized decks; users return daily.

5. **Enhanced Presets and Customization** (Completed)
   - Added preset options for Mandarin, Spanish, French with JSON files.
   - Updated CardList with language buttons; dynamic loading via getPresetCards.

6. **Basic Analytics/Tracking**
   - Integrate Plausible or Google Analytics.

## Medium-Term Features (2-4 weeks)
7. **Shared/Public Decks**
   - Allow sharing and browsing via Supabase.

8. **Spaced Repetition Algorithm**
   - Implement SRS for smarter scheduling.

## Notes
- Update this plan after each implementation.
- Test ad performance post-deployment.
- Build and lint pass after changes.</content>
<parameter name="filePath">.opencode/plans/MONETIZATION_FEATURE_PLAN.md