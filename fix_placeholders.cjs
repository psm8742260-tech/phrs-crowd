const fs = require('fs');
let code = fs.readFileSync('src/components/tabs/ConsoleTab.tsx', 'utf8');

code = code.replace(/pk_live_phrscrowd_\*\*\*\*\*\*\*\*\*\*/g, '<YOUR_PROJECT_KEY>');
code = code.replace(/\+91\*\*\*\*\*\*\*\*\*\*/g, '<TARGET_MOBILE_NUMBER>');

fs.writeFileSync('src/components/tabs/ConsoleTab.tsx', code);
console.log('Fixed placeholders in ConsoleTab.tsx');
