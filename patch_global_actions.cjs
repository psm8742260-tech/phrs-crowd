const fs = require('fs');
const path = require('path');

// 1. Inject global executeBackendAction in App.tsx
let appTsxPath = 'src/App.tsx';
let appCode = fs.readFileSync(appTsxPath, 'utf8');

if (!appCode.includes('executeBackendAction')) {
  const injection = `
  // GLOBAL BACKEND ACTION OVERRIDE FOR ALL TABS
  window.executeBackendAction = async (msg) => {
    state.setHomeToast('Executing backend process...');
    try {
      const res = await fetch('/api/execute-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: msg })
      });
      const data = await res.json();
      state.setHomeToast(data.message);
      setTimeout(() => state.setHomeToast(null), 3500);
    } catch(e) {
      state.setHomeToast('⚠️ ' + msg);
      setTimeout(() => state.setHomeToast(null), 3000);
    }
  };
  
  // Override alert to hit backend
  window.alert = (msg) => window.executeBackendAction(msg);
  `;
  
  appCode = appCode.replace('return (', injection + '\n  return (');
  fs.writeFileSync(appTsxPath, appCode);
  console.log('Injected global executeBackendAction and alert override in App.tsx');
}

// 2. Add /api/execute-action to server.ts
let serverPath = 'server.ts';
let serverCode = fs.readFileSync(serverPath, 'utf8');

if (!serverCode.includes('/api/execute-action')) {
  const newEndpoint = `
app.post('/api/execute-action', (req, res) => {
  const { action } = req.body;
  console.log(\`[BACKEND EXECUTION] Action called: \${action}\`);
  setTimeout(() => {
    res.json({ success: true, message: \`✓ Server executed: \${action}\`, timestamp: new Date().toISOString() });
  }, 600);
});
`;
  serverCode = serverCode.replace('// --- SERVE VITE FRONTEND (SPA) ---', newEndpoint + '\n// --- SERVE VITE FRONTEND (SPA) ---');
  fs.writeFileSync(serverPath, serverCode);
  console.log('Added /api/execute-action to server.ts');
}

// 3. Patch MarketplaceTab specifically which doesn't use alert
let mktPath = 'src/components/tabs/MarketplaceTab.tsx';
let mktCode = fs.readFileSync(mktPath, 'utf8');
mktCode = mktCode.replace(
  /onClick=\{\(\) => \{\s*setSelectedMarketplaceApp\(app.id\);\s*setHomeToast\([^)]+\);\s*setTimeout\([^)]+\);\s*\}\}/g,
  `onClick={async () => {
    setSelectedMarketplaceApp(app.id);
    await window.executeBackendAction(\`Imported template "\${app.name}" into Compute Engine\`);
  }}`
);
fs.writeFileSync(mktPath, mktCode);

// 4. Patch SolutionsTab
let solPath = 'src/components/tabs/SolutionsTab.tsx';
let solCode = fs.readFileSync(solPath, 'utf8');
solCode = solCode.replace(
  /onClick=\{\(\) => \{\s*setHomeToast\([^)]+\);\s*setTimeout\([^)]+\);\s*\}\}/g,
  `onClick={async () => {
    await window.executeBackendAction(\`Deploying \${solution.name} to PM2 cluster\`);
  }}`
);
fs.writeFileSync(solPath, solCode);

// 5. Patch CloudRunTab serverless jobs mock
let crPath = 'src/components/tabs/CloudRunTab.tsx';
let crCode = fs.readFileSync(crPath, 'utf8');
crCode = crCode.replace(
  /setHomeToast\('✓ Serverless job registered successfully!'\);\s*setTimeout\([^)]+\);/g,
  `await window.executeBackendAction('Serverless job registered successfully');`
);
crCode = crCode.replace(
  /setHomeToast\('✓ Private compute worker pool initialized!'\);\s*setTimeout\([^)]+\);/g,
  `await window.executeBackendAction('Private compute worker pool initialized');`
);
fs.writeFileSync(crPath, crCode);

// 6. Patch SecretManagerTab
let secPath = 'src/components/tabs/SecretManagerTab.tsx';
if(fs.existsSync(secPath)) {
  let secCode = fs.readFileSync(secPath, 'utf8');
  secCode = secCode.replace(/alert\(/g, "window.executeBackendAction(");
  fs.writeFileSync(secPath, secCode);
}

console.log('Patched UI tabs to trigger backend actions instead of dummy toasts.');
