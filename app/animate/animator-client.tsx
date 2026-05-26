"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { THEMES, type ThemeId } from "@/lib/themes";
import { ALL_POSES } from "@/lib/poses-list";
import { cn } from "@/lib/utils";
import {
  Play,
  Pause,
  RefreshCw,
  Video,
  X,
  Square as SquareIcon,
  RectangleVertical,
  Check,
} from "lucide-react";
import { AnimatedScene, type StageFormat } from "./animated-scene";
import { SCENES, getScene, type SceneId } from "./scenes";
import "./animator.css";

const MAX_POSES = 3;

export function AnimatorClient() {
  const [selectedPoses, setSelectedPoses] = useState<string[]>([
    "baby-mo-thank-you.png",
    "baby-mo-pose-12.png",
    "baby-mo-pose-17.png",
  ]);
  const [theme, setTheme] = useState<ThemeId>("cream-sand");
  const [format, setFormat] = useState<StageFormat>("vertical");
  const [sceneId, setSceneId] = useState<SceneId>("cozy");
  const [title, setTitle] = useState("Doa Sebelum Tidur");
  const [kicker, setKicker] = useState("Yuk, Hafalkan!");
  const [bodyText, setBodyText] = useState(
    "Bismillah dulu,\nbaru bobo.\nGood night, Sahabat Mo."
  );

  const [playing, setPlaying] = useState(true);
  const [loopKey, setLoopKey] = useState(0);
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);

  const scene = useMemo(() => getScene(sceneId), [sceneId]);
  const bodyLines = useMemo(() => bodyText.split("\n").map((s) => s.trim()).filter(Boolean), [bodyText]);

  // Fetch the brand logo once. The /api/render endpoint inlines it as a
  // data URL server-side; for the client we just point at the public file.
  useEffect(() => {
    setLogoSrc("/babymo-logo.png");
  }, []);

  function togglePose(name: string) {
    setSelectedPoses((cur) => {
      if (cur.includes(name)) return cur.filter((p) => p !== name);
      if (cur.length >= MAX_POSES) return [...cur.slice(1), name];
      return [...cur, name];
    });
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

  // ESC exits recording mode.
  useEffect(() => {
    if (!recording) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exitRecording();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [recording]);

  const totalLoopMs = scene.poseHoldMs * Math.max(selectedPoses.length, 1);

  return (
    <>
      {recording && (
        <RecordingOverlay
          poses={selectedPoses}
          theme={theme}
          format={format}
          scene={scene}
          title={title}
          kicker={kicker}
          bodyLines={bodyLines}
          playing={playing}
          loopKey={loopKey}
          logoSrc={logoSrc}
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
                poses={selectedPoses}
                theme={theme}
                format={format}
                scene={scene}
                title={title}
                kicker={kicker}
                bodyLines={bodyLines}
                playing={playing}
                loopKey={loopKey}
                logoSrc={logoSrc}
              />
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setPlaying((p) => !p)} variant="soft">
              {playing ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {playing ? "Pause" : "Play"}
            </Button>
            <Button onClick={replay} variant="soft">
              <RefreshCw className="h-4 w-4 mr-2" /> Replay
            </Button>
            <Button onClick={startRecording} variant="default" disabled={selectedPoses.length === 0}>
              <Video className="h-4 w-4 mr-2" /> Record mode
            </Button>
            <div className="ml-auto inline-flex items-center text-[12px] text-muted-foreground">
              Loop ≈ {(totalLoopMs / 1000).toFixed(1)}s · {selectedPoses.length} pose{selectedPoses.length === 1 ? "" : "s"}
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-white/50 p-3 text-[12px] text-muted-foreground">
            <strong className="text-foreground">How to record:</strong> click <em>Record mode</em>, wait through the 3-2-1 countdown, then start your screen recording (iPhone Control Center → screen record, or QuickTime on Mac). The stage loops infinitely until you press <kbd className="px-1 py-0.5 rounded bg-muted text-foreground">ESC</kbd>.
          </div>
        </div>

        {/* RIGHT — Controls */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <Field label="Format">
                <div className="grid grid-cols-2 gap-2">
                  <FormatTile
                    active={format === "vertical"}
                    onClick={() => setFormat("vertical")}
                    icon={<RectangleVertical className="h-5 w-5" />}
                    label="Vertical"
                    sub="1080×1920 · Reels / TikTok"
                  />
                  <FormatTile
                    active={format === "square"}
                    onClick={() => setFormat("square")}
                    icon={<SquareIcon className="h-5 w-5" />}
                    label="Square"
                    sub="1080×1080 · Feed"
                  />
                </div>
              </Field>

              <Field label="Scene">
                <div className="grid grid-cols-1 gap-1.5">
                  {SCENES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSceneId(s.id)}
                      className={cn(
                        "text-left rounded-xl border p-3 transition",
                        sceneId === s.id ? "border-babymo-green ring-2 ring-babymo-green/30 bg-babymo-green-soft/40" : "border-input hover:bg-muted"
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
              <Field
                label={`Body text${scene.perBeatBody ? " (one line per pose)" : ""}`}
              >
                <Textarea
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  placeholder={scene.perBeatBody ? "Line 1 (pose 1)\nLine 2 (pose 2)\nLine 3 (pose 3)" : "Body shown across the whole reel"}
                  rows={4}
                />
                {scene.perBeatBody && (
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {scene.id === "cozy" ? "Cozy" : scene.id === "energetic" ? "Energetic" : scene.id === "playful" ? "Playful" : "Quiz"} scenes show a different body line per pose.
                  </div>
                )}
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Field label={`Poses · ${selectedPoses.length}/${MAX_POSES}`} inline />
                {selectedPoses.length > 0 && (
                  <Button size="sm" variant="ghost" onClick={() => setSelectedPoses([])}>Clear</Button>
                )}
              </div>
              <PosePicker selected={selectedPoses} onToggle={togglePose} />
              <div className="text-[11px] text-muted-foreground mt-2">
                Tap to add. Tap again to remove. Adding a 4th pose drops the oldest.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

/* ---------- Stage preview (the in-page, non-recording view) ---------- */

function StagePreview(props: Omit<React.ComponentProps<typeof AnimatedScene>, "className">) {
  const isVertical = props.format === "vertical";
  // Internal canvas is 1080×{1080 or 1920}; scale it down to fit a max
  // CSS width comfortably inside the preview card.
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.34);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function measure() {
      const w = el!.clientWidth;
      const internalW = 1080;
      const s = Math.min(w / internalW, isVertical ? 0.45 : 0.6);
      setScale(s);
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isVertical]);

  const cssW = 1080 * scale;
  const cssH = (isVertical ? 1920 : 1080) * scale;

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center">
      <div
        className="relative rounded-3xl overflow-hidden bg-muted/30"
        style={{ width: cssW, height: cssH }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <AnimatedScene {...props} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Fullscreen recording overlay ---------- */

function RecordingOverlay({
  countdown,
  onExit,
  ...sceneProps
}: Omit<React.ComponentProps<typeof AnimatedScene>, "className"> & {
  countdown: number | null;
  onExit: () => void;
}) {
  // Fit the internal canvas to the viewport while preserving aspect ratio.
  const [scale, setScale] = useState(0.5);
  const isVertical = sceneProps.format === "vertical";

  useEffect(() => {
    function measure() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const internalW = 1080;
      const internalH = isVertical ? 1920 : 1080;
      const s = Math.min(vw / internalW, vh / internalH);
      setScale(s);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isVertical]);

  const cssW = 1080 * scale;
  const cssH = (isVertical ? 1920 : 1080) * scale;

  return (
    <div className="stage-recording">
      <button
        onClick={onExit}
        className="absolute top-4 right-4 z-[110] inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-xs text-white hover:bg-white/25"
      >
        <X className="h-3.5 w-3.5" /> Exit (ESC)
      </button>

      <div className="relative" style={{ width: cssW, height: cssH }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <AnimatedScene {...sceneProps} />
        </div>

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

/* ---------- Pose picker ---------- */

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
            <img
              src={`/api/pose/${p}`}
              alt={p}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain p-1"
              draggable={false}
            />
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

/* ---------- Tiny field wrapper ---------- */

function Field({ label, children, inline = false }: { label: string; children?: React.ReactNode; inline?: boolean }) {
  return (
    <div className={inline ? "" : "space-y-1.5"}>
      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">{label}</div>
      {children}
    </div>
  );
}

function FormatTile({ active, onClick, icon, label, sub }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; sub: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-xl border p-3 text-left transition",
        active ? "border-babymo-green ring-2 ring-babymo-green/30 bg-babymo-green-soft/40" : "border-input hover:bg-muted"
      )}
    >
      <div className="flex items-center gap-2 mb-1">{icon}<span className="text-[13px] font-semibold">{label}</span></div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
    </button>
  );
}
