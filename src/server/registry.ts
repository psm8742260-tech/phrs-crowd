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

export const DEFAULT_SDK_DEPLOYMENTS: RealDeployment[] = [
  {
    id: "dep-old-money",
    name: "Old Money Traders",
    projectId: "159a1f68-dbdb-45af-aa36-1f7019ccb5e3",
    studioName: "PHRS SDK Integrated",
    subdomain: "old-money-traders",
    port: 3000,
    techStack: "PHRS SDK Project",
    status: "ONLINE",
    cpu: 0.12,
    memory: 18,
    visitors: 2450,
    githubUrl: "Integrated via SDK",
    url: "https://ais-dev-it3r6x7jg7pp4gq2c7gvfw-398230688462.asia-southeast1.run.app",
    publicUrl: "https://ais-dev-it3r6x7jg7pp4gq2c7gvfw-398230688462.asia-southeast1.run.app"
  },
  {
    id: "dep-aiol",
    name: "All-in-One Library (AIOL)",
    projectId: "proj-aiol",
    studioName: "PHRS SDK Integrated",
    subdomain: "aiol",
    port: 3001,
    techStack: "PHRS SDK Project",
    status: "ONLINE",
    cpu: 1.2,
    memory: 34,
    visitors: 142,
    githubUrl: "Integrated via SDK",
    url: "https://phrscrowd.online/aiol",
    publicUrl: "https://phrscrowd.online/aiol"
  },
  {
    id: "dep-cwrb",
    name: "Civil Worker Book (CWRB)",
    projectId: "proj-cwrb",
    studioName: "PHRS SDK Integrated",
    subdomain: "cwrb",
    port: 3002,
    techStack: "PHRS SDK Project",
    status: "ONLINE",
    cpu: 0.4,
    memory: 18,
    visitors: 89,
    githubUrl: "Integrated via SDK",
    url: "https://phrscrowd.online/cwrb",
    publicUrl: "https://phrscrowd.online/cwrb"
  },
  {
    id: "dep-aims",
    name: "AI Master Studio",
    projectId: "proj-aims",
    studioName: "AI Master Studio",
    subdomain: "aims",
    port: 3003,
    techStack: "PHRS SDK Project",
    status: "ONLINE",
    cpu: 0.8,
    memory: 24,
    visitors: 57,
    githubUrl: "Integrated via SDK",
    url: "https://phrscrowd.online/aims",
    publicUrl: "https://phrscrowd.online/aims"
  }
];

export function getRegistry(): RealDeployment[] {
  let current: RealDeployment[] = safeReadJson(REGISTRY_FILE, DEFAULT_SDK_DEPLOYMENTS);
  if (!Array.isArray(current) || current.length === 0) {
    current = [...DEFAULT_SDK_DEPLOYMENTS];
  }

  // Ensure PHRS Crowd (the host server itself) and internal dashboard are excluded from deployed services
  current = current.filter(d => 
    d.id !== 'phrs-master-cloud' && 
    d.name !== 'PHRS Crowd' && 
    d.id !== 'dep-phrs-master-cloud' &&
    d.subdomain !== 'dashboard' &&
    d.id !== 'dep-dashboard'
  );

  let hasChanges = false;

  // Make sure each of the 4 default SDK deployments exists
  DEFAULT_SDK_DEPLOYMENTS.forEach(def => {
    const exists = current.some(d => d.id === def.id || d.name === def.name || d.subdomain === def.subdomain);
    if (!exists) {
      current.push({ ...def });
      hasChanges = true;
    }
  });

  // Automatically scan HOSTED_DIR for any newly published AI Master Studio apps
  try {
    if (fs.existsSync(HOSTED_DIR)) {
      const entries = fs.readdirSync(HOSTED_DIR);
      entries.forEach(sub => {
        if (sub === "backups" || sub === "dashboard" || sub.startsWith(".")) return;
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
              githubUrl: "Integrated via SDK",
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

  // Synchronize any external SDK registered projects from projects.json
  try {
    const projectsFile = path.join(HOSTED_DIR, "projects.json");
    if (fs.existsSync(projectsFile)) {
      const projs = safeReadJson(projectsFile, []);
      if (Array.isArray(projs)) {
        projs.forEach((p: any) => {
          if (!p.name || p.name === 'PHRS Crowd' || p.id === 'phrs-master-cloud') return;
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
              studioName: "PHRS SDK Integrated",
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
