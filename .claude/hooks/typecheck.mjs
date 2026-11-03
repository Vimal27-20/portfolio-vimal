// PostToolUse hook: type-check the project after Claude edits a .ts/.tsx file.
// The repo has no tests, so tsc is the safety net. Errors go back to Claude (exit 2).
import { execFileSync } from "node:child_process";
import path from "node:path";

let input = "";
for await (const chunk of process.stdin) input += chunk;

let file = "";
try { file = JSON.parse(input).tool_input?.file_path ?? ""; } catch {}
if (!/\.tsx?$/.test(file)) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
try {
  execFileSync(process.execPath, [path.join(root, "node_modules/typescript/bin/tsc"), "--noEmit", "-p", root], { cwd: root, stdio: "pipe" });
} catch (e) {
  const out = String(e.stdout || e.stderr || e.message).split("\n").slice(0, 40).join("\n");
  process.stderr.write(`TypeScript errors after editing ${path.basename(file)}:\n${out}\n`);
  process.exit(2);
}
