import express from "express";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

export const appBuilderRouter = express.Router();

appBuilderRouter.post("/build-apk", (req, res) => {
  res.status(501).json({ error: "APK build service not configured in production." });
});

appBuilderRouter.post("/build-aab", (req, res) => {
  res.status(501).json({ error: "AAB build service not configured in production." });
});
