const fs = require('fs');

let dbPath = 'src/components/tabs/DatabaseTab.tsx';
let dbCode = fs.readFileSync(dbPath, 'utf8');

dbCode = dbCode.replace(
  /setPhrsStorageFiles\(prev => \[\.\.\.prev, newFile\]\);/g,
  `setPhrsStorageFiles(prev => [...prev, newFile]);
   window.executeBackendAction('Uploading file ' + newFile.name + ' to server DB');`
);

fs.writeFileSync(dbPath, dbCode);
console.log('Patched DatabaseTab');
