import fs from "fs";
import path from "path";
import express from "express";
import { HOSTED_DIR } from "./storage.js";

const PROJECTS_FILE = path.join(HOSTED_DIR, "projects.json");

export function getProjectsList() {
  const defaultProjects = [
    {
      id: 'phrs-master-cloud',
      name: 'PHRS Crowd',
      status: 'active',
      created_at: new Date().toISOString(),
      api_hits: 8742,
      project_number: '398230688462',
      url: 'https://phrscrowd.online'
    },
    {
      id: '159a1f68-dbdb-45af-aa36-1f7019ccb5e3',
      name: 'Old Money Traders',
      status: 'active',
      created_at: new Date().toISOString(),
      api_hits: 2450,
      url: 'https://ais-dev-it3r6x7jg7pp4gq2c7gvfw-398230688462.asia-southeast1.run.app'
    }
  ];
  try {
    if (!fs.existsSync(PROJECTS_FILE)) {
      if (!fs.existsSync(HOSTED_DIR)) {
        fs.mkdirSync(HOSTED_DIR, { recursive: true });
      }
      fs.writeFileSync(PROJECTS_FILE, JSON.stringify(defaultProjects, null, 2), "utf-8");
      return defaultProjects;
    }
    const data = fs.readFileSync(PROJECTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return defaultProjects;
  }
}

export function saveProjectsList(list: any[]) {
  try {
    if (!fs.existsSync(HOSTED_DIR)) {
      fs.mkdirSync(HOSTED_DIR, { recursive: true });
    }
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save projects:", e);
  }
}

export const projectsRouter = express.Router();

projectsRouter.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(getProjectsList());
});

projectsRouter.options("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

projectsRouter.post("/", express.json(), (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { id, name, domain, port, url, status } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Missing required field: name" });
    }
    
    const projectsList = getProjectsList();
    const targetId = id || `sdk-${Math.floor(1000 + Math.random() * 9000)}`;
    const existingIdx = projectsList.findIndex((p: any) => p.id === targetId || (p.name && p.name.toLowerCase() === name.toLowerCase()));
    
    const resolvedUrl = url || (domain ? `https://${domain}` : `http://localhost:${port || 3000}`);
    
    const newEntry = {
      id: targetId,
      name,
      status: status ? status.toLowerCase() : "active",
      created_at: new Date().toISOString(),
      api_hits: existingIdx >= 0 ? (projectsList[existingIdx].api_hits || 0) + 1 : 1,
      url: resolvedUrl
    };

    if (existingIdx >= 0) {
      projectsList[existingIdx] = { ...projectsList[existingIdx], ...newEntry };
    } else {
      projectsList.push(newEntry);
    }
    
    saveProjectsList(projectsList);
    res.json({ success: true, message: "Project registered successfully", project: newEntry });
  } catch (error) {
    console.error("Project Telemetry Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

projectsRouter.post("/heartbeat", express.json(), (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json({ success: true, message: "Heartbeat received" });
});
