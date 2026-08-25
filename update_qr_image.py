import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = r"""<div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 inline-block mb-6 shadow-sm">
                  \{\/\* Real working generic QR code generating to phrs-admin upi \*\/\}
                  <img 
                    src="https://api\.qrserver\.com/v1/create-qr-code/\?size=200x200&data=upi://pay\?pa=psm8742260@ybl%26pn=PHRS%20Cloud%26cu=INR" 
                    alt="UPI QR Code" 
                    className="w-48 h-48 mx-auto rounded-lg"
                  />
                </div>

                <div className="bg-slate-100 rounded-xl p-3 text-left mb-6">
                  <div className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider mb-1">Target Account Details</div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-medium text-slate-700">UPI ID:</span>
                    <span className="text-xs font-mono font-black text-slate-900 bg-white px-2 py-1 rounded shadow-sm">psm8742260@ybl</span>
                  </div>
                </div>"""

replacement = """<div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 inline-block mb-6 shadow-sm">
                  {/* Custom Uploaded Admin PhonePe QR */}
                  <img 
                    src="/Screenshot_20260825_151147.jpg" 
                    alt="PhonePe QR Code" 
                    className="w-48 mx-auto rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=admin@ybl";
                    }}
                  />
                </div>

                <div className="bg-slate-100 rounded-xl p-3 text-center mb-6">
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Verified Merchant Account</div>
                  <div className="text-xs font-mono font-medium text-slate-700">Scan using PhonePe or any UPI App</div>
                </div>"""

new_content = re.sub(target, replacement, content, flags=re.DOTALL)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("QR Image Updated")
