const fs = require('fs');
const file = 'src/components/tabs/AgentPlatformTab.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `              <div className="p-6 pb-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold tracking-tight text-slate-800">Agent Platform (డైనమిక్ కోర్)</h2>
                  </div>
                  <button 
                    onClick={() => {
                      setAgentPlatformSubTab('agents');
                      setHomeToast("Ready to create a new autonomous agent");
                      setTimeout(() => setHomeToast(null), 2500);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>CREATE AGENT</span>
                  </button>
                </div>`;

const replacement = `              <div className="p-4 sm:p-6 sm:pb-2 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 leading-tight">Agent Platform <br className="sm:hidden" />(డైనమిక్ కోర్)</h2>
                  </div>
                  <button 
                    onClick={() => {
                      setAgentPlatformSubTab('agents');
                      setHomeToast("Ready to create a new autonomous agent");
                      setTimeout(() => setHomeToast(null), 2500);
                    }}
                    className="flex items-center justify-center w-full sm:w-auto gap-2 px-4 py-2.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition shadow-sm"
                  >
                    <Plus className="w-4 h-4 shrink-0" />
                    <span>CREATE AGENT</span>
                  </button>
                </div>`;

if (content.includes(target)) {
    fs.writeFileSync(file, content.replace(target, replacement));
    console.log("Success: AgentPlatformTab.tsx");
} else {
    console.log("Target not found in AgentPlatformTab.tsx");
}
