import express from "express";
import fs from "fs";
import path from "path";
import { HOSTED_DIR } from "./storage.js";

export const filesRouter = express.Router();

// Helper for file listing
function listFiles(dir: string): any[] {
  return fs.readdirSync(dir).map(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    return {
      name: file,
      isDirectory: stats.isDirectory(),
      size: stats.size,
      updated: stats.mtime
    };
  });
}

// Routes - simplified/refactored from main server
filesRouter.get("/list", (req, res) => {
    const requestedPath = req.query.path as string || "";
    const safePath = path.normalize(path.join(HOSTED_DIR, requestedPath));

    // Security check: Ensure safePath is within HOSTED_DIR
    if (!safePath.startsWith(path.normalize(HOSTED_DIR))) {
        return res.status(403).json({ error: "Access Denied: Path outside of allowed storage." });
    }

    if (!fs.existsSync(safePath)) {
        return res.status(404).json({ error: "Directory not found." });
    }

    res.json({ files: listFiles(safePath) });
});
