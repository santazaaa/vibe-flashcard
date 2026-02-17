import { useFlashcardStore } from '../src/store/flashcardStore'

describe('Flashcard Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useFlashcardStore.setState({ cards: [], currentCard: null, choices: [] })
    localStorage.clear()
  })

  it('adds a card', () => {
    const { addCard } = useFlashcardStore.getState()
    addCard({ id: 1, word: 'Test', translation: 'Prueba' })
    const { cards } = useFlashcardStore.getState()
    expect(cards).toHaveLength(1)
    expect(cards[0].word).toBe('Test')
  })

  it('removes a card', () => {
    const { addCard, removeCard } = useFlashcardStore.getState()
    addCard({ id: 1, word: 'Test', translation: 'Prueba' })
    removeCard(1)
    const { cards } = useFlashcardStore.getState()
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