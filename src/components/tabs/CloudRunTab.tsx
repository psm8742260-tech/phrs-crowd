import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

export default function CloudRunTab({ state }: { state: any }) {
  const [uploadMode, setUploadMode] = useState<'code' | 'zip' | 'github'>('code');
  const [localZipFile, setLocalZipFile] = useState<File | null>(null);
  const [deployStatus, setDeployStatus] = useState('');
  
  const [realDomainMappings, setRealDomainMappings] = useState<Record<string, string>>({});
  const [isMappingLoading, setIsMappingLoading] = useState(false);
  const [orchestratorNodes, setOrchestratorNodes] = useState<any[]>([]);
  const [serviceSearch, setServiceSearch] = useState('');
  const [hostingStats, setHostingStats] = useState<Record<string, any>>({});
  const [selectedProjectDetail, setSelectedProjectDetail] = useState<any | null>(null);
  const [selectedDetailTab, setSelectedDetailTab] = useState('Observability');
  const [showDnsModal, setShowDnsModal] = useState<any | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStats = () => {
      fetch('/api/hosting/storage-stats')
        .then(res => res.json())
        .then(data => setHostingStats(data || {}))
        .catch(err => console.warn("Storage stats load skipped", err));
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [activeMenuIdx, setActiveMenuIdx] = useState<number | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registerSubdomain, setRegisterSubdomain] = useState('');
  const [registerTechStack, setRegisterTechStack] = useState('React/Vite');

  useEffect(() => {
    fetch('/api/deployments')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && state.setDeployments) {
          state.setDeployments(data);
        }
      })
      .catch(console.error);

    fetch('/api/domain-mappings')
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        const ct = res.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return res.json();
      })
      .then(data => setRealDomainMappings(data || {}))
      .catch(console.error);
      
    fetch('/api/orchestrator/nodes')
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        const ct = res.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return res.json();
      })
      .then(data => setOrchestratorNodes(data || []))
      .catch(console.error);
  }, [state.cloudRunSubTab]);

  const { isAutoInternetEnabled, setIsAutoInternetEnabled, isDarkMode, setIsDarkMode, isAuthenticated, setIsAuthenticated, loginView, setLoginView, appIconUrl, setAppIconUrl, pkgName, setPkgName, shaFingerprint, setShaFingerprint, activeTab, setActiveTab, snippetFormat, setSnippetFormat, projects, setProjects, selectedProjectId, setSelectedProjectId, newProjName, setNewProjName, showNewProjModal, setShowNewProjModal, showUpiModal, setShowUpiModal, searchQuery, setSearchQuery, notifications, setNotifications, showNotifications, setShowNotifications, metrics, setMetrics, cpuHistory, setCpuHistory, vpsLogStream, setVpsLogStream, isMiniServerRunning, setIsMiniServerRunning, miniServerPort, setMiniServerPort, miniServerIp, setMiniServerIp, terminalHistory, setTerminalHistory, terminalInput, setTerminalInput, stealthDataBalanceMb, setStealthDataBalanceMb, stealthSmsCredits, setStealthSmsCredits, stealthWalletRupees, setStealthWalletRupees, showStandaloneBanner, setShowStandaloneBanner, localServerIpInput, setLocalServerIpInput, dbData, setDbData, dbRawText, setDbRawText, isRawDbView, setIsRawDbView, dbSuccessMessage, setDbSuccessMessage, isSyncingDb, setIsSyncingDb, dbKeyPath, setDbKeyPath, dbNewVal, setDbNewVal, deployments, setDeployments, githubUrl, setGithubUrl, appName, setAppName, appPort, setAppPort, appTech, setAppTech, buildLogs, setBuildLogs, isBuilding, setIsBuilding, buildProgress, setBuildProgress, activeVirtualApp, setActiveVirtualApp, simulatedVisitorCount, setSimulatedVisitorCount, smartRouteModal, setSmartRouteModal, shortLinks, setShortLinks, linkSlug, setLinkSlug, linkTarget, setLinkTarget, hostFileName, setHostFileName, hostContent, setHostContent, deployedUrl, setDeployedUrl, isDeploying, setIsDeploying, hostedHtml, setHostedHtml, smsGateway, setSmsGateway, smsApiKey, setSmsApiKey, smsAccountSid, setSmsAccountSid, smsSenderId, setSmsSenderId, smsTemplate, setSmsTemplate, testPhoneNumber, setTestPhoneNumber, isSendingOtp, setIsSendingOtp, lastGeneratedOtp, setLastGeneratedOtp, verificationInput, setVerificationInput, verificationStatus, setVerificationStatus, virtualPhoneNotification, setVirtualPhoneNotification, phoneScreenOn, setPhoneScreenOn, apiKeys, setApiKeys, isRoutingActive, setIsRoutingActive, routingHistory, setRoutingHistory, activeRouterPrompt, setActiveRouterPrompt, activeRouterModel, setActiveRouterModel, isRoutingLoading, setIsRoutingLoading, activeExportFile, setActiveExportFile, billingBudget, setBillingBudget, billingAlertAmount, setBillingAlertAmount, billingAlertEmail, setBillingAlertEmail, billingSubTab, setBillingSubTab, envTranslationMappings, setEnvTranslationMappings, secretManagerSubTab, setSecretManagerSubTab, iamMembers, setIamMembers, newMemberEmail, setNewMemberEmail, newMemberRole, setNewMemberRole, selectedMarketplaceApp, setSelectedMarketplaceApp, customSystemPrompt, setCustomSystemPrompt, agentChatInput, setAgentChatInput, agentChatHistory, setAgentChatHistory, k8sPods, setK8sPods, buckets, setBuckets, newBucketName, setNewBucketName, storageFiles, setStorageFiles, uploadFileName, setUploadFileName, uploadTargetBucket, setUploadTargetBucket, isUploading, setIsUploading, firewallPolicy, setFirewallPolicy, sslStatus, setSslStatus, generatedKeyPair, setGeneratedKeyPair, bqQuery, setBqQuery, bqResults, setBqResults, bqRunning, setBqRunning, monitorUptime, setMonitorUptime, activeAlerts, setActiveAlerts, isHybridDevMode, setIsHybridDevMode, isAiServerBypassed, setIsAiServerBypassed, remoteNodeIp, setRemoteNodeIp, deviceSerial, setDeviceSerial, deepseekApiKey, setDeepseekApiKey, showAdminPortal, setShowAdminPortal, isAdminGmailVerified, setIsAdminGmailVerified, adminGmail, setAdminGmail, isVerifyingGmail, setIsVerifyingGmail, uploadedZipName, setUploadedZipName, zipFile, setZipFile, isUploadingZip, setIsUploadingZip, zipUploadProgress, setZipUploadProgress, isCompiling, setIsCompiling, compilationProgress, setCompilationProgress, compilationLogs, setCompilationLogs, tempRemoteNodeIp, setTempRemoteNodeIp, tempDeviceSerial, setTempDeviceSerial, tempDeepseekApiKey, setTempDeepseekApiKey, cloudRunImage, setCloudRunImage, cloudRunEnvVars, setCloudRunEnvVars, revisionTraffic, setRevisionTraffic, subnets, setSubnets, firewallRules, setFirewallRules, newSubnetName, setNewSubnetName, newSubnetRange, setNewSubnetRange, newFireRuleName, setNewFireRuleName, newFireRulePort, setNewFireRulePort, newFireRuleRange, setNewFireRuleRange, newFireRuleAction, setNewFireRuleAction, vpcSubTab, setVpcSubTab, ipInventory, setIpInventory, deviceCarrierIp, setDeviceCarrierIp, networkLatency, setNetworkLatency, mobileIp, setMobileIp, isBridgeActive, setIsBridgeActive, isAdminAuthorized, setIsAdminAuthorized, adminPasswordInput, setAdminPasswordInput, showAuthModal, setShowAuthModal, modificationCount, setModificationCount, showSystemRules, setShowSystemRules, ruleCountdown, setRuleCountdown, protocolStep, setProtocolStep, sqlTables, setSqlTables, newTableName, setNewTableName, newTableCols, setNewTableCols, sqlBackups, setSqlBackups, mapsApiKey, setMapsApiKey, mapsSelectedEndpoint, setMapsSelectedEndpoint, mapsActiveTrackingId, setMapsActiveTrackingId, isSidebarOpen, setIsSidebarOpen, expandedSection, setExpandedSection, selectedSubMenu, setSelectedSubMenu, agents, setAgents, selectedAgentId, setSelectedAgentId, newAgentName, setNewAgentName, newAgentModel, setNewAgentModel, newAgentPrompt, setNewAgentPrompt, agentPlatformSubTab, setAgentPlatformSubTab, securitySubTab, setSecuritySubTab, cloudStorageSubTab, setCloudStorageSubTab, monitoringSubTab, setMonitoringSubTab, iamSubTab, setIamSubTab, apisSubTab, setApisSubTab, cloudRunSubTab, setCloudRunSubTab, cloudHubSubTab, setCloudHubSubTab, phrsMapsSubTab, setPhrsMapsSubTab, bigQuerySubTab, setBigQuerySubTab, phrsDbSubTab, setPhrsDbSubTab, cloudRunJobs, setCloudRunJobs, isCreatingJob, setIsCreatingJob, newJobName, setNewJobName, newJobSchedule, setNewJobSchedule, workerPools, setWorkerPools, isCreatingPool, setIsCreatingPool, newPoolName, setNewPoolName, domainMappings, setDomainMappings, selectedDomain, setSelectedDomain, domainFilterQuery, setDomainFilterQuery, isCreatingDomain, setIsCreatingDomain, newDomainName, setNewDomainName, newDomainService, setNewDomainService, newDomainType, setNewDomainType, isFleetBannerVisible, setIsFleetBannerVisible, isFleetBannerExpanded, setIsFleetBannerExpanded, dbProductFilter, setDbProductFilter, dbLocationFilter, setDbLocationFilter, isProductFilterOpen, setIsProductFilterOpen, isLocationFilterOpen, setIsLocationFilterOpen, phrsUsers, setPhrsUsers, newAuthEmail, setNewAuthEmail, newAuthPassword, setNewAuthPassword, firestoreCollections, setFirestoreCollections, selectedCollection, setSelectedCollection, selectedDocId, setSelectedDocId, isCreatingCollection, setIsCreatingCollection, newCollectionName, setNewCollectionName, isCreatingDoc, setIsCreatingDoc, newDocId, setNewDocId, phrsStorageFiles, setPhrsStorageFiles, isDraggingFile, setIsDraggingFile, deepScanTimer, setDeepScanTimer, isAtomicScanning, setIsAtomicScanning, atomicLogs, setAtomicLogs, homeSubTab, setHomeSubTab, isWelcomeBoardOpen, setIsWelcomeBoardOpen, homeToast, setHomeToast, agentSearchQuery, setAgentSearchQuery, dashboardAgentChatHistory, setDashboardAgentChatHistory, isAgentPanelOpen, setIsAgentPanelOpen, isAgentThinking, setIsAgentThinking, agentModuleMode, setAgentModuleMode, agentImagePrompt, setAgentImagePrompt, agentCodeLanguage, setAgentCodeLanguage, handleTerminalSubmit, handleNetworkChange, handleAgentSubmit, handlePhotoGeneratorClick, handleCodeGeneratorClick, handleCreateProject, handleUpdateRawDb, handleAddDbNode, handleDeleteDbNode, handleSyncDatabase, handleStartDeployment, handleCreateShortLink, handleSendTestSms, handleVerifyOtp, handleSectionClick, handleSubMenuClick } = state;
  const { Check, ExternalLink, Filter, MoreVertical, Play, Sliders, Trash2, Upload, Globe, RefreshCw, FileCode, Archive } = LucideIcons;
  return (
        <>
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Play className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">Cloud Run Serverless Containers</h2>
                    <p className="text-xs text-slate-500 max-w-2xl mt-1">
                      Host isolated, auto-scaling dockerized Node instances that run custom backend configurations on local port mappings.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-4 border-b border-slate-100">
                {['Overview', 'Services', 'Crowd Hosting', 'Jobs', 'Worker pools', 'Domain mappings'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setCloudRunSubTab(tab)}
                    className={`px-4 py-2 rounded-t-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      cloudRunSubTab === tab
                        ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                        : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {cloudRunSubTab === 'Overview' && !selectedProjectDetail && (
              <div className="space-y-6 animate-fade-in -mt-6">
                {/* Header mimicking Google Cloud Run */}
                <div className="flex justify-between items-center bg-white p-4 border-b border-slate-200">
                  <h2 className="text-[18px] text-slate-800 font-normal">Overview</h2>
                  <button 
                    onClick={() => {
                      setHomeToast('Refreshing data...');
                      setTimeout(() => setHomeToast(null), 2000);
                    }}
                    className="flex items-center gap-2 text-sm text-[#1a73e8] font-medium hover:bg-blue-50 px-3 py-1.5 rounded transition"
                  >
                    <LucideIcons.RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>

                <div className="px-6 space-y-6">
                  {/* Most used resources */}
                  <div className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-slate-200 flex items-center gap-2">
                      <h3 className="text-[15px] font-normal text-slate-900">Most used resources</h3>
                      <LucideIcons.HelpCircle className="w-4 h-4 text-slate-400" />
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-600 font-medium">
                            <th className="py-2.5 px-4 font-medium w-8"></th>
                            <th className="py-2.5 px-4 font-medium">Name</th>
                            <th className="py-2.5 px-4 font-medium">Region</th>
                            <th className="py-2.5 px-4 font-medium">DNA Report (DNS/SSL)</th>
                            <th className="py-2.5 px-4 font-medium">Type</th>
                            <th className="py-2.5 px-4 font-medium">Last updated</th>
                            <th className="py-2.5 px-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-800">
                          {(() => {
                            const combined = [...deployments, ...orchestratorNodes, ...projects];
                            const displayNodes = combined.filter((node, index, self) => 
                              index === self.findIndex((t) => t.name === node.name || t.id === node.id)
                            );
                            
                            return displayNodes.map((node: any, idx: number) => (
                              <tr 
                                key={idx} 
                                className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                                onClick={() => setSelectedProjectDetail(node)}
                              >
                                <td className="py-3 px-4">
                                  <LucideIcons.CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100" />
                                </td>
                                <td className="py-3 px-4 text-[#1a73e8] font-medium hover:underline whitespace-nowrap">
                                  {node.name}
                                  {hostingStats[node.name] && (
                                    <div className="text-[10px] text-slate-500 font-normal">
                                      Storage: {hostingStats[node.name].storage_mb} MB | Backup: {hostingStats[node.name].has_backup ? `${hostingStats[node.name].backup_mb} MB` : 'None'}
                                    </div>
                                  )}
                                </td>
                                <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{node.region || 'asia-southeast1'}</td>
                                <td className="py-3 px-4">
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 w-fit">
                                      <LucideIcons.Globe className="w-3 h-3 text-indigo-500" />
                                      {hostingStats[node.name]?.dna?.domain || `${node.name}.phrs.io`}
                                    </div>
                                    <div className={`flex items-center gap-1.5 text-[10px] font-medium ${hostingStats[node.name]?.dna?.status === 'SECURED' ? 'text-emerald-600' : 'text-orange-500'}`}>
                                      {hostingStats[node.name]?.dna?.status === 'SECURED' ? (
                                        <>
                                          <LucideIcons.ShieldCheck className="w-3 h-3" />
                                          SSL SECURED (A+)
                                        </>
                                      ) : (
                                        <>
                                          <LucideIcons.AlertCircle className="w-3 h-3" />
                                          DNS PENDING
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-slate-600">{node.type || 'Service'}</td>
                                <td className="py-3 px-4 text-slate-500 text-xs">{node.time || (node.lastSeen ? 'Just now' : '3 days ago')}</td>
                                <td className="py-3 px-4">
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveVirtualApp(node.name);
                                      setCloudRunSubTab('Services');
                                    }}
                                    className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-indigo-600"
                                    title="Settings & Config"
                                  >
                                    <LucideIcons.Settings className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>

                    <div className="p-4 border-t border-slate-200">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-6 text-sm">
                          <button className="text-[#1a73e8] border-b-2 border-[#1a73e8] pb-2 font-medium">Scaling</button>
                          <button className="text-slate-500 pb-2 hover:text-slate-700">Errors</button>
                          <button className="text-slate-500 pb-2 hover:text-slate-700">Billing</button>
                        </div>
                        <select className="text-sm border-none bg-transparent text-slate-700 outline-none cursor-pointer">
                          <option>7 days</option>
                          <option>14 days</option>
                          <option>30 days</option>
                        </select>
                      </div>
                      
                      {/* Real-time Dynamic Graph based on actual CPU History */}
                      <div className="h-40 w-full flex items-end gap-1 relative pt-4 pb-6 border-b border-l border-slate-300 px-2">
                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-slate-400 -ml-4 py-6">
                          <span>100</span>
                          <span>50</span>
                          <span>0</span>
                        </div>
                        {cpuHistory && cpuHistory.length > 0 ? (
                          cpuHistory.slice(-40).map((val: number, i: number) => (
                            <div key={i} className="flex-1 flex items-end h-full gap-0.5">
                              <div 
                                className="w-full bg-[#1a73e8]/80 transition-all duration-500" 
                                style={{ height: `${val}%` }}
                                title={`CPU: ${val}%`}
                              ></div>
                              <div 
                                className="w-full bg-emerald-500/80 transition-all duration-500" 
                                style={{ height: `${Math.min(val * 0.4, 30)}%` }}
                              ></div>
                            </div>
                          ))
                        ) : (
                          Array.from({length: 40}).map((_, i) => (
                            <div key={i} className="flex-1 flex items-end h-full gap-0.5 opacity-20">
                              <div className="w-full bg-slate-300" style={{ height: '5%' }}></div>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1 pl-2">
                        <span>REAL-TIME</span>
                        <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6 text-[12px] text-slate-700 px-2 pb-2">
                        {deployments.slice(0, 6).map((d: any, index: number) => {
                          const colors = ['bg-[#1a73e8]', 'bg-emerald-500', 'bg-purple-500', 'bg-cyan-500', 'bg-orange-500', 'bg-pink-500'];
                          const colorClass = colors[index % colors.length];
                          const cpuVal = index === 0 
                            ? (metrics?.cpu || 0.86) 
                            : index === 1 
                              ? Math.max(0.1, (metrics?.cpu || 0.5) * 0.4).toFixed(2) 
                              : Number((Math.random() * 0.5 + 0.1).toFixed(2));
                          return (
                            <div key={d.id || index} className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${colorClass}`}></span> 
                              {d.name || d.id}: {cpuVal}
                            </div>
                          );
                        })}
                        {deployments.length === 0 && (
                          <div className="text-xs text-slate-400 italic col-span-2 text-center py-2">No active registrations</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Deploy a web service */}
                  <div>
                    <h3 className="text-[15px] font-normal text-slate-900 mb-1">Deploy a web service</h3>
                    <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
                      Deploy a website or API. <a href="#" className="text-[#1a73e8] hover:underline flex items-center gap-1">Learn more <LucideIcons.ExternalLink className="w-3 h-3" /></a>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      <button 
                        onClick={() => { setCloudRunSubTab('Crowd Hosting'); setShowNewProjModal(true); }}
                        className="flex flex-col items-center justify-center gap-3 p-6 border border-slate-200 rounded-lg bg-white hover:border-[#1a73e8] hover:shadow-sm transition group"
                      >
                        <LucideIcons.GitBranch className="w-8 h-8 text-slate-700 group-hover:text-[#1a73e8]" />
                        <span className="text-sm font-medium text-slate-700 group-hover:text-[#1a73e8]">Connect<br/>repository</span>
                      </button>
                      <button 
                        onClick={() => { setCloudRunSubTab('Crowd Hosting'); setShowNewProjModal(true); }}
                        className="flex flex-col items-center justify-center gap-3 p-6 border border-slate-200 rounded-lg bg-white hover:border-[#1a73e8] hover:shadow-sm transition group"
                      >
                        <LucideIcons.Box className="w-8 h-8 text-slate-700 group-hover:text-[#1a73e8]" />
                        <span className="text-sm font-medium text-slate-700 group-hover:text-[#1a73e8]">Deploy<br/>container</span>
                      </button>
                    </div>
                  </div>

                  {/* Create a batch job */}
                  <div>
                    <h3 className="text-[15px] font-normal text-slate-900 mb-1">Create a batch job or a background worker pool</h3>
                    <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
                      Run scripts, cron jobs, or parallelized data processing workloads. <a href="#" className="text-[#1a73e8] hover:underline flex items-center gap-1">Learn more <LucideIcons.ExternalLink className="w-3 h-3" /></a>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      <button 
                        onClick={() => { setCloudRunSubTab('Jobs'); setIsCreatingJob(true); }}
                        className="flex flex-col items-center justify-center gap-3 p-6 border border-slate-200 rounded-lg bg-white hover:border-[#1a73e8] hover:shadow-sm transition group"
                      >
                        <LucideIcons.List className="w-8 h-8 text-slate-700 group-hover:text-[#1a73e8]" />
                        <span className="text-sm font-medium text-slate-700 group-hover:text-[#1a73e8]">Create job</span>
                      </button>
                      <button 
                        onClick={() => { setCloudRunSubTab('Worker pools'); setIsCreatingPool(true); }}
                        className="flex flex-col items-center justify-center gap-3 p-6 border border-slate-200 rounded-lg bg-white hover:border-[#1a73e8] hover:shadow-sm transition group"
                      >
                        <LucideIcons.Settings className="w-8 h-8 text-slate-700 group-hover:text-[#1a73e8]" />
                        <span className="text-sm font-medium text-slate-700 group-hover:text-[#1a73e8]">Create<br/>worker pool</span>
                      </button>
                    </div>
                  </div>

                  {/* Write a function */}
                  <div className="pb-8">
                    <h3 className="text-[15px] font-normal text-slate-900 mb-1">Write a function</h3>
                    <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
                      Write and deploy functions or source code using your favorite language. <a href="#" className="text-[#1a73e8] hover:underline flex items-center gap-1">Learn more <LucideIcons.ExternalLink className="w-3 h-3" /></a>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {[
                        { name: 'Node.js', icon: LucideIcons.Hexagon },
                        { name: 'Python', icon: LucideIcons.Terminal },
                        { name: 'Go', icon: LucideIcons.Zap },
                        { name: 'Java', icon: LucideIcons.Coffee },
                        { name: 'PHP', icon: LucideIcons.FileCode },
                        { name: '.NET', icon: LucideIcons.Blocks },
                        { name: 'Ruby', icon: LucideIcons.Gem }
                      ].map(lang => (
                        <button 
                          key={lang.name} 
                          onClick={() => {
                            setActiveTab('agent_platform');
                            setAgentChatInput(`Create a highly robust serverless function using ${lang.name} that handles requests securely.`);
                            if (typeof state.setIsAgentPanelOpen === 'function') {
                              state.setIsAgentPanelOpen(true);
                            }
                          }}
                          className="flex flex-col items-center justify-center gap-3 p-6 border border-slate-200 rounded-lg bg-white hover:border-[#1a73e8] hover:shadow-sm transition group"
                        >
                          <lang.icon className="w-8 h-8 text-slate-700 group-hover:text-[#1a73e8]" />
                          <span className="text-sm font-medium text-slate-700 group-hover:text-[#1a73e8]">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {cloudRunSubTab === 'Overview' && selectedProjectDetail && (
              <div className="space-y-4 animate-fade-in -mt-6">
                {/* Detailed Header matching Screenshot 3 */}
                <div className="bg-white border-b border-slate-200 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <button 
                      onClick={() => setSelectedProjectDetail(null)}
                      className="p-1 hover:bg-slate-100 rounded-full text-[#1a73e8]"
                    >
                      <LucideIcons.ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                      <LucideIcons.CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                      <h2 className="text-xl text-slate-800 font-medium">{selectedProjectDetail.name}</h2>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-sm ml-8">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">URL:</span>
                      <a 
                        href={hostingStats[selectedProjectDetail.name]?.dna?.domain ? `https://${hostingStats[selectedProjectDetail.name].dna.domain}` : `https://${selectedProjectDetail.name}.phrs.io`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[#1a73e8] hover:underline"
                      >
                        {hostingStats[selectedProjectDetail.name]?.dna?.domain || `${selectedProjectDetail.name}.phrs.io`}
                      </a>
                      <LucideIcons.Copy className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-slate-600" />
                      <span className="text-slate-400 text-xs">(+3 more)</span>
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-500">Region:</span> {selectedProjectDetail.region || 'asia-southeast1'}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-6 ml-8">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded text-sm font-medium text-[#1a73e8] hover:bg-slate-50">
                      <LucideIcons.Play className="w-4 h-4" /> Test
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded text-sm font-medium text-[#1a73e8] hover:bg-slate-50">
                      <LucideIcons.RefreshCw className="w-4 h-4" /> Refresh
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-[#1a73e8] text-white rounded text-sm font-medium hover:bg-blue-600">
                      Redeploy
                    </button>
                  </div>

                  <div className="flex items-center gap-6 mt-8 overflow-x-auto">
                    {['Observability', 'Revision History', 'Networking (DNA)', 'Settings'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setSelectedDetailTab(tab)}
                        className={`pb-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                          selectedDetailTab === tab
                            ? 'text-[#1a73e8] border-[#1a73e8]'
                            : 'text-slate-500 border-transparent hover:text-slate-700'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-6 pb-12">
                  {selectedDetailTab === 'Observability' && (
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm animate-fade-in">
                      <div className="divide-y divide-slate-100">
                        {['Metrics', 'Logs', 'SLOs', 'Errors', 'Cost'].map(item => (
                          <button key={item} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 group">
                            <span className="text-[15px] text-slate-700 font-medium">{item}</span>
                            <LucideIcons.ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDetailTab === 'Networking (DNA)' && (
                    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm animate-fade-in">
                      <div className="flex items-center gap-2 mb-6">
                        <LucideIcons.Globe2 className="w-5 h-5 text-indigo-500" />
                        <h3 className="text-lg font-medium text-slate-900">DNA Record & Network DNA</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Public DNA URL</label>
                            <p className="text-sm font-mono text-[#1a73e8] mt-1">https://{hostingStats[selectedProjectDetail.name]?.dna?.domain || `${selectedProjectDetail.name}.phrs.io`}</p>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">A-Record (IP)</label>
                            <p className="text-sm font-mono text-slate-700 mt-1">{hostingStats[selectedProjectDetail.name]?.dna?.ip || '34.131.22.45'}</p>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">SSL Certificate</label>
                            <div className="flex items-center gap-2 mt-1">
                              <LucideIcons.ShieldCheck className={`w-4 h-4 ${hostingStats[selectedProjectDetail.name]?.dna?.status === 'SECURED' ? 'text-emerald-500' : 'text-orange-400'}`} />
                              <span className={`text-sm font-medium ${hostingStats[selectedProjectDetail.name]?.dna?.status === 'SECURED' ? 'text-emerald-600' : 'text-orange-500'}`}>
                                {hostingStats[selectedProjectDetail.name]?.dna?.status || 'PENDING'} (A+)
                              </span>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Propagation DNA</label>
                            <p className="text-sm text-emerald-600 font-medium mt-1">LIVE IN ASIA, EUROPE, US</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedDetailTab === 'Revision History' && (
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm animate-fade-in">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="py-3 px-4 font-medium text-slate-600">Revision</th>
                            <th className="py-3 px-4 font-medium text-slate-600">Traffic</th>
                            <th className="py-3 px-4 font-medium text-slate-600">Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="py-4 px-4 flex items-center gap-2">
                              <LucideIcons.CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span className="text-[#1a73e8] font-medium">{selectedProjectDetail.name}-0001-lql</span>
                            </td>
                            <td className="py-4 px-4 text-slate-700">100%</td>
                            <td className="py-4 px-4 text-slate-500">{selectedProjectDetail.time || '2 days ago'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {selectedDetailTab === 'Settings' && (
                    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm animate-fade-in">
                      <div className="flex items-center gap-2 mb-6">
                        <LucideIcons.Settings className="w-5 h-5 text-slate-500" />
                        <h3 className="text-lg font-medium text-slate-900">Project Settings</h3>
                      </div>
                      <div className="space-y-4">
                        <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 group">
                          <div>
                            <p className="font-medium text-slate-800">Change Project Name</p>
                            <p className="text-xs text-slate-500">Update the subdomain and live identity.</p>
                          </div>
                          <LucideIcons.ChevronRight className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 border border-red-100 bg-red-50/30 rounded-lg hover:bg-red-50 group">
                          <div>
                            <p className="font-medium text-red-600">Delete Project</p>
                            <p className="text-xs text-red-400">Irreversibly remove all files and DNS records.</p>
                          </div>
                          <LucideIcons.Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {cloudRunSubTab === 'Crowd Hosting' && (
              <div className="grid grid-cols-1 gap-6">
                <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'} shadow-sm`}>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <Globe className="w-6 h-6 text-indigo-500" />
                    <div>
                      <h3 className="font-mono font-bold text-sm tracking-wider text-slate-800 dark:text-slate-200 uppercase">PHRS Crowd Run Hosting</h3>
                      <p className="text-xs text-slate-500 font-mono mt-1">100% Automated Static & App Hosting. Drop your code, get a global live URL instantly.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <div className="space-y-4">
                      
                      <div className="flex p-1 bg-slate-100 rounded-lg">
                        <button 
                          onClick={() => setUploadMode('code')} 
                          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${uploadMode === 'code' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          Paste Code
                        </button>
                        <button 
                          onClick={() => setUploadMode('zip')} 
                          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${uploadMode === 'zip' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          Upload ZIP
                        </button>
                        <button 
                          onClick={() => setUploadMode('github')} 
                          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${uploadMode === 'github' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          GitHub Import
                        </button>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-500 mb-1 uppercase font-bold">Project Name (Subdomain)</label>
                        <input
                          type="text"
                          value={appName}
                          onChange={(e) => setAppName(e.target.value)}
                          placeholder="e.g. my-awesome-app"
                          className="w-full p-2.5 text-xs rounded-lg border font-mono bg-slate-50 border-slate-200 text-slate-900 focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                      
                      {uploadMode === 'code' ? (
                        <>
                          <div>
                            <label className="block text-[10px] font-mono text-slate-500 mb-1 uppercase font-bold">Main File Name</label>
                            <input
                              type="text"
                              value={hostFileName}
                              onChange={(e) => setHostFileName(e.target.value)}
                              placeholder="index.html"
                              className="w-full p-2.5 text-xs rounded-lg border font-mono bg-slate-50 border-slate-200 text-slate-900 focus:ring-1 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-slate-500 mb-1 uppercase font-bold">Code Content (HTML/JS/CSS)</label>
                            <textarea
                              rows={8}
                              value={hostContent}
                              onChange={(e) => setHostContent(e.target.value)}
                              placeholder="<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Hello PHRS Crowd!</h1>\n  </body>\n</html>"
                              className="w-full p-3 text-xs rounded-lg border font-mono bg-slate-900 border-slate-800 text-emerald-400 focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
                            />
                          </div>
                        </>
                      ) : uploadMode === 'zip' ? (
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 relative hover:bg-slate-100 transition-colors">
                          <input 
                            type="file" 
                            accept=".zip"
                            onChange={(e) => setLocalZipFile(e.target.files?.[0] || null)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <Archive className="w-10 h-10 text-indigo-400 mb-3" />
                          <p className="font-mono text-xs font-bold text-slate-700">
                            {localZipFile ? localZipFile.name : "Drop your project ZIP here"}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-1">Or click to browse files</p>
                          {localZipFile && <p className="text-[10px] text-emerald-600 font-bold mt-2">Ready to deploy!</p>}
                        </div>
                      ) : (
                        <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                          <div className="flex items-center gap-2 text-indigo-600 mb-1">
                            <LucideIcons.GitBranch className="w-4 h-4" />
                            <span className="text-xs font-bold font-mono">IMPORT PUBLIC GITHUB REPO</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-normal">
                            సార్వజనిక గిట్‌హబ్ రిపోజిటరీ (Public GitHub Repo) లింక్ ఇవ్వండి. మా సర్వర్ దాన్ని ఆటోమేటిక్‌గా డౌన్‌లోడ్ చేసి ఈ సబ్‌డొమైన్‌లో హోస్ట్ చేస్తుంది.
                          </p>
                          <input
                            type="text"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                            placeholder="https://github.com/phrscrowd/analytics"
                            className="w-full p-2.5 text-xs rounded-lg border font-mono bg-white border-slate-200 text-slate-900 focus:ring-1 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                      )}

                      <button
                        onClick={async () => {
                          if (!appName) {
                            setHomeToast("⚠️ Project name is required.");
                            setTimeout(() => setHomeToast(null), 3000);
                            return;
                          }

                          if (uploadMode === 'code' && !hostContent) {
                            setHomeToast("⚠️ Code content is required.");
                            setTimeout(() => setHomeToast(null), 3000);
                            return;
                          }

                          if (uploadMode === 'zip' && !localZipFile) {
                            setHomeToast("⚠️ Please select a ZIP file.");
                            setTimeout(() => setHomeToast(null), 3000);
                            return;
                          }

                          if (uploadMode === 'github' && !githubUrl) {
                            setHomeToast("⚠️ GitHub URL is required.");
                            setTimeout(() => setHomeToast(null), 3000);
                            return;
                          }

                          setIsDeploying(true);
                          setDeployStatus(uploadMode === 'github' ? 'Connecting to GitHub...' : 'Extracting project files...');
                          try {
                            let res;
                            if (uploadMode === 'zip') {
                              const formData = new FormData();
                              formData.append('name', appName);
                              formData.append('zipFile', localZipFile as Blob);
                              
                              res = await fetch('/api/deploy-zip', {
                                method: 'POST',
                                body: formData
                              });
                            } else if (uploadMode === 'github') {
                              res = await fetch('/api/deploy-github', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  name: appName,
                                  githubUrl: githubUrl
                                })
                              });
                            } else {
                              res = await fetch('/api/host/deploy', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  fileName: hostFileName || 'index.html',
                                  content: hostContent,
                                  isBase64: false
                                })
                              });
                            }
                            
                            const data = await res.json();
                            if (data.success) {
                                // Simulate dependency installation
                                if (uploadMode === 'zip' || uploadMode === 'github') {
                                    setDeployStatus(uploadMode === 'github' ? 'Pulling code from GitHub and downloading archive...' : 'Extracting project files...');
                                    await new Promise(r => setTimeout(r, 1500));
                                    setDeployStatus('Resolving dependencies (npm install)...');
                                    await new Promise(r => setTimeout(r, 1500));
                                    setDeployStatus('Starting background worker (npm start)...');
                                    await new Promise(r => setTimeout(r, 1000));
                                    setDeployStatus('Generating live public URL...');
                                    await new Promise(r => setTimeout(r, 500));
                                }

                                // The subdomain URL is the official standard link
                                const safeAppName = appName.replace(/[^a-z0-9.-]/gi, "_").toLowerCase();
                                
                                // Call Sync DNS API to ensure the domain is correctly mapped immediately
                                try {
                                  await fetch('/api/domain-mappings', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ domain: `${safeAppName}.phrscrowd.online`, project: safeAppName })
                                  });
                                } catch (e) {
                                  console.error("DNS Sync Failed:", e);
                                }
                                
                                // Retrieve the absolute freshest domain mappings to ensure instant mapping resolution
                                let latestMappings = realDomainMappings || {};
                                try {
                                  const domainMappingRes = await fetch('/api/domain-mappings');
                                  if (domainMappingRes.ok) {
                                    const loaded = await domainMappingRes.json();
                                    if (loaded) {
                                      latestMappings = loaded;
                                      setRealDomainMappings(loaded);
                                    }
                                  }
                                } catch (e) {
                                  console.error("Failed to load latest domain mappings:", e);
                                }

                                const mappedDomain = Object.keys(latestMappings).find(
                                  key => latestMappings[key] === safeAppName
                                );
                                const finalUrl = mappedDomain 
                                  ? `https://${mappedDomain}/`
                                  : `https://${safeAppName}.phrscrowd.online/`;
                                
                                setDeployedUrl(finalUrl);
                                const updatedProjects = projects.map((p: any) => p.id === selectedProjectId ? { ...p, url: finalUrl } : p);
                                setProjects(updatedProjects);
                                localStorage.setItem('phrs_projects', JSON.stringify(updatedProjects));
                                
                                // Refresh global active deployments lists
                                fetch('/api/deployments')
                                  .then(r => r.json())
                                  .then(data => {
                                    if (Array.isArray(data)) {
                                      setDeployments(data);
                                    }
                                  })
                                  .catch(console.error);

                                setHomeToast("✓ Deployed successfully to PHRS Crowd Hosting!");
                            } else {
                                setHomeToast(`⚠️ Deployment failed: ${data.error || 'Unknown error'}`);
                            }
                          } catch (err) {
                            console.error(err);
                            setHomeToast("⚠️ Error during deployment.");
                          } finally {
                            setIsDeploying(false);
                            setDeployStatus('');
                            setTimeout(() => setHomeToast(null), 3000);
                          }
                        }}
                        disabled={isDeploying}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-mono text-xs py-3 rounded-lg font-bold transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        {isDeploying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {isDeploying ? (deployStatus || 'DEPLOYING TO CLOUD...') : 'DEPLOY TO PUBLIC CLOUD'}
                      </button>
                    </div>

                    {/* Result & Live Link Section */}
                    <div className="flex flex-col">
                      <span className="block text-[10px] font-mono text-slate-500 mb-2 uppercase font-bold">Deployment Status</span>
                      
                      <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                        {deployedUrl ? (
                          <div className="space-y-4 animate-fade-in w-full">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                              <Globe className="w-8 h-8 animate-pulse" />
                            </div>
                            <h4 className="font-bold text-slate-800 text-lg">Your App is Live!</h4>
                            <p className="text-xs text-slate-500 font-mono">Accessible globally over the internet</p>
                            
                            <div className="p-3 bg-white border border-emerald-200 rounded-lg shadow-sm mt-4 break-all">
                              <a href={deployedUrl} target="_blank" rel="noreferrer" className="text-emerald-600 hover:text-emerald-500 font-bold text-xs hover:underline flex items-center justify-center gap-1">
                                {deployedUrl} <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                            
                            <div className="pt-4 border-t border-slate-200 w-full mt-4 flex gap-2">
                               <button 
                                 onClick={() => { setHostContent(''); setAppName(''); setDeployedUrl(''); }}
                                 className="flex-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-mono text-xs py-2 rounded-lg font-bold transition"
                               >
                                 Deploy Another
                               </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-slate-400 flex flex-col items-center opacity-60">
                            <FileCode className="w-12 h-12 mb-3" />
                            <p className="font-mono text-xs">Waiting for deployment...</p>
                            <p className="text-[10px] mt-1 max-w-[200px] leading-relaxed">Paste your code on the left and hit deploy to generate a live public URL instantly.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {cloudRunSubTab === 'Services' && (
              <div className="rounded-2xl border bg-[#202124] border-slate-800 shadow-xl overflow-hidden animate-fade-in text-slate-100 font-sans">
                {/* GCP Style Header Panel */}
                <div className="p-4 border-b border-slate-800 bg-[#2d2d2d] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-slate-100">Services</span>
                    <button className="text-slate-400 hover:text-slate-200 p-1 rounded transition" title="More options">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setShowRegisterModal(true)}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold text-xs flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-slate-800 transition"
                    >
                      <LucideIcons.Plus className="w-3.5 h-3.5" />
                      Register SDK Node
                    </button>

                    <button 
                      onClick={() => {
                        setHomeToast("✓ Fetching latest deployments...");
                        fetch('/api/deployments')
                          .then(res => res.json())
                          .then(data => {
                            if (Array.isArray(data) && state.setDeployments) {
                              state.setDeployments(data);
                            }
                          })
                          .catch(console.error);
                        fetch('/api/domain-mappings')
                          .then(res => res.json())
                          .then(data => setRealDomainMappings(data || {}))
                          .catch(console.error);
                        fetch('/api/orchestrator/nodes')
                          .then(res => res.json())
                          .then(data => setOrchestratorNodes(data || []))
                          .catch(console.error);
                        setTimeout(() => setHomeToast(null), 1500);
                      }}
                      className="text-blue-400 hover:text-blue-300 font-semibold text-xs flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-slate-800 transition"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Refresh
                    </button>
                    
                    <div className="flex gap-2">
                      <div className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[9px] font-mono border border-slate-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        NODES: {orchestratorNodes.length}
                      </div>
                      <div className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[9px] font-mono border border-slate-700">
                        ONLINE: {deployments.length > 0 ? deployments.length : projects.length + orchestratorNodes.length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* GCP Style Filter Bar */}
                <div className="p-3 bg-[#202124] border-b border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 bg-[#2d2d2d] border border-slate-700 rounded px-3 py-1.5 w-full max-w-md">
                    <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-xs text-slate-500 font-mono select-none">Filter</span>
                    <input 
                      type="text"
                      placeholder="Filter services..."
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="bg-transparent border-none outline-none text-xs text-slate-100 placeholder-slate-500 w-full"
                    />
                    {serviceSearch && (
                      <button onClick={() => setServiceSearch('')} className="text-slate-400 hover:text-slate-200 text-xs font-bold">×</button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-400">
                    <button className="p-1.5 hover:bg-slate-800 rounded transition" title="Show columns">
                      <Sliders className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Table container with horizontal scroll */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#2d2d2d] text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                        <th className="p-3 w-10 text-center select-none">
                          <input 
                            type="checkbox" 
                            className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0 focus:ring-offset-0" 
                            checked={
                              selectedServices.length > 0 &&
                              selectedServices.length === [...deployments, ...orchestratorNodes, ...projects].length
                            }
                            onChange={(e) => {
                              const allItems = [...deployments.map(d => d.name || d.id), ...orchestratorNodes.map(o => o.name), ...projects.map(p => p.name)].filter(Boolean);
                              if (e.target.checked) {
                                setSelectedServices(allItems);
                              } else {
                                setSelectedServices([]);
                              }
                            }}
                          />
                        </th>
                        <th className="p-3 w-12 text-center">Status</th>
                        <th className="p-3 font-semibold min-w-[200px]">Name</th>
                        <th className="p-3 font-semibold">Deployment Type</th>
                        <th className="p-3 font-semibold">Region</th>
                        <th className="p-3 font-semibold">Cost</th>
                        <th className="p-3 font-semibold">
                          <span className="flex items-center gap-1">
                            Authentication
                            <LucideIcons.HelpCircle className="w-3 h-3 text-slate-500" />
                          </span>
                        </th>
                        <th className="p-3 font-semibold">
                          <span className="flex items-center gap-1">
                            Ingress
                            <LucideIcons.HelpCircle className="w-3 h-3 text-slate-500" />
                          </span>
                        </th>
                        <th className="p-3 font-semibold">Last deployed</th>
                        <th className="p-3 font-semibold">Deployed by</th>
                        <th className="p-3 font-semibold">Recommendation</th>
                        <th className="p-3 w-12 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {[...deployments.map(d => ({ ...d, url: d.publicUrl || d.url || (d.subdomain ? `https://phrscrowd.online/${d.subdomain}` : "") })), 
                        ...orchestratorNodes, 
                        ...projects.filter(p => !deployments.find(d => d.name === p.name || d.id === p.id))]
                        .filter(project => {
                          if (!serviceSearch) return true;
                          const name = (project.name || '').toLowerCase();
                          return name.includes(serviceSearch.toLowerCase());
                        })
                        .map((project: any, idx: number) => {
                          const isOnline = project.status === 'Running' || project.status === 'ONLINE' || project.status === 'online';
                          const projName = project.name || 'Untitled Service';
                          const isChecked = selectedServices.includes(projName);
                          const dynamicCost = project.name ? `₹${(project.name.length * 0.17 + 0.12).toFixed(2)}` : '₹0.12';
                          const region = project.region || 'asia-southeast1';
                          const deployer = project.deployedBy || 'psm8742260@gmail.com';
                          const relativeTime = project.lastDeployed || `${(idx * 3 + 1)} ${idx % 2 === 0 ? 'hours' : 'days'} ago`;

                          return (
                            <tr key={idx} className="hover:bg-[#2a2b2d] transition-colors group">
                              {/* Checkbox column */}
                              <td className="p-3 text-center">
                                <input 
                                  type="checkbox" 
                                  className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0 focus:ring-offset-0" 
                                  checked={isChecked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedServices(prev => [...prev, projName]);
                                    } else {
                                      setSelectedServices(prev => prev.filter(item => item !== projName));
                                    }
                                  }}
                                />
                              </td>

                              {/* Status column */}
                              <td className="p-3 text-center">
                                <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${isOnline ? 'bg-emerald-950/45 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'}`}>
                                  {isOnline ? '✓' : '•'}
                                </span>
                              </td>

                              {/* Name column */}
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  {project.techStack?.includes("SDK") || project.studioName?.includes("SDK") ? (
                                    <LucideIcons.Terminal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                                  ) : (
                                    <LucideIcons.GitBranch className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                  )}
                                  
                                  <div className="flex flex-col">
                                    <span 
                                      onClick={() => {
                                        const targetUrl = project.publicUrl || project.url;
                                        if (targetUrl) window.open(targetUrl, '_blank');
                                      }}
                                      className="font-bold text-blue-400 group-hover:underline cursor-pointer truncate max-w-[220px]"
                                      title={project.publicUrl || project.url || projName}
                                    >
                                      {projName}
                                    </span>
                                    {project.id && (
                                      <span className="text-[9px] text-slate-500 font-mono">
                                        ID: {project.id}
                                      </span>
                                    )}
                                    {project.pwaVersion && (
                                      <span className="text-[9px] bg-slate-800 border border-slate-700 text-slate-400 rounded-sm px-1 py-0.2 mt-0.5 w-max">
                                        PWA v{project.pwaVersion}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Deployment type column */}
                              <td className="p-3">
                                <span className="inline-flex items-center gap-1 text-slate-300">
                                  {project.studioName === "PHRS SDK Integrated" || project.techStack?.includes("SDK")
                                    ? "PHRS Crowd SDK"
                                    : project.studioName === "PHRS Master"
                                      ? "PHRS Master SDK"
                                      : project.githubUrl?.includes("github.com")
                                        ? "GitHub"
                                        : project.studioName || "AI Master Studio"}
                                </span>
                              </td>

                              {/* Region column */}
                              <td className="p-3">
                                <span className="font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">
                                  {region}
                                </span>
                              </td>

                              {/* Cost column */}
                              <td className="p-3 text-slate-300 font-mono">
                                {dynamicCost}
                              </td>

                              {/* Authentication column */}
                              <td className="p-3">
                                <span className="text-slate-300 bg-slate-800/40 px-1.5 py-0.5 rounded border border-slate-800">
                                  Public access
                                </span>
                              </td>

                              {/* Ingress column */}
                              <td className="p-3">
                                <span className="text-slate-400 font-mono">
                                  All
                                </span>
                              </td>

                              {/* Last deployed column */}
                              <td className="p-3 text-slate-400">
                                {relativeTime}
                              </td>

                              {/* Deployed by column */}
                              <td className="p-3 text-slate-400 font-mono select-all">
                                {deployer}
                              </td>

                              {/* Recommendation column */}
                              <td className="p-3">
                                <div className="relative">
                                  <button 
                                    onClick={() => setActiveMenuIdx(activeMenuIdx === idx ? null : idx)}
                                    className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 px-2 py-1 rounded flex items-center gap-1.5 transition"
                                  >
                                    <span className="text-[10px]">💡</span> Security
                                    <LucideIcons.ChevronDown className="w-3 h-3 text-slate-400" />
                                  </button>

                                  {activeMenuIdx === idx && (
                                    <div className="absolute right-0 mt-1 w-44 bg-[#2d2d2d] border border-slate-700 rounded shadow-xl z-20 overflow-hidden divide-y divide-slate-800 animate-fade-in text-slate-100">
                                      <button 
                                        onClick={() => {
                                          setActiveMenuIdx(null);
                                          setHomeToast(`Service Detail: ${projName} | Status: ${isOnline ? 'ONLINE' : 'OFFLINE'}`);
                                          setTimeout(() => setHomeToast(null), 2500);
                                        }}
                                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 transition flex items-center gap-2"
                                      >
                                        <LucideIcons.Eye className="w-3.5 h-3.5 text-blue-400" />
                                        View Details
                                      </button>
                                      <button 
                                        onClick={() => {
                                          setActiveMenuIdx(null);
                                          setHomeToast("✓ Dismissed security alert");
                                          setTimeout(() => setHomeToast(null), 1500);
                                        }}
                                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 transition flex items-center gap-2"
                                      >
                                        <LucideIcons.Check className="w-3.5 h-3.5 text-slate-400" />
                                        Dismiss
                                      </button>
                                      {project.url && (
                                        <button 
                                          onClick={() => {
                                            setActiveMenuIdx(null);
                                            navigator.clipboard.writeText(project.url);
                                            setHomeToast("✓ Service URL copied to clipboard!");
                                            setTimeout(() => setHomeToast(null), 1500);
                                          }}
                                          className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 transition flex items-center gap-2"
                                        >
                                          <LucideIcons.Copy className="w-3.5 h-3.5 text-slate-400" />
                                          Copy Link
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </td>

                              {/* Actions column */}
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  {project.url && (
                                    <a 
                                      href={project.url} 
                                      target="_blank" 
                                      rel="noreferrer" 
                                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-blue-400 transition"
                                      title="Domain URL"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                  )}
                                  
                                  <button 
                                    onClick={() => {
                                      setCloudRunSubTab('Domain mappings');
                                      setIsCreatingDomain(true);
                                      setNewDomainService(projName);
                                    }}
                                    className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-emerald-400 transition"
                                    title="Map Custom Domain"
                                  >
                                    <LucideIcons.Globe className="w-3.5 h-3.5" />
                                  </button>

                                  <button 
                                    onClick={() => {
                                      setHomeToast(`✓ Fetching streaming logs for ${projName}...`);
                                      setTimeout(() => setHomeToast(null), 2500);
                                    }}
                                    className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-indigo-400 transition"
                                    title="Pull Logs / Manage"
                                  >
                                    <LucideIcons.Terminal className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      {([...deployments, ...orchestratorNodes, ...projects].length === 0) && (
                        <tr>
                          <td colSpan={12} className="text-center py-10 text-slate-500">
                            <LucideIcons.Globe className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400 animate-pulse" />
                            No serverless container nodes active in this project fleet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {showRegisterModal && (
                  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#202124] border border-slate-700 rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in text-slate-100">
                      <div className="p-4 border-b border-slate-800 bg-[#2d2d2d] flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                          <span>📦</span> Register Custom SDK Project Node
                        </h4>
                        <button 
                          onClick={() => setShowRegisterModal(false)}
                          className="text-slate-400 hover:text-slate-200 text-lg font-bold"
                        >
                          ×
                        </button>
                      </div>

                      <div className="p-5 space-y-4 text-xs">
                        <p className="text-slate-400 leading-relaxed text-[11px]">
                          మీరు సొంతంగా గిట్ లేదా మీ VPS సర్వర్‌లో బిల్డ్ చేసిన <b>PHRS Crowd SDK</b> ప్రాజెక్టును ఇక్కడ ఆటోమేటిక్‌గా లింక్ చేయడానికి ఈ క్రింది వివరాలను పూరించండి.
                        </p>

                        <div>
                          <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">Project Name (ప్రాజెక్ట్ పేరు)</label>
                          <input 
                            type="text"
                            placeholder="e.g. My Custom Tracker"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            className="w-full p-2.5 rounded border bg-[#2d2d2d] border-slate-700 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">Subdomain (సబ్‌డొమైన్ - unique key)</label>
                          <input 
                            type="text"
                            placeholder="e.g. customtracker"
                            value={registerSubdomain}
                            onChange={(e) => setRegisterSubdomain(e.target.value)}
                            className="w-full p-2.5 rounded border bg-[#2d2d2d] border-slate-700 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">Tech Stack (సాంకేతికత)</label>
                          <select 
                            value={registerTechStack}
                            onChange={(e) => setRegisterTechStack(e.target.value)}
                            className="w-full p-2.5 rounded border bg-[#2d2d2d] border-slate-700 text-slate-100 focus:border-blue-500 focus:outline-none"
                          >
                            <option value="React/Vite">React / Vite</option>
                            <option value="NodeJS/Express">NodeJS / Express</option>
                            <option value="NextJS">Next.js</option>
                            <option value="Python/Django">Python / Django</option>
                            <option value="Kotlin/Java">Kotlin / Java</option>
                          </select>
                        </div>

                        <div className="pt-2 flex justify-end gap-3">
                          <button 
                            onClick={() => setShowRegisterModal(false)}
                            className="px-4 py-2 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition font-semibold"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={async () => {
                              if (!registerName || !registerSubdomain) {
                                setHomeToast("⚠️ Please enter both Name and Subdomain!");
                                setTimeout(() => setHomeToast(null), 3000);
                                return;
                              }
                              
                              try {
                                const cleanSub = registerSubdomain.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
                                const res = await fetch('/api/deployments/register', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                    id: `dep-sdk-${Date.now()}`,
                                    name: registerName,
                                    subdomain: cleanSub,
                                    port: 3000,
                                    techStack: registerTechStack
                                  })
                                });
                                
                                if (res.ok) {
                                  setHomeToast("✓ SDK Project Registered Successfully!");
                                  setShowRegisterModal(false);
                                  setRegisterName('');
                                  setRegisterSubdomain('');
                                  
                                  // Refresh deployments instantly
                                  fetch('/api/deployments')
                                    .then(r => r.json())
                                    .then(data => {
                                      if (Array.isArray(data)) {
                                        setDeployments(data);
                                      }
                                    });
                                } else {
                                  setHomeToast("⚠️ Registration failed on the server.");
                                }
                              } catch (e) {
                                console.error(e);
                                setHomeToast("⚠️ Connection error while registering.");
                              }
                              setTimeout(() => setHomeToast(null), 3000);
                            }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition font-semibold"
                          >
                            Register Node
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {cloudRunSubTab === 'Jobs' && (
              <div className="p-6 rounded-2xl border bg-white border-slate-200 space-y-6">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h3 className="font-mono font-bold text-sm tracking-wider text-slate-800 uppercase">Serverless Jobs</h3>
                  <button 
                    onClick={() => setIsCreatingJob(!isCreatingJob)} 
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs px-3 py-1.5 rounded-lg font-semibold transition"
                  >
                    {isCreatingJob ? 'Cancel' : '+ Create Job'}
                  </button>
                </div>

                {isCreatingJob && (
                  <div className="p-4 border border-indigo-100 bg-indigo-50/20 rounded-xl space-y-4 max-w-md font-mono text-xs">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">JOB NAME</label>
                      <input 
                        type="text" 
                        placeholder="e.g. phrs-cache-pruner" 
                        value={newJobName} 
                        onChange={(e) => setNewJobName(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">CRON SCHEDULE EXPRESSION</label>
                      <input 
                        type="text" 
                        placeholder="e.g. */10 * * * *" 
                        value={newJobSchedule} 
                        onChange={(e) => setNewJobSchedule(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white text-slate-800"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        if (!newJobName) {
                          alert('Job Name is required!');
                          return;
                        }
                        const newJob = {
                          name: newJobName,
                          status: 'Succeeded',
                          schedule: newJobSchedule,
                          lastRun: 'Never'
                        };
                        setCloudRunJobs(prev => [...prev, newJob]);
                        setVpsLogStream(prev => [...prev, `[CLOUD-RUN-JOB] Provisioned job: ${newJobName} on schedule ${newJobSchedule}`]);
                        setNewJobName('');
                        setIsCreatingJob(false);
                        setHomeToast('✓ Serverless job registered successfully!');
                        setTimeout(() => setHomeToast(null), 3000);
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-semibold"
                    >
                      REGISTER SERVERLESS JOB
                    </button>
                  </div>
                )}

                <div className="space-y-3 font-mono text-xs">
                  {cloudRunJobs.map((job, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{job.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase">Schedule: {job.schedule} • Last run: {job.lastRun}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setVpsLogStream(prev => [...prev, `[CLOUD-RUN-JOB] Manual execution triggered for: ${job.name}`]);
                            alert(`✓ Manual run triggered for job: ${job.name}. Logging details to VPS telemetry.`);
                          }}
                          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg"
                        >
                          Run Now
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(`Delete serverless job: ${job.name}?`)) {
                              setCloudRunJobs(prev => prev.filter(j => j.name !== job.name));
                              setVpsLogStream(prev => [...prev, `[CLOUD-RUN-JOB] Deleted job: ${job.name}`]);
                            }
                          }}
                          className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-600 px-2.5 py-1.5 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cloudRunSubTab === 'Worker pools' && (
              <div className="p-6 rounded-2xl border bg-white border-slate-200 space-y-6">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="font-mono font-bold text-sm tracking-wider text-slate-800 uppercase">Compute Worker Pools</h3>
                    <p className="text-[11px] text-slate-500">Manage private worker pools for restricted egress and internal VPC connectivity.</p>
                  </div>
                  <button 
                    onClick={() => setIsCreatingPool(!isCreatingPool)} 
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs px-3 py-1.5 rounded-lg font-semibold transition shrink-0"
                  >
                    {isCreatingPool ? 'Cancel' : '+ Add Worker Pool'}
                  </button>
                </div>

                {isCreatingPool && (
                  <div className="p-4 border border-indigo-100 bg-indigo-50/20 rounded-xl space-y-4 max-w-md font-mono text-xs">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">POOL NAME</label>
                      <input 
                        type="text" 
                        placeholder="e.g. phrs-egress-mesh-02" 
                        value={newPoolName} 
                        onChange={(e) => setNewPoolName(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white text-slate-800"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        if (!newPoolName) {
                          alert('Pool Name is required!');
                          return;
                        }
                        const newPool = {
                          name: newPoolName,
                          region: 'asia-southeast1',
                          nodes: 2,
                          status: 'Active'
                        };
                        setWorkerPools(prev => [...prev, newPool]);
                        setVpsLogStream(prev => [...prev, `[WORKER-POOL] Provisioned new private compute pool: ${newPoolName}`]);
                        setNewPoolName('');
                        setIsCreatingPool(false);
                        setHomeToast('✓ Private compute worker pool initialized!');
                        setTimeout(() => setHomeToast(null), 3000);
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-semibold"
                    >
                      PROVISION WORKER POOL
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  {workerPools.map((pool, idx) => (
                    <div key={idx} className="p-4 border border-slate-100 bg-slate-50 rounded-xl flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{pool.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Region: {pool.region} • Provisioned Nodes: {pool.nodes}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          {pool.status}
                        </span>
                      </div>
                      <button 
                        onClick={() => {
                          if (confirm(`Deprovision worker pool ${pool.name}?`)) {
                            setWorkerPools(prev => prev.filter(p => p.name !== pool.name));
                            setVpsLogStream(prev => [...prev, `[WORKER-POOL] Deprovisioned compute pool: ${pool.name}`]);
                          }
                        }}
                        className="text-rose-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cloudRunSubTab === 'Domain mappings' && (
              <div className="p-0 space-y-6 animate-fade-in">
                <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm space-y-6">
                  {/* Header matching Screenshot 2 */}
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">Domain mappings</h3>
                        <span className="px-2 py-0.5 text-[11px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-md">
                          Preview
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setCloudRunSubTab('Overview')} 
                        className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition"
                      >
                        Cancel
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md border border-slate-200 transition">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* DNS Configuration Instructions - Pixel Perfect matching Screenshot 174544/174547 */}
                  <div className="p-5 bg-[#fffbeb] border border-amber-100 rounded-xl space-y-4 shadow-sm">
                    <div className="flex items-center gap-3 text-amber-900">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <LucideIcons.Globe className="w-5 h-5 text-amber-600" />
                      </div>
                      <h4 className="text-[14px] font-bold">🌐 డొమైన్ యాక్టివేషన్ గైడ్ (Custom Domain Connection Guide)</h4>
                    </div>
                    
                    <div className="text-[13px] text-amber-900 leading-relaxed space-y-4">
                      <p>
                        మీరు కొనుగోలు చేసిన కస్టమ్ డొమైన్ (ఉదాహరణకు <strong className="font-mono text-slate-900">phrscrowd.com</strong> లేదా <strong className="font-mono text-slate-900">phrscrowd.online</strong>) ఏ బ్రౌజర్‌లోనైనా ఓపెన్ కావాలంటే, మీ డొమైన్ రిజిస్ట్రార్ (Cloudflare, GoDaddy, Namecheap మొదలైనవి) లో ఈ కింది విధంగా <strong className="font-bold text-amber-950">CNAME Record</strong> ను సెట్ చేయాలి:
                      </p>
                      
                      <div className="bg-[#121212] text-slate-300 p-6 rounded-xl font-mono text-[12px] space-y-4 border border-slate-800 shadow-xl">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                          <span className="text-slate-500">Record Type:</span>
                          <span className="text-amber-400 font-bold">CNAME</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                          <span className="text-slate-500">Name (Host):</span>
                          <div>
                            <span className="text-emerald-400 font-bold">@</span> <span className="text-slate-500">(or</span> <span className="text-purple-400 font-bold">www</span><span className="text-slate-500">)</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 pt-2">
                          <span className="text-slate-500">Target (Points to):</span>
                          <div className="bg-[#1e1e1e] p-4 rounded-lg border border-slate-800 text-[#3b82f6] font-bold break-all leading-tight">
                            {typeof window !== 'undefined' ? window.location.hostname : 'ais-dev-o5if7fqu2usa7mc7klx2wp-398230688462.asia-southeast1.run.app'}
                          </div>
                        </div>
                      </div>

                      <p className="flex items-start gap-2 text-[12px] text-amber-800 italic bg-white/50 p-3 rounded-lg border border-amber-50">
                        <span>💡</span>
                        <span><strong>గమనిక:</strong> CNAME రికార్డ్ జోడించిన తర్వాత, DNS వ్యాప్తి (Propagation) కి కొన్ని నిమిషాల సమయం పట్టవచ్చు. ఆ తర్వాత మీ డొమైన్ ప్రపంచవ్యాప్తంగా ఏ బ్రౌజర్‌పైన అయినా పర్ఫెక్ట్ గా ఓపెన్ అవుతుంది!</span>
                      </p>
                    </div>
                  </div>

                  {/* Domain Mapping Form - Matching Screenshot 174547 */}
                  <div className="p-6 border border-slate-100 bg-slate-50/30 rounded-2xl space-y-6">
                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-slate-400 tracking-wider uppercase">DOMAIN NAME / HOSTNAME</label>
                      <input 
                        type="text" 
                        placeholder="e.g. app.ai.studio or portal.phrs-crowd.local" 
                        value={newDomainName} 
                        onChange={(e) => setNewDomainName(e.target.value)}
                        className="w-full p-4 border border-slate-200 rounded-xl bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-slate-400 tracking-wider uppercase">ROUTE TO PROJECT (HOSTED DIRECTORY)</label>
                      <input 
                        type="text" 
                        placeholder="phrs-auth-v1" 
                        value={newDomainService} 
                        onChange={(e) => setNewDomainService(e.target.value)}
                        className="w-full p-4 border border-slate-200 rounded-xl bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all"
                      />
                      
                      <div className="mt-2 flex flex-wrap gap-2 items-center">
                        <span className="text-[11px] text-slate-400 mr-1">Deployed apps:</span>
                        {['aiol', 'cwrb', 'aims'].map((app) => (
                          <button
                            key={app}
                            type="button"
                            onClick={() => setNewDomainService(app)}
                            className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200 transition-colors font-medium"
                          >
                            {app}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={async () => {
                        if (!newDomainName || !newDomainService) {
                          alert('Both Domain Name and Target Project are required!');
                          return;
                        }
                        setIsMappingLoading(true);
                        try {
                          const res = await fetch('/api/domain-mappings', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ domain: newDomainName, project: newDomainService })
                          });
                          const data = await res.json();
                          if (data.success) {
                            setRealDomainMappings(data.mappings);
                            setNewDomainName('');
                            setNewDomainService('');
                            setHomeToast('✓ DNS Custom mapping configured and live!');
                          }
                        } catch (err) { console.error(err); } finally {
                          setIsMappingLoading(false);
                          setTimeout(() => setHomeToast(null), 3000);
                        }
                      }}
                      disabled={isMappingLoading}
                      className="w-full bg-[#4f46e5] hover:bg-[#4338ca] disabled:bg-indigo-400 text-white py-4 rounded-xl font-bold tracking-wider text-sm shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
                    >
                      {isMappingLoading ? 'MAPPING...' : 'VALIDATE & MAP DOMAIN'}
                    </button>
                  </div>

                  {/* Filter / Search Bar - Matching Screenshot 174547 */}
                  <div className="flex items-center justify-between gap-4 py-3 px-4 border border-slate-200 rounded-xl bg-[#f8fafc] mb-6">
                    <div className="flex items-center gap-3 flex-1">
                      <LucideIcons.Filter className="w-5 h-5 text-slate-400 shrink-0" />
                      <input 
                        type="text" 
                        placeholder="Filter domains" 
                        value={domainFilterQuery}
                        onChange={(e) => setDomainFilterQuery(e.target.value)}
                        className="bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none w-full font-medium"
                      />
                    </div>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                      <LucideIcons.Settings2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Domain Mappings Table - 'Box-Lines-Text-ThreeDots' Architecture */}
                  <div className="overflow-x-auto border border-slate-100 rounded-[24px] bg-white shadow-sm mb-12">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-[#f8fafc] border-b border-slate-100 text-slate-500">
                        <tr>
                          <th className="py-4 px-6 w-14 text-center">
                            <div className="w-4 h-4 rounded-full border-2 border-slate-900 mx-auto"></div>
                          </th>
                          <th className="py-4 px-4 font-bold uppercase tracking-widest text-[10px]">URL / Domain Name</th>
                          <th className="py-4 px-4 font-bold uppercase tracking-widest text-[10px] text-right pr-12">Type</th>
                          <th className="py-4 px-6 w-24 text-center font-bold uppercase tracking-widest text-[10px]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-slate-800">
                        {Object.entries(realDomainMappings || {})
                          .filter(([domain]) => domain.toLowerCase().includes(domainFilterQuery.toLowerCase()))
                          .map(([domain, targetProject], idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-5 px-6 text-center">
                                <div className="w-5 h-5 rounded-full border border-slate-300 mx-auto flex items-center justify-center">
                                  <LucideIcons.Check className="w-3 h-3 text-emerald-500 opacity-0" />
                                </div>
                              </td>
                              <td className="py-5 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                                    <LucideIcons.Check className="w-3 h-3 text-white stroke-[4]" />
                                  </div>
                                  <a href={`https://${domain}`} target="_blank" rel="noreferrer" className="text-[#1a73e8] hover:underline font-bold text-[14px] flex items-center gap-1.5">
                                    {domain} <LucideIcons.ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </td>
                              <td className="py-5 px-4 text-right pr-12">
                                <span className="text-[12px] font-bold text-slate-500">{domain.includes('phrscrowd.online') ? 'Domain' : 'Custom URL'}</span>
                              </td>
                              <td className="py-5 px-6 text-center relative">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenu(activeMenu === domain ? null : domain);
                                  }}
                                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                                >
                                  <LucideIcons.MoreVertical className="w-5 h-5" />
                                </button>
                                {activeMenu === domain && (
                                  <div className="absolute right-4 top-12 w-48 bg-white border border-slate-100 shadow-xl rounded-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                                    <button 
                                      onClick={() => {
                                        setShowDnsModal({ domain, target: targetProject });
                                        setActiveMenu(null);
                                      }}
                                      className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                                    >
                                      <LucideIcons.Settings className="w-4 h-4" />
                                      DNS records
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* DNS Records Modal */}
                {showDnsModal && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] animate-in fade-in duration-200" onClick={() => setShowDnsModal(null)}></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] overflow-hidden transform animate-in zoom-in-95 duration-200 relative">
                      <div className="p-8">
                        <h3 className="text-2xl text-slate-900 font-bold mb-4">DNS Records</h3>
                        <p className="text-[15px] text-slate-600 leading-relaxed mb-6">
                          Update the DNS records on your domain host with the records below. You can view these again using the "DNS records" button in the domain mappings table.
                          <a href="#" className="text-[#1a73e8] hover:underline ml-1 inline-flex items-center gap-1">
                            Learn more <LucideIcons.ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </p>
                        
                        <div className="space-y-4">
                          <p className="text-[14px] font-bold text-slate-900">DNS records for {showDnsModal.domain}</p>
                          
                          <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full text-left text-[14px]">
                              <thead className="bg-[#f8fafc] border-b border-slate-100">
                                <tr>
                                  <th className="py-3 px-4 font-bold text-slate-500 uppercase text-[10px] tracking-wider">Name</th>
                                  <th className="py-3 px-4 font-bold text-slate-500 uppercase text-[10px] tracking-wider">Type</th>
                                  <th className="py-3 px-4 font-bold text-slate-500 uppercase text-[10px] tracking-wider">Data</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                <tr className="border-b border-slate-50">
                                  <td className="py-4 px-4 text-slate-600 font-medium">
                                    {showDnsModal.domain.split('.')[0] === 'phrscrowd' ? '@' : showDnsModal.domain.split('.')[0]}
                                  </td>
                                  <td className="py-4 px-4 text-slate-600">CNAME</td>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-slate-600 truncate font-mono text-[13px]">ghs.googlehosted.com</span>
                                      <button className="p-1.5 hover:bg-slate-100 rounded-md transition-colors text-slate-400 hover:text-slate-600">
                                        <LucideIcons.Copy className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                          <button 
                            onClick={() => setShowDnsModal(null)}
                            className="px-6 py-2.5 text-[#1a73e8] font-bold hover:bg-blue-50 rounded-lg transition-all"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
  );
}
