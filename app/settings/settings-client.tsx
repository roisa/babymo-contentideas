"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ExternalLink, AlertCircle, Copy, Check } from "lucide-react";

interface Status {
  clientId: boolean;
  clientSecret: boolean;
  refreshToken: boolean;
  redirectUri: string | null;
  templates: { single: boolean; carousel: boolean; reels: boolean };
  connected: boolean;
}

export function SettingsClient() {
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/canva/status")
      .then((r) => r.json())
      .then((d: Status) => setStatus(d))
      .catch((e) => setError(String(e)));
  }, []);

  function copy(value: string, key: string) {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="space-y-5">
      {/* Canva integration card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-[#00C4CC]/10 flex items-center justify-center text-2xl">🎨</div>
              <div>
                <div className="font-bold text-base">Canva Connect</div>
                <div className="text-xs text-muted-foreground">Autofill every generated piece into your Baby Mo Canva templates.</div>
              </div>
            </div>
            {status ? (
              status.connected ? (
                <Badge variant="green" className="text-[11px]">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Connected
                </Badge>
              ) : (
                <Badge variant="accent" className="text-[11px]">Not connected</Badge>
              )
            ) : null}
          </div>

          {error && (
            <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-3 text-[12px] text-destructive mb-3 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {status && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-secondary/50 border border-border/40 p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-2">Environment variables</div>
                <ul className="space-y-1.5 text-[13px]">
                  <EnvRow label="CANVA_CLIENT_ID" ok={status.clientId} />
                  <EnvRow label="CANVA_CLIENT_SECRET" ok={status.clientSecret} />
                  <EnvRow label="CANVA_REFRESH_TOKEN" ok={status.refreshToken} hint="Get this by signing in once below" />
                  <EnvRow label="CANVA_REDIRECT_URI" ok={Boolean(status.redirectUri)} valueIfSet={status.redirectUri ?? undefined} />
                  <EnvRow label="CANVA_TEMPLATE_SINGLE" ok={status.templates.single} />
                  <EnvRow label="CANVA_TEMPLATE_CAROUSEL" ok={status.templates.carousel} />
                  <EnvRow label="CANVA_TEMPLATE_REELS" ok={status.templates.reels} />
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Button asChild>
                  <a href="/api/canva/oauth/start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {status.refreshToken ? "Re-connect Canva" : "Connect to Canva"}
                  </a>
                </Button>
                <Button asChild variant="glass">
                  <a href="https://www.canva.dev/docs/connect/" target="_blank" rel="noopener noreferrer">
                    Canva Connect docs
                  </a>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quickstart card */}
      <Card>
        <CardContent className="p-6">
          <div className="font-bold text-base mb-3">Quickstart for the team</div>
          <ol className="space-y-3 text-[13px] text-muted-foreground leading-relaxed">
            <Step n="1" title="Create a Canva integration">
              Go to <a className="underline" href="https://www.canva.dev/docs/connect/getting-started/" target="_blank" rel="noopener noreferrer">canva.dev → My Integrations</a>, create a new Connect integration, copy the Client ID + Client Secret.
            </Step>
            <Step n="2" title="Set the redirect URL">
              Inside the integration settings, add this URL as an allowed redirect URI:{" "}
              <CodeCopy value={`${typeof window !== "undefined" ? window.location.origin : ""}/api/canva/oauth/callback`} onCopy={copy} copied={copied === "redirect"} k="redirect" />
            </Step>
            <Step n="3" title="Build the 3 Brand Templates in Canva">
              Follow <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">CANVA_TEMPLATE_GUIDE.md</code> in the repo. Three templates needed: single post (1080×1080), carousel slide (1080×1080), reels (1080×1920) — each with named text fields: <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">title</code>, <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">kicker</code>, <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">body</code>, <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">translit</code>, <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">arabic</code>, <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">attribution</code>, <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">page_number</code>, <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">footer</code>.
            </Step>
            <Step n="4" title="Add env vars on Vercel">
              Client ID/Secret/Redirect URI + the 3 template IDs from step 3.
            </Step>
            <Step n="5" title="Click 'Connect to Canva' above">
              Sign in once with the shared Baby Mo Canva account. Paste the displayed refresh token into Vercel as <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">CANVA_REFRESH_TOKEN</code>. Redeploy.
            </Step>
            <Step n="6" title="Done">
              Every generated content card now has an "Open in Canva" button next to the existing JPG / ZIP exports.
            </Step>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

function EnvRow({ label, ok, hint, valueIfSet }: { label: string; ok: boolean; hint?: string; valueIfSet?: string }) {
  return (
    <li className="flex items-start gap-2">
      {ok ? <CheckCircle2 className="h-4 w-4 text-babymo-green shrink-0 mt-0.5" /> : <Circle className="h-4 w-4 text-muted-foreground/60 shrink-0 mt-0.5" />}
      <div className="flex-1 min-w-0">
        <code className="font-mono text-[12px]">{label}</code>
        {valueIfSet && <span className="text-[11px] text-muted-foreground ml-2 break-all">= {valueIfSet}</span>}
        {!ok && hint && <span className="text-[11px] text-muted-foreground ml-2">— {hint}</span>}
      </div>
    </li>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <div className="h-6 w-6 rounded-full bg-babymo-green text-white text-[11px] font-bold flex items-center justify-center shrink-0">{n}</div>
      <div>
        <div className="font-semibold text-foreground text-[13px] mb-0.5">{title}</div>
        <div>{children}</div>
      </div>
    </li>
  );
}

function CodeCopy({ value, onCopy, copied, k }: { value: string; onCopy: (v: string, k: string) => void; copied: boolean; k: string }) {
  return (
    <span className="inline-flex items-center gap-1 bg-secondary px-2 py-0.5 rounded mt-1 text-[12px] font-mono text-foreground">
      <span className="break-all">{value}</span>
      <button onClick={() => onCopy(value, k)} className="text-muted-foreground hover:text-foreground shrink-0">
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      </button>
    </span>
  );
}
