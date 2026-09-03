import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

export default function DatabaseTab({ state }: { state: any }) {
  const { isAutoInternetEnabled, setIsAutoInternetEnabled, isDarkMode, setIsDarkMode, isAuthenticated, setIsAuthenticated, loginView, setLoginView, appIconUrl, setAppIconUrl, pkgName, setPkgName, shaFingerprint, setShaFingerprint, activeTab, setActiveTab, snippetFormat, setSnippetFormat, projects, setProjects, selectedProjectId, setSelectedProjectId, newProjName, setNewProjName, showNewProjModal, setShowNewProjModal, showUpiModal, setShowUpiModal, searchQuery, setSearchQuery, notifications, setNotifications, showNotifications, setShowNotifications, metrics, setMetrics, cpuHistory, setCpuHistory, vpsLogStream, setVpsLogStream, isMiniServerRunning, setIsMiniServerRunning, miniServerPort, setMiniServerPort, miniServerIp, setMiniServerIp, terminalHistory, setTerminalHistory, terminalInput, setTerminalInput, stealthDataBalanceMb, setStealthDataBalanceMb, stealthSmsCredits, setStealthSmsCredits, stealthWalletRupees, setStealthWalletRupees, showStandaloneBanner, setShowStandaloneBanner, localServerIpInput, setLocalServerIpInput, dbData, setDbData, dbRawText, setDbRawText, isRawDbView, setIsRawDbView, dbSuccessMessage, setDbSuccessMessage, isSyncingDb, setIsSyncingDb, dbKeyPath, setDbKeyPath, dbNewVal, setDbNewVal, deployments, setDeployments, githubUrl, setGithubUrl, appName, setAppName, appPort, setAppPort, appTech, setAppTech, buildLogs, setBuildLogs, isBuilding, setIsBuilding, buildProgress, setBuildProgress, activeVirtualApp, setActiveVirtualApp, simulatedVisitorCount, setSimulatedVisitorCount, smartRouteModal, setSmartRouteModal, shortLinks, setShortLinks, linkSlug, setLinkSlug, linkTarget, setLinkTarget, hostFileName, setHostFileName, hostContent, setHostContent, deployedUrl, setDeployedUrl, isDeploying, setIsDeploying, hostedHtml, setHostedHtml, smsGateway, setSmsGateway, smsApiKey, setSmsApiKey, smsAccountSid, setSmsAccountSid, smsSenderId, setSmsSenderId, smsTemplate, setSmsTemplate, testPhoneNumber, setTestPhoneNumber, isSendingOtp, setIsSendingOtp, lastGeneratedOtp, setLastGeneratedOtp, verificationInput, setVerificationInput, verificationStatus, setVerificationStatus, virtualPhoneNotification, setVirtualPhoneNotification, phoneScreenOn, setPhoneScreenOn, apiKeys, setApiKeys, isRoutingActive, setIsRoutingActive, routingHistory, setRoutingHistory, activeRouterPrompt, setActiveRouterPrompt, activeRouterModel, setActiveRouterModel, isRoutingLoading, setIsRoutingLoading, activeExportFile, setActiveExportFile, billingBudget, setBillingBudget, billingAlertAmount, setBillingAlertAmount, billingAlertEmail, setBillingAlertEmail, billingSubTab, setBillingSubTab, envTranslationMappings, setEnvTranslationMappings, secretManagerSubTab, setSecretManagerSubTab, iamMembers, setIamMembers, newMemberEmail, setNewMemberEmail, newMemberRole, setNewMemberRole, selectedMarketplaceApp, setSelectedMarketplaceApp, customSystemPrompt, setCustomSystemPrompt, agentChatInput, setAgentChatInput, agentChatHistory, setAgentChatHistory, k8sPods, setK8sPods, buckets, setBuckets, newBucketName, setNewBucketName, storageFiles, setStorageFiles, uploadFileName, setUploadFileName, uploadTargetBucket, setUploadTargetBucket, isUploading, setIsUploading, firewallPolicy, setFirewallPolicy, sslStatus, setSslStatus, generatedKeyPair, setGeneratedKeyPair, bqQuery, setBqQuery, bqResults, setBqResults, bqRunning, setBqRunning, monitorUptime, setMonitorUptime, activeAlerts, setActiveAlerts, isHybridDevMode, setIsHybridDevMode, isAiServerBypassed, setIsAiServerBypassed, remoteNodeIp, setRemoteNodeIp, deviceSerial, setDeviceSerial, deepseekApiKey, setDeepseekApiKey, showAdminPortal, setShowAdminPortal, isAdminGmailVerified, setIsAdminGmailVerified, adminGmail, setAdminGmail, isVerifyingGmail, setIsVerifyingGmail, uploadedZipName, setUploadedZipName, zipFile, setZipFile, isUploadingZip, setIsUploadingZip, zipUploadProgress, setZipUploadProgress, isCompiling, setIsCompiling, compilationProgress, setCompilationProgress, compilationLogs, setCompilationLogs, tempRemoteNodeIp, setTempRemoteNodeIp, tempDeviceSerial, setTempDeviceSerial, tempDeepseekApiKey, setTempDeepseekApiKey, cloudRunImage, setCloudRunImage, cloudRunEnvVars, setCloudRunEnvVars, revisionTraffic, setRevisionTraffic, subnets, setSubnets, firewallRules, setFirewallRules, newSubnetName, setNewSubnetName, newSubnetRange, setNewSubnetRange, newFireRuleName, setNewFireRuleName, newFireRulePort, setNewFireRulePort, newFireRuleRange, setNewFireRuleRange, newFireRuleAction, setNewFireRuleAction, vpcSubTab, setVpcSubTab, ipInventory, setIpInventory, deviceCarrierIp, setDeviceCarrierIp, networkLatency, setNetworkLatency, mobileIp, setMobileIp, isBridgeActive, setIsBridgeActive, isAdminAuthorized, setIsAdminAuthorized, adminPasswordInput, setAdminPasswordInput, showAuthModal, setShowAuthModal, modificationCount, setModificationCount, showSystemRules, setShowSystemRules, ruleCountdown, setRuleCountdown, protocolStep, setProtocolStep, sqlTables, setSqlTables, newTableName, setNewTableName, newTableCols, setNewTableCols, sqlBackups, setSqlBackups, mapsApiKey, setMapsApiKey, mapsSelectedEndpoint, setMapsSelectedEndpoint, mapsActiveTrackingId, setMapsActiveTrackingId, isSidebarOpen, setIsSidebarOpen, expandedSection, setExpandedSection, selectedSubMenu, setSelectedSubMenu, agents, setAgents, selectedAgentId, setSelectedAgentId, newAgentName, setNewAgentName, newAgentModel, setNewAgentModel, newAgentPrompt, setNewAgentPrompt, agentPlatformSubTab, setAgentPlatformSubTab, securitySubTab, setSecuritySubTab, cloudStorageSubTab, setCloudStorageSubTab, monitoringSubTab, setMonitoringSubTab, iamSubTab, setIamSubTab, apisSubTab, setApisSubTab, cloudRunSubTab, setCloudRunSubTab, cloudHubSubTab, setCloudHubSubTab, phrsMapsSubTab, setPhrsMapsSubTab, bigQuerySubTab, setBigQuerySubTab, phrsDbSubTab, setPhrsDbSubTab, cloudRunJobs, setCloudRunJobs, isCreatingJob, setIsCreatingJob, newJobName, setNewJobName, newJobSchedule, setNewJobSchedule, workerPools, setWorkerPools, isCreatingPool, setIsCreatingPool, newPoolName, setNewPoolName, domainMappings, setDomainMappings, selectedDomain, setSelectedDomain, domainFilterQuery, setDomainFilterQuery, isCreatingDomain, setIsCreatingDomain, newDomainName, setNewDomainName, newDomainService, setNewDomainService, newDomainType, setNewDomainType, isFleetBannerVisible, setIsFleetBannerVisible, isFleetBannerExpanded, setIsFleetBannerExpanded, dbProductFilter, setDbProductFilter, dbLocationFilter, setDbLocationFilter, isProductFilterOpen, setIsProductFilterOpen, isLocationFilterOpen, setIsLocationFilterOpen, phrsUsers, setPhrsUsers, newAuthEmail, setNewAuthEmail, newAuthPassword, setNewAuthPassword, firestoreCollections, setFirestoreCollections, selectedCollection, setSelectedCollection, selectedDocId, setSelectedDocId, isCreatingCollection, setIsCreatingCollection, newCollectionName, setNewCollectionName, isCreatingDoc, setIsCreatingDoc, newDocId, setNewDocId, phrsStorageFiles, setPhrsStorageFiles, isDraggingFile, setIsDraggingFile, deepScanTimer, setDeepScanTimer, isAtomicScanning, setIsAtomicScanning, atomicLogs, setAtomicLogs, homeSubTab, setHomeSubTab, isWelcomeBoardOpen, setIsWelcomeBoardOpen, homeToast, setHomeToast, agentSearchQuery, setAgentSearchQuery, dashboardAgentChatHistory, setDashboardAgentChatHistory, isAgentPanelOpen, setIsAgentPanelOpen, isAgentThinking, setIsAgentThinking, agentModuleMode, setAgentModuleMode, agentImagePrompt, setAgentImagePrompt, agentCodeLanguage, setAgentCodeLanguage, handleTerminalSubmit, handleNetworkChange, handleAgentSubmit, handlePhotoGeneratorClick, handleCodeGeneratorClick, handleCreateProject, handleUpdateRawDb, handleAddDbNode, handleDeleteDbNode, handleSyncDatabase, handleStartDeployment, handleCreateShortLink, handleSendTestSms, handleVerifyOtp, handleSectionClick, handleSubMenuClick, handleDeployFile, isFirebaseSection } = state;
    const { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Cloud, Database, ExternalLink, FileCode, Filter, Flame, Link, Megaphone, MoreVertical, Plus, RefreshCw, Save, Sparkles, Terminal, Trash2, Upload, X } = LucideIcons;

  const [realCollections, setRealCollections] = useState<string[]>([]);
  const [realDocsData, setRealDocsData] = useState<any>({});
  const [docContent, setDocContent] = useState('');

  const fetchCollections = async () => {
    try {
      const res = await fetch('/api/db/collections');
      const data = await res.json();
      if (data.success) {
        setRealCollections(data.collections);
      }
    } catch (e) { console.error(e); }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/auth/users');
      const data = await res.json();
      if (data.success) {
        setPhrsUsers(data.users);
      }
    } catch (e) { console.error(e); }
  };

  const fetchRealtimeDb = async () => {
    try {
      const res = await fetch('/api/db/realtime');
      const data = await res.json();
      if (data && !data.error) {
        setDbData(data);
      }
    } catch (e) { console.error(e); }
  };

  const fetchDocs = async (collectionName: string) => {
    try {
      const res = await fetch(`/api/db/collections/${collectionName}/docs`);
      const data = await res.json();
      if (data.success) {
        setRealDocsData(data.data);
      }
    } catch (e) { console.error(e); }
  };

  const fetchStorageFiles = async () => {
    try {
      // Ensure bucket exists
      await fetch('/api/storage/buckets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'phrs_default_storage' })
      });
      const res = await fetch('/api/storage/buckets/phrs_default_storage/files');
      const data = await res.json();
      if (data.success) {
        setPhrsStorageFiles(data.files);
      }
    } catch (e) { console.error(e); }
  };

  const uploadStorageFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', 'phrs_default_storage');
    try {
      const res = await fetch('/api/storage/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        fetchStorageFiles();
        setVpsLogStream(prev => [...prev, `[STORAGE] Uploaded file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`]);
        setHomeToast('✓ File uploaded successfully!');
      }
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    if (phrsDbSubTab === 'Firestore Database') {
      fetchCollections();
    } else if (phrsDbSubTab === 'Authentication') {
      fetchUsers();
    } else if (phrsDbSubTab === 'Realtime Database') {
      fetchRealtimeDb();
    } else if (phrsDbSubTab === 'Storage') {
      fetchStorageFiles();
    }
  }, [phrsDbSubTab]);

  useEffect(() => {
    if (selectedCollection) {
      fetchDocs(selectedCollection);
    }
  }, [selectedCollection]);

  useEffect(() => {
    if (selectedDocId && realDocsData[selectedDocId]) {
      setDocContent(JSON.stringify(realDocsData[selectedDocId], null, 2));
    } else {
      setDocContent('{\n  \n}');
    }
  }, [selectedDocId, realDocsData]);
  return (
        <>
          <div className="space-y-6 animate-fade-in">
            {selectedSubMenu === 'Overview' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Database className="w-6 h-6 text-indigo-600"/> PHRS DB Overview</h1>
                <p className="text-slate-600 mb-6">Welcome to the central PHRS Database management dashboard. Here you can monitor overall health, query metrics, and view real-time operations across all your clusters.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                     <h3 className="text-sm font-semibold text-indigo-900">Total Clusters</h3>
                     <p className="text-4xl font-black text-indigo-600 mt-2">4</p>
                   </div>
                   <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                     <h3 className="text-sm font-semibold text-emerald-900">Active Queries</h3>
                     <p className="text-4xl font-black text-emerald-600 mt-2">1,204</p>
                   </div>
                   <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                     <h3 className="text-sm font-semibold text-amber-900">Health Status</h3>
                     <div className="text-xl font-bold text-amber-600 mt-2 flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span> Excellent</div>
                   </div>
                </div>
              </div>
            )}
            {selectedSubMenu === 'Cloud SQL' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">Cloud SQL Instances</h1>
                <p className="text-slate-600 mb-6">Manage your managed relational PostgreSQL, MySQL, and SQL Server instances.</p>
                <div className="p-10 border border-slate-100 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center">
                  <Database className="w-16 h-16 text-slate-300 mb-4" />
                  <h3 className="text-lg font-bold text-slate-700">No Instances Found</h3>
                  <button className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Create Instance</button>
                </div>
              </div>
            )}
            {selectedSubMenu === 'AlloyDB for PostgreSQL' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">AlloyDB for PostgreSQL</h1>
                <p className="text-slate-600 mb-6">Fully managed PostgreSQL-compatible database service for your most demanding enterprise database workloads.</p>
                <div className="p-10 border border-slate-100 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center">
                  <Database className="w-16 h-16 text-slate-300 mb-4" />
                  <button 
                    onClick={() => {
                      setHomeToast("✓ Initializing AlloyDB cluster: primary-cluster-01...");
                      setVpsLogStream(prev => [...prev, `[CLOUDSQL] Provisioning AlloyDB PostgreSQL cluster`]);
                      setTimeout(() => setHomeToast(null), 3000);
                    }}
                    className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    Create Cluster
                  </button>
                </div>
              </div>
            )}
            {selectedSubMenu === 'Spanner' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">Spanner</h1>
                <p className="text-slate-600 mb-6">Fully managed, mission-critical relational database service that offers transactional consistency at global scale.</p>
                <div className="p-10 border border-slate-100 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center">
                  <Database className="w-16 h-16 text-slate-300 mb-4" />
                  <button 
                    onClick={() => {
                      setHomeToast("✓ Creating Spanner instance: global-phrs-db...");
                      setVpsLogStream(prev => [...prev, `[SPANNER] Deploying global strongly consistent instance`]);
                      setTimeout(() => setHomeToast(null), 3000);
                    }}
                    className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    Create Instance
                  </button>
                </div>
              </div>
            )}
            {selectedSubMenu === 'Bigtable' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">Bigtable</h1>
                <p className="text-slate-600 mb-6">A fully managed, scalable NoSQL database service for large analytical and operational workloads.</p>
                <div className="p-10 border border-slate-100 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center">
                  <Database className="w-16 h-16 text-slate-300 mb-4" />
                  <button className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Create Instance</button>
                </div>
              </div>
            )}
            {selectedSubMenu === 'Firestore' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Firestore</h1>
                <p className="text-slate-600 mb-6 text-sm sm:text-base leading-relaxed">A flexible, scalable NoSQL cloud database to store and sync data for client- and server-side development.</p>
                <div className="p-6 sm:p-10 border border-slate-100 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center mx-auto max-w-lg">
                  <Database className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mb-4" />
                  <button 
                    onClick={() => {
                      setPhrsDbSubTab('Firestore Database');
                      setHomeToast("✓ Switched to Firestore Management");
                      setTimeout(() => setHomeToast(null), 3000);
                    }}
                    className="mt-2 sm:mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition w-full sm:w-auto"
                  >
                    Create Database
                  </button>
                </div>
              </div>
            )}
            {selectedSubMenu === 'Memorystore' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">Memorystore</h1>
                <p className="text-slate-600 mb-6">Fully managed in-memory data store service for Redis and Memcached at Google Cloud.</p>
                <div className="p-10 border border-slate-100 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center">
                  <Database className="w-16 h-16 text-slate-300 mb-4" />
                  <button 
                    onClick={() => {
                      setHomeToast("✓ Provisioning Memorystore Redis instance: cache-01...");
                      setVpsLogStream(prev => [...prev, `[MEMORYSTORE] Memory allocation: 5GB Tier-1 Redis active`]);
                      setTimeout(() => setHomeToast(null), 3000);
                    }}
                    className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    Create Instance
                  </button>
                </div>
              </div>
            )}

            {(selectedSubMenu === 'Database Center' || !['Overview', 'Cloud SQL', 'AlloyDB for PostgreSQL', 'Spanner', 'Bigtable', 'Firestore', 'Memorystore'].includes(selectedSubMenu)) && (
              <div className="space-y-6">
                
            {/* DB Tree Status Preview (Moved from Welcome) */}
            {!isFirebaseSection && (
              <div className="p-6 rounded-2xl border transition-colors flex flex-col h-[250px] bg-white border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4 shrink-0">
                  <h3 className="font-mono font-bold text-sm tracking-wider text-indigo-500 uppercase">REALTIME DATABASE CLUSTER PREVIEW</h3>
                </div>
                <div className="flex-1 p-4 rounded-xl font-mono text-sm overflow-auto bg-slate-50 text-slate-800 border border-slate-200">
                  <span className="text-indigo-600">dbRoot</span>: &#123;
                  <div className="pl-4 space-y-1 mt-1 border-l border-slate-200 ml-2">
                    {Object.keys(dbData).slice(0, 5).map(key => (
                      <div key={key}>
                        <span className="text-amber-600">"{key}"</span>: &#123;
                        <div className="pl-4 text-slate-600">
                          {typeof dbData[key] === 'object' 
                            ? Object.keys(dbData[key]).slice(0, 3).map(subKey => (
                                <div key={subKey}>
                                  <span>"{subKey}"</span>: <span className="text-emerald-600">{JSON.stringify(dbData[key][subKey])}</span>
                                </div>
                              ))
                            : <span className="text-emerald-600">{JSON.stringify(dbData[key])}</span>
                          }
                        </div>
                        &#125;,
                      </div>
                    ))}
                  </div>
                  &#125;
                </div>
              </div>
            )}
            {/* Main DB Title & Submenu bar */}
            <div className={`p-6 rounded-2xl border transition ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {isFirebaseSection ? (
                    <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
                  ) : (
                    <Database className="w-6 h-6 text-indigo-600" />
                  )}
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">
                      {isFirebaseSection ? "PHRS Firebase (App Platform)" : "Database Center"}
                    </h2>
                    <p className="text-xs text-slate-500 max-w-2xl mt-1">
                      {isFirebaseSection 
                        ? "Manage NoSQL document collections, user authentication schemas, storage buckets, and serverless hosting on your private VPS platform."
                        : "Manage relational schemas, NoSQL document collections, user authentication databases, cloud functions, and assets storage locally on your private VPS."
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      setHomeToast('✓ Link copied to clipboard!');
                      setTimeout(() => setHomeToast(null), 2500);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
                  >
                    <Link className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Link</span>
                  </button>
                  <button 
                    onClick={() => {
                      setHomeToast('Database Center options menu');
                      setTimeout(() => setHomeToast(null), 2000);
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Overview & Filter Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
                <span className="text-sm font-semibold text-slate-800 mr-2">Overview</span>
                
                {/* Products Filter Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsProductFilterOpen(!isProductFilterOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs text-slate-700 bg-white font-medium shadow-xs"
                  >
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <span>Products ({dbProductFilter})</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                  </button>
                  {isProductFilterOpen && (
                    <div className="absolute top-full mt-1 left-0 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-xs">
                      {['None', 'Cloud SQL', 'Firestore', 'Realtime DB', 'SQLite', 'Spanner'].map(prod => (
                        <button 
                          key={prod}
                          onClick={() => {
                            setDbProductFilter(prod);
                            setIsProductFilterOpen(false);
                            setHomeToast(`Filtered products: ${prod}`);
                            setTimeout(() => setHomeToast(null), 2000);
                          }}
                          className={`w-full text-left px-3 py-2 hover:bg-slate-50 ${dbProductFilter === prod ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'}`}
                        >
                          {prod}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Locations Filter Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsLocationFilterOpen(!isLocationFilterOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs text-slate-700 bg-white font-medium shadow-xs"
                  >
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <span>Locations ({dbLocationFilter})</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                  </button>
                  {isLocationFilterOpen && (
                    <div className="absolute top-full mt-1 left-0 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-xs">
                      {['None', 'asia-south1', 'asia-southeast1', 'us-central1', 'europe-west1'].map(loc => (
                        <button 
                          key={loc}
                          onClick={() => {
                            setDbLocationFilter(loc);
                            setIsLocationFilterOpen(false);
                            setHomeToast(`Filtered locations: ${loc}`);
                            setTimeout(() => setHomeToast(null), 2000);
                          }}
                          className={`w-full text-left px-3 py-2 hover:bg-slate-50 ${dbLocationFilter === loc ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'}`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-4 border-b border-slate-100">
                {['Project Overview', 'Authentication', 'Firestore Database', 'Realtime Database', 'Storage', 'Hosting', 'Cloud Functions'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setPhrsDbSubTab(tab)}
                    className={`px-4 py-2 rounded-t-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      phrsDbSubTab === tab
                        ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600 font-bold'
                        : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Collapsible "Check out what's new" Fleet insights banner (Screenshot 1) */}
            {isFleetBannerVisible && (!isFirebaseSection || phrsDbSubTab === 'Project Overview') && (
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in">
                {/* Banner Header */}
                <div className="px-5 py-3.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Megaphone className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Check out what's new</span>
                  </div>
                  <button 
                    onClick={() => setIsFleetBannerVisible(false)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition"
                    title="Dismiss"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Fleet Insights Accordion Trigger */}
                <div className="px-5 py-4">
                  <div 
                    onClick={() => setIsFleetBannerExpanded(!isFleetBannerExpanded)}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">Fleet insights</span>
                    <button className="text-slate-400 group-hover:text-slate-600 p-1 rounded-md transition">
                      {isFleetBannerExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Expanded Fleet Insights Card */}
                  {isFleetBannerExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Left visual representation */}
                      <div className="md:col-span-4 bg-gradient-to-br from-indigo-50/80 via-sky-50/50 to-white p-4 rounded-xl border border-indigo-100 flex flex-col justify-between h-36 relative overflow-hidden">
                        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-indigo-100 w-fit shadow-xs">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="text-[11px] font-bold text-indigo-700">Performance insights</span>
                        </div>
                        <div className="space-y-1.5 mt-2">
                          <div className="h-1.5 w-3/4 bg-indigo-200 rounded-full"></div>
                          <div className="h-1.5 w-1/2 bg-sky-200 rounded-full"></div>
                          <div className="h-1.5 w-5/6 bg-indigo-300 rounded-full"></div>
                        </div>
                        <div className="text-[9px] font-mono text-slate-500 flex justify-between items-center mt-2">
                          <span>Realtime telemetry analysis</span>
                          <span className="text-emerald-600 font-bold">Optimal</span>
                        </div>
                      </div>

                      {/* Right text description */}
                      <div className="md:col-span-8 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">Gemini-powered fleet insights</h4>
                          <span className="px-2 py-0.5 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-full">Preview</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Let Gemini proactively correlate performance shifts and inventory insights across your fleet. It can highlight hidden patterns tied to global events, deployments, or resource exhaustion across your database clusters.
                        </p>
                        <div className="pt-2 flex items-center gap-3">
                          <button 
                            onClick={() => {
                              setHomeToast('✓ Gemini Fleet Analysis: All database instances running at 99.98% efficiency.');
                              setTimeout(() => setHomeToast(null), 3500);
                            }}
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1"
                          >
                            <span>Explore fleet recommendations</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {dbSuccessMessage && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-mono">
                {dbSuccessMessage}
              </div>
            )}

            {/* SUB-TAB 1: Project Overview */}
            {phrsDbSubTab === 'Project Overview' && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">AUTH USERS</h3>
                    <div className="text-3xl font-bold text-slate-800">{phrsUsers.length} Users</div>
                    <p className="text-[10px] text-slate-500 mt-1">Status: <span className="text-emerald-600 font-bold">Active Engine</span></p>
                  </div>
                  <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">FIRESTORE COLLECTION INDEX</h3>
                    <div className="text-3xl font-bold text-slate-800">{Object.keys(firestoreCollections).length} Collections</div>
                    <p className="text-[10px] text-slate-500 mt-1">NoSQL Indexing operational</p>
                  </div>
                  <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">STORAGE MEDIA CAPACITY</h3>
                    <div className="text-3xl font-bold text-slate-800">{phrsStorageFiles.length} Uploaded Files</div>
                    <p className="text-[10px] text-slate-500 mt-1">Local SSD Space: 1.2 MB / 10 GB</p>
                  </div>
                </div>

                {/* API Request Traffic Graph Representation */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase">DB API LOG QUERY RATE (7-DAY ACTIVITY)</h3>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold font-mono">LIVE SYNC SYSTEM</span>
                  </div>
                  <div className="h-40 flex items-end justify-between gap-2 pt-6 pb-2">
                    {[
                      { day: 'Mon', count: 242 },
                      { day: 'Tue', count: 312 },
                      { day: 'Wed', count: 512 },
                      { day: 'Thu', count: 480 },
                      { day: 'Fri', count: 620 },
                      { day: 'Sat', count: 420 },
                      { day: 'Sun', count: 780 }
                    ].map((data, idx) => {
                      const maxCount = 800;
                      const heightPercent = (data.count / maxCount) * 100;
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer" onClick={() => alert(`Day: ${data.day}, API Hits: ${data.count}`)}>
                          <div className="relative w-full flex items-end justify-center h-28 bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                            <div 
                              style={{ height: `${heightPercent}%` }} 
                              className="w-full bg-indigo-600 rounded-t-md hover:bg-indigo-500 transition-all duration-500 relative"
                            >
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-mono py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap">
                                {data.count} hits
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-slate-500">{data.day}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: Authentication */}
            {phrsDbSubTab === 'Authentication' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
                {/* Left side: Add User form */}
                <div className="lg:col-span-4 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm h-fit">
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">CREATE USER ACCOUNT</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">EMAIL ADDRESS</label>
                      <input 
                        type="email" 
                        placeholder="e.g. user@phrscrowd.local" 
                        value={newAuthEmail}
                        onChange={(e) => setNewAuthEmail(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-lg border focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">PASSWORD</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        value={newAuthPassword}
                        onChange={(e) => setNewAuthPassword(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-lg border focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-900"
                      />
                    </div>
                    <button 
                      onClick={async () => {
                        if (!newAuthEmail || !newAuthPassword) {
                          alert('Email and Password are required!');
                          return;
                        }
                        try {
                          const res = await fetch('/api/auth/users', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: newAuthEmail, password: newAuthPassword })
                          });
                          const data = await res.json();
                          if (data.success) {
                            setPhrsUsers(prev => [data.user, ...prev]);
                            setVpsLogStream(prev => [...prev, `[AUTH] Registered new account: ${newAuthEmail} [${data.user.uid}]`]);
                            setNewAuthEmail('');
                            setNewAuthPassword('');
                            setHomeToast('✓ User registered successfully!');
                          }
                        } catch (e) { console.error(e); }
                        setTimeout(() => setHomeToast(null), 3000);
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2.5 rounded-lg font-semibold transition"
                    >
                      ADD USER ACCOUNT
                    </button>
                  </div>
                </div>

                {/* Right side: Users table */}
                <div className="lg:col-span-8 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase mb-4">REGISTERED USERS</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400">
                          <th className="pb-3 font-normal">EMAIL / UID</th>
                          <th className="pb-3 font-normal">CREATED</th>
                          <th className="pb-3 font-normal">STATUS</th>
                          <th className="pb-3 text-right font-normal">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-700">
                        {phrsUsers.map((user, idx) => (
                          <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50">
                            <td className="py-3">
                              <span className="font-bold block text-slate-900">{user.email}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{user.uid}</span>
                            </td>
                            <td className="py-3">{user.created}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="py-3 text-right space-x-2">
                              <button 
                                onClick={async () => {
                                  const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
                                  try {
                                    await fetch('/api/auth/users/status', {
                                      method: 'POST',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ uid: user.uid, status: newStatus })
                                    });
                                    setPhrsUsers(prev => prev.map(u => u.uid === user.uid ? { ...u, status: newStatus } : u));
                                    setVpsLogStream(prev => [...prev, `[AUTH] Toggled status for account ${user.email}`]);
                                  } catch (e) { console.error(e); }
                                }}
                                className="text-indigo-600 hover:underline"
                              >
                                Toggle
                              </button>
                              <button 
                                onClick={async () => {
                                  if (confirm(`Are you sure you want to delete ${user.email}?`)) {
                                    try {
                                      await fetch(`/api/auth/users/${user.uid}`, { method: 'DELETE' });
                                      setPhrsUsers(prev => prev.filter(u => u.uid !== user.uid));
                                      setVpsLogStream(prev => [...prev, `[AUTH] Deleted account: ${user.email}`]);
                                    } catch (e) { console.error(e); }
                                  }
                                }}
                                className="text-rose-500 hover:underline"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: Firestore Database */}
            {phrsDbSubTab === 'Firestore Database' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
                {/* Collections Column */}
                <div className="lg:col-span-3 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                    <span className="font-mono font-bold text-[10px] text-slate-400 tracking-wider">COLLECTIONS</span>
                    <button 
                      onClick={() => setIsCreatingCollection(true)} 
                      className="p-1 hover:bg-slate-100 text-indigo-600 rounded"
                      title="New Collection"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {isCreatingCollection && (
                    <div className="mb-4 p-2.5 border border-indigo-100 bg-indigo-50/20 rounded-lg space-y-2">
                      <input 
                        type="text" 
                        placeholder="collection_name" 
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                        className="w-full p-1.5 text-xs rounded border bg-white text-slate-800"
                      />
                      <div className="flex justify-end gap-1.5 text-[10px]">
                        <button onClick={() => setIsCreatingCollection(false)} className="px-2 py-1 text-slate-500">Cancel</button>
                        <button 
                          onClick={async () => {
                            if (!newCollectionName) return;
                            try {
                              await fetch('/api/db/collections', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ name: newCollectionName })
                              });
                              setRealCollections(prev => [...prev, newCollectionName]);
                              setSelectedCollection(newCollectionName);
                              setNewCollectionName('');
                              setIsCreatingCollection(false);
                              setVpsLogStream(prev => [...prev, `[FIRESTORE] Created collection /${newCollectionName}`]);
                            } catch (e) { console.error(e); }
                          }} 
                          className="px-2 py-1 bg-indigo-600 text-white rounded font-bold"
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    {realCollections.map(col => (
                      <button 
                        key={col} 
                        onClick={() => {
                          setSelectedCollection(col);
                          setSelectedDocId('');
                        }}
                        className={`w-full text-left font-mono text-xs p-2 rounded-lg transition-colors flex items-center justify-between ${selectedCollection === col ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <span>/{col}</span>
                        <span className="text-[10px] text-slate-400"></span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Documents Column */}
                <div className="lg:col-span-3 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                    <span className="font-mono font-bold text-[10px] text-slate-400 tracking-wider">DOCUMENTS</span>
                    <button 
                      onClick={() => setIsCreatingDoc(true)} 
                      className="p-1 hover:bg-slate-100 text-indigo-600 rounded"
                      title="New Document"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {isCreatingDoc && (
                    <div className="mb-4 p-2.5 border border-indigo-100 bg-indigo-50/20 rounded-lg space-y-2">
                      <input 
                        type="text" 
                        placeholder="document_id" 
                        value={newDocId}
                        onChange={(e) => setNewDocId(e.target.value)}
                        className="w-full p-1.5 text-xs rounded border bg-white text-slate-800"
                      />
                      <div className="flex justify-end gap-1.5 text-[10px]">
                        <button onClick={() => setIsCreatingDoc(false)} className="px-2 py-1 text-slate-500">Cancel</button>
                        <button 
                          onClick={async () => {
                            if (!newDocId) return;
                            try {
                                await fetch(`/api/db/collections/${selectedCollection}/docs`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ id: newDocId, data: {} })
                                });
                                fetchDocs(selectedCollection);
                                setSelectedDocId(newDocId);
                                setNewDocId('');
                                setIsCreatingDoc(false);
                            } catch(e) { console.error(e); }
                          }} 
                          className="px-2 py-1 bg-indigo-600 text-white rounded font-bold"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    {selectedCollection && Object.keys(realDocsData).map(docId => (
                      <button 
                        key={docId} 
                        onClick={() => setSelectedDocId(docId)}
                        className={`w-full text-left font-mono text-xs p-2 rounded-lg transition-colors flex items-center justify-between ${selectedDocId === docId ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <span className="truncate">{docId}</span>
                        <span 
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (confirm(`Delete document ${docId}?`)) {
                                try {
                                    await fetch(`/api/db/collections/${selectedCollection}/docs/${docId}`, { method: 'DELETE' });
                                    fetchDocs(selectedCollection);
                                    setSelectedDocId('');
                                } catch(e) { console.error(e); }
                            }
                          }}
                          className="text-rose-400 hover:text-rose-600 text-[10px] cursor-pointer"
                        >
                          Delete
                        </span>
                      </button>
                    ))}
                    {(!selectedCollection || Object.keys(realDocsData).length === 0) && (
                      <p className="text-[10px] text-slate-400 italic text-center py-4">No documents</p>
                    )}
                  </div>
                </div>

                {/* Data Fields Column */}
                <div className="lg:col-span-6 p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-mono font-bold text-[10px] text-slate-400 tracking-wider">FIELDS / DOCUMENT PROPERTIES</span>
                    <span className="text-[10px] font-mono font-bold text-slate-500">/{selectedCollection}/{selectedDocId}</span>
                  </div>

                  {selectedCollection && selectedDocId ? (
                    <div className="space-y-3 font-mono text-xs">
                      {/* Document fields view */}
                      {(() => {
                        const activeDoc = realDocsData[selectedDocId];
                        if (!activeDoc) return <p className="text-slate-400 italic">Empty document data.</p>;
                        
                        return (
                          <div className="space-y-2">
                            {Object.entries(activeDoc).map(([key, val]) => (
                              <div key={key} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                                <div>
                                  <span className="text-indigo-600 font-bold">"{key}"</span>
                                  <span className="text-slate-400 px-1">:</span>
                                  <span className="text-slate-800 font-semibold">{JSON.stringify(val)}</span>
                                </div>
                                <button 
                                  onClick={async () => {
                                      const updatedData = { ...activeDoc };
                                      delete updatedData[key];
                                      try {
                                          await fetch(`/api/db/collections/${selectedCollection}/docs`, {
                                              method: 'POST',
                                              headers: { 'Content-Type': 'application/json' },
                                              body: JSON.stringify({ id: selectedDocId, data: updatedData })
                                          });
                                          fetchDocs(selectedCollection);
                                      } catch (e) { console.error(e); }
                                  }}
                                  className="text-[10px] text-rose-500 hover:underline"
                                >
                                  Delete
                                </button>
                              </div>
                            ))}

                            {/* Add Field Section */}
                            <div className="pt-4 border-t border-slate-100">
                              <h4 className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2">ADD FIELD DATA</h4>
                              <div className="flex gap-2">
                                <input 
                                  id="new_field_key" 
                                  type="text" 
                                  placeholder="field_key" 
                                  className="flex-1 p-2 border rounded text-xs bg-slate-50 text-slate-800 font-mono" 
                                />
                                <input 
                                  id="new_field_val" 
                                  type="text" 
                                  placeholder="field_value" 
                                  className="flex-1 p-2 border rounded text-xs bg-slate-50 text-slate-800 font-mono" 
                                />
                                <button 
                                  onClick={async () => {
                                    const keyEl = document.getElementById('new_field_key') as HTMLInputElement;
                                    const valEl = document.getElementById('new_field_val') as HTMLInputElement;
                                    if (!keyEl || !valEl || !keyEl.value || !valEl.value) {
                                      alert('Field key and value are required!');
                                      return;
                                    }
                                    let parsedVal: any = valEl.value;
                                    if (parsedVal === 'true') parsedVal = true;
                                    else if (parsedVal === 'false') parsedVal = false;
                                    else if (!isNaN(Number(parsedVal))) parsedVal = Number(parsedVal);

                                    const updatedData = { ...realDocsData[selectedDocId], [keyEl.value]: parsedVal };
                                    try {
                                        await fetch(`/api/db/collections/${selectedCollection}/docs`, {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ id: selectedDocId, data: updatedData })
                                        });
                                        fetchDocs(selectedCollection);
                                        setVpsLogStream(prev => [...prev, `[FIRESTORE] Added field "${keyEl.value}" = ${JSON.stringify(parsedVal)} to /${selectedCollection}/${selectedDocId}`]);
                                        keyEl.value = '';
                                        valEl.value = '';
                                    } catch (e) { console.error(e); }
                                  }}
                                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded font-bold text-xs font-mono"
                                >
                                  ADD
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-center py-12">Select a document from the left list to view and manage its data fields.</p>
                  )}
                </div>
              </div>
            )}

            {/* SUB-TAB 4: Realtime Database (Original tree view / raw text implementation) */}
            {phrsDbSubTab === 'Realtime Database' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
                {/* Left sidebar database keys additions */}
                <div className="lg:col-span-4 space-y-6">
                  
                  <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
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
                        onClick={async () => {
                          const defaultSeed = {
                            "users": {
                              "usr_9812": { "name": "Master Admin", "role": "admin", "verified": true, "phone": "+91 98765 43210" }
                            },
                            "settings": { "maintenance_mode": false }
                          };
                          try {
                            await fetch('/api/db/realtime', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(defaultSeed)
                            });
                            setDbData(defaultSeed);
                            setVpsLogStream(prev => [...prev, '[SQLITE] Reset database database schema. Seeding complete.']);
                            setHomeToast('✓ Database reset to defaults!');
                          } catch (e) { console.error(e); }
                          setTimeout(() => setHomeToast(null), 3000);
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
                              <div className="flex items-center gap-1.5 w-full justify-start pl-2 py-1">
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
                                  <div key={childKey} className={`flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono py-2 px-2.5 rounded gap-2 transition ${isDarkMode ? 'bg-slate-950/40 hover:bg-slate-950/60' : 'bg-slate-100 hover:bg-slate-200/60 text-slate-800'}`}>
                                    <div className="flex flex-wrap items-center gap-1.5 break-all">
                                      <span className="text-amber-500 font-bold">"{childKey}"</span>
                                      <span className="text-slate-500">:</span>
                                      <span className="text-emerald-400 font-semibold break-all">
                                        {JSON.stringify(dbData[parentKey][childKey])}
                                      </span>
                                    </div>
                                    <button 
                                      onClick={() => handleDeleteDbNode(parentKey, childKey)}
                                      className="p-1 hover:bg-rose-500/10 text-rose-400 rounded transition self-end sm:self-center"
                                      title="Delete node"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
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
            )}

            {/* SUB-TAB 5: Storage */}
            {phrsDbSubTab === 'Storage' && (
              <div className="space-y-6 animate-fade-in">
                {/* Drag-and-drop panel */}
                <div 
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingFile(true);
                  }}
                  onDragLeave={() => setIsDraggingFile(false)}
                   onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingFile(false);
                    const files = e.dataTransfer.files;
                    if (files.length > 0) {
                      uploadStorageFile(files[0]);
                    }
                  }}
                  className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all ${isDraggingFile ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                >
                  <Upload className="w-10 h-10 text-indigo-500 mb-3" />
                  <p className="text-sm font-semibold text-slate-800">Drag and drop file here or click to upload</p>
                  <p className="text-xs text-slate-500 mt-1">Supports any asset file, configurations, backups, or mobile screenshots</p>
                  
                  {/* File input click trigger */}
                  <input 
                    type="file" 
                    id="vps_file_upload_input" 
                    className="hidden" 
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        uploadStorageFile(files[0]);
                      }
                    }}
                  />
                  <button 
                    onClick={() => document.getElementById('vps_file_upload_input')?.click()}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold font-mono"
                  >
                    SELECT FILE MANUALLY
                  </button>
                </div>

                {/* Storage Files Table */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase mb-4">UPLOADED ASSETS</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400">
                          <th className="pb-3 font-normal">FILE NAME</th>
                          <th className="pb-3 font-normal">SIZE</th>
                          <th className="pb-3 font-normal">TYPE</th>
                          <th className="pb-3 font-normal">UPLOAD DATE</th>
                          <th className="pb-3 text-right font-normal">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-700">
                        {phrsStorageFiles.map((file, idx) => (
                          <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50">
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <FileCode className="w-4 h-4 text-indigo-500" />
                                <span className="font-bold text-slate-900">{file.name}</span>
                              </div>
                            </td>
                            <td className="py-3">{file.size}</td>
                            <td className="py-3 uppercase text-[10px] text-slate-500">{file.type}</td>
                            <td className="py-3">{file.uploaded}</td>
                             <td className="py-3 text-right space-x-2">
                              <button 
                                onClick={() => {
                                  window.open(`/api/storage/buckets/phrs_default_storage/files/${file.name}/download`);
                                  setVpsLogStream(prev => [...prev, `[STORAGE] Download triggered for ${file.name}`]);
                                }}
                                className="text-indigo-600 hover:underline"
                              >
                                Download
                              </button>
                              <button 
                                onClick={async () => {
                                  if (confirm(`Delete asset "${file.name}"?`)) {
                                    try {
                                      await fetch(`/api/storage/buckets/phrs_default_storage/files/${file.name}`, { method: 'DELETE' });
                                      setPhrsStorageFiles(prev => prev.filter(f => f.name !== file.name));
                                      setVpsLogStream(prev => [...prev, `[STORAGE] Deleted asset: ${file.name}`]);
                                    } catch (e) { console.error(e); }
                                  }
                                }}
                                className="text-rose-500 hover:underline"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 6: Hosting */}
            {phrsDbSubTab === 'Hosting' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
                {/* Deployment Console */}
                <div className="lg:col-span-7 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase">PHRS CLOUD DEPLOYMENT CONSOLE</h3>
                    <div className="flex items-center gap-1.5 w-full justify-start pl-2 py-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[10px] font-mono font-bold text-emerald-600">SERVER READY</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 font-mono mb-1">TARGET FILENAME (e.g. index.html)</label>
                      <input 
                        type="text"
                        value={hostFileName}
                        onChange={(e) => setHostFileName(e.target.value)}
                        className="w-full p-2 text-xs font-mono rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="my-page.html"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 font-mono mb-1">SOURCE CODE / FILE CONTENT</label>
                      <textarea 
                        rows={12}
                        value={hostContent}
                        onChange={(e) => setHostContent(e.target.value)}
                        className="w-full p-3 font-mono text-[11px] rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Paste your HTML/CSS/JS here..."
                      />
                    </div>

                    <button 
                      onClick={handleDeployFile}
                      disabled={isDeploying}
                      className={`w-full py-3 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg ${
                        isDeploying ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      {isDeploying ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          DEPLOYING ASSET...
                        </>
                      ) : (
                        <>
                          <Cloud className="w-4 h-4" />
                          DEPLOY TO PHRS CLOUD
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Status & Output */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                    <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase">DEPLOYMENT STATUS</h3>
                    
                    {deployedUrl ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-emerald-900">SUCCESSFULLY DEPLOYED</p>
                            <p className="text-[10px] text-emerald-700 mt-1">Your file is now live on the PHRS Crowd global network.</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-slate-500 font-mono">PUBLIC ACCESS URL</label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="text" 
                              readOnly 
                              value={window.location.origin + deployedUrl}
                              className="flex-1 p-2 text-[10px] font-mono rounded-lg border bg-slate-50 border-slate-200 text-indigo-600"
                            />
                            <a 
                              href={deployedUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 font-mono text-[9px] text-slate-500">
                          <p>Node: PHRS-ASIA-SE1</p>
                          <p>Latency: 24ms</p>
                          <p>Protocol: HTTP/1.1 (Static)</p>
                        </div>
                      </div>
                    ) : (
                      <label className={`flex flex-col items-center justify-center py-10 text-center space-y-3 cursor-pointer transition rounded-xl border-2 border-dashed relative ${isDeploying ? 'bg-slate-50 border-slate-200' : 'hover:bg-indigo-50/50 border-slate-300 hover:border-indigo-300'}`}>
                        <input 
                          type="file" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                          disabled={isDeploying}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            
                            setIsDeploying(true);
                            setVpsLogStream(prev => [...prev, `[HOSTING] Reading file: ${file.name} (${Math.round(file.size / 1024)}KB)`]);
                            
                            const reader = new FileReader();
                            reader.onload = async (event) => {
                              try {
                                const result = event.target?.result as string;
                                let content = result;
                                let isBase64 = false;
                                
                                if (result.startsWith('data:')) {
                                  content = result.split(',')[1];
                                  isBase64 = true;
                                }
                                
                                const res = await fetch('/api/host/deploy', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ fileName: file.name, content, isBase64 })
                                });
                                
                                const data = await res.json();
                                if (data.success) {
                                  setDeployedUrl(data.url);
                                  setHomeToast(`✓ File deployed successfully to ${data.url}`);
                                  setVpsLogStream(prev => [...prev, `[HOSTING] New asset deployed: ${file.name} -> ${data.url}`]);
                                } else {
                                  throw new Error(data.error || 'Deployment failed');
                                }
                              } catch (err: any) {
                                setHomeToast(`❌ Deployment failed: ${err.message}`);
                                setVpsLogStream(prev => [...prev, `[HOSTING] Error: ${err.message}`]);
                              } finally {
                                setIsDeploying(false);
                                setTimeout(() => setHomeToast(null), 3000);
                              }
                            };
                            reader.onerror = () => {
                              setIsDeploying(false);
                              setHomeToast('❌ Failed to read file.');
                            };
                            
                            if (file.type.startsWith('text/') || file.name.endsWith('.json') || file.name.endsWith('.md')) {
                                reader.readAsText(file);
                            } else {
                                reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDeploying ? 'bg-indigo-100' : 'bg-slate-100 group-hover:bg-indigo-100'}`}>
                          {isDeploying ? <RefreshCw className="w-6 h-6 text-indigo-500 animate-spin" /> : <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-500" />}
                        </div>
                        <div className="text-xs font-mono">
                          {isDeploying ? (
                            <span className="text-indigo-500 font-bold">Uploading & Deploying...</span>
                          ) : (
                            <>
                              <span className="text-slate-500">No active deployment detected.</span><br/>
                              <span className="text-indigo-500 font-bold">Click or drag a file to start hosting.</span>
                            </>
                          )}
                        </div>
                      </label>
                    )}
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-900 shadow-xl space-y-3">
                    <div className="flex items-center gap-2 text-white">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-mono font-bold tracking-widest">HOSTING_LOGS</span>
                    </div>
                    <div className="font-mono text-[9px] text-slate-300 space-y-1 h-32 overflow-y-auto">
                      <p className="text-emerald-400">[SYSTEM] Hosting engine initialized...</p>
                      <p>[SYSTEM] Static directory binding: /dist/hosted</p>
                      {vpsLogStream.filter(log => log.includes('[HOSTING]')).map((log, i) => (
                        <p key={i}>{log}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 7: Cloud Functions */}
            {phrsDbSubTab === 'Cloud Functions' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
                {/* List of Functions */}
                <div className="lg:col-span-4 p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">
                  <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase">ACTIVE TRIGGERS</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'onUserCreated', type: 'Auth Trigger', status: 'Active' },
                      { name: 'sendSmsVerify', type: 'HTTP Trigger', status: 'Active' },
                      { name: 'syncLocalDatabase', type: 'Database Trigger', status: 'Active' }
                    ].map((fn, idx) => (
                      <div key={idx} className="p-3 border border-slate-100 bg-slate-50 rounded-lg flex justify-between items-center">
                        <div>
                          <span className="font-mono text-xs font-bold text-slate-800 block">{fn.name}()</span>
                          <span className="text-[9px] text-slate-400 font-mono uppercase">{fn.type}</span>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" title="Operational"></span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* execution playground & execution log screen */}
                <div className="lg:col-span-8 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                  <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase">EXECUTION PLAYGROUND</h3>
                  <p className="text-xs text-slate-500">Inject JSON test payloads directly into your cloud functions runtime environment and view instant log traces below.</p>
                  
                  <div className="space-y-4 font-mono text-xs">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">TARGET FUNCTION TO RUN</label>
                      <select id="play_function_select" className="w-full p-2 border rounded-lg cursor-pointer bg-slate-50 text-slate-800 font-mono">
                        <option value="onUserCreated">onUserCreated(uid, email)</option>
                        <option value="sendSmsVerify">sendSmsVerify(phone, code)</option>
                        <option value="syncLocalDatabase">syncLocalDatabase(payload)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">TEST PAYLOAD (JSON FORMAT)</label>
                      <textarea id="play_payload_input" rows={3} defaultValue={`{\n  "uid": "usr_9812",\n  "email": "test@phrscrowd.local",\n  "timestamp": "${new Date().toISOString()}"\n}`} className="w-full p-2 border rounded-lg bg-slate-50 text-slate-800 font-mono" />
                    </div>

                    <button 
                      onClick={() => {
                        const fnSelect = document.getElementById('play_function_select') as HTMLSelectElement;
                        const payloadInput = document.getElementById('play_payload_input') as HTMLTextAreaElement;
                        const logsScreen = document.getElementById('play_logs_screen');
                        if (!fnSelect || !payloadInput || !logsScreen) return;

                        let payloadObj = {};
                        try {
                          payloadObj = JSON.parse(payloadInput.value);
                        } catch (err) {
                          alert('Invalid JSON Payload!');
                          return;
                        }

                        // Trigger visual log trace
                        const timestamp = new Date().toLocaleTimeString();
                        const newLogs = [
                          `[${timestamp}] [FUNC-EXEC] Starting function "${fnSelect.value}"...`,
                          `[${timestamp}] [FUNC-LOG] Payload size: ${JSON.stringify(payloadObj).length} bytes`,
                          `[${timestamp}] [FUNC-LOG] Initializing secure SQLite schema lock...`,
                          `[${timestamp}] [FUNC-LOG] Executed query: INSERT INTO phrs_audit_logs VALUES(...)`,
                          `[${timestamp}] [FUNC-EXEC] SUCCESS: function "${fnSelect.value}" execution completed. Status code: 200`
                        ];

                        logsScreen.innerHTML = newLogs.map(l => `<p class="flex gap-2"><span class="text-slate-500">${l.substring(0, 10)}</span> <span class="text-emerald-400 font-bold">${l.substring(11)}</span></p>`).join('');
                        setVpsLogStream(prev => [...prev, `[FUNC] Executed serverless trigger: ${fnSelect.value}()`]);
                        setHomeToast('✓ Function executed successfully!');
                        setTimeout(() => setHomeToast(null), 3000);
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2 rounded-lg font-semibold transition"
                    >
                      EXECUTE TRIGGER RUN
                    </button>

                    {/* Console Output logs screen */}
                    <div className="pt-2">
                      <label className="block text-[10px] text-slate-400 mb-1 font-bold">TERMINAL TRACE STREAM</label>
                      <div id="play_logs_screen" className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-[10px] font-mono text-slate-300 h-32 overflow-y-auto leading-relaxed">
                        <p className="text-slate-500">// Terminal output will stream here during execution...</p>
                      </div>
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
