import { render, screen } from '@testing-library/react'
import QuizArea from '../src/components/QuizArea'
import { Flashcard } from '../src/types/flashcard'

describe('QuizArea', () => {
  const mockCard: Flashcard = { id: 1, word: 'Hello', translation: 'Hola' }
  const mockChoices = ['Hola', 'Adios', 'Gracias']

  it('renders the current card word', () => {
    render(<QuizArea currentCard={mockCard} choices={mockChoices} onChoice={() => {}} />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders choice buttons', () => {
    render(<QuizArea currentCard={mockCard} choices={mockChoices} onChoice={() => {}} />)
    mockChoices.forEach(choice => {
      expect(screen.getByText(choice)).toBeInTheDocument()
    })
  })

  it('shows message when no card', () => {
    render(<QuizArea currentCard={null} choices={[]} onChoice={() => {}} />)
    expect(screen.getByText('Add some cards to start practicing!')).toBeInTheDocument()
  })
})