import { chromium } from "file:///C:/Users/VIMAL/AppData/Local/Temp/claude/c--Users-VIMAL-Desktop-VIMAL-PORTFOLIO-vvport/47177ecf-5b6b-43fb-9054-0d7e44a743d6/scratchpad/node_modules/playwright-core/index.mjs";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto("http://localhost:4173/portfolio-vimal/", { waitUntil: "networkidle" });
const H = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < H; y += 500) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(40); }
await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(600);
const half = Math.ceil(H / 2);
await p.screenshot({ path: ".impeccable/review/mobile.png", fullPage: true, clip: { x: 0, y: 0, width: 390, height: half } });
await p.screenshot({ path: ".impeccable/review/mobile-2.png", fullPage: true, clip: { x: 0, y: half, width: 390, height: H - half } });
console.log("height", H, "split at", half);
await b.close();
