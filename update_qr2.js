const fs = require('fs');
let content = fs.readFileSync('src/components/tabs/ConsoleTab.tsx', 'utf8');
content = content.replace(
  /\`window\.savePHRSSettings = function\(newIP, newSerial, newDeepSeekKey\) \{  localStorage\.setItem\('phrs_ip', newIP\);  localStorage\.setItem\('phrs_serial', newSerial\);  localStorage\.setItem\('phrs_deepseek', newDeepSeekKey\);  alert\("PHRS సర్వర్ సెట్టింగ్స్ విజయవంతంగా అప్డేట్ అయ్యాయి! సిస్టమ్ రీస్టార్ట్ అవుతోంది\.\.\."\);  location\.reload\(\);\};\`/g,
  `\`window.savePHRSSettings = function(customDeepSeekKey) { const ip = '104.21.42.180'; const domain = 'https://phrscrowd.online'; const serial = '10BF4C1HQ2000R1'; localStorage.setItem('phrs_ip', ip); localStorage.setItem('phrs_domain', domain); localStorage.setItem('phrs_serial', serial); if(customDeepSeekKey) localStorage.setItem('phrs_deepseek', customDeepSeekKey); alert('PHRS (phrscrowd.online) సెట్టింగ్స్ అప్డేట్ అయ్యాయి! రీస్టార్ట్ అవుతోంది...'); location.reload(); };\``
);
fs.writeFileSync('src/components/tabs/ConsoleTab.tsx', content);
