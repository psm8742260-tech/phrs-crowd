import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = r"""                    <button 
                      className="absolute top-4 right-4 p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 text-white shadow-lg transition-colors group-hover:bg-indigo-500" 
                      onClick=\{\(\) => \{
                        setHomeToast\('✓ Script Copied to Clipboard!'\);
                        setTimeout\(\(\) => setHomeToast\(null\), 3000\);
                      \}\}
                      title="Copy Code"
                    >"""

replacement = """                    <button 
                      className="absolute top-4 right-4 p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 text-white shadow-lg transition-colors group-hover:bg-indigo-500" 
                      onClick={() => {
                        let textToCopy = '';
                        if (snippetFormat === 'Module') {
                          textToCopy = `import { initializeApp, PHRS, db, OTP } from "@phrs/cloud";\\n\\n// 1. Master Config\\nconst phrsConfig = {\\n  apiKey: "PHRS_AUTH_8742260",\\n  authDomain: "${remoteNodeIp}",\\n  projectId: "${selectedProjectId || 'phrs-master-cloud'}",\\n  appId: "1:8742260:web:phrs_master_node"\\n};\\nconst app = initializeApp(phrsConfig);\\n\\n// 2. Initialize Core Services (App, DB, Auth)\\nPHRS.init("${remoteNodeIp}");\\ndb.host = "${remoteNodeIp}";\\nOTP.node("${remoteNodeIp}");`;
                        } else if (snippetFormat === 'Script') {
                          textToCopy = `<script type="module">\\n  import { initializeApp, PHRS, db, OTP } from "http://${remoteNodeIp}/sdk/v1/phrs-app.js";\\n  \\n  // 1. Master Config\\n  const phrsConfig = { apiKey: "PHRS_AUTH_8742260", authDomain: "${remoteNodeIp}" };\\n  const app = initializeApp(phrsConfig);\\n\\n  // 2. Initialize Core Services\\n  PHRS.init("${remoteNodeIp}");\\ndb.host = "${remoteNodeIp}";\\n  OTP.node("${remoteNodeIp}");\\n</script>`;
                        } else {
                          textToCopy = `const phrsConfig = {\\n  apiKey: "PHRS_AUTH_8742260",\\n  authDomain: "${remoteNodeIp}",\\n  projectId: "${selectedProjectId || 'phrs-master-cloud'}",\\n  services: {\\n    apkBridge: "${remoteNodeIp}",\\n    databaseHost: "${remoteNodeIp}",\\n    otpNode: "${remoteNodeIp}"\\n  }\\n};`;
                        }
                        navigator.clipboard.writeText(textToCopy);
                        setHomeToast('✓ Script Copied to Clipboard!');
                        setTimeout(() => setHomeToast(null), 3000);
                      }}
                      title="Copy Code"
                    >"""

new_content = re.sub(target, replacement, content, flags=re.DOTALL)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Copy button fixed!")
