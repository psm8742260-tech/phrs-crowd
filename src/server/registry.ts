import fs from "fs";
import path from "path";
import { HOSTED_DIR, safeReadJson } from "./storage.js";
import { getDatabase, saveDatabase } from "./db.js";

export interface RealDeployment {
  id: string;
  name: string;
  projectId?: string;
  studioName?: string;
  subdomain: string;
  port: number;
  techStack: string;
  status: string;
  cpu: number;
  memory: number;
  visitors: number;
  githubUrl: string;
  url?: string;
  publicUrl?: string;
  html?: string;
  css?: string;
  js?: string;
}

export const REGISTRY_FILE = path.join(HOSTED_DIR, "registry.json");

export function getRegistry(): RealDeployment[] {
  const defaults: RealDeployment[] = [];

  let current = safeReadJson(REGISTRY_FILE, defaults);
  if (!Array.isArray(current)) {
    current = [];
  }

  let hasChanges = false;

  // Automatically scan HOSTED_DIR for any subdirectories (newly published AI Master Studio apps)
  try {
    if (fs.existsSync(HOSTED_DIR)) {
      const entries = fs.readdirSync(HOSTED_DIR);
      entries.forEach(sub => {
        if (sub === "backups" || sub.startsWith(".")) return;
        const subPath = path.join(HOSTED_DIR, sub);
        if (fs.statSync(subPath).isDirectory()) {
          const exists = current.some((d: RealDeployment) => 
            d.subdomain?.toLowerCase() === sub.toLowerCase() || 
            d.id === sub || 
            d.id?.toLowerCase() === `dep-${sub}`.toLowerCase() ||
            d.projectId?.toLowerCase() === sub.toLowerCase() ||
            d.projectId?.toLowerCase() === `proj-${sub}`.toLowerCase()
          );
          if (!exists) {
            const formattedName = sub.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
            const canonicalUrl = `https://phrscrowd.online/${sub}`;
            current.push({
              id: `dep-${sub}`,
              name: formattedName,
              projectId: `proj-${sub}`,
              studioName: "AI Master Studio",
              subdomain: sub,
              port: 3000 + current.length + 1,
              techStack: "React / Vite (AI Master Studio)",
              status: "ONLINE",
              cpu: 0.15,
              memory: 28,
              visitors: Math.floor(Math.random() * 20) + 5,
              githubUrl: "AI Master Studio Published",
              url: canonicalUrl,
              publicUrl: canonicalUrl
            });
            hasChanges = true;
          }
        }
      });
    }
  } catch (e) {
    console.error("Error scanning HOSTED_DIR in registry:", e);
  }

  // Synchronize SDK registered projects from projects.json into deployments registry
  try {
    const projectsFile = path.join(HOSTED_DIR, "projects.json");
    if (fs.existsSync(projectsFile)) {
      const projs = safeReadJson(projectsFile, []);
      if (Array.isArray(projs)) {
        projs.forEach((p: any) => {
          // Check if already represented in the registry
          const exists = current.some((d: RealDeployment) => 
            d.id === p.id || 
            d.id === `dep-${p.id}` || 
            d.projectId === p.id ||
            d.subdomain?.toLowerCase() === p.name?.toLowerCase().replace(/\s+/g, "-")
          );
          
          if (!exists) {
            current.push({
              id: p.id.startsWith("dep-") ? p.id : `dep-${p.id}`,
              name: p.name,
              projectId: p.id,
              studioName: p.id === 'phrs-master-cloud' ? "PHRS Master" : "PHRS SDK Integrated",
              subdomain: p.subdomain || p.name?.toLowerCase().replace(/\s+/g, "-") || "sdk-app",
              port: p.port || 3000,
              techStack: p.techStack || "PHRS SDK Project",
              status: p.status === "active" ? "ONLINE" : "OFFLINE",
              cpu: 0.12,
              memory: 18,
              visitors: p.api_hits || 0,
              githubUrl: p.githubUrl || "Integrated via SDK",
              url: p.url,
              publicUrl: p.url
            });
            hasChanges = true;
          }
        });
      }
    }
  } catch (e) {
    console.error("Error synchronizing SDK projects in registry:", e);
  }

  if (hasChanges) {
    saveRegistry(current);
  }
  return current;
}

export function saveRegistry(registry: RealDeployment[]) {
  try {
    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save registry:", e);
  }
}
