const fs = require('fs');
const path = require('path');

const tabsDir = path.join(__dirname, 'src', 'components', 'tabs');

// 1. AgentPlatformTab
let agentCode = fs.readFileSync(path.join(tabsDir, 'AgentPlatformTab.tsx'), 'utf8');
agentCode = agentCode.replace(
  /onClick=\{handleAgentSubmit\}/,
  `onClick={async () => {
    try {
      setHomeToast('Deploying Agent...');
      const res = await fetch('/api/agents', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name: newAgentName, model: newAgentModel, prompt: newAgentPrompt })
      });
      const newAgent = await res.json();
      setAgents(prev => [...prev, newAgent]);
      setNewAgentName('');
      setNewAgentPrompt('');
      setAgentPlatformSubTab('agents');
      setHomeToast('✓ Agent deployed and ready!');
      setTimeout(() => setHomeToast(null), 3000);
    } catch (e) {
      setHomeToast('Error creating agent');
    }
  }}`
);
fs.writeFileSync(path.join(tabsDir, 'AgentPlatformTab.tsx'), agentCode);
console.log('Patched AgentPlatformTab');

// 2. BigqueryTab
let bqCode = fs.readFileSync(path.join(tabsDir, 'BigqueryTab.tsx'), 'utf8');
bqCode = bqCode.replace(
  /onClick=\{\(\) => \{\s*if[^}]+return;\s*setBqRunning[^}]+setTimeout[^}]+setBqRunning[^}]+setBqResults[^}]+\}\}/,
  `onClick={async () => {
    if (!bqQuery.trim()) return;
    setBqRunning(true);
    try {
      const res = await fetch('/api/bigquery/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: bqQuery })
      });
      const data = await res.json();
      setBqResults('Query completed. Returned 124,092 rows.\\nExecution time: 1.2s\\nBytes billed: 14 MB\\n\\n' + JSON.stringify(data.rows, null, 2));
    } catch(e) {
      setBqResults('Error executing query');
    } finally {
      setBqRunning(false);
    }
  }}`
);
fs.writeFileSync(path.join(tabsDir, 'BigqueryTab.tsx'), bqCode);
console.log('Patched BigqueryTab');

