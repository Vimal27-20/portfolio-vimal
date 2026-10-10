import { chromium } from "file:///C:/Users/VIMAL/AppData/Local/Temp/claude/c--Users-VIMAL-Desktop-VIMAL-PORTFOLIO-vvport/47177ecf-5b6b-43fb-9054-0d7e44a743d6/scratchpad/node_modules/playwright-core/index.mjs";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
for (const [w, h, tag] of [[1440, 900, "d"], [390, 844, "m"]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto("http://localhost:4173/portfolio-vimal/", { waitUntil: "networkidle" });
  const top = await p.evaluate(() => document.getElementById("now").offsetTop);
  await p.evaluate(t => scrollTo(0, t), top); await p.mouse.move(w * 0.7, 160); await p.waitForTimeout(1500);
  await p.screenshot({ path: `.impeccable/review/v-now-top-${tag}.png` });
  await p.evaluate(t => scrollTo(0, t), top + h * 0.8); await p.waitForTimeout(800);
  await p.screenshot({ path: `.impeccable/review/v-now-mid-${tag}.png` });
  await p.close();
}
await b.close();
