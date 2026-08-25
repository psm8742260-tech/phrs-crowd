import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# 1. Remove the standalone banner from home tab
start_str = r"{/\* GIANT STANDALONE SERVER DOWNLOAD & DIRECT WEB URL INSTALLER BANNER \*/}"
end_str = r"{/\* Welcome Header & Cloud Logo \*/}"
content = re.sub(start_str + r".*?" + end_str, "{/* Welcome Header & Cloud Logo */}", content, flags=re.DOTALL)

# 2. Add navigation to the resource list
old_resources = r"""{[
                            { name: 'Compute Engine', val: '2 instances', color: 'text-blue-600' },
                            { name: 'Cloud Storage', val: '5 buckets', color: 'text-blue-600' },
                            { name: 'Cloud SQL', val: '1 instance', color: 'text-blue-600' },
                            { name: 'BigQuery', val: '12 datasets', color: 'text-blue-600' },
                            { name: 'Firebase Projects', val: '3 active', color: 'text-[#FFCA28]' },
                            { name: 'Agent Platform', val: `${agents.length} active`, color: 'text-indigo-600' }
                          ].map((res, i) => (
                            <div key={i} className="flex justify-between items-center px-5 py-3 hover:bg-slate-50 transition cursor-pointer group">
                              <span className="text-xs text-slate-700">{res.name}</span>
                              <span className={`text-[11px] font-bold ${res.color} group-hover:underline`}>{res.val}</span>
                            </div>
                          ))}"""

new_resources = r"""{[
                            { name: 'Compute Engine', val: '2 instances', color: 'text-blue-600', tab: 'cloud_run' },
                            { name: 'Cloud Storage', val: '5 buckets', color: 'text-blue-600', tab: 'cloud_storage' },
                            { name: 'Cloud SQL', val: '1 instance', color: 'text-blue-600', tab: 'cloud_sql' },
                            { name: 'BigQuery', val: '12 datasets', color: 'text-blue-600', tab: 'bigquery' },
                            { name: 'Firebase Database', val: '3 active', color: 'text-[#FFCA28]', tab: 'database' },
                            { name: 'Agent Platform', val: `${agents.length} active`, color: 'text-indigo-600', tab: 'agent_platform' }
                          ].map((res, i) => (
                            <div key={i} onClick={() => setActiveTab(res.tab as any)} className="flex justify-between items-center px-5 py-3 hover:bg-slate-50 transition cursor-pointer group">
                              <span className="text-xs text-slate-700">{res.name}</span>
                              <span className={`text-[11px] font-bold ${res.color} group-hover:underline`}>{res.val}</span>
                            </div>
                          ))}"""

content = content.replace(old_resources, new_resources)


# 3. Add activeTab to APIs Overview
old_api_overview = r"""<button className="text-xs font-bold text-blue-600 hover:underline">Go to APIs overview</button>"""
new_api_overview = r"""<button onClick={() => setActiveTab('api_board')} className="text-xs font-bold text-blue-600 hover:underline">Go to APIs overview</button>"""
content = content.replace(old_api_overview, new_api_overview)

# 4. Remove the `isWelcomeBoardOpen` logic and just render it flat so it looks exactly like GCP
is_welcome_str = r"""{/* Standalone Plus button for collapsing/closing welcome board details */}
                <button 
                  onClick={() => setIsWelcomeBoardOpen(!isWelcomeBoardOpen)}
                  className={`p-2 rounded-full border text-blue-600 hover:bg-blue-50 transition-all shrink-0 ${!isWelcomeBoardOpen ? 'bg-blue-100 border-blue-300' : 'bg-white border-slate-200'}`}
                  title={isWelcomeBoardOpen ? "Collapse Welcome Board" : "Expand Welcome Board"}
                >
                  <Plus className={`w-5 h-5 transition-transform duration-300 ${isWelcomeBoardOpen ? 'rotate-45' : ''}`} />
                </button>
              </div>

              {isWelcomeBoardOpen && (
                <>"""
content = content.replace(is_welcome_str, "</div>\n\n                <>")

end_welcome_str = r"""                  </div>
                </>
              )}"""
content = content.replace(end_welcome_str, "                  </div>\n                </>")

with open('src/App.tsx', 'w') as f:
    f.write(content)
