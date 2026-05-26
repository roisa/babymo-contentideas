"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { THEMES, type ThemeId } from "@/lib/themes";
import { ALL_POSES, pickPosesForContent } from "@/lib/poses-pure";
import { useLibrary } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  Play,
  Pause,
  RefreshCw,
  Video,
  X,
  Check,
  Wand2,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { AnimatedScene, type Beat } from "./animated-scene";
import { SCENES, getScene, type SceneId } from "./scenes";
import "./animator.css";

const MAX_POSES = 3;

/**
 * Two modes:
 *
 *   1. Manual    — user picks 1-3 poses + writes title/body. No `?from=` param.
 *   2. FromContent — `?from=<contentId>` loads a Library item and derives
 *                    everything (per-slide pose via the beat-aware mapper,
 *                    per-slide heading/kicker/body/arabic). Built for the
 *                    "Animate this" button on Library cards.
 */
export function AnimatorClient() {
  const search = useSearchParams();
  const router = useRouter();
  const fromId = search.get("from");

  const items = useLibrary((s) => s.items);
  const sourceContent = useMemo(
    () => (fromId ? items.find((i) => i.id === fromId) ?? null : null),
    [fromId, items]
  );
  const isFromContent = Boolean(sourceContent);

  // ---- Shared state ----
  const [theme, setTheme] = useState<ThemeId>("cream-sand");
  const [sceneId, setSceneId] = useState<SceneId>("slideshow");
  const [playing, setPlaying] = useState(true);
  const [loopKey, setLoopKey] = useState(0);
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [showSafeZones, setShowSafeZones] = useState(false);

  // ---- Manual mode state ----
  const [selectedPoses, setSelectedPoses] = useState<string[]>([
    "baby-mo-thank-you.png",
    "baby-mo-pose-12.png",
    "baby-mo-pose-17.png",
  ]);
  const [title, setTitle] = useState("Doa Sebelum Tidur");
  const [kicker, setKicker] = useState("Yuk, Hafalkan!");
  const [bodyText, setBodyText] = useState(
    "Bismillah dulu,\nbaru bobo.\nGood night, Sahabat Mo."
  );

  // ---- From-content mode state ----
  // Auto-picked poses can be overridden by the user. The auto array is
  // recomputed when content changes; user edits override it via this state.
  const [posesOverride, setPosesOverride] = useState<string[] | null>(null);

  // Sync defaults when source content loads (theme inherited from the piece).
  useEffect(() => {
    if (sourceContent) {
      setTheme(sourceContent.theme);
      setSceneId("slideshow");
      setPosesOverride(null);
    }
  }, [sourceContent]);

  useEffect(() => {
    setLogoSrc("/babymo-logo.png");
  }, []);

  const scene = useMemo(() => getScene(sceneId), [sceneId]);

  // ---- Build beats[] for the active mode ----
  const beats: Beat[] = useMemo(() => {
    if (sourceContent) {
      const autoPoses = pickPosesForContent(
        sourceContent.categoryId,
        sourceContent.contentTypeId,
        sourceContent.slides.length
      );
      const poses = posesOverride ?? autoPoses;
      return sourceContent.slides.map((slide, i) => ({
        pose: poses[i] ?? autoPoses[i] ?? "baby-mo-ok.png",
        title: slide.heading,
        kicker: slide.kicker,
        body: slide.body,
        arabic: slide.arabic,
        attribution: slide.attribution,
      }));
    }
    // Manual mode
    const lines = bodyText.split("\n").map((s) => s.trim()).filter(Boolean);
    return selectedPoses.map((pose, i) => ({
      pose,
      title,
      kicker: kicker || undefined,
      body: scene.perBeatBody ? lines[i] ?? lines[0] : lines[0],
    }));
  }, [sourceContent, posesOverride, selectedPoses, title, kicker, bodyText, scene.perBeatBody]);

  function togglePose(name: string) {
    setSelectedPoses((cur) => {
      if (cur.includes(name)) return cur.filter((p) => p !== name);
      if (cur.length >= MAX_POSES) return [...cur.slice(1), name];
      return [...cur, name];
    });
  }

  function togglePoseOverride(slot: number, name: string) {
    setPosesOverride((cur) => {
      const base = cur ?? (sourceContent ? pickPosesForContent(sourceContent.categoryId, sourceContent.contentTypeId, sourceContent.slides.length) : []);
      const next = [...base];
      next[slot] = name;
      return next;
    });
  }

  function resetPoseOverrides() {
    setPosesOverride(null);
  }

  function replay() {
    setLoopKey((k) => k + 1);
    setPlaying(true);
  }

  function startRecording() {
    setRecording(true);
    setPlaying(false);
    let n = 3;
    setCountdown(n);
    const id = setInterval(() => {
      n -= 1;
      if (n <= 0) {
        clearInterval(id);
        setCountdown(null);
        setLoopKey((k) => k + 1);
        setPlaying(true);
      } else {
        setCountdown(n);
      }
    }, 1000);
  }

  function exitRecording() {
    setRecording(false);
    setCountdown(null);
  }

  useEffect(() => {
    if (!recording) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exitRecording();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [recording]);

  const totalLoopMs = scene.poseHoldMs * Math.max(beats.length, 1);
  const beatCount = beats.length;

  return (
    <>
      {recording && (
        <RecordingOverlay
          beats={beats}
          theme={theme}
          scene={scene}
          playing={playing}
          loopKey={loopKey}
          logoSrc={logoSrc}
          showSafeZones={showSafeZones}
          countdown={countdown}
          onExit={exitRecording}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,420px] gap-5">
        {/* LEFT — Stage preview */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <StagePreview
                beats={beats}
                theme={theme}
                scene={scene}
                playing={playing}
                loopKey={loopKey}
                logoSrc={logoSrc}
                showSafeZones={showSafeZones}
              />
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setPlaying((p) => !p)} variant="soft" size="sm">
              {playing ? <Pause className="h-4 w-4 mr-1.5" /> : <Play className="h-4 w-4 mr-1.5" />}
              {playing ? "Pause" : "Play"}
            </Button>
            <Button onClick={replay} variant="soft" size="sm">
              <RefreshCw className="h-4 w-4 mr-1.5" /> Replay
            </Button>
            <Button
              onClick={() => setShowSafeZones((s) => !s)}
              variant="soft"
              size="sm"
              className={cn(showSafeZones && "ring-2 ring-babymo-coral/40")}
            >
              {showSafeZones ? <EyeOff className="h-4 w-4 mr-1.5" /> : <Eye className="h-4 w-4 mr-1.5" />}
              Safe zones
            </Button>
            <Button onClick={startRecording} variant="default" size="sm" disabled={beats.length === 0}>
              <Video className="h-4 w-4 mr-1.5" /> Record
            </Button>
            <div className="ml-auto inline-flex items-center text-[12px] text-muted-foreground">
              {beatCount} beat{beatCount === 1 ? "" : "s"} · loop ≈ {(totalLoopMs / 1000).toFixed(1)}s
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-white/50 p-3 text-[12px] text-muted-foreground">
            <strong className="text-foreground">How to record:</strong> tap <em>Record</em>, wait for the 3-2-1, then start your screen recording (iPhone Control Center, or QuickTime on Mac). The reel loops until you press <kbd className="px-1 py-0.5 rounded bg-muted text-foreground">ESC</kbd>.
          </div>
        </div>

        {/* RIGHT — Controls (differ by mode) */}
        <div className="space-y-4">
          {isFromContent && sourceContent ? (
            <FromContentPanel
              content={sourceContent}
              theme={theme}
              setTheme={setTheme}
              sceneId={sceneId}
              setSceneId={setSceneId}
              posesOverride={posesOverride}
              autoPoses={pickPosesForContent(
                sourceContent.categoryId,
                sourceContent.contentTypeId,
                sourceContent.slides.length
              )}
              onOverridePose={togglePoseOverride}
              onResetPoses={resetPoseOverrides}
              onBack={() => router.push("/library")}
            />
          ) : (
            <ManualPanel
              theme={theme}
              setTheme={setTheme}
              sceneId={sceneId}
              setSceneId={setSceneId}
              title={title}
              setTitle={setTitle}
              kicker={kicker}
              setKicker={setKicker}
              bodyText={bodyText}
              setBodyText={setBodyText}
              selectedPoses={selectedPoses}
              onTogglePose={togglePose}
              onClearPoses={() => setSelectedPoses([])}
              perBeatBody={scene.perBeatBody}
            />
          )}
        </div>
      </div>
    </>
  );
}

/* ============================================================
 * FromContentPanel — header + scene + theme + per-beat pose override
 * ============================================================ */

function FromContentPanel({
  content,
  theme,
  setTheme,
  sceneId,
  setSceneId,
  posesOverride,
  autoPoses,
  onOverridePose,
  onResetPoses,
  onBack,
}: {
  content: import("@/lib/types").GeneratedContent;
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  sceneId: SceneId;
  setSceneId: (s: SceneId) => void;
  posesOverride: string[] | null;
  autoPoses: string[];
  onOverridePose: (slot: number, name: string) => void;
  onResetPoses: () => void;
  onBack: () => void;
}) {
  const effectivePoses = posesOverride ?? autoPoses;
  return (
    <>
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-[11px]">
            <Button size="sm" variant="ghost" onClick={onBack} className="h-7 px-2">
              <ArrowLeft className="h-3 w-3 mr-1" /> Library
            </Button>
            <Badge variant="green" className="text-[10px]">
              <Wand2 className="h-3 w-3 mr-1" /> Auto-animated
            </Badge>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">From</div>
            <div className="text-sm font-semibold mt-0.5">{content.title}</div>
            <div className="text-[12px] text-muted-foreground">
              {content.contentTypeLabel} · {content.format} · {content.slides.length} slide{content.slides.length === 1 ? "" : "s"}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-3">
          <Field label="Scene">
            <div className="grid grid-cols-1 gap-1.5">
              {SCENES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSceneId(s.id)}
                  className={cn(
                    "text-left rounded-xl border p-3 transition",
                    sceneId === s.id
                      ? "border-babymo-green ring-2 ring-babymo-green/30 bg-babymo-green-soft/40"
                      : "border-input hover:bg-muted"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[13px] font-semibold">{s.name}</div>
                    {sceneId === s.id && <Check className="h-3.5 w-3.5 text-babymo-green" />}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{s.description}</div>
                </button>
              ))}
            </div>
          </Field>

          <Field label="Theme">
            <div className="grid grid-cols-4 gap-2">
              {THEMES.map((t) => (
                <button key={t.id} onClick={() => setTheme(t.id)} className="text-left group">
                  <div
                    className={cn(
                      "aspect-square rounded-2xl border-[3px] shadow-ios-soft overflow-hidden relative transition group-active:scale-[0.95]",
                      theme === t.id ? "border-babymo-green ring-2 ring-babymo-green/30" : "border-white"
                    )}
                    style={{
                      background: `linear-gradient(170deg, ${t.gradient[0]} 0%, ${t.gradient[1]} 55%, ${t.gradient[2]} 100%)`,
                    }}
                  />
                  <div className="text-[10px] mt-1 text-center text-muted-foreground truncate font-medium">{t.name}</div>
                </button>
              ))}
            </div>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Field label="Beat poses — auto-picked, tap to override" inline />
            {posesOverride && (
              <Button size="sm" variant="ghost" onClick={onResetPoses} className="h-7">
                Reset to auto
              </Button>
            )}
          </div>
          <div className="space-y-3">
            {effectivePoses.map((pose, slot) => (
              <BeatPoseRow
                key={slot}
                slot={slot}
                pose={pose}
                isOverridden={Boolean(posesOverride && posesOverride[slot] !== autoPoses[slot])}
                onChange={(name) => onOverridePose(slot, name)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

/** Single row: current pose preview + horizontal-scroll picker of alternates. */
function BeatPoseRow({
  slot,
  pose,
  isOverridden,
  onChange,
}: {
  slot: number;
  pose: string;
  isOverridden: boolean;
  onChange: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-input p-2">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 rounded-full bg-babymo-green text-white text-[11px] font-bold flex items-center justify-center shrink-0">
          {slot + 1}
        </div>
        <button onClick={() => setOpen((o) => !o)} className="h-14 w-14 rounded-lg overflow-hidden bg-white/60 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/api/pose/${pose}`} alt={pose} className="h-full w-full object-contain p-1" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-medium truncate">{pose.replace(/^baby-mo-/, "").replace(/\.png$/, "")}</div>
          {isOverridden && <div className="text-[10px] text-babymo-coral font-medium">Custom</div>}
        </div>
        <Button size="sm" variant="ghost" onClick={() => setOpen((o) => !o)} className="h-7 text-[11px]">
          {open ? "Close" : "Change"}
        </Button>
      </div>
      {open && (
        <div className="mt-2 grid grid-cols-6 gap-1.5 max-h-[180px] overflow-y-auto pr-1">
          {ALL_POSES.map((p) => (
            <button
              key={p}
              onClick={() => {
                onChange(p);
                setOpen(false);
              }}
              className={cn(
                "relative aspect-square rounded-lg overflow-hidden border-2 transition bg-white/60 hover:bg-white",
                p === pose ? "border-babymo-green ring-2 ring-babymo-green/30" : "border-transparent"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api/pose/${p}`} alt={p} loading="lazy" className="absolute inset-0 w-full h-full object-contain p-1" draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
 * ManualPanel — free-form pose+text picker (the original UI)
 * ============================================================ */

function ManualPanel({
  theme,
  setTheme,
  sceneId,
  setSceneId,
  title,
  setTitle,
  kicker,
  setKicker,
  bodyText,
  setBodyText,
  selectedPoses,
  onTogglePose,
  onClearPoses,
  perBeatBody,
}: {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  sceneId: SceneId;
  setSceneId: (s: SceneId) => void;
  title: string;
  setTitle: (s: string) => void;
  kicker: string;
  setKicker: (s: string) => void;
  bodyText: string;
  setBodyText: (s: string) => void;
  selectedPoses: string[];
  onTogglePose: (name: string) => void;
  onClearPoses: () => void;
  perBeatBody: boolean;
}) {
  return (
    <>
      <Card>
        <CardContent className="p-4 space-y-4">
          <Field label="Scene">
            <div className="grid grid-cols-1 gap-1.5">
              {SCENES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSceneId(s.id)}
                  className={cn(
                    "text-left rounded-xl border p-3 transition",
                    sceneId === s.id
                      ? "border-babymo-green ring-2 ring-babymo-green/30 bg-babymo-green-soft/40"
                      : "border-input hover:bg-muted"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[13px] font-semibold">{s.name}</div>
                    {sceneId === s.id && <Check className="h-3.5 w-3.5 text-babymo-green" />}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{s.description}</div>
                </button>
              ))}
            </div>
          </Field>

          <Field label="Theme">
            <div className="grid grid-cols-4 gap-2">
              {THEMES.map((t) => (
                <button key={t.id} onClick={() => setTheme(t.id)} className="text-left group">
                  <div
                    className={cn(
                      "aspect-square rounded-2xl border-[3px] shadow-ios-soft overflow-hidden relative transition group-active:scale-[0.95]",
                      theme === t.id ? "border-babymo-green ring-2 ring-babymo-green/30" : "border-white"
                    )}
                    style={{
                      background: `linear-gradient(170deg, ${t.gradient[0]} 0%, ${t.gradient[1]} 55%, ${t.gradient[2]} 100%)`,
                    }}
                  />
                  <div className="text-[10px] mt-1 text-center text-muted-foreground truncate font-medium">{t.name}</div>
                </button>
              ))}
            </div>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-3">
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="BIG sticker title"
              className="w-full rounded-xl border border-input px-3 py-2 text-sm bg-white"
            />
          </Field>
          <Field label="Kicker (optional)">
            <input
              value={kicker}
              onChange={(e) => setKicker(e.target.value)}
              placeholder="Yuk, Hafalkan!"
              className="w-full rounded-xl border border-input px-3 py-2 text-sm bg-white"
            />
          </Field>
          <Field label={`Body${perBeatBody ? " — one line per pose" : ""}`}>
            <Textarea
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              placeholder={perBeatBody ? "Line 1 (pose 1)\nLine 2 (pose 2)\nLine 3 (pose 3)" : "Body across the whole reel"}
              rows={4}
            />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Field label={`Poses · ${selectedPoses.length}/${MAX_POSES}`} inline />
            {selectedPoses.length > 0 && (
              <Button size="sm" variant="ghost" onClick={onClearPoses}>Clear</Button>
            )}
          </div>
          <PosePicker selected={selectedPoses} onToggle={onTogglePose} />
          <div className="text-[11px] text-muted-foreground mt-2">
            Tap to add. Tap again to remove. Adding a 4th pose drops the oldest.
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function PosePicker({ selected, onToggle }: { selected: string[]; onToggle: (name: string) => void }) {
  return (
    <div className="grid grid-cols-5 gap-1.5 max-h-[420px] overflow-y-auto pr-1">
      {ALL_POSES.map((p) => {
        const isOn = selected.includes(p);
        const order = selected.indexOf(p) + 1;
        return (
          <button
            key={p}
            onClick={() => onToggle(p)}
            className={cn(
              "relative aspect-square rounded-xl overflow-hidden border-2 transition bg-white/60 hover:bg-white",
              isOn ? "border-babymo-green ring-2 ring-babymo-green/30" : "border-transparent"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/api/pose/${p}`} alt={p} loading="lazy" className="absolute inset-0 w-full h-full object-contain p-1" draggable={false} />
            {isOn && (
              <div className="absolute top-1 right-1 h-5 w-5 rounded-full bg-babymo-green text-white text-[10px] font-bold flex items-center justify-center">
                {order}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
 * Stage preview & recording overlay
 * ============================================================ */

/**
 * Preview the stage at a size that fits the parent column. Uses
 * CSS `aspect-ratio` to lock the 9:16 proportions and a JS-measured
 * scale to shrink the internal 1080-wide canvas to the actual width.
 *
 * Renders nothing until the first measurement comes back, so we never
 * paint at a stale scale (which on mobile would clip the stage and
 * leave a black void on the right).
 */
function StagePreview(props: Omit<React.ComponentProps<typeof AnimatedScene>, "className">) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / 1080);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="w-full max-w-[360px] mx-auto">
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden rounded-3xl bg-muted/30"
        style={{ aspectRatio: "9 / 16" }}
      >
        {scale > 0 && (
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: 1080,
              height: 1920,
            }}
          >
            <AnimatedScene {...props} />
          </div>
        )}
      </div>
    </div>
  );
}

function RecordingOverlay({
  countdown,
  onExit,
  ...sceneProps
}: Omit<React.ComponentProps<typeof AnimatedScene>, "className"> & {
  countdown: number | null;
  onExit: () => void;
}) {
  // Measure the container (which has position:fixed; inset:0) instead of
  // window.innerWidth/Height. Safari mid-transition (URL bar collapsing)
  // returns stale window dims; ResizeObserver re-fires once the actual
  // visual viewport settles.
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) setSize({ w: rect.width, h: rect.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = size ? Math.min(size.w / 1080, size.h / 1920) : 0;
  const cssW = 1080 * scale;
  const cssH = 1920 * scale;

  return (
    <div ref={containerRef} className="stage-recording">
      <button
        onClick={onExit}
        className="absolute top-4 right-4 z-[110] inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-xs text-white hover:bg-white/25"
      >
        <X className="h-3.5 w-3.5" /> Exit (ESC)
      </button>

      <div className="relative" style={{ width: cssW, height: cssH }}>
        {scale > 0 && (
          <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: 1080, height: 1920 }}>
            <AnimatedScene {...sceneProps} />
          </div>
        )}

        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none z-[105]">
            <div
              key={countdown}
              className="anim-countdown text-white font-bold"
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
                fontSize: 240,
                textShadow: "0 8px 0 rgba(0,0,0,0.4)",
              }}
            >
              {countdown}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children, inline = false }: { label: string; children?: React.ReactNode; inline?: boolean }) {
  return (
    <div className={inline ? "" : "space-y-1.5"}>
      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">{label}</div>
      {children}
    </div>
  );
}
