import { render, screen, fireEvent } from '@testing-library/react'
import CardList from '../src/components/CardList'
import { Flashcard } from '../src/types/flashcard'

describe('CardList', () => {
  const mockCards: Flashcard[] = [
    { id: 1, word: 'Hello', translation: 'Hola' },
    { id: 2, word: 'Goodbye', translation: 'Adios' },
  ]

  it('renders card list', () => {
    render(<CardList cards={mockCards} onAddPreset={() => {}} onRemoveCard={() => {}} onOpenAddModal={() => {}} />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('Hola')).toBeInTheDocument()
  })

  it('shows "No cards yet." when empty', () => {
    render(<CardList cards={[]} onAddPreset={() => {}} onRemoveCard={() => {}} onOpenAddModal={() => {}} />)
    expect(screen.getByText('No cards yet.')).toBeInTheDocument()
  })

  it('calls onOpenAddModal when add card button clicked', () => {
    const mockOpen = jest.fn()
    render(<CardList cards={mockCards} onAddPreset={() => {}} onRemoveCard={() => {}} onOpenAddModal={mockOpen} />)
    fireEvent.click(screen.getByText('Add Card'))
    expect(mockOpen).toHaveBeenCalled()
  })
})