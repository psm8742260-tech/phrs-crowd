import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function ConsoleTab({ state }: { state: any }) {
  const currentGateway = typeof window !== 'undefined' ? window.location.origin : "https://phrscrowd.online";
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

              {/* Three Beautiful Symmetrical Integration Code Boards Side-by-Side */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">                
                {/* Board 1: SMS & OTP GATEWAY */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-indigo-600 tracking-wider">SMS & OTP GATEWAY</div>
                          <div className="text-[11px] font-bold text-slate-700 font-mono">phrs-sms-otp.js</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] bg-emerald-100 text-emerald-700 rounded-md font-bold uppercase font-sans">ఎస్ఎంఎస్ & ఓటిపి</span>
                    </div>
                    
                    <p className="text-[10px] text-slate-500 leading-relaxed font-sans h-8">
                      మీ అప్లికేషన్లలో OTP జెనరేట్ చేయడానికి మరియు SMSలు పంపడానికి అవసరమైన గేట్‌വേ ఇంటిగ్రేషన్ కోడ్.
                    </p>
                    <div className="relative group">
                      <pre className="w-full bg-slate-950 text-emerald-400 p-4 rounded-xl text-[11px] font-mono overflow-y-auto h-[260px] leading-relaxed border border-slate-900 shadow-inner whitespace-pre-wrap select-all">{`// PHRS SMS & OTP Gateway Integration
const PHRS_GATEWAY = "${currentGateway}";
const PROJECT_KEY = "<YOUR_PROJECT_KEY>";

// 1. Generate and Send OTP
export async function sendOTP(phoneNumber) {
  try {
    const response = await fetch(\`\${PHRS_GATEWAY}/api/otp/send\`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": \`Bearer \${PROJECT_KEY}\`
      },
      body: JSON.stringify({ to: phoneNumber })
    });
    return await response.json();
  } catch (err) {
    console.error("SMS Send Error:", err);
  }
}

// 2. Verify OTP
export async function verifyOTP(phoneNumber, otpCode) {
  try {
    const response = await fetch(\`\${PHRS_GATEWAY}/api/sms/verify-otp\`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": \`Bearer \${PROJECT_KEY}\`
      },
      body: JSON.stringify({ phone: phoneNumber, code: otpCode })
    });
    return await response.json();
  } catch (err) {
    console.error("OTP Verify Error:", err);
  }
}`}
                      </pre>
                      <button 
                        className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg shadow transition-colors"
                        onClick={() => {
                          const c = `// PHRS SMS & OTP Gateway Integration\nconst PHRS_GATEWAY = "${currentGateway}";\nconst PROJECT_KEY = "<YOUR_PROJECT_KEY>";\n\nexport async function sendOTP(phoneNumber) {\n  try {\n    const response = await fetch(\`\${PHRS_GATEWAY}/api/otp/send\`, {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        "Authorization": \`Bearer \${PROJECT_KEY}\`\n      },\n      body: JSON.stringify({ to: phoneNumber })\n    });\n    return await response.json();\n  } catch (err) {\n    console.error("SMS Send Error:", err);\n  }\n}\n\nexport async function verifyOTP(phoneNumber, otpCode) {\n  try {\n    const response = await fetch(\`\${PHRS_GATEWAY}/api/sms/verify-otp\`, {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        "Authorization": \`Bearer \${PROJECT_KEY}\`\n      },\n      body: JSON.stringify({ phone: phoneNumber, code: otpCode })\n    });\n    return await response.json();\n  } catch (err) {\n    console.error("OTP Verify Error:", err);\n  }\n}`;
                          navigator.clipboard.writeText(c);
                        }}
                        title="Copy Code"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col items-center">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 mb-3 w-32 h-32 flex items-center justify-center overflow-hidden">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                          `export async function sendSms() { const res = await fetch("${currentGateway}/api/sms/send", { method: "POST", headers: { "Authorization": "Bearer <YOUR_PROJECT_KEY>" } }); return await res.json(); }`
                        )}`} 
                        alt="SMS GATEWAY QR" 
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 font-sans tracking-wide">SMS GATEWAY QR</span>
                  </div>
                </div>

                {/* Board 2: FIREBASE DATABASE */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <FileCode className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-indigo-600 tracking-wider">FIREBASE DATABASE</div>
                          <div className="text-[11px] font-bold text-slate-700 font-mono">phrs-firebase-sync.js</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] bg-indigo-100 text-indigo-700 rounded-md font-bold uppercase font-sans">ఫైర్‌బేస్ డేటాబేస్</span>
                    </div>
                    
                    <p className="text-[10px] text-slate-500 leading-relaxed font-sans h-8">
                      ఫైర్‌బేస్ ఫైర్‌స్టోర్ డేటాబేస్‌తో మీ అప్లికేషన్ డేటాను రియల్-టైమ్‌లో సింక్ మరియు అప్‌డేట్ చేసే లాజిక్.
                    </p>
                    <div className="relative group">
                      <pre className="w-full bg-slate-950 text-indigo-300 p-4 rounded-xl text-[11px] font-mono overflow-y-auto h-[260px] leading-relaxed border border-slate-900 shadow-inner whitespace-pre-wrap select-all">{`// PHRS Firebase Database Synchronization
const PHRS_GATEWAY = "${currentGateway}";
const PROJECT_KEY = "<YOUR_PROJECT_KEY>";

// Sync data securely with Cloud Firestore Database
export async function syncDatabase(collection, documentId, data) {
  try {
    const response = await fetch(\`\${PHRS_GATEWAY}/api/db/collections/\${collection}/docs\`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": \`Bearer \${PROJECT_KEY}\`
      },
      body: JSON.stringify({
        docId: documentId,
        fields: data
      })
    });
    const result = await response.json();
    console.log("[FIREBASE SYNC]", result);
    return result;
  } catch (err) {
    console.error("[FIREBASE SYNC ERROR]", err);
    return { success: false, error: err.message };
  }
}`}
                      </pre>
                      <button 
                        className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg shadow transition-colors"
                        onClick={() => {
                          const c = `// PHRS Firebase Database Synchronization\nconst PHRS_GATEWAY = "${currentGateway}";\nconst PROJECT_KEY = "<YOUR_PROJECT_KEY>";\n\nexport async function syncDatabase(collection, documentId, data) {\n  try {\n    const response = await fetch(\`\${PHRS_GATEWAY}/api/db/collections/\${collection}/docs\`, {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        "Authorization": \`Bearer \${PROJECT_KEY}\`\n      },\n      body: JSON.stringify({\n        docId: documentId,\n        fields: data\n      })\n    });\n    const result = await response.json();\n    console.log("[FIREBASE SYNC]", result);\n    return result;\n  } catch (err) {\n    console.error("[FIREBASE SYNC ERROR]", err);\n    return { success: false, error: err.message };\n  }\n}`;
                          navigator.clipboard.writeText(c);
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
                          `fetch("${currentGateway}/api/db/collections/test/docs", { method: "POST", body: JSON.stringify({docId: "123"}) });`
                        )}`} 
                        alt="FIREBASE DATABASE QR" 
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 font-sans tracking-wide">FIREBASE DB QR</span>
                  </div>
                </div>

                {/* Board 3: PHRS SERVER GATEWAY */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <Cloud className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-indigo-600 tracking-wider">PHRS SERVER GATEWAY</div>
                          <div className="text-[11px] font-bold text-slate-700 font-mono">phrs-gateway-connect.js</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] bg-amber-100 text-amber-700 rounded-md font-bold uppercase font-sans">సర్వర్ గేట్‌వే</span>
                    </div>
                    
                    <p className="text-[10px] text-slate-500 leading-relaxed font-sans h-8">
                      బాహ్య ప్రాజెక్టులను మన పి హెచ్ ఆర్ ఎస్ క్రౌడ్ క్లౌడ్ సర్వర్‌కి సురక్షితంగా కనెక్ట్ చేయడానికి ఆథరైజేషన్ కోడ్.
                    </p>
                    <div className="relative group">
                      <pre className="w-full bg-slate-950 text-indigo-200 p-4 rounded-xl text-[11px] font-mono overflow-y-auto h-[260px] leading-relaxed border border-slate-900 shadow-inner whitespace-pre-wrap select-all">{`// PHRS Cloud Server Gateway Connection
const PHRS_GATEWAY = "${currentGateway}";
const PROJECT_KEY = "<YOUR_PROJECT_KEY>";

export async function connectToServer() {
  try {
    const response = await fetch(\`\${PHRS_GATEWAY}/api/auth/verify\`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": \`Bearer \${PROJECT_KEY}\`
      },
      body: JSON.stringify({ appName: "MyExternalApp", connectedAt: new Date() })
    });
    const result = await response.json();
    console.log("[SERVER CONNECTION]", result);
    return result;
  } catch (err) {
    console.error("[CONNECTION ERROR]", err);
    return { success: false, error: err.message };
  }
}`}
                      </pre>
                      <button 
                        className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg shadow transition-colors"
                        onClick={() => {
                          const c = `// PHRS Cloud Server Gateway Connection\nconst PHRS_GATEWAY = "${currentGateway}";\nconst PROJECT_KEY = "<YOUR_PROJECT_KEY>";\n\nexport async function connectToServer() {\n  try {\n    const response = await fetch(\`\${PHRS_GATEWAY}/api/auth/verify\`, {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        "Authorization": \`Bearer \${PROJECT_KEY}\`\n      },\n      body: JSON.stringify({ appName: "MyExternalApp", connectedAt: new Date() })\n    });\n    const result = await response.json();\n    console.log("[SERVER CONNECTION]", result);\n    return result;\n  } catch (err) {\n    console.error("[CONNECTION ERROR]", err);\n    return { success: false, error: err.message };\n  }\n}`;
                          navigator.clipboard.writeText(c);
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
                          `export async function auth() { const res = await fetch("${currentGateway}/api/auth/verify", { method: "POST", headers: { "Authorization": "Bearer <YOUR_PROJECT_KEY>" } }); return await res.json(); }`
                        )}`} 
                        alt="PHRS SERVER GATEWAY QR" 
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 font-sans tracking-wide">SERVER GATEWAY QR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>

  );
}
