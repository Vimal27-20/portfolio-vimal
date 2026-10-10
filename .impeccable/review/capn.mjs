import { chromium } from "file:///C:/Users/VIMAL/AppData/Local/Temp/claude/c--Users-VIMAL-Desktop-VIMAL-PORTFOLIO-vvport/47177ecf-5b6b-43fb-9054-0d7e44a743d6/scratchpad/node_modules/playwright-core/index.mjs";
const base = "http://localhost:4173/portfolio-vimal/";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const errs = [];
for (const [w, h, tag] of [[1440, 900, "d"], [390, 844, "m"]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  p.on("pageerror", e => errs.push(e.message));
  await p.goto(base, { waitUntil: "networkidle" });
  const now = p.locator("#now");
  await now.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200);
  await now.screenshot({ path: `.impeccable/review/n-now-${tag}.png` });
  // play a round: click a wrong tile then the result
  await p.locator(".game-tile").first().click(); await p.waitForTimeout(400);
  await p.locator(".wg--game").screenshot({ path: `.impeccable/review/n-game-${tag}.png` });
  await p.locator(".step").nth(3).click(); await p.locator(".chip").nth(2).click(); await p.waitForTimeout(400);
  await p.locator(".wg--process").screenshot({ path: `.impeccable/review/n-process-${tag}.png` });
  await p.close();
}
// case study island
const c = await b.newPage({ viewport: { width: 1440, height: 900 } });
await c.goto(base + "work/vise", { waitUntil: "networkidle" });
await c.evaluate(() => scrollTo(0, 1800)); await c.waitForTimeout(900);
await c.screenshot({ path: ".impeccable/review/n-case-island.png", clip: { x: 300, y: 0, width: 840, height: 70 } });
const cm = await b.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
await cm.goto(base + "work/vise", { waitUntil: "networkidle" });
await cm.evaluate(() => scrollTo(0, 1800)); await cm.waitForTimeout(900);
await cm.screenshot({ path: ".impeccable/review/n-case-island-m.png", clip: { x: 0, y: 0, width: 390, height: 70 } });
console.log(errs.length ? "ERRORS " + errs.join(" | ") : "no errors");
await b.close();
