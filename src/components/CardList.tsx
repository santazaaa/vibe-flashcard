import { FaPlus, FaTrash } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";

interface Flashcard {
  id: number;
  word: string;
  translation: string;
}

interface CardListProps {
  cards: Flashcard[];
  onAddPreset: () => void;
  onRemoveCard: (id: number) => void;
  onOpenAddModal: () => void;
}

export default function CardList({ cards, onAddPreset, onRemoveCard, onOpenAddModal }: CardListProps) {
  return (
    <div className="card w-full md:w-1/2 bg-base-100 p-4">
      <div className="card-body">
        <h2 className="card-title flex items-center gap-2">
          <FaPlus className="text-primary" /> Add New Card
        </h2>
        <div className="flex gap-2 mb-4">
          <button
            className="btn btn-outline btn-accent flex-1"
            type="button"
            onClick={onAddPreset}
          >
            <MdLibraryAdd className="text-lg" /> Add Mandarin Preset Cards
          </button>
          <button
            className="btn btn-primary flex-1"
            type="button"
            onClick={onOpenAddModal}
          >
            <FaPlus /> Add Card
          </button>
        </div>

        <h3 className="card-title">Your Cards</h3>
        <ul className="menu max-h-60 overflow-y-auto gap-2">
          {cards.length === 0 && <li className="text-gray-400">No cards yet.</li>}
          {cards.map((c) => (
            <li key={c.id} className="card bg-base-200 flex flex-row justify-between items-center hover:bg-primary/10 p-3">
              <span>
                <span className="text-primary font-bold">{c.word}</span> <span className="text-gray-500">→</span> {c.translation}
              </span>
              <button className="btn btn-xs btn-error btn-circle" onClick={() => onRemoveCard(c.id)} title="Remove">
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}