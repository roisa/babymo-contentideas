import { AnimatorClient } from "./animator-client";

export const metadata = {
  title: "Animator · Baby Mo Studio",
  description: "Build a Baby Mo reel — pick poses, theme, and motion. Screen-record it for TikTok or IG Reels.",
};

export default function AnimatePage() {
  return (
    <div className="px-4 md:px-8 py-5 max-w-7xl mx-auto">
      <header className="mb-5">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Animator</div>
        <h1 className="text-2xl font-bold mt-1">Build a Reel</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pick 1-3 Baby Mo poses, choose a scene, hit Record mode, then screen-record the loop on iPhone or QuickTime.
        </p>
      </header>
      <AnimatorClient />
    </div>
  );
}
