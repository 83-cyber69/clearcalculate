const { execSync } = require("child_process");

function killNodeWindows() {
  if (process.platform !== "win32") return;
  try {
    execSync("taskkill /F /IM node.exe", { stdio: "inherit" });
  } catch {
    // ignore
  }
}

function run() {
  console.log("[dev:reset] Killing node processes (Windows)...");
  killNodeWindows();

  console.log("[dev:reset] Cleaning cache...");
  try {
    execSync("node scripts/clean-cache.js", { stdio: "inherit" });
  } catch {
    // ignore
  }

  console.log("[dev:reset] Starting dev server...");
  execSync("node scripts/dev-start.js", { stdio: "inherit" });
}

run();
