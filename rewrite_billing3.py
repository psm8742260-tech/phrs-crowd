import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = r"\{activeTab === 'billing' && \(\s*<div className=\"space-y-6 animate-fade-in\">.*?TAB 10: IAM & permissions MEMBERS MANAGER"

replacement = """{activeTab === 'billing' && (
          <div className="space-y-6 animate-fade-in">
            {/* Wallet Top Section */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-20"></div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-sm font-bold text-indigo-200 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Prepaid Cloud Wallet
                  </h2>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-black">₹342.50</span>
                    <span className="text-xs text-indigo-300 font-mono font-bold px-2 py-1 bg-indigo-900/50 rounded-md">AVAILABLE</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 max-w-sm">Zero hidden charges. Pay exactly for what you use, at disruptive market rates.</p>
                </div>
                <button onClick={() => alert('Opening UPI QR Code Scanner... Please transfer funds to add balance.')} className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2 w-full md:w-auto justify-center">
                  <QrCode className="w-5 h-5" /> RECHARGE VIA UPI
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Disruptive Pricing Table */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" /> Disruptive Pricing (90% Off Market)
                </h3>
                <div className="space-y-4 flex-1">
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 flex justify-between items-center transition-all hover:bg-white hover:shadow-md">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Database Storage (per GB)</div>
                      <div className="text-[10px] text-slate-500 line-through mt-1">Google Price: ₹150.00</div>
                    </div>
                    <div className="text-lg font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">₹20.00</div>
                  </div>
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 flex justify-between items-center transition-all hover:bg-white hover:shadow-md">
                    <div>
                      <div className="text-xs font-bold text-slate-800">SMS OTP (per 100 SMS)</div>
                      <div className="text-[10px] text-slate-500 line-through mt-1">Firebase: ₹60.00</div>
                    </div>
                    <div className="text-lg font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">₹10.00</div>
                  </div>
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 flex justify-between items-center transition-all hover:bg-white hover:shadow-md">
                    <div>
                      <div className="text-xs font-bold text-slate-800">API Gateway Calls (per 10k)</div>
                      <div className="text-[10px] text-slate-500 line-through mt-1">AWS/GCP: ₹40.00</div>
                    </div>
                    <div className="text-lg font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">₹2.00</div>
                  </div>
                </div>
              </div>

              {/* Live Micro-Ledger */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-indigo-500" /> Live Micro-Transactions
                  </h3>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
                
                <div className="flex-1 bg-slate-900 rounded-xl p-4 font-mono text-[11px] overflow-hidden flex flex-col justify-end space-y-3 relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-slate-900/90 pointer-events-none"></div>
                  
                  <div className="flex justify-between text-slate-500 opacity-50"><span>[14:22:01] DB_WRITE (0.2MB)</span><span className="text-rose-400/50">-₹0.004</span></div>
                  <div className="flex justify-between text-slate-400 opacity-70"><span>[14:23:45] SMS_OTP_SEND</span><span className="text-rose-400/70">-₹0.100</span></div>
                  <div className="flex justify-between text-slate-300"><span>[14:24:12] DB_READ (Query)</span><span className="text-rose-400">-₹0.001</span></div>
                  <div className="flex justify-between text-emerald-400 font-bold border-l-2 border-emerald-500 pl-2 bg-emerald-500/10 py-1"><span>[14:25:33] SMS_OTP_VERIFY</span><span className="text-rose-400">-₹0.100</span></div>
                  <div className="flex justify-between text-emerald-400 font-bold border-l-2 border-emerald-500 pl-2 bg-emerald-500/10 py-1 shadow-[0_0_10px_rgba(16,185,129,0.2)]"><span>[14:26:01] API_CALL_SUCCESS</span><span className="text-rose-400">-₹0.002</span></div>
                </div>
                <p className="text-[10px] text-slate-400 mt-4 text-center font-bold uppercase tracking-wider">Charges are deducted from wallet instantly per request.</p>
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
