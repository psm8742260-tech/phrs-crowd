import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add state variable
content = re.sub(
    r"(const \[showNewProjModal, setShowNewProjModal\] = useState\(false\);)",
    r"\1\n  const [showUpiModal, setShowUpiModal] = useState(false);",
    content
)

# 2. Update button action in the billing tab
content = re.sub(
    r"onClick=\{\(\) => alert\('Opening UPI QR Code Scanner\.\.\. Please transfer funds to add balance\.'\)\}",
    r"onClick={() => setShowUpiModal(true)}",
    content
)

# 3. Add UPI Modal rendering block
upi_modal_code = """
        {/* UPI Recharge Modal */}
        {showUpiModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl relative overflow-hidden ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
              
              <button 
                onClick={() => setShowUpiModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center relative z-10">
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <QrCode className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-black tracking-tight mb-1">Add Cloud Funds</h3>
                <p className="text-xs text-slate-500 mb-6">Scan with PhonePe, Google Pay, or Paytm</p>
                
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 inline-block mb-6 shadow-sm">
                  {/* Real working generic QR code generating to phrs-admin upi */}
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=psm8742260@ybl%26pn=PHRS%20Cloud%26cu=INR" 
                    alt="UPI QR Code" 
                    className="w-48 h-48 mx-auto rounded-lg"
                  />
                </div>

                <div className="bg-slate-100 rounded-xl p-3 text-left mb-6">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Target Account Details</div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-medium text-slate-700">UPI ID:</span>
                    <span className="text-xs font-mono font-black text-slate-900 bg-white px-2 py-1 rounded shadow-sm">psm8742260@ybl</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setShowUpiModal(false);
                    setHomeToast("✓ Funds will be added automatically once the transaction is verified by our servers.");
                    setTimeout(() => setHomeToast(null), 5000);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95"
                >
                  I HAVE PAID
                </button>
              </div>
            </div>
          </div>
        )}
"""

content = re.sub(
    r"({\/\* Project Create Modal \*\/})",
    upi_modal_code + r"\n        \1",
    content
)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done UPI Setup")
