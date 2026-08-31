const fs = require('fs');
let content = fs.readFileSync('src/components/tabs/ConsoleTab.tsx', 'utf8');

// Replace ${remoteNodeIp} with 104.21.42.180 in the code blocks
content = content.replace(/\$\{remoteNodeIp\}/g, '104.21.42.180');
content = content.replace(/\$\{deviceSerial\}/g, '10BF4C1HQ2000R1');

fs.writeFileSync('src/components/tabs/ConsoleTab.tsx', content);
