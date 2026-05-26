/* Quick visual sanity check for /animate. */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
  await page.goto("http://localhost:3000/animate", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500); // let one anim cycle play
  const outDir = path.join(process.cwd(), ".samples");
  fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, "animate-page.png");
  await page.screenshot({ path: out, fullPage: true });
  console.log("→", out);
  await browser.close();
})();
