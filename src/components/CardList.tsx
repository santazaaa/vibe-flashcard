import { FaPlus, FaTrash } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import Ad from "./Ad";

interface Flashcard {
  id: number;
  word: string;
  translation: string;
}

interface CardListProps {
  cards: Flashcard[];
  onAddPreset: (language: string) => void;
  onRemoveCard: (id: number) => void;
  onOpenAddModal: () => void;
}

export default function CardList({ cards, onAddPreset, onRemoveCard, onOpenAddModal }: CardListProps) {
  return (
    <div className="card w-full md:w-1/2 bg-base-100 p-4">
      <div className="card-body">
        <button className="card-title flex items-center gap-2 btn btn-ghost" onClick={onOpenAddModal} type="button">
              <svg
                className="text-primary"
                fill="currentColor"
                height="1em"
                stroke="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
              Add New Card
            </button>
        <div className="flex gap-2 mb-4">
          <button
            className="btn btn-outline btn-accent flex-1"
            type="button"
            onClick={() => onAddPreset('mandarin')}
          >
            <MdLibraryAdd className="text-lg" /> Mandarin
          </button>
          <button
            className="btn btn-outline btn-secondary flex-1"
            type="button"
            onClick={() => onAddPreset('spanish')}
          >
            <MdLibraryAdd className="text-lg" /> Spanish
          </button>
          <button
            className="btn btn-outline btn-info flex-1"
            type="button"
            onClick={() => onAddPreset('french')}
          >
            <MdLibraryAdd className="text-lg" /> French
          </button>
          <button
            className="btn btn-primary flex-1"
            type="button"
            onClick={onOpenAddModal}
          >
            <FaPlus /> Custom
          </button>
        </div>

        <Ad slot="SIDEBAR_RECTANGLE_SLOT" format="rectangle" className="mb-4" />

        <h3 className="card-title">Your Cards</h3>
        <ul className="menu max-h-60 overflow-y-auto gap-2">
          {cards.length === 0 && <li className="text-gray-400">No cards yet.</li>}
          {cards.map((c) => (
            <li key={`${c.id}-${c.word}-${c.translation}`} className="card bg-base-200 flex flex-row justify-between items-center hover:bg-primary/10 p-3">
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