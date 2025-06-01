"use client";
import { useState } from "react";
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

  // Show choices for current card
  const handleShowChoices = () => {
    if (!currentCard) return;
    setChoices(getRandomChoices(currentCard.translation));
    setShowChoices(true);
    setFeedback(null);
    setFeedbackType(null);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-primary/10 flex flex-col items-center">
      {/* Header Bar */}
      <div className="navbar bg-base-100 shadow-md mb-8 sticky top-0 z-10 px-6">
        <div className="flex-1">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary flex items-center gap-2">
            <span role="img" aria-label="flashcard">🃏</span> Vibe Flashcard
          </span>
        </div>
        <div className="flex-none">
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
      <main className="w-full max-w-4xl flex flex-col md:flex-row gap-10 justify-center items-start px-4">
        {/* Card List */}
        <div className="card w-full md:w-1/2 bg-base-100 rounded-2xl shadow-xl mb-8 md:mb-0 animate-fade-in">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold mb-2 flex items-center gap-2">
              <FaPlus className="text-primary" /> Add New Card
            </h2>
            <button
              className="btn btn-outline btn-accent btn-block gap-2 mb-4"
              type="button"
              onClick={handleAddPreset}
            >
              <MdLibraryAdd className="text-lg" /> Add Mandarin Preset Cards
            </button>
            <form onSubmit={handleAddCard} className="flex flex-col gap-3 mb-4">
              <input
                className="input input-bordered input-primary w-full"
                placeholder="Original word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                autoFocus
              />
              <input
                className="input input-bordered input-secondary w-full"
                placeholder="Translation"
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
              />
              <button className="btn btn-primary btn-block gap-2" type="submit">
                <FaPlus /> Add Card
              </button>
            </form>
            <h3 className="text-lg font-semibold mb-2">Your Cards</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {cards.length === 0 && <li className="text-gray-400">No cards yet.</li>}
              {cards.map((c) => (
                <li key={c.id} className="card bg-base-200 p-3 rounded-lg shadow-sm flex-row flex justify-between items-center transition hover:bg-primary/10">
                  <span className="font-medium text-base">
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

        {/* Practice Area */}
        <div className="card w-full md:w-1/2 bg-gradient-to-br from-primary/10 to-base-100 rounded-2xl shadow-2xl animate-fade-in">
          <div className="card-body flex flex-col items-center">
            <h2 className="card-title text-xl font-bold mb-4 text-primary">Practice</h2>
            {currentCard ? (
              <>
                <div
                  className="card w-full max-w-md bg-primary text-primary-content shadow-2xl mb-6 cursor-pointer transition-transform duration-200 hover:scale-105 animate-fade-in flex items-center justify-center min-h-[120px] text-3xl font-semibold tracking-wide text-center select-none"
                  onClick={!showChoices ? handleShowChoices : undefined}
                  style={{ minHeight: 120 }}
                >
                  {currentCard.word}
                </div>
                {showChoices && (
                  <div className="flex flex-col gap-3 w-full animate-fade-in">
                    {choices.map((choice) => (
                      <button
                        key={choice}
                        className="btn btn-outline btn-lg w-full transition-colors duration-150 hover:btn-primary"
                        onClick={() => handleChoice(choice)}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                )}
                {!showChoices && (
                  <div className="text-gray-400 text-sm mt-2">Click the card to show choices</div>
                )}
              </>
            ) : (
              <div className="text-gray-400 text-lg">Add some cards to start practicing!</div>
            )}
          </div>
        </div>
      </main>
      <footer className="mt-12 mb-4 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Vibe Flashcard. Made with <span className="text-pink-500">♥</span> and Next.js.
      </footer>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
