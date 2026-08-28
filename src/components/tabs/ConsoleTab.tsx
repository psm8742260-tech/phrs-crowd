import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function ConsoleTab({ state }: { state: any }) {
  const { isAutoInternetEnabled, setIsAutoInternetEnabled, isDarkMode, setIsDarkMode, isAuthenticated, setIsAuthenticated, loginView, setLoginView, appIconUrl, setAppIconUrl, pkgName, setPkgName, shaFingerprint, setShaFingerprint, activeTab, setActiveTab, snippetFormat, setSnippetFormat, projects, setProjects, selectedProjectId, setSelectedProjectId, newProjName, setNewProjName, showNewProjModal, setShowNewProjModal, showUpiModal, setShowUpiModal, searchQuery, setSearchQuery, notifications, setNotifications, showNotifications, setShowNotifications, metrics, setMetrics, cpuHistory, setCpuHistory, vpsLogStream, setVpsLogStream, isMiniServerRunning, setIsMiniServerRunning, miniServerPort, setMiniServerPort, miniServerIp, setMiniServerIp, terminalHistory, setTerminalHistory, terminalInput, setTerminalInput, stealthDataBalanceMb, setStealthDataBalanceMb, stealthSmsCredits, setStealthSmsCredits, stealthWalletRupees, setStealthWalletRupees, showStandaloneBanner, setShowStandaloneBanner, localServerIpInput, setLocalServerIpInput, dbData, setDbData, dbRawText, setDbRawText, isRawDbView, setIsRawDbView, dbSuccessMessage, setDbSuccessMessage, isSyncingDb, setIsSyncingDb, dbKeyPath, setDbKeyPath, dbNewVal, setDbNewVal, deployments, setDeployments, githubUrl, setGithubUrl, appName, setAppName, appPort, setAppPort, appTech, setAppTech, buildLogs, setBuildLogs, isBuilding, setIsBuilding, buildProgress, setBuildProgress, activeVirtualApp, setActiveVirtualApp, simulatedVisitorCount, setSimulatedVisitorCount, smartRouteModal, setSmartRouteModal, shortLinks, setShortLinks, linkSlug, setLinkSlug, linkTarget, setLinkTarget, hostFileName, setHostFileName, hostContent, setHostContent, deployedUrl, setDeployedUrl, isDeploying, setIsDeploying, hostedHtml, setHostedHtml, smsGateway, setSmsGateway, smsApiKey, setSmsApiKey, smsAccountSid, setSmsAccountSid, smsSenderId, setSmsSenderId, smsTemplate, setSmsTemplate, testPhoneNumber, setTestPhoneNumber, isSendingOtp, setIsSendingOtp, lastGeneratedOtp, setLastGeneratedOtp, verificationInput, setVerificationInput, verificationStatus, setVerificationStatus, virtualPhoneNotification, setVirtualPhoneNotification, phoneScreenOn, setPhoneScreenOn, apiKeys, setApiKeys, isRoutingActive, setIsRoutingActive, routingHistory, setRoutingHistory, activeRouterPrompt, setActiveRouterPrompt, activeRouterModel, setActiveRouterModel, isRoutingLoading, setIsRoutingLoading, activeExportFile, setActiveExportFile, billingBudget, setBillingBudget, billingAlertAmount, setBillingAlertAmount, billingAlertEmail, setBillingAlertEmail, billingSubTab, setBillingSubTab, envTranslationMappings, setEnvTranslationMappings, secretManagerSubTab, setSecretManagerSubTab, iamMembers, setIamMembers, newMemberEmail, setNewMemberEmail, newMemberRole, setNewMemberRole, selectedMarketplaceApp, setSelectedMarketplaceApp, customSystemPrompt, setCustomSystemPrompt, agentChatInput, setAgentChatInput, agentChatHistory, setAgentChatHistory, k8sPods, setK8sPods, buckets, setBuckets, newBucketName, setNewBucketName, storageFiles, setStorageFiles, uploadFileName, setUploadFileName, uploadTargetBucket, setUploadTargetBucket, isUploading, setIsUploading, firewallPolicy, setFirewallPolicy, sslStatus, setSslStatus, generatedKeyPair, setGeneratedKeyPair, bqQuery, setBqQuery, bqResults, setBqResults, bqRunning, setBqRunning, monitorUptime, setMonitorUptime, activeAlerts, setActiveAlerts, isHybridDevMode, setIsHybridDevMode, isAiServerBypassed, setIsAiServerBypassed, remoteNodeIp, setRemoteNodeIp, deviceSerial, setDeviceSerial, deepseekApiKey, setDeepseekApiKey, showAdminPortal, setShowAdminPortal, isAdminGmailVerified, setIsAdminGmailVerified, adminGmail, setAdminGmail, isVerifyingGmail, setIsVerifyingGmail, uploadedZipName, setUploadedZipName, zipFile, setZipFile, isUploadingZip, setIsUploadingZip, zipUploadProgress, setZipUploadProgress, isCompiling, setIsCompiling, compilationProgress, setCompilationProgress, compilationLogs, setCompilationLogs, tempRemoteNodeIp, setTempRemoteNodeIp, tempDeviceSerial, setTempDeviceSerial, tempDeepseekApiKey, setTempDeepseekApiKey, cloudRunImage, setCloudRunImage, cloudRunEnvVars, setCloudRunEnvVars, revisionTraffic, setRevisionTraffic, subnets, setSubnets, firewallRules, setFirewallRules, newSubnetName, setNewSubnetName, newSubnetRange, setNewSubnetRange, newFireRuleName, setNewFireRuleName, newFireRulePort, setNewFireRulePort, newFireRuleRange, setNewFireRuleRange, newFireRuleAction, setNewFireRuleAction, vpcSubTab, setVpcSubTab, ipInventory, setIpInventory, deviceCarrierIp, setDeviceCarrierIp, networkLatency, setNetworkLatency, mobileIp, setMobileIp, isBridgeActive, setIsBridgeActive, isAdminAuthorized, setIsAdminAuthorized, adminPasswordInput, setAdminPasswordInput, showAuthModal, setShowAuthModal, modificationCount, setModificationCount, showSystemRules, setShowSystemRules, ruleCountdown, setRuleCountdown, protocolStep, setProtocolStep, sqlTables, setSqlTables, newTableName, setNewTableName, newTableCols, setNewTableCols, sqlBackups, setSqlBackups, mapsApiKey, setMapsApiKey, mapsSelectedEndpoint, setMapsSelectedEndpoint, mapsActiveTrackingId, setMapsActiveTrackingId, isSidebarOpen, setIsSidebarOpen, expandedSection, setExpandedSection, selectedSubMenu, setSelectedSubMenu, agents, setAgents, selectedAgentId, setSelectedAgentId, newAgentName, setNewAgentName, newAgentModel, setNewAgentModel, newAgentPrompt, setNewAgentPrompt, agentPlatformSubTab, setAgentPlatformSubTab, securitySubTab, setSecuritySubTab, cloudStorageSubTab, setCloudStorageSubTab, monitoringSubTab, setMonitoringSubTab, iamSubTab, setIamSubTab, apisSubTab, setApisSubTab, cloudRunSubTab, setCloudRunSubTab, cloudHubSubTab, setCloudHubSubTab, phrsMapsSubTab, setPhrsMapsSubTab, bigQuerySubTab, setBigQuerySubTab, phrsDbSubTab, setPhrsDbSubTab, cloudRunJobs, setCloudRunJobs, isCreatingJob, setIsCreatingJob, newJobName, setNewJobName, newJobSchedule, setNewJobSchedule, workerPools, setWorkerPools, isCreatingPool, setIsCreatingPool, newPoolName, setNewPoolName, domainMappings, setDomainMappings, selectedDomain, setSelectedDomain, domainFilterQuery, setDomainFilterQuery, isCreatingDomain, setIsCreatingDomain, newDomainName, setNewDomainName, newDomainService, setNewDomainService, newDomainType, setNewDomainType, isFleetBannerVisible, setIsFleetBannerVisible, isFleetBannerExpanded, setIsFleetBannerExpanded, dbProductFilter, setDbProductFilter, dbLocationFilter, setDbLocationFilter, isProductFilterOpen, setIsProductFilterOpen, isLocationFilterOpen, setIsLocationFilterOpen, phrsUsers, setPhrsUsers, newAuthEmail, setNewAuthEmail, newAuthPassword, setNewAuthPassword, firestoreCollections, setFirestoreCollections, selectedCollection, setSelectedCollection, selectedDocId, setSelectedDocId, isCreatingCollection, setIsCreatingCollection, newCollectionName, setNewCollectionName, isCreatingDoc, setIsCreatingDoc, newDocId, setNewDocId, phrsStorageFiles, setPhrsStorageFiles, isDraggingFile, setIsDraggingFile, deepScanTimer, setDeepScanTimer, isAtomicScanning, setIsAtomicScanning, atomicLogs, setAtomicLogs, homeSubTab, setHomeSubTab, isWelcomeBoardOpen, setIsWelcomeBoardOpen, homeToast, setHomeToast, agentSearchQuery, setAgentSearchQuery, dashboardAgentChatHistory, setDashboardAgentChatHistory, isAgentPanelOpen, setIsAgentPanelOpen, isAgentThinking, setIsAgentThinking, agentModuleMode, setAgentModuleMode, agentImagePrompt, setAgentImagePrompt, agentCodeLanguage, setAgentCodeLanguage, handleTerminalSubmit, handleNetworkChange, handleAgentSubmit, handlePhotoGeneratorClick, handleCodeGeneratorClick, handleCreateProject, handleUpdateRawDb, handleAddDbNode, handleDeleteDbNode, handleSyncDatabase, handleStartDeployment, handleCreateShortLink, handleSendTestSms, handleVerifyOtp, handleSectionClick, handleSubMenuClick } = state;
  const { Cloud, Copy, Download, FileCode, Settings, Smartphone, TerminalIcon } = LucideIcons;
  const logTerminalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [vpsLogStream]);
  return (
        <>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border flex flex-col h-[350px] transition-colors bg-slate-900 border-slate-800 shadow-2xl">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-mono font-bold text-sm tracking-wider uppercase text-indigo-400">VPS TERMINAL METRICS & LOGS</h3>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System alive"></span>
              </div>
              <div 
                ref={logTerminalRef}
                className="flex-1 p-4 font-mono text-xs rounded-xl overflow-y-auto space-y-2 select-text border bg-black/50 text-emerald-400 border-slate-700/50"
              >
                {vpsLogStream.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-indigo-400">sys@vps:~#</span> {log}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs font-mono border-slate-800 text-slate-300">
                <div className="flex flex-col p-2 rounded bg-slate-800/50">
                  <span className="text-slate-500 font-medium mb-1">IP ADDRESS:</span>
                  <span className="font-bold">{remoteNodeIp}</span>
                </div>
                <div className="flex flex-col p-2 rounded bg-slate-800/50">
                  <span className="text-slate-500 font-medium mb-1">DOCKER ENGINE:</span>
                  <span className="font-bold text-emerald-500">ACTIVE</span>
                </div>
                <div className="flex flex-col p-2 rounded bg-slate-800/50">
                  <span className="text-slate-500 font-medium mb-1">PM2 DAEMONS:</span>
                  <span className="font-bold text-indigo-400">3 ONLINE</span>
                </div>
                <div className="flex flex-col p-2 rounded bg-slate-800/50">
                  <span className="text-slate-500 font-medium mb-1">DB SCHEMA:</span>
                  <span className="font-bold text-amber-500">SQLITE3 v4</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                    <TerminalIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">PHRS Cloud Console</h2>
                    <p className="text-sm text-slate-500 font-medium">మీ సర్వర్ కోసం 3 రకాల కోడింగ్ బోర్డులు ఇక్కడ ఉన్నాయి</p>
                  </div>
                </div>
              </div>

              {/* Master Standalone Server & APK Download Card for 157.50.81.156 */}
              <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-2xl border border-indigo-500/30 mb-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase">Master IP: 157.50.81.156 Ready</span>
                    <h3 className="text-lg font-black tracking-tight mt-2">📥 1-CLICK STANDALONE & APK DEPLOYMENT CONSOLE</h3>
                    <p className="text-xs text-indigo-200 mt-1 max-w-xl">
                      పూర్తి PHRS Crowd అప్లికేషన్ మాస్టర్‌ను ఒకవైపు సింగిల్ HTML ఫైల్‌గా లేదా మరోవైపు నేరుగా ఆండ్రాయిడ్ APK ప్యాకేజీలా డౌన్‌లోడ్ చేసుకోండి!
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      onClick={async () => {
                        try {
                          const res = await fetch('/standalone.html');
                          const htmlText = await res.text();
                          const blob = new Blob([htmlText], { type: 'text/html' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'phrs_crowd_standalone_master.html';
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                          setHomeToast('✓ Standalone HTML Master Bundle downloaded successfully!');
                          setTimeout(() => setHomeToast(null), 3000);
                        } catch (e) {
                          window.open('/standalone.html', '_blank');
                        }
                      }}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs px-5 py-3.5 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>DOWNLOAD HTML</span>
                    </button>
                    
                    <button
                      onClick={async () => {
                        try {
                          const res = await fetch('/standalone.html');
                          const htmlText = await res.text();
                          const blob = new Blob([htmlText], { type: 'text/html' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'PHRS_Crowd_Master_v1.0.apk.html';
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                          setHomeToast('✓ Android APK Installer Package initialized successfully!');
                          setTimeout(() => setHomeToast(null), 3000);
                        } catch (e) {
                          window.open('/standalone.html', '_blank');
                        }
                      }}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs px-5 py-3.5 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>DOWNLOAD APK</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Three Beautiful Symmetrical Integration Code Boards Side-by-Side */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Board 1: MODULE (phrs-config.js) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <FileCode className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-indigo-600 tracking-wider">MODULE</div>
                          <div className="text-[11px] font-bold text-slate-700 font-mono">phrs-config.js</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] bg-slate-100 text-slate-600 rounded-md font-bold uppercase font-sans">కాన్ఫిగరేషన్</span>
                    </div>
                    
                    <p className="text-[10px] text-slate-500 leading-relaxed font-sans h-8">
                      మీ రియాక్ట్ (React) లేదా ఆధునిక క్లయింట్-సైడ్ యాప్స్‌ని PHRS సర్వర్‌కి కనెక్ట్ చేయడానికి వాడే ప్రాథమిక కాన్ఫిగరేషన్ ఫైల్.
                    </p>

                    <div className="relative group">
                      <pre className="w-full bg-slate-950 text-emerald-400 p-4 rounded-xl text-[11px] font-mono overflow-y-auto h-[260px] leading-relaxed border border-slate-900 shadow-inner whitespace-pre-wrap select-all">
{`import { initializeApp } from "@phrs/cloud";

// లోకల్ స్టోరేజ్ లేదా డిఫాల్ట్ వాల్యూస్
const currentIP = localStorage.getItem('phrs_ip') || "${remoteNodeIp}";
const currentSerial = localStorage.getItem('phrs_serial') || "${deviceSerial}";
const currentDeepSeekKey = localStorage.getItem('phrs_deepseek') || "${deepseekApiKey}";

export const phrsConfig = {
  apiKey: "PHRS_AUTH_8742260",
  deepseekApiKey: currentDeepSeekKey,
  deviceSerial: currentSerial,
  authDomain: currentIP,
  projectId: "phrs-master-cloud",
  appId: "1:8742260:web:phrs_master_node"
};

export const app = initializeApp(phrsConfig);`}
                      </pre>
                      <button 
                        className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg shadow transition-colors"
                        onClick={() => {
                          const code = `import { initializeApp } from "@phrs/cloud";

// లోకల్ స్టోరేజ్ లేదా డిఫాల్ట్ వాల్యూస్
const currentIP = localStorage.getItem('phrs_ip') || "${remoteNodeIp}";
const currentSerial = localStorage.getItem('phrs_serial') || "${deviceSerial}";
const currentDeepSeekKey = localStorage.getItem('phrs_deepseek') || "${deepseekApiKey}";

export const phrsConfig = {
  apiKey: "PHRS_AUTH_8742260",
  deepseekApiKey: currentDeepSeekKey,
  deviceSerial: currentSerial,
  authDomain: currentIP,
  projectId: "phrs-master-cloud",
  appId: "1:8742260:web:phrs_master_node"
};

export const app = initializeApp(phrsConfig);`;
                          navigator.clipboard.writeText(code);
                          setHomeToast('✓ phrs-config.js (MODULE) copied!');
                          setTimeout(() => setHomeToast(null), 3000);
                        }}
                        title="Copy Config"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col items-center">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 mb-3 w-32 h-32 flex items-center justify-center overflow-hidden">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                          `import { initializeApp } from "@phrs/cloud";
const currentIP = localStorage.getItem('phrs_ip') || "${remoteNodeIp}";
const currentSerial = localStorage.getItem('phrs_serial') || "${deviceSerial}";
const currentDeepSeekKey = localStorage.getItem('phrs_deepseek') || "${deepseekApiKey}";
export const phrsConfig = { apiKey: "PHRS_AUTH_8742260", deepseekApiKey: currentDeepSeekKey, deviceSerial: currentSerial, authDomain: currentIP, projectId: "phrs-master-cloud", appId: "1:8742260:web:phrs_master_node" };
export const app = initializeApp(phrsConfig);`
                        )}`} 
                        alt="MODULE QR" 
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 font-sans tracking-wide">MODULE QR CODE</span>
                  </div>
                </div>

                {/* Board 2: SCRIPT (main.js) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <Cloud className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-indigo-600 tracking-wider">SCRIPT</div>
                          <div className="text-[11px] font-bold text-slate-700 font-mono">main.js</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] bg-slate-100 text-slate-600 rounded-md font-bold uppercase font-sans">యాక్టివేషన్</span>
                    </div>
                    
                    <p className="text-[10px] text-slate-500 leading-relaxed font-sans h-8">
                      PHRS, db, OTP, మరియు డీప్‌సీక్ AI కోర్ సర్వీసులను మీ వెబ్‌సైట్‌లో యాక్టివేట్ చేయడానికి ఉపయోగించే ప్రధాన స్క్రిప్ట్ కోడ్.
                    </p>

                    <div className="relative group">
                      <pre className="w-full bg-slate-950 text-indigo-300 p-4 rounded-xl text-[11px] font-mono overflow-y-auto h-[260px] leading-relaxed border border-slate-900 shadow-inner whitespace-pre-wrap select-all">
{`import { PHRS, db, OTP, DeepSeekAI } from "@phrs/cloud";
import { phrsConfig } from "./phrs-config.js";

PHRS.init(phrsConfig.authDomain, phrsConfig.deviceSerial);
db.host = phrsConfig.authDomain;
OTP.node(phrsConfig.authDomain);
DeepSeekAI.connect(phrsConfig.deepseekApiKey);`}
                      </pre>
                      <button 
                        className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg shadow transition-colors"
                        onClick={() => {
                          const code = `import { PHRS, db, OTP, DeepSeekAI } from "@phrs/cloud";
import { phrsConfig } from "./phrs-config.js";

PHRS.init(phrsConfig.authDomain, phrsConfig.deviceSerial);
db.host = phrsConfig.authDomain;
OTP.node(phrsConfig.authDomain);
DeepSeekAI.connect(phrsConfig.deepseekApiKey);`;
                          navigator.clipboard.writeText(code);
                          setHomeToast('✓ main.js (SCRIPT) copied!');
                          setTimeout(() => setHomeToast(null), 3000);
                        }}
                        title="Copy Script"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col items-center">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 mb-3 w-32 h-32 flex items-center justify-center overflow-hidden">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                          `import { PHRS, db, OTP, DeepSeekAI } from "@phrs/cloud";
import { phrsConfig } from "./phrs-config.js";
PHRS.init(phrsConfig.authDomain, phrsConfig.deviceSerial);
db.host = phrsConfig.authDomain;
OTP.node(phrsConfig.authDomain);
DeepSeekAI.connect(phrsConfig.deepseekApiKey);`
                        )}`} 
                        alt="SCRIPT QR" 
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 font-sans tracking-wide">SCRIPT QR CODE</span>
                  </div>
                </div>

                {/* Board 3: OBJECT (settings.js) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <Settings className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-indigo-600 tracking-wider">OBJECT</div>
                          <div className="text-[11px] font-bold text-slate-700 font-mono">settings.js</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] bg-slate-100 text-slate-600 rounded-md font-bold uppercase font-sans">సెట్టింగ్స్ సేవ్</span>
                    </div>
                    
                    <p className="text-[10px] text-slate-500 leading-relaxed font-sans h-8">
                      సర్వర్ IP, సీరియల్ నెంబర్ మరియు డీప్‌సీక్ API కీని బ్రౌజర్ లోకల్ స్టోరేజ్‌లో డైనమిక్‌గా సేవ్ చేసి అప్‌డేట్ చేసే ఫంక్షన్.
                    </p>

                    <div className="relative group">
                      <pre className="w-full bg-slate-950 text-indigo-200 p-4 rounded-xl text-[11px] font-mono overflow-y-auto h-[260px] leading-relaxed border border-slate-900 shadow-inner whitespace-pre-wrap select-all">
{`window.savePHRSSettings = function(newIP, newSerial, newDeepSeekKey) {
  localStorage.setItem('phrs_ip', newIP);
  localStorage.setItem('phrs_serial', newSerial);
  localStorage.setItem('phrs_deepseek', newDeepSeekKey);
  
  alert("PHRS సర్వర్ సెట్టింగ్స్ విజయవంతంగా అప్‌డేట్ అయ్యాయి! సిస్టమ్ రీస్టార్ట్ అవుతోంది...");
  location.reload();
};`}
                      </pre>
                      <button 
                        className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg shadow transition-colors"
                        onClick={() => {
                          const code = `window.savePHRSSettings = function(newIP, newSerial, newDeepSeekKey) {
  localStorage.setItem('phrs_ip', newIP);
  localStorage.setItem('phrs_serial', newSerial);
  localStorage.setItem('phrs_deepseek', newDeepSeekKey);
  
  alert("PHRS సర్వర్ సెట్టింగ్స్ విజయవంతంగా అప్‌డేట్ అయ్యాయి! సిస్టమ్ రీస్టార్ట్ అవుతోంది...");
  location.reload();
};`;
                          navigator.clipboard.writeText(code);
                          setHomeToast('✓ settings.js (OBJECT) copied!');
                          setTimeout(() => setHomeToast(null), 3000);
                        }}
                        title="Copy Settings"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col items-center">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 mb-3 w-32 h-32 flex items-center justify-center overflow-hidden">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                          `window.savePHRSSettings = function(newIP, newSerial, newDeepSeekKey) {
  localStorage.setItem('phrs_ip', newIP);
  localStorage.setItem('phrs_serial', newSerial);
  localStorage.setItem('phrs_deepseek', newDeepSeekKey);
  alert("PHRS సర్వర్ సెట్టింగ్స్ విజయవంతంగా అప్డేట్ అయ్యాయి! సిస్టమ్ రీస్టార్ట్ అవుతోంది...");
  location.reload();
};`
                        )}`} 
                        alt="OBJECT QR" 
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 font-sans tracking-wide">OBJECT QR CODE</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </>
  );
}
