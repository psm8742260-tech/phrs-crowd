const fs = require('fs');
const file = 'src/components/tabs/ComputeEngineTab.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `      {['Instance templates', 'Sole-tenant nodes', 'Machine images', 'TPUs'].includes(computeSubTab) && (
        <div className="p-20 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-white">
          <HardDrive className="w-12 h-12 mb-4 opacity-10" />
          <h3 className="text-sm font-bold text-slate-600 mb-1">{computeSubTab} Management</h3>
          <p className="text-xs font-mono text-center max-w-sm">Configuration interface for {computeSubTab} is initializing. Use VM Instances for immediate deployments.</p>
        </div>
      )}`;

const replacement = `      {['Instance templates', 'Sole-tenant nodes', 'Machine images', 'TPUs'].includes(computeSubTab) && (
        <div className={\`p-6 sm:p-8 rounded-2xl border transition-colors \${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}\`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{computeSubTab}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Manage and configure {computeSubTab.toLowerCase()} for your cloud environment.</p>
              </div>
            </div>
            <button className="flex items-center justify-center w-full sm:w-auto gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition shadow-sm whitespace-nowrap">
              <Plus className="w-4 h-4" />
              CREATE {computeSubTab.split(' ')[0].toUpperCase()}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Filter resources..." className="bg-transparent border-none focus:ring-0 text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 w-48 sm:w-64" />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Name</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Location</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="font-medium text-sm text-slate-900 dark:text-slate-100">default-{computeSubTab.toLowerCase().split(' ')[0]}-1</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">us-central1-a</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-10 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 mb-3 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Layout className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">No additional {computeSubTab.toLowerCase()} found</p>
              <p className="text-xs text-slate-500 max-w-sm">Create a new {computeSubTab.toLowerCase()} to get started with this service.</p>
            </div>
          </div>
        </div>
      )}`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    console.log("Success: compute engine UI fixed");
} else {
    console.log("Failed: compute engine target not found");
}

fs.writeFileSync(file, content);
