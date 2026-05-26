import { NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/canva";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Single-shared-account OAuth callback.
 *
 * After the admin signs in to the shared Canva Teams account, Canva
 * redirects here with ?code=...&state=... We exchange the code for an
 * access + refresh token, then display the refresh token so the admin
 * can paste it into the Vercel env var `CANVA_REFRESH_TOKEN`.
 *
 * The token isn't auto-stored — Vercel functions are read-only at
 * runtime. This is a one-time copy-paste step.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return htmlResponse(
      500,
      `<h1>Canva OAuth error</h1><p><b>${escapeHtml(error)}</b></p><p>${escapeHtml(url.searchParams.get("error_description") ?? "")}</p>`
    );
  }
  if (!code) {
    return htmlResponse(400, `<h1>Missing ?code</h1>`);
  }

  try {
    const tokens = await exchangeCodeForTokens(code);
    return htmlResponse(
      200,
      `
<!doctype html>
<html><head><meta charset="utf-8"><title>Canva connected · Baby Mo Studio</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Inter", sans-serif; background: #FFFBF2; color: #1F2A1F; padding: 32px; max-width: 720px; margin: 0 auto; line-height: 1.5; }
  h1 { font-size: 28px; margin-top: 0; }
  code { background: #2E2A2A; color: #FFE066; padding: 2px 8px; border-radius: 6px; }
  pre { background: #2E2A2A; color: #FFE066; padding: 18px; border-radius: 12px; overflow-x: auto; font-size: 13px; }
  .ok { background: #D6F0DD; color: #1E7A38; padding: 10px 16px; border-radius: 12px; display: inline-block; font-weight: 700; margin-bottom: 18px; }
  .step { background: white; border: 1px solid #E5DEC6; border-radius: 16px; padding: 18px 22px; margin: 14px 0; }
  .step b { color: #2EA84F; }
</style></head>
<body>
  <div class="ok">✓ Canva connected</div>
  <h1>One-time setup: copy the refresh token</h1>
  <p>This is a single-shared-account flow. Paste the refresh token below into your <b>Vercel project env vars</b> (or your local <code>.env.local</code>) as <code>CANVA_REFRESH_TOKEN</code>. From then on every Baby Mo team member can autofill into the shared Canva account.</p>

  <div class="step">
    <b>1.</b> Copy this refresh token:
    <pre id="rt">${escapeHtml(tokens.refresh_token)}</pre>
  </div>
  <div class="step">
    <b>2.</b> In Vercel → Project → Settings → Environment Variables, add:
    <pre>CANVA_REFRESH_TOKEN=&lt;paste here&gt;</pre>
    Plus (if not already set):
    <pre>CANVA_CLIENT_ID=&lt;your integration client id&gt;
CANVA_CLIENT_SECRET=&lt;your integration client secret&gt;
CANVA_REDIRECT_URI=https://your-vercel-url/api/canva/oauth/callback
CANVA_TEMPLATE_SINGLE=&lt;Brand Template ID for single posts&gt;
CANVA_TEMPLATE_CAROUSEL=&lt;Brand Template ID for carousel&gt;
CANVA_TEMPLATE_REELS=&lt;Brand Template ID for reels&gt;</pre>
  </div>
  <div class="step">
    <b>3.</b> Redeploy. Done. The "Open in Canva" button on every generated content card will now create autofilled designs in the shared Canva account.
  </div>

  <p style="color:#7A6F5C;font-size:13px;margin-top:24px">Scopes granted: <code>${escapeHtml(tokens.scope)}</code> · Access token expires in ${tokens.expires_in}s · The refresh token above does NOT expire unless revoked.</p>
</body></html>`
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return htmlResponse(500, `<h1>Token exchange failed</h1><pre>${escapeHtml(msg)}</pre>`);
  }
}

function htmlResponse(status: number, html: string): NextResponse {
  return new NextResponse(html, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
}
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
