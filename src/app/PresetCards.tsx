import mandarinCards from '../presets/mandarin-lv1.json';
import spanishCards from '../presets/spanish-lv1.json';
import frenchCards from '../presets/french-lv1.json';

export interface Flashcard {
  id: number;
  word: string;
  translation: string;
}

export const presetOptions = {
  mandarin: mandarinCards,
  spanish: spanishCards,
  french: frenchCards,
};

export function getPresetCards(language: keyof typeof presetOptions): Flashcard[] {
  return presetOptions[language];
} 