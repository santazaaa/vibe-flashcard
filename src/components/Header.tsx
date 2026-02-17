import Ad from "./Ad";
import { useFlashcardStore } from "../store/flashcardStore";
import { ADSENSE_CONFIG } from "../config/adsense";

interface HeaderProps {
  cardCount: number;
}

export default function Header({ cardCount }: HeaderProps) {
  const { quizMode, setQuizMode } = useFlashcardStore();

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-10 mb-4">
      <div className="navbar-start">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary flex items-center gap-2">
          <span role="img" aria-label="flashcard">🃏</span> Vibe Flashcard
        </span>
      </div>
      <div className="navbar-center hidden md:flex">
        <Ad slot={ADSENSE_CONFIG.adUnits.headerBanner} format="horizontal" className="w-full max-w-xs" />
      </div>
      <div className="navbar-end flex items-center gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-sm">
            Mode: {quizMode === 'normal' ? 'Normal' : 'Reverse'}
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={() => setQuizMode('normal')}>Normal (Word → Translation)</a></li>
            <li><a onClick={() => setQuizMode('reverse')}>Reverse (Translation → Word)</a></li>
          </ul>
        </div>
        <span className="badge badge-primary badge-outline text-xs sm:text-sm">{cardCount} cards</span>
      </div>
    </div>
  );
}