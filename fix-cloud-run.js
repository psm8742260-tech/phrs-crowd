const fs = require('fs');
let content = fs.readFileSync('src/components/tabs/CloudRunTab.tsx', 'utf8');

content = content.replace('FLEET: {projects.length + orchestratorNodes.length} SERVICES ONLINE', 'FLEET: {deployments.length > 0 ? deployments.length : projects.length + orchestratorNodes.length} SERVICES ONLINE');

content = content.replace('{[...orchestratorNodes, ...projects].map((project: any, idx: number) => (', '{[...deployments, ...orchestratorNodes, ...projects.filter(p => !deployments.find(d => d.name === p.name))].map((project: any, idx: number) => (');

fs.writeFileSync('src/components/tabs/CloudRunTab.tsx', content);
