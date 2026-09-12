import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function ConsoleTab({ state }: { state: any }) {
  const currentGateway = "https://phrscrowd.online";
  const { isAutoInternetEnabled, setIsAutoInternetEnabled, isDarkMode, setIsDarkMode, isAuthenticated, setIsAuthenticated, loginView, setLoginView, appIconUrl, setAppIconUrl, pkgName, setPkgName, shaFingerprint, setShaFingerprint, activeTab, setActiveTab, snippetFormat, setSnippetFormat, projects, setProjects, selectedProjectId, setSelectedProjectId, newProjName, setNewProjName, showNewProjModal, setShowNewProjModal, showUpiModal, setShowUpiModal, searchQuery, setSearchQuery, notifications, setNotifications, showNotifications, setShowNotifications, metrics, setMetrics, cpuHistory, setCpuHistory, vpsLogStream, setVpsLogStream, isMiniServerRunning, setIsMiniServerRunning, miniServerPort, setMiniServerPort, miniServerIp, setMiniServerIp, terminalHistory, setTerminalHistory, terminalInput, setTerminalInput, stealthDataBalanceMb, setStealthDataBalanceMb, stealthSmsCredits, setStealthSmsCredits, stealthWalletRupees, setStealthWalletRupees, showStandaloneBanner, setShowStandaloneBanner, localServerIpInput, setLocalServerIpInput, dbData, setDbData, dbRawText, setDbRawText, isRawDbView, setIsRawDbView, dbSuccessMessage, setDbSuccessMessage, isSyncingDb, setIsSyncingDb, dbKeyPath, setDbKeyPath, dbNewVal, setDbNewVal, deployments, setDeployments, githubUrl, setGithubUrl, appName, setAppName, appPort, setAppPort, appTech, setAppTech, buildLogs, setBuildLogs, isBuilding, setIsBuilding, buildProgress, setBuildProgress, activeVirtualApp, setActiveVirtualApp, simulatedVisitorCount, setSimulatedVisitorCount, smartRouteModal, setSmartRouteModal, shortLinks, setShortLinks, linkSlug, setLinkSlug, linkTarget, setLinkTarget, hostFileName, setHostFileName, hostContent, setHostContent, deployedUrl, setDeployedUrl, isDeploying, setIsDeploying, hostedHtml, setHostedHtml, smsGateway, setSmsGateway, smsApiKey, setSmsApiKey, smsAccountSid, setSmsAccountSid, smsSenderId, setSmsSenderId, smsTemplate, setSmsTemplate, testPhoneNumber, setTestPhoneNumber, isSendingOtp, setIsSendingOtp, lastGeneratedOtp, setLastGeneratedOtp, verificationInput, setVerificationInput, verificationStatus, setVerificationStatus, virtualPhoneNotification, setVirtualPhoneNotification, phoneScreenOn, setPhoneScreenOn, apiKeys, setApiKeys, isRoutingActive, setIsRoutingActive, routingHistory, setRoutingHistory, activeRouterPrompt, setActiveRouterPrompt, activeRouterModel, setActiveRouterModel, isRoutingLoading, setIsRoutingLoading, activeExportFile, setActiveExportFile, billingBudget, setBillingBudget, billingAlertAmount, setBillingAlertAmount, billingAlertEmail, setBillingAlertEmail, billingSubTab, setBillingSubTab, envTranslationMappings, setEnvTranslationMappings, secretManagerSubTab, setSecretManagerSubTab, iamMembers, setIamMembers, newMemberEmail, setNewMemberEmail, newMemberRole, setNewMemberRole, selectedMarketplaceApp, setSelectedMarketplaceApp, customSystemPrompt, setCustomSystemPrompt, agentChatInput, setAgentChatInput, agentChatHistory, setAgentChatHistory, k8sPods, setK8sPods, buckets, setBuckets, newBucketName, setNewBucketName, storageFiles, setStorageFiles, uploadFileName, setUploadFileName, uploadTargetBucket, setUploadTargetBucket, isUploading, setIsUploading, firewallPolicy, setFirewallPolicy, sslStatus, setSslStatus, generatedKeyPair, setGeneratedKeyPair, bqQuery, setBqQuery, bqResults, setBqResults, bqRunning, setBqRunning, monitorUptime, setMonitorUptime, activeAlerts, setActiveAlerts, isHybridDevMode, setIsHybridDevMode, isAiServerBypassed, setIsAiServerBypassed, remoteNodeIp, setRemoteNodeIp, deviceSerial, setDeviceSerial, deepseekApiKey, setDeepseekApiKey, showAdminPortal, setShowAdminPortal, isAdminGmailVerified, setIsAdminGmailVerified, adminGmail, setAdminGmail, isVerifyingGmail, setIsVerifyingGmail, uploadedZipName, setUploadedZipName, zipFile, setZipFile, isUploadingZip, setIsUploadingZip, zipUploadProgress, setZipUploadProgress, isCompiling, setIsCompiling, compilationProgress, setCompilationProgress, compilationLogs, setCompilationLogs, tempRemoteNodeIp, setTempRemoteNodeIp, tempDeviceSerial, setTempDeviceSerial, tempDeepseekApiKey, setTempDeepseekApiKey, cloudRunImage, setCloudRunImage, cloudRunEnvVars, setCloudRunEnvVars, revisionTraffic, setRevisionTraffic, subnets, setSubnets, firewallRules, setFirewallRules, newSubnetName, setNewSubnetName, newSubnetRange, setNewSubnetRange, newFireRuleName, setNewFireRuleName, newFireRulePort, setNewFireRulePort, newFireRuleRange, setNewFireRuleRange, newFireRuleAction, setNewFireRuleAction, vpcSubTab, setVpcSubTab, ipInventory, setIpInventory, deviceCarrierIp, setDeviceCarrierIp, networkLatency, setNetworkLatency, mobileIp, setMobileIp, isBridgeActive, setIsBridgeActive, isAdminAuthorized, setIsAdminAuthorized, adminPasswordInput, setAdminPasswordInput, showAuthModal, setShowAuthModal, modificationCount, setModificationCount, showSystemRules, setShowSystemRules, ruleCountdown, setRuleCountdown, protocolStep, setProtocolStep, sqlTables, setSqlTables, newTableName, setNewTableName, newTableCols, setNewTableCols, sqlBackups, setSqlBackups, mapsApiKey, setMapsApiKey, mapsSelectedEndpoint, setMapsSelectedEndpoint, mapsActiveTrackingId, setMapsActiveTrackingId, isSidebarOpen, setIsSidebarOpen, expandedSection, setExpandedSection, selectedSubMenu, setSelectedSubMenu, agents, setAgents, selectedAgentId, setSelectedAgentId, newAgentName, setNewAgentName, newAgentModel, setNewAgentModel, newAgentPrompt, setNewAgentPrompt, agentPlatformSubTab, setAgentPlatformSubTab, securitySubTab, setSecuritySubTab, cloudStorageSubTab, setCloudStorageSubTab, monitoringSubTab, setMonitoringSubTab, iamSubTab, setIamSubTab, apisSubTab, setApisSubTab, cloudRunSubTab, setCloudRunSubTab, cloudHubSubTab, setCloudHubSubTab, phrsMapsSubTab, setPhrsMapsSubTab, bigQuerySubTab, setBigQuerySubTab, phrsDbSubTab, setPhrsDbSubTab, cloudRunJobs, setCloudRunJobs, isCreatingJob, setIsCreatingJob, newJobName, setNewJobName, newJobSchedule, setNewJobSchedule, workerPools, setWorkerPools, isCreatingPool, setIsCreatingPool, newPoolName, setNewPoolName, domainMappings, setDomainMappings, selectedDomain, setSelectedDomain, domainFilterQuery, setDomainFilterQuery, isCreatingDomain, setIsCreatingDomain, newDomainName, setNewDomainName, newDomainService, setNewDomainService, newDomainType, setNewDomainType, isFleetBannerVisible, setIsFleetBannerVisible, isFleetBannerExpanded, setIsFleetBannerExpanded, dbProductFilter, setDbProductFilter, dbLocationFilter, setDbLocationFilter, isProductFilterOpen, setIsProductFilterOpen, isLocationFilterOpen, setIsLocationFilterOpen, phrsUsers, setPhrsUsers, newAuthEmail, setNewAuthEmail, newAuthPassword, setNewAuthPassword, firestoreCollections, setFirestoreCollections, selectedCollection, setSelectedCollection, selectedDocId, setSelectedDocId, isCreatingCollection, setIsCreatingCollection, newCollectionName, setNewCollectionName, isCreatingDoc, setIsCreatingDoc, newDocId, setNewDocId, phrsStorageFiles, setPhrsStorageFiles, isDraggingFile, setIsDraggingFile, deepScanTimer, setDeepScanTimer, isAtomicScanning, setIsAtomicScanning, atomicLogs, setAtomicLogs, homeSubTab, setHomeSubTab, isWelcomeBoardOpen, setIsWelcomeBoardOpen, homeToast, setHomeToast, agentSearchQuery, setAgentSearchQuery, dashboardAgentChatHistory, setDashboardAgentChatHistory, isAgentPanelOpen, setIsAgentPanelOpen, isAgentThinking, setIsAgentThinking, agentModuleMode, setAgentModuleMode, agentImagePrompt, setAgentImagePrompt, agentCodeLanguage, setAgentCodeLanguage, handleTerminalSubmit, handleNetworkChange, handleAgentSubmit, handlePhotoGeneratorClick, handleCodeGeneratorClick, handleCreateProject, handleUpdateRawDb, handleAddDbNode, handleDeleteDbNode, handleSyncDatabase, handleStartDeployment, handleCreateShortLink, handleSendTestSms, handleVerifyOtp, handleSectionClick, handleSubMenuClick } = state;
  const { Cloud, Copy, Download, FileCode, Settings, Smartphone, TerminalIcon, GitBranch, RefreshCw, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp, Info, AlertTriangle, ExternalLink } = LucideIcons;
  const logTerminalRef = React.useRef<HTMLDivElement>(null);

  // --- GITHUB AUTO-DEPLOY WEBHOOK UI STATE ---
  const [gitLogs, setGitLogs] = React.useState<any[]>([]);
  const [isLoadingGitLogs, setIsLoadingGitLogs] = React.useState(true);
  const [isPulling, setIsPulling] = React.useState(false);
  const [expandedLogIdx, setExpandedLogIdx] = React.useState<number | null>(null);
  const [copySuccess, setCopySuccess] = React.useState(false);
  const [pullStatus, setPullStatus] = React.useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const fetchGitLogs = async () => {
    try {
      const res = await fetch('/api/admin/github/deploy-logs');
      if (res.ok) {
        const data = await res.json();
        setGitLogs(data.logs || []);
      }
    } catch (err) {
      console.error("Error fetching git deploy logs:", err);
    } finally {
      setIsLoadingGitLogs(false);
    }
  };

  React.useEffect(() => {
    if (selectedSubMenu === 'Webhooks') {
      fetchGitLogs();
      const interval = setInterval(fetchGitLogs, 4000);
      return () => clearInterval(interval);
    }
  }, [selectedSubMenu]);

  const handleManualPull = async () => {
    setIsPulling(true);
    setPullStatus({ type: null, message: '' });
    try {
      const res = await fetch('/api/admin/github/manual-pull', { method: 'POST' });
      const data = await res.json();
      fetchGitLogs();
      if (res.ok) {
        setPullStatus({ type: 'success', message: 'Git pull విజయవంతంగా పూర్తయింది! (Git pull completed successfully!)' });
      } else {
        setPullStatus({ type: 'error', message: `Git pull ఫెయిల్ అయింది: ${data.error || data.message}` });
      }
    } catch (err: any) {
      setPullStatus({ type: 'error', message: `కనెక్షన్ లోపం: ${err.message}` });
    } finally {
      setIsPulling(false);
    }
  };

  const copyToClipboard = () => {
    const payloadUrl = `${currentGateway}/api/admin/github/webhook-deploy`;
    navigator.clipboard.writeText(payloadUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

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
              {selectedSubMenu === 'Webhooks' ? (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100">
                        <GitBranch className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">GitHub Auto-Deploy Webhook</h2>
                        <p className="text-sm text-slate-500 font-medium font-sans">
                          గిట్‌హబ్ పుష్ ఈవెంట్స్ ద్వారా ఆటోమేటిక్ డిప్లాయ్‌మెంట్ లేదా మాన్యువల్ కోడ్ అప్‌డేట్ చేసుకోండి.
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleManualPull}
                      disabled={isPulling}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 transition-all shadow-md active:scale-95 duration-200 ${
                        isPulling 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-100'
                      }`}
                    >
                      <RefreshCw className={`w-4 h-4 ${isPulling ? 'animate-spin' : ''}`} />
                      {isPulling ? 'Executing Pull...' : 'Force Git Pull (ఫోర్స్ గిట్ పుల్)'}
                    </button>
                  </div>

                  {pullStatus.message && (
                    <div className={`p-4 rounded-xl flex items-start gap-3 border ${
                      pullStatus.type === 'success' 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}>
                      {pullStatus.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider mb-1">
                          {pullStatus.type === 'success' ? 'Pull Success (విజయం)' : 'Pull Failed (లోపం)'}
                        </h4>
                        <p className="text-xs font-medium leading-relaxed">{pullStatus.message}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Webhook Setup info */}
                    <div className="lg:col-span-5 space-y-6">
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
                        <div className="flex items-center gap-2">
                          <Settings className="w-5 h-5 text-indigo-600" />
                          <h3 className="text-sm font-black text-slate-800 tracking-wider uppercase">Webhook configuration</h3>
                        </div>

                        <div className="space-y-4 text-xs">
                          <div>
                            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2 font-mono">
                              PAYLOAD URL (గిట్‌హబ్ పేలోడ్ URL)
                            </label>
                            <div className="flex gap-2 items-center">
                              <input
                                type="text"
                                readOnly
                                value={`${currentGateway}/api/admin/github/webhook-deploy`}
                                className="flex-1 bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                              />
                              <button
                                onClick={copyToClipboard}
                                className={`p-2.5 rounded-lg border flex items-center justify-center transition-all ${
                                  copySuccess 
                                    ? 'bg-emerald-500 text-white border-emerald-500' 
                                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                                }`}
                                title="Copy Payload URL"
                              >
                                {copySuccess ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-800">
                              <Info className="w-3.5 h-3.5" />
                              <span>సురక్షిత రక్షణ (Secret Verification)</span>
                            </div>
                            <p className="text-[10px] text-indigo-700/80 leading-relaxed font-medium">
                              Webhook సెక్యూరిటీ కోసం Content type ని తప్పనిసరిగా <code className="bg-indigo-100/80 px-1 py-0.5 rounded font-mono font-bold text-[10px]">application/json</code> కి సెట్ చేయండి.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Setup Instructions Accordion */}
                      <div className="border border-slate-200 rounded-2xl p-6 space-y-4">
                        <h3 className="text-xs font-black text-slate-800 tracking-wider uppercase flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-indigo-600" />
                          <span>గిట్‌హబ్ సెటప్ సూచనలు (Setup Guide)</span>
                        </h3>
                        
                        <div className="space-y-4 text-xs font-sans text-slate-600">
                          <div className="flex gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">1</span>
                            <p className="leading-relaxed">
                              మీ <strong>GitHub Repo</strong> ని ఓపెన్ చేసి, ఎగువన ఉన్న <strong>Settings</strong> ట్యాబ్‌కు వెళ్ళండి.
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">2</span>
                            <p className="leading-relaxed">
                              ఎడమ చేతి మెనూ నుండి <strong>Webhooks</strong> క్లిక్ చేసి, కుడి వైపున ఉన్న <strong>Add webhook</strong> బటన్ ప్రెస్ చేయండి.
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">3</span>
                            <p className="leading-relaxed">
                              పైన పేర్కొన్న <strong>Payload URL</strong> ను కాపీ చేసి అక్కడ పేస్ట్ చేయండి.
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">4</span>
                            <p className="leading-relaxed">
                              Content type ని <strong>application/json</strong> గా సెలెక్ట్ చేసి, <strong>Just the push event</strong> ఎంచుకుని <strong>Add webhook</strong> క్లిక్ చేయండి.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Deployment logs */}
                    <div className="lg:col-span-7 flex flex-col h-[520px] border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-slate-50/50">
                      <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TerminalIcon className="w-4 h-4 text-indigo-600" />
                          <h3 className="text-xs font-black text-slate-800 tracking-wider uppercase font-mono">Live Deploy Logs</h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 font-sans">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>రియల్ టైమ్ సింక్ ఆన్</span>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {isLoadingGitLogs ? (
                          <div className="h-full flex items-center justify-center flex-col gap-2">
                            <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin" />
                            <span className="text-[11px] font-bold text-slate-400 font-sans tracking-wide">లాగ్స్ లోడ్ అవుతున్నాయి...</span>
                          </div>
                        ) : gitLogs.length === 0 ? (
                          <div className="h-full flex items-center justify-center flex-col text-slate-400 gap-2">
                            <Info className="w-8 h-8 text-slate-300" />
                            <span className="text-xs font-bold font-sans">ఎటువంటి డిప్లాయ్‌మెంట్ లాగ్స్ లేవు.</span>
                          </div>
                        ) : (
                          gitLogs.map((log, index) => {
                            const isExpanded = expandedLogIdx === index;
                            return (
                              <div 
                                key={index} 
                                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                              >
                                <div 
                                  onClick={() => setExpandedLogIdx(isExpanded ? null : index)}
                                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors"
                                >
                                  <div className="space-y-1.5">
                                    <div className="flex items-center gap-2.5">
                                      <span className={`w-2 h-2 rounded-full ${
                                        log.status === 'success' ? 'bg-emerald-500' :
                                        log.status === 'failed' ? 'bg-rose-500' : 'bg-blue-500 animate-pulse'
                                      }`} />
                                      <span className="text-xs font-black text-slate-800 font-sans">{log.trigger}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 font-mono">
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {new Date(log.timestamp).toLocaleTimeString()}
                                      </span>
                                      <span>|</span>
                                      <span className={
                                        log.status === 'success' ? 'text-emerald-600' :
                                        log.status === 'failed' ? 'text-rose-600' : 'text-blue-600'
                                      }>
                                        {log.status.toUpperCase()}
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    {isExpanded ? (
                                      <ChevronUp className="w-4 h-4 text-slate-400" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-slate-400" />
                                    )}
                                  </div>
                                </div>

                                {isExpanded && (
                                  <div className="border-t border-slate-100 p-4 bg-slate-950 font-mono text-[11px] leading-relaxed select-text text-slate-300">
                                    <div className="mb-2 text-indigo-400 border-b border-slate-900 pb-1.5 flex items-center justify-between">
                                      <span>SYSTEM PROCESS TERMINAL OUTPUT</span>
                                      <span className="text-[10px] text-slate-500 font-sans">
                                        {new Date(log.timestamp).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[11px] text-emerald-400 bg-black/40 p-3 rounded-lg border border-slate-900 shadow-inner h-[180px] overflow-y-auto">
                                      {log.output || "No output captured."}
                                      {log.error && (
                                        <span className="text-rose-400 block mt-2 pt-2 border-t border-rose-900/40">
                                          [PROCESS ERROR]: {log.error}
                                        </span>
                                      )}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                        <TerminalIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">PHRS Cloud Console</h2>
                        <p className="text-sm text-slate-500 font-medium font-sans">
                          {isAdminAuthorized 
                            ? "మీ సర్వర్ కోసం 4 రకాల కోడింగ్ బోర్డులు ఇక్కడ ఉన్నాయి (అడ్మిన్ యాక్సెస్ యాక్టివ్)" 
                            : "మీ సర్వర్ కోసం 3 రకాల కోడింగ్ బోర్డులు ఇక్కడ ఉన్నాయి"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Symmetrical Integration Code Boards Grid */}
                  <div className={`grid grid-cols-1 md:grid-cols-2 ${isAdminAuthorized ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>                
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

                {/* Board 4: PHRS CROWD ADMIN PWA SDK (Admin Only) */}
                {isAdminAuthorized && (
                  <div className="bg-white rounded-2xl border border-indigo-200 p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 ring-2 ring-indigo-500/10 animate-fade-in">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-indigo-50 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <Smartphone className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-black text-indigo-600 tracking-wider">PHRS CROWD ADMIN PWA SDK</div>
                            <div className="text-[11px] font-bold text-slate-700 font-mono">phrs-pwa-service.js</div>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 text-[9px] bg-indigo-100 text-indigo-700 rounded-md font-bold uppercase font-sans">అడ్మిన్ PWA వర్షన్</span>
                      </div>
                      
                      <p className="text-[10px] text-slate-500 leading-relaxed font-sans h-8">
                        ఆఫ్-లైన్ డేటా సింక్, సర్వీస్ వర్కర్ రిజిస్ట్రేషన్ మరియు ఇన్-యాప్ ఇన్స్టాలేషన్ గేట్వే (అడ్మిన్ కంట్రోల్స్ మాత్రమే).
                      </p>
                      <div className="relative group">
                        <pre className="w-full bg-slate-950 text-indigo-300 p-4 rounded-xl text-[11px] font-mono overflow-y-auto h-[260px] leading-relaxed border border-slate-900 shadow-inner whitespace-pre-wrap select-all">{`// PHRS Crowd Admin PWA Service Worker Registration
const PWA_SW_URL = "/sw.js";

export const PHRSPWA = {
  // Register Service Worker for Offline Resilience
  async register() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(PWA_SW_URL, {
          scope: '/'
        });
        console.log("PHRS PWA Service Worker Registered:", registration);
        return { success: true, registration };
      } catch (err) {
        console.error("PHRS PWA Registration Failed:", err);
        return { success: false, error: err.message };
      }
    }
    return { success: false, error: "PWA not supported in this browser" };
  },

  // Trigger Native App Installation Prompt
  setupInstallPrompt(callback) {
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      callback(true, async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log("User Choice Outcome:", outcome);
          deferredPrompt = null;
        }
      });
    });
  }
};`}
                        </pre>
                        <button 
                          className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg shadow transition-colors"
                          onClick={() => {
                            const c = `// PHRS Crowd Admin PWA Service Worker Registration\nconst PWA_SW_URL = "/sw.js";\n\nexport const PHRSPWA = {\n  // Register Service Worker for Offline Resilience\n  async register() {\n    if ('serviceWorker' in navigator) {\n      try {\n        const registration = await navigator.serviceWorker.register(PWA_SW_URL, {\n          scope: '/'\n        });\n        console.log("PHRS PWA Service Worker Registered:", registration);\n        return { success: true, registration };\n      } catch (err) {\n        console.error("PHRS PWA Registration Failed:", err);\n        return { success: false, error: err.message };\n      }\n    }\n    return { success: false, error: "PWA not supported in this browser" };\n  },\n\n  // Trigger Native App Installation Prompt\n  setupInstallPrompt(callback) {\n    let deferredPrompt;\n    window.addEventListener('beforeinstallprompt', (e) => {\n      e.preventDefault();\n      deferredPrompt = e;\n      callback(true, async () => {\n        if (deferredPrompt) {\n          deferredPrompt.prompt();\n          const { outcome } = await deferredPrompt.userChoice;\n          console.log("User Choice Outcome:", outcome);\n          deferredPrompt = null;\n        }\n      });\n    });\n  }\n};`;
                            navigator.clipboard.writeText(c);
                          }}
                          title="Copy Admin PWA Script"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col items-center">
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 mb-3 w-32 h-32 flex items-center justify-center overflow-hidden">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                            `import { PHRSPWA } from "phrs-pwa-service"; PHRSPWA.register();`
                          )}`} 
                          alt="PHRS CROWD PWA QR" 
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 font-sans tracking-wide">ADMIN PWA QR</span>
                    </div>
                  </div>
                )}
              </div>
              </>
              )}
            </div>
          </div>
        </>

  );
}
