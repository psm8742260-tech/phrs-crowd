import fs from "fs";
import path from "path";

// PHRS CLOUD HOSTING ENGINE: Directory
export const HOSTED_DIR = path.join(process.cwd(), "dist", "hosted");

if (!fs.existsSync(HOSTED_DIR)) {
  fs.mkdirSync(HOSTED_DIR, { recursive: true });
}

// Ensure default dashboard directory exists
export const defaultDashboardDir = path.join(HOSTED_DIR, "dashboard");
if (!fs.existsSync(defaultDashboardDir)) {
  fs.mkdirSync(defaultDashboardDir, { recursive: true });
  fs.writeFileSync(path.join(defaultDashboardDir, "index.html"), `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>PHRS Dashboard</title>
      <style>
        body { font-family: sans-serif; display: flex; flex-direction: column; items-center; justify-content: center; height: 100vh; margin: 0; background: #f1f5f9; color: #1e293b; }
        .card { background: white; padding: 2rem; border-radius: 1rem; shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); text-align: center; max-width: 400px; border: 1px solid #e2e8f0; }
        h1 { color: #4f46e5; margin-bottom: 0.5rem; }
        p { color: #64748b; line-height: 1.5; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>PHRS Active Node</h1>
        <p>This is the default dashboard view for your PHRS node. Start deploying your custom applications to see them here.</p>
      </div>
    </body>
    </html>
  `, "utf-8");
}

// --- STORAGE & BACKUP METRICS HELPERS ---
export function getDirSize(dirPath: string): number {
  let totalSize = 0;
  if (!fs.existsSync(dirPath)) return 0;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      totalSize += getDirSize(filePath);
    } else {
      totalSize += stats.size;
    }
  }
  return totalSize;
}

export function safeReadJson(filePath: string, defaultValue: any) {
  try {
    if (!fs.existsSync(filePath)) return defaultValue;
    const data = fs.readFileSync(filePath, "utf-8").trim();
    if (!data) return defaultValue;
    return JSON.parse(data);
  } catch (e) {
    console.error(`[Not JSON / Error reading ${filePath}]:`, e);
    return defaultValue;
  }
}
