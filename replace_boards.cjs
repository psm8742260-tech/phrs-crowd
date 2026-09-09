const fs = require('fs');
let code = fs.readFileSync('src/components/tabs/ConsoleTab.tsx', 'utf8');

const newGrid = `              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">                
                {/* Board 1: PROJECT KEYS */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <FileCode className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-indigo-600 tracking-wider">PROJECT KEYS</div>
                          <div className="text-[11px] font-bold text-slate-700 font-mono">phrs-auth.js</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] bg-emerald-100 text-emerald-700 rounded-md font-bold uppercase font-sans">ప్రొజెక్ట్ కీస్</span>
                    </div>
                    
                    <p className="text-[10px] text-slate-500 leading-relaxed font-sans h-8">
                      ప్రాజెక్ట్ కీస్ మరియు ఆథరైజేషన్ హెడర్స్ ఉపయోగించి గేట్‌వే యాక్సెస్ పొందడానికి కోడ్.
                    </p>
                    <div className="relative group">
                      <pre className="w-full bg-slate-950 text-emerald-400 p-4 rounded-xl text-[11px] font-mono overflow-y-auto h-[260px] leading-relaxed border border-slate-900 shadow-inner whitespace-pre-wrap select-all">{\`// PHRS Cloud Authentication
const PHRS_GATEWAY = "https://phrscrowd.online";
const PROJECT_KEY = "pk_live_phrscrowd_8466062260";

export async function authenticateApp() {
  try {
    const response = await fetch(\\\`\${PHRS_GATEWAY}/api/auth/verify\\\`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": \\\`Bearer \${PROJECT_KEY}\\\`
      },
      body: JSON.stringify({ appName: "PHRS-Client" })
    });
    const result = await response.json();
    console.log("[AUTH]", result);
    return result;
  } catch (err) {
    console.error("[AUTH ERROR]", err);
    return { success: false, error: err.message };
  }
}\`}
                      </pre>
                      <button 
                        className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg shadow transition-colors"
                        onClick={() => {
                          const c = \`// PHRS Cloud Authentication\\nconst PHRS_GATEWAY = "https://phrscrowd.online";\\nconst PROJECT_KEY = "pk_live_phrscrowd_8466062260";\\n\\nexport async function authenticateApp() {\\n  try {\\n    const response = await fetch(\\\`\${PHRS_GATEWAY}/api/auth/verify\\\`, {\\n      method: "POST",\\n      headers: {\\n        "Content-Type": "application/json",\\n        "Authorization": \\\`Bearer \${PROJECT_KEY}\\\`\\n      },\\n      body: JSON.stringify({ appName: "PHRS-Client" })\\n    });\\n    const result = await response.json();\\n    console.log("[AUTH]", result);\\n    return result;\\n  } catch (err) {\\n    console.error("[AUTH ERROR]", err);\\n    return { success: false, error: err.message };\\n  }\\n}\`;
                          navigator.clipboard.writeText(c);
                        }}
                        title="Copy Code"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col items-center">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 mb-3 w-32 h-32 flex items-center justify-center overflow-hidden">
                      <img 
                        src={\`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=\${encodeURIComponent(
                          \`export async function auth() { const res = await fetch("https://phrscrowd.online/api/auth/verify", { method: "POST", headers: { "Authorization": "Bearer pk_live_phrscrowd_8466062260" } }); return await res.json(); }\`
                        )}\`} 
                        alt="PROJECT KEYS QR" 
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 font-sans tracking-wide">PROJECT KEYS QR</span>
                  </div>
                </div>

                {/* Board 2: WEBHOOKS */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <Cloud className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-indigo-600 tracking-wider">WEBHOOKS</div>
                          <div className="text-[11px] font-bold text-slate-700 font-mono">webhook-handler.js</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] bg-indigo-100 text-indigo-700 rounded-md font-bold uppercase font-sans">వెబ్‌హుక్స్</span>
                    </div>
                    
                    <p className="text-[10px] text-slate-500 leading-relaxed font-sans h-8">
                      SMS డెలివరీ లేదా OTP ధృవీకరణ జరిగినప్పుడు రియల్-టైమ్ ఈవెంట్స్ అందుకోవడానికి వెబ్‌హుక్ లాజిక్.
                    </p>
                    <div className="relative group">
                      <pre className="w-full bg-slate-950 text-indigo-300 p-4 rounded-xl text-[11px] font-mono overflow-y-auto h-[260px] leading-relaxed border border-slate-900 shadow-inner whitespace-pre-wrap select-all">{\`// PHRS Event Webhook Listener (Express.js)
const express = require('express');
const app = express();

app.post('/phrs-webhook/events', express.json(), (req, res) => {
  const { eventType, payload, signature } = req.body;
  
  if (eventType === 'sms.delivered') {
    console.log(\\\`[Webhook] SMS delivered to \${payload.phone}\\\`);
    // Update local database status
  } else if (eventType === 'otp.verified') {
    console.log(\\\`[Webhook] OTP verified for \${payload.userId}\\\`);
  }
  
  res.status(200).send({ received: true });
});

app.listen(3000, () => console.log('Webhook server running...'));\`}
                      </pre>
                      <button 
                        className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg shadow transition-colors"
                        onClick={() => {
                          const c = \`const express = require('express');\\nconst app = express();\\napp.post('/phrs-webhook/events', express.json(), (req, res) => {\\n  const { eventType, payload } = req.body;\\n  console.log('Event:', eventType, payload);\\n  res.status(200).send({ received: true });\\n});\\napp.listen(3000);\`;
                          navigator.clipboard.writeText(c);
                        }}
                        title="Copy Script"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col items-center">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 mb-3 w-32 h-32 flex items-center justify-center overflow-hidden">
                      <img 
                        src={\`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=\${encodeURIComponent(
                          \`app.post('/webhook', express.json(), (req, res) => { console.log(req.body); res.send({ok: true}); });\`
                        )}\`} 
                        alt="WEBHOOKS QR" 
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 font-sans tracking-wide">WEBHOOKS QR</span>
                  </div>
                </div>

                {/* Board 3: SDK SETUP */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <Settings className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-indigo-600 tracking-wider">SDK SETUP</div>
                          <div className="text-[11px] font-bold text-slate-700 font-mono">phrs-sdk-init.js</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] bg-amber-100 text-amber-700 rounded-md font-bold uppercase font-sans">ఎస్‌డీకే సెటప్</span>
                    </div>
                    
                    <p className="text-[10px] text-slate-500 leading-relaxed font-sans h-8">
                      మీ యాప్‌లో సులభంగా PHRS ఎస్‌డీకేను ఇన్‌స్టాల్ చేసి, స్టార్ట్ చేయడానికి కావలసిన ఇనిషియలైజేషన్ కోడ్.
                    </p>
                    <div className="relative group">
                      <pre className="w-full bg-slate-950 text-indigo-200 p-4 rounded-xl text-[11px] font-mono overflow-y-auto h-[260px] leading-relaxed border border-slate-900 shadow-inner whitespace-pre-wrap select-all">{\`// Install: npm install @phrs-crowd/sdk
import { PhrsClient } from '@phrs-crowd/sdk';

// Initialize the SDK
const phrs = new PhrsClient({
  projectId: 'prj_cwrb_2026',
  apiKey: process.env.PHRS_API_KEY,
  environment: 'production'
});

// Send SMS via Stealth Gateway
async function sendWelcomeMessage() {
  const response = await phrs.sms.send({
    to: '+918466062260',
    message: 'Welcome to PHRS Crowd Platform!',
    route: 'stealth_gateway'
  });
  console.log('Message sent:', response.id);
}\`}
                      </pre>
                      <button 
                        className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg shadow transition-colors"
                        onClick={() => {
                          const c = \`import { PhrsClient } from '@phrs-crowd/sdk';\\nconst phrs = new PhrsClient({ projectId: 'prj_cwrb_2026', apiKey: process.env.PHRS_API_KEY });\\nphrs.sms.send({ to: '+918466062260', message: 'Hello World!' });\`;
                          navigator.clipboard.writeText(c);
                        }}
                        title="Copy Config"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col items-center">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 mb-3 w-32 h-32 flex items-center justify-center overflow-hidden">
                      <img 
                        src={\`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=\${encodeURIComponent(
                          \`npm i @phrs-crowd/sdk && import { PhrsClient } from '@phrs-crowd/sdk'; const phrs = new PhrsClient({ apiKey: 'KEY' });\`
                        )}\`} 
                        alt="SDK SETUP QR" 
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 font-sans tracking-wide">SDK SETUP QR</span>
                  </div>
                </div>
              </div>
            </div>`;

// Regex replacement
const regex = /<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/>/m;

const updatedCode = code.replace(regex, newGrid + '\n          </div>\n        </>\n');

fs.writeFileSync('src/components/tabs/ConsoleTab.tsx', updatedCode);
console.log('Replaced grid in ConsoleTab.tsx');
