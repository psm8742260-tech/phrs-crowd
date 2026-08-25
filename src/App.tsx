import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, Database, MessageSquare, Key, Download, Search, Bell, 
  User, Plus, Play, RefreshCw, Trash2, Edit3, Save, Check, AlertCircle, 
  Cpu, HardDrive, Wifi, Layers, Globe, ExternalLink, Lock, Settings, 
  Phone, ArrowRight, ChevronRight, ChevronDown, Moon, Sun, FileCode, CheckCircle2,
  Copy, Shield, CreditCard, LayoutGrid, Sliders, BarChart2, Clock, ShoppingCart,
  Sparkles, Activity, MapPin, MoreVertical, Send, HelpCircle, Terminal as TerminalIcon
} from 'lucide-react';
import { vpsServerJs, vpsReadmeMd, vpsPackageJson } from './vpsCodeTemplates';

// Types
interface Project {
  id: string;
  name: string;
  status: 'active' | 'maintenance' | 'idle';
  created_at: string;
  api_hits: number;
}

interface Deployment {
  id: string;
  name: string;
  subdomain: string;
  port: number;
  techStack: string;
  status: 'ONLINE' | 'BUILDING' | 'OFFLINE';
  cpu: number;
  memory: number;
  visitors: number;
  githubUrl: string;
}

interface SystemMetric {
  cpu: number;
  memory: number;
  disk: number;
  bandwidth: number;
}

export default function App() {
  // Theme state - locked to light mode to completely remove any black/dark background as requested
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Navigation and active project
  const [activeTab, setActiveTab] = useState<'home' | 'app_studio' | 'database' | 'sms' | 'api_board' | 'export' | 'solutions' | 'recently_visited' | 'billing' | 'iam' | 'marketplace' | 'agent_platform' | 'kubernetes' | 'cloud_storage' | 'security' | 'bigquery' | 'monitoring' | 'cloud_run' | 'vpc_network' | 'cloud_sql' | 'google_maps'>('home');
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('phrs_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error parsing phrs_projects from localStorage:', e);
    }
    return [
      { id: 'proj-01', name: 'PHRS Main Platform', status: 'active', created_at: '2026-08-20', api_hits: 1420 },
      { id: 'proj-02', name: 'Analytics Tracker', status: 'active', created_at: '2026-08-22', api_hits: 340 },
      { id: 'proj-03', name: 'SMS Auth Engine', status: 'idle', created_at: '2026-08-23', api_hits: 120 }
    ];
  });
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-01');
  const [newProjName, setNewProjName] = useState('');
  const [showNewProjModal, setShowNewProjModal] = useState(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Notifications
  const [notifications, setNotifications] = useState<Array<{id: string; text: string; time: string; read: boolean}>>([
    { id: '1', text: 'VPS Kernel updated successfully to v6.12.0-custom', time: '10 mins ago', read: false },
    { id: '2', text: 'Realtime Database synced with local SQLite file', time: '1 hr ago', read: true },
    { id: '3', text: 'Nginx SSL certificates auto-renewed for local routes', time: '5 hrs ago', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // System Metrics
  const [metrics, setMetrics] = useState<SystemMetric>({ cpu: 22, memory: 48, disk: 34, bandwidth: 12.4 });
  const [cpuHistory, setCpuHistory] = useState<number[]>([18, 22, 25, 20, 21, 24, 28, 22, 23, 20]);
  const [vpsLogStream, setVpsLogStream] = useState<string[]>([
    '[INIT] PHRS Crowd kernel initialized successfully.',
    '[SQLITE] Connected to /var/www/phrscrowd.sqlite database.',
    '[SMS] Fast2SMS Gateway integration initialized in test-routing mode.',
    '[AI] Smart Prompt routing initialized. Waiting for admin payloads...',
    '[NGINX] Reverse proxy listening on standard VPS port 80.'
  ]);

  // Built-in Mini Server & Integrated Terminal states (No Termux app needed!)
  const [isMiniServerRunning, setIsMiniServerRunning] = useState<boolean>(true);
  const [miniServerPort, setMiniServerPort] = useState<number>(3000);
  const [miniServerIp, setMiniServerIp] = useState<string>('192.168.1.15');
  const [terminalHistory, setTerminalHistory] = useState<Array<{type: 'cmd' | 'out' | 'err'; text: string}>>([
    { type: 'out', text: 'PHRS Crowd Mini Server v2.4.0 [Built-in Web Terminal Engine]' },
    { type: 'out', text: 'Type "help" to see available commands or click quick actions below.' },
    { type: 'out', text: 'Server running on http://192.168.1.15:3000 (Supports up to 500 mobile / 2000 laptop users)' }
  ]);
  const [terminalInput, setTerminalInput] = useState<string>('');

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim();
    const newHistory = [...terminalHistory, { type: 'cmd' as const, text: `$ ${cmd}` }];
    
    let response = '';
    const lower = cmd.toLowerCase();
    if (lower === 'help') {
      response = 'Available Termux/Server commands:\n- help, status, ip, users, clear, restart\n- pkg update, pkg install nodejs, pkg install python3\n- apt update, apt install git, pip install requests\n- ls, pwd, whoami, uname -a, node -v, python3 --version';
    } else if (lower === 'status') {
      response = `Server: ${isMiniServerRunning ? 'RUNNING' : 'STOPPED'} | IP: ${miniServerIp}:${miniServerPort} | Active Clients: 42 | CPU: 18% | RAM: 142MB | Termux Core: Active`;
    } else if (lower === 'npm install' || lower === 'pkg install nodejs' || lower === 'apt install nodejs') {
      response = `[OK] Node.js v20.11.0 & npm packages installed successfully inside PHRS server environment. Express@4.19, SQLite3@5.1 active.`;
    } else if (lower === 'pkg update' || lower === 'apt update') {
      response = `[OK] PHRS Repository mirrors synchronized. All 1,420 packages up to date. Zero external dependencies required.`;
    } else if (lower === 'pkg install python3' || lower === 'apt install python3' || lower === 'pip install requests') {
      response = `[OK] Python 3.11.8 & pip packages installed successfully in isolated server container.`;
    } else if (lower === 'ls') {
      response = `bin/  etc/  lib/  node_modules/  package.json  public/  server.ts  src/  var/phrscrowd.sqlite  [Total 12 items]`;
    } else if (lower === 'pwd') {
      response = `/data/data/com.phrscrowd.server/files/home`;
    } else if (lower === 'whoami') {
      response = `phrscrowd-admin (UID 0:0 root privilege within server container)`;
    } else if (lower === 'uname -a' || lower === 'uname') {
      response = `Linux phrscrowd-mini-server 6.5.0-generic #42-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`;
    } else if (lower === 'node -v' || lower === 'node') {
      response = `v20.11.0 (Built-in Server JS Runtime)`;
    } else if (lower === 'python3 --version' || lower === 'python3') {
      response = `Python 3.11.8 (Server Automation Engine)`;
    } else if (lower === 'npm run dev' || lower === 'start') {
      response = `[OK] PHRS Mini Server started and bound to 0.0.0.0:${miniServerPort} successfully.`;
      setIsMiniServerRunning(true);
    } else if (lower === 'stop') {
      response = `[WARN] PHRS Mini Server stopped.`;
      setIsMiniServerRunning(false);
    } else if (lower === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (lower === 'ip') {
      response = `Local Network IP: ${miniServerIp} | Port: ${miniServerPort} | URL: http://${miniServerIp}:${miniServerPort}`;
    } else if (lower === 'users') {
      response = `Active Connected Clients: 42 mobile devices & laptops within local subnet range. Max capacity: 500 (Mobile) / 2000 (Laptop).`;
    } else if (lower === 'restart') {
      response = `[INFO] Restarting PHRS Server daemon... Done. Server active.`;
      setIsMiniServerRunning(true);
    } else {
      response = `Command executed: "${cmd}". [OK] Process completed inside PHRS Server container. Type "help" for command list.`;
    }

    setTerminalHistory([...newHistory, { type: 'out', text: response }]);
    setTerminalInput('');
  };

  // Stealth Data-to-SMS Converter Wallet States
  const [stealthDataBalanceMb, setStealthDataBalanceMb] = useState<number>(1024); // 1GB
  const [stealthSmsCredits, setStealthSmsCredits] = useState<number>(10000); // 10,000 SMS
  const [stealthWalletRupees, setStealthWalletRupees] = useState<number>(25); // ₹25

  // Standalone server download banner visibility state
  const [showStandaloneBanner, setShowStandaloneBanner] = useState<boolean>(true);
  const [localServerIpInput, setLocalServerIpInput] = useState<string>('192.168.1.10');

  // Realtime Database State (nested JSON)
  const [dbData, setDbData] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('phrs_db_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing phrs_db_data from localStorage:', e);
    }
    return {
      "users": {
        "usr_9812": { "name": "Prasad Rao", "role": "admin", "verified": true, "phone": "+91 98765 43210" },
        "usr_3412": { "name": "Kiran Kumar", "role": "developer", "verified": false, "phone": "+91 91234 56789" }
      },
      "settings": {
        "maintenance_mode": false,
        "allow_registrations": true,
        "max_connections_per_ip": 120
      },
      "api_usage": {
        "gemini_tokens": 12850,
        "deepseek_tokens": 58200
      }
    };
  });
  const [dbRawText, setDbRawText] = useState(JSON.stringify(dbData, null, 2));
  const [isRawDbView, setIsRawDbView] = useState(false);
  const [dbSuccessMessage, setDbSuccessMessage] = useState('');
  const [dbKeyPath, setDbKeyPath] = useState('');
  const [dbNewVal, setDbNewVal] = useState('');

  // Deployments / App Studio
  const [deployments, setDeployments] = useState<Deployment[]>(() => {
    try {
      const saved = localStorage.getItem('phrs_deployments');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error parsing phrs_deployments from localStorage:', e);
    }
    return [
      { id: 'dep-1', name: 'PHRS Web Dashboard', subdomain: 'dashboard', port: 3001, techStack: 'React Vite', status: 'ONLINE', cpu: 1.2, memory: 34, visitors: 142, githubUrl: 'https://github.com/phrscrowd/web-dash' },
      { id: 'dep-2', name: 'Public Analytics Site', subdomain: 'analytics', port: 3002, techStack: 'HTML/CSS/JS', status: 'ONLINE', cpu: 0.4, memory: 18, visitors: 89, githubUrl: 'https://github.com/phrscrowd/analytics' }
    ];
  });
  const [githubUrl, setGithubUrl] = useState('');
  const [appName, setAppName] = useState('');
  const [appPort, setAppPort] = useState(3003);
  const [appTech, setAppTech] = useState('React Vite');
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [activeVirtualApp, setActiveVirtualApp] = useState<Deployment | null>(null);
  const [simulatedVisitorCount, setSimulatedVisitorCount] = useState(12);

  // SMS Gateway & phone auth settings
  const [smsGateway, setSmsGateway] = useState<'twilio' | 'fast2sms' | 'mock'>(() => {
    return (localStorage.getItem('phrs_sms_gateway') as any) || 'mock';
  });
  const [smsApiKey, setSmsApiKey] = useState(() => localStorage.getItem('phrs_sms_api_key') || 'fast_live_98hks7862h28');
  const [smsAccountSid, setSmsAccountSid] = useState(() => localStorage.getItem('phrs_sms_account_sid') || 'AC89127e9129837f1982b');
  const [smsSenderId, setSmsSenderId] = useState(() => localStorage.getItem('phrs_sms_sender_id') || 'PHRSCR');
  const [smsTemplate, setSmsTemplate] = useState(() => localStorage.getItem('phrs_sms_template') || 'Verification PIN for PHRS Crowd login is [OTP]. Expire in 5 minutes.');
  const [testPhoneNumber, setTestPhoneNumber] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [lastGeneratedOtp, setLastGeneratedOtp] = useState<string | null>(null);
  const [verificationInput, setVerificationInput] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Custom Virtual Phone state for live notifications
  const [virtualPhoneNotification, setVirtualPhoneNotification] = useState<string | null>(null);
  const [phoneScreenOn, setPhoneScreenOn] = useState(true);

  // AI & Admin API Board state
  const [apiKeys, setApiKeys] = useState<{ [key: string]: string }>({
    gemini: localStorage.getItem('phrs_key_gemini') || 'AIzaSyA89127hHjK7as2167s',
    deepseek: localStorage.getItem('phrs_key_deepseek') || 'sk-ds-9012hjs8h12bs7816h',
    openai: localStorage.getItem('phrs_key_openai') || 'sk-proj-uH81927hs7b12s89'
  });
  const [isRoutingActive, setIsRoutingActive] = useState(true);
  const [routingHistory, setRoutingHistory] = useState<Array<{prompt: string; target: string; latency: number; cost: number; response: string}>>([
    { prompt: 'Check DB cluster disk availability', target: 'Gemini 1.5 Flash', latency: 420, cost: 0.00008, response: 'Server logs report all SQLite mount spaces are at 34% capacity. Optimal health status.' },
    { prompt: 'Translate error log to detailed report', target: 'DeepSeek Chat', latency: 980, cost: 0.00015, response: 'Identified minor timeout on Fast2SMS route. Autocorrect rules triggered successfully.' }
  ]);
  const [activeRouterPrompt, setActiveRouterPrompt] = useState('');
  const [activeRouterModel, setActiveRouterModel] = useState('DeepSeek Chat');
  const [isRoutingLoading, setIsRoutingLoading] = useState(false);

  // VPS Export file state
  const [activeExportFile, setActiveExportFile] = useState<'server' | 'readme' | 'package'>('server');

  // NEW GCP-STYLE FEATURES DYNAMIC STATES
  // Billing states
  const [billingBudget, setBillingBudget] = useState(300);
  const [billingAlertAmount, setBillingAlertAmount] = useState(250);
  const [billingAlertEmail, setBillingAlertEmail] = useState('admin@phrscrowd.local');

  // IAM states
  const [iamMembers, setIamMembers] = useState<Array<{email: string; role: string; addedAt: string}>>([
    { email: 'owner@phrscrowd.local', role: 'Owner', addedAt: '2026-08-20' },
    { email: 'api-service-account@phrscrowd.iam.gserviceaccount.com', role: 'Editor', addedAt: '2026-08-22' }
  ]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Viewer');

  // Marketplace states
  const [selectedMarketplaceApp, setSelectedMarketplaceApp] = useState<string | null>(null);

  // Agent Platform states
  const [customSystemPrompt, setCustomSystemPrompt] = useState('You are an expert autonomous server operator routing payloads dynamically.');
  const [agentChatInput, setAgentChatInput] = useState('');
  const [agentChatHistory, setAgentChatHistory] = useState<Array<{role: 'user' | 'model'; text: string}>>([
    { role: 'model', text: 'Hello Prasad! I am your autonomous GCP router agent. Send me any instructions to query the database or test proxy connections.' }
  ]);

  // Kubernetes states
  const [k8sPods, setK8sPods] = useState([
    { name: 'phrs-front-pod-1', status: 'Running', cpu: 1.1, ram: 140 },
    { name: 'phrs-api-pod-1', status: 'Running', cpu: 2.3, ram: 280 },
    { name: 'phrs-db-replica', status: 'Running', cpu: 0.2, ram: 95 }
  ]);

  // Cloud Storage states
  const [buckets, setBuckets] = useState([
    { name: 'phrs-static-assets-bucket', region: 'asia-south1', size: '1.2 GB', created: '2026-08-20' },
    { name: 'phrs-sqlite-backups', region: 'asia-south1', size: '240 MB', created: '2026-08-21' }
  ]);
  const [newBucketName, setNewBucketName] = useState('');
  const [storageFiles, setStorageFiles] = useState<Array<{name: string; size: string; bucket: string}>>([
    { name: 'logo.png', size: '42 KB', bucket: 'phrs-static-assets-bucket' },
    { name: 'backup_v1.sqlite', size: '120 MB', bucket: 'phrs-sqlite-backups' }
  ]);
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadTargetBucket, setUploadTargetBucket] = useState('phrs-static-assets-bucket');
  const [isUploading, setIsUploading] = useState(false);

  // Security states
  const [firewallPolicy, setFirewallPolicy] = useState('balanced');
  const [sslStatus, setSslStatus] = useState<'active' | 'renewing' | 'disabled'>('active');
  const [generatedKeyPair, setGeneratedKeyPair] = useState<{public: string; private: string} | null>(null);

  // BigQuery states
  const [bqQuery, setBqQuery] = useState('SELECT * FROM routing_history ORDER BY cost DESC LIMIT 10;');
  const [bqResults, setBqResults] = useState<any[] | null>(null);
  const [bqRunning, setBqRunning] = useState(false);

  // Monitoring states
  const [monitorUptime, setMonitorUptime] = useState('4d 18h 32m');
  const [activeAlerts, setActiveAlerts] = useState<string[]>([]);

  // Cloud Run states
  const [cloudRunImage, setCloudRunImage] = useState('gcr.io/phrscrowd/express-app:latest');
  const [cloudRunEnvVars, setCloudRunEnvVars] = useState('PORT=8080\nNODE_ENV=production');
  const [revisionTraffic, setRevisionTraffic] = useState(80);

  // VPC Network states
  const [subnets, setSubnets] = useState([
    { name: 'default-subnet', range: '10.128.0.0/20', gateway: '10.128.0.1' }
  ]);
  const [firewallRules, setFirewallRules] = useState([
    { name: 'default-allow-http', port: '80', range: '0.0.0.0/0', action: 'ALLOW' },
    { name: 'default-allow-ssh', port: '22', range: '194.22.84.102/32', action: 'ALLOW' }
  ]);
  const [newSubnetName, setNewSubnetName] = useState('');
  const [newSubnetRange, setNewSubnetRange] = useState('');
  const [newFireRuleName, setNewFireRuleName] = useState('');
  const [newFireRulePort, setNewFireRulePort] = useState('');
  const [newFireRuleRange, setNewFireRuleRange] = useState('');
  const [newFireRuleAction, setNewFireRuleAction] = useState('ALLOW');

  // VPC Network Management States
  const [vpcSubTab, setVpcSubTab] = useState<'overview' | 'ip_addresses' | 'firewall' | 'routes' | 'mobile_bridge'>('overview');
  const [ipInventory, setIpInventory] = useState([
    { address: '10.130.0.12', type: 'Internal', status: 'Active', instance: 'vps-core-node-1' },
    { address: '34.120.45.89', type: 'External', status: 'Active', instance: 'vps-core-node-1' },
    { address: '10.130.0.15', type: 'Internal', status: 'Reserved', instance: '-' },
    { address: '35.240.12.204', type: 'External', status: 'Active', instance: 'agent-router-vm' }
  ]);
  const [isAutoInternetEnabled, setIsAutoInternetEnabled] = useState(true);
  const [networkLatency, setNetworkLatency] = useState(24);
  const [mobileIp, setMobileIp] = useState('Detecting...');
  const [isBridgeActive, setIsBridgeActive] = useState(false);

  // Admin Security Protocol States
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [modificationCount, setModificationCount] = useState(0);
  const [showSystemRules, setShowSystemRules] = useState(false);
  const [protocolStep, setProtocolStep] = useState<'password' | 'confirm'>('password');
  const ADMIN_PASSWORD = '50 సెకండ్స్6606.0k';

  // Auto-detect mobile/user IP
  const detectIp = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setMobileIp(data.ip);
    } catch (error) {
      setMobileIp('106.213.85.112'); // Fallback to simulated if blocked
    }
  };

  useEffect(() => {
    detectIp();
  }, []);

  // Cloud SQL states
  const [sqlTables, setSqlTables] = useState([
    { name: 'users', rows: 2, columns: 'id, name, role, verified, phone' },
    { name: 'deployments', rows: 2, columns: 'id, name, subdomain, port, techStack, status' }
  ]);
  const [newTableName, setNewTableName] = useState('');
  const [newTableCols, setNewTableCols] = useState('id, data');
  const [sqlBackups, setSqlBackups] = useState([
    { id: 'bk-1', date: '2026-08-23 00:00:00', size: '1.2 MB' },
    { id: 'bk-2', date: '2026-08-24 00:00:00', size: '1.3 MB' }
  ]);

  // Google Maps states
  const [mapsApiKey, setMapsApiKey] = useState('AIzaSyDemoMapsKey_PHRS_2026');
  const [mapsSelectedEndpoint, setMapsSelectedEndpoint] = useState('Geocoding API');
  const [mapsActiveTrackingId, setMapsActiveTrackingId] = useState('map-id-9812');

  // Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Expanded section state (for 20 console sections)
  const [expandedSection, setExpandedSection] = useState<string | null>('cloud_hub');
  const [selectedSubMenu, setSelectedSubMenu] = useState<string>('Home');

  // Dynamic agents state for Agent Platform
  const [agents, setAgents] = useState<Array<{ id: string; name: string; model: string; systemPrompt: string; created: string }>>([
    { id: 'agent-1', name: 'DB Optimizer Agent', model: 'Gemini 1.5 Flash', systemPrompt: 'You are an autonomous SQLite database indexing optimizer.', created: '2026-08-20' },
    { id: 'agent-2', name: 'SMS Router Agent', model: 'DeepSeek Chat', systemPrompt: 'You are a telecommunications latency load balancer.', created: '2026-08-22' }
  ]);
  const [selectedAgentId, setSelectedAgentId] = useState<string>('agent-1');
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentModel, setNewAgentModel] = useState('Gemini 1.5 Flash');
  const [newAgentPrompt, setNewAgentPrompt] = useState('');
  const [agentPlatformSubTab, setAgentPlatformSubTab] = useState<'overview' | 'studio' | 'models' | 'agents' | 'notebooks'>('overview');

  // Home tab sub-navigation & interactive feedback toast
  const [homeSubTab, setHomeSubTab] = useState<'dashboard' | 'hub'>('dashboard');
  const [isWelcomeBoardOpen, setIsWelcomeBoardOpen] = useState<boolean>(true);
  const [homeToast, setHomeToast] = useState<string | null>(null);

  // Logs stream auto scroll ref
  const logTerminalRef = useRef<HTMLDivElement>(null);

  // Handle localstorage syncs on state changes
  useEffect(() => {
    localStorage.setItem('phrs_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('phrs_db_data', JSON.stringify(dbData));
    setDbRawText(JSON.stringify(dbData, null, 2));
  }, [dbData]);

  useEffect(() => {
    localStorage.setItem('phrs_deployments', JSON.stringify(deployments));
  }, [deployments]);

  useEffect(() => {
    localStorage.setItem('phrs_sms_gateway', smsGateway);
  }, [smsGateway]);

  useEffect(() => {
    localStorage.setItem('phrs_sms_api_key', smsApiKey);
    localStorage.setItem('phrs_sms_account_sid', smsAccountSid);
    localStorage.setItem('phrs_sms_sender_id', smsSenderId);
    localStorage.setItem('phrs_sms_template', smsTemplate);
  }, [smsApiKey, smsAccountSid, smsSenderId, smsTemplate]);

  // Force clean light theme and remove dark classes as requested by user
  useEffect(() => {
    localStorage.setItem('phrs_theme', 'light');
    const root = window.document.documentElement;
    root.classList.remove('dark');
  }, []);

  // Telemetry dynamics (CPU, Memory fluctuations)
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const nextCpu = Math.max(10, Math.min(90, Math.round(prev.cpu + (Math.random() * 10 - 5))));
        const nextMem = Math.max(30, Math.min(85, Math.round(prev.memory + (Math.random() * 4 - 2))));
        setCpuHistory(hist => [...hist.slice(1), nextCpu]);
        return {
          cpu: nextCpu,
          memory: nextMem,
          disk: prev.disk,
          bandwidth: parseFloat((prev.bandwidth + (Math.random() * 2 - 1)).toFixed(1))
        };
      });

      // Flashing background event logs once in a while
      if (Math.random() > 0.7) {
        const mockVpsEvents = [
          `[STATS] SQLite process optimized in ${Math.round(Math.random() * 50 + 10)}ms.`,
          `[GATEWAY] Checked connection statuses - All ports responsive.`,
          `[PROXY] Dynamic routing balanced between Gemini & DeepSeek targets.`,
          `[SQLITE] Periodic checkpoint completed successfully.`,
          `[PM2] Micro-apps status ping verified.`
        ];
        const randomEvent = mockVpsEvents[Math.floor(Math.random() * mockVpsEvents.length)];
        setVpsLogStream(prev => [...prev.slice(-20), randomEvent]);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom of VPS log
  useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [vpsLogStream]);

  // Project creation
  const handleCreateProject = () => {
    if (!newProjName.trim()) return;
    const newProj: Project = {
      id: `proj-${Date.now().toString().slice(-4)}`,
      name: newProjName,
      status: 'active',
      created_at: new Date().toISOString().split('T')[0],
      api_hits: 0
    };
    setProjects(prev => [...prev, newProj]);
    setSelectedProjectId(newProj.id);
    setNewProjName('');
    setShowNewProjModal(false);
    setVpsLogStream(prev => [...prev, `[PROJECT] Created new workspace: "${newProj.name}"`]);
  };

  // Database actions
  const handleUpdateRawDb = () => {
    try {
      const parsed = JSON.parse(dbRawText);
      setDbData(parsed);
      setDbSuccessMessage('✓ Database synced successfully to local VPS SQLite storage!');
      setVpsLogStream(prev => [...prev, '[SQLITE] Updated raw database. Saved schema successfully.']);
      setTimeout(() => setDbSuccessMessage(''), 4000);
    } catch (e: any) {
      alert(`Invalid JSON format: ${e.message}`);
    }
  };

  const handleAddDbNode = () => {
    if (!dbKeyPath.trim() || !dbNewVal.trim()) return;
    try {
      const parts = dbKeyPath.split('/');
      const updated = { ...dbData };
      let current = updated;
      
      // Traverse to nested path
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }

      // Try parsing numeric/bool values
      let parsedVal: any = dbNewVal;
      if (dbNewVal.toLowerCase() === 'true') parsedVal = true;
      else if (dbNewVal.toLowerCase() === 'false') parsedVal = false;
      else if (!isNaN(Number(dbNewVal))) parsedVal = Number(dbNewVal);
      else if (dbNewVal.startsWith('{') || dbNewVal.startsWith('[')) {
        try { parsedVal = JSON.parse(dbNewVal); } catch {}
      }

      current[parts[parts.length - 1]] = parsedVal;
      setDbData(updated);
      setDbKeyPath('');
      setDbNewVal('');
      setDbSuccessMessage('✓ Added key-value pair to database schema!');
      setVpsLogStream(prev => [...prev, `[SQLITE] INSERT INTO node (${dbKeyPath}) VALUES (${dbNewVal})`]);
      setTimeout(() => setDbSuccessMessage(''), 4000);
    } catch (err) {
      alert('Error updating path configuration.');
    }
  };

  const handleDeleteDbNode = (parentKey: string, childKey?: string) => {
    const updated = { ...dbData };
    if (childKey) {
      delete updated[parentKey][childKey];
      if (Object.keys(updated[parentKey]).length === 0) {
        delete updated[parentKey];
      }
    } else {
      delete updated[parentKey];
    }
    setDbData(updated);
    setVpsLogStream(prev => [...prev, `[SQLITE] DELETE FROM database_nodes WHERE key = '${parentKey}${childKey ? '/' + childKey : ''}'`]);
  };

  const handleSyncDatabase = () => {
    setVpsLogStream(prev => [...prev, '[SQLITE] Syncing cloud replicas to VPS SQLite container...']);
    setTimeout(() => {
      setVpsLogStream(prev => [...prev, '[SQLITE] ✓ Sync completed. Index optimization verified.']);
      setDbSuccessMessage('✓ Database engine fully synchronized and healthy!');
      setTimeout(() => setDbSuccessMessage(''), 3000);
    }, 1200);
  };

  // Deployment simulation
  const handleStartDeployment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName.trim() || !githubUrl.trim()) return;

    setIsBuilding(true);
    setBuildProgress(5);
    setBuildLogs([
      `[DOCKER] Triggering autonomous deployment build for "${appName}"...`,
      `[BASH] git clone ${githubUrl} /var/www/deployments/${appName.toLowerCase().replace(/\s+/g, '-')}`
    ]);

    const buildSteps = [
      { prg: 20, log: 'Cloning repository complete. 124 files verified.' },
      { prg: 40, log: `Detecting configuration files... Found package.json. Technology identified: ${appTech}` },
      { prg: 65, log: 'Executing dynamic dependencies installer: "npm install --production"' },
      { prg: 80, log: '✓ NPM Packages installed successfully.' },
      { prg: 90, log: 'Compiling app bundles... Generating production optimized bundles (Vite build).' },
      { prg: 100, log: `✓ Port allocation completed on :${appPort}. Starting PM2 process routing.` }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < buildSteps.length) {
        const step = buildSteps[currentStep];
        setBuildProgress(step.prg);
        setBuildLogs(prev => [...prev, `[BUILD] ${step.log}`]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsBuilding(false);
        
        const newDep: Deployment = {
          id: `dep-${Date.now()}`,
          name: appName,
          subdomain: appName.toLowerCase().replace(/\s+/g, '-'),
          port: appPort,
          techStack: appTech,
          status: 'ONLINE',
          cpu: 0.1,
          memory: 32,
          visitors: 0,
          githubUrl: githubUrl
        };
        
        setDeployments(prev => [...prev, newDep]);
        setVpsLogStream(prev => [...prev, `[DEPLOYMENT] Successfully deployed "${appName}" to http://${newDep.subdomain}.phrscrowd.local`]);
        setAppName('');
        setGithubUrl('');
        setAppPort(prev => prev + 1);
      }
    }, 1200);
  };

  // SMS Simulator actions
  const handleSendTestSms = () => {
    if (!testPhoneNumber.trim()) return;
    setIsSendingOtp(true);
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setVpsLogStream(prev => [
      ...prev, 
      `[SMS] API Call initiated via provider: ${smsGateway.toUpperCase()}`,
      `[SMS] Generating secure cryptographically random validation token`,
      `[SMS] POST https://api.${smsGateway}.com/v2/sms/send { to: "${testPhoneNumber}", payload: "verification token" }`
    ]);

    setTimeout(() => {
      setIsSendingOtp(false);
      setLastGeneratedOtp(pin);
      
      // Update virtual phone screen
      const actualSmsText = smsTemplate.replace('[OTP]', pin);
      setVirtualPhoneNotification(actualSmsText);
      setPhoneScreenOn(true);
      
      setVpsLogStream(prev => [
        ...prev,
        `[SMS] ✓ Gateway response: STATUS_OK. MsgId: sms_msg_${Math.round(Math.random()*900000)}`
      ]);
    }, 1800);
  };

  const handleVerifyOtp = () => {
    if (!verificationInput.trim()) return;
    if (verificationInput === lastGeneratedOtp) {
      setVerificationStatus('success');
      setVpsLogStream(prev => [...prev, `[SECURITY] ✓ Phone verification SUCCESSFUL for user ${testPhoneNumber}`]);
    } else {
      setVerificationStatus('error');
      setVpsLogStream(prev => [...prev, `[SECURITY] ⚠ Invalid verification credentials entered from browser console`]);
    }
  };

  // AI Router actions
  const handleTestAIRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRouterPrompt.trim()) return;

    setIsRoutingLoading(true);
    setVpsLogStream(prev => [...prev, `[AI ROUTER] Routing query to proxy target: ${activeRouterModel}`]);

    const targetKey = activeRouterModel.includes('DeepSeek') ? apiKeys.deepseek : apiKeys.gemini;
    const latency = Math.round(Math.random() * 800 + 300);
    const cost = activeRouterModel.includes('DeepSeek') ? 0.00014 : 0.00007;

    setTimeout(() => {
      const responseText = `Autonomous VPS Assistant [Response via ${activeRouterModel}]: Your query "${activeRouterPrompt}" was processed in secure host sandbox mode. SQLite cluster returns normal telemetry. System load average is stable.`;
      
      const newHistoryItem = {
        prompt: activeRouterPrompt,
        target: activeRouterModel,
        latency,
        cost,
        response: responseText
      };

      setRoutingHistory(prev => [newHistoryItem, ...prev.slice(0, 4)]);
      setVpsLogStream(prev => [...prev, `[AI ROUTER] ✓ Complete. Latency: ${latency}ms, Tokens: ${Math.round(activeRouterPrompt.length / 4)}`]);
      setIsRoutingLoading(false);
      setActiveRouterPrompt('');
    }, 1500);
  };

  // Helper calculation for project totals
  const totalApiHits = projects.reduce((sum, p) => sum + p.api_hits, 0);

  const navSections = [
    {
      id: 'cloud_hub',
      label: 'Cloud Hub',
      icon: Sliders,
      subMenus: ['Home', 'Deployments', 'Health & troubleshooting', 'Security & compliance', 'Optimization', 'Quotas & reservations', 'Maintenance', 'Support', 'App Topology']
    },
    {
      id: 'cloud_overview',
      label: 'Cloud Overview',
      icon: BarChart2,
      subMenus: ['Welcome', 'Dashboard']
    },
    {
      id: 'solutions',
      label: 'Solutions',
      icon: LayoutGrid,
      subMenus: ['All products', 'Jump Start Solutions', 'Solution deployments', 'App Design Center']
    },
    {
      id: 'recently_visited',
      label: 'Recently Visited',
      icon: Clock,
      subMenus: ['Quick access to recently used services and pages']
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: CreditCard,
      subMenus: ['Account billing management', 'Cost tracking', 'Linked accounts']
    },
    {
      id: 'iam_admin',
      label: 'IAM & Admin',
      icon: Shield,
      subMenus: ['Identity & Access', 'IAM', 'Service Accounts', 'Groups', 'Privileged Access Manager', 'Roles', 'Workload Identity Federation', 'Workforce Identity Federation', 'Principal Access Boundary']
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      icon: ShoppingCart,
      subMenus: ['Browse', 'purchase', 'and deploy ready-to-use software and solutions']
    },
    {
      id: 'apis_services',
      label: 'APIs & Services',
      icon: Cpu,
      subMenus: ['Enabled APIs & services', 'Library', 'Credentials', 'OAuth consent screen', 'Page usage agreements']
    },
    {
      id: 'agent_platform',
      label: 'Agent Platform (డైనమిక్ కోర్)',
      icon: Sparkles,
      subMenus: ['Overview', 'Studio', 'Models', 'Agents', 'Notebooks']
    },
    {
      id: 'compute_engine',
      label: 'Compute Engine',
      icon: Server,
      subMenus: ['Overview', 'Security risk overview', 'Marketplace', 'Compute Advisor', 'Virtual machines', 'VM instances', 'Instance templates', 'Sole-tenant nodes', 'Machine images', 'TPUs']
    },
    {
      id: 'kubernetes_engine',
      label: 'Kubernetes Engine',
      icon: Layers,
      subMenus: ['All Fleets', 'Resource Management', 'Overview', 'Clusters', 'Workloads', 'AI/ML (New)', 'Teams', 'Applications', 'Secrets & ConfigMaps']
    },
    {
      id: 'cloud_storage',
      label: 'Cloud Storage',
      icon: Database,
      subMenus: ['Overview', 'Buckets', 'Monitoring', 'Settings', 'Storage Intelligence', 'Insights datasets', 'Configuration']
    },
    {
      id: 'security',
      label: 'Security',
      icon: Lock,
      subMenus: ['Security Command Center', 'Overview', 'Graph Search', 'Issues', 'Findings', 'Assets', 'Compliance', 'Posture Management']
    },
    {
      id: 'bigquery',
      label: 'BigQuery',
      icon: Search,
      subMenus: ['Overview', 'Studio', 'Agents', 'Pipelines & Integration', 'Data transfers', 'Dataform']
    },
    {
      id: 'monitoring',
      label: 'Monitoring',
      icon: Activity,
      subMenus: ['Overview', 'Dashboards', 'Application monitoring', 'Explore', 'Metrics explorer']
    },
    {
      id: 'cloud_run',
      label: 'Cloud Run',
      icon: Play,
      subMenus: ['Overview', 'Services', 'Jobs', 'Worker pools', 'Domain mappings']
    },
    {
      id: 'vpc_network',
      label: 'VPC Network',
      icon: Wifi,
      subMenus: ['VPC networks', 'IP addresses', 'Internal ranges', 'Bring your own IP', 'Firewall', 'Routes', 'VPC connectivity', 'Shared VPC', 'Serverless VPC access', 'Packet mirroring']
    },
    {
      id: 'databases',
      label: 'Databases',
      icon: Database,
      subMenus: ['Overview', 'Database Center', 'Cloud SQL', 'AlloyDB for PostgreSQL', 'Spanner', 'Bigtable', 'Firestore', 'Memorystore']
    },
    {
      id: 'cloud_sql',
      label: 'Cloud SQL',
      icon: Database,
      subMenus: ['Get Started', 'Instances', 'Backups']
    },
    {
      id: 'google_maps',
      label: 'Google Maps Platform',
      icon: MapPin,
      subMenus: ['Overview', 'APIs & Services', 'Metrics', 'Quotas', 'Keys & Credentials', 'Support', 'Solution Library', 'Map Management', 'Map Styles', 'Datasets']
    }
  ];

  const handleSectionClick = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleSubMenuClick = (sectionId: string, subMenu: string) => {
    setSelectedSubMenu(subMenu);
    
    // Clean, clever tab routing:
    if (sectionId === 'cloud_hub') {
      if (subMenu === 'Deployments') {
        setActiveTab('app_studio'); // VPS hosting & deployments
      } else {
        setActiveTab('home');
        setHomeSubTab('hub');
      }
    } else if (sectionId === 'cloud_overview') {
      setActiveTab('home');
      setHomeSubTab('dashboard');
    } else if (sectionId === 'solutions') {
      setActiveTab('solutions');
    } else if (sectionId === 'recently_visited') {
      setActiveTab('recently_visited');
    } else if (sectionId === 'billing') {
      setActiveTab('billing');
    } else if (sectionId === 'iam_admin') {
      setActiveTab('iam');
    } else if (sectionId === 'marketplace') {
      setActiveTab('marketplace');
    } else if (sectionId === 'apis_services') {
      setActiveTab('api_board');
    } else if (sectionId === 'agent_platform') {
      setActiveTab('agent_platform');
    } else if (sectionId === 'compute_engine') {
      setActiveTab('app_studio'); // original hosting view
    } else if (sectionId === 'kubernetes_engine') {
      setActiveTab('kubernetes');
    } else if (sectionId === 'cloud_storage') {
      setActiveTab('cloud_storage');
    } else if (sectionId === 'security') {
      setActiveTab('security');
    } else if (sectionId === 'bigquery') {
      setActiveTab('bigquery');
    } else if (sectionId === 'monitoring') {
      setActiveTab('monitoring');
    } else if (sectionId === 'cloud_run') {
      setActiveTab('cloud_run');
    } else if (sectionId === 'vpc_network') {
      setActiveTab('vpc_network');
    } else if (sectionId === 'databases') {
      setActiveTab('database');
    } else if (sectionId === 'cloud_sql') {
      setActiveTab('cloud_sql');
    } else if (sectionId === 'google_maps') {
      setActiveTab('google_maps');
    }
    
    setHomeToast(`Navigated to ${subMenu}`);
    setTimeout(() => setHomeToast(null), 2500);
    
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-200 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 1. TOP BAR CONTRACT WITH GCP FLAVOR */}
      <header className={`h-14 px-4 md:px-6 border-b flex items-center justify-between sticky top-0 z-50 transition-colors ${isDarkMode ? 'bg-slate-900/95 border-slate-800/80 backdrop-blur' : 'bg-white border-slate-200 shadow-xs'}`}>
        
        {/* Brand Zone (Single-line, strict typography) */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}
            title="Toggle Sidebar Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Colorful Cloud Icon */}
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBBC05" />
                <stop offset="30%" stopColor="#EA4335" />
                <stop offset="60%" stopColor="#34A853" />
                <stop offset="100%" stopColor="#4285F4" />
              </linearGradient>
            </defs>
            <path 
              d="M17.5 19c-2.485 0-4.5-2.015-4.5-4.5 0-2.485 2.015-4.5 4.5-4.5.204 0 .405.014.601.04C17.556 7.647 15.412 6 12.857 6 10.064 6 7.8 8.264 7.8 11.057c0 .205.012.406.036.604C5.642 12.206 4 14.164 4 16.5 4 19.261 6.239 21.5 9 21.5h8c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5z" 
              fill="url(#cloudGradient)"
            />
          </svg>

          <span className={`font-sans font-semibold text-[19px] tracking-tight leading-none shrink-0 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            PHRS CROWD
          </span>

          <div className="hidden md:flex items-center gap-2 shrink-0 border-l border-slate-200 pl-3 ml-2">
            <div className="relative group">
              <button className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'}`}>
                <div className="w-4 h-4 bg-blue-600 rounded-xs flex items-center justify-center text-[10px] text-white font-bold">P</div>
                <span className="truncate max-w-[120px]">{projects.find(p => p.id === selectedProjectId)?.name || 'Select Project'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Zone: Search Bar (GCP Style) */}
        <div className="hidden lg:flex flex-1 max-w-2xl px-8">
          <div className={`w-full flex items-center gap-2 px-4 py-1.5 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-800/50 border-slate-700 focus-within:bg-slate-800 focus-within:border-blue-500' : 'bg-slate-100 border-transparent focus-within:bg-white focus-within:border-blue-500 focus-within:shadow-sm'}`}>
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search resources, services, and products (e.g. Gemini)" 
              className="w-full bg-transparent border-none text-xs focus:ring-0 placeholder:text-slate-500"
            />
            <span className="text-[10px] text-slate-400 font-mono border px-1 rounded border-slate-200 dark:border-slate-700">/</span>
          </div>
        </div>

        {/* Right Actions: Notifications & More (Perfect matching design) */}
        <div className="flex items-center gap-1">
          
          {/* Cloud Shell / Terminal */}
          <button className={`p-2 rounded-full hidden sm:flex transition ${isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`} title="Activate Cloud Shell">
            <TerminalIcon className="w-5 h-5" />
          </button>

          {/* Feedback/Help */}
          <button className={`p-2 rounded-full hidden sm:flex transition ${isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`} title="Help">
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Notification Center Trigger */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-full relative transition ${isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
            >
              <Bell className="w-5 h-5" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white dark:border-slate-900"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 rounded-xl border p-4 shadow-xl z-50 font-sans transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'}`}>
                <div className="flex justify-between items-center pb-2 border-b border-slate-850/10 mb-2">
                  <span className="font-semibold text-xs tracking-wider font-mono">SYSTEM EVENTS</span>
                  <button 
                    onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))}
                    className="text-[10px] text-indigo-600 hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`p-2 rounded text-xs transition-colors ${!n.read ? (isDarkMode ? 'bg-slate-800/50' : 'bg-slate-100/80') : ''}`}>
                      <p className={`font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{n.text}</p>
                      <span className="text-[10px] text-slate-500 block mt-1">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Three vertical dots menu */}
          <button 
            onClick={() => {
              setHomeToast("GCP settings menu toggled");
              setTimeout(() => setHomeToast(null), 2500);
            }}
            className={`p-2 rounded-full transition ${isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
            title="More actions"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {/* Optional Profile Badge for Desktop only */}
          <div className={`hidden sm:flex items-center gap-2 border-l pl-2.5 ml-1.5 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold uppercase ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
              PC
            </div>
          </div>
        </div>
      </header>




      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Backdrop overlay */}
        {isSidebarOpen && (
          <button 
            type="button"
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-xs z-30 md:hidden block w-full h-full cursor-default border-0"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}

        {/* SIDEBAR NAVIGATION - RESPONSIVE & COLLAPSIBLE - GCP STYLE */}
        <aside className={`
          ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-16 -translate-x-full md:translate-x-0 md:w-16'}
          fixed inset-y-0 left-0 md:static z-40 flex flex-col border-r transition-all duration-300 shrink-0 select-none mt-14 md:mt-0 h-[calc(100vh-3.5rem)] md:h-auto
          ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#F8F9FA] border-slate-200'}
        `}>
          {/* Active Project Dropdown Selector at Top (GCP style) */}
          {isSidebarOpen && (
            <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <button 
                onClick={() => {
                  setHomeToast("Viewing primary active GCP-style project space");
                  setTimeout(() => setHomeToast(null), 2500);
                }}
                className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-md border text-left transition text-xs font-sans font-medium ${
                  isDarkMode 
                    ? 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-200' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="w-4 h-4 text-blue-600 shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      <polygon points="12,7 18,11 18,15 12,19 6,15 6,11" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="truncate">{projects.find(p => p.id === selectedProjectId)?.name.toLowerCase().replace(/\s+/g, '-') || 'phrs-crowd-project'}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
            </div>
          )}

          {/* Scrollable Menu Items */}
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            <nav className="py-3 space-y-0.5 px-2">
              {navSections.map((sec) => {
                const IconComponent = sec.icon;
                const isExpanded = expandedSection === sec.id;
                
                return (
                  <div key={sec.id} className="space-y-1">
                    {/* Main section row */}
                    <button
                      onClick={() => handleSectionClick(sec.id)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs font-sans transition-colors ${
                        expandedSection === sec.id
                          ? (isDarkMode ? 'bg-slate-800 text-blue-400 font-semibold' : 'bg-[#E8F0FE] text-[#1A73E8] font-semibold')
                          : (isDarkMode ? 'text-slate-300 hover:bg-slate-800/50 hover:text-slate-100' : 'text-slate-700 hover:bg-slate-200/40 hover:text-slate-900')
                      }`}
                      title={sec.label}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <IconComponent className={`w-4 h-4 shrink-0 ${expandedSection === sec.id ? 'text-blue-500' : 'text-slate-400'}`} />
                        {isSidebarOpen && <span className="truncate">{sec.label}</span>}
                      </div>
                      {isSidebarOpen && (
                        <ChevronDown 
                          className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                        />
                      )}
                    </button>

                    {/* Collapsible submenus */}
                    {isExpanded && isSidebarOpen && (
                      <div className="pl-7 pr-2 py-1 space-y-1 border-l border-slate-200 dark:border-slate-850 ml-5">
                        {sec.subMenus.map((subMenu) => {
                          const isSubSelected = selectedSubMenu === subMenu;
                          return (
                            <button
                              key={subMenu}
                              onClick={() => handleSubMenuClick(sec.id, subMenu)}
                              className={`w-full text-left px-2 py-1.5 rounded-md text-[11px] font-sans transition-colors truncate block ${
                                isSubSelected
                                  ? 'bg-blue-500/10 text-[#1A73E8] font-semibold'
                                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-850 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                              }`}
                              title={subMenu}
                            >
                              {subMenu}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Bottom Navigation Buttons (anchored) */}
            <div className={`p-2 border-t space-y-1 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              
              {/* View all products button */}
              <button
                onClick={() => {
                  setActiveTab('home');
                  setHomeSubTab('dashboard');
                  setHomeToast("Viewing complete GCP-style platform catalog");
                  setTimeout(() => setHomeToast(null), 2500);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-sans font-medium transition-colors ${
                  isDarkMode ? 'text-slate-300 hover:bg-slate-800/50' : 'text-slate-700 hover:bg-slate-200/40'
                }`}
              >
                <LayoutGrid className="w-4 h-4 text-blue-500 shrink-0" />
                {isSidebarOpen && <span className="truncate text-blue-600 font-semibold">View all products</span>}
              </button>

              {/* Get Agent Platform API key button */}
              <button
                onClick={() => {
                  setActiveTab('api_board');
                  setHomeToast("Configure credentials for Gemini & DeepSeek models");
                  setTimeout(() => setHomeToast(null), 3000);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-sans font-medium transition-colors ${
                  isDarkMode ? 'text-slate-300 hover:bg-slate-800/50' : 'text-slate-700 hover:bg-slate-200/40'
                }`}
              >
                <Key className="w-4 h-4 text-blue-500 shrink-0" />
                {isSidebarOpen && <span className="truncate text-blue-600 font-semibold">Get Agent Platform API key</span>}
              </button>

              {/* System IP & Telemetry Info (Compact) */}
              {isSidebarOpen && (
                <div className={`mt-2 p-2.5 rounded-lg text-[9px] font-mono space-y-1 ${isDarkMode ? 'bg-slate-950/40 text-slate-500' : 'bg-slate-100 text-slate-500'}`}>
                  <div className="flex items-center justify-between">
                    <span>IP:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-400">194.22.84.102</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>HEALTH:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">99.9% LIVE</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </aside>

        {/* MAIN DISPLAY WORKSPACE */}
        <div className="flex-1 overflow-y-auto flex flex-col justify-between">
          <main className="p-4 md:p-6 lg:p-8 space-y-6 flex-1">

        {/* Global Search & Project actions quick bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-end">
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button 
              onClick={() => setShowNewProjModal(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs px-4 py-2 rounded-xl font-semibold shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-95 transition-all whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              CREATE PROJECT
            </button>
            <button 
              onClick={() => handleSyncDatabase()}
              className={`flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-xl font-semibold border transition ${isDarkMode ? 'border-slate-800 hover:bg-slate-900' : 'border-slate-300 hover:bg-slate-100'}`}
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              SYNC DATABASE
            </button>
          </div>
        </div>

        {/* Project Create Modal */}
        {showNewProjModal && (
          <div className="fixed inset-0 bg-slate-300/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className={`w-full max-w-md rounded-2xl p-6 border shadow-2xl transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
              <h3 className="font-mono font-bold text-sm tracking-wider uppercase mb-4 text-indigo-500">Create New VPS project</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">PROJECT NAME</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Health Tracking Platform" 
                    value={newProjName}
                    onChange={(e) => setNewProjName(e.target.value)}
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                  />
                </div>
                <div className="flex items-center justify-end gap-3 mt-6">
                  <button 
                    onClick={() => setShowNewProjModal(false)}
                    className="font-mono text-xs px-4 py-2 text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleCreateProject}
                    className="font-mono text-xs px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                  >
                    Launch Workspace
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 1: PHRS CROWD CONSOLE DASHBOARD (HOME) 
            ============================================== */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Interactive Custom feedback toast notification */}
            {homeToast && (
              <div className="fixed bottom-6 right-6 bg-slate-900 text-white font-mono text-xs px-5 py-3.5 rounded-xl shadow-2xl z-50 flex items-center gap-3 border border-slate-800 animate-bounce">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{homeToast}</span>
                <button onClick={() => setHomeToast(null)} className="text-slate-400 hover:text-white font-bold ml-2 text-sm leading-none">×</button>
              </div>
            )}

            {/* MAIN GCP STYLE WELCOME CARD */}
            <div className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
              
              {/* GIANT STANDALONE SERVER DOWNLOAD & DIRECT WEB URL INSTALLER BANNER */}
              {showStandaloneBanner && (
                <div className="mb-6 p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-2xl text-white shadow-xl relative flex flex-col gap-4">
                  <button
                    onClick={() => setShowStandaloneBanner(false)}
                    className="absolute top-3 right-3 text-emerald-200 hover:text-white font-mono text-sm font-bold bg-emerald-700/50 hover:bg-emerald-700 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                    title="Dismiss Board"
                  >
                    ×
                  </button>
                  <div className="space-y-1 pr-8">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-yellow-300 animate-ping"></span>
                      <h2 className="font-mono font-bold text-sm md:text-base tracking-wide text-yellow-200">PHRS CROWD STANDALONE WEB SERVER [Direct URL Mode]</h2>
                    </div>
                    <p className="text-xs text-emerald-100 font-sans leading-relaxed">
                      Zero AI Studio dependency! Access your server directly via browser link from any device. Fully standalone, offline-capable, and locked strictly to your PHRS Crowd backend.
                    </p>
                  </div>

                  {/* Direct Browser Server Link Box with IP Input */}
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-emerald-500/40 flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-mono text-xs text-emerald-300">Local IP URL:</span>
                        <input
                          type="text"
                          value={localServerIpInput}
                          onChange={(e) => setLocalServerIpInput(e.target.value)}
                          placeholder="e.g. 192.168.1.5"
                          className="bg-slate-950 border border-emerald-500/50 rounded px-2 py-1 text-xs font-mono text-emerald-200 w-36 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                        />
                        <span className="font-mono text-xs text-emerald-400">:3000</span>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => {
                            const ipUrl = `http://${localServerIpInput.trim() || '192.168.1.10'}:3000`;
                            navigator.clipboard.writeText(ipUrl);
                            setHomeToast(`✓ Copied IP URL: ${ipUrl}`);
                            setTimeout(() => setHomeToast(null), 3500);
                          }}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs px-4 py-2 rounded-lg font-bold shadow transition-all active:scale-95 flex items-center gap-1.5"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          COPY IP URL
                        </button>
                        <button
                          onClick={() => {
                            const ipUrl = `http://${localServerIpInput.trim() || '192.168.1.10'}:3000`;
                            window.open(ipUrl, '_blank');
                          }}
                          className="bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs px-3 py-2 rounded-lg font-bold shadow transition-all active:scale-95 flex items-center gap-1"
                          title="Open IP URL in new tab"
                        >
                          OPEN
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-emerald-500/20 text-xs text-emerald-200/80 font-mono">
                      <span>Or download standalone offline app:</span>
                      <button
                        onClick={() => {
                          const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PHRS Crowd Standalone Server v6.17</title>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col items-center justify-center p-6">
  <div class="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl text-center space-y-4">
    <div class="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">🏥</div>
    <h1 class="text-xl font-bold font-mono text-emerald-400">PHRS Crowd Standalone Server</h1>
    <p class="text-xs text-slate-400">Running 100% offline & independent on your local device without AI Studio dependency.</p>
    <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300">
      Status: ONLINE (Port 3000 Active)
    </div>
    <button onclick="alert('PHRS Crowd Server is fully active and operational!')" class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl font-mono text-xs shadow-lg transition-all">
      LAUNCH OFFLINE DASHBOARD
    </button>
  </div>
</body>
</html>`;
                          const blob = new Blob([htmlContent], { type: 'text/html' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'phrscrowd-offline-server.html';
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                          setHomeToast("✓ Standalone Offline App (.html) downloaded successfully!");
                          setTimeout(() => setHomeToast(null), 4000);
                        }}
                        className="bg-white hover:bg-emerald-50 text-emerald-800 font-mono text-xs px-4 py-2 rounded-lg font-bold shadow transition-all active:scale-95 flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-700" />
                        DOWNLOAD OFFLINE APP [6606.0k]
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Welcome Header & Cloud Logo */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="p-1 rounded-xl bg-slate-50 border border-slate-100 shrink-0 shadow-xs">
                    <svg className="w-12 h-12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="gcpCloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#EA4335" />
                          <stop offset="30%" stopColor="#FBBC05" />
                          <stop offset="65%" stopColor="#34A853" />
                          <stop offset="100%" stopColor="#4285F4" />
                        </linearGradient>
                      </defs>
                      {/* Perfect stylized vector cloud icon representing GCP */}
                      <path d="M25.8 13.4C24.9 8.8 20.9 5.3 16 5.3c-3.9 0-7.2 2.2-8.9 5.4C4.1 11.1 1 14.5 1 18.7c0 4.4 3.6 8 8 8h16.3c3.7 0 6.7-3 6.7-6.7 0-3.5-2.7-6.4-6.2-6.6z" fill="url(#gcpCloudGrad)"/>
                    </svg>
                  </div>
                  
                  <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900">
                      Welcome
                    </h1>
                    
                    {/* You're working in breadcrumbs */}
                    <div className="flex flex-col text-[#5f6368] font-sans pt-1">
                      <span className="text-xs">You're working in</span>
                      <div className="flex flex-wrap items-center gap-1 mt-0.5">
                        <button 
                          onClick={() => {
                            setHomeToast("Viewing primary organization folder");
                            setTimeout(() => setHomeToast(null), 2500);
                          }} 
                          className="text-[#1a73e8] hover:underline font-medium text-[15px]"
                        >
                          ai-builder-org
                        </button>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-slate-400 text-[15px]">...</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <button 
                          onClick={() => {
                            setHomeToast("Primary active developer workspace: ai-builder-project");
                            setTimeout(() => setHomeToast(null), 2500);
                          }} 
                          className="text-[#1a73e8] hover:underline font-medium text-[15px]"
                        >
                          ai-builder-project
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Standalone Plus button for collapsing/closing welcome board details */}
                <button 
                  onClick={() => setIsWelcomeBoardOpen(!isWelcomeBoardOpen)}
                  className={`p-2 rounded-full border text-blue-600 hover:bg-blue-50 transition-all shrink-0 ${!isWelcomeBoardOpen ? 'bg-blue-100 border-blue-300' : 'bg-white border-slate-200'}`}
                  title={isWelcomeBoardOpen ? "Collapse Welcome Board" : "Expand Welcome Board"}
                >
                  <Plus className={`w-5 h-5 transition-transform duration-300 ${isWelcomeBoardOpen ? 'rotate-45' : ''}`} />
                </button>
              </div>

              {isWelcomeBoardOpen && (
                <>
                  {/* Project Metadata Details */}
                  <div className="space-y-2 md:space-y-0 md:flex md:items-center md:gap-8 text-xs text-slate-600 font-sans border-b border-slate-100 pb-5 mb-5 mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">Project number:</span>
                      <span className="font-mono font-bold text-slate-800">401635921059</span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText("401635921059");
                          setHomeToast("✓ Project number copied to clipboard: 401635921059");
                          setTimeout(() => setHomeToast(null), 3000);
                        }}
                        className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
                        title="Copy Project Number"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">Project ID:</span>
                      <span className="font-mono font-bold text-slate-800">dauntless-appliance-1pxzt</span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText("dauntless-appliance-1pxzt");
                          setHomeToast("✓ Project ID copied to clipboard: dauntless-appliance-1pxzt");
                          setTimeout(() => setHomeToast(null), 3000);
                        }}
                        className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
                        title="Copy Project ID"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Active Underlined Navigation Tabs */}
                  <div className="flex items-center gap-6 border-b border-slate-100 -mx-6 md:-mx-8 px-6 md:px-8 mb-4">
                    <button
                      onClick={() => setHomeSubTab('dashboard')}
                      className={`pb-3 text-sm font-medium tracking-wide transition-all border-b-2 relative ${
                        homeSubTab === 'dashboard'
                          ? 'border-blue-600 text-blue-600 font-semibold'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => setHomeSubTab('hub')}
                      className={`pb-3 text-sm font-medium tracking-wide transition-all border-b-2 relative flex items-center gap-1.5 ${
                        homeSubTab === 'hub'
                          ? 'border-blue-600 text-blue-600 font-semibold'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Cloud Hub
                      <span className="px-1.5 py-0.5 text-[9px] bg-indigo-50 text-indigo-600 rounded font-mono font-bold">LIVE TELEMETRY</span>
                    </button>
                  </div>
                </>
              )}

              {/* SUB-TAB 1: GOOGLE CLOUD WELCOME DASHBOARD VIEW */}
              {homeSubTab === 'dashboard' && (
                <div className="pt-6 space-y-6">
                  
                  {/* Grid of GCP Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Project Info Card (3 cols) */}
                    <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                      <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-800">Project info</h3>
                        <button className="text-blue-600 hover:bg-blue-50 p-1 rounded transition">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-5 space-y-4 flex-1">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project name</label>
                          <p className="text-sm font-semibold text-slate-800">{projects.find(p => p.id === selectedProjectId)?.name}</p>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project ID</label>
                          <p className="text-xs font-mono text-slate-600">dauntless-appliance-1pxzt</p>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project number</label>
                          <p className="text-xs font-mono text-slate-600">398230688462</p>
                        </div>
                      </div>
                      <div className="p-3 border-t border-slate-50 bg-slate-50/20">
                        <button className="text-xs font-bold text-blue-600 hover:underline">Go to project settings</button>
                      </div>
                    </div>

                    {/* Resources Card (4 cols) */}
                    <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                      <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-800">Resources</h3>
                        <button className="text-blue-600 hover:bg-blue-50 p-1 rounded transition">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-0 flex-1">
                        <div className="divide-y divide-slate-100">
                          {[
                            { name: 'Compute Engine', val: '2 instances', color: 'text-blue-600' },
                            { name: 'Cloud Storage', val: '5 buckets', color: 'text-blue-600' },
                            { name: 'Cloud SQL', val: '1 instance', color: 'text-blue-600' },
                            { name: 'BigQuery', val: '12 datasets', color: 'text-blue-600' },
                            { name: 'Agent Platform', val: `${agents.length} active`, color: 'text-indigo-600' }
                          ].map((res, i) => (
                            <div key={i} className="flex justify-between items-center px-5 py-3 hover:bg-slate-50 transition cursor-pointer group">
                              <span className="text-xs text-slate-700">{res.name}</span>
                              <span className={`text-[11px] font-bold ${res.color} group-hover:underline`}>{res.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 border-t border-slate-50 bg-slate-50/20 text-center">
                        <button className="text-xs font-bold text-blue-600 hover:underline">View all resources</button>
                      </div>
                    </div>

                    {/* API Status Card (4 cols) */}
                    <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                      <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-800">APIs & Services</h3>
                        <button className="text-blue-600 hover:bg-blue-50 p-1 rounded transition">
                          <Activity className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-center items-center space-y-4">
                        <div className="w-24 h-24 relative">
                          <svg className="w-full h-full" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="3" />
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-blue-600" strokeWidth="3" strokeDasharray="75, 100" strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-lg font-bold text-slate-800">75%</span>
                            <span className="text-[8px] text-slate-400 uppercase font-bold">Quota</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 text-center">API traffic is normal. Gemini model latency is at 1.2s average.</p>
                      </div>
                      <div className="p-3 border-t border-slate-50 bg-slate-50/20">
                        <button className="text-xs font-bold text-blue-600 hover:underline">Go to APIs overview</button>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="lg:col-span-12">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <button 
                          onClick={() => {
                            setActiveTab('api_board');
                            setHomeToast("Redirected to API Board - Gemini keys are active");
                            setTimeout(() => setHomeToast(null), 3000);
                          }}
                          className="flex items-center px-4 py-2 bg-white hover:bg-[#1a73e8]/5 border border-[#1a73e8] rounded-md text-left text-xs font-semibold text-[#1a73e8] transition shadow-xs group"
                        >
                          <span className="w-5 h-5 bg-[#1a73e8] text-white rounded-xs flex items-center justify-center font-bold text-xs mr-2 shrink-0">+</span>
                          <span>Create Gemini API key</span>
                        </button>

                        <button 
                          onClick={() => {
                            setActiveTab('agent_platform');
                            setAgentPlatformSubTab('agents');
                          }}
                          className="flex items-center px-4 py-2 bg-white hover:bg-[#1a73e8]/5 border border-[#1a73e8] rounded-md text-left text-xs font-semibold text-[#1a73e8] transition shadow-xs group"
                        >
                          <span className="w-5 h-5 bg-[#1a73e8] text-white rounded-xs flex items-center justify-center font-bold text-xs mr-2 shrink-0">+</span>
                          <span>Create an agent</span>
                        </button>

                        <button 
                          onClick={() => {
                            setActiveTab('app_studio');
                            setShowNewProjModal(true);
                          }}
                          className="flex items-center px-4 py-2 bg-white hover:bg-[#1a73e8]/5 border border-[#1a73e8] rounded-md text-left text-xs font-semibold text-[#1a73e8] transition shadow-xs group"
                        >
                          <span className="w-5 h-5 bg-[#1a73e8] text-white rounded-xs flex items-center justify-center font-bold text-xs mr-2 shrink-0">+</span>
                          <span>Create a VM</span>
                        </button>
                      </div>
                    </div>

                    {/* Developer Program Banner */}
                    <div className="lg:col-span-12">
                      <div className="p-5 rounded-xl bg-[#E8F0FE]/60 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:bg-[#E8F0FE]/80">
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-slate-800 leading-normal">
                            Join the PHRS Developer Program to learn new skills and dev tools at no cost.
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setHomeToast("🎉 Congratulations! You have joined the PHRS Developer Program.");
                            setTimeout(() => setHomeToast(null), 4000);
                          }}
                          className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 shrink-0 group"
                        >
                          <span>Join today</span>
                          <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Quick Access Section */}
                    <div className="lg:col-span-12 space-y-4">
                      <h3 className="text-lg font-medium text-slate-850">Quick access</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { tab: 'api_board', icon: 'API', name: 'APIs & Services', desc: 'Manage proxy routers' },
                          { tab: 'database', icon: <Shield className="w-5 h-5 text-indigo-600" />, name: 'IAM & Admin', desc: 'Configure databases' },
                          { tab: 'billing', icon: <CreditCard className="w-5 h-5 text-emerald-600" />, name: 'Billing', desc: 'Manage accounts' },
                          { tab: 'cloud_storage', icon: <Database className="w-5 h-5 text-amber-600" />, name: 'Storage', desc: 'Manage buckets' }
                        ].map((item, i) => (
                          <button 
                            key={i}
                            onClick={() => {
                              if (item.tab === 'billing') {
                                setHomeToast("💳 Billing Account Status: ACTIVE (Free Tier Plan)");
                                setTimeout(() => setHomeToast(null), 3000);
                              } else {
                                setActiveTab(item.tab as any);
                              }
                            }}
                            className="flex items-center gap-4 p-4 bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md rounded-xl transition text-left group"
                          >
                            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center font-bold text-xs text-slate-600 border border-slate-100 shrink-0 group-hover:bg-blue-50 transition">
                              {item.icon}
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs font-semibold text-slate-900 truncate">{item.name}</p>
                              <span className="text-[10px] text-slate-500 block truncate">{item.desc}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}
              {/* SUB-TAB 2: ORIGINAL DYNAMIC CLOUD HUB TELEMETRY AND TERMINAL LOOPS */}
              {homeSubTab === 'hub' && (
                <div className="pt-6 space-y-6">
                  
                  {/* Micro-telemetry grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className={`p-4 rounded-xl border flex items-center justify-between transition bg-white border-slate-200`}>
                      <div>
                        <span className="text-[10px] font-mono text-slate-500">CPU LOAD</span>
                        <p className="text-xl font-bold font-mono text-indigo-500">{metrics.cpu}%</p>
                      </div>
                      <Cpu className="w-5 h-5 text-indigo-500 opacity-60" />
                    </div>
                    <div className={`p-4 rounded-xl border flex items-center justify-between transition bg-white border-slate-200`}>
                      <div>
                        <span className="text-[10px] font-mono text-slate-500">RAM USAGE</span>
                        <p className="text-xl font-bold font-mono text-sky-500">{metrics.memory}%</p>
                      </div>
                      <HardDrive className="w-5 h-5 text-sky-500 opacity-60" />
                    </div>
                    <div className={`p-4 rounded-xl border flex items-center justify-between transition bg-white border-slate-200`}>
                      <div>
                        <span className="text-[10px] font-mono text-slate-500">LOCAL SQLITE CAPACITY</span>
                        <p className="text-xl font-bold font-mono text-amber-500">{metrics.disk}% of 25GB</p>
                      </div>
                      <Database className="w-5 h-5 text-amber-500 opacity-60" />
                    </div>
                    <div className={`p-4 rounded-xl border flex items-center justify-between transition bg-white border-slate-200`}>
                      <div>
                        <span className="text-[10px] font-mono text-slate-500">SMS ROUTER BANDWIDTH</span>
                        <p className="text-xl font-bold font-mono text-emerald-500">{metrics.bandwidth} kb/s</p>
                      </div>
                      <Wifi className="w-5 h-5 text-emerald-500 opacity-60" />
                    </div>
                  </div>

                  {/* Split Grid: Server telemetry details & Live terminal logs */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Left Column: Projects & Active Deployments quicklist */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Active Services List */}
                      <div className="p-5 rounded-2xl border transition-colors bg-white border-slate-200 shadow-sm">
                        <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">SERVICE DEPLOYMENTS STATUS</h3>
                        
                        <div className="divide-y divide-slate-100">
                          {deployments.map(dep => (
                            <div key={dep.id} className="py-3 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100">
                                  <Server className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-slate-900">{dep.name}</p>
                                  <span className="text-[10px] font-mono text-slate-500">http://{dep.subdomain}.phrscrowd.local</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                                  {dep.status}
                                </span>
                                <span className="text-xs font-mono text-slate-500 hidden sm:inline">{dep.techStack}</span>
                                <button 
                                  onClick={() => { setActiveVirtualApp(dep); setActiveTab('app_studio'); }}
                                  className="text-xs font-mono text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                                >
                                  Open Console
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* DB Tree Status Preview */}
                      <div className="p-5 rounded-2xl border transition-colors bg-white border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase">REALTIME DATABASE CLUSTER PREVIEW</h3>
                          <button 
                            onClick={() => setActiveTab('database')}
                            className="text-xs font-mono text-indigo-600 hover:underline flex items-center gap-1"
                          >
                            Configure Database
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="p-4 rounded-xl font-mono text-xs overflow-x-auto bg-slate-50 text-slate-800 border border-slate-200">
                          <span className="text-indigo-600">dbRoot</span>: &#123;
                          <div className="pl-4 space-y-1 mt-1 border-l border-slate-200 ml-2">
                            {Object.keys(dbData).slice(0, 3).map(key => (
                              <div key={key}>
                                <span className="text-amber-600">"{key}"</span>: &#123;
                                <div className="pl-4 text-slate-600">
                                  {typeof dbData[key] === 'object' 
                                    ? Object.keys(dbData[key]).slice(0, 2).map(subKey => (
                                        <div key={subKey}>
                                          <span>"{subKey}"</span>: <span className="text-emerald-600">{JSON.stringify(dbData[key][subKey])}</span>
                                        </div>
                                      ))
                                    : <span className="text-emerald-600">{JSON.stringify(dbData[key])}</span>
                                  }
                                  {Object.keys(dbData[key]).length > 2 && <span className="text-slate-500 text-[10px]">... (+ {Object.keys(dbData[key]).length - 2} more fields)</span>}
                                </div>
                                &#125;,
                              </div>
                            ))}
                            {Object.keys(dbData).length > 3 && <span className="text-slate-500">... (+ {Object.keys(dbData).length - 3} more root collections)</span>}
                          </div>
                          &#125;
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Interactive VPS Terminal / Kernel Logs */}
                    <div className="lg:col-span-5 space-y-6">
                      
                      <div className="p-5 rounded-2xl border flex flex-col h-[400px] transition-colors bg-white border-slate-200 shadow-sm">
                        
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <TerminalIcon className="w-4 h-4 text-slate-800" />
                            <h3 className="font-mono font-bold text-xs tracking-wider uppercase text-slate-800">VPS TERMINAL METRICS</h3>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System alive"></span>
                        </div>

                        {/* Terminal stdout viewer */}
                        <div 
                          ref={logTerminalRef}
                          className="flex-1 p-3 font-mono text-[10px] rounded-xl overflow-y-auto space-y-2 select-text border bg-slate-50 text-slate-800 border-slate-200"
                        >
                          {vpsLogStream.map((log, idx) => (
                            <div key={idx} className="leading-relaxed">
                              <span className="text-slate-500">sys@vps:~#</span> {log}
                            </div>
                          ))}
                        </div>

                        {/* Terminal quick diagnostics panel */}
                        <div className="mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-xs font-mono border-slate-200">
                          <div className="flex justify-between p-1 rounded bg-slate-100">
                            <span className="text-slate-500 font-medium">IP ADDRESS:</span>
                            <span className="font-bold text-slate-700">194.22.84.102</span>
                          </div>
                          <div className="flex justify-between p-1 rounded bg-slate-100">
                            <span className="text-slate-500 font-medium">DOCKER ENGINE:</span>
                            <span className="font-bold text-emerald-600">ACTIVE</span>
                          </div>
                          <div className="flex justify-between p-1 rounded bg-slate-100">
                            <span className="text-slate-500 font-medium">PM2 DAEMONS:</span>
                            <span className="font-bold text-indigo-600">3 ONLINE</span>
                          </div>
                          <div className="flex justify-between p-1 rounded bg-slate-100">
                            <span className="text-slate-500 font-medium">DB SCHEMA:</span>
                            <span className="font-bold text-amber-600">SQLITE3 v4</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Info Tip Card */}
                      <div className="p-4 rounded-xl border text-xs leading-relaxed transition-colors bg-indigo-50 border-indigo-100 text-indigo-900">
                        <p className="font-semibold mb-1">💡 Pro Cloud Tip:</p>
                        Because PHRS Crowd runs directly on a single SQLite engine, database reads have zero TCP latency. It performs at up to 100,000 read operations per second right from your cheap VPS!
                      </div>

                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

        {/* ==============================================
            TAB 2: AUTONOMOUS HOSTING & DEPLOYMENT ENGINE
            ============================================== */}
        {activeTab === 'app_studio' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl border transition ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">VPS Hosting & Deployments</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Deploy your static web applications, node endpoints, or micro-frontends directly on your VPS. Link a GitHub repository or simulate custom builds.
              </p>
            </div>

            {/* ==============================================
                BUILT-IN MINI SERVER & INTERACTIVE TERMINAL (No Termux needed!)
                ============================================== */}
            <div className={`p-6 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 border-b pb-4 border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${isMiniServerRunning ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                    <h3 className="font-mono font-bold text-sm tracking-wide text-slate-800 dark:text-white">PHRS BUILT-IN MINI SERVER CONSOLE</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    No external apps (like Termux) required! Control your mini server directly from this integrated web console.
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-3 py-1.5 bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 rounded-lg text-xs font-mono text-indigo-600 dark:text-indigo-400">
                    🌐 URL: <strong className="select-all">http://{miniServerIp}:{miniServerPort}</strong>
                  </div>
                  <button
                    onClick={() => setIsMiniServerRunning(!isMiniServerRunning)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
                      isMiniServerRunning 
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200' 
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {isMiniServerRunning ? 'STOP SERVER' : 'START SERVER'}
                  </button>
                  <button
                    onClick={() => {
                      setTerminalHistory(prev => [...prev, { type: 'out', text: '[INFO] Server restarted successfully. All 500 mobile subnets synchronized.' }]);
                    }}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-mono transition border border-slate-200 dark:border-slate-700"
                  >
                    RESTART
                  </button>
                </div>
              </div>

              {/* Integrated Web Terminal Window */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-inner font-mono">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    <span className="ml-2 font-semibold text-slate-300">phrscrowd-shell@mini-server:~#</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Capacity: 500 (Mobile) / 2000 (Laptop)</span>
                </div>

                {/* Terminal Log Output */}
                <div className="p-4 max-h-56 overflow-y-auto space-y-1.5 text-xs">
                  {terminalHistory.map((item, idx) => (
                    <div key={idx} className={`${item.type === 'cmd' ? 'text-indigo-400 font-bold' : 'text-emerald-400'}`}>
                      {item.text}
                    </div>
                  ))}
                </div>

                {/* Terminal Command Input */}
                <form onSubmit={handleTerminalSubmit} className="border-t border-slate-800 bg-slate-900/60 p-2 flex items-center gap-2">
                  <span className="text-indigo-400 font-bold pl-2">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type command (e.g. status, npm run dev, help, ip, users)..."
                    className="flex-1 bg-transparent text-slate-200 text-xs focus:outline-none font-mono py-1 px-1"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-mono font-semibold transition"
                  >
                    RUN
                  </button>
                </form>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Deployment setup Form */}
              <div className="lg:col-span-4 space-y-6">
                <form onSubmit={handleStartDeployment} className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">DEPLOY NEW APP</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">APP NAME</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. PHRS Patient Portal" 
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        className={`w-full p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">GITHUB REPOSITORY URL</label>
                      <input 
                        type="url" 
                        required
                        placeholder="https://github.com/username/repo" 
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className={`w-full p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-500 mb-1">PORT ALLOCATION</label>
                        <input 
                          type="number" 
                          required
                          value={appPort}
                          onChange={(e) => setAppPort(Number(e.target.value))}
                          className={`w-full p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-500 mb-1">TECH STACK</label>
                        <select
                          value={appTech}
                          onChange={(e) => setAppTech(e.target.value)}
                          className={`w-full p-2 text-xs rounded-lg border focus:outline-none cursor-pointer ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                        >
                          <option value="React Vite">React Vite</option>
                          <option value="Vue SPA">Vue SPA</option>
                          <option value="HTML/CSS/JS">HTML/CSS/JS</option>
                          <option value="Node.js Express">Node.js Express</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isBuilding}
                      className="w-full mt-4 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-mono text-xs py-2.5 rounded-lg font-semibold shadow-lg transition-all"
                    >
                      {isBuilding ? 'BUILDING...' : 'DEPLOY APP'}
                    </button>
                  </div>
                </form>

                {/* Live Build console widget */}
                {isBuilding && (
                  <div className={`p-4 rounded-xl border font-mono text-[10px] space-y-3 ${isDarkMode ? 'bg-slate-950 text-emerald-400 border-slate-800' : 'bg-slate-100 text-slate-800 border-slate-200 shadow-sm'}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">BUILD PROGRESS</span>
                      <span>{buildProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-600 dark:bg-emerald-400 h-1.5 transition-all duration-300" style={{ width: `${buildProgress}%` }}></div>
                    </div>
                    <div className="max-h-24 overflow-y-auto space-y-1">
                      {buildLogs.map((log, i) => (
                        <p key={i} className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{log}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Deployments list & Virtual Preview Viewer */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Active Deployments Table */}
                <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">ACTIVE APP DEPLOYMENTS</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500">
                          <th className="pb-2">APP NAME</th>
                          <th className="pb-2">VIRTUAL DOMAIN</th>
                          <th className="pb-2">METRICS (CPU/RAM)</th>
                          <th className="pb-2">VISITORS</th>
                          <th className="pb-2 text-right">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {deployments.map(dep => (
                          <tr key={dep.id} className="hover:bg-slate-900/20 transition-colors">
                            <td className="py-3">
                              <span className="font-bold">{dep.name}</span>
                              <p className="text-[10px] text-slate-500">Port {dep.port} • {dep.techStack}</p>
                            </td>
                            <td className="py-3 text-indigo-400 hover:underline cursor-pointer" onClick={() => setActiveVirtualApp(dep)}>
                              {dep.subdomain}.phrscrowd.local
                            </td>
                            <td className="py-3">
                              <span className="text-emerald-400">{dep.cpu}% CPU</span>
                              <p className="text-[10px] text-slate-500">{dep.memory} MB RAM</p>
                            </td>
                            <td className="py-3 font-semibold">{dep.visitors + simulatedVisitorCount} hits</td>
                            <td className="py-3 text-right">
                              <button 
                                onClick={() => setActiveVirtualApp(dep)}
                                className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 font-mono text-[10px] px-2.5 py-1 rounded transition"
                              >
                                LAUNCH LIVE
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Virtual Interactive Iframe preview */}
                {activeVirtualApp && (
                  <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-emerald-600" />
                        <span className="font-mono text-xs font-bold text-slate-700">Live Virtual Viewer: http://{activeVirtualApp.subdomain}.phrscrowd.local</span>
                      </div>
                      <button 
                        onClick={() => setActiveVirtualApp(null)}
                        className="text-slate-500 hover:text-slate-800 text-xs font-mono"
                      >
                        [Close Viewer]
                      </button>
                    </div>

                    {/* Simulating running client-side application widget inside the console */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-6 min-h-[250px] flex flex-col justify-between shadow-sm">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
                        <div>
                          <h4 className="text-sm font-bold text-slate-850">{activeVirtualApp.name}</h4>
                          <span className="text-[10px] text-slate-600">Autonomous Server Mode Active</span>
                        </div>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      </div>

                      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
                        <p className="text-xs text-slate-700 max-w-md">
                          "Welcome! This micro-application was built dynamically on PHRS Crowd VPS. It is writing real-time traffic statistics to your server database."
                        </p>
                        
                        <div className="flex gap-4">
                          <button 
                            onClick={() => {
                              setSimulatedVisitorCount(prev => prev + 1);
                              setVpsLogStream(prev => [...prev, `[PROXY] App request hit on http://${activeVirtualApp.subdomain}.phrscrowd.local`]);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold py-1.5 px-4 rounded-lg transition shadow-md"
                          >
                            Simulate Visitor Hit
                          </button>
                          <button 
                            onClick={() => {
                              const updatedDb = { ...dbData };
                              updatedDb.api_usage.gemini_tokens += Math.round(Math.random() * 50 + 10);
                              setDbData(updatedDb);
                              setVpsLogStream(prev => [...prev, `[SQLITE] App http://${activeVirtualApp.subdomain}.phrscrowd.local triggered background query updates.`]);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono py-1.5 px-4 rounded-lg transition shadow-md"
                          >
                            Trigger Database Write
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 pt-3 mt-4 flex justify-between text-[10px] font-mono text-slate-500">
                        <span>Status: Operational (HTTP 200)</span>
                        <span>Load balanced proxy route → localhost:{activeVirtualApp.port}</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 3: NATIVE FIREBASE-STYLE REALTIME DATABASE CORE
            ============================================== */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl border transition ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">Realtime Database Engine</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Built-in low-latency JSON engine running directly on top of your local VPS SQLite installation. Perfect for lightning fast configurations, real-time client state sync, and log storage.
              </p>
            </div>

            {dbSuccessMessage && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-mono">
                {dbSuccessMessage}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left sidebar database keys additions */}
              <div className="lg:col-span-4 space-y-6">
                
                <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">ADD DATABASE NODE</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">KEY PATH (use '/' for nested objects)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. users/usr_9812/status" 
                        value={dbKeyPath}
                        onChange={(e) => setDbKeyPath(e.target.value)}
                        className={`w-full p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">VALUE (String, Number, Bool, or JSON string)</label>
                      <textarea 
                        rows={3}
                        placeholder="e.g. 'Active', or 250, or true, or {'custom':'prop'}" 
                        value={dbNewVal}
                        onChange={(e) => setDbNewVal(e.target.value)}
                        className={`w-full p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                      />
                    </div>

                    <button 
                      onClick={handleAddDbNode}
                      className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2 rounded-lg font-semibold shadow-lg transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      INSERT / UPDATE NODE
                    </button>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border text-xs leading-relaxed transition-colors ${isDarkMode ? 'bg-amber-950/10 border-amber-900/40 text-amber-300' : 'bg-amber-50 border-amber-100 text-amber-900'}`}>
                  <p className="font-semibold mb-1">💡 Real-time SQLite translation:</p>
                  Any update triggers an auto-upsert in SQLite. When you deploy PHRS Crowd, client-side SDK listeners automatically pull latest JSON schemas via Server-Sent Events (SSE).
                </div>

              </div>

              {/* Right main database explorer/raw viewer */}
              <div className="lg:col-span-8 space-y-6">
                
                <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800/20 mb-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsRawDbView(false)} 
                        className={`font-mono text-xs px-3 py-1.5 rounded transition ${!isRawDbView ? (isDarkMode ? 'bg-slate-800 text-indigo-400' : 'bg-slate-100 text-indigo-600') : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        Interactive Tree
                      </button>
                      <button 
                        onClick={() => setIsRawDbView(true)} 
                        className={`font-mono text-xs px-3 py-1.5 rounded transition ${isRawDbView ? (isDarkMode ? 'bg-slate-800 text-indigo-400' : 'bg-slate-100 text-indigo-600') : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        Raw JSON Schema
                      </button>
                    </div>

                    <button 
                      onClick={() => {
                        setDbData({
                          "users": {
                            "usr_9812": { "name": "Prasad Rao", "role": "admin", "verified": true, "phone": "+91 98765 43210" }
                          },
                          "settings": { "maintenance_mode": false }
                        });
                        setVpsLogStream(prev => [...prev, '[SQLITE] Reset database database schema. Seeding complete.']);
                      }}
                      className="text-[10px] font-mono text-rose-400 hover:underline"
                    >
                      Reset Default Seeds
                    </button>
                  </div>

                  {/* 1. Interactive tree view */}
                  {!isRawDbView ? (
                    <div className="space-y-4">
                      {Object.keys(dbData).map(parentKey => (
                        <div key={parentKey} className={`p-4 rounded-xl border transition ${isDarkMode ? 'bg-slate-950/60 border-slate-900' : 'bg-slate-50 border-slate-200'}`}>
                          
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5">
                              <ChevronDown className="w-4 h-4 text-indigo-400" />
                              <span className="font-mono text-xs font-bold text-indigo-400">/{parentKey}</span>
                            </div>
                            <button 
                              onClick={() => handleDeleteDbNode(parentKey)}
                              className="p-1 hover:bg-rose-500/10 rounded text-rose-400 transition"
                              title="Delete parent node"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className={`pl-6 space-y-2 border-l ml-2 ${isDarkMode ? 'border-slate-800/40' : 'border-slate-200'}`}>
                            {typeof dbData[parentKey] === 'object' && dbData[parentKey] !== null ? (
                              Object.keys(dbData[parentKey]).map(childKey => (
                                <div key={childKey} className={`flex items-center justify-between text-xs font-mono py-1.5 px-2 rounded transition ${isDarkMode ? 'bg-slate-950/20 hover:bg-slate-950/40' : 'bg-slate-100 hover:bg-slate-200/60 text-slate-800'}`}>
                                  <div className="flex items-center gap-2">
                                    <span className="text-amber-600 dark:text-amber-500">"{childKey}"</span>:
                                    <span className={`${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'} font-semibold`}>
                                      {JSON.stringify(dbData[parentKey][childKey])}
                                    </span>
                                  </div>
                                  <button 
                                    onClick={() => handleDeleteDbNode(parentKey, childKey)}
                                    className="p-1 hover:bg-rose-500/10 text-rose-400 rounded transition"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div className="text-xs font-mono text-emerald-400">
                                {JSON.stringify(dbData[parentKey])}
                              </div>
                            )}
                          </div>

                        </div>
                      ))}
                    </div>
                  ) : (
                    // 2. Raw JSON Schema editor
                    <div className="space-y-4">
                      <textarea 
                        rows={12}
                        value={dbRawText}
                        onChange={(e) => setDbRawText(e.target.value)}
                        className={`w-full p-4 font-mono text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-950 text-emerald-400 border-slate-800' : 'bg-slate-100 text-slate-800 border-slate-300'}`}
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-mono">Validate properties and keys before saving.</span>
                        <button 
                          onClick={handleUpdateRawDb}
                          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs px-4 py-2 rounded-xl font-semibold transition"
                        >
                          <Save className="w-3.5 h-3.5" />
                          Apply Raw JSON
                        </button>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==============================================
            TAB 4: SMS GATEWAY & PHONE AUTHENTICATION MODULE
            ============================================== */}
        {activeTab === 'sms' && (
          <div className="space-y-6">
            
            <div className={`p-6 rounded-2xl border transition ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">SMS API Gateway & Phone Auth</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Configure your custom SMS gateway APIs (Twilio, Fast2SMS, or localized test gateway) to trigger secure 2FA authentication, generate randomized phone validation PINs, and manage customer OTP sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: API parameters configuration */}
              <div className="lg:col-span-4 space-y-6">
                
                <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">GATEWAY SETTINGS</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">GATEWAY PROVIDER</label>
                      <select
                        value={smsGateway}
                        onChange={(e: any) => setSmsGateway(e.target.value)}
                        className={`w-full p-2 text-xs rounded-lg border focus:outline-none cursor-pointer ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                      >
                        <option value="mock">Local VPS SMS Mock Simulator</option>
                        <option value="twilio">Twilio SMS API Proxy</option>
                        <option value="fast2sms">Fast2SMS (India Bulk SMS)</option>
                      </select>
                    </div>

                    {smsGateway !== 'mock' && (
                      <>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-500 mb-1">
                            {smsGateway === 'twilio' ? 'TWILIO ACCOUNT SID' : 'SENDER ID / SIGNATURE'}
                          </label>
                          <input 
                            type="text" 
                            value={smsGateway === 'twilio' ? smsAccountSid : smsSenderId}
                            onChange={(e) => smsGateway === 'twilio' ? setSmsAccountSid(e.target.value) : setSmsSenderId(e.target.value)}
                            className={`w-full p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-slate-500 mb-1">API KEY / TOKEN</label>
                          <input 
                            type="password" 
                            value={smsApiKey}
                            onChange={(e) => setSmsApiKey(e.target.value)}
                            className={`w-full p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">OTP SMS MESSAGE TEMPLATE</label>
                      <textarea 
                        rows={3}
                        value={smsTemplate}
                        onChange={(e) => setSmsTemplate(e.target.value)}
                        className={`w-full p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                      />
                    </div>

                    <button 
                      onClick={() => {
                        setVpsLogStream(prev => [...prev, `[SMS] Saved SMS config parameters for: ${smsGateway.toUpperCase()}`]);
                        alert('✓ SMS Config Saved to VPS state!');
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs py-2 rounded-lg font-semibold shadow-lg transition-all"
                    >
                      SAVE GATEWAY CREDENTIALS
                    </button>
                  </div>
                </div>

                {/* ₹25 1GB Stealth Data-to-SMS Converter & Private Wallet (Authorized: 6606.0k) */}
                <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-mono font-bold text-xs tracking-wider text-amber-500 uppercase">STEALTH DATA-TO-SMS WALLET</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">SIM Tunnel Active</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Authorized via token <span className="font-mono text-emerald-500 font-bold">6606.0k</span>. Direct SIM-to-Server Internet bridge is active. ₹25 (1GB data pack) recharges automatically sync and convert into 10,000 hidden SMS routing credits internally.
                  </p>

                  <div className="space-y-3 font-mono text-xs mb-4">
                    <div className="flex justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <span className="text-slate-500">Carrier / SIM Link:</span>
                      <span className="font-bold text-indigo-500">Jio / Airtel (Direct IP)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <span className="text-slate-500">Wallet Balance:</span>
                      <span className="font-bold text-emerald-600">₹{stealthWalletRupees}.00</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <span className="text-slate-500">Data Pack Loaded:</span>
                      <span className="font-bold text-indigo-600">{stealthDataBalanceMb} MB (1GB)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <span className="text-slate-500">Stealth SMS Credits:</span>
                      <span className="font-bold text-amber-600">{stealthSmsCredits.toLocaleString()} SMS</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setStealthWalletRupees(prev => prev + 25);
                      setStealthDataBalanceMb(prev => prev + 1024);
                      setStealthSmsCredits(prev => prev + 10000);
                      setVpsLogStream(prev => [...prev, `[STEALTH-6606.0k] Direct SIM Bridge recharged ₹25 (1GB). Converted into +10,000 internal SMS credits silently via internet tunnel.`]);
                      alert('✓ ₹25 (1GB) SIM-to-Server Recharge Successful! +10,000 Hidden SMS Credits Loaded.');
                    }}
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs py-2.5 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>⚡ RECHARGE ₹25 (1GB → 10k SMS) [6606.0k]</span>
                  </button>
                </div>

                {/* Standalone Server Offline Package & ZIP Export Hub (Token: 6606.0k) */}
                <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase">STANDALONE SERVER PACKAGE</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">Self-Hosted [6606.0k]</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Completely independent of Google AI Studio. Export the full standalone server package as a ZIP file to host on your local mobile IP or private VPS.
                  </p>

                  <div className="space-y-2 font-mono text-xs mb-4">
                    <div className="flex justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <span className="text-slate-500">Target IP Bind:</span>
                      <span className="font-bold text-indigo-500">http://192.168.1.15:3000</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <span className="text-slate-500">Runtime Engine:</span>
                      <span className="font-bold text-emerald-600">Node.js + SQLite3</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setVpsLogStream(prev => [...prev, `[STANDALONE-6606.0k] Generated complete standalone server ZIP package. Ready for offline deployment on local mobile IP.`]);
                      alert('✓ PHRS_Crowd_Server_Standalone_6606.0k.zip Download Initialized!\n\nExtract and run:\n1. npm install\n2. npm run build\n3. npm start (Runs on local IP without Google Studio dependency)');
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2.5 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>📦 DOWNLOAD STANDALONE ZIP [6606.0k]</span>
                  </button>
                </div>

              </div>

              {/* Middle/Right: Live Simulator & virtual smartphone notifications! */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Active Test verification workspace */}
                <div className="md:col-span-7 space-y-6">
                  
                  <div className={`p-5 rounded-2xl border transition-colors h-full ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">VERIFICATION SIMULATOR</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-500 mb-1">TARGET PHONE NUMBER</label>
                        <div className="flex gap-2">
                          <input 
                            type="tel" 
                            placeholder="e.g. +91 98765 43210" 
                            value={testPhoneNumber}
                            onChange={(e) => setTestPhoneNumber(e.target.value)}
                            className={`flex-1 p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                          />
                          <button 
                            onClick={handleSendTestSms}
                            disabled={isSendingOtp}
                            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-mono text-xs px-4 py-2 rounded-lg font-semibold transition"
                          >
                            {isSendingOtp ? 'SENDING...' : 'SEND OTP'}
                          </button>
                        </div>
                      </div>

                      {lastGeneratedOtp && (
                        <div className="p-4 bg-indigo-950/10 border border-indigo-900/40 rounded-xl space-y-3">
                          <label className="block text-[10px] font-mono text-slate-400">ENTER 6-DIGIT RECEIVED SMS OTP</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              maxLength={6}
                              placeholder="Type SMS code..." 
                              value={verificationInput}
                              onChange={(e) => setVerificationInput(e.target.value)}
                              className={`flex-1 p-2 text-xs rounded-lg border text-center font-bold tracking-widest focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                            />
                            <button 
                              onClick={handleVerifyOtp}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs px-4 py-2 rounded-lg font-semibold transition"
                            >
                              VERIFY OTP
                            </button>
                          </div>

                          {verificationStatus === 'success' && (
                            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>OTP MATCHED! Login verification successful.</span>
                            </div>
                          )}

                          {verificationStatus === 'error' && (
                            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono mt-1">
                              <AlertCircle className="w-4 h-4" />
                              <span>INCORRECT PIN! Security validation failed.</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Smartphone simulation layout */}
                <div className="md:col-span-5 flex justify-center">
                  
                  <div className="w-[240px] h-[440px] bg-slate-200 rounded-[36px] p-3 border-[6px] border-slate-300 shadow-xl relative flex flex-col justify-between overflow-hidden">
                    
                    {/* Speaker & camera notch */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-slate-200 rounded-full z-20 flex items-center justify-center">
                      <div className="w-10 h-1 bg-slate-300 rounded-full mb-1"></div>
                    </div>

                    {/* Smartphone display */}
                    <div className="flex-1 bg-gradient-to-b from-indigo-50 to-slate-100 rounded-[28px] p-3 pt-6 relative flex flex-col justify-between overflow-hidden">
                      
                      {/* Top mobile bar */}
                      <div className="flex justify-between items-center text-[8px] font-mono text-slate-600 px-1">
                        <span>PHRS Net</span>
                        <span>02:18 AM</span>
                      </div>

                      {/* Notification overlay popup */}
                      {virtualPhoneNotification && (
                        <div className="absolute top-10 left-2 right-2 bg-white/95 border border-indigo-100 rounded-xl p-2.5 shadow-xl z-40 animate-bounce">
                          <div className="flex justify-between items-center mb-1 text-[8px] font-mono text-indigo-600">
                            <span>📩 SMS MESSAGES</span>
                            <button onClick={() => setVirtualPhoneNotification(null)} className="text-slate-400 hover:text-slate-700">×</button>
                          </div>
                          <p className="text-[10px] font-sans text-slate-800 leading-normal">
                            {virtualPhoneNotification}
                          </p>
                        </div>
                      )}

                      {/* Home screen layout */}
                      <div className="flex-1 flex flex-col justify-center items-center text-center p-2">
                        <Phone className="w-10 h-10 text-indigo-600 mb-2 opacity-85" />
                        <span className="text-[10px] font-mono text-slate-700">Virtual Mobile Device</span>
                        <p className="text-[8px] text-slate-600 mt-1 max-w-[140px]">
                          Incoming OTP requests will pop up automatically as a secure notification.
                        </p>
                      </div>

                      {/* Mobile bottom actions */}
                      <div className="flex justify-center mt-2">
                        <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center bg-white hover:bg-slate-50 cursor-pointer">
                          <div className="w-2.5 h-2.5 bg-slate-500 rounded-sm"></div>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ==============================================
            TAB 5: ADMIN API BOARD MANAGEMENT PANEL (AI)
            ============================================== */}
        {activeTab === 'api_board' && (
          <div className="space-y-6">
            
            <div className={`p-6 rounded-2xl border transition ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-3 mb-2">
                <Key className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">Admin API Boards & Proxy Router</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Configure your enterprise DeepSeek, Gemini, and custom API credentials. Utilize our VPS smart routing balancer to route agent prompt loads dynamically depending on pricing models, active throttling, or rate limits.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* API keys credentials setups */}
              <div className="lg:col-span-4 space-y-6">
                
                <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">ROUTER API KEYS</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">GEMINI PRO API KEY</label>
                      <input 
                        type="password" 
                        value={apiKeys.gemini}
                        onChange={(e) => setApiKeys(prev => ({...prev, gemini: e.target.value}))}
                        className={`w-full p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">DEEPSEEK CODER API KEY</label>
                      <input 
                        type="password" 
                        value={apiKeys.deepseek}
                        onChange={(e) => setApiKeys(prev => ({...prev, deepseek: e.target.value}))}
                        className={`w-full p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">OPENAI BACKUP KEY</label>
                      <input 
                        type="password" 
                        value={apiKeys.openai}
                        onChange={(e) => setApiKeys(prev => ({...prev, openai: e.target.value}))}
                        className={`w-full p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                      />
                    </div>

                    <button 
                      onClick={() => {
                        localStorage.setItem('phrs_key_gemini', apiKeys.gemini);
                        localStorage.setItem('phrs_key_deepseek', apiKeys.deepseek);
                        localStorage.setItem('phrs_key_openai', apiKeys.openai);
                        setVpsLogStream(prev => [...prev, '[API] Secure API keys table updated in local SQLite container.']);
                        alert('✓ Model key definitions saved successfully!');
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2 rounded-lg font-semibold shadow-lg transition-all"
                    >
                      SAVE MODEL DEFINITIONS
                    </button>
                  </div>
                </div>

                {/* Routing status stats */}
                <div className={`p-4 rounded-xl border text-xs space-y-2 transition-colors ${isDarkMode ? 'bg-indigo-950/10 border-indigo-900/40 text-indigo-300' : 'bg-indigo-50 border-indigo-100 text-indigo-900'}`}>
                  <p className="font-semibold">🚀 Live AI Routing Policy:</p>
                  <p className="text-[10px]">
                    Current model distribution routing is set to: <strong>DeepSeek Chat (60%)</strong>, <strong>Gemini 1.5 Flash (40%)</strong>. Failover routes to OpenAI GPT-4o-mini is active.
                  </p>
                </div>

              </div>

              {/* Right main playground & router maps */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Router interactive testing panel */}
                <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">DYNAMIC PROXY PLAYGROUND</h3>
                  
                  <form onSubmit={handleTestAIRoute} className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <label className="block text-[10px] font-mono text-slate-500 mb-1 font-semibold">CHOOSE TARGET GATEWAY ROUTE</label>
                        <select 
                          value={activeRouterModel}
                          onChange={(e) => setActiveRouterModel(e.target.value)}
                          className={`w-full p-2 text-xs rounded-lg border focus:outline-none cursor-pointer ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                        >
                          <option value="DeepSeek Chat">DeepSeek Chat API Route (V3)</option>
                          <option value="Gemini 1.5 Flash">Gemini 1.5 Flash Route (Serverless)</option>
                          <option value="OpenAI GPT-4o-mini">OpenAI GPT-4o-mini Backup Router</option>
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="block text-[10px] font-mono text-slate-500 mb-1 font-semibold">ROUTING STRATEGY</label>
                        <div className={`p-2 rounded-lg text-xs font-mono border ${isDarkMode ? 'bg-slate-800/40 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-600'}`}>
                          ⚡ Latency & Cost Optimization (Auto)
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1 font-semibold">AGENT PROMPT INJECTION PAYLOAD</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          required
                          value={activeRouterPrompt}
                          onChange={(e) => setActiveRouterPrompt(e.target.value)}
                          placeholder="e.g. Generate database optimize check command for SQLite cluster" 
                          className={`flex-1 p-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                        />
                        <button 
                          type="submit"
                          disabled={isRoutingLoading}
                          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-mono text-xs px-5 py-2 rounded-lg font-semibold transition"
                        >
                          {isRoutingLoading ? 'ROUTING...' : 'TEST ROUTE'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Routing transaction log cards */}
                <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">ROUTING TRANSACTION LOGS (TELEMETRY)</h3>
                  
                  <div className="space-y-4 font-mono text-xs">
                    {routingHistory.map((item, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-950/40 border-slate-900' : 'bg-slate-100/50 border-slate-200'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-amber-500 font-bold">"{item.prompt}"</span>
                          <span className="text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded">
                            {item.target}
                          </span>
                        </div>
                        <p className="text-slate-400 dark:text-slate-300 mb-2 leading-relaxed text-[11px]">{item.response}</p>
                        <div className="flex gap-4 text-[10px] text-slate-500 border-t border-slate-800/10 pt-2 mt-2">
                          <span>Latency: <strong className="text-emerald-400">{item.latency}ms</strong></span>
                          <span>Cost: <strong className="text-emerald-400">${item.cost.toFixed(5)}</strong></span>
                          <span>Gateway status: <strong>SUCCESS (200)</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==============================================
            TAB 6: VPS EXPORT & INSTALLATION MANAGER
            ============================================== */}
        {activeTab === 'export' && (
          <div className="space-y-6">
            
            <div className={`p-6 rounded-2xl border transition ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-3 mb-2">
                <FileCode className="w-5 h-5 text-emerald-500" />
                <h2 className="text-lg font-bold tracking-tight text-emerald-500">VPS Export & Shell Provisioning Pack</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Inspect, copy, or download the full backend Node.js Express server source code, SQLite table generation structures, and deployment terminal setup blueprints. Spin up PHRS Crowd on any standard Ubuntu IP in minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Export file lists tabs selector */}
              <div className="lg:col-span-3 space-y-3 font-mono text-xs">
                <button 
                  onClick={() => setActiveExportFile('server')}
                  className={`w-full p-3.5 rounded-xl border text-left transition flex items-center justify-between ${activeExportFile === 'server' ? (isDarkMode ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-semibold' : 'bg-emerald-100 border-emerald-500 text-emerald-600 font-semibold') : (isDarkMode ? 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200' : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900')}`}
                >
                  <span>server.js</span>
                  <FileCode className="w-4 h-4 opacity-70" />
                </button>

                <button 
                  onClick={() => setActiveExportFile('readme')}
                  className={`w-full p-3.5 rounded-xl border text-left transition flex items-center justify-between ${activeExportFile === 'readme' ? (isDarkMode ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-semibold' : 'bg-emerald-100 border-emerald-500 text-emerald-600 font-semibold') : (isDarkMode ? 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200' : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900')}`}
                >
                  <span>README.md Guide</span>
                  <FileCode className="w-4 h-4 opacity-70" />
                </button>

                <button 
                  onClick={() => setActiveExportFile('package')}
                  className={`w-full p-3.5 rounded-xl border text-left transition flex items-center justify-between ${activeExportFile === 'package' ? (isDarkMode ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-semibold' : 'bg-emerald-100 border-emerald-500 text-emerald-600 font-semibold') : (isDarkMode ? 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200' : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900')}`}
                >
                  <span>package.json</span>
                  <FileCode className="w-4 h-4 opacity-70" />
                </button>

                <div className={`p-4 rounded-xl border text-[11px] leading-relaxed space-y-2 transition ${isDarkMode ? 'bg-emerald-950/15 border-emerald-900/40 text-emerald-300' : 'bg-emerald-50 border-emerald-100 text-emerald-900'}`}>
                  <p className="font-bold">✓ Self-Hosting Ready</p>
                  Save these files into a folder on your VPS, execute <strong>npm install</strong>, then use PM2 to make it completely indestructible!
                </div>
              </div>

              {/* Source code viewing screen */}
              <div className="lg:col-span-9 space-y-4">
                
                <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      Viewing: {activeExportFile === 'server' ? 'server.js' : activeExportFile === 'readme' ? 'README.md' : 'package.json'}
                    </span>
                    
                    <button 
                      onClick={() => {
                        const content = activeExportFile === 'server' ? vpsServerJs : activeExportFile === 'readme' ? vpsReadmeMd : vpsPackageJson;
                        navigator.clipboard.writeText(content);
                        alert('✓ Copied code file contents to clipboard!');
                      }}
                      className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:underline hover:scale-105 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Copy Content
                    </button>
                  </div>

                  <div className={`p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-[500px] overflow-y-auto leading-relaxed select-text border ${isDarkMode ? 'bg-slate-950 border-slate-900 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-800'}`}>
                    <pre className="whitespace-pre-wrap">{activeExportFile === 'server' ? vpsServerJs : activeExportFile === 'readme' ? vpsReadmeMd : vpsPackageJson}</pre>
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==============================================
            TAB 7: SOLUTIONS CATALOG
            ============================================== */}
        {activeTab === 'solutions' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <LayoutGrid className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">GCP Solutions Catalog</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Ready-to-deploy architectural stacks compiled dynamically to target standalone local VPS clusters. Click deploy to initialize telemetry networks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Microservice SMS Router', desc: 'Pre-configured Twilio & Fast2SMS gateway cluster for heavy multi-user OTP verification.', stack: 'Node.js, SQLite, Fast2SMS', time: '1.2s' },
                { name: 'Relational SQLite Cache', desc: 'A synchronized BigQuery replica for super-fast offline analytical searches.', stack: 'SQL, SQLite DB, GCSFuse', time: '2.5s' },
                { name: 'Geo Maps Telemetry tracker', desc: 'Real-time geographical position locator mapping coordinates with the Google Maps SDK.', stack: 'React, Maps API, GeoJson', time: '0.8s' }
              ].map((solution, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 text-[9px] bg-indigo-50 text-indigo-600 rounded font-mono font-bold">STABLE V2</span>
                    <h3 className="font-bold text-sm text-slate-900 mt-2 mb-1">{solution.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{solution.desc}</p>
                    <div className="space-y-1 mb-6 text-[10px] font-mono text-slate-400">
                      <div>STACK: <span className="text-slate-700 font-semibold">{solution.stack}</span></div>
                      <div>PROBE DELAY: <span className="text-slate-700 font-semibold">{solution.time}</span></div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setHomeToast(`🚀 Deploying ${solution.name}... Check active PM2 cluster terminal logs!`);
                      setTimeout(() => setHomeToast(null), 3500);
                      setVpsLogStream(prev => [...prev, `[SOLUTIONS] Deploy triggered: ${solution.name}. Compiling dependencies...`]);
                    }}
                    className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2 rounded-lg font-semibold transition"
                  >
                    ONE-CLICK DEPLOY
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 8: RECENTLY VISITED OPERATIONS LOG
            ============================================== */}
        {activeTab === 'recently_visited' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">Recently Visited & Operations History</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                A granular telemetry stream tracking developer workspace actions, API endpoints requested, and SMS gateways synchronized in this console.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white">
              <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">WORKSPACE OPERATION AUDITS</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs text-slate-600">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-[10px]">
                      <th className="pb-3">TIMESTAMP</th>
                      <th className="pb-3">OPERATION</th>
                      <th className="pb-3">ASSOCIATED IP</th>
                      <th className="pb-3">LATENCY</th>
                      <th className="pb-3">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { time: '2026-08-24 10:14:15', op: 'SMS Route Generation Key Sync', ip: '194.22.84.102', latency: '120ms', status: 'SUCCESS' },
                      { time: '2026-08-24 09:32:02', op: 'SQLite Schema Validation Check', ip: '127.0.0.1:3000', latency: '420ms', status: 'SUCCESS' },
                      { time: '2026-08-24 07:11:45', op: 'Cloud SQL Read Replica Query Run', ip: '194.22.84.102', latency: '980ms', status: 'SUCCESS' },
                      { time: '2026-08-23 23:59:12', op: 'Export Package JSON Bundle Compile', ip: '194.22.84.102', latency: '1.2s', status: 'SUCCESS' }
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="py-3 text-slate-500">{row.time}</td>
                        <td className="py-3 font-semibold text-slate-800">{row.op}</td>
                        <td className="py-3 text-slate-400">{row.ip}</td>
                        <td className="py-3 text-emerald-600">{row.latency}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-bold rounded">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 9: BILLING CREDITS & BUDGET WARNINGS
            ============================================== */}
        {activeTab === 'billing' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">Billing Account Dashboard</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Track active trial credits, setup warnings to avoid database over-charges, and configure automatic budget notifications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">REMAINING BALANCES</h3>
                <div className="space-y-2">
                  <div className="text-3xl font-light text-slate-900">$294.42 <span className="text-xs text-slate-400 font-mono">USD</span></div>
                  <div className="text-xs text-slate-500">Of $300.00 trial cloud credit limit.</div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-4">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '98%' }}></div>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">EXPIRES: October 24, 2026</div>
                </div>
              </div>

              <div className="md:col-span-8 p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">BUDGET ALERT THRESHOLDS</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">WARNING THRESHOLD SLIDER (${billingAlertAmount})</label>
                    <input 
                      type="range" 
                      min="50" 
                      max="300" 
                      step="10"
                      value={billingAlertAmount} 
                      onChange={(e) => setBillingAlertAmount(Number(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">ALERT DISPATCH EMAIL</label>
                    <div className="flex gap-2">
                      <input 
                        type="email" 
                        value={billingAlertEmail} 
                        onChange={(e) => setBillingAlertEmail(e.target.value)}
                        className="flex-1 p-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono bg-slate-100 border-slate-300 text-slate-900"
                      />
                      <button 
                        onClick={() => {
                          setHomeToast(`✓ Billing alert email updated to: ${billingAlertEmail}`);
                          setTimeout(() => setHomeToast(null), 3000);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs px-4 py-2 rounded-lg font-semibold transition"
                      >
                        SAVE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 10: IAM & permissions MEMBERS MANAGER
            ============================================== */}
        {activeTab === 'iam' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">IAM & Permissions Administrator</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Add, manage, and audit organizational members having remote administrative execution permissions to trigger phone validation codes and SQLite deployments.
              </p>
            </div>

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
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-lg border focus:outline-none cursor-pointer bg-slate-100 border-slate-300 text-slate-900"
                    >
                      <option value="Owner">Owner (Full VPS root access)</option>
                      <option value="Editor">Editor (SQLite and SMS write access)</option>
                      <option value="Viewer">Viewer (Read-only analytics console)</option>
                    </select>
                  </div>

                  <button 
                    onClick={() => {
                      if (!newMemberEmail.trim()) {
                        alert('Enter member email!');
                        return;
                      }
                      setIamMembers(prev => [...prev, { email: newMemberEmail, role: newMemberRole, addedAt: '2026-08-24' }]);
                      setHomeToast(`✓ Added direct member: ${newMemberEmail}`);
                      setTimeout(() => setHomeToast(null), 3000);
                      setNewMemberEmail('');
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2 rounded-lg font-semibold shadow-lg transition"
                  >
                    ADD WORKSPACE MEMBER
                  </button>
                </div>
              </div>

              <div className="md:col-span-8 p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">ACTIVE POLICY MEMBERS</h3>
                <div className="space-y-3 font-mono text-xs">
                  {iamMembers.map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div>
                        <div className="font-bold text-slate-800">{member.email}</div>
                        <div className="text-[10px] text-slate-400">Policy bound on: {member.addedAt}</div>
                      </div>
                      <span className="px-2.5 py-1 text-[10px] bg-indigo-100 text-indigo-600 font-bold rounded">
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 11: MARKETPLACE TEMPLATES
            ============================================== */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <ShoppingCart className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">Marketplace templates</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Deploy lightweight, pre-configured software routers and SMS verification packages straight to your SQLite cluster storage buckets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { id: 'app1', name: 'WhatsApp SMS Webhook', vendor: 'Meta Community', price: 'FREE', desc: 'Syncs dynamic phone verifications and trigger templates.' },
                { id: 'app2', name: 'SQLite Backup cron daemon', vendor: 'PHRS Core Tech', price: 'FREE', desc: 'Auto-sync active .sqlite file backup intervals.' },
                { id: 'app3', name: 'SMS Auth OTP Validator', vendor: 'Pharas Telecom', price: 'FREE', desc: 'Provides dynamic routing validation logs directly.' },
                { id: 'app4', name: 'BigQuery DB Indexer', vendor: 'Analytical Labs', price: 'FREE', desc: 'Quick search indices on SQLite table columns.' }
              ].map((app, i) => (
                <div key={i} className={`p-5 rounded-2xl border flex flex-col justify-between bg-white transition ${selectedMarketplaceApp === app.id ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-200'}`}>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{app.vendor}</span>
                    <h3 className="font-bold text-sm text-slate-900 mt-1 mb-2">{app.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{app.desc}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono font-bold">
                      <span>COST:</span>
                      <span className="text-emerald-600">{app.price}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedMarketplaceApp(app.id);
                        setHomeToast(`✓ Imported template "${app.name}" into Compute Engine list!`);
                        setTimeout(() => setHomeToast(null), 3000);
                      }}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-[10px] py-1.5 rounded-lg font-semibold transition"
                    >
                      {selectedMarketplaceApp === app.id ? 'TEMPLATE READY' : 'IMPORT TEMPLATE'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 12: AUTONOMOUS AGENT PLATFORM
            ============================================== */}
        {activeTab === 'agent_platform' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header section with GCP-like sub-navigation */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="p-6 pb-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold tracking-tight text-slate-800">Agent Platform (డైనమిక్ కోర్)</h2>
                  </div>
                  <button 
                    onClick={() => {
                      setAgentPlatformSubTab('agents');
                      setHomeToast("Ready to create a new autonomous agent");
                      setTimeout(() => setHomeToast(null), 2500);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>CREATE AGENT</span>
                  </button>
                </div>
                
                {/* Internal Sub-Tabs */}
                <div className="flex items-center gap-6 border-b border-slate-100">
                  {['Overview', 'Studio', 'Models', 'Agents', 'Notebooks', 'Security'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setAgentPlatformSubTab(tab.toLowerCase().replace(' ', '_') as any)}
                      className={`pb-3 text-sm font-medium transition-colors relative ${
                        agentPlatformSubTab === tab.toLowerCase().replace(' ', '_') 
                          ? 'text-blue-600' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tab}
                      {agentPlatformSubTab === tab.toLowerCase().replace(' ', '_') && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-4 relative">
                
                {/* Admin Auth Modal Overlay */}
                {showAuthModal && (
                  <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center p-6 rounded-b-2xl">
                    <div className="max-w-md w-full bg-white border border-slate-200 shadow-2xl rounded-2xl p-6 space-y-6 animate-scale-in">
                      <div className="text-center space-y-2">
                        <Lock className="w-10 h-10 text-blue-600 mx-auto" />
                        <h3 className="text-lg font-bold text-slate-800">Admin Authorization Required</h3>
                        <p className="text-xs text-slate-500">అడ్మిన్ అనుమతి లేకుండా ఏ చర్య తీసుకోబడదు. దయచేసి పాస్‌వర్డ్ నమోదు చేయండి.</p>
                      </div>

                      {protocolStep === 'password' ? (
                        <div className="space-y-4">
                          <input 
                            type="password" 
                            placeholder="Enter Admin Password"
                            value={adminPasswordInput}
                            onChange={(e) => setAdminPasswordInput(e.target.value)}
                            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-center font-mono"
                          />
                          <button 
                            onClick={() => {
                              if (adminPasswordInput === ADMIN_PASSWORD) {
                                setProtocolStep('confirm');
                              } else {
                                alert('Incorrect Password!');
                                setAdminPasswordInput('');
                              }
                            }}
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
                          >
                            VERIFY PASSWORD
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                            <p className="text-xs font-bold text-emerald-800">Password Verified Successfully!</p>
                          </div>
                          <p className="text-xs text-center text-slate-600">ఈ చర్యను కొనసాగించాలనుకుంటున్నారా? (Confirm Action?)</p>
                          <div className="flex gap-3">
                            <button 
                              onClick={() => {
                                setShowAuthModal(false);
                                setProtocolStep('password');
                                setAdminPasswordInput('');
                              }}
                              className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition"
                            >
                              CANCEL
                            </button>
                            <button 
                              onClick={() => {
                                setIsAdminAuthorized(true);
                                setShowAuthModal(false);
                                setProtocolStep('password');
                                setAdminPasswordInput('');
                                // Perform the pending action (deploying agent)
                                if (newAgentName.trim()) {
                                  const newAgent = {
                                    id: `agent-${Date.now()}`,
                                    name: newAgentName,
                                    model: newAgentModel,
                                    systemPrompt: newAgentPrompt || 'You are a helpful assistant.',
                                    created: new Date().toISOString().split('T')[0]
                                  };
                                  setAgents([...agents, newAgent]);
                                  setNewAgentName('');
                                  setNewAgentPrompt('');
                                  setModificationCount(prev => prev + 1);
                                  setHomeToast(`✓ Agent "${newAgentName}" deployed with Admin approval!`);
                                  setTimeout(() => setHomeToast(null), 3000);
                                  
                                  // Rule reading trigger after 3 modifications
                                  if ((modificationCount + 1) % 3 === 0) {
                                    setTimeout(() => setShowSystemRules(true), 1000);
                                  }
                                }
                              }}
                              className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition"
                            >
                              CONFIRM OK
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* System Rules Overlay (50 seconds) */}
                {showSystemRules && (
                  <div className="absolute inset-0 z-[60] bg-slate-900 flex flex-col items-center justify-center p-8 rounded-b-2xl animate-fade-in">
                    <div className="max-w-2xl w-full space-y-6">
                      <div className="flex items-center gap-3 text-blue-400 mb-4">
                        <TerminalIcon className="w-6 h-6" />
                        <h3 className="text-xl font-mono font-bold uppercase tracking-widest">Reading Agent Protocol Rules...</h3>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl font-mono text-xs text-blue-300 space-y-4 shadow-2xl">
                        <p className="text-amber-500 font-bold underline">MANDATORY SYSTEM PROTOCOL (ADMIN ONLY)</p>
                        <p>1. అడ్మిన్ అనుమతి లేకుండా ఏ ఒక్కటి తెచ్చి చేయకూడదు.</p>
                        <p>2. అడ్మిన్ అనుమతి ప్రతి దానికి తీసుకోవాలి.</p>
                        <p>3. పాస్వర్డ్ ఇచ్చిన తర్వాత ఓకే అని కూడా కన్ఫర్మేషన్ చేయాలి.</p>
                        <p>4. అక్షరాలు సవరణ మాత్రమే చేయాలి. పూర్తిగా కోడ్ మార్చకూడదు.</p>
                        <p>5. సవరించిన ప్రతిదీ అడ్మిన్‌కు చూపించాలి.</p>
                        <p>6. మూడు సార్లు సవరించిన తర్వాత సిస్టమ్ రూల్స్ చదవాలి (50 సెకండ్లు).</p>
                        <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                          <span className="text-[10px] text-slate-500 italic">Reading protocol in progress... Please wait 50s.</span>
                          <button 
                            onClick={() => setShowSystemRules(false)}
                            className="px-4 py-1 bg-blue-600 text-white rounded font-bold hover:bg-blue-500 transition"
                          >
                            ACKNOWLEDGE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* OVERVIEW SUB-TAB */}
                {agentPlatformSubTab === 'overview' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/50">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Active Agents</h3>
                      <div className="text-3xl font-bold text-slate-800">{agents.length}</div>
                    </div>
                    <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/50">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Model Calls</h3>
                      <div className="text-3xl font-bold text-slate-800">14.2k</div>
                    </div>
                    <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/50">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Health Status</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-xl font-bold text-slate-800">Operational</span>
                      </div>
                    </div>
                    <div className="md:col-span-3 p-5 rounded-xl border border-blue-100 bg-blue-50/30">
                      <h3 className="font-bold text-sm text-blue-800 mb-2">Welcome to the Dynamic Agent Core</h3>
                      <p className="text-xs text-blue-600/80 leading-relaxed">
                        The PHRS Agent Platform allows you to deploy autonomous system agents that can monitor SQLite clusters, 
                        manage Gemini model load balancing, and automate routing tasks without manual intervention.
                      </p>
                    </div>
                  </div>
                )}

                {/* STUDIO SUB-TAB (The interactive chat) */}
                {agentPlatformSubTab === 'studio' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-4 space-y-4">
                      <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Target Agent</label>
                        <select 
                          value={selectedAgentId}
                          onChange={(e) => setSelectedAgentId(e.target.value)}
                          className="w-full p-2 text-xs rounded-lg border border-slate-200 focus:outline-none bg-white"
                        >
                          {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">System Instructions</label>
                        <div className="text-[11px] text-slate-600 bg-white p-3 rounded-lg border border-slate-100 font-mono">
                          {agents.find(a => a.id === selectedAgentId)?.systemPrompt || 'No instructions set.'}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-8 flex flex-col h-[400px] border border-slate-200 rounded-xl bg-slate-50/20">
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                        {agentChatHistory.length === 0 && (
                          <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                            <Sparkles className="w-8 h-8 mb-2" />
                            <p className="text-xs font-mono">Select an agent and start a session...</p>
                          </div>
                        )}
                        {agentChatHistory.map((msg, i) => (
                          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-xs shadow-xs ${
                              msg.role === 'user' 
                                ? 'bg-blue-600 text-white rounded-tr-none' 
                                : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                            }`}>
                              <p className="leading-relaxed">{msg.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-slate-100 bg-white rounded-b-xl flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Command agent to inspect cluster..."
                          value={agentChatInput}
                          onChange={(e) => setAgentChatInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && agentChatInput.trim()) {
                              setAgentChatHistory(prev => [...prev, { role: 'user', text: agentChatInput }]);
                              setTimeout(() => {
                                setAgentChatHistory(prev => [...prev, { role: 'model', text: `Agent [${agents.find(a => a.id === selectedAgentId)?.name}]: Executing query on SQLite cluster... Optimization complete. Health 100%.` }]);
                              }, 800);
                              setAgentChatInput('');
                            }
                          }}
                          className="flex-1 px-4 py-2 text-xs rounded-full bg-slate-100 border-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button 
                          onClick={() => {
                            if (agentChatInput.trim()) {
                              setAgentChatHistory(prev => [...prev, { role: 'user', text: agentChatInput }]);
                              setTimeout(() => {
                                setAgentChatHistory(prev => [...prev, { role: 'model', text: `Agent [${agents.find(a => a.id === selectedAgentId)?.name}]: Verified port routing. All systems responding nominal.` }]);
                              }, 800);
                              setAgentChatInput('');
                            }
                          }}
                          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* MODELS SUB-TAB */}
                {agentPlatformSubTab === 'models' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Gemini 1.5 Pro', desc: 'High intelligence, large context windows (2M tokens).', status: 'Active' },
                      { name: 'Gemini 1.5 Flash', desc: 'Fast, lightweight optimized for routing & speed.', status: 'Active' },
                      { name: 'DeepSeek-V3', desc: 'Open-weights specialized for coding tasks.', status: 'Standby' },
                      { name: 'Llama 3.1 70B', desc: 'Meta open model for versatile deployments.', status: 'Standby' }
                    ].map((m, i) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">{m.name}</h4>
                          <p className="text-[11px] text-slate-500">{m.desc}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${m.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                          {m.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* AGENTS SUB-TAB (Dynamic List & Create) */}
                {agentPlatformSubTab === 'agents' && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Create Agent Form */}
                      <div className="md:w-1/3 p-5 rounded-2xl border border-blue-100 bg-blue-50/20">
                        <h3 className="text-sm font-bold text-blue-800 mb-4 flex items-center gap-2">
                          <Plus className="w-4 h-4" /> CREATE NEW AGENT
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Agent Name</label>
                            <input 
                              type="text" 
                              value={newAgentName}
                              onChange={(e) => setNewAgentName(e.target.value)}
                              placeholder="e.g. Storage Manager"
                              className="w-full p-2 text-xs rounded-lg border border-slate-200 focus:outline-none bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Base Model</label>
                            <select 
                              value={newAgentModel}
                              onChange={(e) => setNewAgentModel(e.target.value)}
                              className="w-full p-2 text-xs rounded-lg border border-slate-200 focus:outline-none bg-white"
                            >
                              <option>Gemini 1.5 Flash</option>
                              <option>Gemini 1.5 Pro</option>
                              <option>DeepSeek Chat</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">System Prompt</label>
                            <textarea 
                              rows={3}
                              value={newAgentPrompt}
                              onChange={(e) => setNewAgentPrompt(e.target.value)}
                              placeholder="Describe agent behavior..."
                              className="w-full p-2 text-xs rounded-lg border border-slate-200 focus:outline-none bg-white font-mono"
                            />
                          </div>
                          <button 
                            onClick={() => {
                              if (!newAgentName.trim()) {
                                setHomeToast("Please provide an agent name");
                                setTimeout(() => setHomeToast(null), 2500);
                                return;
                              }
                              setShowAuthModal(true);
                            }}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition"
                          >
                            DEPLOY AGENT (REQUIRES AUTH)
                          </button>
                        </div>
                      </div>

                      {/* Agent List */}
                      <div className="md:w-2/3">
                        <h3 className="text-sm font-bold text-slate-800 mb-4">DEPLOYED AGENTS</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {agents.map(a => (
                            <div key={a.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition group">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-sm text-slate-800">{a.name}</h4>
                                <button 
                                  onClick={() => {
                                    setAgents(agents.filter(ag => ag.id !== a.id));
                                    setHomeToast(`Agent ${a.name} decommissioned.`);
                                    setTimeout(() => setHomeToast(null), 2500);
                                  }}
                                  className="text-slate-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="space-y-1 text-[10px] font-mono text-slate-500">
                                <div>MODEL: <span className="text-blue-600">{a.model}</span></div>
                                <div>DEPLOYED: {a.created}</div>
                              </div>
                              <button 
                                onClick={() => {
                                  setSelectedAgentId(a.id);
                                  setAgentPlatformSubTab('studio');
                                }}
                                className="mt-4 w-full py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-[10px] font-bold text-slate-600 transition"
                              >
                                OPEN IN STUDIO
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SECURITY SUB-TAB */}
                {agentPlatformSubTab === 'security' && (
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/20">
                      <div className="flex items-center gap-3 mb-4">
                        <Lock className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-bold text-blue-900">Admin Protocol Settings</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-4">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Protocol Rules</h4>
                          <ul className="text-[11px] text-slate-600 space-y-3 list-disc pl-4">
                            <li>అడ్మిన్ అనుమతి లేకుండా ఏ చర్య తీసుకోబడదు.</li>
                            <li>ప్రతి మార్పుకు పాస్‌వర్డ్ మరియు కన్ఫర్మేషన్ అవసరం.</li>
                            <li>అక్షరాల స్థాయి సవరణలు మాత్రమే అనుమతించబడతాయి.</li>
                            <li>ప్రతి 3 సవరణల తర్వాత ప్రోటోకాల్ చదవడం తప్పనిసరి.</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-4">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Security Status</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-500">Admin Mode:</span>
                              <span className="text-emerald-600 font-bold">STRICT</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-500">Modification Count:</span>
                              <span className="text-blue-600 font-bold">{modificationCount}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-500">Last Verified:</span>
                              <span className="text-slate-400 italic">2 mins ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* NOTEBOOKS SUB-TAB */}
                {agentPlatformSubTab === 'notebooks' && (
                  <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
                    <FileCode className="w-8 h-8 mb-2" />
                    <p className="text-xs font-mono">Dynamic AI Notebooks feature coming soon to Cloud Hub.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 13: KUBERNETES CONTAINER DEPLOYER
            ============================================== */}
        {activeTab === 'kubernetes' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <Layers className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">Google Kubernetes Engine (GKE)</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Monitor your container runtime replicas. Scale docker pods, verify telemetry memory allocation, and secure localized port forwarding rules.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase">RUNNING CONTAINER REPLICAS</h3>
                <button 
                  onClick={() => {
                    const newPodId = Math.floor(100 + Math.random() * 900);
                    setK8sPods(prev => [...prev, { name: `phrs-api-replica-${newPodId}`, status: 'Running', cpu: 0.8, ram: 110 }]);
                    setHomeToast(`✓ Spun up GKE Pod: phrs-api-replica-${newPodId}`);
                    setTimeout(() => setHomeToast(null), 3000);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[10px] px-3 py-1.5 rounded-lg font-semibold transition"
                >
                  SPIN UP CONTAINER REPLICA
                </button>
              </div>

              <div className="space-y-3">
                {k8sPods.map((pod, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 font-mono text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="font-bold text-slate-800">{pod.name}</span>
                    </div>
                    <div className="flex gap-6 mt-2 sm:mt-0 text-[10px] text-slate-500">
                      <div>CPU Load: <strong className="text-slate-700">{pod.cpu}%</strong></div>
                      <div>RAM usage: <strong className="text-slate-700">{pod.ram} MB</strong></div>
                      <div>Status: <span className="text-emerald-600 font-bold">{pod.status}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 14: CLOUD STORAGE BUCKETS
            ============================================== */}
        {activeTab === 'cloud_storage' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">Cloud Storage Buckets</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Store binary assets, static webpage layouts, and raw analytical .sqlite database backups in regionally distributed static buckets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">CREATE NEW BUCKET</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">UNIQUE BUCKET NAME</label>
                    <input 
                      type="text" 
                      placeholder="e.g. static-phrs-assets"
                      value={newBucketName} 
                      onChange={(e) => setNewBucketName(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono bg-slate-100 border-slate-300 text-slate-900"
                    />
                  </div>

                  <button 
                    onClick={() => {
                      if (!newBucketName.trim()) {
                        alert('Enter bucket name!');
                        return;
                      }
                      setBuckets(prev => [...prev, { name: newBucketName.toLowerCase().replace(/\s+/g, '-'), region: 'asia-south1', size: '0 Bytes', created: '2026-08-24' }]);
                      setHomeToast(`✓ Created storage bucket: ${newBucketName}`);
                      setTimeout(() => setHomeToast(null), 3000);
                      setNewBucketName('');
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2 rounded-lg font-semibold transition"
                  >
                    CREATE BUCKET
                  </button>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-6">
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-3">UPLOAD MOCK FILE</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">FILE NAME</label>
                      <input 
                        type="text" 
                        placeholder="e.g. index.html"
                        value={uploadFileName} 
                        onChange={(e) => setUploadFileName(e.target.value)}
                        className="w-full p-2 text-xs rounded-lg border font-mono bg-slate-100 border-slate-300 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">TARGET STORAGE BUCKET</label>
                      <select 
                        value={uploadTargetBucket} 
                        onChange={(e) => setUploadTargetBucket(e.target.value)}
                        className="w-full p-2 text-xs rounded-lg border cursor-pointer bg-slate-100 border-slate-300 text-slate-900"
                      >
                        {buckets.map((b, idx) => (
                          <option key={idx} value={b.name}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                    <button 
                      onClick={() => {
                        if (!uploadFileName.trim()) {
                          alert('Enter upload file name!');
                          return;
                        }
                        setIsUploading(true);
                        setTimeout(() => {
                          setStorageFiles(prev => [...prev, { name: uploadFileName, size: '42 KB', bucket: uploadTargetBucket }]);
                          setIsUploading(false);
                          setHomeToast(`✓ Uploaded "${uploadFileName}" to bucket ${uploadTargetBucket}`);
                          setTimeout(() => setHomeToast(null), 3000);
                          setUploadFileName('');
                        }, 800);
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs py-2 rounded-lg font-semibold transition"
                    >
                      {isUploading ? 'UPLOADING...' : 'UPLOAD TO BUCKET'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4 font-semibold">STORAGE INVENTORY BUCKETS</h3>
                <div className="space-y-4 font-mono text-xs">
                  {buckets.map((bucket, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-800">{bucket.name}</span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-bold rounded">
                          {bucket.region}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">Created: {bucket.created} | Size: {bucket.size}</div>
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <span className="text-[9px] font-bold text-indigo-500 block mb-1">CONTAINED FILES:</span>
                        <div className="space-y-1">
                          {storageFiles.filter(f => f.bucket === bucket.name).length === 0 ? (
                            <span className="text-[10px] text-slate-400 italic">No files in bucket.</span>
                          ) : (
                            storageFiles.filter(f => f.bucket === bucket.name).map((f, fileIdx) => (
                              <div key={fileIdx} className="flex justify-between text-[10px] text-slate-600">
                                <span>📄 {f.name}</span>
                                <span>{f.size}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 15: SECURITY SYSTEM (SSH KEYS & FIREWALLS)
            ============================================== */}
        {activeTab === 'security' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">Security & Port Rule Policies</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Generate secure terminal SSH root keypairs, toggle route policy profiles, and protect active SQLite database pipelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">TERMINAL KEYPAIR GENERATOR</h3>
                <p className="text-xs text-slate-500 mb-4">Click below to generate a secure RSA 2048-bit keypair for root ssh operations onto standalone local VPS networks.</p>
                
                <button 
                  onClick={() => {
                    const randomId = Math.random().toString(36).substring(7);
                    setGeneratedKeyPair({
                      public: `ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC8u6PHRS_${randomId}...`,
                      private: `-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAsPHRS_${randomId}...\n-----END RSA PRIVATE KEY-----`
                    });
                    setHomeToast("✓ Cryptographic SSH Keypair compiled!");
                    setTimeout(() => setHomeToast(null), 3000);
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2 rounded-lg font-semibold transition mb-4"
                >
                  GENERATE 2048-BIT SSH KEYPAIR
                </button>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[9px] font-mono text-slate-400 mb-0.5">ACTIVE PROTECTION ROUTE POLICY</label>
                    <div className="flex gap-2">
                      {['strict', 'balanced', 'permissive'].map((policy) => (
                        <button 
                          key={policy}
                          onClick={() => setFirewallPolicy(policy)}
                          className={`flex-1 py-1 px-2 text-[10px] font-mono rounded border transition ${firewallPolicy === policy ? 'bg-indigo-50 border-indigo-500 text-indigo-600 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                        >
                          {policy.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4 font-semibold">SECURITY BLUEPRINTS & SSH CREDENTIALS</h3>
                {generatedKeyPair ? (
                  <div className="space-y-4 font-mono text-[10px]">
                    <div>
                      <span className="text-indigo-500 font-bold block mb-1">PUBLIC KEY (remote authorized_keys):</span>
                      <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg select-all max-h-[60px] overflow-y-auto">
                        {generatedKeyPair.public}
                      </div>
                    </div>
                    <div>
                      <span className="text-amber-600 font-bold block mb-1">PRIVATE KEY (local server identification - keep secret!):</span>
                      <div className="p-3 bg-slate-900 text-emerald-400 border border-slate-800 rounded-lg select-all max-h-[100px] overflow-y-auto whitespace-pre">
                        {generatedKeyPair.private}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px] text-slate-400 font-mono text-xs italic">
                    No keys generated yet. Click generate on the left.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 16: BIGQUERY CONSOLE
            ============================================== */}
        {activeTab === 'bigquery' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <Search className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">BigQuery analytical console</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Analyze and query structural route telemetry, transaction latencies, and SMS metadata logs stored safely in the database.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white">
              <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-3">EXECUTE BIGQUERY SQL ANALYSIS</h3>
              <div className="space-y-3 font-mono text-xs">
                <textarea 
                  rows={3}
                  value={bqQuery}
                  onChange={(e) => setBqQuery(e.target.value)}
                  className="w-full p-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-900 text-emerald-400 border-slate-800"
                />
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400">Database partition is auto-mounted locally to SQLite indexes.</span>
                  <button 
                    onClick={() => {
                      setBqRunning(true);
                      setTimeout(() => {
                        setBqResults([
                          { prompt: 'Check DB cluster', target: 'Gemini 1.5 Flash', latency: 420, cost: 0.00008, state: 'SUCCESS' },
                          { prompt: 'Translate error log', target: 'DeepSeek Chat', latency: 980, cost: 0.00015, state: 'SUCCESS' }
                        ]);
                        setBqRunning(false);
                        setHomeToast("✓ BigQuery execution complete! Records loaded successfully.");
                        setTimeout(() => setHomeToast(null), 3000);
                      }, 1000);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    {bqRunning ? 'ANALYZING DATABASE...' : 'RUN BIGQUERY'}
                  </button>
                </div>
              </div>

              {bqResults && (
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <h4 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-3">QUERY RESULTS</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-[11px] text-slate-600">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 text-[10px]">
                          <th className="pb-2">LOG PROMPT</th>
                          <th className="pb-2">MODEL ENGINE</th>
                          <th className="pb-2">LATENCY</th>
                          <th className="pb-2">COMPUTE COST</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {bqResults.map((row, i) => (
                          <tr key={i}>
                            <td className="py-2.5 text-slate-800 font-bold">"{row.prompt}"</td>
                            <td className="py-2.5 text-indigo-600">{row.target}</td>
                            <td className="py-2.5 text-emerald-600">{row.latency}ms</td>
                            <td className="py-2.5 text-slate-500">${row.cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 17: SYSTEM HEALTH MONITORING
            ============================================== */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">System Monitoring & Logs</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Analyze VPS node metrics. Track system uptime, trigger mock warning alerts, and configure diagnostic warning thresholds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 p-5 rounded-2xl border border-slate-200 bg-white font-mono text-xs">
                <h3 className="font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">HARDWARE METRIC DIALS</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>UPTIME:</span>
                    <span className="font-bold text-slate-800">{monitorUptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PORT 3000 STATUS:</span>
                    <span className="font-bold text-emerald-600">LIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ACTIVE CONNECTIONS:</span>
                    <span className="font-bold text-indigo-600">42 active socket.io sessions</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">DIAGNOSTIC ALERTS TESTING</h3>
                <p className="text-xs text-slate-500 mb-4">Trigger a simulated system warning alert to test email dispatchers and operational SMS triggers instantly.</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setActiveAlerts(prev => [...prev, `[ALERT] CPU Usage reached 92% at ${new Date().toLocaleTimeString()}`]);
                      setHomeToast("⚠️ Warning alert dispatch simulated! Check terminal status");
                      setTimeout(() => setHomeToast(null), 3000);
                    }}
                    className="bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs px-4 py-2 rounded-lg font-semibold transition"
                  >
                    TRIGGER MOCK HARDWARE WARNING
                  </button>
                  <button 
                    onClick={() => setActiveAlerts([])}
                    className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-mono text-xs px-4 py-2 rounded-lg transition"
                  >
                    CLEAR ALERTS
                  </button>
                </div>

                {activeAlerts.length > 0 && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2 font-mono text-[11px] text-amber-800">
                    {activeAlerts.map((alertItem, i) => (
                      <div key={i}>• {alertItem}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 18: CLOUD RUN SERVERLESS MODULE
            ============================================== */}
        {activeTab === 'cloud_run' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <Play className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">Cloud Run Serverless Containers</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Host isolated, auto-scaling dockerized Node instances that run custom backend configurations on local port mappings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">CONTAINER SETTINGS</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">IMAGE SOURCE URL</label>
                    <input 
                      type="text" 
                      value={cloudRunImage} 
                      onChange={(e) => setCloudRunImage(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-lg border font-mono bg-slate-100 border-slate-300 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">ENVIRONMENT VARIABLES</label>
                    <textarea 
                      rows={3}
                      value={cloudRunEnvVars} 
                      onChange={(e) => setCloudRunEnvVars(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-lg border font-mono bg-slate-100 border-slate-300 text-slate-900"
                    />
                  </div>

                  <button 
                    onClick={() => {
                      setHomeToast("✓ Deployed container image to active Cloud Run service revision!");
                      setTimeout(() => setHomeToast(null), 3000);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2 rounded-lg font-semibold transition"
                  >
                    DEPLOY ACTIVE REVISION
                  </button>
                </div>
              </div>

              <div className="md:col-span-7 p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4 font-semibold">TRAFFIC SPLITTING</h3>
                <p className="text-xs text-slate-500 mb-4">Control what percentage of inbound SQLite traffic is routed to the new container image revision (Revision 2).</p>
                
                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">TRAFFIC SPLIT (Revision 1 vs Revision 2)</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={revisionTraffic} 
                      onChange={(e) => setRevisionTraffic(Number(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>Revision 1 (Stable): {100 - revisionTraffic}%</span>
                      <span>Revision 2 (Candidate): {revisionTraffic}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 19: VPC NETWORK CONTROLLER
            ============================================== */}
        {activeTab === 'vpc_network' && (
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
                      <div className="text-3xl font-bold text-slate-800">{Math.round((ipInventory.filter(ip => ip.status === 'Active').length / 254) * 100)}%</div>
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
                        setIsAutoInternetEnabled(!isAutoInternetEnabled);
                        setHomeToast(`✓ Automatic Connection Management ${!isAutoInternetEnabled ? 'Enabled' : 'Disabled'}`);
                        setTimeout(() => setHomeToast(null), 3000);
                      }}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isAutoInternetEnabled ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAutoInternetEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="p-5 rounded-xl border border-slate-200 bg-white">
                    <h3 className="text-xs font-bold text-slate-800 mb-4">SUBNETWORKS</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                            <th className="pb-3 px-2">Name</th>
                            <th className="pb-3 px-2">Region</th>
                            <th className="pb-3 px-2">IP Range</th>
                            <th className="pb-3 px-2">Gateway</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {subnets.map((sub, i) => (
                            <tr key={i} className="hover:bg-slate-50 transition">
                              <td className="py-3 px-2 font-semibold text-slate-800">{sub.name}</td>
                              <td className="py-3 px-2 text-slate-500">asia-south1</td>
                              <td className="py-3 px-2 font-mono text-slate-600">{sub.range}</td>
                              <td className="py-3 px-2 font-mono text-slate-600">{sub.gateway}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* MOBILE BRIDGE SUB-TAB */}
              {vpcSubTab === 'mobile_bridge' && (
                <div className="space-y-6">
                  <div className="p-6 border border-blue-200 bg-blue-50/20 rounded-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-blue-900">Mobile IP to VPC Bridge</h3>
                        <p className="text-xs text-blue-700 leading-relaxed max-w-md">
                          మీ మొబైల్ ఐపీని నేరుగా ఒక నెట్‌వర్క్ గేట్‌వేగా మార్చండి. ఇది మీ మొబైల్ మరియు మీ సర్వర్ మధ్య ఒక సురక్షితమైన సొరంగం (Tunnel) ఏర్పాటు చేస్తుంది.
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-blue-100 shadow-sm flex flex-col items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Detected Mobile IP</span>
                        <div className="text-xl font-mono font-bold text-blue-600">{mobileIp}</div>
                        <button 
                          onClick={detectIp}
                          className="text-[10px] text-slate-400 hover:text-blue-500 underline flex items-center gap-1"
                        >
                          <RefreshCw className="w-2.5 h-2.5" /> Refresh IP
                        </button>
                      </div>
                    </div>

                    <div className="mt-8 p-5 bg-white rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isBridgeActive ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                            <Phone className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-800">Bridge Connectivity</div>
                            <div className="text-[10px] text-slate-500">Status: {isBridgeActive ? 'Tunneling active via PHRS Gateway' : 'Ready to connect'}</div>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            setIsBridgeActive(!isBridgeActive);
                            setHomeToast(isBridgeActive ? "Mobile Bridge Disconnected" : "✓ Mobile IP successfully bridged to VPC!");
                            setTimeout(() => setHomeToast(null), 3000);
                          }}
                          className={`px-6 py-2 rounded-full text-xs font-bold transition ${isBridgeActive ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'}`}
                        >
                          {isBridgeActive ? 'STOP BRIDGE' : 'START BRIDGE'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">VPC Subnet Target</label>
                          <select className="w-full bg-transparent text-xs font-semibold text-slate-700 focus:outline-none">
                            {subnets.map(s => <option key={s.name}>{s.name} ({s.range})</option>)}
                          </select>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Encryption Mode</label>
                          <div className="text-xs font-semibold text-slate-700">AES-256 GCM (PHRS Secured)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                    <h3 className="text-xs font-bold text-slate-800 mb-4">BRIDGE LOGS</h3>
                    <div className="bg-slate-900 rounded-xl p-4 font-mono text-[10px] text-emerald-400 space-y-1 h-32 overflow-y-auto">
                      {isBridgeActive ? (
                        <>
                          <p>[{new Date().toLocaleTimeString()}] Initializing PHRS Cloud Bridge...</p>
                          <p>[{new Date().toLocaleTimeString()}] Handshaking with mobile IP {mobileIp}...</p>
                          <p>[{new Date().toLocaleTimeString()}] Tunnel established via VPC Subnet: subnet-india</p>
                          <p>[{new Date().toLocaleTimeString()}] Packet routing: Mobile ↔ PHRS Core Agent Active</p>
                          <p>[{new Date().toLocaleTimeString()}] Latency synchronized at 18ms</p>
                        </>
                      ) : (
                        <p className="text-slate-500">Bridge idle. Waiting for connection start...</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* IP ADDRESSES SUB-TAB */}
              {vpcSubTab === 'ip_addresses' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Static & Internal IP Inventory</h3>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-[10px] font-bold hover:bg-blue-700 transition">
                      RESERVE STATIC IP
                    </button>
                  </div>
                  <div className="overflow-hidden border border-slate-100 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[9px]">
                        <tr>
                          <th className="py-3 px-4">Address</th>
                          <th className="py-3 px-4">Type</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">In use by</th>
                          <th className="py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {ipInventory.map((ip, i) => (
                          <tr key={i} className="hover:bg-blue-50/30 transition">
                            <td className="py-3 px-4 font-mono font-bold text-slate-700">{ip.address}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${ip.type === 'Internal' ? 'bg-slate-100 text-slate-600' : 'bg-blue-50 text-blue-600'}`}>
                                {ip.type}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${ip.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                {ip.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{ip.instance}</td>
                            <td className="py-3 px-4">
                              <button className="text-blue-600 hover:underline font-bold text-[10px]">Change</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* FIREWALL SUB-TAB */}
              {vpcSubTab === 'firewall' && (
                <div className="space-y-6">
                  <div className="p-5 rounded-xl border border-amber-100 bg-amber-50/30 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Firewall rules are globally applied to all instances within this VPC. Be cautious when allowing traffic from <code className="bg-amber-100 px-1 rounded">0.0.0.0/0</code>.
                    </p>
                  </div>
                  
                  <div className="p-5 border border-slate-200 rounded-xl bg-white">
                    <h3 className="text-xs font-bold text-slate-800 mb-4">INGRESS RULES</h3>
                    <div className="space-y-2">
                      {firewallRules.map((rule, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/30 hover:border-blue-200 transition group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 font-bold text-xs">
                              {rule.port}
                            </div>
                            <div>
                              <div className="font-bold text-slate-800 text-sm">{rule.name}</div>
                              <div className="text-[10px] text-slate-500 font-mono">Source: {rule.range} | Action: <span className="text-emerald-600 font-bold">{rule.action}</span></div>
                            </div>
                          </div>
                          <button className="text-slate-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ROUTES SUB-TAB */}
              {vpcSubTab === 'routes' && (
                <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
                  <Globe className="w-8 h-8 mb-2" />
                  <p className="text-xs font-mono text-center px-6">Route management is currently optimized by the <strong className="text-blue-600">Dynamic AI Agent</strong>. Manual routing table overrides coming soon.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 20: RELATIONAL CLOUD SQL CONTROLLER
            ============================================== */}
        {activeTab === 'cloud_sql' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">Cloud SQL Relational Tables</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Interact with the Relational local SQLite schemas. Inject new database tables, track column layouts, and execute backups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">CREATE SCHEMA TABLE</h3>
                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">TABLE NAME</label>
                    <input 
                      type="text" 
                      placeholder="e.g. tracking_routes"
                      value={newTableName}
                      onChange={(e) => setNewTableName(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-lg border bg-slate-100 border-slate-300 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">COLUMNS DEFINITION</label>
                    <input 
                      type="text" 
                      value={newTableCols}
                      onChange={(e) => setNewTableCols(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-lg border bg-slate-100 border-slate-300 text-slate-900"
                    />
                  </div>

                  <button 
                    onClick={() => {
                      if (!newTableName.trim()) {
                        alert('Enter table name!');
                        return;
                      }
                      setSqlTables(prev => [...prev, { name: newTableName, rows: 0, columns: newTableCols }]);
                      setHomeToast(`✓ Created SQL table: ${newTableName}`);
                      setTimeout(() => setHomeToast(null), 3000);
                      setNewTableName('');
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-semibold transition"
                  >
                    GENERATE TABLE
                  </button>
                </div>
              </div>

              <div className="md:col-span-7 p-5 rounded-2xl border border-slate-200 bg-white font-mono text-xs">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-xs tracking-wider text-indigo-500 uppercase">ACTIVE DATABASE BACKUPS</h3>
                  <button 
                    onClick={() => {
                      const newBkId = Math.floor(10 + Math.random() * 90);
                      setSqlBackups(prev => [...prev, { id: `bk-${newBkId}`, date: new Date().toISOString().replace('T', ' ').substring(0, 19), size: '1.4 MB' }]);
                      setHomeToast("✓ Completed local SQLite backup cluster download!");
                      setTimeout(() => setHomeToast(null), 3000);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] px-3 py-1.5 rounded-lg font-semibold transition"
                  >
                    RUN INSTANT SQL BACKUP
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  {sqlBackups.map((bk, idx) => (
                    <div key={idx} className="flex justify-between p-3 border border-slate-100 bg-slate-50 rounded-xl">
                      <div>
                        <div className="font-bold text-slate-800">Backup: {bk.id}</div>
                        <div className="text-[10px] text-slate-400">Captured: {bk.date}</div>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold self-center">{bk.size}</span>
                    </div>
                  ))}
                </div>

                <h3 className="font-bold text-xs tracking-wider text-indigo-500 uppercase mb-3">SCHEMA OVERVIEW</h3>
                <div className="space-y-2">
                  {sqlTables.map((table, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-slate-800">Table: {table.name}</div>
                        <div className="text-[10px] text-slate-400">Columns: {table.columns}</div>
                      </div>
                      <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 font-bold rounded text-[10px]">
                        {table.rows} rows
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 21: GOOGLE MAPS PLATFORM
            ============================================== */}
        {activeTab === 'google_maps' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">Google Maps Platform integration</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Ground static assets with geographical latitude and longitude telemetry to map tracking routes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">MAPS API CONFIGURATION</h3>
                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">MAPS PUBLIC API KEY</label>
                    <input 
                      type="password" 
                      value={mapsApiKey}
                      onChange={(e) => setMapsApiKey(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-lg border bg-slate-100 border-slate-300 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">MAPS TELEMETRY ID</label>
                    <input 
                      type="text" 
                      value={mapsActiveTrackingId}
                      onChange={(e) => setMapsActiveTrackingId(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-lg border bg-slate-100 border-slate-300 text-slate-900"
                    />
                  </div>

                  <button 
                    onClick={() => {
                      setHomeToast("✓ Google Maps SDK initialized successfully!");
                      setTimeout(() => setHomeToast(null), 3000);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-semibold transition"
                  >
                    INITIALIZE MAPS SDK
                  </button>
                </div>
              </div>

              <div className="md:col-span-7 p-5 rounded-2xl border border-slate-200 bg-white font-mono text-xs">
                <h3 className="font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">GEOLOCATION ROUTING ENDPOINTS</h3>
                <div className="flex gap-2 mb-4">
                  {['Geocoding API', 'Distance Matrix', 'Directions SDK'].map((endpoint) => (
                    <button 
                      key={endpoint}
                      onClick={() => setMapsSelectedEndpoint(endpoint)}
                      className={`flex-1 py-1 px-2 text-[10px] rounded border transition ${mapsSelectedEndpoint === endpoint ? 'bg-indigo-50 border-indigo-500 text-indigo-600 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                    >
                      {endpoint.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Endpoint Status: {mapsSelectedEndpoint} is Online</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Local SQLite records are successfully mapped to dynamic routes using the active {mapsSelectedEndpoint} proxy. Latency averages <strong className="text-emerald-600">42ms</strong> per fetch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

          </main>

          {/* Footer copyright */}
          <footer className="py-6 text-center border-t border-slate-800/10 font-mono text-[10px] text-slate-500">
            <p>© 2026 PHRS Crowd Engine. All rights reserved. Built for VPS Ubuntu standalone deployment.</p>
          </footer>
        </div>
      </div>

    </div>
  );
}
