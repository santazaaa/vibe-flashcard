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
    fireEvent.click(screen.getByRole('button', { name: /Add New Card/ }))
    expect(mockOpen).toHaveBeenCalled()
  })

  it('calls onAddPreset when Spanish button clicked', () => {
    const mockAddPreset = jest.fn()
    render(<CardList cards={[]} onAddPreset={mockAddPreset} onRemoveCard={() => {}} onOpenAddModal={() => {}} />)
    fireEvent.click(screen.getByText('Spanish'))
    expect(mockAddPreset).toHaveBeenCalledWith('spanish')
  })

  it('calls onRemoveCard when remove button clicked', () => {
    const mockRemove = jest.fn()
    render(<CardList cards={mockCards} onAddPreset={() => {}} onRemoveCard={mockRemove} onOpenAddModal={() => {}} />)
    fireEvent.click(screen.getAllByTitle('Remove')[0])
    expect(mockRemove).toHaveBeenCalledWith(1)
  })

  it('renders ad component', () => {
    render(<CardList cards={mockCards} onAddPreset={() => {}} onRemoveCard={() => {}} onOpenAddModal={() => {}} />)
    expect(document.querySelector('.adsbygoogle')).toBeInTheDocument()
  })
})