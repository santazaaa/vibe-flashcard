"use client";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";

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
  const [showChoices, setShowChoices] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Preset Mandarin flashcards
  const presetCards: Flashcard[] = [
    { id: 10001, word: "你好 (nǐ hǎo)", translation: "Hello" },
    { id: 10002, word: "谢谢 (xiè xie)", translation: "Thank you" },
    { id: 10003, word: "再见 (zài jiàn)", translation: "Goodbye" },
    { id: 10004, word: "请 (qǐng)", translation: "Please" },
    { id: 10005, word: "对不起 (duì bu qǐ)", translation: "Sorry" },
    { id: 10006, word: "是 (shì)", translation: "Yes/To be" },
    { id: 10007, word: "不是 (bú shì)", translation: "No/Not to be" },
    { id: 10008, word: "我 (wǒ)", translation: "I/Me" },
    { id: 10009, word: "你 (nǐ)", translation: "You" },
    { id: 10010, word: "他 (tā)", translation: "He/Him" },
    { id: 10011, word: "她 (tā)", translation: "She/Her" },
    { id: 10012, word: "我们 (wǒ men)", translation: "We/Us" },
    { id: 10013, word: "他们 (tā men)", translation: "They/Them" },
    { id: 10014, word: "好 (hǎo)", translation: "Good" },
    { id: 10015, word: "不好 (bù hǎo)", translation: "Not good" },
    { id: 10016, word: "中国 (Zhōng guó)", translation: "China" },
    { id: 10017, word: "美国 (Měi guó)", translation: "USA" },
    { id: 10018, word: "老师 (lǎo shī)", translation: "Teacher" },
    { id: 10019, word: "学生 (xué shēng)", translation: "Student" },
  ];

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
  const getRandomChoices = (correct: string) => {
    const translations = cards.map((c) => c.translation).filter((t) => t !== correct);
    const shuffled = translations.sort(() => 0.5 - Math.random()).slice(0, 3);
    const allChoices = [...shuffled, correct].sort(() => 0.5 - Math.random());
    return allChoices;
  };

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
      setShowChoices(false);
      setFeedback(null);
      setFeedbackType(null);
    }
  };

  // Always show choices for the current card
  useEffect(() => {
    if (currentCard) {
      setChoices(getRandomChoices(currentCard.translation));
    }
  }, [currentCard, cards]);

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
        setShowChoices(false);
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
        <div className="card w-full md:w-1/2 bg-base-100 shadow-2xl p-4">
          <div className="card-body flex flex-col items-center gap-4">
            <h2 className="card-title">Practice</h2>
            {currentCard ? (
              <>
                <div
                  className="card w-full bg-primary text-primary-content shadow-2xl mb-4 flex items-center justify-center min-h-[120px] text-3xl text-center select-none p-6"
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
        <div className="card w-full md:w-1/2 bg-base-100 shadow-xl p-4">
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
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><FaPlus className="text-primary" /> Add New Card</h3>
                  <form
                    onSubmit={e => {
                      handleAddCard(e);
                      setShowAddModal(false);
                    }}
                    className="form-control gap-4"
                  >
                    <input
                      className="input input-bordered input-primary"
                      placeholder="Original word"
                      value={word}
                      onChange={e => setWord(e.target.value)}
                      autoFocus
                    />
                    <input
                      className="input input-bordered input-secondary"
                      placeholder="Translation"
                      value={translation}
                      onChange={e => setTranslation(e.target.value)}
                    />
                    <div className="modal-action">
                      <button type="button" className="btn" onClick={() => setShowAddModal(false)}>Cancel</button>
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

      <footer className="footer bg-base-300 text-base-content p-4 flex justify-center items-center">
        <aside className="flex items-center gap-1">
          &copy; {new Date().getFullYear()} Vibe Flashcard. Made with <span className="text-pink-500">♥</span> and Next.js.
        </aside>
      </footer>
    </div>
  );
}
