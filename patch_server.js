const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const newRoutes = `
// ---------------------------------------------------------
// EXTENDED REAL-TIME MOCK APIs FOR DASHBOARD TABS
// ---------------------------------------------------------

app.post('/api/k8s/pods', (req, res) => {
  const newPodId = Math.floor(100 + Math.random() * 900);
  res.json({ name: \`phrs-api-replica-\${newPodId}\`, status: 'Running', cpu: 0.8, ram: 110 });
});

app.post('/api/agents', (req, res) => {
  const { name, model, prompt } = req.body;
  res.json({ id: 'agent-' + Date.now(), name: name || 'New Agent', model: model || 'Gemini 1.5 Flash', systemPrompt: prompt || '', created: new Date().toISOString().split('T')[0] });
});

app.post('/api/credentials', (req, res) => {
  const { name } = req.body;
  res.json({ name: name || 'New API Key', key: 'AIzaSy' + Math.random().toString(36).substring(2, 15), created: new Date().toISOString().split('T')[0], status: 'Active' });
});

app.post('/api/bigquery/run', (req, res) => {
  const { query } = req.body;
  setTimeout(() => {
    res.json({ success: true, rows: [{ id: 1, result: 'Query executed successfully', timestamp: new Date().toISOString() }] });
  }, 1000);
});

app.post('/api/billing/budget', (req, res) => {
  res.json({ success: true, message: 'Budget updated successfully' });
});

app.post('/api/sms/send', (req, res) => {
  setTimeout(() => {
    res.json({ success: true, message: 'SMS Sent successfully to gateway' });
  }, 800);
});
`;

code = code.replace('// --- SERVE VITE FRONTEND (SPA) ---', newRoutes + '\n// --- SERVE VITE FRONTEND (SPA) ---');
fs.writeFileSync('server.ts', code);
console.log('Patched server.ts successfully');
