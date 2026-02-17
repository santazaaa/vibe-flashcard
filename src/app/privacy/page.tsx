export default function Privacy() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Vibe Flashcard respects your privacy. We use Google AdSense to display ads, which may collect data as described in Google&apos;s privacy policy.
        No personal data is stored or shared beyond what&apos;s necessary for the app&apos;s functionality (e.g., localStorage for your cards).
      </p>
      <p>
        For more details, visit <a href="https://policies.google.com/privacy" className="link link-primary">Google&apos;s Privacy Policy</a>.
      </p>
    </div>
  );
}