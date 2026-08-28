import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';

export default function VpcNetworkTab({ state }: { state: any }) {
    const { Cloud, Cpu, Wifi, WifiOff, Smartphone, Activity } = LucideIcons;
  const { isAutoInternetEnabled, setIsAutoInternetEnabled, isBridgeActive, setIsBridgeActive, vpcSubTab, setVpcSubTab, networkLatency, subnets, ipInventory, isHybridDevMode, setIsHybridDevMode, remoteNodeIp, isAiServerBypassed, setIsAiServerBypassed, setHomeToast } = state;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/api/network/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsAutoInternetEnabled(data.settings.isAutoInternetEnabled);
          setIsHybridDevMode(data.settings.isHybridDevMode);
          setIsAiServerBypassed(data.settings.isAiServerBypassed);
          if (data.settings.isBridgeActive !== undefined) {
             setIsBridgeActive(data.settings.isBridgeActive);
          }
        }
      })
      .catch(console.error);
  }, []);

  const updateSetting = async (key: string, value: boolean) => {
    setIsLoading(true);
    try {
      await fetch('/api/network/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: value })
      });
    } catch(e) { console.error(e); }
    setIsLoading(false);
  };

  return (
    <>
        
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold tracking-tight text-slate-800">VPC Network (నెట్‌వర్క్ మేనేజ్మెంట్)</h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${isAutoInternetEnabled ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-200'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isAutoInternetEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                    {isAutoInternetEnabled ? 'AUTO-CONNECT ACTIVE' : 'MANUAL MODE'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 border-b border-slate-100 mb-6">
                {['Overview', 'IP Addresses', 'Firewall', 'Routes', 'Mobile Bridge'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setVpcSubTab(tab.toLowerCase().replace(' ', '_') as any)}
                    className={`pb-3 text-sm font-medium transition-colors relative ${
                      vpcSubTab === tab.toLowerCase().replace(' ', '_') 
                        ? 'text-blue-600' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab}
                    {vpcSubTab === tab.toLowerCase().replace(' ', '_') && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* OVERVIEW SUB-TAB */}
              {vpcSubTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/50">
                      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Network Latency</h3>
                      <div className="text-3xl font-bold text-slate-800">{networkLatency}ms</div>
                      <p className="text-[10px] text-slate-500 mt-1">Status: <span className="text-emerald-600 font-bold">Optimal</span></p>
                    </div>
                    <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/50">
                      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Active Subnets</h3>
                      <div className="text-3xl font-bold text-slate-800">{subnets.length}</div>
                      <p className="text-[10px] text-slate-500 mt-1">Internal routing: Enabled</p>
                    </div>
                    <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/50">
                      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">IP Utilization</h3>
                      <div className="text-3xl font-bold text-slate-800">{Math.round((ipInventory.filter((ip: any) => ip.status === 'Active').length / 254) * 100)}%</div>
                      <p className="text-[10px] text-slate-500 mt-1">Available: 248 IPs</p>
                    </div>
                    <div className="p-5 rounded-xl border border-blue-100 bg-blue-50/20">
                      <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Bridge Status</h3>
                      <div className={`text-2xl font-bold ${isBridgeActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {isBridgeActive ? 'ACTIVE' : 'OFFLINE'}
                      </div>
                      <p className="text-[10px] text-blue-500 mt-1">Mobile Gateway</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl border border-blue-100 bg-blue-50/30 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-blue-800 mb-1">Automatic Internet Management (ఆటోమేటిక్ కనెక్టింగ్)</h3>
                      <p className="text-xs text-blue-600/80 leading-relaxed max-w-xl">
                        When enabled, the PHRS Cloud Engine automatically optimizes IP routing and gateway configurations to maintain 99.99% uptime for all VPS instances.
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        const newVal = !isAutoInternetEnabled;
                        setIsAutoInternetEnabled(newVal);
                        updateSetting('isAutoInternetEnabled', newVal);
                        setHomeToast(`✓ Automatic Connection Management ${newVal ? 'Enabled' : 'Disabled'}`);
                        setTimeout(() => setHomeToast(null), 3000);
                      }}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isAutoInternetEnabled ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAutoInternetEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Hybrid Bridge Integration - Moved to Overview for Visibility */}
                  <div className={`p-5 rounded-2xl border-2 transition-all ${isHybridDevMode ? 'bg-indigo-50 border-indigo-400 shadow-lg shadow-indigo-100' : 'bg-white border-slate-200'}`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isHybridDevMode ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
                            <Cpu className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-800">AI Agent Hybrid Bridge (AI ఏజెంట్ కనెక్షన్)</div>
                            <p className="text-[10px] text-slate-500">Link AI Studio Agent to Local Node: <span className="font-mono font-bold text-indigo-600">{remoteNodeIp}</span></p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <label className="text-[8px] font-bold text-slate-400 uppercase mb-1">Bridge Mode</label>
                          <button 
                            onClick={() => {
                              const newVal = !isHybridDevMode;
                              setIsHybridDevMode(newVal);
                              updateSetting('isHybridDevMode', newVal);
                              setHomeToast(!newVal ? "Hybrid Bridge Disabled" : "✓ AI Agent linked to Local PHRS Node!");
                              setTimeout(() => setHomeToast(null), 3000);
                            }}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isHybridDevMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isHybridDevMode ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                        </div>
                      </div>

                      <div className="h-px bg-slate-100 w-full" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isAiServerBypassed ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                            {isAiServerBypassed ? <WifiOff className="w-5 h-5" /> : <Cloud className="w-5 h-5" />}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-800">Temporary Bypass (ఏఐ సర్వర్ కనెక్షన్)</div>
                            <p className="text-[10px] text-slate-500">
                              {isAiServerBypassed 
                                ? "PHRS AI Engine is DISCONNECTED (టెంపరరీగా ఆపివేయబడింది)" 
                                : "PHRS AI Engine is ACTIVE (పీహెచ్‌ఆర్ఎస్ ఏఐ ఇంజిన్ యాక్టివ్‌గా ఉంది)"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <label className="text-[8px] font-bold text-slate-400 uppercase mb-1">Bypass AI</label>
                          <button 
                            onClick={() => {
                              const newVal = !isAiServerBypassed;
                              setIsAiServerBypassed(newVal);
                              updateSetting('isAiServerBypassed', newVal);
                              setHomeToast(newVal ? "⚠ PHRS AI Engine Disconnected" : "✓ PHRS AI Engine Restored");
                              setTimeout(() => setHomeToast(null), 3000);
                            }}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAiServerBypassed ? 'bg-rose-500' : 'bg-slate-200'}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAiServerBypassed ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MOBILE BRIDGE SUB-TAB */}
              {vpcSubTab === 'mobile_bridge' && (
                <div className="space-y-6">
                  <div className="p-6 rounded-xl border border-indigo-100 bg-indigo-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${isBridgeActive ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-200 text-slate-500'}`}>
                           <Smartphone className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-800">Mobile Gateway Bridge</h3>
                          <p className="text-xs text-slate-500">Tether mobile cellular network for VPS routing.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className={`font-mono text-xs font-bold ${isBridgeActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                           {isBridgeActive ? 'CONNECTED' : 'DISCONNECTED'}
                         </span>
                         <button 
                            onClick={() => {
                              const newVal = !isBridgeActive;
                              setIsBridgeActive(newVal);
                              updateSetting('isBridgeActive', newVal);
                              setHomeToast(newVal ? "✓ Mobile Gateway Connected" : "⚠ Mobile Gateway Disconnected");
                              setTimeout(() => setHomeToast(null), 3000);
                            }}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${isBridgeActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
                          >
                            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isBridgeActive ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                      </div>
                    </div>
                    {isBridgeActive && (
                      <div className="mt-6 p-4 bg-white rounded-lg border border-emerald-100 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <Activity className="text-emerald-500 w-5 h-5 animate-pulse" />
                           <div>
                             <div className="text-xs font-bold text-slate-800">Tethering Active (100.64.137.224)</div>
                             <div className="text-[10px] text-slate-500">Routing internet requests through mobile node...</div>
                           </div>
                         </div>
                         <div className="text-right">
                           <div className="text-xs font-bold text-slate-800">3.4 MB/s</div>
                           <div className="text-[10px] text-slate-500">Uplink Speed</div>
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
    </>
  );
}
