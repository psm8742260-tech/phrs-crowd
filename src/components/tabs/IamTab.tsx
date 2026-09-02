import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

export default function IamTab({ state }: { state: any }) {
  const { iamSubTab, setIamSubTab, newMemberEmail, setNewMemberEmail, newMemberRole, setNewMemberRole, setHomeToast } = state;
  const { Lock, Shield, Trash2, Settings, X, RefreshCw } = LucideIcons;
  
  const [realMembers, setRealMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [pwaVersion, setPwaVersion] = useState('1.0.0');


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

            {iamSubTab !== 'IAM' && iamSubTab !== 'Service Accounts' && (
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
}
