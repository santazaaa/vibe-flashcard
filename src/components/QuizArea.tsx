interface Flashcard {
  id: number;
  word: string;
  translation: string;
}

interface QuizAreaProps {
  currentCard: Flashcard | null;
  choices: string[];
  onChoice: (choice: string) => void;
}

export default function QuizArea({ currentCard, choices, onChoice }: QuizAreaProps) {
  return (
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
                  onClick={() => onChoice(choice)}
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
  );
}