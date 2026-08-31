import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

export default function ApiBoardTab({ state }: { state: any }) {
  const { isDarkMode, apisSubTab, setApisSubTab, setVpsLogStream, apiKeys, setApiKeys, handleTestAIRoute, isRoutingLoading, routingHistory, activeRouterModel, setActiveRouterModel, activeRouterPrompt, setActiveRouterPrompt } = state;
  const { Key, Search, Book, ShieldCheck, Plus, ExternalLink, Trash2, CheckCircle2 } = LucideIcons;

  const [libraryApis, setLibraryApis] = useState<any[]>([]);
  const [credentials, setCredentials] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddCredModal, setShowAddCredModal] = useState(false);
  const [newCredName, setNewCredName] = useState('');
  const [newCredType, setNewCredType] = useState('API Key');

  const fetchLibrary = async () => {
    try {
      const res = await fetch('/api/apis/library');
      const data = await res.json();
      if (data.success) setLibraryApis(data.apis);
    } catch (e) { console.error(e); }
  };

  const fetchCredentials = async () => {
    try {
      const res = await fetch('/api/apis/credentials');
      const data = await res.json();
      if (data.success) setCredentials(data.credentials);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    if (apisSubTab === 'Library') fetchLibrary();
    if (apisSubTab === 'Credentials') fetchCredentials();
  }, [apisSubTab]);

  const handleAddCredential = async () => {
    if (!newCredName) return;
    try {
      const res = await fetch('/api/apis/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCredName, type: newCredType })
      });
      const data = await res.json();
      if (data.success) {
        setCredentials(prev => [...prev, data.credential]);
        setShowAddCredModal(false);
        setNewCredName('');
        setVpsLogStream(prev => [...prev, `[API] Created new ${newCredType}: ${newCredName}`]);
      }
    } catch (e) { console.error(e); }
  };

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div className={`p-6 rounded-2xl border transition shadow-sm ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Key className="w-6 h-6 text-indigo-600" />
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">APIs & Services</h2>
                <p className="text-xs text-slate-500 max-w-2xl mt-1">
                  Manage and monitor all APIs and credentials used by the PHRS CROWD ecosystem.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-4 border-b border-slate-100">
            {['Enabled APIs & services', 'Library', 'Credentials', 'OAuth consent screen', 'Page usage agreements'].map(tab => (
              <button
                key={tab}
                onClick={() => setApisSubTab(tab)}
                className={`px-4 py-2 rounded-t-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  apisSubTab === tab
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                    : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {apisSubTab === 'Enabled APIs & services' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-6">
              <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">ROUTER API KEYS</h3>
                <div className="space-y-4">
                  {/* ... same input fields ... */}
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">GEMINI PRO API KEY</label>
                    <input type="password" value={apiKeys.gemini} onChange={(e) => setApiKeys(prev => ({...prev, gemini: e.target.value}))} className={`w-full p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">DEEPSEEK CODER API KEY</label>
                    <input type="password" value={apiKeys.deepseek} onChange={(e) => setApiKeys(prev => ({...prev, deepseek: e.target.value}))} className={`w-full p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">OPENAI BACKUP KEY</label>
                    <input type="password" value={apiKeys.openai} onChange={(e) => setApiKeys(prev => ({...prev, openai: e.target.value}))} className={`w-full p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`} />
                  </div>
                  <button onClick={() => { localStorage.setItem('phrs_key_gemini', apiKeys.gemini); localStorage.setItem('phrs_key_deepseek', apiKeys.deepseek); localStorage.setItem('phrs_key_openai', apiKeys.openai); setVpsLogStream(prev => [...prev, '[API] Secure API keys table updated.']); alert('✓ Model definitions saved!'); }} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2 rounded-lg font-semibold transition-all">SAVE MODEL DEFINITIONS</button>
                </div>
              </div>
              <div className={`p-4 rounded-xl border text-xs space-y-2 transition-colors ${isDarkMode ? 'bg-indigo-950/10 border-indigo-900/40 text-indigo-300' : 'bg-indigo-50 border-indigo-100 text-indigo-900'}`}>
                <p className="font-semibold">🚀 Live AI Routing Policy:</p>
                <p className="text-[10px]">Current model distribution routing is set to: <strong>DeepSeek Chat (60%)</strong>, <strong>Gemini 1.5 Flash (40%)</strong>. Failover routes to OpenAI GPT-4o-mini is active.</p>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">DYNAMIC PROXY PLAYGROUND</h3>
                <form onSubmit={handleTestAIRoute} className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-[10px] font-mono text-slate-500 mb-1 font-semibold">CHOOSE TARGET GATEWAY ROUTE</label>
                      <select value={activeRouterModel} onChange={(e) => setActiveRouterModel(e.target.value)} className={`w-full p-2 text-xs rounded-lg border focus:outline-none cursor-pointer ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}><option value="DeepSeek Chat">DeepSeek Chat API Route (V3)</option><option value="Gemini 1.5 Flash">Gemini 1.5 Flash Route (Serverless)</option><option value="OpenAI GPT-4o-mini">OpenAI GPT-4o-mini Backup Router</option></select>
                    </div>
                    <div className="flex-1"><label className="block text-[10px] font-mono text-slate-500 mb-1 font-semibold">ROUTING STRATEGY</label><div className={`p-2 rounded-lg text-xs font-mono border ${isDarkMode ? 'bg-slate-800/40 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-600'}`}>⚡ Latency & Cost Optimization (Auto)</div></div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1 font-semibold">AGENT PROMPT INJECTION PAYLOAD</label>
                    <div className="flex gap-2">
                      <input type="text" required value={activeRouterPrompt} onChange={(e) => setActiveRouterPrompt(e.target.value)} placeholder="e.g. Generate database optimize check command" className={`flex-1 p-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`} />
                      <button type="submit" disabled={isRoutingLoading} className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-mono text-xs px-5 py-2 rounded-lg font-semibold transition">{isRoutingLoading ? 'ROUTING...' : 'TEST ROUTE'}</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">ROUTING TRANSACTION LOGS (TELEMETRY)</h3>
                <div className="space-y-4 font-mono text-xs">
                  {routingHistory.map((item: any, idx: number) => (
                    <div key={idx} className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-950/40 border-slate-900' : 'bg-slate-100/50 border-slate-200'}`}>
                      <div className="flex justify-between items-start mb-2"><span className="text-amber-500 font-bold">&quot;{item.prompt}&quot;</span><span className="text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded">{item.target}</span></div>
                      <p className="text-slate-400 dark:text-slate-300 mb-2 leading-relaxed text-[11px]">{item.response}</p>
                      <div className="flex gap-4 text-[10px] text-slate-500 border-t border-slate-800/10 pt-2 mt-2"><span>Latency: <strong className="text-emerald-400">{item.latency}ms</strong></span><span>Cost: <strong className="text-emerald-400">${item.cost.toFixed(5)}</strong></span><span>Gateway status: <strong>SUCCESS (200)</strong></span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {apisSubTab === 'Library' && (
          <div className="space-y-6">
            <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search for APIs & services..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-9 pr-4 py-2 text-xs rounded-lg border focus:ring-1 focus:ring-indigo-500 outline-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {libraryApis.filter(api => api.name.toLowerCase().includes(searchQuery.toLowerCase())).map(api => (
                  <div key={api.id} className={`p-4 rounded-xl border flex flex-col justify-between transition-all hover:shadow-md ${isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-indigo-500 px-2 py-0.5 bg-indigo-500/10 rounded uppercase tracking-wider">{api.category}</span>
                        {api.enabled && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      </div>
                      <h4 className="font-bold text-sm mb-1">{api.name}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">{api.description}</p>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <button className="flex-1 text-[10px] font-bold py-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-500 transition">MANAGE</button>
                      <button className="px-2 text-slate-400 hover:text-indigo-600 transition"><ExternalLink className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {apisSubTab === 'Credentials' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase">API Credentials & Keys</h3>
                <button 
                  onClick={() => setShowAddCredModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-lg hover:bg-indigo-500 transition shadow-lg"
                >
                  <Plus className="w-3.5 h-3.5" /> CREATE CREDENTIALS
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500">
                      <th className="py-3 px-2 font-semibold uppercase tracking-wider">Name</th>
                      <th className="py-3 px-2 font-semibold uppercase tracking-wider">Type</th>
                      <th className="py-3 px-2 font-semibold uppercase tracking-wider">Creation Date</th>
                      <th className="py-3 px-2 font-semibold uppercase tracking-wider">API Key / Email</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {credentials.map(cred => (
                      <tr key={cred.id} className="border-b border-slate-50 dark:border-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 px-2 font-bold text-slate-800 dark:text-slate-200">{cred.name}</td>
                        <td className="py-4 px-2"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cred.type === 'API Key' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>{cred.type}</span></td>
                        <td className="py-4 px-2 text-slate-500">{cred.creationDate}</td>
                        <td className="py-4 px-2 font-mono text-[10px] text-slate-400">{cred.key || cred.email}</td>
                        <td className="py-4 px-2 text-right">
                          <button className="p-1.5 text-slate-400 hover:text-rose-500 transition"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {showAddCredModal && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
                <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl animate-scale-in ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-lg font-bold mb-4">Create New Credential</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">CREDENTIAL NAME</label>
                      <input 
                        type="text" 
                        value={newCredName}
                        onChange={(e) => setNewCredName(e.target.value)}
                        placeholder="e.g. Android Browser Key"
                        className={`w-full p-2.5 text-xs rounded-lg border focus:ring-1 focus:ring-indigo-500 outline-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">TYPE</label>
                      <select 
                        value={newCredType}
                        onChange={(e) => setNewCredType(e.target.value)}
                        className={`w-full p-2.5 text-xs rounded-lg border outline-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                      >
                        <option value="API Key">API Key</option>
                        <option value="Service Account">Service Account</option>
                        <option value="OAuth 2.0 Client ID">OAuth 2.0 Client ID</option>
                      </select>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button onClick={() => setShowAddCredModal(false)} className="flex-1 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition">CANCEL</button>
                      <button onClick={handleAddCredential} className="flex-1 py-2 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition shadow-lg">CREATE</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {(apisSubTab === 'OAuth consent screen' || apisSubTab === 'Page usage agreements') && (
          <div className={`p-12 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-white`}>
            <ShieldCheck className="w-10 h-10 mb-4 opacity-20" />
            <h3 className="text-sm font-bold text-slate-600 mb-1">{apisSubTab} Configurator</h3>
            <p className="text-xs font-mono text-center max-w-sm">The {apisSubTab} interface is currently under high-security configuration. Please contact your PHRS administrator for direct manual edits.</p>
            <button className="mt-6 px-6 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-full hover:bg-slate-800 transition">REQUEST ACCESS</button>
          </div>
        )}
      </div>
    </>
  );
}

