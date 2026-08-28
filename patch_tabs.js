const fs = require('fs');
const path = require('path');

const tabsDir = path.join(__dirname, 'src', 'components', 'tabs');

// 1. KubernetesTab
let k8sCode = fs.readFileSync(path.join(tabsDir, 'KubernetesTab.tsx'), 'utf8');
k8sCode = k8sCode.replace(
  /onClick=\{\(\) => \{\s*const newPodId[^}]*setK8sPods[^}]*setHomeToast[^}]*setTimeout[^}]*\}\}/,
  `onClick={async () => {
    try {
      setHomeToast('Spinning up GKE Pod...');
      const res = await fetch('/api/k8s/pods', { method: 'POST' });
      const newPod = await res.json();
      setK8sPods(prev => [...prev, newPod]);
      setHomeToast(\`✓ Spun up GKE Pod: \${newPod.name}\`);
      setTimeout(() => setHomeToast(null), 3000);
    } catch (e) {
      setHomeToast('Error spinning up pod');
    }
  }}`
);
fs.writeFileSync(path.join(tabsDir, 'KubernetesTab.tsx'), k8sCode);
console.log('Patched KubernetesTab');

// 2. ApiBoardTab
let apiCode = fs.readFileSync(path.join(tabsDir, 'ApiBoardTab.tsx'), 'utf8');
apiCode = apiCode.replace(
  /onClick=\{\(\) => \{\s*const newKey[^}]*setApiKeys[^}]*setHomeToast[^}]*setTimeout[^}]*\}\}/,
  `onClick={async () => {
    try {
      setHomeToast('Generating new API Key...');
      const res = await fetch('/api/credentials', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name: 'Server API Key ' + (apiKeys.length + 1)}) });
      const newKey = await res.json();
      setApiKeys(prev => [...prev, newKey]);
      setHomeToast('✓ Generated API Key: ' + newKey.name);
      setTimeout(() => setHomeToast(null), 3000);
    } catch (e) {
      setHomeToast('Error generating key');
    }
  }}`
);
fs.writeFileSync(path.join(tabsDir, 'ApiBoardTab.tsx'), apiCode);
console.log('Patched ApiBoardTab');

// 3. BillingTab (Alert update)
let billingCode = fs.readFileSync(path.join(tabsDir, 'BillingTab.tsx'), 'utf8');
billingCode = billingCode.replace(
  /onClick=\{\(\) => \{\s*setHomeToast\([^)]+\);\s*setTimeout[^}]*\}\}/,
  `onClick={async () => {
    try {
      setHomeToast('Updating budget settings...');
      await fetch('/api/billing/budget', { method: 'POST' });
      setHomeToast('✓ Billing budget alerts updated successfully');
      setTimeout(() => setHomeToast(null), 3000);
    } catch (e) {
      setHomeToast('Error updating budget');
    }
  }}`
);
fs.writeFileSync(path.join(tabsDir, 'BillingTab.tsx'), billingCode);
console.log('Patched BillingTab');

