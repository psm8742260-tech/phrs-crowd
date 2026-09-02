const fs = require('fs');
const file = '/app/applet/src/components/tabs/IamTab.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldPromptCode = `            {/* Settings Icon and Admin Panel Overlay */}
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => {
                  const savedEmail = localStorage.getItem('phrs_admin_email');
                  if (savedEmail === 'psm8742260@gmail.com') {
                    setShowAdminPanel(true);
                  } else {
                    const email = window.prompt("Enter Admin Email for Access:");
                    if (email === 'psm8742260@gmail.com') {
                      localStorage.setItem('phrs_admin_email', email);
                      setShowAdminPanel(true);
                    } else if (email) {
                      alert("Access Denied: Unauthorized Email");
                    }
                  }
                }}
                className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-sm text-slate-400 hover:text-indigo-600 transition-all"
                title="Admin Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>`;

const stateCode = `  const [isLoading, setIsLoading] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [pwaVersion, setPwaVersion] = useState('1.0.0');`;

const newStateCode = `  const [isLoading, setIsLoading] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [pwaVersion, setPwaVersion] = useState('1.0.0');`;

const newPromptCode = `            {/* Settings Icon */}
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => {
                  const savedEmail = localStorage.getItem('phrs_admin_email');
                  if (savedEmail === 'psm8742260@gmail.com') {
                    setShowAdminPanel(true);
                  } else {
                    setAdminError('');
                    setAdminEmailInput('');
                    setShowAuthPrompt(true);
                  }
                }}
                className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-sm text-slate-400 hover:text-indigo-600 transition-all"
                title="Admin Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Custom Admin Auth Prompt (iFrame safe) */}
            {showAuthPrompt && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-fade-in border border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Lock className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Admin Authentication</h3>
                      <p className="text-[10px] text-slate-500 font-mono">Restricted Access Zone</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">ENTER ADMIN EMAIL</label>
                      <input 
                        type="email" 
                        value={adminEmailInput}
                        onChange={(e) => {
                          setAdminEmailInput(e.target.value);
                          setAdminError('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (adminEmailInput.trim() === 'psm8742260@gmail.com') {
                              localStorage.setItem('phrs_admin_email', adminEmailInput.trim());
                              setShowAuthPrompt(false);
                              setShowAdminPanel(true);
                            } else {
                              setAdminError('Access Denied: Unauthorized Email');
                            }
                          }
                        }}
                        placeholder="admin@phrscrowd.local"
                        className="w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono bg-slate-50 border-slate-300 text-slate-900"
                      />
                      {adminError && <p className="text-[10px] font-mono text-rose-500 mt-1">{adminError}</p>}
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowAuthPrompt(false)}
                        className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg transition"
                      >
                        CANCEL
                      </button>
                      <button 
                        onClick={() => {
                          if (adminEmailInput.trim() === 'psm8742260@gmail.com') {
                            localStorage.setItem('phrs_admin_email', adminEmailInput.trim());
                            setShowAuthPrompt(false);
                            setShowAdminPanel(true);
                          } else {
                            setAdminError('Access Denied: Unauthorized Email');
                          }
                        }}
                        className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
                      >
                        VERIFY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}`;

content = content.replace(oldPromptCode, newPromptCode);
content = content.replace(stateCode, newStateCode);

fs.writeFileSync(file, content);
console.log("Patched successfully!");
