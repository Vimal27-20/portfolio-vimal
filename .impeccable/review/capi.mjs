import { chromium } from "file:///C:/Users/VIMAL/AppData/Local/Temp/claude/c--Users-VIMAL-Desktop-VIMAL-PORTFOLIO-vvport/47177ecf-5b6b-43fb-9054-0d7e44a743d6/scratchpad/node_modules/playwright-core/index.mjs";
const base = "http://localhost:4173/portfolio-vimal/";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const errs = [];
for (const [w, h, tag] of [[1440, 900, "desktop"], [390, 844, "mobile"]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  p.on("pageerror", e => errs.push(e.message));
  await p.goto(base, { waitUntil: "networkidle" });
  await p.click('button[aria-label^="Quick view: VISE"]');
  await p.waitForTimeout(700);
  await p.screenshot({ path: `.impeccable/review/qv-${tag}.png` });
  await p.keyboard.press("ArrowRight"); await p.waitForTimeout(500);
  await p.screenshot({ path: `.impeccable/review/qv2-${tag}.png` });
  await p.keyboard.press("Escape"); await p.waitForTimeout(300);
  await p.click('button[aria-label="Open menu"]'); await p.waitForTimeout(500);
  await p.screenshot({ path: `.impeccable/review/menu-${tag}.png` });
  await p.keyboard.press("Escape");
  await p.goto(base + "work/vise", { waitUntil: "networkidle" });
  await p.evaluate(() => scrollTo(0, 1500)); await p.waitForTimeout(800);
  await p.screenshot({ path: `.impeccable/review/case-read-${tag}.png` });
  await p.close();
}
console.log(errs.length ? "ERRORS " + errs.join(" | ") : "no errors");
await b.close();
