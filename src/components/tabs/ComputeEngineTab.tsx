import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

export default function ComputeEngineTab({ state }: { state: any }) {
  const { 
    isDarkMode, computeSubTab, setComputeSubTab, setVpsLogStream, 
    isMiniServerRunning, setIsMiniServerRunning, miniServerPort, miniServerIp,
    terminalHistory, setTerminalHistory, terminalInput, setTerminalInput, handleTerminalSubmit,
    appName, setAppName, githubUrl, setGithubUrl, hostedHtml, setHostedHtml,
    appPort, setAppPort, appTech, setAppTech, handleStartDeployment,
    isBuilding, buildProgress, buildLogs, deployments, setActiveVirtualApp,
    simulatedVisitorCount, setHomeToast,
    shortLinks, setShortLinks, linkSlug, setLinkSlug, linkTarget, setLinkTarget
  } = state;

  const { Server, Monitor, Shield, ShoppingCart, Zap, Cpu, HardDrive, Layout, Plus, Play, Square, MoreVertical, Search, Filter, Link: LinkIcon } = LucideIcons;

  const handleCreateShortLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkSlug.trim() || !linkTarget.trim()) return;

    fetch('/api/links/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: linkSlug, target: linkTarget })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setShortLinks((prev: any[]) => {
          const filtered = prev.filter(l => l.slug !== data.link.slug);
          return [...filtered, data.link];
        });
        setHomeToast(`✓ Created short redirect: /go/${data.link.slug}`);
        setLinkSlug('');
        setLinkTarget('');
        setTimeout(() => setHomeToast(null), 3500);
      } else {
        alert(`Error creating link: ${data.error}`);
      }
    })
    .catch(err => {
      console.error("Error creating redirect:", err);
      alert("Failed to communicate with PHRS shortener server.");
    });
  };

  useEffect(() => {
    fetch('/api/links')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setShortLinks(data);
        }
      })
      .catch(err => console.error("Error loading links:", err));
  }, []);

  const [vms, setVms] = useState([
    { id: 'vm-1', name: 'vps-core-node-1', zone: 'asia-south1-a', type: 'e2-medium', internalIp: '10.128.0.2', externalIp: '34.120.45.89', status: 'RUNNING' },
    { id: 'vm-2', name: 'agent-router-vm', zone: 'asia-south1-b', type: 'e2-small', internalIp: '10.128.0.3', externalIp: '35.240.12.204', status: 'RUNNING' },
    { id: 'vm-3', name: 'backup-server', zone: 'asia-south1-a', type: 'f1-micro', internalIp: '10.128.0.4', externalIp: '-', status: 'TERMINATED' },
  ]);

  const [vmSearch, setVmSearch] = useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Info */}
      <div className={`p-6 rounded-2xl border transition shadow-sm ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-3 mb-2">
          <Server className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold tracking-tight">Compute Engine</h2>
        </div>
        <p className="text-xs text-slate-500 max-w-2xl">
          Create and manage virtual machines on PHRS high-performance infrastructure.
        </p>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-100 dark:border-slate-800">
        {['Overview', 'VM instances', 'Instance templates', 'Sole-tenant nodes', 'Machine images', 'TPUs', 'Link Shortener'].map(tab => (
          <button
            key={tab}
            onClick={() => setComputeSubTab(tab)}
            className={`px-4 py-2 rounded-t-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              computeSubTab === tab
                ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                : 'bg-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview - Original VPS Hosting View */}
      {computeSubTab === 'Overview' && (
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 border-b pb-4 border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${isMiniServerRunning ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                  <h3 className="font-mono font-bold text-sm tracking-wide text-slate-800 dark:text-white">PHRS BUILT-IN MINI SERVER CONSOLE</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">Control your mini server directly from this integrated web console.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="px-3 py-1.5 bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 rounded-lg text-xs font-mono text-indigo-600 dark:text-indigo-400">
                  🌐 URL: <strong className="select-all">http://{miniServerIp}:{miniServerPort}</strong>
                </div>
                <button onClick={() => setIsMiniServerRunning(!isMiniServerRunning)} className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${isMiniServerRunning ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                  {isMiniServerRunning ? 'STOP SERVER' : 'START SERVER'}
                </button>
              </div>
            </div>

            {/* Terminal Window */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-inner font-mono">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  <span className="ml-2 font-semibold text-slate-300">phrscrowd-shell@mini-server:~#</span>
                </div>
              </div>
              <div className="p-4 max-h-56 overflow-y-auto space-y-1.5 text-xs">
                {terminalHistory.map((item: any, idx: number) => (
                  <div key={idx} className={`${item.type === 'cmd' ? 'text-indigo-400 font-bold' : 'text-emerald-400'}`}>
                    {item.text}
                  </div>
                ))}
              </div>
              <form onSubmit={handleTerminalSubmit} className="border-t border-slate-800 bg-slate-900/60 p-2 flex items-center gap-2">
                <span className="text-indigo-400 font-bold pl-2">$</span>
                <input type="text" value={terminalInput} onChange={(e) => setTerminalInput(e.target.value)} placeholder="Type command..." className="flex-1 bg-transparent text-slate-200 text-xs focus:outline-none font-mono py-1" />
                <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-mono font-semibold">RUN</button>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <form onSubmit={handleStartDeployment} className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">DEPLOY NEW APP</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1 uppercase">App Name</label>
                    <input type="text" required value={appName} onChange={(e) => setAppName(e.target.value)} className={`w-full p-2 text-xs rounded-lg border outline-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'}`} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1 uppercase">Webpage Code</label>
                    <textarea rows={6} value={hostedHtml} onChange={(e) => setHostedHtml(e.target.value)} className="w-full p-2.5 font-mono text-[10px] rounded-lg border outline-none h-44 bg-slate-900 text-slate-200 border-slate-700" />
                  </div>
                  <button type="submit" disabled={isBuilding} className="w-full bg-indigo-600 text-white font-mono text-xs py-2.5 rounded-lg font-bold shadow-lg">
                    {isBuilding ? 'BUILDING...' : 'DEPLOY APP'}
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:col-span-8">
              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">ACTIVE APP DEPLOYMENTS</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500">
                        <th className="pb-2 px-2">APP NAME</th>
                        <th className="pb-2 px-2">VIRTUAL DOMAIN</th>
                        <th className="pb-2 px-2">VISITORS</th>
                        <th className="pb-2 px-2 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deployments.map((app: any, idx: number) => (
                        <tr key={idx} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                          <td className="py-3 px-2 font-bold">{app.name}</td>
                          <td className="py-3 px-2 text-indigo-500">http://{app.subdomain}.phrs.local</td>
                          <td className="py-3 px-2 text-emerald-500">{idx === 0 ? simulatedVisitorCount : 0}</td>
                          <td className="py-3 px-2 text-right">
                            <button onClick={() => setActiveVirtualApp(app)} className="text-indigo-600 hover:underline">VIEW LIVE</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VM Instances View */}
      {computeSubTab === 'VM instances' && (
        <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded hover:bg-indigo-500 transition">
                <Plus className="w-3.5 h-3.5" /> CREATE INSTANCE
              </button>
              <div className="h-4 border-l border-slate-300"></div>
              <div className="flex gap-2">
                <button className="p-1.5 text-slate-400 hover:text-indigo-600"><Play className="w-4 h-4" /></button>
                <button className="p-1.5 text-slate-400 hover:text-rose-500"><Square className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Filter instances..."
                value={vmSearch}
                onChange={(e) => setVmSearch(e.target.value)}
                className={`w-full pl-9 pr-4 py-1.5 text-xs rounded border outline-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-2 w-8"><input type="checkbox" className="rounded" /></th>
                  <th className="py-3 px-2">Name</th>
                  <th className="py-3 px-2">Zone</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Internal IP</th>
                  <th className="py-3 px-2">External IP</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vms.filter(vm => vm.name.toLowerCase().includes(vmSearch.toLowerCase())).map(vm => (
                  <tr key={vm.id} className="border-b border-slate-50 dark:border-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-4 px-2"><input type="checkbox" className="rounded" /></td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-bold text-indigo-600 hover:underline cursor-pointer">{vm.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-slate-500">{vm.zone}</td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${vm.status === 'RUNNING' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                        <span className="text-[10px] font-bold">{vm.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 font-mono text-slate-400">{vm.internalIp}</td>
                    <td className="py-4 px-2 font-mono text-slate-400">{vm.externalIp}</td>
                    <td className="py-4 px-2 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-slate-900"><MoreVertical className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Link Shortener View */}
      {computeSubTab === 'Link Shortener' && (
        <div className={`p-6 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-5 h-5 text-indigo-500" />
            <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase">PHRS DYNAMIC LINK GATEWAY & URL SHORTENER</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Create clean, high-performance redirect URLs on your own PHRS server. Convert complex addresses into simple short paths like <span className="font-bold text-indigo-600">/go/[slug]</span>.
          </p>

          <form onSubmit={handleCreateShortLink} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-5 items-end">
            <div className="md:col-span-4">
              <label className="block text-[10px] font-mono text-slate-500 mb-1">SHORT PATH SLUG</label>
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-xs font-mono text-slate-400">/go/</span>
                <input 
                  type="text" 
                  required
                  placeholder="main" 
                  value={linkSlug}
                  onChange={(e) => setLinkSlug(e.target.value)}
                  className={`w-full pl-11 pr-3 py-1.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                />
              </div>
            </div>

            <div className="md:col-span-6">
              <label className="block text-[10px] font-mono text-slate-500 mb-1">TARGET REDIRECT DESTINATION URL</label>
              <input 
                type="text" 
                required
                placeholder="/" 
                value={linkTarget}
                onChange={(e) => setLinkTarget(e.target.value)}
                className={`w-full p-1.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
              />
            </div>

            <div className="md:col-span-2">
              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2 rounded-lg font-bold transition shadow-md"
              >
                CREATE ROUTE
              </button>
            </div>
          </form>

          {/* Short Links List */}
          <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
            <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 text-[10px] font-bold font-mono text-slate-500 border-b border-slate-200 dark:border-slate-800 flex justify-between">
              <span>ACTIVE SHORT LINKS</span>
              <span>TOTAL REDIRECTS GENERATED</span>
            </div>
            {shortLinks.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No custom redirects generated on this node yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-96 overflow-y-auto">
                {shortLinks.map((link: any, idx: number) => (
                  <div key={idx} className="p-3.5 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 hover:bg-slate-100/30">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400">/go/{link.slug}</span>
                        <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono">302 REDIRECT</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1 truncate max-w-lg font-mono">Target: {link.target}</span>
                    </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">{link.clicks || 0} hits</span>
                        <button 
                          onClick={() => {
                            window.open(`/go/${link.slug}`, '_blank');
                            // Refresh links after a short delay
                            setTimeout(() => {
                              fetch('/api/links')
                                .then(res => res.json())
                                .then(data => {
                                  if (Array.isArray(data)) setShortLinks(data);
                                });
                            }, 1000);
                          }}
                          className="bg-slate-900 text-white hover:bg-slate-800 font-mono text-[10px] px-3 py-1.5 rounded-lg transition"
                        >
                          LAUNCH URL
                        </button>
                      </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Other placeholders */}
      {['Instance templates', 'Sole-tenant nodes', 'Machine images', 'TPUs'].includes(computeSubTab) && (
        <div className="p-20 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-white">
          <HardDrive className="w-12 h-12 mb-4 opacity-10" />
          <h3 className="text-sm font-bold text-slate-600 mb-1">{computeSubTab} Management</h3>
          <p className="text-xs font-mono text-center max-w-sm">Configuration interface for {computeSubTab} is initializing. Use VM Instances for immediate deployments.</p>
        </div>
      )}
    </div>
  );
}
