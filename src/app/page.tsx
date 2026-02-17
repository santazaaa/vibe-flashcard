"use client";
import { useState, useEffect } from "react";
import { getPresetCards } from "./PresetCards";
import { useFlashcardStore } from "../store/flashcardStore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToastNotification from "../components/ToastNotification";
import QuizArea from "../components/QuizArea";
import CardList from "../components/CardList";
import AddCardModal from "../components/AddCardModal";

export default function Home() {
  const {
    cards,
    currentCard,
    choices,
    reviewedCount,
    streak,
    quizMode,
    addCard,
    removeCard,
    addPresetCards,
    setCurrentCard,
    setChoices,
    getRandomCard,
    getRandomChoices,
    incrementReviewed,
  } = useFlashcardStore();

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Add card
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !translation.trim()) return;
    const newCard = { id: Date.now(), word: word.trim(), translation: translation.trim() };
    addCard(newCard);
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
  const handleAddPreset = (language: string) => {
    const presetCards = getPresetCards(language as 'mandarin' | 'spanish' | 'french');
    addPresetCards(presetCards);
    if (!currentCard && presetCards.length > 0) {
      setCurrentCard(presetCards[0]);
    }
    setFeedback(`${language.charAt(0).toUpperCase() + language.slice(1)} cards added!`);
    setFeedbackType("success");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);
  };

  // Remove card
  const handleRemoveCard = (id: number) => {
    removeCard(id);
  };

  // Handle answer
  const handleChoice = (choice: string) => {
    if (!currentCard) return;
    const correct = quizMode === 'normal' ? currentCard.translation : currentCard.word;
    if (choice === correct) {
      incrementReviewed();
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

  // Update choices when currentCard changes
  useEffect(() => {
    if (currentCard) {
      setChoices(getRandomChoices(currentCard.translation));
    }
  }, [currentCard, getRandomChoices, setChoices]);

  // Set a card if none
  useEffect(() => {
    if (!currentCard && cards.length > 0) {
      setCurrentCard(getRandomCard());
    }
  }, [cards, currentCard, getRandomCard, setCurrentCard]);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center gap-4 p-4">
      <Header cardCount={cards.length} />

      <ToastNotification show={showToast} feedback={feedback} feedbackType={feedbackType} />

      <main className="container mx-auto flex flex-col md:flex-row gap-8 justify-center items-start">
        <QuizArea currentCard={currentCard} choices={choices} onChoice={handleChoice} reviewedCount={reviewedCount} streak={streak} quizMode={quizMode} />
        <CardList cards={cards} onAddPreset={handleAddPreset} onRemoveCard={handleRemoveCard} onOpenAddModal={() => setShowAddModal(true)} />
      </main>

      <AddCardModal
        show={showAddModal}
        word={word}
        translation={translation}
        onWordChange={setWord}
        onTranslationChange={setTranslation}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCard}
      />

      <Footer />
    </div>
  );
}