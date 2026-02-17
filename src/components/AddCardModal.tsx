import { FaPlus } from "react-icons/fa";

interface AddCardModalProps {
  show: boolean;
  word: string;
  translation: string;
  onWordChange: (value: string) => void;
  onTranslationChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AddCardModal({
  show,
  word,
  translation,
  onWordChange,
  onTranslationChange,
  onClose,
  onSubmit
}: AddCardModalProps) {
  if (!show) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <FaPlus className="text-primary" /> Add New Card
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Fill in the original word and its translation to add a new flashcard.
        </p>
        <form
          onSubmit={(e) => {
            onSubmit(e);
            onClose();
          }}
          className="form-control gap-6"
        >
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="word" className="label text-base-content">Original word</label>
            <input
              id="word"
              className="input input-bordered input-primary text-lg"
              placeholder="e.g. 你好 (nǐ hǎo)"
              value={word}
              onChange={(e) => onWordChange(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="translation" className="label text-base-content">Translation</label>
            <input
              id="translation"
              className="input input-bordered input-secondary text-lg"
              placeholder="e.g. Hello"
              value={translation}
              onChange={(e) => onTranslationChange(e.target.value)}
              required
            />
          </div>
          <div className="divider my-0 mb-4" />
          <div className="modal-action flex gap-2 justify-end">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary gap-2" type="submit">
              <FaPlus /> Add Card
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}