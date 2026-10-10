import { chromium } from "file:///C:/Users/VIMAL/AppData/Local/Temp/claude/c--Users-VIMAL-Desktop-VIMAL-PORTFOLIO-vvport/47177ecf-5b6b-43fb-9054-0d7e44a743d6/scratchpad/node_modules/playwright-core/index.mjs";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
for (const [w, h] of [[1140, 718], [1280, 650], [1440, 900], [1920, 1080], [768, 1024], [390, 844], [375, 667]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto("http://localhost:4173/portfolio-vimal/", { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  const gap = await p.evaluate(() => {
    const t = document.querySelector(".hero-in").getBoundingClientRect().top;
    return Math.round(t);
  });
  await p.screenshot({ path: `.impeccable/review/hero-${w}x${h}.png` });
  console.log(w, h, "headline top", gap);
  await p.close();
}
await b.close();
