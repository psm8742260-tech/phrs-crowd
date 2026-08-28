import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function ApiBoardTab({ state }: { state: any }) {
  const { isAutoInternetEnabled, setIsAutoInternetEnabled, isDarkMode, setIsDarkMode, isAuthenticated, setIsAuthenticated, loginView, setLoginView, appIconUrl, setAppIconUrl, pkgName, setPkgName, shaFingerprint, setShaFingerprint, activeTab, setActiveTab, snippetFormat, setSnippetFormat, projects, setProjects, selectedProjectId, setSelectedProjectId, newProjName, setNewProjName, showNewProjModal, setShowNewProjModal, showUpiModal, setShowUpiModal, searchQuery, setSearchQuery, notifications, setNotifications, showNotifications, setShowNotifications, metrics, setMetrics, cpuHistory, setCpuHistory, vpsLogStream, setVpsLogStream, isMiniServerRunning, setIsMiniServerRunning, miniServerPort, setMiniServerPort, miniServerIp, setMiniServerIp, terminalHistory, setTerminalHistory, terminalInput, setTerminalInput, stealthDataBalanceMb, setStealthDataBalanceMb, stealthSmsCredits, setStealthSmsCredits, stealthWalletRupees, setStealthWalletRupees, showStandaloneBanner, setShowStandaloneBanner, localServerIpInput, setLocalServerIpInput, dbData, setDbData, dbRawText, setDbRawText, isRawDbView, setIsRawDbView, dbSuccessMessage, setDbSuccessMessage, isSyncingDb, setIsSyncingDb, dbKeyPath, setDbKeyPath, dbNewVal, setDbNewVal, deployments, setDeployments, githubUrl, setGithubUrl, appName, setAppName, appPort, setAppPort, appTech, setAppTech, buildLogs, setBuildLogs, isBuilding, setIsBuilding, buildProgress, setBuildProgress, activeVirtualApp, setActiveVirtualApp, simulatedVisitorCount, setSimulatedVisitorCount, smartRouteModal, setSmartRouteModal, shortLinks, setShortLinks, linkSlug, setLinkSlug, linkTarget, setLinkTarget, hostFileName, setHostFileName, hostContent, setHostContent, deployedUrl, setDeployedUrl, isDeploying, setIsDeploying, hostedHtml, setHostedHtml, smsGateway, setSmsGateway, smsApiKey, setSmsApiKey, smsAccountSid, setSmsAccountSid, smsSenderId, setSmsSenderId, smsTemplate, setSmsTemplate, testPhoneNumber, setTestPhoneNumber, isSendingOtp, setIsSendingOtp, lastGeneratedOtp, setLastGeneratedOtp, verificationInput, setVerificationInput, verificationStatus, setVerificationStatus, virtualPhoneNotification, setVirtualPhoneNotification, phoneScreenOn, setPhoneScreenOn, apiKeys, setApiKeys, isRoutingActive, setIsRoutingActive, routingHistory, setRoutingHistory, activeRouterPrompt, setActiveRouterPrompt, activeRouterModel, setActiveRouterModel, isRoutingLoading, setIsRoutingLoading, activeExportFile, setActiveExportFile, billingBudget, setBillingBudget, billingAlertAmount, setBillingAlertAmount, billingAlertEmail, setBillingAlertEmail, billingSubTab, setBillingSubTab, envTranslationMappings, setEnvTranslationMappings, secretManagerSubTab, setSecretManagerSubTab, iamMembers, setIamMembers, newMemberEmail, setNewMemberEmail, newMemberRole, setNewMemberRole, selectedMarketplaceApp, setSelectedMarketplaceApp, customSystemPrompt, setCustomSystemPrompt, agentChatInput, setAgentChatInput, agentChatHistory, setAgentChatHistory, k8sPods, setK8sPods, buckets, setBuckets, newBucketName, setNewBucketName, storageFiles, setStorageFiles, uploadFileName, setUploadFileName, uploadTargetBucket, setUploadTargetBucket, isUploading, setIsUploading, firewallPolicy, setFirewallPolicy, sslStatus, setSslStatus, generatedKeyPair, setGeneratedKeyPair, bqQuery, setBqQuery, bqResults, setBqResults, bqRunning, setBqRunning, monitorUptime, setMonitorUptime, activeAlerts, setActiveAlerts, isHybridDevMode, setIsHybridDevMode, isAiServerBypassed, setIsAiServerBypassed, remoteNodeIp, setRemoteNodeIp, deviceSerial, setDeviceSerial, deepseekApiKey, setDeepseekApiKey, showAdminPortal, setShowAdminPortal, isAdminGmailVerified, setIsAdminGmailVerified, adminGmail, setAdminGmail, isVerifyingGmail, setIsVerifyingGmail, uploadedZipName, setUploadedZipName, zipFile, setZipFile, isUploadingZip, setIsUploadingZip, zipUploadProgress, setZipUploadProgress, isCompiling, setIsCompiling, compilationProgress, setCompilationProgress, compilationLogs, setCompilationLogs, tempRemoteNodeIp, setTempRemoteNodeIp, tempDeviceSerial, setTempDeviceSerial, tempDeepseekApiKey, setTempDeepseekApiKey, cloudRunImage, setCloudRunImage, cloudRunEnvVars, setCloudRunEnvVars, revisionTraffic, setRevisionTraffic, subnets, setSubnets, firewallRules, setFirewallRules, newSubnetName, setNewSubnetName, newSubnetRange, setNewSubnetRange, newFireRuleName, setNewFireRuleName, newFireRulePort, setNewFireRulePort, newFireRuleRange, setNewFireRuleRange, newFireRuleAction, setNewFireRuleAction, vpcSubTab, setVpcSubTab, ipInventory, setIpInventory, deviceCarrierIp, setDeviceCarrierIp, networkLatency, setNetworkLatency, mobileIp, setMobileIp, isBridgeActive, setIsBridgeActive, isAdminAuthorized, setIsAdminAuthorized, adminPasswordInput, setAdminPasswordInput, showAuthModal, setShowAuthModal, modificationCount, setModificationCount, showSystemRules, setShowSystemRules, ruleCountdown, setRuleCountdown, protocolStep, setProtocolStep, sqlTables, setSqlTables, newTableName, setNewTableName, newTableCols, setNewTableCols, sqlBackups, setSqlBackups, mapsApiKey, setMapsApiKey, mapsSelectedEndpoint, setMapsSelectedEndpoint, mapsActiveTrackingId, setMapsActiveTrackingId, isSidebarOpen, setIsSidebarOpen, expandedSection, setExpandedSection, selectedSubMenu, setSelectedSubMenu, agents, setAgents, selectedAgentId, setSelectedAgentId, newAgentName, setNewAgentName, newAgentModel, setNewAgentModel, newAgentPrompt, setNewAgentPrompt, agentPlatformSubTab, setAgentPlatformSubTab, securitySubTab, setSecuritySubTab, cloudStorageSubTab, setCloudStorageSubTab, monitoringSubTab, setMonitoringSubTab, iamSubTab, setIamSubTab, apisSubTab, setApisSubTab, cloudRunSubTab, setCloudRunSubTab, cloudHubSubTab, setCloudHubSubTab, phrsMapsSubTab, setPhrsMapsSubTab, bigQuerySubTab, setBigQuerySubTab, phrsDbSubTab, setPhrsDbSubTab, cloudRunJobs, setCloudRunJobs, isCreatingJob, setIsCreatingJob, newJobName, setNewJobName, newJobSchedule, setNewJobSchedule, workerPools, setWorkerPools, isCreatingPool, setIsCreatingPool, newPoolName, setNewPoolName, domainMappings, setDomainMappings, selectedDomain, setSelectedDomain, domainFilterQuery, setDomainFilterQuery, isCreatingDomain, setIsCreatingDomain, newDomainName, setNewDomainName, newDomainService, setNewDomainService, newDomainType, setNewDomainType, isFleetBannerVisible, setIsFleetBannerVisible, isFleetBannerExpanded, setIsFleetBannerExpanded, dbProductFilter, setDbProductFilter, dbLocationFilter, setDbLocationFilter, isProductFilterOpen, setIsProductFilterOpen, isLocationFilterOpen, setIsLocationFilterOpen, phrsUsers, setPhrsUsers, newAuthEmail, setNewAuthEmail, newAuthPassword, setNewAuthPassword, firestoreCollections, setFirestoreCollections, selectedCollection, setSelectedCollection, selectedDocId, setSelectedDocId, isCreatingCollection, setIsCreatingCollection, newCollectionName, setNewCollectionName, isCreatingDoc, setIsCreatingDoc, newDocId, setNewDocId, phrsStorageFiles, setPhrsStorageFiles, isDraggingFile, setIsDraggingFile, deepScanTimer, setDeepScanTimer, isAtomicScanning, setIsAtomicScanning, atomicLogs, setAtomicLogs, homeSubTab, setHomeSubTab, isWelcomeBoardOpen, setIsWelcomeBoardOpen, homeToast, setHomeToast, agentSearchQuery, setAgentSearchQuery, dashboardAgentChatHistory, setDashboardAgentChatHistory, isAgentPanelOpen, setIsAgentPanelOpen, isAgentThinking, setIsAgentThinking, agentModuleMode, setAgentModuleMode, agentImagePrompt, setAgentImagePrompt, agentCodeLanguage, setAgentCodeLanguage, handleTerminalSubmit, handleNetworkChange, handleAgentSubmit, handlePhotoGeneratorClick, handleCodeGeneratorClick, handleCreateProject, handleUpdateRawDb, handleAddDbNode, handleDeleteDbNode, handleSyncDatabase, handleStartDeployment, handleCreateShortLink, handleSendTestSms, handleVerifyOtp, handleSectionClick, handleSubMenuClick, handleTestAIRoute } = state;
  const { Key } = LucideIcons;
  return (
        <>
          <div className="space-y-6 animate-fade-in">
            <div className={`p-6 rounded-2xl border transition shadow-sm ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Key className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">APIs & Services</h2>
                    <p className="text-xs text-slate-500 max-w-2xl mt-1">
                      Manage and monitor all APIs and credentials used by the PHRS CROWD ecosystem.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-4 border-b border-slate-100">
                {['Enabled APIs & services', 'Library', 'Credentials', 'OAuth consent screen', 'Page usage agreements'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setApisSubTab(tab)}
                    className={`px-4 py-2 rounded-t-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      apisSubTab === tab
                        ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                        : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {apisSubTab === 'Enabled APIs & services' && (
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
                          <span className="text-amber-500 font-bold">&quot;{item.prompt}&quot;</span>
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
            )}

            {apisSubTab !== 'Enabled APIs & services' && (
              <div className="p-12 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-white">
                <Key className="w-8 h-8 mb-3 opacity-20" />
                <p className="text-sm font-mono italic">{apisSubTab} management interface is configured and ready.</p>
              </div>
            )}

          </div>
        </>
  );
}
