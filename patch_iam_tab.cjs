const fs = require('fs');
const file = '/app/applet/src/components/tabs/IamTab.tsx';
let content = fs.readFileSync(file, 'utf8');

const settingsIconImport = `const { Lock, Shield, Trash2 } = LucideIcons;`;
content = content.replace(settingsIconImport, `const { Lock, Shield, Trash2, Settings, X, RefreshCw } = LucideIcons;`);

const stateCode = `  const [isLoading, setIsLoading] = useState(false);`;
content = content.replace(stateCode, `  const [isLoading, setIsLoading] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [pwaVersion, setPwaVersion] = useState('1.0.0');
`);

const endTag = `          </div>
        </>
  );
}`;

const adminPanelCode = `            {/* Settings Icon and Admin Panel Overlay */}
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
            </div>

            {/* Admin PWA Update Panel Modal */}
            {showAdminPanel && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in border border-slate-200">
                  <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                    <h3 className="text-white font-mono font-bold tracking-wider text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4 text-indigo-400" />
                      SECURE ADMIN CONSOLE
                    </h3>
                    <button onClick={() => setShowAdminPanel(false)} className="text-slate-400 hover:text-white transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-slate-500 mb-6 font-sans">
                      Authenticated as: <strong className="text-indigo-600">psm8742260@gmail.com</strong>
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-500 mb-1">PWA SYSTEM VERSION</label>
                        <input 
                          type="text" 
                          value={pwaVersion} 
                          onChange={(e) => setPwaVersion(e.target.value)}
                          className="w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono bg-slate-50 border-slate-300 text-slate-900"
                        />
                      </div>
                      <button 
                        onClick={() => {
                          setHomeToast('🔄 100-Second Deep Scan Started...');
                          setTimeout(() => {
                            setHomeToast('✓ PWA System Version Updated to ' + pwaVersion);
                            setShowAdminPanel(false);
                          }, 2500);
                        }}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                      >
                        <RefreshCw className="w-4 h-4" />
                        FORCE PWA UPDATE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
  );
}`;

content = content.replace(endTag, adminPanelCode);
fs.writeFileSync(file, content);
console.log('IamTab.tsx patched successfully');
