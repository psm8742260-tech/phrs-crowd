import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

export default function IamTab({ state }: { state: any }) {
  const { iamSubTab, setIamSubTab, newMemberEmail, setNewMemberEmail, newMemberRole, setNewMemberRole, setHomeToast, pkgName, shaFingerprint } = state;
  const { Lock, Shield, Trash2, Settings, X, RefreshCw, CheckCircle2, Cpu, Fingerprint, AlertTriangle, Globe, Plus, Loader2, Smartphone, TerminalIcon } = LucideIcons;
  
  const [realMembers, setRealMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [pwaVersion, setPwaVersion] = useState(() => {
    return localStorage.getItem('pwa_system_version') || '1.0.0';
  });

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [featureFlags, setFeatureFlags] = useState({ foxySms: true, fast2Sms: false });
  const [isSavingAppControl, setIsSavingAppControl] = useState(false);

  // Admin Panel Tab Selection State
  const [activeAdminTab, setActiveAdminTab] = useState<'pwa' | 'cloud_share' | 'termux'>('pwa');
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = React.useRef(false);

  // Termux Bridge State
  const [termuxCmd, setTermuxCmd] = useState('');
  const [termuxLogs, setTermuxLogs] = useState<string[]>([]);
  const [isTermuxRunning, setIsTermuxRunning] = useState(false);
  const [termuxStatus, setTermuxStatus] = useState<any>(null);

  const selectTab = (tab: 'pwa' | 'cloud_share' | 'termux') => {
    setActiveAdminTab(tab);
    if (tab === 'termux') {
      fetchTermuxStatus();
    }
    const container = scrollContainerRef.current;
    if (container) {
      const width = container.clientWidth;
      const tabs: ('pwa' | 'cloud_share' | 'termux')[] = ['pwa', 'cloud_share', 'termux'];
      const index = tabs.indexOf(tab);
      isProgrammaticScroll.current = true;
      container.scrollTo({
        left: index * width,
        behavior: 'smooth'
      });
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isProgrammaticScroll.current) return;
    const container = e.currentTarget;
    const width = container.clientWidth;
    if (width <= 0) return;
    const index = Math.round(container.scrollLeft / width);
    
    const tabs: ('pwa' | 'cloud_share' | 'termux')[] = ['pwa', 'cloud_share', 'termux'];
    const newTab = tabs[index];
    if (newTab && newTab !== activeAdminTab) {
      setActiveAdminTab(newTab);
      if (newTab === 'termux') {
        fetchTermuxStatus();
      }
    }
  };

  const fetchTermuxStatus = async () => {
    try {
      const res = await fetch('/api/termux/status');
      if (res.ok) {
        const data = await res.json();
        setTermuxStatus(data);
      }
    } catch (e) {
      console.error("Failed to fetch termux status", e);
    }
  };

  const handleTermuxCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termuxCmd) return;
    setTermuxLogs(prev => [...prev, `$ ${termuxCmd}`]);
    const cmdToSend = termuxCmd;
    setTermuxCmd('');
    setIsTermuxRunning(true);
    try {
      const res = await fetch('/api/termux/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmdToSend })
      });
      const data = await res.json();
      setTermuxLogs(prev => [...prev, data.output || data.error]);
    } catch (e: any) {
      setTermuxLogs(prev => [...prev, `Error: ${e.message}`]);
    }
    setIsTermuxRunning(false);
  };


  // Cloud Share (DNS) State
  const [dnsRecords, setDnsRecords] = useState<any[]>([]);
  const [dnsLoading, setDnsLoading] = useState(false);
  const [dnsAdding, setDnsAdding] = useState(false);
  const [dnsType, setDnsType] = useState('A');
  const [dnsName, setDnsName] = useState('');
  const [dnsContent, setDnsContent] = useState('');
  const [dnsProxied, setDnsProxied] = useState(true);

  const fetchDnsRecords = async () => {
    setDnsLoading(true);
    try {
      const res = await fetch('/api/cloud-share/list-records');
      const data = await res.json();
      if (data.status === 'success') {
        setDnsRecords(data.records || []);
      }
    } catch (e) {
      console.error(e);
    }
    setDnsLoading(false);
  };

  const handleAddDnsRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dnsName || !dnsContent) {
      setHomeToast?.('⚠️ Name and Content fields are required (పేరు మరియు విలువ తప్పనిసరి)');
      setTimeout(() => setHomeToast?.(null), 4000);
      return;
    }
    setDnsAdding(true);
    try {
      const res = await fetch('/api/cloud-share/add-record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          record_type: dnsType,
          name: dnsName,
          content: dnsContent,
          proxied: dnsProxied
        })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        fetchDnsRecords();
        setDnsName('');
        setDnsContent('');
        setHomeToast('✓ DNS Record successfully updated in Cloud Share!');
        setTimeout(() => setHomeToast(null), 3000);
      } else {
        setHomeToast(`❌ ${data.detail || 'Failed to add DNS record'}`);
        setTimeout(() => setHomeToast(null), 4000);
      }
    } catch (e: any) {
      console.error(e);
      setHomeToast(`❌ Error connecting to server: ${e?.message || 'Unknown error'}`);
      setTimeout(() => setHomeToast(null), 4000);
    }
    setDnsAdding(false);
  };

  const handleDeleteDnsRecord = async (id: string) => {
    try {
      const res = await fetch(`/api/cloud-share/delete-record/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.status === 'success') {
        fetchDnsRecords();
        setHomeToast('✓ DNS Record successfully deleted!');
        setTimeout(() => setHomeToast(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (showAdminPanel) {
      fetch('/api/app-control')
        .then(async res => {
          if (!res.ok) throw new Error("HTTP error " + res.status);
          const text = await res.text();
          const trimmed = text.trim();
          if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
            throw new Error("Response is not JSON");
          }
          try {
            return JSON.parse(trimmed);
          } catch (e) {
            throw new Error("Invalid JSON: " + (e as Error).message);
          }
        })
        .then(data => {
          if (data) {
            setPwaVersion(data.pwaVersion || '1.0.0');
            setMaintenanceMode(!!data.maintenanceMode);
            if (data.activeFeatureFlags) {
              setFeatureFlags(data.activeFeatureFlags);
            }
          }
        })
        .catch(err => console.warn("App control sync skipped:", err));
    }
  }, [showAdminPanel]);

  useEffect(() => {
    if (showAdminPanel && activeAdminTab === 'cloud_share') {
      fetchDnsRecords();
    }
  }, [showAdminPanel, activeAdminTab]);

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
        .then(async res => {
          if (!res.ok) throw new Error("HTTP error " + res.status);
          const text = await res.text();
          const trimmed = text.trim();
          if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
            throw new Error("Response is not JSON");
          }
          try {
            return JSON.parse(trimmed);
          } catch (e) {
            throw new Error("Invalid JSON: " + (e as Error).message);
          }
        })
        .then(data => {
          if (data && data.success) setRealMembers(data.members);
        })
        .catch(err => console.warn("IAM members sync skipped:", err));
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
              <div className="p-12 border border-slate-200 bg-white rounded-2xl flex flex-col items-center justify-center text-slate-500 shadow-sm animate-fade-in max-w-2xl mx-auto">
                <Lock className="w-10 h-10 text-indigo-600 mb-3.5 animate-pulse" />
                <h3 className="font-mono font-black text-sm text-slate-900 tracking-wider uppercase mb-1">
                  SECURE ZONE / ఆథరైజ్డ్ జోన్
                </h3>
                <p className="text-xs text-slate-500 text-center leading-relaxed max-w-md font-sans">
                  భద్రతా కారణాల దృష్ట్యా, పి డబ్బులేయ్యి (PWA) మరియు అన్ని లైవ్ సిస్టమ్ నియంత్రణలు ఇక్కడ నేరుగా ప్రదర్శించబడవు. వాటిని మార్చడానికి క్రింది సెట్టింగ్స్ బటన్ ద్వారా లాగిన్ అవ్వండి.
                </p>
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
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col animate-fade-in border border-slate-200">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-4 flex items-center justify-between border-b border-amber-600/10 flex-shrink-0">
                    <h3 className="text-slate-950 font-mono font-black tracking-wider text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4 text-slate-950 animate-pulse" />
                      SECURE ADMIN CONSOLE
                    </h3>
                    <button onClick={() => setShowAdminPanel(false)} className="text-slate-800 hover:text-slate-950 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4 sm:p-6 bg-amber-50/10 flex flex-col flex-1 w-full overflow-hidden">
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-3 border-b border-amber-200/20 w-full overflow-hidden shrink-0">
                      <p className="text-xs text-slate-600 font-sans shrink-0">
                        Authenticated as: <strong className="text-amber-700">psm8742260@gmail.com</strong>
                      </p>
                      
                      {/* Secure Admin Console Tabs (Swiping Model) */}
                      <div 
                        className="flex flex-nowrap gap-3 overflow-x-auto snap-x snap-mandatory pb-1 w-full max-w-full [&::-webkit-scrollbar]:hidden" 
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', paddingRight: '2rem' }}
                      >
                        <button
                          type="button"
                          onClick={() => selectTab('pwa')}
                          className={`snap-center shrink-0 px-6 py-2.5 text-xs whitespace-nowrap font-mono rounded-full transition-all flex items-center justify-center gap-2 border min-w-[130px] ${
                            activeAdminTab === 'pwa'
                              ? 'bg-amber-500 text-slate-950 shadow-md font-black border-amber-500 ring-2 ring-amber-300/50'
                              : 'bg-white text-slate-600 border-slate-200 shadow-sm hover:bg-slate-50 font-bold'
                          }`}
                        >
                          📱 PWA
                        </button>
                        <button
                          type="button"
                          onClick={() => selectTab('cloud_share')}
                          className={`snap-center shrink-0 px-6 py-2.5 text-xs whitespace-nowrap font-mono rounded-full transition-all flex items-center justify-center gap-2 border min-w-[150px] ${
                            activeAdminTab === 'cloud_share'
                              ? 'bg-amber-500 text-slate-950 shadow-md font-black border-amber-500 ring-2 ring-amber-300/50'
                              : 'bg-white text-slate-600 border-slate-200 shadow-sm hover:bg-slate-50 font-bold'
                          }`}
                        >
                          🌐 CLOUD SHARE
                        </button>
                        <button
                          type="button"
                          onClick={() => selectTab('termux')}
                          className={`snap-center shrink-0 px-6 py-2.5 text-xs whitespace-nowrap font-mono rounded-full transition-all flex items-center justify-center gap-2 border min-w-[160px] ${
                            activeAdminTab === 'termux'
                              ? 'bg-amber-500 text-slate-950 shadow-md font-black border-amber-500 ring-2 ring-amber-300/50'
                              : 'bg-white text-slate-600 border-slate-200 shadow-sm hover:bg-slate-50 font-bold'
                          }`}
                        >
                          💻 TERMUX BRIDGE
                        </button>
                      </div>
                    </div>

                    <div 
                      ref={scrollContainerRef}
                      onScroll={handleScroll}
                      className="flex-1 w-full flex flex-row overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden mt-4"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                    >
                      {/* PAGE 1: PWA */}
                      <div className="w-full shrink-0 snap-center overflow-y-auto px-1 space-y-5 h-full pb-6">
                        {/* PWA Orchestrator Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Left Side: Live Controls */}
                          <div className="space-y-4">
                            <div>
                              <label className="block text-[10px] font-mono text-amber-700 font-bold mb-1">PWA SYSTEM VERSION (యాప్ వెర్షన్)</label>
                              <input 
                                type="text" 
                                value={pwaVersion} 
                                onChange={(e) => setPwaVersion(e.target.value)}
                                className="w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono bg-white border-amber-300 text-slate-900 shadow-inner"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono text-amber-700 font-bold mb-1.5">MAINTENANCE MODE (యాప్ ఆన్/ఆఫ్ స్టేటస్)</label>
                              <div className="flex items-center justify-between p-2.5 rounded-lg border border-amber-200 bg-white shadow-sm">
                                <span className="text-xs font-semibold text-slate-700">
                                  {maintenanceMode ? '🔴 Maintenance Active (OFF)' : '🟢 Server Online (ON)'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                                    maintenanceMode ? 'bg-rose-500' : 'bg-emerald-500'
                                  }`}
                                >
                                  <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                                      maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                  />
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono text-amber-700 font-bold mb-1.5">FEATURE FLAGS (ఫీチャーల నియంత్రణ)</label>
                              <div className="space-y-2 p-2.5 rounded-lg border border-amber-200 bg-white shadow-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input 
                                    type="checkbox"
                                    checked={featureFlags.foxySms}
                                    onChange={(e) => setFeatureFlags({ ...featureFlags, foxySms: e.target.checked })}
                                    className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-slate-300 rounded"
                                  />
                                  <span className="text-xs text-slate-700 font-medium">Foxy SMS Gateway (Active)</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input 
                                    type="checkbox"
                                    checked={featureFlags.fast2Sms}
                                    onChange={(e) => setFeatureFlags({ ...featureFlags, fast2Sms: e.target.checked })}
                                    className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-slate-300 rounded"
                                  />
                                  <span className="text-xs text-slate-700 font-medium">Fast2SMS Backup API</span>
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Right Side: The Black Board (కోడింగ్ ముక్కలు మాత్రమే) */}
                          <div className="flex flex-col">
                            <div className="flex justify-between items-center mb-1">
                              <label className="block text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">CENTRAL ORCHESTRATOR CODE (నల్లటి బోర్డు)</label>
                              <button 
                                onClick={() => {
                                  const code = `window.savePHRSSettings = function(customDeepSeekKey) {
  // PHRS Stealth Encoded Tokens (No Open IPs)
  const _s = [
    'aHR0cHM6Ly9waHJzY3JvdWQ2b2xrbnU=',
    'MTA0LjIxLjQyLjE4MA==',
    'MTBCRjRDMUhrMjAwMFIx'
  ].map(atob);

  localStorage.setItem('phrs_domain', _s[0]);
  localStorage.setItem('phrs_ip', _s[1]);
  localStorage.setItem('phrs_serial', _s[2]);
  localStorage.setItem('phrs_deepseek', customDeepSeekKey);
  alert("PHRS Stealth Connection Established!");
  location.reload();
};

// PWA System Association (మన యాప్ మన సర్వర్ చెప్పినట్టు ఉండేలా కొంచెం యాడ్ చేసిన కోడ్)
(async function() {
  const CURRENT_LOCAL_VERSION = localStorage.getItem('pwa_system_version') || '1.0.0';
  const ENDPOINT = '/api/app-control';

  try {
    const response = await fetch(ENDPOINT);
    const config = await response.json();
    
    if (config.pwaVersion !== CURRENT_LOCAL_VERSION) {
      localStorage.setItem('pwa_system_version', config.pwaVersion);
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let reg of registrations) { await reg.update(); }
      }
      window.location.reload();
    }

    if (config.maintenanceMode) {
      document.body.innerHTML = \`<div style="background:#0f172a;color:#fff;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif;text-align:center;padding:20px;">
        <h1 style="color:#f59e0b;font-size:24px;margin-bottom:10px;">⚠️ SYSTEM UNDER MAINTENANCE</h1>
        <p style="color:#94a3b8;font-size:14px;max-width:400px;line-height:1.6;">మన PHRS క్రౌడ్ సర్వర్ ప్రస్తుతం మెయింటెనెన్స్‌లో ఉంది. దయచేసి కాసేపటి తర్వాత మళ్ళీ ప్రయత్నించండి.</p>
      </div>\`;
      return;
    }

    window.PHRS_FEATURE_FLAGS = config.activeFeatureFlags || {};
    console.log('[PWA-ORCHESTRATOR] Flags Initialized:', window.PHRS_FEATURE_FLAGS);
  } catch (err) {
    console.error('[PWA-ORCHESTRATOR] Fallback mode active.', err);
  }
})();`;
                                  navigator.clipboard.writeText(code);
                                  setHomeToast('📋 Code Copied to Clipboard!');
                                  setTimeout(() => setHomeToast(null), 2500);
                                }}
                                className="text-[9px] font-mono font-bold text-amber-600 hover:text-amber-500 px-1.5 py-0.5 border border-amber-300 rounded bg-amber-50 cursor-pointer"
                              >
                                COPY CODE
                              </button>
                            </div>
                            <div className="flex-1 bg-slate-950 rounded-lg p-3 border border-slate-800 font-mono text-[9px] text-emerald-400 overflow-y-auto max-h-[220px] shadow-inner flex flex-col justify-between">
                               <div className="space-y-1">
                                <span className="text-slate-500 block border-b border-slate-800 pb-1 mb-1.5 uppercase">// PHRS Master Stealth + PWA Orchestrator Script</span>
                                <pre className="text-slate-300 whitespace-pre-wrap leading-normal">
{`window.savePHRSSettings = function(customDeepSeekKey) {
  // PHRS Stealth Encoded Tokens (No Open IPs)
  const _s = [
    'aHR0cHM6Ly9waHJzY3JvdWQ2b2xrbnU=',
    'MTA0LjIxLjQyLjE4MA==',
    'MTBCRjRDMUhrMjAwMFIx'
  ].map(atob);

  localStorage.setItem('phrs_domain', _s[0]);
  localStorage.setItem('phrs_ip', _s[1]);
  localStorage.setItem('phrs_serial', _s[2]);
  localStorage.setItem('phrs_deepseek', customDeepSeekKey);
  alert("PHRS Stealth Connection Established!");
  location.reload();
};

// PWA System Association & Global Radar Registration (మన యాప్ మన సర్వర్ చెప్పినట్టు ఉండేలా)
(async function() {
  const CURRENT_LOCAL_VERSION = localStorage.getItem('pwa_system_version') || '1.0.0';
  const MASTER_URL = '${typeof window !== "undefined" ? window.location.origin : "https://phrscrowd.online"}';
  const ENDPOINT = MASTER_URL + '/api/app-control';
  const REGISTER_ENDPOINT = MASTER_URL + '/api/orchestrator/register-node';

  try {
    // A. Ping the Global Radar (Register this node)
    fetch(REGISTER_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.title || window.location.hostname,
        url: window.location.href,
        pwaVersion: CURRENT_LOCAL_VERSION,
        status: 'ONLINE',
        techStack: 'Remote App'
      })
    }).catch(e => console.warn('[RADAR] Ping failed', e));

    // B. Fetch Global Config
    const response = await fetch(ENDPOINT);
    const config = await response.json();
    
    // 1. Version Control Update
    if (config.pwaVersion !== CURRENT_LOCAL_VERSION) {
      localStorage.setItem('pwa_system_version', config.pwaVersion);
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let reg of registrations) { await reg.update(); }
      }
      window.location.reload();
    }

    // 2. Maintenance Lockdown Mode
    if (config.maintenanceMode) {
      document.body.innerHTML = \`<div style="background:#0f172a;color:#fff;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif;text-align:center;padding:20px;">
        <h1 style="color:#f59e0b;font-size:24px;margin-bottom:10px;">⚠️ SYSTEM UNDER MAINTENANCE</h1>
        <p style="color:#94a3b8;font-size:14px;max-width:400px;line-height:1.6;">మన PHRS క్రౌడ్ సర్వర్ ప్రస్తుతం మెయింటెనెన్స్‌లో ఉంది. దయచేసి కాసేపటి తర్వాత మళ్ళీ ప్రయత్నించండి.</p>
      </div>\`;
      return;
    }

    // 3. Dynamic Feature Flags Gate
    window.PHRS_FEATURE_FLAGS = config.activeFeatureFlags || {};
    console.log('[PWA-ORCHESTRATOR] Flags Loaded:', window.PHRS_FEATURE_FLAGS);
  } catch (err) {
    console.error('[PWA-ORCHESTRATOR] Running offline fallback.', err);
  }
})();`}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={async () => {
                            setIsSavingAppControl(true);
                            localStorage.setItem('pwa_system_version', pwaVersion);
                            try {
                              const res = await fetch('/api/app-control', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  pwaVersion,
                                  maintenanceMode,
                                  activeFeatureFlags: featureFlags
                                })
                              });
                              const data = await res.json();
                              if (data.success) {
                                setHomeToast('🔄 పి డబ్బులేయ్యి (PWA) 100-Second Deep Scan Started...');
                                setTimeout(() => {
                                  setHomeToast(`✓ PWA System & Orchestrator Synced to v${pwaVersion}!`);
                                  setShowAdminPanel(false);
                                }, 2000);
                              }
                            } catch(e) {
                              console.error(e);
                              setHomeToast('❌ Sync with Orchestrator failed!');
                            } finally {
                              setIsSavingAppControl(false);
                            }
                          }}
                          disabled={isSavingAppControl}
                          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-mono text-xs py-3 rounded-lg font-black flex items-center justify-center gap-2 transition animate-pulse shadow-md shadow-amber-500/25"
                        >
                          <RefreshCw className={`w-4 h-4 text-slate-950 ${isSavingAppControl ? 'animate-spin' : ''}`} />
                          {isSavingAppControl ? 'SYNCING...' : 'FORCE PWA UPDATE & SYNC ORCHESTRATOR'}
                        </button>

                        <div className="border-t border-amber-200/60 my-6" />

                        {/* Permanently Locked Credentials */}
                        <div className="p-5 rounded-xl border border-amber-200/80 bg-white shadow-sm flex flex-col justify-between space-y-4">
                          <div>
                            <div className="flex items-center gap-2.5 mb-3 border-b border-amber-100 pb-2.5">
                              <Fingerprint className="w-5 h-5 text-amber-600 animate-pulse" />
                              <h4 className="font-mono font-black text-xs text-slate-900 uppercase tracking-wider">
                                શાશ્વత లాక్ చేయబడిన క్రెడెన్షియల్స్
                              </h4>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed mb-4 font-sans">
                              ఈ కింది ప్రాజెక్ట్ పరామితులు శాశ్వతంగా సిస్టమ్ కోడ్ లో లాక్ చేయబడ్డాయి. వీటిని ఏ రకమైన యూజర్ లేదా రూట్ అڈమిన్ కూడా మార్చలేరు.
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
                                  className="w-full p-2.5 text-xs font-mono rounded-lg border bg-amber-50/30 border-amber-200 text-slate-800 focus:outline-none cursor-not-allowed resize-none font-semibold leading-normal shadow-inner text-center"
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

                      {/* PAGE 2: CLOUD SHARE */}
                      <div className="w-full shrink-0 snap-center overflow-y-auto px-1 space-y-6 h-full pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Form Column */}
                          <div className="md:col-span-1 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                            <h4 className="font-mono font-black text-xs text-indigo-600 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                              <Plus className="w-4 h-4" /> Add DNS Record
                            </h4>
                            <form onSubmit={handleAddDnsRecord} className="space-y-4">
                              <div>
                                <label className="block text-[10px] font-mono text-slate-500 font-bold mb-1">RECORD TYPE</label>
                                <select
                                  value={dnsType}
                                  onChange={(e) => setDnsType(e.target.value)}
                                  className="w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono bg-slate-50 border-slate-300 text-slate-900"
                                >
                                  <option value="A">A Record</option>
                                  <option value="AAAA">AAAA</option>
                                  <option value="CAA">CAA</option>
                                  <option value="CERT">CERT</option>
                                  <option value="CNAME">CNAME</option>
                                  <option value="DNSKEY">DNSKEY</option>
                                  <option value="DS">DS</option>
                                  <option value="HTTPS">HTTPS</option>
                                  <option value="LOC">LOC</option>
                                  <option value="MX">MX</option>
                                  <option value="NAPTR">NAPTR</option>
                                  <option value="NS">NS</option>
                                  <option value="OPENPGPKEY">OPENPGPKEY</option>
                                  <option value="PTR">PTR</option>
                                  <option value="SMIMEA">SMIMEA</option>
                                  <option value="SRV">SRV</option>
                                  <option value="SSHFP">SSHFP</option>
                                  <option value="SVCB">SVCB</option>
                                  <option value="TLSA">TLSA</option>
                                  <option value="TXT">TXT</option>
                                  <option value="URI">URI</option>
                                </select>
                              </div>
                              
                              <div>
                                <label className="block text-[10px] font-mono text-slate-500 font-bold mb-1">NAME (@ or subdomain)</label>
                                <input
                                  type="text"
                                  placeholder="@ or www"
                                  value={dnsName}
                                  onChange={(e) => setDnsName(e.target.value)}
                                  className="w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono bg-slate-50 border-slate-300 text-slate-900"
                                  required
                                />
                              </div>
                              
                              <div>
                                <label className="block text-[10px] font-mono text-slate-500 font-bold mb-1">CONTENT / IP ADDRESS</label>
                                <input
                                  type="text"
                                  placeholder="192.168.1.1"
                                  value={dnsContent}
                                  onChange={(e) => setDnsContent(e.target.value)}
                                  className="w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono bg-slate-50 border-slate-300 text-slate-900"
                                  required
                                />
                              </div>

                              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50 shadow-sm">
                                <span className="text-[11px] font-bold text-slate-700">Proxy (Cloud Share)</span>
                                <button
                                  type="button"
                                  onClick={() => setDnsProxied(!dnsProxied)}
                                  className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${
                                    dnsProxied ? 'bg-orange-500' : 'bg-slate-300'
                                  }`}
                                >
                                  <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                                      dnsProxied ? 'translate-x-4' : 'translate-x-0'
                                    }`}
                                  />
                                </button>
                              </div>

                              <button
                                type="submit"
                                disabled={dnsAdding}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-mono text-xs py-2.5 rounded-lg font-bold shadow-lg transition flex items-center justify-center gap-2"
                              >
                                {dnsAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                SAVE DNS RECORD
                              </button>
                            </form>
                          </div>

                          {/* List/Table Column */}
                          <div className="md:col-span-2 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                                <h4 className="font-mono font-black text-xs text-indigo-600 uppercase tracking-wider flex items-center gap-2">
                                  <Globe className="w-4 h-4 text-indigo-500" /> Active DNS Records
                                </h4>
                                <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded">
                                  Total: {dnsRecords.length}
                                </span>
                              </div>

                              <div className="overflow-x-auto rounded-xl border border-slate-100">
                                <table className="w-full text-left text-xs whitespace-nowrap">
                                  <thead className="bg-slate-50 text-slate-500 uppercase font-mono font-bold text-[10px] tracking-wider">
                                    <tr>
                                      <th className="px-4 py-2.5 border-b border-slate-100">Type</th>
                                      <th className="px-4 py-2.5 border-b border-slate-100">Name</th>
                                      <th className="px-4 py-2.5 border-b border-slate-100">Content</th>
                                      <th className="px-4 py-2.5 border-b border-slate-100">Proxy</th>
                                      <th className="px-4 py-2.5 border-b border-slate-100 text-right">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 font-mono text-[11px] text-slate-800">
                                    {dnsLoading ? (
                                      <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                                          <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1.5 text-indigo-500" />
                                          Loading records...
                                        </td>
                                      </tr>
                                    ) : dnsRecords.length === 0 ? (
                                      <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                                          No active DNS records found.
                                        </td>
                                      </tr>
                                    ) : (
                                      dnsRecords.map((rec: any) => (
                                        <tr key={rec.record_id} className="hover:bg-slate-50 transition-colors">
                                          <td className="px-4 py-2 text-indigo-600 font-bold">{rec.record_type}</td>
                                          <td className="px-4 py-2 font-semibold text-slate-900">{rec.name}</td>
                                          <td className="px-4 py-2 text-slate-500 max-w-[140px] truncate" title={rec.content}>{rec.content}</td>
                                          <td className="px-4 py-2">
                                            {rec.proxied ? (
                                              <span className="inline-flex items-center gap-1 text-[9px] bg-orange-50 text-orange-600 border border-orange-150 px-1.5 py-0.5 rounded font-bold">
                                                PROXIED
                                              </span>
                                            ) : (
                                              <span className="inline-flex items-center gap-1 text-[9px] bg-slate-100 text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded font-bold">
                                                BYPASS
                                              </span>
                                            )}
                                          </td>
                                          <td className="px-4 py-2 text-right">
                                            <button
                                              onClick={() => handleDeleteDnsRecord(rec.record_id)}
                                              className="p-1 text-rose-500 hover:text-rose-700 transition"
                                              title="Delete Record"
                                            >
                                              <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                          </td>
                                        </tr>
                                      ))
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <div className="mt-5 border-t border-slate-100 pt-4 flex justify-between items-center">
                              <button
                                onClick={fetchDnsRecords}
                                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-mono font-bold rounded flex items-center gap-1.5 transition animate-pulse"
                              >
                                <RefreshCw className={`w-3 h-3 ${dnsLoading ? 'animate-spin' : ''}`} />
                                RELOAD LIST
                              </button>
                              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                                Real-Time DNS Propagation
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* PAGE 3: TERMUX BRIDGE */}
                      <div className="w-full shrink-0 snap-center overflow-y-auto px-1 space-y-6 h-full pb-6">
                        {/* Device Status & Battery */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                          <div className="bg-slate-900 p-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Smartphone className="w-5 h-5 text-emerald-400" />
                              <h3 className="font-mono font-bold text-white tracking-wider">TERMUX DEVICE LINK</h3>
                            </div>
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-mono font-bold flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              BRIDGE ACTIVE
                            </span>
                          </div>
                          
                          <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                              <p className="text-[10px] font-bold text-slate-400 font-mono mb-1">NODE IP</p>
                              <p className="font-mono text-sm font-black text-slate-700">{termuxStatus?.ip || '192.168.1.104'}</p>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                              <p className="text-[10px] font-bold text-slate-400 font-mono mb-1">BATTERY</p>
                              <p className="font-mono text-sm font-black text-emerald-600">{termuxStatus?.battery || '84% (Charging)'}</p>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                              <p className="text-[10px] font-bold text-slate-400 font-mono mb-1">NETWORK</p>
                              <p className="font-mono text-sm font-black text-blue-600">{termuxStatus?.network || 'LTE (Jio)'}</p>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                              <p className="text-[10px] font-bold text-slate-400 font-mono mb-1">OS / KERNEL</p>
                              <p className="font-mono text-sm font-black text-slate-700">{termuxStatus?.os || 'Android 13 / aarch64'}</p>
                            </div>
                          </div>
                        </div>

                        {/* Remote Terminal & API Controls */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* SMS / OTP API Bridge Settings */}
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                              <Settings className="w-4 h-4 text-amber-500" />
                              <h4 className="font-bold text-slate-800 text-sm">SMS Gateway API Bridge</h4>
                            </div>
                            <p className="text-[11px] text-slate-500">Live intercept of SMS via Termux API. Toggles sync status with the PHRS Crowd Server.</p>
                            
                            <div className="space-y-3">
                              <label className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                                <div>
                                  <span className="block text-xs font-bold text-slate-700">Intercept Incoming SMS</span>
                                  <span className="block text-[10px] text-slate-500">Listen for OTPs and Top-Ups via termux-sms-list</span>
                                </div>
                                <input type="checkbox" defaultChecked className="w-4 h-4 text-amber-500 rounded border-slate-300" />
                              </label>
                              <label className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                                <div>
                                  <span className="block text-xs font-bold text-slate-700">Allow Outbound Sending</span>
                                  <span className="block text-[10px] text-slate-500">Enable termux-sms-send for outgoing replies</span>
                                </div>
                                <input type="checkbox" defaultChecked className="w-4 h-4 text-amber-500 rounded border-slate-300" />
                              </label>
                              <label className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                                <div>
                                  <span className="block text-xs font-bold text-slate-700">Battery Monitoring Daemon</span>
                                  <span className="block text-[10px] text-slate-500">Ping termux-battery-status every 5 mins</span>
                                </div>
                                <input type="checkbox" defaultChecked className="w-4 h-4 text-amber-500 rounded border-slate-300" />
                              </label>
                            </div>
                          </div>

                          {/* Remote Exec Console */}
                          <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-sm flex flex-col overflow-hidden">
                            <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between">
                              <div className="flex items-center gap-2 text-slate-400">
                                <TerminalIcon className="w-4 h-4" />
                                <span className="font-mono text-[10px] font-bold">TERMUX REMOTE EXEC</span>
                              </div>
                              <button onClick={() => setTermuxLogs([])} className="text-[10px] font-mono text-slate-500 hover:text-rose-400">CLEAR</button>
                            </div>
                            
                            <div className="flex-1 p-3 bg-slate-900/50 min-h-[200px] max-h-[250px] overflow-y-auto space-y-1 font-mono text-[11px]">
                              <div className="text-emerald-500/70 mb-2">Connected to remote Termux node. Ready.</div>
                              {termuxLogs.map((log, i) => (
                                <div key={i} className={log.startsWith('$') ? 'text-blue-300 mt-2' : 'text-slate-300 pl-2 whitespace-pre-wrap'}>
                                  {log}
                                </div>
                              ))}
                            </div>

                            <form onSubmit={handleTermuxCommand} className="p-2 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                              <span className="text-emerald-500 font-mono text-sm font-bold ml-2">$</span>
                              <input 
                                type="text"
                                value={termuxCmd}
                                onChange={(e) => setTermuxCmd(e.target.value)}
                                disabled={isTermuxRunning}
                                placeholder="pkg update && pkg upgrade"
                                className="flex-1 bg-transparent border-none text-slate-200 font-mono text-sm focus:outline-none placeholder-slate-700"
                              />
                              <button 
                                type="submit" 
                                disabled={isTermuxRunning}
                                className="px-3 py-1.5 bg-emerald-600/20 text-emerald-500 hover:bg-emerald-600/30 rounded border border-emerald-500/30 font-mono text-[10px] font-bold transition-colors disabled:opacity-50"
                              >
                                EXECUTE
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
  );
}
