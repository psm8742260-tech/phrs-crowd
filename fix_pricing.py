import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = r"""              \{/\* Disruptive Pricing Table \*/\}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" /> Disruptive Pricing \(90% Off Market\)
                </h3>
                <div className="space-y-4 flex-1">
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 flex justify-between items-center transition-all hover:bg-white hover:shadow-md">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Database Storage \(per GB\)</div>
                      <div className="text-\[10px\] text-slate-500 line-through mt-1">Google Price: ₹150\.00</div>
                    </div>
                    <div className="text-lg font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">₹20\.00</div>
                  </div>
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 flex justify-between items-center transition-all hover:bg-white hover:shadow-md">
                    <div>
                      <div className="text-xs font-bold text-slate-800">SMS OTP \(per 100 SMS\)</div>
                      <div className="text-\[10px\] text-slate-500 line-through mt-1">Firebase: ₹60\.00</div>
                    </div>
                    <div className="text-lg font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">₹10\.00</div>
                  </div>
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 flex justify-between items-center transition-all hover:bg-white hover:shadow-md">
                    <div>
                      <div className="text-xs font-bold text-slate-800">API Gateway Calls \(per 10k\)</div>
                      <div className="text-\[10px\] text-slate-500 line-through mt-1">AWS/GCP: ₹40\.00</div>
                    </div>
                    <div className="text-lg font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">₹2\.00</div>
                  </div>
                </div>
              </div>"""

replacement = """              {/* Competitive Pricing Table */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" /> Competitive Pricing (20% Off Market)
                </h3>
                <div className="space-y-4 flex-1">
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 flex justify-between items-center transition-all hover:bg-white hover:shadow-md">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Database Storage (per GB)</div>
                      <div className="text-[10px] text-slate-500 line-through mt-1">Google Price: ₹100.00</div>
                    </div>
                    <div className="text-lg font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">₹80.00</div>
                  </div>
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 flex justify-between items-center transition-all hover:bg-white hover:shadow-md">
                    <div>
                      <div className="text-xs font-bold text-slate-800">SMS OTP (per 100 SMS)</div>
                      <div className="text-[10px] text-slate-500 line-through mt-1">Firebase: ₹25.00</div>
                    </div>
                    <div className="text-lg font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">₹20.00</div>
                  </div>
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 flex justify-between items-center transition-all hover:bg-white hover:shadow-md">
                    <div>
                      <div className="text-xs font-bold text-slate-800">API Gateway Calls (per 10k)</div>
                      <div className="text-[10px] text-slate-500 line-through mt-1">AWS/GCP: ₹40.00</div>
                    </div>
                    <div className="text-lg font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">₹32.00</div>
                  </div>
                </div>
              </div>"""

new_content = re.sub(target, replacement, content, flags=re.DOTALL)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Pricing updated correctly!")
