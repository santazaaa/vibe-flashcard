interface HeaderProps {
  cardCount: number;
}

export default function Header({ cardCount }: HeaderProps) {
  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-10 mb-4">
      <div className="navbar-start">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary flex items-center gap-2">
          <span role="img" aria-label="flashcard">🃏</span> Vibe Flashcard
        </span>
      </div>
      <div className="navbar-end">
        <span className="badge badge-primary badge-outline text-xs sm:text-sm">{cardCount} cards</span>
      </div>
    </div>
  );
}