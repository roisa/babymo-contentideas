"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getTheme, type ThemeId } from "@/lib/themes";
import { type Scene } from "./scenes";

/**
 * One animation beat. Whatever fields are present render; whatever's
 * absent stays blank. The scene's enter/exit classes drive the animation
 * when the active beat changes.
 */
export interface Beat {
  pose: string;
  title?: string;
  kicker?: string;
  body?: string;
  arabic?: string;
  attribution?: string;
}

interface AnimatedSceneProps {
  beats: Beat[];
  theme: ThemeId;
  scene: Scene;
  playing: boolean;
  /** Bumping this restarts the loop. */
  loopKey: number;
  logoSrc?: string | null;
  /** Toggle the IG/TikTok safe-zone overlay (vertical only). */
  showSafeZones?: boolean;
  className?: string;
}

const W = 1080;
const H = 1920;

/**
 * IG Reels / TikTok safe zone (1080×1920 canvas coordinates).
 *
 *  y=0     -> y=200   : UNSAFE TOP (IG status bar + caption username)
 *  y=200   -> y=1340  : SAFE CONTENT AREA (≈60% of canvas)
 *  y=1340  -> y=1920  : UNSAFE BOTTOM (IG sound, like/share, caption)
 *
 * Every text-bearing element (logo, title, body card) is positioned
 * inside the safe band. The pose extends down to the canvas bottom
 * intentionally — its feet getting covered by IG chrome is OK because
 * the head/torso are still in the safe zone and that's the expressive
 * part. The static renderer (lib/render.tsx) has its own composition
 * tuned for non-Reels exports and is independent of these values.
 */
const SAFE_TOP = 200;
const SAFE_BOTTOM = 1340;

/* Element anchors inside the safe band: */
const LOGO_TOP   = 240;   // logo y=240..400, height 160
const TITLE_TOP  = 440;   // title y=440 down, height varies by length
const POSE_TOP   = 620;   // pose y=620..1340, size 720 — exactly fills the
                          // lower half of the safe zone
const POSE_SIZE  = 720;
const CARD_TOP   = 900;   // body card y=900..1300 — overlays pose torso

/**
 * Vertical (1080×1920) animated stage rendered as DOM with CSS keyframes.
 * Each beat carries its own text + pose; advancing the active beat
 * re-mounts those elements so the enter/exit animations re-fire cleanly.
 */
export function AnimatedScene({
  beats,
  theme,
  scene,
  playing,
  loopKey,
  logoSrc,
  showSafeZones = false,
  className,
}: AnimatedSceneProps) {
  const t = getTheme(theme);
  const [active, setActive] = useState(0);

  // Swap the active beat on the scene's hold interval.
  useEffect(() => {
    setActive(0);
    if (!playing || beats.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % beats.length);
    }, scene.poseHoldMs);
    return () => clearInterval(id);
  }, [playing, beats.length, scene.poseHoldMs, loopKey]);

  const beat = beats[active] ?? beats[0];
  if (!beat) return null;

  const bg = `linear-gradient(170deg, ${t.gradient[0]} 0%, ${t.gradient[1]} 55%, ${t.gradient[2]} 100%)`;

  return (
    <div
      key={loopKey}
      className={cn("stage-inner relative overflow-hidden shadow-2xl", className)}
      style={{
        width: W,
        height: H,
        background: bg,
        transformOrigin: "top left",
      }}
    >
      {/* Decoration layer (behind everything) */}
      <DecorLayer scene={scene} theme={theme} />

      {/* Logo top-center — inside safe zone top */}
      {logoSrc && (
        <div className="absolute z-20 flex justify-center" style={{ top: LOGO_TOP, left: 0, right: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={170} height={170} alt="" style={{ objectFit: "contain" }} />
        </div>
      )}

      {/* Title sticker — below logo, still in safe zone */}
      {beat.title && (
        <div
          key={`title-${loopKey}-${active}`}
          className={cn("absolute z-20 text-center px-12 left-0 right-0", scene.titleAnim)}
          style={{
            top: TITLE_TOP,
            fontFamily: "var(--font-display), system-ui, sans-serif",
            fontWeight: 700,
            fontSize: titleSizeFor(beat.title),
            lineHeight: 1.15,
            color: t.title,
            textShadow: stickerStroke(t.titleStroke, 5),
          }}
        >
          {beat.title}
        </div>
      )}

      {/* Pose layer — sits in lower half of safe zone. Head/torso visible
       *  above the body card; lower legs covered by the card. */}
      <div
        className="absolute z-10 flex justify-center"
        style={{ top: POSE_TOP, height: POSE_SIZE, left: 0, right: 0 }}
      >
        {beats.map((b, i) => {
          const isActive = i === active;
          const animClass = isActive ? scene.poseEnter : scene.poseExit;
          return (
            <img
              // Re-mount per (loopKey, active, in/out) so CSS animations
              // re-fire deterministically — React reuses elements otherwise.
              key={`pose-${i}-${loopKey}-${isActive ? "in" : "out"}-${active}`}
              src={`/api/pose/${b.pose}`}
              alt=""
              className={cn("absolute top-0", animClass)}
              style={{
                width: POSE_SIZE,
                height: POSE_SIZE,
                left: "50%",
                marginLeft: -POSE_SIZE / 2,
                objectFit: "contain",
                opacity: isActive ? 1 : 0,
                pointerEvents: "none",
              }}
              draggable={false}
            />
          );
        })}
      </div>

      {/* Body card — anchored to a fixed top inside safe zone (not bottom),
       *  so it stays clear of IG/TikTok chrome. Card bottom stays under
       *  SAFE_BOTTOM as long as content fits in ~440px. */}
      {(beat.body || beat.arabic || beat.attribution) && (
        <div
          key={`body-${loopKey}-${active}`}
          className={cn("absolute z-30 left-12 right-12", scene.cardAnim)}
          style={{
            top: CARD_TOP,
            background: t.cardBody ?? t.card,
            border: `3px solid ${t.titleStroke}`,
            borderRadius: 36,
            padding: "36px 44px",
            boxShadow: "0 8px 0 rgba(0,0,0,0.10)",
            textAlign: "center",
            color: t.ink,
            fontFamily: "var(--font-sans), system-ui, sans-serif",
          }}
        >
          {beat.kicker && (
            <div
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 32,
                color: t.title,
                marginBottom: 14,
                letterSpacing: 0.3,
              }}
            >
              {beat.kicker}
            </div>
          )}
          {beat.arabic && (
            <ArabicLine text={beat.arabic} color={t.title} loopKey={`${loopKey}-${active}`} />
          )}
          {beat.body && (
            <BodyText body={beat.body} ink={t.ink} accent={t.title} />
          )}
          {beat.attribution && (
            <div
              style={{
                fontSize: 22,
                color: t.title,
                marginTop: 14,
                fontWeight: 700,
              }}
            >
              ({beat.attribution})
            </div>
          )}
        </div>
      )}

      {/* Safe-zone overlay — visualizes the IG/TikTok chrome zones.
       * Anything inside the dashed red bands risks being covered. */}
      {showSafeZones && (
        <>
          <div
            className="absolute z-40 pointer-events-none border-2 border-dashed border-red-400/80 bg-red-400/10"
            style={{ top: 0, left: 0, right: 0, height: SAFE_TOP }}
          />
          <div
            className="absolute z-40 pointer-events-none border-2 border-dashed border-red-400/80 bg-red-400/10"
            style={{ top: SAFE_BOTTOM, left: 0, right: 0, bottom: 0 }}
          />
        </>
      )}
    </div>
  );
}

/** Title size shrinks as length grows so longer headings still fit
 *  inside the ~180px between LOGO_TOP+height and POSE_TOP. */
function titleSizeFor(text: string): number {
  if (text.length > 60) return 56;
  if (text.length > 40) return 72;
  if (text.length > 24) return 88;
  return 100;
}

/** Multi-direction text-shadow that fakes a stroke around glyphs. */
function stickerStroke(color: string, w: number): string {
  const shadows: string[] = [];
  for (let dx = -w; dx <= w; dx++) {
    for (let dy = -w; dy <= w; dy++) {
      if (dx === 0 && dy === 0) continue;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > w) continue;
      shadows.push(`${dx}px ${dy}px 0 ${color}`);
    }
  }
  shadows.push("3px 5px 0 rgba(0,0,0,0.12)");
  return shadows.join(", ");
}

/* ---------- Arabic via /api/arabic (Resvg + harfbuzz shaping) ---------- */

function ArabicLine({ text, color, loopKey }: { text: string; color: string; loopKey: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [height, setHeight] = useState<number>(180);
  const lastRequested = useRef<string | null>(null);

  useEffect(() => {
    const cacheKey = `${text}|${color}`;
    if (lastRequested.current === cacheKey) return;
    lastRequested.current = cacheKey;
    let aborted = false;
    (async () => {
      try {
        const res = await fetch("/api/arabic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, color, fontSize: 80, maxWidth: 860 }),
        });
        if (!res.ok) return;
        const h = res.headers.get("X-Arabic-Height");
        if (h && !aborted) setHeight(parseInt(h, 10));
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (!aborted) setSrc(url);
      } catch {
        /* swallow */
      }
    })();
    return () => {
      aborted = true;
    };
  }, [text, color]);

  if (!src) {
    // Fallback while loading — plain Arabic in system font (won't shape well
    // but at least shows something during the brief fetch).
    return (
      <div
        dir="rtl"
        style={{ fontSize: 64, fontFamily: '"Noto Naskh Arabic", "Cairo", serif', color, marginBottom: 16, textAlign: "center" }}
      >
        {text}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: 16 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={loopKey} src={src} alt="" width={860} height={height} />
    </div>
  );
}

/** Body that splits into transliteration (italic) + translation when the
 *  body contains a blank-line separator (matches the seed shape). */
function BodyText({ body, ink, accent }: { body: string; ink: string; accent: string }) {
  const parts = body.split(/\n\s*\n/);
  const hasTranslit = parts.length > 1;
  const translit = hasTranslit ? parts[0] : null;
  const main = hasTranslit ? parts.slice(1).join("\n\n") : body;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {translit && (
        <div
          style={{
            fontStyle: "italic",
            fontSize: 28,
            lineHeight: 1.45,
            color: accent,
            marginBottom: 14,
            fontWeight: 600,
          }}
        >
          {translit}
        </div>
      )}
      <div style={{ fontSize: 38, lineHeight: 1.45, color: ink, fontWeight: 600, whiteSpace: "pre-wrap" }}>
        {main}
      </div>
    </div>
  );
}

/* ---------- Decoration layer (per-scene background motion) ---------- */

function DecorLayer({ scene, theme }: { scene: Scene; theme: ThemeId }) {
  const t = getTheme(theme);
  const accent = t.accent ?? "#FFD93D";
  const stroke = t.titleStroke ?? "#FFFFFF";

  if (scene.decor === "none") return null;

  if (scene.decor === "spinning-stars") {
    return (
      <div className="absolute inset-0 anim-spinning-stars pointer-events-none">
        <StarPiece x={80}  y={120} size={70} color={accent} stroke={stroke} />
        <StarPiece x={920} y={240} size={90} color="#FFFFFF" stroke={stroke} />
        <StarPiece x={120} y={1500} size={60} color="#FFFFFF" stroke={stroke} />
        <StarPiece x={900} y={1700} size={80} color={accent} stroke={stroke} />
      </div>
    );
  }

  if (scene.decor === "drifting-clouds") {
    return (
      <div className="absolute inset-0 anim-drifting-clouds pointer-events-none">
        <CloudPiece x={-40} y={120} size={160} />
        <CloudPiece x={780} y={220} size={140} />
        <CloudPiece x={40} y={1600} size={130} />
        <CloudPiece x={820} y={1750} size={120} />
      </div>
    );
  }

  if (scene.decor === "sparkle-burst") {
    return (
      <div className="absolute inset-0 anim-sparkle-burst pointer-events-none">
        <SparklePiece x={120} y={200} size={60} color="#FFFFFF" />
        <SparklePiece x={880} y={280} size={70} color={accent} />
        <SparklePiece x={100} y={1500} size={50} color={accent} />
        <SparklePiece x={900} y={1680} size={55} color="#FFFFFF" />
      </div>
    );
  }

  if (scene.decor === "rising-hearts") {
    return (
      <div className="absolute inset-0 anim-rising-hearts pointer-events-none overflow-hidden">
        <HeartPiece x={120} size={70} />
        <HeartPiece x={420} size={90} />
        <HeartPiece x={720} size={65} />
        <HeartPiece x={900} size={80} />
      </div>
    );
  }

  return null;
}

function StarPiece({ x, y, size, color, stroke }: { x: number; y: number; size: number; color: string; stroke: string }) {
  return (
    <div className="absolute" style={{ left: x, top: y, width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 1.5 L14.7 8.6 L22 9.3 L16.4 14.1 L18.2 21.5 L12 17.6 L5.8 21.5 L7.6 14.1 L2 9.3 L9.3 8.6 Z"
          fill={color}
          stroke={stroke}
          strokeWidth="1.4"
        />
      </svg>
    </div>
  );
}

function CloudPiece({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <div className="absolute" style={{ left: x, top: y, width: size * 1.6, height: size }}>
      <svg width={size * 1.6} height={size} viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
        <g fill="#FFFFFF" opacity="0.92">
          <ellipse cx="50" cy="60" rx="40" ry="30" />
          <ellipse cx="95" cy="55" rx="45" ry="35" />
          <ellipse cx="130" cy="70" rx="28" ry="22" />
        </g>
      </svg>
    </div>
  );
}

function SparklePiece({ x, y, size, color }: { x: number; y: number; size: number; color: string }) {
  return (
    <div className="absolute" style={{ left: x, top: y, width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill={color} />
      </svg>
    </div>
  );
}

function HeartPiece({ x, size }: { x: number; size: number }) {
  return (
    <div className="absolute" style={{ left: x, bottom: -size, width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 21 C 5 14, 2 10, 5 6 C 8 2, 11 5, 12 7 C 13 5, 16 2, 19 6 C 22 10, 19 14, 12 21 Z"
          fill="#F87BAB"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
