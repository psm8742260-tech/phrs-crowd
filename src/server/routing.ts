import fs from "fs";
import path from "path";
import express from "express";
import http from "http";
import https from "https";
import { HOSTED_DIR } from "./storage.js";
import { safeReadJson } from "./storage.js";

const DOMAIN_MAPPINGS_FILE = path.join(process.cwd(), "dist", "domainMappings.json");

export function getDomainMappings(): Record<string, string> {
  return safeReadJson(DOMAIN_MAPPINGS_FILE, {});
}

export function saveDomainMappings(mappings: Record<string, string>) {
  try {
    if (!fs.existsSync(path.dirname(DOMAIN_MAPPINGS_FILE))) {
      fs.mkdirSync(path.dirname(DOMAIN_MAPPINGS_FILE), { recursive: true });
    }
    fs.writeFileSync(DOMAIN_MAPPINGS_FILE, JSON.stringify(mappings, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save domain mappings:", e);
  }
}

export function proxyRequest(targetUrl: string, req: any, res: any) {
  try {
    const url = new URL(targetUrl);
    const protocol = url.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method: req.method,
      headers: {
        ...req.headers,
        host: url.hostname,
      }
    };

    const proxyReq = protocol.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      console.error(`[PROXY ERROR] ${targetUrl}:`, err.message);
      res.status(502).send(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #ef4444;">502 Bad Gateway</h1>
          <p>PHRS Router could not reach the project target: <b>${url.hostname}</b></p>
        </div>
      `);
    });

    req.pipe(proxyReq, { end: true });
  } catch (err: any) {
    console.error("[PROXY INIT ERROR]:", err.message);
    res.status(500).send("Internal Routing Error");
  }
}

export let currentDomainMappings = getDomainMappings();

export const routingRouter = express.Router();

routingRouter.use((req, res, next) => {
  const forwardedHost = req.headers['x-forwarded-host'] as string;
  const rawHost = forwardedHost || req.headers.host || req.hostname;
  const host = rawHost.split(':')[0].toLowerCase();
  
  let targetProject = currentDomainMappings[host];
  
  if (!targetProject && host.startsWith("www.")) {
    const baseHost = host.slice(4);
    targetProject = currentDomainMappings[baseHost];
  }
  
  if (!targetProject && host.endsWith(".phrscrowd.online")) {
    targetProject = host.replace(".phrscrowd.online", "");
  }
  
  if (targetProject) {
    console.log(`[ROUTER] Direct Custom/Sub Domain Serving: Mapped ${host} -> /hosted/${targetProject}`);
    const projectDir = path.join(HOSTED_DIR, targetProject);
    
    if (!fs.existsSync(projectDir)) {
      console.log(`[ROUTER] Target project not found on disk: ${targetProject}`);
      return res.status(404).send(`<h2>Project Not Found</h2><p>The application <b>${targetProject}</b> is not deployed on this server.</p>`);
    }
    
    return express.static(projectDir)(req, res, (err) => {
      if (err) return next(err);
      
      const indexFile = path.join(projectDir, "index.html");
      if (fs.existsSync(indexFile)) {
        return res.sendFile(indexFile);
      }
      next();
    });
  }
  
  next();
});

routingRouter.get("/domain-mappings", (req, res) => res.json(currentDomainMappings));

routingRouter.post("/domain-mappings", (req, res) => {
  const { domain, project } = req.body;
  if (!domain || !project) return res.status(400).json({ error: "Domain and project are required." });
  
  let cleanDomain = domain.trim().toLowerCase();
  cleanDomain = cleanDomain.replace(/^(https?:\/\/)?(www\.)?/, "");
  cleanDomain = cleanDomain.split("/")[0].split(":")[0];
  
  currentDomainMappings[cleanDomain] = project.trim().toLowerCase();
  saveDomainMappings(currentDomainMappings);
  res.json({ success: true, mappings: currentDomainMappings });
});

routingRouter.delete("/domain-mappings/:domain", (req, res) => {
  let cleanDomain = req.params.domain.trim().toLowerCase();
  cleanDomain = cleanDomain.replace(/^(https?:\/\/)?(www\.)?/, "");
  cleanDomain = cleanDomain.split("/")[0].split(":")[0];
  
  if (currentDomainMappings[cleanDomain]) {
    delete currentDomainMappings[cleanDomain];
    saveDomainMappings(currentDomainMappings);
  }
  res.json({ success: true, mappings: currentDomainMappings });
});
