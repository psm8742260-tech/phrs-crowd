import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = r"\{activeTab === 'billing' && \(\s*<div className=\"space-y-6 animate-fade-in\">.*?TAB 10: IAM & permissions MEMBERS MANAGER"

replacement = """{activeTab === 'billing' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-slate-900">PHRS Cost Savings Dashboard</h2>
                    <p className="text-xs text-slate-500 mt-1">Real-time comparison between your VPS setup and standard Cloud Providers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-rose-200 bg-rose-50/50 shadow-sm">
                <h3 className="text-xs font-black tracking-wider text-rose-600 uppercase mb-4 flex items-center gap-2">
                  <Cloud className="w-4 h-4" /> Google Cloud / Firebase
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-rose-200 pb-2">
                    <span className="text-xs font-medium text-slate-600">Database (Read/Write)</span>
                    <span className="text-xs font-mono text-rose-600">$124.00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-rose-200 pb-2">
                    <span className="text-xs font-medium text-slate-600">SMS OTP (10k SMS)</span>
                    <span className="text-xs font-mono text-rose-600">$180.00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-rose-200 pb-2">
                    <span className="text-xs font-medium text-slate-600">API Gateway Calls</span>
                    <span className="text-xs font-mono text-rose-600">$45.00</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-900">Estimated Cost</span>
                    <span className="text-lg font-black text-rose-600">$349.00 <span className="text-xs font-medium">/mo</span></span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5">
                  <Server className="w-48 h-48" />
                </div>
                <h3 className="text-xs font-black tracking-wider text-emerald-700 uppercase mb-4 flex items-center gap-2 relative z-10">
                  <Server className="w-4 h-4" /> Your PHRS VPS Server
                </h3>
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center border-b border-emerald-200 pb-2">
                    <span className="text-xs font-medium text-slate-600">Database (Unlimited)</span>
                    <span className="text-xs font-mono text-emerald-600">₹0.00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-emerald-200 pb-2">
                    <span className="text-xs font-medium text-slate-600">SMS OTP (Local Sim/API)</span>
                    <span className="text-xs font-mono text-emerald-600">₹0.00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-emerald-200 pb-2">
                    <span className="text-xs font-medium text-slate-600">API Gateway Calls</span>
                    <span className="text-xs font-mono text-emerald-600">₹0.00</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-900">Fixed VPS Rent</span>
                    <span className="text-lg font-black text-emerald-700">₹850.00 <span className="text-xs font-medium">/mo</span></span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-indigo-200 bg-indigo-600 shadow-xl text-white flex flex-col justify-center items-center text-center">
                <Sparkles className="w-8 h-8 text-indigo-300 mb-4" />
                <h3 className="text-xs font-bold tracking-wider text-indigo-200 uppercase mb-2">Total Monthly Savings</h3>
                <div className="text-4xl font-black mb-2 animate-pulse">~ ₹28,000</div>
                <p className="text-xs text-indigo-200 max-w-[200px]">You are saving 95% on cloud costs by using the PHRS standalone architecture.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-slate-500" /> Free Usage Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Database Queries</div>
                  <div className="text-xl font-black text-slate-800">1.2M</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-1">₹0.00 Billed</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">SMS Sent</div>
                  <div className="text-xl font-black text-slate-800">8,450</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-1">₹0.00 Billed</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Bandwidth Used</div>
                  <div className="text-xl font-black text-slate-800">142 GB</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-1">Included in VPS</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Active Projects</div>
                  <div className="text-xl font-black text-slate-800">{projects.length}</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-1">Unlimited</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 10: IAM & permissions MEMBERS MANAGER"""

new_content = re.sub(target, replacement, content, flags=re.DOTALL)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done")
