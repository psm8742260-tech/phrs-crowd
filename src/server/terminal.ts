import express from "express";
import { exec } from "child_process";

export const terminalRouter = express.Router();

// Define an allowlist of permitted commands
const ALLOWED_COMMANDS = ["npm run lint", "npm run build", "ls -l", "whoami"];

terminalRouter.post("/run", (req, res) => {
  // REQUIRE AUTH: Simplistic check for demo purposes, 
  // in production this must be integrated with your auth middleware.
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { command } = req.body;
  
  // Strict allowlist validation
  if (!ALLOWED_COMMANDS.includes(command)) {
    return res.status(403).json({ error: "Forbidden: Command not in allowlist." });
  }

  // Execute using execFile (safer) to avoid shell injection, or sanitize heavily.
  // Given allowlist, this is safe.
  exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
    res.json({ stdout, stderr, code: error ? error.code : 0 });
  });
});
