import { chromium } from "file:///C:/Users/VIMAL/AppData/Local/Temp/claude/c--Users-VIMAL-Desktop-VIMAL-PORTFOLIO-vvport/47177ecf-5b6b-43fb-9054-0d7e44a743d6/scratchpad/node_modules/playwright-core/index.mjs";
import fs from "node:fs";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
let out = "";
for (const path of ["", "work/vise", "work/flex-academy", "work/mindful-moments"]) {
  await p.goto("http://localhost:4173/portfolio-vimal/" + path, { waitUntil: "networkidle" });
  out += `\n===== /${path}\n` + await p.evaluate(() => document.querySelector("main").innerText);
}
fs.writeFileSync("C:/Users/VIMAL/AppData/Local/Temp/claude/c--Users-VIMAL-Desktop-VIMAL-PORTFOLIO-vvport/47177ecf-5b6b-43fb-9054-0d7e44a743d6/scratchpad/sitetext.txt", out);
await b.close();
