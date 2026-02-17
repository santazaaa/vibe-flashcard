import { useFlashcardStore } from '../src/store/flashcardStore'

describe('Flashcard Store', () => {
  beforeEach(() => {
    // Reset store before each test
    const { cards, setCurrentCard, setChoices } = useFlashcardStore.getState()
    // Clear persisted state if any
    localStorage.clear()
  })

  it('adds a card', () => {
    const { addCard, cards } = useFlashcardStore.getState()
    addCard({ id: 1, word: 'Test', translation: 'Prueba' })
    expect(cards).toHaveLength(1)
    expect(cards[0].word).toBe('Test')
  })

  it('removes a card', () => {
    const { addCard, removeCard, cards } = useFlashcardStore.getState()
    addCard({ id: 1, word: 'Test', translation: 'Prueba' })
    removeCard(1)
    expect(cards).toHaveLength(0)
  })

  it('generates random choices', () => {
    const { addCard, getRandomChoices } = useFlashcardStore.getState()
    addCard({ id: 1, word: 'Hello', translation: 'Hola' })
    addCard({ id: 2, word: 'Goodbye', translation: 'Adios' })
    const choices = getRandomChoices('Hola')
    expect(choices).toContain('Hola')
    expect(choices.length).toBeGreaterThanOrEqual(1)
  })
})