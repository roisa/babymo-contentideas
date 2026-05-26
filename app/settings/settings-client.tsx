"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ExternalLink, AlertCircle, Copy, Check, Cloud, CloudOff, RefreshCw } from "lucide-react";

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

      {/* Team library card */}
      <LibraryCard />

      {/* AI usage / cost telemetry */}
      <UsageCard />

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

interface LibraryStatus {
  configured: boolean;
  reachable?: boolean;
  itemCount?: number;
  error?: string;
  envHints?: { upstashUrl: boolean; upstashToken: boolean };
}

function LibraryCard() {
  const [status, setStatus] = useState<LibraryStatus | null>(null);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const r = await fetch("/api/library/status", { cache: "no-store" });
      setStatus((await r.json()) as LibraryStatus);
    } catch (e) {
      setStatus({ configured: false, error: e instanceof Error ? e.message : String(e) });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-babymo-green/10 flex items-center justify-center">
              <Cloud className="h-6 w-6 text-babymo-green" />
            </div>
            <div>
              <div className="font-bold text-base">Team library sync</div>
              <div className="text-xs text-muted-foreground">Share generated content across everyone on the team via Upstash Redis.</div>
            </div>
          </div>
          {status ? (
            status.configured && status.reachable ? (
              <Badge variant="green" className="text-[11px]">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Connected
              </Badge>
            ) : status.configured ? (
              <Badge variant="accent" className="text-[11px]">Unreachable</Badge>
            ) : (
              <Badge variant="accent" className="text-[11px]">
                <CloudOff className="h-3 w-3 mr-1" /> Local-only
              </Badge>
            )
          ) : null}
        </div>

        {status?.error && (
          <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-3 text-[12px] text-destructive mb-3 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span className="min-w-0 break-all">{status.error}</span>
          </div>
        )}

        {status && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-secondary/50 border border-border/40 p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-2">Environment variables</div>
              <ul className="space-y-1.5 text-[13px]">
                <EnvRow
                  label="UPSTASH_REDIS_REST_URL  (or KV_REST_API_URL)"
                  ok={Boolean(status.envHints?.upstashUrl) || (status.configured ?? false)}
                />
                <EnvRow
                  label="UPSTASH_REDIS_REST_TOKEN  (or KV_REST_API_TOKEN)"
                  ok={Boolean(status.envHints?.upstashToken) || (status.configured ?? false)}
                />
              </ul>
              {status.configured && status.reachable && (
                <div className="text-[12px] text-muted-foreground mt-3">
                  {status.itemCount ?? 0} item{(status.itemCount ?? 0) === 1 ? "" : "s"} in the team library.
                </div>
              )}
            </div>

            {!status.configured && (
              <div className="text-[12px] text-muted-foreground leading-relaxed">
                Without these vars, the library lives in each browser&apos;s localStorage — no sharing between teammates. Provision an Upstash Redis or Vercel KV database (both free tiers work) and add the two env vars on Vercel.
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-1">
              <Button onClick={refresh} disabled={loading} variant="soft" size="sm">
                <RefreshCw className={`h-3.5 w-3.5 mr-2 ${loading ? "animate-spin" : ""}`} />
                Re-check
              </Button>
              <Button asChild variant="glass" size="sm">
                <a href="https://upstash.com/docs/redis/overall/getstarted" target="_blank" rel="noopener noreferrer">
                  Upstash docs
                </a>
              </Button>
              <Button asChild variant="glass" size="sm">
                <a href="https://vercel.com/docs/storage/vercel-kv" target="_blank" rel="noopener noreferrer">
                  Vercel KV docs
                </a>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface UsageDay {
  date: string;
  requests: number;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  cacheHits: number;
  cacheMisses: number;
}

interface UsageResponse {
  configured: boolean;
  days: UsageDay[];
  totals: (UsageDay & { cacheHitRate: number; cost: number }) | null;
}

function UsageCard() {
  const [data, setData] = useState<UsageResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const r = await fetch("/api/usage?days=7", { cache: "no-store" });
      setData((await r.json()) as UsageResponse);
    } catch (e) {
      setData({ configured: false, days: [], totals: null });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  // Find the peak request day so the bars can be proportionally sized.
  const peak = Math.max(1, ...(data?.days ?? []).map((d) => d.requests));

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-babymo-coral/10 flex items-center justify-center text-xl">📊</div>
            <div>
              <div className="font-bold text-base">AI usage · last 7 days</div>
              <div className="text-xs text-muted-foreground">Token totals, prompt cache effectiveness, estimated cost.</div>
            </div>
          </div>
          {data && !data.configured && (
            <Badge variant="accent" className="text-[11px]">
              <CloudOff className="h-3 w-3 mr-1" /> Local-only
            </Badge>
          )}
        </div>

        {data && !data.configured && (
          <div className="text-[12px] text-muted-foreground leading-relaxed">
            Usage tracking requires Upstash Redis (same env vars as the team library above). Without it, generations still work — they just aren't tallied.
          </div>
        )}

        {data?.configured && data.totals && (
          <div className="space-y-4">
            {/* Totals row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat label="Generations" value={data.totals.requests.toLocaleString()} />
              <Stat
                label="Cache hit rate"
                value={`${(data.totals.cacheHitRate * 100).toFixed(0)}%`}
                hint={`${data.totals.cacheHits}/${data.totals.cacheHits + data.totals.cacheMisses}`}
              />
              <Stat
                label="Tokens (input+output)"
                value={`${((data.totals.inputTokens + data.totals.outputTokens) / 1000).toFixed(1)}K`}
              />
              <Stat
                label="Est. cost"
                value={`$${data.totals.cost.toFixed(2)}`}
                hint="Sonnet 4.6 pricing"
              />
            </div>

            {/* Mini bar chart of daily request volume */}
            <div className="rounded-2xl bg-secondary/50 border border-border/40 p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-3">Daily requests</div>
              <div className="flex items-end gap-1.5 h-20">
                {data.days.map((d) => (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      className="w-full rounded-t bg-babymo-coral/70 transition-all min-h-[2px]"
                      style={{ height: `${(d.requests / peak) * 100}%` }}
                      title={`${d.date}: ${d.requests} requests`}
                    />
                    <div className="text-[9px] text-muted-foreground">{d.date.slice(5)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button onClick={refresh} disabled={loading} variant="soft" size="sm">
                <RefreshCw className={`h-3.5 w-3.5 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl bg-white/60 border border-border/40 p-3">
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-semibold">{label}</div>
      <div className="text-base font-bold mt-1">{value}</div>
      {hint && <div className="text-[10px] text-muted-foreground mt-0.5">{hint}</div>}
    </div>
  );
}
