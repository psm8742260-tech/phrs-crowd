import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We will just replace the specific section from snippetFormat buttons down to the end of the tab.
start_str = r'<div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 overflow-x-auto max-w-full">'
end_str = r'            </div>\n          </div>\n        )}\n\n        {/\* ==============================================\n            TAB 5: ADMIN API BOARD'

pattern = start_str + r'.*?' + end_str

replacement = """<div className="w-full p-1 bg-slate-100 rounded-xl border border-slate-200 grid grid-cols-3 gap-1">
                  {[
                    { id: 'Module', label: 'MODULE', telugu: 'రియాక్ట్ యాప్స్ కోసం' },
                    { id: 'Script', label: 'SCRIPT', telugu: 'సాధారణ సైట్ల కోసం' },
                    { id: 'Object', label: 'OBJECT', telugu: 'కేవలం సెట్టింగ్స్ కోసం' }
                  ].map((format) => (
                    <button
                      key={format.id}
                      onClick={() => setSnippetFormat(format.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all w-full text-center ${
                        snippetFormat === format.id 
                        ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50/50'
                      }`}
                    >
                      <span className="text-xs font-black tracking-wider truncate w-full">{format.label}</span>
                      <span className="text-[10px] font-medium opacity-75 mt-0.5 truncate w-full">{format.telugu}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-indigo-800 uppercase tracking-widest flex items-center gap-2">
                      <Cloud className="w-4 h-4" /> All-in-One Integration Script
                    </h3>
                  </div>
                  
                  {/* Code Editor Area */}
                  <div className="relative group w-full">
                    <pre className="w-full bg-slate-900 text-indigo-100 p-6 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800 shadow-xl whitespace-pre-wrap">
                      {snippetFormat === 'Module' && (
`import { initializeApp, PHRS, db, OTP } from "@phrs/cloud";

// 1. Master Config
const phrsConfig = {
  apiKey: "PHRS_AUTH_8742260",
  authDomain: "${remoteNodeIp}",
  projectId: "${selectedProjectId || 'phrs-master-cloud'}",
  appId: "1:8742260:web:phrs_master_node"
};
const app = initializeApp(phrsConfig);

// 2. Initialize Core Services (App, DB, Auth)
PHRS.init("${remoteNodeIp}");
db.host = "${remoteNodeIp}";
OTP.node("${remoteNodeIp}");`)}
                      {snippetFormat === 'Script' && (
`<script type="module">
  import { initializeApp, PHRS, db, OTP } from "http://${remoteNodeIp}/sdk/v1/phrs-app.js";
  
  // 1. Master Config
  const phrsConfig = { apiKey: "PHRS_AUTH_8742260", authDomain: "${remoteNodeIp}" };
  const app = initializeApp(phrsConfig);

  // 2. Initialize Core Services
  PHRS.init("${remoteNodeIp}");
  db.host = "${remoteNodeIp}";
  OTP.node("${remoteNodeIp}");
</script>`)}
                      {snippetFormat === 'Object' && (
`const phrsConfig = {
  apiKey: "PHRS_AUTH_8742260",
  authDomain: "${remoteNodeIp}",
  projectId: "${selectedProjectId || 'phrs-master-cloud'}",
  services: {
    apkBridge: "${remoteNodeIp}",
    databaseHost: "${remoteNodeIp}",
    otpNode: "${remoteNodeIp}"
  }
};`)}
                    </pre>
                    <button 
                      className="absolute top-4 right-4 p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 text-white shadow-lg transition-colors group-hover:bg-indigo-500" 
                      onClick={() => {
                        setHomeToast('✓ Script Copied to Clipboard!');
                        setTimeout(() => setHomeToast(null), 3000);
                      }}
                      title="Copy Code"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  {/* QR Code Dynamic Generation */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm w-full">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 mb-4 w-48 h-48 flex items-center justify-center overflow-hidden">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                          snippetFormat === 'Module' 
                          ? `import { initializeApp, PHRS, db, OTP } from "@phrs/cloud";\\n\\nconst phrsConfig = { apiKey: "PHRS_AUTH_8742260", authDomain: "${remoteNodeIp}", projectId: "${selectedProjectId || 'phrs-master-cloud'}", appId: "1:8742260:web:phrs_master_node" };\\nconst app = initializeApp(phrsConfig);\\n\\nPHRS.init("${remoteNodeIp}");\\ndb.host = "${remoteNodeIp}";\\nOTP.node("${remoteNodeIp}");`
                          : snippetFormat === 'Script'
                          ? `<script type="module">\\n  import { initializeApp, PHRS, db, OTP } from "http://${remoteNodeIp}/sdk/v1/phrs-app.js";\\n  const phrsConfig = { apiKey: "PHRS_AUTH_8742260", authDomain: "${remoteNodeIp}" };\\n  const app = initializeApp(phrsConfig);\\n  PHRS.init("${remoteNodeIp}");\\n  db.host = "${remoteNodeIp}";\\n  OTP.node("${remoteNodeIp}");\\n</script>`
                          : `const phrsConfig = {\\n  apiKey: "PHRS_AUTH_8742260",\\n  authDomain: "${remoteNodeIp}",\\n  projectId: "${selectedProjectId || 'phrs-master-cloud'}",\\n  services: {\\n    apkBridge: "${remoteNodeIp}",\\n    databaseHost: "${remoteNodeIp}",\\n    otpNode: "${remoteNodeIp}"\\n  }\\n};`
                        )}`} 
                        alt="Code QR" 
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 text-center mb-1">Scan Code Script</h4>
                    <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                      Scan via mobile to instantly get the <span className="font-bold text-indigo-600">{snippetFormat}</span> integration script without manual typing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 5: ADMIN API BOARD"""

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated integration section correctly!")
