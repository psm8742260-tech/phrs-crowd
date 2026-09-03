const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `    if (sectionId === 'secret_manager') {
      setActiveTab('secret_manager');
      setSecretManagerSubTab(subMenu);
    }`;

const replacement = `    if (sectionId === 'secret_manager') {
      setActiveTab('secret_manager');
      setSecretManagerSubTab('secrets');
    }`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    console.log("Success: secret manager fix");
} else {
    console.log("Failed");
}

fs.writeFileSync(file, content);
