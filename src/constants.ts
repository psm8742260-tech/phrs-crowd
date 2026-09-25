import { Project, Deployment, SystemMetric } from './types';

export const defaultHostedHtml = `<!DOCTYPE html><html><head>  <meta charset="UTF-8">  <title>PHRS Smart Client App</title>  <style>    body {      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;      background: #f1f5f9;      color: #0f172a;      display: flex;      flex-direction: column;      align-items: center;      justify-content: center;      height: 100vh;      margin: 0;    }    .container {      background: white;      padding: 2.5rem;      border-radius: 1.5rem;      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);      text-align: center;      border: 1px solid #e2e8f0;      max-width: 400px;    }    .logo { font-weight: 800; font-size: 1.25rem; color: #4f46e5; margin-bottom: 1rem; }    h3 { margin: 0 0 0.75rem 0; font-size: 1.1rem; }    p { color: #64748b; font-size: 0.875rem; line-height: 1.6; margin-bottom: 1.5rem; }    .btn { background: #4f46e5; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }    .btn:hover { background: #4338ca; transform: translateY(-1px); }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">🧬 PHRS LIVE NODE</div>
    <h3>హోస్టింగ్ విజయవంతంగా పూర్తయింది!</h3>
    <p>ఈ అప్లికేషన్ మన స్వంత PHRS Crowd సర్వర్ కంటైనర్ లోపల నుండి <strong>లైవ్ గా రన్ అవుతోంది</strong>.</p>
    <button class="btn" onclick="triggerQuery()">Query Local PHRS DB</button>
  </div>
    <` + `script>
    function triggerQuery() {
      alert('PHRS API: Querying sqlite3 database table: deployments... Connected!');
    }
  <` + `/script>
</body>
</html>`;

export const getInitialProjects = (): Project[] => {
  const defaultMaster: Project = {
    id: 'phrs-master-cloud',
    name: 'PHRS Crowd',
    status: 'active',
    created_at: new Date().toISOString(),
    api_hits: 8742,
    project_number: '398230688462',
    url: 'https://phrscrowd.online'
  };
  const defaultOldMoney: Project = {
    id: '159a1f68-dbdb-45af-aa36-1f7019ccb5e3',
    name: 'Old Money Traders',
    status: 'active',
    created_at: new Date().toISOString(),
    api_hits: 2450,
    url: 'https://ais-dev-it3r6x7jg7pp4gq2c7gvfw-398230688462.asia-southeast1.run.app'
  };
  try {
    const saved = localStorage.getItem('phrs_projects');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const hasMaster = parsed.some(p => p.id === 'phrs-master-cloud');
        const hasOldMoney = parsed.some(p => p.id === '159a1f68-dbdb-45af-aa36-1f7019ccb5e3');
        let list = [...parsed];
        if (!hasMaster) {
          list = [defaultMaster, ...list];
        } else {
          list = list.map(p => (p.id === 'phrs-master-cloud' ? { ...p, name: 'PHRS Crowd', project_number: '398230688462' } : p));
        }
        if (!hasOldMoney) {
          list = [...list, defaultOldMoney];
        }
        return list;
      }
    }
  } catch (e) {
    console.error("Project recovery failed.");
  }
  return [defaultMaster, defaultOldMoney];
};

export const getInitialDeployments = (): Deployment[] => {
  const defaults: Deployment[] = [
    { id: "dep-1", name: "All-in-One Library (AIOL)", subdomain: "aiol", port: 3001, techStack: "React & Node", status: "ONLINE", cpu: 1.2, memory: 34, visitors: 142, githubUrl: "https://github.com/phrscrowd/aiol" },
    { id: "dep-2", name: "Civil Worker Book (CWRB)", subdomain: "cwrb", port: 3002, techStack: "Next.js & PostgreSQL", status: "ONLINE", cpu: 0.4, memory: 18, visitors: 89, githubUrl: "https://github.com/phrscrowd/cwrb" },
    { id: "dep-3", name: "AI Master Studio", subdomain: "aims", port: 3003, techStack: "React & Gemini AI", status: "ONLINE", cpu: 0.8, memory: 24, visitors: 57, githubUrl: "https://github.com/phrscrowd/aims" }
  ];
  try {
    const saved = localStorage.getItem('phrs_deployments');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const merged = [...parsed];
        defaults.forEach(def => {
          if (!merged.some(item => item.id === def.id || item.subdomain === def.subdomain)) {
            merged.push(def);
          }
        });
        return merged;
      }
    }
  } catch (e) {
    console.error("Deployment sync interrupted.");
  }
  return defaults;
};

export const getInitialDbData = () => {
  const newInitialData = {
    phrs_engine: {
      version: "v2.0 (Standalone Ubuntu)",
      modules_active: ["Smart_Search", "APK_Builder", "VPS_Terminal"],
      agent_status: "ONLINE",
      zero_bug_policy: "ENFORCED"
    },
    super_admin: {
      id: "sys_001",
      name: "PHRS Master",
      access: "UNLIMITED",
      last_login: new Date().toISOString()
    },
    cloud_nodes: {
      "node_ubuntu_main": { "ip": "192.168.1.15", "status": "active", "load": "12%" },
      "node_ai_studio": { "ip": "cloud_sandbox", "status": "standby", "load": "0%" }
    },
    security: {
      firewall: "STRICT",
      last_audit: new Date().toISOString()
    }
  };
  try {
    const saved = localStorage.getItem('phrs_db_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.phrs_engine) {
        return parsed;
      }
    }
  } catch (e) {}
  return newInitialData;
};
