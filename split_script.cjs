const fs = require('fs');
const content = fs.readFileSync('src/components/tabs/SmsGatewayTab.tsx', 'utf-8');

// Find the start of the return statement
const returnIndex = content.indexOf('return (');
if (returnIndex === -1) {
  console.log('Return statement not found');
  process.exit(1);
}

// Extract everything before the return
const beforeReturn = content.substring(0, returnIndex);

// Save to separate files for inspection
fs.writeFileSync('/tmp/before.txt', beforeReturn);
const afterReturn = content.substring(returnIndex);
fs.writeFileSync('/tmp/after.txt', afterReturn);
console.log('Split completed');
