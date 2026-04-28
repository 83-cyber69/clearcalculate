const fs = require("fs");
const path = require("path");

function safeRemove(targetPath) {
  try {
    if (!fs.existsSync(targetPath)) {
      console.log(`[clean-cache] Skipping (not found): ${targetPath}`);
      return;
    }

    fs.rmSync(targetPath, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    console.log(`[clean-cache] Removed: ${targetPath}`);
  } catch (err) {
    console.warn(`[clean-cache] Failed to remove: ${targetPath}`);
    console.warn(err && err.message ? err.message : err);
  }
}

function run() {
  const projectRoot = process.cwd();
  console.log(`[clean-cache] Project: ${projectRoot}`);

  safeRemove(path.join(projectRoot, ".next"));
  safeRemove(path.join(projectRoot, "node_modules", ".cache"));

  console.log("[clean-cache] Done.");
}

run();
