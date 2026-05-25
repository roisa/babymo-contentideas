/**
 * Canva Connect API client — single shared account model.
 *
 * Auth flow:
 *   1. Admin opens /api/canva/oauth/start once, signs in to the shared
 *      Canva Teams account, authorises the integration.
 *   2. The callback exchanges the code for an access + refresh token.
 *   3. The refresh token is printed to the callback page; admin pastes
 *      it into Vercel env var CANVA_REFRESH_TOKEN.
 *   4. From then on, every call (autofill / list-templates / etc.) calls
 *      getAccessToken() which uses the refresh token to mint a fresh
 *      access token on demand.
 *
 * Docs: https://www.canva.dev/docs/connect/
 */

const TOKEN_URL = "https://api.canva.com/rest/v1/oauth/token";
const AUTHORIZE_URL = "https://www.canva.com/api/oauth/authorize";
const API_BASE = "https://api.canva.com/rest/v1";

export const CANVA_SCOPES = [
  "design:meta:read",
  "design:content:read",
  "design:content:write",
  "brandtemplate:meta:read",
  "brandtemplate:content:read",
  "asset:read",
  "asset:write",
].join(" ");

export interface CanvaTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface CanvaAutofillJob {
  job: {
    id: string;
    status: "in_progress" | "success" | "failed";
    result?: {
      type: "create_design";
      design: {
        id: string;
        title: string;
        urls: { edit_url: string; view_url: string };
        created_at: number;
        updated_at: number;
      };
    };
    error?: { code: string; message: string };
  };
}

export interface CanvaBrandTemplate {
  id: string;
  title: string;
  view_url: string;
  create_url: string;
  thumbnail?: { url: string; width: number; height: number };
  updated_at: number;
}

function clientId(): string {
  const v = process.env.CANVA_CLIENT_ID;
  if (!v) throw new Error("CANVA_CLIENT_ID is not set");
  return v;
}
function clientSecret(): string {
  const v = process.env.CANVA_CLIENT_SECRET;
  if (!v) throw new Error("CANVA_CLIENT_SECRET is not set");
  return v;
}
function redirectUri(): string {
  return process.env.CANVA_REDIRECT_URI ?? "http://localhost:3000/api/canva/oauth/callback";
}

export function buildAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId(),
    redirect_uri: redirectUri(),
    scope: CANVA_SCOPES,
    state,
    code_challenge_method: "s256",
    // PKCE optional but recommended; for the single-account admin flow we
    // can skip it. If we ever go multi-user, add a real PKCE challenge.
    code_challenge: "BABYMO_STUDIO_SINGLE_ACCOUNT_NO_PKCE",
  });
  return `${AUTHORIZE_URL}?${params.toString()}`;
}

function basicAuthHeader(): string {
  const creds = `${clientId()}:${clientSecret()}`;
  return "Basic " + Buffer.from(creds).toString("base64");
}

export async function exchangeCodeForTokens(code: string): Promise<CanvaTokenResponse> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri(),
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { Authorization: basicAuthHeader(), "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Canva token exchange failed (${res.status}): ${text}`);
  }
  return (await res.json()) as CanvaTokenResponse;
}

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

export async function getAccessToken(): Promise<string> {
  // In-memory cache — good enough for serverless cold-start lifetimes.
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 30_000) {
    return cachedAccessToken.token;
  }
  const refresh = process.env.CANVA_REFRESH_TOKEN;
  if (!refresh) {
    throw new Error(
      "CANVA_REFRESH_TOKEN is not set. Visit /api/canva/oauth/start to complete the one-time OAuth flow, then copy the printed refresh token into the env var."
    );
  }
  const body = new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { Authorization: basicAuthHeader(), "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Canva refresh-token call failed (${res.status}): ${text}`);
  }
  const data = (await res.json()) as CanvaTokenResponse;
  cachedAccessToken = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cachedAccessToken.token;
}

/* ---------- Autofill ---------- */

export type AutofillFieldValue =
  | { type: "text"; text: string }
  | { type: "image"; asset_id: string };

export interface AutofillRequest {
  brand_template_id: string;
  data: Record<string, AutofillFieldValue>;
  title?: string;
}

export async function createAutofill(req: AutofillRequest): Promise<{ jobId: string }> {
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}/autofills`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Canva autofill create failed (${res.status}): ${text}`);
  }
  const data = (await res.json()) as CanvaAutofillJob;
  return { jobId: data.job.id };
}

export async function pollAutofill(jobId: string, opts: { timeoutMs?: number; intervalMs?: number } = {}): Promise<CanvaAutofillJob> {
  const timeout = opts.timeoutMs ?? 30_000;
  const interval = opts.intervalMs ?? 1500;
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const token = await getAccessToken();
    const res = await fetch(`${API_BASE}/autofills/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Canva autofill poll failed (${res.status}): ${text}`);
    }
    const data = (await res.json()) as CanvaAutofillJob;
    if (data.job.status === "success" || data.job.status === "failed") return data;
    await new Promise((r) => setTimeout(r, interval));
  }
  throw new Error(`Canva autofill timed out after ${timeout}ms (job ${jobId})`);
}

/* ---------- Templates ---------- */

export async function listBrandTemplates(): Promise<CanvaBrandTemplate[]> {
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}/brand-templates`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Canva list templates failed (${res.status}): ${text}`);
  }
  const data = (await res.json()) as { items: CanvaBrandTemplate[] };
  return data.items;
}

/* ---------- Asset upload (for the Baby Mo logo, character art, Arabic image) ---------- */

export async function uploadAsset(filename: string, png: Buffer): Promise<string> {
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}/asset-uploads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/octet-stream",
      "Asset-Upload-Metadata": JSON.stringify({ name_base64: Buffer.from(filename).toString("base64") }),
    },
    body: new Uint8Array(png) as BodyInit,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Canva asset upload failed (${res.status}): ${text}`);
  }
  const data = (await res.json()) as { job: { id: string; status: string; asset?: { id: string } } };
  // Asset uploads are async — poll for it
  if (data.job.status === "success" && data.job.asset?.id) return data.job.asset.id;
  // Poll
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    const p = await fetch(`${API_BASE}/asset-uploads/${data.job.id}`, { headers: { Authorization: `Bearer ${token}` } });
    if (!p.ok) continue;
    const pd = (await p.json()) as { job: { status: string; asset?: { id: string } } };
    if (pd.job.status === "success" && pd.job.asset?.id) return pd.job.asset.id;
    if (pd.job.status === "failed") throw new Error("Canva asset upload failed");
  }
  throw new Error("Canva asset upload timed out");
}
