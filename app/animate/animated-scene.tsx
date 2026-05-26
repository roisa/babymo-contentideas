"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getTheme, type ThemeId } from "@/lib/themes";
import { type Scene } from "./scenes";

export type StageFormat = "square" | "vertical";

interface AnimatedSceneProps {
  poses: string[];
  theme: ThemeId;
  format: StageFormat;
  scene: Scene;
  title: string;
  /** If scene.perBeatBody is true, each entry maps to a pose; otherwise
   * only the first entry is shown. */
  bodyLines: string[];
  kicker?: string;
  playing: boolean;
  /** Bumping this restarts the loop. */
  loopKey: number;
  /** Logo data URL — fetched once by the parent to avoid layout flicker. */
  logoSrc?: string | null;
  className?: string;
}

/**
 * The animated stage. Visually composed to match the existing render
 * pipeline (theme gradient, stroked title, body card, pose), but
 * everything lives on the client with CSS keyframe animations and a
 * JS-driven pose swap.
 *
 * Rendered at 1080×1080 (square) or 1080×1920 (vertical) internally,
 * then scaled to fit its CSS container via transform.
 */
export function AnimatedScene({
  poses,
  theme,
  format,
  scene,
  title,
  bodyLines,
  kicker,
  playing,
  loopKey,
  logoSrc,
  className,
}: AnimatedSceneProps) {
  const t = getTheme(theme);
  const W = 1080;
  const H = format === "vertical" ? 1920 : 1080;
  const isVertical = format === "vertical";

  const [active, setActive] = useState(0);

  // Swap the active pose on the scene's beat interval.
  useEffect(() => {
    setActive(0);
    if (!playing || poses.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % poses.length);
    }, scene.poseHoldMs);
    return () => clearInterval(id);
  }, [playing, poses.length, scene.poseHoldMs, loopKey]);

  const bg = `linear-gradient(170deg, ${t.gradient[0]} 0%, ${t.gradient[1]} 55%, ${t.gradient[2]} 100%)`;

  // Pick which body text to show. When perBeatBody is on and the user
  // supplied N lines, sync them to the active pose; otherwise show the
  // first line as a constant subtitle.
  const body = scene.perBeatBody && bodyLines[active] ? bodyLines[active] : bodyLines[0] ?? "";

  return (
    <div
      key={loopKey}
      className={cn("stage-inner relative overflow-hidden shadow-2xl", className)}
      style={{
        width: W,
        height: H,
        background: bg,
        // The page's CSS container drives the visible size; this transform
        // shrinks the internal 1080-pixel canvas to fit. The CSS uses
        // transform-origin top-left so the math is trivial.
        transformOrigin: "top left",
      }}
    >
      {/* Decoration layer (behind everything) */}
      <DecorLayer scene={scene} theme={theme} format={format} />

      {/* Logo top-center */}
      {logoSrc && (
        <div
          className="absolute z-20 flex justify-center"
          style={{ top: isVertical ? 100 : 60, left: 0, right: 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={isVertical ? 200 : 180}
            height={isVertical ? 200 : 180}
            alt=""
            style={{ objectFit: "contain" }}
          />
        </div>
      )}

      {/* Title sticker */}
      {title && (
        <div
          key={`title-${loopKey}`}
          className={cn("absolute z-20 text-center px-12 left-0 right-0", scene.titleAnim)}
          style={{
            top: isVertical ? 340 : 280,
            fontFamily: "var(--font-display), system-ui, sans-serif",
            fontWeight: 700,
            fontSize: isVertical ? 110 : 88,
            lineHeight: 1.15,
            color: t.title,
            textShadow: stickerStroke(t.titleStroke, isVertical ? 5 : 4),
          }}
        >
          {title}
        </div>
      )}

      {/* Pose layer — render every pose, toggle enter/exit classes */}
      <div className="absolute inset-0 z-10 flex items-end justify-center" style={{ paddingBottom: 0 }}>
        {poses.map((p, i) => {
          const isActive = i === active;
          // Don't render exiting poses for the very first frame, otherwise
          // they'd briefly flash before their exit animation kicks in.
          const animClass = isActive ? scene.poseEnter : scene.poseExit;
          return (
            <img
              // Re-mount on each (loopKey, active) change so the CSS animation
              // re-fires deterministically. React reuses elements across
              // re-renders, which kills CSS animations otherwise.
              key={`pose-${i}-${loopKey}-${isActive ? "in" : "out"}-${active}`}
              src={`/api/pose/${p}`}
              alt=""
              className={cn("absolute bottom-0", animClass)}
              style={{
                width: isVertical ? 900 : 720,
                height: isVertical ? 900 : 720,
                left: "50%",
                marginLeft: isVertical ? -450 : -360,
                objectFit: "contain",
                opacity: isActive ? 1 : 0,
                pointerEvents: "none",
              }}
              draggable={false}
            />
          );
        })}
      </div>

      {/* Body card */}
      {body && (
        <div
          key={`body-${loopKey}-${active}`}
          className={cn("absolute z-30 left-12 right-12", scene.cardAnim)}
          style={{
            // Sit just above the bottom edge so the pose can peek out under it.
            bottom: isVertical ? 140 : 100,
            background: t.cardBody ?? t.card,
            border: `3px solid ${t.titleStroke}`,
            borderRadius: 36,
            padding: isVertical ? "36px 44px" : "30px 40px",
            boxShadow: "0 8px 0 rgba(0,0,0,0.10)",
            textAlign: "center",
            color: t.ink,
            fontFamily: "var(--font-sans), system-ui, sans-serif",
          }}
        >
          {kicker && (
            <div
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
                fontWeight: 700,
                fontSize: isVertical ? 32 : 28,
                color: t.title,
                marginBottom: 12,
                letterSpacing: 0.3,
              }}
            >
              {kicker}
            </div>
          )}
          <div
            style={{
              fontSize: isVertical ? 40 : 34,
              lineHeight: 1.4,
              fontWeight: 600,
            }}
          >
            {body}
          </div>
        </div>
      )}
    </div>
  );
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

/* ---------- Decoration layer (per-scene background motion) ---------- */

function DecorLayer({ scene, theme, format }: { scene: Scene; theme: ThemeId; format: StageFormat }) {
  const t = getTheme(theme);
  const isVertical = format === "vertical";
  const accent = t.accent ?? "#FFD93D";
  const stroke = t.titleStroke ?? "#FFFFFF";

  if (scene.decor === "none") return null;

  if (scene.decor === "spinning-stars") {
    return (
      <div className="absolute inset-0 anim-spinning-stars pointer-events-none">
        <StarPiece x={80}  y={isVertical ? 120 : 110} size={70} color={accent} stroke={stroke} />
        <StarPiece x={920} y={isVertical ? 240 : 140} size={90} color="#FFFFFF" stroke={stroke} />
        <StarPiece x={120} y={isVertical ? 1500 : 800} size={60} color="#FFFFFF" stroke={stroke} />
        <StarPiece x={900} y={isVertical ? 1700 : 900} size={80} color={accent} stroke={stroke} />
      </div>
    );
  }

  if (scene.decor === "drifting-clouds") {
    return (
      <div className="absolute inset-0 anim-drifting-clouds pointer-events-none">
        <CloudPiece x={-40}  y={isVertical ? 120 : 80}  size={160} />
        <CloudPiece x={780}  y={isVertical ? 220 : 200} size={140} />
        <CloudPiece x={40}   y={isVertical ? 1600 : 880} size={130} />
        <CloudPiece x={820}  y={isVertical ? 1750 : 940} size={120} />
      </div>
    );
  }

  if (scene.decor === "sparkle-burst") {
    return (
      <div className="absolute inset-0 anim-sparkle-burst pointer-events-none">
        <SparklePiece x={120} y={isVertical ? 200 : 180} size={60} color="#FFFFFF" />
        <SparklePiece x={880} y={isVertical ? 280 : 220} size={70} color={accent} />
        <SparklePiece x={100} y={isVertical ? 1500 : 820} size={50} color={accent} />
        <SparklePiece x={900} y={isVertical ? 1680 : 920} size={55} color="#FFFFFF" />
      </div>
    );
  }

  if (scene.decor === "rising-hearts") {
    return (
      <div className="absolute inset-0 anim-rising-hearts pointer-events-none overflow-hidden">
        <HeartPiece x={120}  size={70} />
        <HeartPiece x={420}  size={90} />
        <HeartPiece x={720}  size={65} />
        <HeartPiece x={900}  size={80} />
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
          <ellipse cx="50"  cy="60" rx="40" ry="30" />
          <ellipse cx="95"  cy="55" rx="45" ry="35" />
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
        <path
          d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
          fill={color}
        />
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
