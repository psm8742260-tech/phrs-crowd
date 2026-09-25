import fs from "fs";
import path from "path";
import express from "express";

const SA_FILE = path.join(process.cwd(), "dist", "iam_sa.json");
if (!fs.existsSync(SA_FILE)) {
  fs.writeFileSync(SA_FILE, JSON.stringify([], null, 2));
}

const GROUPS_FILE = path.join(process.cwd(), "dist", "iam_groups.json");
if (!fs.existsSync(GROUPS_FILE)) {
  fs.writeFileSync(GROUPS_FILE, JSON.stringify([
    { id: 1, name: "phrs-developers", description: "Direct developer access to VPS orchestration", membersCount: 3, created: "2026-08-01" },
    { id: 2, name: "phrs-admins", description: "Full root admin and credential access", membersCount: 1, created: "2026-08-10" }
  ], null, 2));
}

const ROLES_FILE = path.join(process.cwd(), "dist", "iam_roles_custom.json");
if (!fs.existsSync(ROLES_FILE)) {
  fs.writeFileSync(ROLES_FILE, JSON.stringify([
    { id: 1, name: "phrs.vpsManager", title: "VPS Administrator", permissions: "compute.instances.start, compute.instances.stop, compute.instances.reset", stage: "GA" },
    { id: 2, name: "phrs.smsOperator", title: "SMS Service Operator", permissions: "sms.send, sms.template.update, sms.credits.read", stage: "GA" }
  ], null, 2));
}

const PAM_FILE = path.join(process.cwd(), "dist", "iam_pam.json");
if (!fs.existsSync(PAM_FILE)) {
  fs.writeFileSync(PAM_FILE, JSON.stringify([
    { id: 1, email: "developer@phrscrowd.local", role: "Owner", duration: "2 Hours", reason: "Database migration work", status: "Active", requestedAt: new Date().toISOString() }
  ], null, 2));
}

const FEDERATIONS_FILE = path.join(process.cwd(), "dist", "iam_federations.json");
if (!fs.existsSync(FEDERATIONS_FILE)) {
  fs.writeFileSync(FEDERATIONS_FILE, JSON.stringify([
    { id: 1, name: "aws-workload-federation", providerType: "OIDC", issuerUrl: "https://oidc.eks.us-east-1.amazonaws.com/id/EXAMPLED539D", audience: "phrs-prod-client", status: "Active" },
    { id: 2, name: "azure-ad-workforce", providerType: "SAML 2.0", issuerUrl: "https://sts.windows.net/37b9853c-1481-4200/", audience: "urn:phrs:azure:ad", status: "Active" }
  ], null, 2));
}

// Reuse safeReadJson from server.ts - temporarily keeping it here if not easily movable without breaking
function safeReadJson(filePath: string, defaultValue: any) {
    try {
        if (!fs.existsSync(filePath)) return defaultValue;
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (e) {
        console.error(`Error reading ${filePath}:`, e);
        return defaultValue;
    }
}

export const iamRouter = express.Router();

// Service Accounts
iamRouter.post("/service-accounts", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });
  try {
    const accounts = safeReadJson(SA_FILE, []);
    const email = `${name.toLowerCase()}@phrs-crowd.iam.gserviceaccount.com`;
    accounts.push({ id: Date.now(), name, email, created: new Date().toISOString().split('T')[0] });
    fs.writeFileSync(SA_FILE, JSON.stringify(accounts, null, 2));
    res.json({ success: true, accounts });
  } catch(e) { res.status(500).json({ error: "Storage error" }); }
});

iamRouter.delete("/service-accounts/:id", (req, res) => {
  try {
    let accounts = safeReadJson(SA_FILE, []);
    accounts = accounts.filter((a: any) => String(a.id) !== String(req.params.id));
    fs.writeFileSync(SA_FILE, JSON.stringify(accounts, null, 2));
    res.json({ success: true, accounts });
  } catch(e) { res.status(500).json({ error: "Storage error" }); }
});

iamRouter.get("/service-accounts/:name/key", (req, res) => {
  const { name } = req.params;
  const mockKey = {
    type: "service_account",
    project_id: "phrs-crowd-prod",
    private_key_id: Math.random().toString(16).substring(2, 10) + Date.now().toString(16),
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDh4K...=== \n-----END PRIVATE KEY-----",
    client_email: `${name}@phrs-crowd.iam.gserviceaccount.com`,
    client_id: Math.floor(Math.random() * 1000000000000000).toString(),
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/metadata/x509/${name}%40phrs-crowd.iam.gserviceaccount.com`
  };
  res.setHeader('Content-disposition', `attachment; filename=${name}-key.json`);
  res.setHeader('Content-type', 'application/json');
  res.write(JSON.stringify(mockKey, null, 2));
  res.end();
});

// Groups
iamRouter.get("/groups", (req, res) => {
  try {
    res.json({ success: true, groups: safeReadJson(GROUPS_FILE, []) });
  } catch(e) { res.status(500).json({ error: "Storage error" }); }
});

iamRouter.post("/groups", (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: "Group name is required" });
  try {
    const groups = safeReadJson(GROUPS_FILE, []);
    groups.push({ id: Date.now(), name, description: description || "No description provided", membersCount: 0, created: new Date().toISOString().split('T')[0] });
    fs.writeFileSync(GROUPS_FILE, JSON.stringify(groups, null, 2));
    res.json({ success: true, groups });
  } catch(e) { res.status(500).json({ error: "Storage error" }); }
});

iamRouter.delete("/groups/:id", (req, res) => {
  try {
    let groups = safeReadJson(GROUPS_FILE, []);
    groups = groups.filter((g: any) => String(g.id) !== String(req.params.id));
    fs.writeFileSync(GROUPS_FILE, JSON.stringify(groups, null, 2));
    res.json({ success: true, groups });
  } catch(e) { res.status(500).json({ error: "Storage error" }); }
});

// Roles
iamRouter.get("/roles", (req, res) => {
  try {
    res.json({ success: true, roles: safeReadJson(ROLES_FILE, []) });
  } catch(e) { res.status(500).json({ error: "Storage error" }); }
});

iamRouter.post("/roles", (req, res) => {
  const { name, title, permissions } = req.body;
  if (!name || !title) return res.status(400).json({ error: "Role name and title are required" });
  try {
    const roles = safeReadJson(ROLES_FILE, []);
    roles.push({ id: Date.now(), name, title, permissions: permissions || "None", stage: "Beta" });
    fs.writeFileSync(ROLES_FILE, JSON.stringify(roles, null, 2));
    res.json({ success: true, roles });
  } catch(e) { res.status(500).json({ error: "Storage error" }); }
});

iamRouter.delete("/roles/:id", (req, res) => {
  try {
    let roles = safeReadJson(ROLES_FILE, []);
    roles = roles.filter((r: any) => String(r.id) !== String(req.params.id));
    fs.writeFileSync(ROLES_FILE, JSON.stringify(roles, null, 2));
    res.json({ success: true, roles });
  } catch(e) { res.status(500).json({ error: "Storage error" }); }
});

// PAM
iamRouter.get("/pam", (req, res) => {
  try {
    res.json({ success: true, requests: safeReadJson(PAM_FILE, []) });
  } catch(e) { res.status(500).json({ error: "Storage error" }); }
});

iamRouter.post("/pam", (req, res) => {
  const { email, role, duration, reason } = req.body;
  if (!email || !role || !duration) return res.status(400).json({ error: "Email, role, and duration required" });
  try {
    const requests = safeReadJson(PAM_FILE, []);
    requests.push({ id: Date.now(), email, role, duration, reason: reason || "Urgent access needed", status: "Active", requestedAt: new Date().toISOString() });
    fs.writeFileSync(PAM_FILE, JSON.stringify(requests, null, 2));
    res.json({ success: true, requests });
  } catch(e) { res.status(500).json({ error: "Storage error" }); }
});

iamRouter.delete("/pam/:id", (req, res) => {
  try {
    let requests = safeReadJson(PAM_FILE, []);
    requests = requests.filter((r: any) => String(r.id) !== String(req.params.id));
    fs.writeFileSync(PAM_FILE, JSON.stringify(requests, null, 2));
    res.json({ success: true, requests });
  } catch(e) { res.status(500).json({ error: "Storage error" }); }
});

// Federations
iamRouter.get("/federations", (req, res) => {
  try {
    res.json({ success: true, federations: safeReadJson(FEDERATIONS_FILE, []) });
  } catch(e) { res.status(500).json({ error: "Storage error" }); }
});

iamRouter.post("/federations", (req, res) => {
  const { name, providerType, issuerUrl, audience } = req.body;
  if (!name || !providerType || !issuerUrl) return res.status(400).json({ error: "Name, providerType, and issuerUrl required" });
  try {
    const federations = safeReadJson(FEDERATIONS_FILE, []);
    federations.push({ id: Date.now(), name, providerType, issuerUrl, audience: audience || "phrs-audience", status: "Active" });
    fs.writeFileSync(FEDERATIONS_FILE, JSON.stringify(federations, null, 2));
    res.json({ success: true, federations });
  } catch(e) { res.status(500).json({ error: "Storage error" }); }
});

iamRouter.delete("/federations/:id", (req, res) => {
  try {
    let federations = safeReadJson(FEDERATIONS_FILE, []);
    federations = federations.filter((f: any) => String(f.id) !== String(req.params.id));
    fs.writeFileSync(FEDERATIONS_FILE, JSON.stringify(federations, null, 2));
    res.json({ success: true, federations });
  } catch(e) { res.status(500).json({ error: "Storage error" }); }
});
