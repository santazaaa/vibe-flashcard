import { render, screen, fireEvent } from '@testing-library/react'
import QuizArea from '../src/components/QuizArea'
import { Flashcard } from '../src/types/flashcard'
import { useFlashcardStore } from '../src/store/flashcardStore'

describe('QuizArea', () => {
  const mockCard: Flashcard = { id: 1, word: 'Hello', translation: 'Hola' }
  const mockChoices = ['Hola', 'Adios', 'Gracias']

  beforeEach(() => {
    useFlashcardStore.setState({ quizMode: 'normal', reviewedCount: 0, streak: 0 })
  })

  it('renders the current card word in normal mode', () => {
    render(<QuizArea currentCard={mockCard} choices={mockChoices} onChoice={() => {}} reviewedCount={0} streak={0} quizMode={'normal'} />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders the current card translation in reverse mode', () => {
    const reverseCard = { id: 1, word: 'Hello', translation: 'Bonjour' }
    const reverseChoices = ['Hello', 'Goodbye', 'Thank you']
    render(<QuizArea currentCard={reverseCard} choices={reverseChoices} onChoice={() => {}} reviewedCount={0} streak={0} quizMode={'reverse'} />)
    expect(screen.getByText('Bonjour')).toBeInTheDocument()
  })

  it('calls onChoice when choice button clicked', () => {
    const mockOnChoice = jest.fn()
    render(<QuizArea currentCard={mockCard} choices={mockChoices} onChoice={mockOnChoice} reviewedCount={0} streak={0} quizMode={'normal'} />)
    fireEvent.click(screen.getByText('Hola'))
    expect(mockOnChoice).toHaveBeenCalledWith('Hola')
  })

  it('renders choice buttons', () => {
    render(<QuizArea currentCard={mockCard} choices={mockChoices} onChoice={() => {}} reviewedCount={0} streak={0} quizMode={'normal'} />)
    mockChoices.forEach(choice => {
      expect(screen.getByText(choice)).toBeInTheDocument()
    })
  })

  it('renders stats', () => {
    render(<QuizArea currentCard={mockCard} choices={mockChoices} onChoice={() => {}} reviewedCount={5} streak={3} quizMode={'normal'} />)
    expect(screen.getByText('Cards Reviewed')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('Streak')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('shows message when no card', () => {
    render(<QuizArea currentCard={null} choices={[]} onChoice={() => {}} reviewedCount={0} streak={0} quizMode={'normal'} />)
    expect(screen.getByText('Add some cards to start practicing!')).toBeInTheDocument()
  })
})