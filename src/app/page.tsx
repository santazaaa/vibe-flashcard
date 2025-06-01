"use client";
import { useState, useEffect, useCallback } from "react";
import { FaPlus, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { getPresetCards, Flashcard as PresetFlashcard } from "./PresetCards";

interface Flashcard {
  id: number;
  word: string;
  translation: string;
}

export default function Home() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Get preset Mandarin flashcards from JSON
  const presetCards: PresetFlashcard[] = getPresetCards();

  // Load cards from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("flashcards");
    if (stored) {
      try {
        setCards(JSON.parse(stored));
      } catch { }
    }
  }, []);

  // Save cards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(cards));
  }, [cards]);

  // Helper to get a random card
  const getRandomCard = (excludeId?: number) => {
    const filtered = excludeId ? cards.filter((c) => c.id !== excludeId) : cards;
    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
  };

  // Helper to get random choices
  const getRandomChoices = useCallback((correct: string) => {
    const translations = cards.map((c) => c.translation).filter((t) => t !== correct);
    const shuffled = translations.sort(() => 0.5 - Math.random()).slice(0, 3);
    const allChoices = [...shuffled, correct].sort(() => 0.5 - Math.random());
    return allChoices;
  }, [cards]);

  // Add card
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !translation.trim()) return;
    const newCard = { id: Date.now(), word: word.trim(), translation: translation.trim() };
    setCards((prev) => [
      ...prev,
      newCard,
    ]);
    setWord("");
    setTranslation("");
    setFeedback(null);
    setFeedbackType(null);
    if (!currentCard) {
      setCurrentCard(newCard);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);
  };

  // Add preset cards
  const handleAddPreset = () => {
    setCards((prev) => {
      const existing = new Set(prev.map(c => c.word + c.translation));
      const newCards = presetCards.filter(c => !existing.has(c.word + c.translation));
      return [...prev, ...newCards];
    });
    if (!currentCard && presetCards.length > 0) {
      setCurrentCard(presetCards[0]);
    }
    setShowToast(true);
    setFeedback("Preset cards added!");
    setFeedbackType("success");
    setTimeout(() => setShowToast(false), 1200);
  };

  // Remove card
  const handleRemoveCard = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    if (currentCard && currentCard.id === id) {
      setCurrentCard(getRandomCard(id));
      setFeedback(null);
      setFeedbackType(null);
    }
  };

  // Always show choices for the current card
  useEffect(() => {
    if (currentCard) {
      setChoices(getRandomChoices(currentCard.translation));
    }
  }, [currentCard, cards, getRandomChoices]);

  // Handle answer
  const handleChoice = (choice: string) => {
    if (!currentCard) return;
    if (choice === currentCard.translation) {
      setFeedback("Correct!");
      setFeedbackType("success");
      setShowToast(true);
      setTimeout(() => {
        const next = getRandomCard(currentCard.id);
        setCurrentCard(next);
        setFeedback(null);
        setFeedbackType(null);
        setShowToast(false);
      }, 1000);
    } else {
      setFeedback("Try again!");
      setFeedbackType("error");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1000);
    }
  };

  // Set a card if none
  if (!currentCard && cards.length > 0) {
    setTimeout(() => {
      setCurrentCard(getRandomCard());
    }, 0);
  }

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center gap-4 p-4">
      {/* Header Bar */}
      <div className="navbar bg-base-100 shadow-md sticky top-0 z-10 mb-4">
        <div className="navbar-start">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary flex items-center gap-2">
            <span role="img" aria-label="flashcard">🃏</span> Vibe Flashcard
          </span>
        </div>
        <div className="navbar-end">
          <span className="badge badge-primary badge-outline text-xs sm:text-sm">{cards.length} cards</span>
        </div>
      </div>

      {/* Toast for feedback */}
      {showToast && feedback && (
        <div className="toast toast-center toast-top z-50">
          <div className={`alert ${feedbackType === "success" ? "alert-success" : "alert-error"} flex items-center gap-2`}>
            {feedbackType === "success" ? <FaCheckCircle className="text-lg" /> : <FaTimesCircle className="text-lg" />}
            <span>{feedback}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto flex flex-col md:flex-row gap-8 justify-center items-start">
        {/* Practice Area */}
        <div className="card w-full md:w-1/2 bg-base-100 p-4">
          <div className="card-body flex flex-col items-center gap-4">
            <h2 className="card-title">Practice</h2>
            {currentCard ? (
              <>
                <div
                  className="card w-full bg-primary text-primary-content mb-4 flex items-center justify-center min-h-[120px] text-3xl text-center select-none p-6"
                  style={{ minHeight: 120 }}
                >
                  {currentCard.word}
                </div>
                <div className="form-control w-full gap-3">
                  {choices.map((choice) => (
                    <button
                      key={choice}
                      className="btn btn-outline btn-lg w-full hover:btn-primary"
                      onClick={() => handleChoice(choice)}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-gray-400">Add some cards to start practicing!</div>
            )}
          </div>
        </div>

        {/* Card List */}
        <div className="card w-full md:w-1/2 bg-base-100 p-4">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <FaPlus className="text-primary" /> Add New Card
            </h2>
            <div className="flex gap-2 mb-4">
              <button
                className="btn btn-outline btn-accent flex-1"
                type="button"
                onClick={handleAddPreset}
              >
                <MdLibraryAdd className="text-lg" /> Add Mandarin Preset Cards
              </button>
              <button
                className="btn btn-primary flex-1"
                type="button"
                onClick={() => setShowAddModal(true)}
              >
                <FaPlus /> Add Card
              </button>
            </div>

            {/* Add Card Modal */}
            {showAddModal && (
              <dialog className="modal modal-open">
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><FaPlus className="text-primary" /> Add New Card</h3>
                  <p className="text-sm text-gray-500 mb-4">Fill in the original word and its translation to add a new flashcard.</p>
                  <form
                    onSubmit={e => {
                      handleAddCard(e);
                      setShowAddModal(false);
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
                        onChange={e => setWord(e.target.value)}
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
                        onChange={e => setTranslation(e.target.value)}
                        required
                      />
                    </div>
                    <div className="divider my-0 mb-4" />
                    <div className="modal-action flex gap-2 justify-end">
                      <button type="button" className="btn btn-ghost" onClick={() => setShowAddModal(false)}>Cancel</button>
                      <button className="btn btn-primary gap-2" type="submit">
                        <FaPlus /> Add Card
                      </button>
                    </div>
                  </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button onClick={() => setShowAddModal(false)}>close</button>
                </form>
              </dialog>
            )}
            <h3 className="card-title">Your Cards</h3>
            <ul className="menu max-h-60 overflow-y-auto gap-2">
              {cards.length === 0 && <li className="text-gray-400">No cards yet.</li>}
              {cards.map((c) => (
                <li key={c.id} className="card bg-base-200 flex flex-row justify-between items-center hover:bg-primary/10 p-3">
                  <span>
                    <span className="text-primary font-bold">{c.word}</span> <span className="text-gray-500">→</span> {c.translation}
                  </span>
                  <button className="btn btn-xs btn-error btn-circle" onClick={() => handleRemoveCard(c.id)} title="Remove">
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <footer className="footer bg-base-300 text-base-content p-4 flex justify-center items-center sticky bottom-0">
        <aside className="flex items-center gap-1">
          &copy; {new Date().getFullYear()} Vibe Flashcard. Made with <span className="text-pink-500">♥</span> and Next.js.
        </aside>
      </footer>
    </div>
  );
}
