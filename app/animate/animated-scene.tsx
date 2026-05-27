"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
 * Text-bearing elements (logo, title, body card) live inside the safe
 * band. The pose deliberately anchors to the canvas BOTTOM and fills
 * the lower half — its feet getting covered by IG chrome is fine and
 * visually expected (matches the static renderer). The body card sits
 * ABOVE the pose's head so the character's face is always visible.
 */
const SAFE_TOP = 200;
const SAFE_BOTTOM = 1340;

const LOGO_TOP   = 200;
const LOGO_SIZE  = 160;
const TITLE_TOP  = 410;
const CARD_TOP   = 680;   // sits above pose head (which lands at y≈1020)
const POSE_SIZE  = 900;   // anchored to canvas bottom — head at y=1020

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

  // Whitespace-only Arabic counts as missing. Without this, the layout
  // would reserve space for an invisible/failed-to-render Arabic image
  // (the empty gap users see in the body card).
  const arabic = beat.arabic && beat.arabic.trim().length > 0 ? beat.arabic.trim() : null;

  // Use the actual text as the React key. If consecutive beats share the
  // same text (single-slide reels repeat title/kicker/body across poses),
  // React keeps the element mounted and skips the re-mount animation —
  // exactly what we want, no jarring text re-pop on every beat.
  const titleKey = `title-${loopKey}-${beat.title ?? ""}`;
  const cardKey  = `card-${loopKey}-${beat.kicker ?? ""}-${arabic ?? ""}-${beat.body ?? ""}-${beat.attribution ?? ""}`;

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
          <img src={logoSrc} width={LOGO_SIZE} height={LOGO_SIZE} alt="" style={{ objectFit: "contain" }} />
        </div>
      )}

      {/* Title sticker — below logo, still in safe zone */}
      {beat.title && (
        <div
          key={titleKey}
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

      {/* Pose layer — anchored to canvas bottom so the character fills
       *  the lower half. Head lands at y≈1020 (just below the body card).
       *  Feet at the canvas edge get covered by IG chrome — intentional.
       *
       *  Migrated from CSS-keyframes to Framer Motion's AnimatePresence
       *  with mode="wait" so the OLD pose finishes its exit BEFORE the
       *  new pose enters — no more mid-transition double-pose overlap.
       *  The outer motion.div handles enter/exit; the inner motion.img
       *  runs the perpetual breathing loop. */}
      <div className="absolute inset-0 z-10 flex items-end justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            // Key changes when the active beat changes → AnimatePresence
            // triggers exit on the old element, waits, then mounts new.
            key={`pose-${loopKey}-${active}-${beat.pose}`}
            className="absolute bottom-0"
            style={{
              width: POSE_SIZE,
              height: POSE_SIZE,
              left: "50%",
              marginLeft: -POSE_SIZE / 2,
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -16 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 0.7, 0.2, 1],
            }}
          >
            <motion.img
              src={`/api/pose/${beat.pose}`}
              alt=""
              style={{
                width: POSE_SIZE,
                height: POSE_SIZE,
                objectFit: "contain",
              }}
              // Perpetual breathing — independent of enter/exit. scale + y
              // pulse on a 3.4s loop, starting after enter completes so
              // the bounce-in landing doesn't fight the breath.
              animate={{
                scale: [1, 1.018, 1],
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3.4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.5,
              }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Body card — anchored to a fixed top inside safe zone (not bottom),
       *  so it stays clear of IG/TikTok chrome. Card bottom stays under
       *  SAFE_BOTTOM as long as content fits in ~340px. */}
      {(beat.body || arabic || beat.attribution) && (
        <div
          key={cardKey}
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
          {arabic && <ArabicLine text={arabic} color={t.title} />}
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
 *  in the ~270px window between the logo and the body card. */
function titleSizeFor(text: string): number {
  if (text.length > 50) return 56;
  if (text.length > 32) return 72;
  if (text.length > 18) return 88;
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

/**
 * Render Arabic text in the body card.
 *
 * Modern browsers (iOS Safari, Chrome, Firefox) all shape Arabic
 * correctly via system fonts when `dir="rtl"` is set. We used to fetch
 * a pre-shaped PNG from /api/arabic, but that round-trip introduced a
 * flash-and-disappear bug: the system-font fallback rendered first,
 * then the PNG (sometimes blank when Resvg shaping failed) replaced
 * it — user saw the Arabic appear and vanish.
 *
 * Native rendering is more reliable on the client. The static renderer
 * in lib/render.tsx still uses Resvg+PNG because Satori (its layout
 * engine) can't shape Arabic — but here in the DOM, the browser
 * handles it natively.
 */
function ArabicLine({ text, color }: { text: string; color: string; loopKey?: string }) {
  return (
    <div
      dir="rtl"
      style={{
        // Font stack: prefer Naskh / Amiri / Scheherazade for traditional
        // shaping, then Cairo (which we bundle for the static renderer),
        // then iOS system Arabic (Geeza Pro), then generic serif.
        fontFamily:
          '"Noto Naskh Arabic", "Amiri", "Scheherazade New", "Cairo", "Geeza Pro", serif',
        fontSize: 80,
        lineHeight: 1.55,
        color,
        marginBottom: 16,
        marginTop: 4,
        fontWeight: 700,
        textAlign: "center",
        letterSpacing: -1,
        width: "100%",
      }}
    >
      {text}
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
