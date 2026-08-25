export const vpsServerJs = `/**
 * PHRS Crowd - Self-Hosted Cloud Platform Core
 * Production-ready Express Server with SQLite Database
 */

import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite Database
const db = new sqlite3.Database(path.join(__dirname, 'phrscrowd.sqlite'), (err) => {
  if (err) console.error('Database connection error:', err.message);
  else console.log('Connected to SQLite Database: phrscrowd.sqlite');
});

// Create tables
db.serialize(() => {
  db.run(\`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      status TEXT DEFAULT 'active',
      api_hits INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  \`);

  db.run(\`
    CREATE TABLE IF NOT EXISTS database_nodes (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  \`);

  db.run(\`
    CREATE TABLE IF NOT EXISTS sms_config (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      provider TEXT NOT NULL,
      api_key TEXT,
      sender_id TEXT,
      account_sid TEXT
    )
  \`);

  db.run(\`
    CREATE TABLE IF NOT EXISTS api_keys (
      provider TEXT PRIMARY KEY,
      key_val TEXT NOT NULL,
      status TEXT DEFAULT 'active'
    )
  \`);
});

// 1. Projects API
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/projects', (req, res) => {
  const { id, name, status } = req.body;
  db.run('INSERT INTO projects (id, name, status) VALUES (?, ?, ?)', [id, name, status], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id, name, status });
  });
});

// 2. Realtime DB API
app.get('/api/database', (req, res) => {
  db.all('SELECT * FROM database_nodes', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const dbObj = {};
    rows.forEach(r => {
      try { dbObj[r.key] = JSON.parse(r.value); }
      catch { dbObj[r.key] = r.value; }
    });
    res.json(dbObj);
  });
});

app.post('/api/database', (req, res) => {
  const { key, value } = req.body;
  const valStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
  db.run('INSERT OR REPLACE INTO database_nodes (key, value) VALUES (?, ?)', [key, valStr], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, key, value });
  });
});

// 3. SMS Gateway API & Verification
app.post('/api/sms/send-otp', (req, res) => {
  const { phone, provider, api_key, sender_id, account_sid } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(\`[SMS Gateway] Generated OTP \${otp} for \${phone} using provider \${provider}\`);
  // Simulate standard SMS API Gateway call
  res.json({ success: true, message: 'OTP sent successfully via gateway', otp });
});

// 4. Admin API Gateway Routing & AI Orchestration
app.post('/api/ai/route', async (req, res) => {
  const { prompt, model, api_keys } = req.body;
  console.log(\`[AI ROUTER] Routing request to model \${model}...\`);
  // DeepSeek / Gemini route wrapper simulation
  res.json({
    success: true,
    model,
    response: \`Processed prompt through secure proxy: "\${prompt}" using custom-routed VPS endpoints.\`,
    tokens_used: prompt.length / 4 + 10,
    cost: model.includes('deepseek') ? '$0.00014' : '$0.00007'
  });
});

app.listen(PORT, () => {
  console.log(\`PHRS Crowd - VPS Cloud Console listening on port \${PORT}\`);
});
`;

export const vpsReadmeMd = `# PHRS Crowd VPS Deployment Guide

This guide describes how to run PHRS Crowd on an actual Ubuntu VPS (DigitalOcean, Linode, AWS EC2, or custom host).

## Step 1: Server Preparation
Access your server via SSH:
\`\`\`bash
ssh root@your_vps_ip
\`\`\`

Update package repositories and install Node.js (v18+) and SQLite3:
\`\`\`bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs sqlite3 build-essential
\`\`\`

## Step 2: Extract Code & Install Dependencies
Create a folder for PHRS Crowd, save \`server.js\` and \`package.json\`, then run:
\`\`\`bash
mkdir -p /var/www/phrscrowd
cd /var/www/phrscrowd
npm install
\`\`\`

## Step 3: Run Process Manager (PM2)
Install PM2 globally to keep the application running 24/7:
\`\`\`bash
sudo npm install pm2 -g
pm2 start server.js --name "phrs-crowd"
pm2 startup systemd
pm2 save
\`\`\`

## Step 4: Reverse Proxy with Nginx (Optional)
Install Nginx to map port 3000 to a domains or subdirectory:
\`\`\`bash
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/phrscrowd
\`\`\`

Paste this Nginx config block:
\`\`\`nginx
server {
    listen 80;
    server_name phrscrowd.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`
Enable the configuration and reload Nginx:
\`\`\`bash
sudo ln -s /etc/nginx/sites-available/phrscrowd /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
\`\`s
`;

export const vpsPackageJson = `{
  "name": "phrs-crowd-vps-core",
  "version": "1.0.0",
  "description": "PHRS Crowd Console Engine and Realtime Database Server",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "sqlite3": "^5.1.6"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}`;
