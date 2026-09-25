import fs from "fs";
import path from "path";
import { HOSTED_DIR } from "./storage.js";
import { safeReadJson } from "./storage.js";

const DB_FILE = path.join(HOSTED_DIR, "phrscrowd.db.json");

export interface DbTable {
  name: string;
  columns: string; // comma-separated
  rows: any[];
}

export function getDatabase(): DbTable[] {
  const defaults: DbTable[] = [
    {
      name: "users",
      columns: "id, name, role, verified, phone",
      rows: [
        { id: "1", name: "Ramesh Kumar", role: "Administrator", verified: "Yes", phone: "+919876543210" },
        { id: "2", name: "Suresh Babu", role: "Operator", verified: "Yes", phone: "+919876543211" }
      ]
    },
    {
      name: "deployments",
      columns: "id, name, subdomain, port, techStack, status",
      rows: []
    }
  ];

  const current = safeReadJson(DB_FILE, defaults);
  let updated = false;

  current.forEach(table => {
    if (table.name === "deployments") {
      // Synchronize SDK registered projects from projects.json into deployments table
      try {
        const projectsFile = path.join(HOSTED_DIR, "projects.json");
        if (fs.existsSync(projectsFile)) {
          const projs = safeReadJson(projectsFile, []);
          if (Array.isArray(projs)) {
            projs.forEach((p: any) => {
              const exists = table.rows.some((r: any) => r.id === p.id || r.id === `dep-${p.id}` || r.projectId === p.id);
              if (!exists) {
                table.rows.push({
                  id: p.id.startsWith("dep-") ? p.id : `dep-${p.id}`,
                  name: p.name,
                  projectId: p.id,
                  subdomain: p.subdomain || p.name?.toLowerCase().replace(/\s+/g, "-") || "sdk-app",
                  publicUrl: p.url,
                  port: p.port || 3000,
                  techStack: p.techStack || "PHRS SDK Project",
                  status: p.status === "active" ? "ONLINE" : "OFFLINE"
                });
                updated = true;
              }
            });
          }
        }
      } catch (e) {
        console.error("Error synchronizing SDK projects in database deployments:", e);
      }
    }
  });

  if (updated) {
    saveDatabase(current);
  }

  return current;
}

export function saveDatabase(db: DbTable[]) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save database:", e);
  }
}
