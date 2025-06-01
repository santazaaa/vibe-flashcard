import presetCards from '../presets/mandarin-lv1.json';

export interface Flashcard {
  id: number;
  word: string;
  translation: string;
}

export function getPresetCards(): Flashcard[] {
  return presetCards;
} 