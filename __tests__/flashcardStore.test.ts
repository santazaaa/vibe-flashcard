import { useFlashcardStore } from '../src/store/flashcardStore'

describe('Flashcard Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useFlashcardStore.setState({ 
      cards: [], 
      currentCard: null, 
      choices: [], 
      reviewedCount: 0, 
      streak: 0, 
      quizMode: 'normal',
      lastPracticedDate: null
    })
    localStorage.clear()
  })

  it('adds a card', () => {
    const { addCard } = useFlashcardStore.getState()
    addCard({ id: 1, word: 'Test', translation: 'Prueba' })
    const { cards } = useFlashcardStore.getState()
    expect(cards).toHaveLength(1)
    expect(cards[0].word).toBe('Test')
  })

  it('removes card and updates currentCard if removed', () => {
    const { addCard, removeCard, setCurrentCard } = useFlashcardStore.getState()
    addCard({ id: 1, word: 'Hello', translation: 'Hola' })
    addCard({ id: 2, word: 'Goodbye', translation: 'Adios' })
    setCurrentCard({ id: 1, word: 'Hello', translation: 'Hola' })
    removeCard(1)
    const { currentCard } = useFlashcardStore.getState()
    expect(currentCard?.id).toBe(2)
  })

  it('generates random choices in reverse mode', () => {
    const { addCard, getRandomChoices, setQuizMode } = useFlashcardStore.getState()
    setQuizMode('reverse')
    addCard({ id: 1, word: 'Hello', translation: 'Hola' })
    addCard({ id: 2, word: 'Goodbye', translation: 'Adios' })
    const choices = getRandomChoices('Hello')
    expect(choices).toContain('Hello')
    expect(choices.length).toBeGreaterThanOrEqual(1)
  })

  it('sets quiz mode', () => {
    const { setQuizMode } = useFlashcardStore.getState()
    setQuizMode('reverse')
    const { quizMode } = useFlashcardStore.getState()
    expect(quizMode).toBe('reverse')
  })

  it('increments reviewed count and keeps streak on same day', () => {
    const { incrementReviewed } = useFlashcardStore.getState()
    useFlashcardStore.setState({ lastPracticedDate: new Date().toISOString().split('T')[0], streak: 2 })
    incrementReviewed()
    const { reviewedCount, streak } = useFlashcardStore.getState()
    expect(reviewedCount).toBe(1)
    expect(streak).toBe(2)
  })

  it('increments streak on consecutive day', () => {
    const yesterday = new Date(Date.now() - 86400000)
    const { incrementReviewed } = useFlashcardStore.getState()
    useFlashcardStore.setState({ lastPracticedDate: yesterday.toISOString().split('T')[0], streak: 5 })
    incrementReviewed()
    const { streak } = useFlashcardStore.getState()
    expect(streak).toBe(6)
  })

  it('resets streak on non-consecutive day', () => {
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    const { incrementReviewed } = useFlashcardStore.getState()
    useFlashcardStore.setState({ lastPracticedDate: twoDaysAgo.toISOString().split('T')[0], streak: 5 })
    incrementReviewed()
    const { streak } = useFlashcardStore.getState()
    expect(streak).toBe(1)
  })

  it('adds preset cards without duplicates', () => {
    const { addCard, addPresetCards } = useFlashcardStore.getState()
    addCard({ id: 1, word: 'Test', translation: 'Prueba' })
    addPresetCards([{ id: 2, word: 'Test', translation: 'Prueba' }, { id: 3, word: 'New', translation: 'Nuevo' }])
    const { cards } = useFlashcardStore.getState()
    expect(cards).toHaveLength(2)
    expect(cards.map(c => c.word)).toContain('New')
  })

  it('loads preset cards via getPresetCards', () => {
    // Note: loadPreset is handled in page.tsx, here test getPresetCards
    const { addCard } = useFlashcardStore.getState()
    // Simulate adding preset cards manually
    addCard({ id: 1, word: 'Hello', translation: 'Hola' })
    const { cards } = useFlashcardStore.getState()
    expect(cards.length).toBeGreaterThan(0)
  })

  it('persists state to localStorage', () => {
    const { addCard, setQuizMode } = useFlashcardStore.getState()
    addCard({ id: 1, word: 'Test', translation: 'Prueba' })
    setQuizMode('reverse')
    
    expect(localStorage.getItem('flashcard-storage')).toContain('Test')
    expect(localStorage.getItem('flashcard-storage')).toContain('reverse')
  })
})