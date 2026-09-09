const fs = require('fs');
let code = fs.readFileSync('src/components/tabs/ConsoleTab.tsx', 'utf8');

code = code.replace(/8466062260/g, '**********');
code = code.replace(/psm8742260@gmail\.com/g, '**********@gmail.com');

fs.writeFileSync('src/components/tabs/ConsoleTab.tsx', code);
console.log('Masked sensitive data in ConsoleTab.tsx');
