import Ad from "./Ad";
import { ADSENSE_CONFIG } from "../config/adsense";

export default function Footer() {
  return (
    <footer className="footer bg-base-300 text-base-content p-4 flex justify-center items-center sticky bottom-0">
      <Ad slot={ADSENSE_CONFIG.adUnits.footerBanner} format="horizontal" className="mb-2 w-full max-w-sm" />
      <aside className="flex items-center gap-1">
        &copy; {new Date().getFullYear()} Vibe Flashcard. Made with <span className="text-pink-500">♥</span> and Next.js.
      </aside>
    </footer>
  );
}