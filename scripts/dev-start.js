const net = require("net");
const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs");

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.on("error", () => resolve(false));
    server.listen({ port, host: "127.0.0.1" }, () => {
      server.close(() => resolve(true));
    });
  });
}

async function findFreePort(startPort) {
  let port = startPort;
  for (let i = 0; i < 20; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const free = await isPortFree(port);
    if (free) return port;
    port += 1;
  }
  return startPort;
}

function warnIfOneDrive(projectRoot) {
  const normalized = projectRoot.toLowerCase();
  if (normalized.includes(path.sep + "onedrive" + path.sep)) {
    console.warn("\n[dev] WARNING: Project is inside OneDrive.");
    console.warn("[dev] OneDrive sync can cause file locking and .next cache corruption on Windows.");
    console.warn("[dev] Recommended: move the repo to: C:\\dev\\clearcalculate\n");
  }
}

async function run() {
  const projectRoot = process.cwd();
  warnIfOneDrive(projectRoot);

  const requestedPort = Number(process.env.PORT || 3000);
  const port = await findFreePort(Number.isFinite(requestedPort) ? requestedPort : 3000);

  if (port !== requestedPort) {
    console.warn(`[dev] Port ${requestedPort} is busy. Using ${port} instead.`);
  }

  console.log(`[dev] Starting Next.js dev server on http://localhost:${port}`);

  const nextCli = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
  if (!fs.existsSync(nextCli)) {
    console.error("[dev] Could not find Next.js CLI at:");
    console.error(nextCli);
    console.error("[dev] Try running: npm install");
    process.exit(1);
  }

  const child = spawn(process.execPath, [nextCli, "dev", "-p", String(port)], {
    stdio: "inherit",
    cwd: projectRoot,
    env: {
      ...process.env,
      PORT: String(port)
    }
  });

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}

run().catch((err) => {
  console.error("[dev] Failed to start dev server");
  console.error(err);
  process.exit(1);
});
