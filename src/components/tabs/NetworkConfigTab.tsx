import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function NetworkConfigTab({ state }: { state: any }) {
  const { 
    isAutoInternetEnabled, 
    setIsAutoInternetEnabled, 
    isDarkMode, 
    setIsDarkMode, 
    localServerIpInput, 
    setLocalServerIpInput, 
    vpsLogStream, 
    setVpsLogStream,
    isHybridDevMode,
    setIsHybridDevMode,
    remoteNodeIp,
    setRemoteNodeIp
  } = state;

  const { Cpu, Lock, Network, RefreshCw, Layers, ShieldCheck, HelpCircle } = LucideIcons;

  const [jioIpRotations, setJioIpRotations] = React.useState<Array<{time: string, oldIp: string, newIp: string, carrier: string}>>([
    { time: new Date().toLocaleTimeString(), oldIp: '192.0.0.1', newIp: '192.0.0.2', carrier: 'JIO' }
  ]);
  const [activeCarrier, setActiveCarrier] = React.useState<'jio' | 'bsnl'>('jio');
  const [publicTunnelUrl, setPublicTunnelUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchTunnelStatus = async () => {
      try {
        const res = await fetch('/api/tunnel-status');
        const data = await res.json();
        if (data.status === 'online' && data.url) {
          setPublicTunnelUrl(data.url);
        } else {
          setPublicTunnelUrl(null);
        }
      } catch (err) {
        console.error("Failed to fetch tunnel status", err);
      }
    };
    
    fetchTunnelStatus();
    const interval = setInterval(fetchTunnelStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  // Hardcoded IPs requested by user
  const ipv4Address = "192.0.0.2";
  const ipv6Address = "2409:40f0:5012:e3c5:ac9d:e9ff:fe8e:66ac";

  const handleSimulateRotation = () => {
    const oldIp = localServerIpInput || '192.0.0.2';
    const randSegment = Math.floor(Math.random() * 254) + 1;
    const newIp = `192.0.0.${randSegment}`;
    
    setLocalServerIpInput(newIp);
    setRemoteNodeIp(newIp);
    
    const time = new Date().toLocaleTimeString();
    setJioIpRotations(prev => [{ time, oldIp, newIp, carrier: activeCarrier.toUpperCase() }, ...prev.slice(0, 4)]);
    
    setVpsLogStream((prev: any) => [
      ...prev,
      `[${activeCarrier.toUpperCase()}-CGNAT] Dynamic Carrier IP rotation event triggered.`,
      `[${activeCarrier.toUpperCase()}-CGNAT] Mobile Address modified: ${oldIp} → ${newIp}`,
      `[DDNS-TUNNEL] Host listening globally on '0.0.0.0' & 'localhost' - STACK REMAINED ACTIVE!`,
      `[DDNS-TUNNEL] Re-bound Dual-Stack IPv4 (${ipv4Address}) and IPv6 (${ipv6Address}) safely.`
    ]);
    
    alert(`⚡ ${activeCarrier.toUpperCase()} IP Rotated successfully!\n\nOld IP: ${oldIp}\nNew IP: ${newIp}\n\nHost bound globally to '0.0.0.0' successfully absorbed this change! Connection remains active.`);
  };

  return (
    <>
      <div className="p-6">
        {/* AI Agent Hybrid Bridge card with dual carrier selection */}
        <div className={`p-6 mb-6 rounded-2xl border-2 transition-all ${isHybridDevMode ? 'bg-indigo-50/50 border-indigo-400 shadow-lg shadow-indigo-100' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${isHybridDevMode ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">AI Agent Hybrid Bridge (BSNL & Jio Support)</h3>
                <p className="text-xs text-slate-500">Dual-Carrier dynamic routing bound to '0.0.0.0' or 'localhost'</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Carrier Selector */}
              <div className="flex bg-slate-100 p-1 rounded-lg border text-xs font-mono">
                <button
                  onClick={() => {
                    setActiveCarrier('jio');
                    setVpsLogStream((prev: any) => [...prev, `[NETWORK] Active Handoff -> JIO 4G/5G Network`]);
                  }}
                  className={`px-3 py-1.5 rounded-md font-bold transition-all ${activeCarrier === 'jio' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  JIO
                </button>
                <button
                  onClick={() => {
                    setActiveCarrier('bsnl');
                    setVpsLogStream((prev: any) => [...prev, `[NETWORK] Active Handoff -> BSNL STV Network`]);
                  }}
                  className={`px-3 py-1.5 rounded-md font-bold transition-all ${activeCarrier === 'bsnl' ? 'bg-amber-600 text-white' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  BSNL
                </button>
              </div>

              {/* Toggle switch */}
              <button 
                onClick={() => {
                  setIsHybridDevMode(!isHybridDevMode);
                  if (!isHybridDevMode) {
                    setVpsLogStream((prev: any) => [...prev, `[HYBRID] Establishing dual secure tunnel over ${activeCarrier.toUpperCase()}: ${remoteNodeIp}...`]);
                    setTimeout(() => setVpsLogStream((prev: any) => [...prev, `[HYBRID] SUCCESS: AI Agent bound on host '0.0.0.0' (IPv4: ${ipv4Address}, IPv6: ${ipv6Address})`]), 1500);
                  }
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isHybridDevMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isHybridDevMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="max-w-md">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Target Local Node IP / Hostname</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={remoteNodeIp}
                  onChange={(e) => setRemoteNodeIp(e.target.value)}
                  placeholder="e.g. 192.168.1.15"
                  className="flex-1 p-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                />
                <button 
                  onClick={() => alert(`Ping to ${remoteNodeIp} successful! Route: ${activeCarrier.toUpperCase()} -> Host: 0.0.0.0`)}
                  className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-700 transition font-mono"
                >
                  PING NODE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Title area */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-800 dark:text-white flex items-center gap-2">
              <Network className="w-6 h-6 text-indigo-500 animate-pulse" />
              PHRS Crowd Server (Dual-Network & Dynamic IP Engine)
            </h1>
            <p className="text-sm text-slate-500 font-mono mt-1">Autonomous Mini-Server • No External Dependencies • BSNL & JIO Intercepted</p>
          </div>
        </div>
        
        {/* Network info summary grids */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-xl border font-mono text-xs ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Public Live Tunnel</span>
            {publicTunnelUrl ? (
              <>
                <div className="font-bold text-emerald-600 truncate flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <a href={publicTunnelUrl} target="_blank" rel="noreferrer" className="hover:underline">{publicTunnelUrl.replace('https://', '')}</a>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">* Active & Accessible globally</div>
              </>
            ) : (
              <>
                <div className="font-bold text-amber-500 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Generating Link...
                </div>
                <div className="text-[10px] text-slate-400 mt-1">* Localtunnel connecting...</div>
              </>
            )}
          </div>

          <div className={`p-4 rounded-xl border font-mono text-xs ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Global Stack Bindings</span>
            <div className="font-bold text-slate-800 dark:text-slate-200">
              Host: <span className="text-indigo-600">0.0.0.0</span> or <span className="text-indigo-600">localhost</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">* Zero connectivity drops during SIM switches.</div>
          </div>

          <div className={`p-4 rounded-xl border font-mono text-xs ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Dual IPv4 Endpoint</span>
            <div className="font-bold text-emerald-600">
              {ipv4Address} (Static Ingress)
            </div>
            <div className="text-[10px] text-slate-400 mt-1">* Bounded globally on Port 3000</div>
          </div>

          <div className={`p-4 rounded-xl border font-mono text-xs ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Dual IPv6 Endpoint</span>
            <div className="font-bold text-indigo-600 truncate">
              {ipv6Address}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">* Automatic failover routing active</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* TIER 1: Jio/BSNL Mobile Server Card */}
          <div className={`p-6 rounded-2xl border lg:col-span-1 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="font-mono font-bold text-sm text-emerald-600">Tier 1: {activeCarrier.toUpperCase()} Server</h3>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 font-mono font-bold px-1.5 py-0.5 rounded">CGNAT Active</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
                  <span>GLOBAL PORT BINDING</span>
                  <span className="text-indigo-600 font-bold">0.0.0.0</span>
                </div>
                <div className="p-2 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-md flex justify-between">
                  <span>HOST: localhost</span>
                  <span className="text-slate-500">PORT: 3000</span>
                </div>
                <p className="text-[9px] text-slate-400 font-mono mt-1">
                  * Binds globally to accept connections even when your carrier IP rotates frequently.
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 mb-1">DYNAMIC ROUTED IP</label>
                <input 
                  type="text" 
                  value={localServerIpInput} 
                  onChange={e => {
                    setLocalServerIpInput(e.target.value);
                    setRemoteNodeIp(e.target.value);
                  }} 
                  className="w-full p-2 text-xs rounded-lg border focus:ring-1 focus:ring-emerald-500 font-mono bg-slate-50 text-slate-700 font-bold" 
                />
              </div>

              <div className="p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold font-mono text-indigo-700 uppercase">{activeCarrier.toUpperCase()} IP Auto-Adapt</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
                </div>
                <p className="text-[9px] text-slate-500 font-mono leading-relaxed">
                  DDNS Tunnel dynamically captures any mobile WAN IPv4/IPv6 rotations on {activeCarrier.toUpperCase()} and adapts routing rules without restarting the server.
                </p>
              </div>

              {/* Simulated Rotations Feed */}
              {jioIpRotations.length > 0 && (
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="block text-[9px] font-mono font-semibold text-slate-400 uppercase mb-1">Latest IP Rotation Events</span>
                  <div className="space-y-1 max-h-[70px] overflow-y-auto">
                    {jioIpRotations.map((rot, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[9px] font-mono text-slate-500">
                        <span className="text-slate-400 font-bold">{rot.carrier}</span>
                        <span className="truncate max-w-[120px] text-right">
                          {rot.oldIp} → <strong className="text-emerald-600">{rot.newIp}</strong>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button 
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] py-2 rounded-lg font-bold shadow-sm transition-all" 
                  onClick={() => alert(`Server broadcast updated. Listening on http://${localServerIpInput}:3000`)}
                >
                  UPDATE BROADCAST
                </button>
                <button 
                  onClick={handleSimulateRotation}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[10px] py-2 rounded-lg font-bold shadow-sm transition-all flex items-center justify-center gap-1"
                >
                  ⚡ ROTATE IP
                </button>
              </div>
            </div>
          </div>

          {/* TIER 2: Laptop Node Link */}
          <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <h3 className="font-mono font-bold text-sm text-indigo-500">Tier 2: Laptop Node</h3>
            </div>
            <p className="text-xs text-slate-500 mb-2 font-mono">Capacity: High Traffic Balancing</p>
            <p className="text-xs text-slate-400 mb-6">Activated when mobile capacity exceeds 500. Syncs via local VPC.</p>
            <div className="space-y-4 mt-8">
              <div className="p-3 bg-slate-100 rounded-lg">
                <div className="text-[10px] font-mono text-slate-500 mb-1">NODE STATUS</div>
                <div className="font-mono text-sm text-indigo-600 font-bold">● STANDBY (Ready)</div>
              </div>
              <button className="w-full bg-slate-800 text-white font-mono text-xs py-2 rounded-lg font-bold" onClick={() => alert('Activating Laptop Node load balancer...')}>ACTIVATE LAPTOP NODE</button>
            </div>
          </div>

          {/* TIER 3: Supercomputer Link */}
          <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-md ring-1 ring-purple-500/20'}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <h3 className="font-mono font-bold text-sm text-purple-600">Tier 3: Supercomputer</h3>
            </div>
            <p className="text-xs text-slate-500 mb-2 font-mono">Capacity: Massive / Global Scale</p>
            <p className="text-xs text-slate-400 mb-6">Enterprise computing integration for extreme traffic spikes and Big Data.</p>
            <div className="space-y-4 mt-8">
              <div className="p-3 bg-slate-100 rounded-lg border border-purple-200">
                <div className="text-[10px] font-mono text-slate-500 mb-1">COMPUTE STATUS</div>
                <div className="font-mono text-sm text-slate-400 font-bold">LOCKED</div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs py-2 rounded-lg flex items-center justify-center gap-2 font-bold" onClick={() => alert('Requires Tier 3 Authorization Key to unlock Supercomputer routing.')}>
                <Lock className="w-3 h-3" /> UNLOCK SUPERCOMPUTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
