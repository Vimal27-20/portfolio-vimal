import { chromium } from "file:///C:/Users/VIMAL/AppData/Local/Temp/claude/c--Users-VIMAL-Desktop-VIMAL-PORTFOLIO-vvport/47177ecf-5b6b-43fb-9054-0d7e44a743d6/scratchpad/node_modules/playwright-core/index.mjs";
const base = "http://localhost:4173/portfolio-vimal";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const errs = [];
async function shot(path, w, h, out, full = true) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  p.on("pageerror", e => errs.push(e.message)); p.on("console", m => m.type() === "error" && errs.push(m.text()));
  await p.goto(base + path, { waitUntil: "networkidle" });
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 500) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(40); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(700);
  await p.screenshot({ path: out, fullPage: full });
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(out, "overflow", ov);
  await p.close();
}
await shot("/", 1440, 900, ".impeccable/review/desktop.png");
await shot("/", 390, 844, ".impeccable/review/mobile.png");
await shot("/", 1440, 900, ".impeccable/review/desktop-first.png", false);
await shot("/", 390, 844, ".impeccable/review/mobile-first.png", false);
await shot("/work/vise", 1440, 900, ".impeccable/review/case-desktop.png");
await shot("/work/vise", 390, 844, ".impeccable/review/case-mobile.png");
console.log(errs.length ? "ERRORS: " + errs.join(" | ") : "no console errors");
await b.close();
