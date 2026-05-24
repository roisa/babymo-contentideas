import { LibraryClient } from "./library-client";

export default function LibraryPage() {
  return (
    <div className="px-6 md:px-10 lg:px-16 py-10 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Your library</h1>
          <p className="text-sm text-muted-foreground mt-1">Everything you've generated. Saved locally in your browser.</p>
        </div>
      </div>
      <LibraryClient />
    </div>
  );
}
