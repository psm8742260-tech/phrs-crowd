import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

interface SolutionDeployStatus {
  id: string;
  name: string;
  status: 'Healthy' | 'Scaling' | 'Rebooting' | 'Deploying';
  uptime: string;
  traffic: string;
  cost: string;
  cpu: number;
  memory: string;
}

interface DesignNode {
  id: string;
  type: 'lb' | 'vps' | 'db' | 'cache' | 'firewall';
  name: string;
  x: number;
  y: number;
}

export default function SolutionsTab({ state }: { state: any }) {
  const {
    setActiveTab,
    selectedSubMenu,
    setSelectedSubMenu,
    setHomeToast,
    setVpsLogStream
  } = state;

  const {
    LayoutGrid,
    Search,
    Play,
    Zap,
    Cpu,
    Database,
    Network,
    Lock,
    ExternalLink,
    CheckCircle,
    TrendingUp,
    Sliders,
    Activity,
    Plus,
    Trash2,
    RefreshCw,
    X,
    Settings,
    FileCode,
    Sparkles,
    Shield,
    Server,
    Layers,
    MessageSquare,
    Flame
  } = LucideIcons;

  // 1. All Products State
  const [productSearch, setProductSearch] = useState('');
  const [productCategory, setProductCategory] = useState<'All' | 'Compute' | 'Database' | 'Networking' | 'AI' | 'Security'>('All');

  // 2. Jump Start Solutions State
  const [deployingId, setDeployingId] = useState<string | null>(null);
  const [deployProgress, setDeployProgress] = useState(0);
  const [deployStep, setDeployStep] = useState('');
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [newDeployments, setNewDeployments] = useState<any[]>([]);

  // 3. Solution Deployments State
  const [activeDeployments, setActiveDeployments] = useState<SolutionDeployStatus[]>([
    { id: 'dep-1', name: 'Microservice SMS Router Stack', status: 'Healthy', uptime: '14d 6h', traffic: '100%', cost: '₹0.42/hr', cpu: 12, memory: '128MB' },
    { id: 'dep-2', name: 'Relational SQLite Cache Cluster', status: 'Healthy', uptime: '4d 18h', traffic: '100%', cost: '₹0.85/hr', cpu: 24, memory: '256MB' }
  ]);

  // 4. App Design Center State
  const [designNodes, setDesignNodes] = useState<DesignNode[]>([
    { id: 'node-1', type: 'lb', name: 'Cloud Load Balancer', x: 50, y: 150 },
    { id: 'node-2', type: 'vps', name: 'API Server Node (West-1)', x: 250, y: 80 },
    { id: 'node-3', type: 'vps', name: 'API Server Node (West-2)', x: 250, y: 220 },
    { id: 'node-4', type: 'db', name: 'PostgreSQL Primary DB', x: 450, y: 150 }
  ]);
  const [isShowingIaC, setIsShowingIaC] = useState(false);

  // Default submenu if empty
  const currentSub = selectedSubMenu || 'All products';

  // Products Directory Data
  const ALL_PRODUCTS = [
    { id: 'app_studio', name: 'Compute Engine', cat: 'Compute', icon: Server, desc: 'Deploy standalone local VPS instances, manage VM templates, and inspect runtime terminal outputs.', tab: 'app_studio' },
    { id: 'cloud_run', name: 'Cloud Run', cat: 'Compute', icon: Play, desc: 'Serverless deployment module for hosting containers with elastic scaling and HTTP load balancing.', tab: 'cloud_run' },
    { id: 'kubernetes', name: 'Kubernetes Engine', cat: 'Compute', icon: Layers, desc: 'Enterprise container clustering with GKE fleets, node resource tracking, and smart pod allocations.', tab: 'kubernetes' },
    { id: 'database', name: 'PHRS DB Console', cat: 'Database', icon: Flame, desc: 'Realtime Cloud Firebase database center featuring Firestore schemas, collections, and authentication logs.', tab: 'database' },
    { id: 'cloud_sql', name: 'Cloud SQL', cat: 'Database', icon: Database, desc: 'Managed PostgreSQL database instance setup with automatic backup configurations and query logs.', tab: 'cloud_sql' },
    { id: 'bigquery', name: 'BigQuery Studio', cat: 'Database', icon: Search, desc: 'Serverless enterprise data warehouse with built-in SQL analysis worksheets and dynamic query streams.', tab: 'bigquery' },
    { id: 'vpc_network', name: 'VPC Network', cat: 'Networking', icon: Network, desc: 'Configure cloud subnets, custom firewall rules, static external IPs, and internal private networks.', tab: 'vpc_network' },
    { id: 'network_config', name: 'PHRS Network & VPS', cat: 'Networking', icon: Network, desc: 'Specialized local network configuration for custom routing, Termux ports, and laptop node bridges.', tab: 'network_config' },
    { id: 'sms_gateway', name: 'SMS & OTP Gateway', cat: 'Networking', icon: MessageSquare, desc: 'Fast2SMS API gateway console with dynamic Recharge limits, OTP delivery histories, and API key setups.', tab: 'sms_gateway' },
    { id: 'agent_platform', name: 'AI Master Studio', cat: 'AI', icon: Sparkles, desc: 'Build and coordinate autonomous Gemini/DeepSeek agent portfolios with localized custom prompts.', tab: 'agent_platform' },
    { id: 'security', name: 'Security Command Center', cat: 'Security', icon: Shield, desc: 'Monitor cloud compliance postures, review potential security issues, and audit open firewall ports.', tab: 'security' },
    { id: 'iam', name: 'IAM & Permissions', cat: 'Security', icon: Lock, desc: 'Control organization member privileges, generate service accounts, and manage secure credentials.', tab: 'iam' },
  ];

  // Filtered Products
  const filteredProducts = ALL_PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.desc.toLowerCase().includes(productSearch.toLowerCase());
    const matchCat = productCategory === 'All' || p.cat === productCategory;
    return matchSearch && matchCat;
  });

  // Jump Start Solutions Templates
  const SOLUTIONS_TEMPLATES = [
    {
      id: 'template-sms-router',
      name: 'Microservice SMS Router Stack',
      desc: 'Pre-configured Twilio & Fast2SMS gateway cluster for heavy multi-user OTP verification with SQLite replicas.',
      stack: 'React, Node.js, SQLite, Fast2SMS',
      time: '1.2s',
      cost: '₹0.42 / hr'
    },
    {
      id: 'template-sqlite-cache',
      name: 'Relational SQLite Cache Cluster',
      desc: 'High-availability read-replica synchronized with central BigQuery analytical tables for lightning search speeds.',
      stack: 'Node.js, SQL, SQLite, GCSFuse',
      time: '2.5s',
      cost: '₹0.85 / hr'
    },
    {
      id: 'template-geo-telemetry',
      name: 'Geo Maps Telemetry Tracker',
      desc: 'Real-time geographical position locator mapping vehicle or user coordinates using standard GeoJson telemetry.',
      stack: 'React, Maps SDK, GeoJson API, Redis',
      time: '0.8s',
      cost: '₹0.30 / hr'
    }
  ];

  // Simulate One-Click Deployment
  const handleDeploySolution = (sol: any) => {
    if (deployingId) return;

    setDeployingId(sol.id);
    setDeployProgress(5);
    setDeployStep('Initializing secure VPS workspace...');
    setDeployLogs([`[INFO] Starting deployment of template: ${sol.name}`]);

    const steps = [
      { progress: 20, step: 'Allocating network subnets & VPC firewall...', log: '[VPC] ✓ Custom gateway rule established on port 3000.' },
      { progress: 45, step: 'Pulling latest runtime stack binary dependencies...', log: '[BUILD] Bundling Javascript ES modules via vite-bundler...' },
      { progress: 65, step: 'Provisioning SQL database cache instances...', log: '[DATABASE] SQLite localized cache schema instantiated.' },
      { progress: 85, step: 'Spawning background cluster telemetry daemon...', log: '[PROCESS] PM2 monitoring worker registered successfully.' },
      { progress: 100, step: 'Deployment healthy. Mapping public DNS routes...', log: '[SYSTEM] Complete! Stack is active & accessible on target gateway.' }
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        const next = steps[currentStepIndex];
        setDeployProgress(next.progress);
        setDeployStep(next.step);
        setDeployLogs(prev => [...prev, next.log]);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          // Add to deployed solutions list
          const newId = `dep-custom-${Date.now()}`;
          const newlyCreated: SolutionDeployStatus = {
            id: newId,
            name: sol.name,
            status: 'Healthy',
            uptime: '0m',
            traffic: '100%',
            cost: sol.cost,
            cpu: 4,
            memory: '64MB'
          };
          setActiveDeployments(prev => [newlyCreated, ...prev]);
          setNewDeployments(prev => [...prev, newlyCreated]);
          setDeployingId(null);
          setDeployProgress(0);
          setHomeToast(`✓ ${sol.name} deployed successfully!`);
          setVpsLogStream((prev: string[]) => [
            ...prev,
            `[SOLUTIONS] ✓ Solution Stack Successfully Deployed: ${sol.name}`
          ]);
        }, 1200);
      }
    }, 1500);
  };

  // Node Actions for App Design Center
  const handleAddNode = (type: 'lb' | 'vps' | 'db' | 'cache' | 'firewall') => {
    const titles = {
      lb: 'Load Balancer Cluster',
      vps: 'VPS API Node',
      db: 'Cloud SQL Instance',
      cache: 'Redis Memory Cache',
      firewall: 'VPC Security Gateway'
    };
    const xOffsets = { lb: 80, vps: 240, db: 420, cache: 380, firewall: 160 };
    const yVal = 100 + Math.random() * 120;

    const newNode: DesignNode = {
      id: `node-${Date.now()}`,
      type,
      name: `${titles[type]} #${designNodes.length + 1}`,
      x: xOffsets[type],
      y: yVal
    };
    setDesignNodes(prev => [...prev, newNode]);
    setHomeToast(`Added ${titles[type]} blueprint node!`);
  };

  const handleRemoveNode = (id: string) => {
    setDesignNodes(prev => prev.filter(n => n.id !== id));
    setHomeToast('Node removed from layout.');
  };

  // Dynamic calculated estimations
  const totalCostEstimate = designNodes.reduce((sum, node) => {
    const costs = { lb: 120, vps: 180, db: 290, cache: 90, firewall: 50 };
    return sum + costs[node.type];
  }, 0);

  const estimatedLatency = Math.max(5, Math.min(45, Math.round(50 - designNodes.length * 4)));
  const estimatedSLA = designNodes.some(n => n.type === 'lb') ? '99.99%' : '99.90%';

  // Generate Terraform / BluePrint IaC
  const generatedIaCJson = JSON.stringify({
    provider: 'phrs_crowd_vps',
    architecture: {
      project_id: 'phrs-crowd-v6',
      total_nodes: designNodes.length,
      estimated_monthly_cost: `₹${totalCostEstimate}`,
      expected_latency: `${estimatedLatency}ms`,
      sla: estimatedSLA,
      infrastructure: designNodes.map(n => ({
        id: n.id,
        type: n.type,
        resource_name: n.name.toLowerCase().replace(/\s+/g, '_'),
        machine_type: n.type === 'db' ? 'db-custom-1-3840' : 'vps-nano-shared-cpu',
        region: 'asia-south1',
        connections: n.type === 'lb' ? ['vps'] : n.type === 'vps' ? ['db', 'cache'] : []
      }))
    }
  }, null, 2);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <LayoutGrid className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                {currentSub === 'All products' && 'Cloud Product Directory'}
                {currentSub === 'Jump Start Solutions' && 'Jump Start Solutions'}
                {currentSub === 'Solution deployments' && 'Active Solution Deployments'}
                {currentSub === 'App Design Center' && 'Cloud Architecture & IaC Studio'}
              </h1>
            </div>
            <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
              {currentSub === 'All products' && 'Find, search, and jump instantly to any active VPS networking module or localized database manager within the PHRS architecture catalog.'}
              {currentSub === 'Jump Start Solutions' && 'Ready-to-deploy, pre-compiled structural solution templates. One-click initialization hooks up telemetry and spins up VM instances.'}
              {currentSub === 'Solution deployments' && 'Monitor the uptime, health metrics, microservice cost runtimes, and background PM2 worker tasks of your solution clusters.'}
              {currentSub === 'App Design Center' && 'Graphically map custom machine layouts, configure high-availability load balancers, and export production-ready Terraform IaC configurations.'}
            </p>
          </div>

          {/* Quick Submenu Switcher inside view */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0 self-start md:self-auto overflow-x-auto max-w-full">
            {['All products', 'Jump Start Solutions', 'Solution deployments', 'App Design Center'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubMenu(sub)}
                className={`px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap rounded-lg transition-all ${
                  currentSub === sub
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB SUB-VIEW: ALL PRODUCTS                                */}
      {/* ========================================================= */}
      {currentSub === 'All products' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search PHRS catalog products..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {(['All', 'Compute', 'Database', 'Networking', 'AI', 'Security'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProductCategory(cat)}
                  className={`px-3 py-1.5 text-[11px] font-bold rounded-lg whitespace-nowrap transition ${
                    productCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => {
              const ProductIcon = p.icon;
              return (
                <div key={p.id} className="flex flex-col justify-between p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-300 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-100 text-slate-600 rounded">
                        {p.cat}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                    </div>
                    
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                        <ProductIcon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900">{p.name}</h3>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed mb-6">
                      {p.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab(p.tab as any);
                      setHomeToast(`Redirecting directly to ${p.name}...`);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold font-mono text-xs rounded-xl transition"
                  >
                    ACCESS CONSOLE
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}

            {filteredProducts.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400 font-mono text-xs">
                ⚠ No matching catalog products found. Try modifying your search filter.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB SUB-VIEW: JUMP START SOLUTIONS                       */}
      {/* ========================================================= */}
      {currentSub === 'Jump Start Solutions' && (
        <div className="space-y-6">
          
          {/* Active deploying layout */}
          {deployingId && (
            <div className="p-5 border border-amber-200 bg-amber-50/40 rounded-2xl animate-pulse space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" />
                  <span className="font-bold text-xs text-amber-800 font-mono">SOLUTION DEPLOYMENT IN PROGRESS...</span>
                </div>
                <span className="font-mono text-xs font-black text-amber-700">{deployProgress}%</span>
              </div>
              <div className="w-full bg-amber-200/50 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-600 h-2 transition-all duration-300" style={{ width: `${deployProgress}%` }} />
              </div>
              <p className="text-[11px] text-amber-800 font-mono font-bold">STATUS: {deployStep}</p>
              
              <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[10px] space-y-1 h-24 overflow-y-auto border border-slate-800 shadow-inner">
                {deployLogs.map((log, lidx) => (
                  <div key={lidx}>{log}</div>
                ))}
              </div>
            </div>
          )}

          {/* Templates Directory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOLUTIONS_TEMPLATES.map((sol) => (
              <div key={sol.id} className="flex flex-col justify-between p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 text-[9px] bg-indigo-50 text-indigo-600 rounded-full font-mono font-bold">
                      JUMP-START COMPATIBLE
                    </span>
                    <Zap className="w-4 h-4 text-amber-500" />
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 mb-1.5">{sol.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{sol.desc}</p>

                  <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-xl text-[10px] font-mono text-slate-500 border border-slate-100 mb-6">
                    <div className="flex justify-between">
                      <span>SOFTWARE STACK:</span>
                      <span className="text-slate-800 font-semibold">{sol.stack}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>INITIALIZE SPEED:</span>
                      <span className="text-slate-800 font-semibold">{sol.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RUN COST:</span>
                      <span className="text-slate-800 font-semibold">{sol.cost}</span>
                    </div>
                  </div>

                  {/* Clean schematic layout visualizer (Anti-Slop rule: No nested cards) */}
                  <div className="mb-6 flex items-center justify-center gap-1 border border-slate-100 rounded-xl p-3 bg-slate-50/50">
                    <div className="px-2 py-1 text-[8px] font-mono bg-white border border-slate-200 rounded font-bold text-slate-600">Client</div>
                    <div className="text-slate-300">{"──>"}</div>
                    <div className="px-2 py-1 text-[8px] font-mono bg-indigo-600 border border-indigo-600 rounded font-bold text-white">App</div>
                    <div className="text-slate-300">{"──>"}</div>
                    <div className="px-2 py-1 text-[8px] font-mono bg-white border border-slate-200 rounded font-bold text-slate-600">SQLite</div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeploySolution(sol)}
                  disabled={!!deployingId}
                  className={`w-full text-center font-mono text-xs py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                    deployingId
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-200'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  ONE-CLICK DEPLOY
                </button>
              </div>
            ))}
          </div>

          {/* Newly Deployed success info */}
          {newDeployments.length > 0 && (
            <div className="p-4 border border-emerald-200 bg-emerald-50/30 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                NEW SOLUTION INSTANCES STARTED SUCCESSFULLY
              </h4>
              <div className="space-y-1">
                {newDeployments.map((d, dIdx) => (
                  <p key={dIdx} className="text-[11px] text-emerald-700 font-mono">
                    ✓ **{d.name}** is online: `https://vps-cluster-ap-south.local/{d.id}` (probe status: healthy)
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB SUB-VIEW: SOLUTION DEPLOYMENTS                        */}
      {/* ========================================================= */}
      {currentSub === 'Solution deployments' && (
        <div className="space-y-6">
          <div className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="font-bold text-xs text-slate-700 font-mono flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-500" />
                ACTIVE ENDPOINT SERVICES
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-50 text-indigo-600">
                {activeDeployments.length} Running Clusters
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/30 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Solution Name</th>
                    <th className="py-3 px-4">Cluster Status</th>
                    <th className="py-3 px-4">Uptime</th>
                    <th className="py-3 px-4">CPU Usage</th>
                    <th className="py-3 px-4">Traffic Allocation</th>
                    <th className="py-3 px-4">Billing Rate</th>
                    <th className="py-3 px-4 text-right">Cluster Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {activeDeployments.map((dep) => (
                    <tr key={dep.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{dep.name}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold font-mono ${
                          dep.status === 'Healthy' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          dep.status === 'Rebooting' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-indigo-50 text-indigo-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${dep.status === 'Healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                          {dep.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{dep.uptime}</td>
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-slate-800">{dep.cpu}%</span>
                          <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-indigo-600 h-1.5" style={{ width: `${dep.cpu}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{dep.traffic}</td>
                      <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-slate-900">{dep.cost}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setActiveDeployments(prev => prev.map(p => p.id === dep.id ? { ...p, status: 'Rebooting' } : p));
                              setHomeToast(`Rebooting PM2 process daemon for ${dep.name}...`);
                              setTimeout(() => {
                                setActiveDeployments(prev => prev.map(p => p.id === dep.id ? { ...p, status: 'Healthy' } : p));
                              }, 2500);
                            }}
                            className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                            title="Reboot Solution Daemon"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setActiveDeployments(prev => prev.filter(p => p.id !== dep.id));
                              setHomeToast(`Teardown of ${dep.name} initiated!`);
                              setVpsLogStream((prev: string[]) => [
                                ...prev,
                                `[SYSTEM-TEARDOWN] Deprecated active solution stack: ${dep.name}`
                              ]);
                            }}
                            className="p-1 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Teardown / Decomission Solution"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB SUB-VIEW: APP DESIGN CENTER                           */}
      {/* ========================================================= */}
      {currentSub === 'App Design Center' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Control Sidebar Panel */}
            <div className="lg:col-span-1 space-y-4">
              <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3.5">
                <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-500" />
                  Blueprint Elements
                </h3>
                
                <p className="text-[11px] text-slate-500 leading-normal">
                  Click below to append virtual hardware components onto the telemetry blueprint layout canvas.
                </p>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleAddNode('lb')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-indigo-50 border border-slate-200 rounded-xl transition flex items-center gap-2.5 text-slate-700"
                  >
                    <Sliders className="w-3.5 h-3.5 text-indigo-500" />
                    + Add Load Balancer
                  </button>
                  <button
                    onClick={() => handleAddNode('vps')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-indigo-50 border border-slate-200 rounded-xl transition flex items-center gap-2.5 text-slate-700"
                  >
                    <Server className="w-3.5 h-3.5 text-blue-500" />
                    + Add VPS Server
                  </button>
                  <button
                    onClick={() => handleAddNode('db')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-indigo-50 border border-slate-200 rounded-xl transition flex items-center gap-2.5 text-slate-700"
                  >
                    <Database className="w-3.5 h-3.5 text-emerald-500" />
                    + Add Relational DB
                  </button>
                  <button
                    onClick={() => handleAddNode('cache')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-indigo-50 border border-slate-200 rounded-xl transition flex items-center gap-2.5 text-slate-700"
                  >
                    <Layers className="w-3.5 h-3.5 text-orange-500" />
                    + Add Memory Cache
                  </button>
                  <button
                    onClick={() => handleAddNode('firewall')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-indigo-50 border border-slate-200 rounded-xl transition flex items-center gap-2.5 text-slate-700"
                  >
                    <Lock className="w-3.5 h-3.5 text-rose-500" />
                    + Add VPC Firewall
                  </button>
                </div>
              </div>

              {/* Realtime Estimate Metrics */}
              <div className="p-4 bg-slate-950 text-slate-300 rounded-2xl space-y-4 font-mono text-[11px] border border-slate-900 shadow-md">
                <h4 className="font-extrabold text-[10px] text-slate-400 flex items-center gap-1.5 uppercase">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  Estimated Metrics
                </h4>

                <div className="space-y-2 pt-1">
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span>ESTIMATED SLA:</span>
                    <span className="text-emerald-400 font-bold">{estimatedSLA}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span>LATENCY DELAY:</span>
                    <span className="text-blue-400 font-bold">{estimatedLatency} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MONTHLY BUDGET:</span>
                    <span className="text-amber-400 font-bold">₹{totalCostEstimate}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsShowingIaC(!isShowingIaC)}
                  className="w-full py-1.5 border border-indigo-500 hover:bg-indigo-500 hover:text-white rounded-lg text-[10px] font-bold text-indigo-400 transition flex items-center justify-center gap-1 font-mono uppercase"
                >
                  <FileCode className="w-3 h-3" />
                  {isShowingIaC ? 'Close IaC Blueprint' : 'Generate IaC JSON'}
                </button>
              </div>
            </div>

            {/* Canvas / Dynamic Layout Visualizer */}
            <div className="lg:col-span-3 space-y-6">
              <div className="relative border border-slate-200 bg-slate-50 rounded-3xl h-[420px] overflow-hidden shadow-inner flex flex-col justify-between p-4">
                {/* Background Grid Pattern (Anti-Slop Clean look) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />

                {/* Legend Header */}
                <div className="z-10 flex items-center justify-between text-[10px] font-mono text-slate-500 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200">
                  <span>BLUEPRINT WORKSPACE (ACTIVE LAYOUT DRAGGABLE FLOW)</span>
                  <span>{designNodes.length} Elements Defined</span>
                </div>

                {/* Nodes rendering */}
                <div className="relative flex-1">
                  {designNodes.map((n) => (
                    <div
                      key={n.id}
                      style={{ left: `${n.x}px`, top: `${n.y}px` }}
                      className="absolute group z-10 flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl shadow-sm transition-all hover:border-indigo-500 hover:shadow"
                    >
                      <div className="flex items-center gap-1.5">
                        {n.type === 'lb' && <Sliders className="w-3.5 h-3.5 text-indigo-500" />}
                        {n.type === 'vps' && <Server className="w-3.5 h-3.5 text-blue-500" />}
                        {n.type === 'db' && <Database className="w-3.5 h-3.5 text-emerald-500" />}
                        {n.type === 'cache' && <Layers className="w-3.5 h-3.5 text-orange-500" />}
                        {n.type === 'firewall' && <Lock className="w-3.5 h-3.5 text-rose-500" />}
                        
                        <span className="text-[11px] font-bold text-slate-800 font-mono">{n.name}</span>
                      </div>

                      <button
                        onClick={() => handleRemoveNode(n.id)}
                        className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-rose-500 rounded transition-opacity"
                        title="Delete element"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {designNodes.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-mono text-xs">
                      Workspace empty. Use elements sidebar to generate custom cluster nodes!
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="z-10 text-[9px] font-mono text-slate-400 text-center">
                  * Hardware allocations simulate auto-generated configurations on isolated PM2 sandbox layers.
                </div>
              </div>

              {/* Generated Infrastructure-as-code View */}
              {isShowingIaC && (
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 font-mono">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                    <span>TERRAFORM IAC INFRASTRUCTURE BLUEPRINT</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedIaCJson);
                        setHomeToast('✓ Blueprint IaC copied to clipboard!');
                      }}
                      className="px-2 py-0.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded text-[10px] transition"
                    >
                      COPY JSON
                    </button>
                  </div>
                  <pre className="text-[10px] text-indigo-400 overflow-x-auto h-48 leading-relaxed">
                    {generatedIaCJson}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
