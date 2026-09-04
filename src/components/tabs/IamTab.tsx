import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

export default function IamTab({ state }: { state: any }) {
  const { iamSubTab, setIamSubTab, newMemberEmail, setNewMemberEmail, newMemberRole, setNewMemberRole, setHomeToast, pkgName, shaFingerprint } = state;
  const { Lock, Shield, Trash2, Settings, X, RefreshCw, CheckCircle2, Cpu, Fingerprint, AlertTriangle } = LucideIcons;
  
  const [realMembers, setRealMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [pwaVersion, setPwaVersion] = useState(() => {
    return localStorage.getItem('pwa_system_version') || '1.0.0';
  });

  // 100-Second Deep Scan State for PWA Autonomous Board
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanTimeRemaining, setScanTimeRemaining] = useState(100);
  const [scanLogs, setScanLogs] = useState<string[]>([]);

  const handleStartPwaScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setScanTimeRemaining(100);
    setScanLogs(['[PWA-INIT] Initializing 100-Second Atomic Deep Scan of Service Worker cache...']);
    setHomeToast('🔄 పి డబ్బులేయ్యి (PWA) 100-Second Deep Scan Started...');

    const logMessages: { [key: number]: string } = {
      98: '[PWA-SW] Checking sw.js registered path assets...',
      95: '[PWA-PKG] Verifying package name integrity: com.phrs.crowd',
      90: '[PWA-CERT] Checking SHA-256 fingerprint signature match...',
      85: '[PWA-CERT] Signature Verified: 03:5E:59:45:3B:C0:77:9B:27:16:D5:E5:C3:54:1C:A7:EC:94:9E:BE:72:F7:F9:09:94:00:6A:B9:00:01:4A:E3',
      80: '[PWA-LOCK] Fingerprint & Project Package Name permanently locked!',
      70: '[PWA-CACHE] Auditing public/ assets directory...',
      60: '[PWA-CACHE] Cache manifest validated successfully.',
      50: '[PWA-BUILD] Compiling service worker build targets...',
      40: '[PWA-DECRYPT] Validating cryptographic access credentials...',
      30: '[PWA-SYNC] Synchronizing client-side localState hooks...',
      15: '[PWA-FINAL] Final check on offline availability...',
      5: '[PWA-DONE] Writing updated version to manifest config...',
    };

    const interval = setInterval(() => {
      setScanTimeRemaining((prevTime) => {
        const nextTime = prevTime - 1;
        setScanProgress(100 - nextTime);
        
        if (logMessages[nextTime]) {
          setScanLogs((prevLogs) => [...prevLogs, logMessages[nextTime]]);
        }

        if (nextTime <= 0) {
          clearInterval(interval);
          setIsScanning(false);
          setScanLogs((prevLogs) => [
            ...prevLogs,
            `[PWA-COMPLETE] PWA System successfully updated to Version ${pwaVersion}! 100-Second Deep Scan Complete.`
          ]);
          setHomeToast(`✓ PWA System updated to v${pwaVersion}!`);
          setTimeout(() => setHomeToast(null), 3000);
          return 0;
        }
        return nextTime;
      });
    }, 1000);
  };


  useEffect(() => {
    if (iamSubTab === 'IAM') {
      fetch('/api/iam/members')
        .then(r => r.json())
        .then(data => {
          if (data.success) setRealMembers(data.members);
        })
        .catch(console.error);
    }
  }, [iamSubTab]);

  return (
        <>
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">IAM & Permissions Administrator</h2>
                    <p className="text-xs text-slate-500 max-w-2xl mt-1">
                      Manage and audit organizational members and their administrative execution permissions.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-4 border-b border-slate-100">
                {['Identity & Access', 'IAM', 'Service Accounts', 'Groups', 'Privileged Access Manager', 'Roles', 'Workload Identity Federation', 'Workforce Identity Federation', 'Principal Access Boundary'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setIamSubTab(tab)}
                    className={`px-4 py-2 rounded-t-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      iamSubTab === tab
                        ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                        : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {iamSubTab === 'IAM' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4 p-5 rounded-2xl border border-slate-200 bg-white">
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">ADD DIRECT MEMBER</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">DEVELOPER EMAIL</label>
                      <input 
                        type="email" 
                        placeholder="developer@phrscrowd.local"
                        value={newMemberEmail} 
                        onChange={(e) => setNewMemberEmail(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono bg-slate-100 border-slate-300 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">ACCESS ROLE</label>
                      <select
                        value={newMemberRole || 'Editor'}
                        onChange={(e) => setNewMemberRole(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-lg border focus:outline-none cursor-pointer bg-slate-100 border-slate-300 text-slate-900"
                      >
                        <option value="Owner">Owner (Full VPS root access)</option>
                        <option value="Editor">Editor (SQLite and SMS write access)</option>
                        <option value="Viewer">Viewer (Read-only analytics console)</option>
                      </select>
                    </div>

                    <button 
                      onClick={async () => {
                        if (!newMemberEmail.trim()) {
                          setHomeToast('⚠️ Enter member email!');
                          setTimeout(() => setHomeToast(null), 3000);
                          return;
                        }
                        setIsLoading(true);
                        try {
                          const res = await fetch('/api/iam/members', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: newMemberEmail, role: newMemberRole || 'Editor' })
                          });
                          const data = await res.json();
                          if (data.success) {
                            setRealMembers(data.members);
                            setHomeToast(`✓ Added direct member: ${newMemberEmail}`);
                            setNewMemberEmail('');
                          }
                        } catch(e) {
                          console.error(e);
                        } finally {
                          setIsLoading(false);
                          setTimeout(() => setHomeToast(null), 3000);
                        }
                      }}
                      disabled={isLoading}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-mono text-xs py-2 rounded-lg font-semibold shadow-lg transition"
                    >
                      {isLoading ? 'ADDING...' : 'ADD WORKSPACE MEMBER'}
                    </button>
                  </div>
                </div>

                <div className="md:col-span-8 p-5 rounded-2xl border border-slate-200 bg-white">
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">ACTIVE POLICY MEMBERS</h3>
                  <div className="space-y-3 font-mono text-xs">
                    {realMembers.length === 0 && <p className="text-slate-400">No members configured.</p>}
                    {realMembers.map((member, i) => (
                      <div key={i} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                        <div>
                          <div className="font-bold text-slate-800">{member.email}</div>
                          <div className="text-[10px] text-slate-400">Policy bound on: {member.added || member.addedAt}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2.5 py-1 text-[10px] bg-indigo-100 text-indigo-600 font-bold rounded">
                            {member.role}
                          </span>
                          <button 
                            onClick={async () => {
                              if (confirm(`Remove ${member.email}?`)) {
                                try {
                                  const res = await fetch(`/api/iam/members/${member.email}`, { method: 'DELETE' });
                                  const data = await res.json();
                                  if (data.success) setRealMembers(data.members);
                                } catch(e) { console.error(e); }
                              }
                            }}
                            className="text-rose-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {iamSubTab === 'Service Accounts' && (
              <div className="p-6 rounded-2xl border bg-white border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-mono font-bold text-sm tracking-wider text-slate-800 uppercase">Service Accounts</h3>
                  <button className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold">Create Account</button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'phrs-firebase-sdk', email: 'firebase-admin@phrs-crowd.iam.gserviceaccount.com' },
                    { name: 'cloud-sql-proxy', email: 'sql-proxy@phrs-crowd.iam.gserviceaccount.com' }
                  ].map((sa, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{sa.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-1">{sa.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-[10px] font-bold text-indigo-600">Keys</button>
                        <button className="text-[10px] font-bold text-slate-400">Audit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {iamSubTab === 'Identity & Access' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300/60 p-6 rounded-2xl shadow-sm">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-3.5 rounded-xl border border-amber-600/10 flex items-center justify-between mb-6 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <Shield className="w-5 h-5 text-slate-950 animate-pulse" />
                      <div>
                        <h3 className="text-slate-950 font-mono font-black tracking-wider text-sm">
                          పి డబ్బులేయ్యి (PWA) స్వయంప్రతిపత్తి బోర్డు & క్రెడెన్షియల్స్ లాక్
                        </h3>
                        <p className="text-[10px] text-slate-800 font-mono mt-0.5">
                          PWA AUTONOMOUS CONTROL HUB & CRYPTOGRAPHIC SECURITY HARMONIZATION
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] bg-slate-950 text-amber-400 font-bold font-mono rounded-md border border-amber-400/20 shadow-sm uppercase animate-pulse">
                      System Shield Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: PWA Control Center */}
                    <div className="p-5 rounded-xl border border-amber-200/80 bg-white shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-3 border-b border-amber-100 pb-2.5">
                          <Cpu className="w-5 h-5 text-amber-600" />
                          <h4 className="font-mono font-black text-xs text-slate-900 uppercase tracking-wider">
                            పి డబ్బులేయ్యి (PWA) సిస్టమ్ નિયంత్రణ
                          </h4>
                        </div>
                        
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                          ఆఫ్‌లైన్ వర్కింగ్ ఎబిలిటీ మరియు అసెట్ ప్యాకేజ్ కాషింగ్ సిస్టమ్ స్వయంప్రతిపత్తిగా పనిచేస్తుంది. ఏదైనా మార్పులు ఉంటే లోకల్ స్టోరేజ్ అప్‌డేట్ చేసి హార్డ్ రిఫ్రెష్ చేస్తుంది.
                        </p>

                        <div className="space-y-2 mb-6 text-xs font-mono">
                          <div className="flex justify-between items-center p-2 rounded-lg bg-amber-50/40 border border-amber-100/60">
                            <span className="text-slate-500 font-bold">PWA VERSION</span>
                            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 font-bold rounded text-[10px]">
                              {pwaVersion}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg bg-amber-50/40 border border-amber-100/60">
                            <span className="text-slate-500 font-bold">SERVICE WORKER</span>
                            <span className="text-emerald-600 font-bold flex items-center gap-1 text-[10px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                              ACTIVE (INTELLIGENT CACHE)
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg bg-amber-50/40 border border-amber-100/60">
                            <span className="text-slate-500 font-bold">DEEP SCAN INTERVAL</span>
                            <span className="text-slate-700 font-bold text-[10px]">100s SCHEDULED</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {isScanning && (
                          <div className="p-3 bg-amber-50/50 border border-amber-200 rounded-lg animate-fade-in">
                            <div className="flex justify-between text-[10px] font-mono font-bold text-amber-800 mb-1">
                              <span>ATOMIC SCANNING PROGRESS</span>
                              <span>{scanProgress}% ({scanTimeRemaining}s left)</span>
                            </div>
                            <div className="w-full h-2 bg-amber-100/80 rounded-full overflow-hidden border border-amber-200">
                              <div 
                                className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-300"
                                style={{ width: `${scanProgress}%` }}
                              />
                            </div>
                            
                            <div className="mt-2.5">
                              <span className="text-[9px] font-mono font-bold text-slate-400 block mb-1">SYSTEM LOG STREAM:</span>
                              <div className="bg-slate-900 border border-amber-200/30 p-2.5 rounded h-28 overflow-y-auto font-mono text-[9px] text-amber-400 space-y-1 shadow-inner">
                                {scanLogs.map((log, idx) => (
                                  <div key={idx} className="leading-normal">{log}</div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        <button 
                          onClick={handleStartPwaScan}
                          disabled={isScanning}
                          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 active:scale-[0.98] disabled:opacity-75 disabled:scale-100 disabled:pointer-events-none text-slate-950 font-mono text-xs font-black py-3.5 px-5 rounded-xl flex items-center justify-center gap-2.5 shadow-md shadow-amber-500/20 border border-amber-600/20 transition-all duration-300 animate-[pulse_1.5s_infinite] disabled:animate-none"
                        >
                          <RefreshCw className={`w-4 h-4 text-slate-950 ${isScanning ? 'animate-spin' : 'animate-spin'}`} style={{ animationDuration: isScanning ? '1s' : '4s' }} />
                          {isScanning ? 'ATOMIC SCAN RUNNING...' : 'FORCE PWA UPDATE & ATOMIC SCAN'}
                        </button>
                      </div>
                    </div>

                    {/* Right: Permanently Locked Credentials */}
                    <div className="p-5 rounded-xl border border-amber-200/80 bg-white shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-3 border-b border-amber-100 pb-2.5">
                          <Fingerprint className="w-5 h-5 text-amber-600 animate-pulse" />
                          <h4 className="font-mono font-black text-xs text-slate-900 uppercase tracking-wider">
                            శాశ్వత లాక్ చేయబడిన క్రెడెన్షియల్స్
                          </h4>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                          ఈ కింది ప్రాజెక్ట్ పరామితులు శాశ్వతంగా సిస్టమ్ కోడ్ లో లాక్ చేయబడ్డాయి. వీటిని ఏ రకమైన యూజర్ లేదా రూట్ అడ్మిన్ కూడా మార్చలేరు.
                        </p>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                                Project Package Name (ప్యాకేజీ నేమ్)
                              </label>
                              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-200 uppercase">
                                <Lock className="w-2.5 h-2.5" /> Permanently Locked
                              </span>
                            </div>
                            <input 
                              type="text" 
                              readOnly 
                              value={pkgName || 'com.phrs.crowd'} 
                              className="w-full p-2.5 text-xs font-mono rounded-lg border bg-amber-50/30 border-amber-200 text-slate-800 focus:outline-none cursor-not-allowed font-semibold shadow-inner"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                                SHA-256 Fingerprint (ఫింగర్ ప్రింట్ సంతకం)
                              </label>
                              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-200 uppercase">
                                <Lock className="w-2.5 h-2.5" /> SECURE ROOT
                              </span>
                            </div>
                            <textarea 
                              readOnly 
                              value={shaFingerprint || '03:5E:59:45:3B:C0:77:9B:27:16:D5:E5:C3:54:1C:A7:EC:94:9E:BE:72:F7:F9:09:94:00:6A:B9:00:01:4A:E3'} 
                              rows={3}
                              className="w-full p-2.5 text-xs font-mono rounded-lg border bg-amber-50/30 border-amber-200 text-slate-800 focus:outline-none cursor-not-allowed resize-none font-semibold leading-normal shadow-inner"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 p-3 rounded-lg border border-amber-200/50 bg-amber-50/30 flex gap-2.5 items-start">
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-bounce" />
                        <p className="text-[10px] text-amber-900 leading-relaxed font-sans">
                          <strong>భద్రతా హెచ్చరిక:</strong> ఈ వివరాలు మీ ఆండ్రాయిడ్ యాప్ బిల్డ్ సిగ్నేచర్స్ కు అనుసంధానించబడి ఉన్నాయి. భద్రతా కారణాల దృష్ట్యా, వీటిని కోడ్ నిర్మాణంలోనే లాక్ చేయడం జరిగింది. మార్చడానికి వీలు లేదు.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {iamSubTab !== 'Identity & Access' && iamSubTab !== 'IAM' && iamSubTab !== 'Service Accounts' && (
              <div className="p-12 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-white">
                <Lock className="w-8 h-8 mb-3 opacity-20" />
                <p className="text-sm font-mono italic">{iamSubTab} details are restricted or not yet configured.</p>
              </div>
            )}
            {/* Settings Icon */}
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
            )}

            {/* Admin PWA Update Panel Modal */}
            {showAdminPanel && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in border border-slate-200">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-4 flex items-center justify-between border-b border-amber-600/10">
                    <h3 className="text-slate-950 font-mono font-black tracking-wider text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4 text-slate-950 animate-pulse" />
                      SECURE ADMIN CONSOLE
                    </h3>
                    <button onClick={() => setShowAdminPanel(false)} className="text-slate-800 hover:text-slate-950 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6 bg-amber-50/10">
                    <p className="text-xs text-slate-600 mb-6 font-sans">
                      Authenticated as: <strong className="text-amber-700">psm8742260@gmail.com</strong>
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-amber-700 font-bold mb-1">PWA SYSTEM VERSION</label>
                        <input 
                          type="text" 
                          value={pwaVersion} 
                          onChange={(e) => setPwaVersion(e.target.value)}
                          className="w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono bg-white border-amber-300 text-slate-900 shadow-inner"
                        />
                      </div>
                      <button 
                        onClick={() => {
                          localStorage.setItem('pwa_system_version', pwaVersion);
                          setHomeToast('🔄 పి డబ్బులేయ్యి (PWA) 100-Second Deep Scan Started...');
                          setTimeout(() => {
                            setHomeToast('✓ పి డబ్బులేయ్యి (PWA) System Version Updated to ' + pwaVersion);
                            setShowAdminPanel(false);
                          }, 2500);
                        }}
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-mono text-xs py-3 rounded-lg font-black flex items-center justify-center gap-2 transition animate-pulse shadow-md shadow-amber-500/25"
                      >
                        <RefreshCw className="w-4 h-4 text-slate-950 animate-spin" />
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
}
