import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = r"\{activeTab === 'billing' && \(\s*<div className=\"space-y-6 animate-fade-in\">.*?TAB 10: IAM & permissions MEMBERS MANAGER"

replacement = """{activeTab === 'billing' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60"></div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10 gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-indigo-600" />
                    Billing & Usage
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Manage your pay-as-you-go expenses and cloud usage.</p>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-right min-w-[200px]">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Current Month Due</div>
                  <div className="text-3xl font-black text-slate-900">₹450.00</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center justify-end gap-1">
                    <TrendingDown className="w-3 h-3" /> Saved ₹320 vs GCP
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                {/* Usage Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-indigo-500" /> Current Usage
                    </h3>
                  </div>
                  <div className="p-0 overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-slate-50/50 text-slate-500 text-[10px] uppercase font-bold">
                        <tr>
                          <th className="p-4 border-b border-slate-100">Service</th>
                          <th className="p-4 border-b border-slate-100">Usage</th>
                          <th className="p-4 border-b border-slate-100 text-right">Cost</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-700 text-xs">Database (NoSQL)</td>
                          <td className="p-4 text-slate-500 font-mono text-xs">2.5 GB</td>
                          <td className="p-4 text-right font-mono font-bold text-slate-900">₹337.50</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-700 text-xs">Auth (SMS OTP)</td>
                          <td className="p-4 text-slate-500 font-mono text-xs">150 SMS</td>
                          <td className="p-4 text-right font-mono font-bold text-slate-900">₹75.00</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-700 text-xs">API Gateway</td>
                          <td className="p-4 text-slate-500 font-mono text-xs">12.4k Calls</td>
                          <td className="p-4 text-right font-mono font-bold text-slate-900">₹37.50</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pricing Comparison */}
                <div className="border border-indigo-200 rounded-xl overflow-hidden bg-indigo-50/30 shadow-sm flex flex-col">
                  <div className="bg-indigo-100/50 p-4 border-b border-indigo-100 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" /> 
                      PHRS vs Google Cloud Pricing
                    </h3>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center space-y-6">
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-bold text-slate-700">Database Storage (per GB)</span>
                        <span className="font-bold text-emerald-600">₹15 Cheaper!</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex-1 p-2.5 bg-white border border-slate-200 rounded-lg text-slate-500 line-through text-center shadow-sm">GCP: ₹150</div>
                        <div className="flex-1 p-2.5 bg-indigo-600 border border-indigo-700 rounded-lg font-bold text-white text-center shadow-md">PHRS: ₹135</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-bold text-slate-700">SMS Authentication (per 100 OTPs)</span>
                        <span className="font-bold text-emerald-600">₹10 Cheaper!</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex-1 p-2.5 bg-white border border-slate-200 rounded-lg text-slate-500 line-through text-center shadow-sm">Firebase: ₹60</div>
                        <div className="flex-1 p-2.5 bg-indigo-600 border border-indigo-700 rounded-lg font-bold text-white text-center shadow-md">PHRS: ₹50</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                <div className="text-xs text-slate-500">
                  Auto-pay is enabled. Next billing date: <span className="font-bold text-slate-700">Nov 1, 2026</span>
                </div>
                <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> View Invoices
                </button>
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
