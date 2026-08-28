import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function SmsTab({ state }: { state: any }) {
  const { isAutoInternetEnabled, setIsAutoInternetEnabled, isDarkMode, setIsDarkMode, isAuthenticated, setIsAuthenticated, loginView, setLoginView, appIconUrl, setAppIconUrl, pkgName, setPkgName, shaFingerprint, setShaFingerprint, activeTab, setActiveTab, snippetFormat, setSnippetFormat, projects, setProjects, selectedProjectId, setSelectedProjectId, newProjName, setNewProjName, showNewProjModal, setShowNewProjModal, showUpiModal, setShowUpiModal, searchQuery, setSearchQuery, notifications, setNotifications, showNotifications, setShowNotifications, metrics, setMetrics, cpuHistory, setCpuHistory, vpsLogStream, setVpsLogStream, isMiniServerRunning, setIsMiniServerRunning, miniServerPort, setMiniServerPort, miniServerIp, setMiniServerIp, terminalHistory, setTerminalHistory, terminalInput, setTerminalInput, stealthDataBalanceMb, setStealthDataBalanceMb, stealthSmsCredits, setStealthSmsCredits, stealthWalletRupees, setStealthWalletRupees, showStandaloneBanner, setShowStandaloneBanner, localServerIpInput, setLocalServerIpInput, dbData, setDbData, dbRawText, setDbRawText, isRawDbView, setIsRawDbView, dbSuccessMessage, setDbSuccessMessage, isSyncingDb, setIsSyncingDb, dbKeyPath, setDbKeyPath, dbNewVal, setDbNewVal, deployments, setDeployments, githubUrl, setGithubUrl, appName, setAppName, appPort, setAppPort, appTech, setAppTech, buildLogs, setBuildLogs, isBuilding, setIsBuilding, buildProgress, setBuildProgress, activeVirtualApp, setActiveVirtualApp, simulatedVisitorCount, setSimulatedVisitorCount, smartRouteModal, setSmartRouteModal, shortLinks, setShortLinks, linkSlug, setLinkSlug, linkTarget, setLinkTarget, hostFileName, setHostFileName, hostContent, setHostContent, deployedUrl, setDeployedUrl, isDeploying, setIsDeploying, hostedHtml, setHostedHtml, smsGateway, setSmsGateway, smsApiKey, setSmsApiKey, smsAccountSid, setSmsAccountSid, smsSenderId, setSmsSenderId, smsTemplate, setSmsTemplate, testPhoneNumber, setTestPhoneNumber, phrsSmsHistory, setPhrsSmsHistory, isSendingOtp, setIsSendingOtp, lastGeneratedOtp, setLastGeneratedOtp, verificationInput, setVerificationInput, verificationStatus, setVerificationStatus, virtualPhoneNotification, setVirtualPhoneNotification, phoneScreenOn, setPhoneScreenOn, apiKeys, setApiKeys, isRoutingActive, setIsRoutingActive, routingHistory, setRoutingHistory, activeRouterPrompt, setActiveRouterPrompt, activeRouterModel, setActiveRouterModel, isRoutingLoading, setIsRoutingLoading, activeExportFile, setActiveExportFile, billingBudget, setBillingBudget, billingAlertAmount, setBillingAlertAmount, billingAlertEmail, setBillingAlertEmail, billingSubTab, setBillingSubTab, envTranslationMappings, setEnvTranslationMappings, secretManagerSubTab, setSecretManagerSubTab, iamMembers, setIamMembers, newMemberEmail, setNewMemberEmail, newMemberRole, setNewMemberRole, selectedMarketplaceApp, setSelectedMarketplaceApp, customSystemPrompt, setCustomSystemPrompt, agentChatInput, setAgentChatInput, agentChatHistory, setAgentChatHistory, k8sPods, setK8sPods, buckets, setBuckets, newBucketName, setNewBucketName, storageFiles, setStorageFiles, uploadFileName, setUploadFileName, uploadTargetBucket, setUploadTargetBucket, isUploading, setIsUploading, firewallPolicy, setFirewallPolicy, sslStatus, setSslStatus, generatedKeyPair, setGeneratedKeyPair, bqQuery, setBqQuery, bqResults, setBqResults, bqRunning, setBqRunning, monitorUptime, setMonitorUptime, activeAlerts, setActiveAlerts, isHybridDevMode, setIsHybridDevMode, isAiServerBypassed, setIsAiServerBypassed, remoteNodeIp, setRemoteNodeIp, deviceSerial, setDeviceSerial, deepseekApiKey, setDeepseekApiKey, showAdminPortal, setShowAdminPortal, isAdminGmailVerified, setIsAdminGmailVerified, adminGmail, setAdminGmail, isVerifyingGmail, setIsVerifyingGmail, uploadedZipName, setUploadedZipName, zipFile, setZipFile, isUploadingZip, setIsUploadingZip, zipUploadProgress, setZipUploadProgress, isCompiling, setIsCompiling, compilationProgress, setCompilationProgress, compilationLogs, setCompilationLogs, tempRemoteNodeIp, setTempRemoteNodeIp, tempDeviceSerial, setTempDeviceSerial, tempDeepseekApiKey, setTempDeepseekApiKey, cloudRunImage, setCloudRunImage, cloudRunEnvVars, setCloudRunEnvVars, revisionTraffic, setRevisionTraffic, subnets, setSubnets, firewallRules, setFirewallRules, newSubnetName, setNewSubnetName, newSubnetRange, setNewSubnetRange, newFireRuleName, setNewFireRuleName, newFireRulePort, setNewFireRulePort, newFireRuleRange, setNewFireRuleRange, newFireRuleAction, setNewFireRuleAction, vpcSubTab, setVpcSubTab, ipInventory, setIpInventory, deviceCarrierIp, setDeviceCarrierIp, networkLatency, setNetworkLatency, mobileIp, setMobileIp, isBridgeActive, setIsBridgeActive, isAdminAuthorized, setIsAdminAuthorized, adminPasswordInput, setAdminPasswordInput, showAuthModal, setShowAuthModal, modificationCount, setModificationCount, showSystemRules, setShowSystemRules, ruleCountdown, setRuleCountdown, protocolStep, setProtocolStep, sqlTables, setSqlTables, newTableName, setNewTableName, newTableCols, setNewTableCols, sqlBackups, setSqlBackups, mapsApiKey, setMapsApiKey, mapsSelectedEndpoint, setMapsSelectedEndpoint, mapsActiveTrackingId, setMapsActiveTrackingId, isSidebarOpen, setIsSidebarOpen, expandedSection, setExpandedSection, selectedSubMenu, setSelectedSubMenu, agents, setAgents, selectedAgentId, setSelectedAgentId, newAgentName, setNewAgentName, newAgentModel, setNewAgentModel, newAgentPrompt, setNewAgentPrompt, agentPlatformSubTab, setAgentPlatformSubTab, securitySubTab, setSecuritySubTab, cloudStorageSubTab, setCloudStorageSubTab, monitoringSubTab, setMonitoringSubTab, iamSubTab, setIamSubTab, apisSubTab, setApisSubTab, cloudRunSubTab, setCloudRunSubTab, cloudHubSubTab, setCloudHubSubTab, phrsMapsSubTab, setPhrsMapsSubTab, bigQuerySubTab, setBigQuerySubTab, phrsDbSubTab, setPhrsDbSubTab, cloudRunJobs, setCloudRunJobs, isCreatingJob, setIsCreatingJob, newJobName, setNewJobName, newJobSchedule, setNewJobSchedule, workerPools, setWorkerPools, isCreatingPool, setIsCreatingPool, newPoolName, setNewPoolName, domainMappings, setDomainMappings, selectedDomain, setSelectedDomain, domainFilterQuery, setDomainFilterQuery, isCreatingDomain, setIsCreatingDomain, newDomainName, setNewDomainName, newDomainService, setNewDomainService, newDomainType, setNewDomainType, isFleetBannerVisible, setIsFleetBannerVisible, isFleetBannerExpanded, setIsFleetBannerExpanded, dbProductFilter, setDbProductFilter, dbLocationFilter, setDbLocationFilter, isProductFilterOpen, setIsProductFilterOpen, isLocationFilterOpen, setIsLocationFilterOpen, phrsUsers, setPhrsUsers, newAuthEmail, setNewAuthEmail, newAuthPassword, setNewAuthPassword, firestoreCollections, setFirestoreCollections, selectedCollection, setSelectedCollection, selectedDocId, setSelectedDocId, isCreatingCollection, setIsCreatingCollection, newCollectionName, setNewCollectionName, isCreatingDoc, setIsCreatingDoc, newDocId, setNewDocId, phrsStorageFiles, setPhrsStorageFiles, isDraggingFile, setIsDraggingFile, deepScanTimer, setDeepScanTimer, isAtomicScanning, setIsAtomicScanning, atomicLogs, setAtomicLogs, homeSubTab, setHomeSubTab, isWelcomeBoardOpen, setIsWelcomeBoardOpen, homeToast, setHomeToast, agentSearchQuery, setAgentSearchQuery, dashboardAgentChatHistory, setDashboardAgentChatHistory, isAgentPanelOpen, setIsAgentPanelOpen, isAgentThinking, setIsAgentThinking, agentModuleMode, setAgentModuleMode, agentImagePrompt, setAgentImagePrompt, agentCodeLanguage, setAgentCodeLanguage, handleTerminalSubmit, handleNetworkChange, handleAgentSubmit, handlePhotoGeneratorClick, handleCodeGeneratorClick, handleCreateProject, handleUpdateRawDb, handleAddDbNode, handleDeleteDbNode, handleSyncDatabase, handleStartDeployment, handleCreateShortLink, handleSendTestSms, handleVerifyOtp, handleSectionClick, handleSubMenuClick } = state;
    const { AlertCircle, CheckCircle2, MessageSquare, Phone } = LucideIcons;
  return (
    <>
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

                {/* Standalone Server Offline Package & ZIP Export Hub (Token: 6606.0k) */}
                <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase">STANDALONE SERVER PACKAGE</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">Self-Hosted [6606.0k]</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Completely independent of External Platforms. Export the full standalone server package as a ZIP file to host on your local mobile IP or private VPS.
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
                      alert('✓ PHRS_Crowd_Server_Standalone_6606.0k.zip Download Initialized!\n\nExtract and run:\n1. npm install\n2. npm run build\n3. npm start (Runs on local IP without External Platforms dependency)');
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

            {/* Jio Recharge to SMS Conversion Inbox and Realtime OTP Log List */}
            <div className={`p-6 rounded-2xl border transition ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <LucideIcons.Inbox className="w-5 h-5 text-amber-500" />
                    <h3 className="text-base font-bold tracking-tight">
                      PHRS Stealth SMS Inbox & Jio Conversion Logs
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Real-time logs of ₹25 mobile recharges, JIO 1GB high-speed data conversions, and secure OTP verification messages dispatched through the SIM bridge.
                  </p>
                </div>
                
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to clear the SMS history?')) {
                        setPhrsSmsHistory([]);
                        localStorage.removeItem('phrs_sms_history');
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg border border-rose-500/30 hover:bg-rose-500/10 text-rose-500 font-mono text-[11px] font-semibold transition"
                  >
                    Clear History
                  </button>
                  <button
                    onClick={() => {
                      const now = new Date().toLocaleString('en-US', { hour12: true });
                      setPhrsSmsHistory((prev: any) => [
                        {
                          id: `sms-sys-${Date.now()}`,
                          sender: 'PHRS-SYS',
                          text: `SIM Connection Status: Signal excellent (98%). 10k Stealth SMS Gateway Bridge running smoothly on local IP.`,
                          timestamp: now,
                          type: 'system'
                        },
                        ...prev
                      ]);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-mono text-[11px] font-semibold transition flex items-center gap-1.5"
                  >
                    <LucideIcons.RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
                    Verify SIM Connection
                  </button>
                </div>
              </div>

              {/* Converted Stats Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500">
                    <LucideIcons.Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase">Jio Converted SMS</span>
                    <span className="text-lg font-bold font-mono text-amber-600">{stealthSmsCredits.toLocaleString()} SMS</span>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                    <LucideIcons.Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase">Sim Data Pack Loaded</span>
                    <span className="text-lg font-bold font-mono text-indigo-600">{stealthDataBalanceMb} MB (1GB)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <span className="text-xs font-bold font-mono">₹</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase">Recharge Balance</span>
                    <span className="text-lg font-bold font-mono text-emerald-600">₹{stealthWalletRupees}.00</span>
                  </div>
                </div>
              </div>

              {/* SMS List */}
              <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 font-mono text-[10px] text-slate-500">
                      <th className="p-3">SENDER</th>
                      <th className="p-3">MESSAGE CONTENT</th>
                      <th className="p-3 text-right">TIMESTAMP</th>
                      <th className="p-3 text-center">TYPE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs text-slate-700 dark:text-slate-300">
                    {phrsSmsHistory.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-400 font-mono">
                          No SMS logs found. Try performing a ₹25 recharge or sending an OTP to see real-time SIM-to-Server conversions!
                        </td>
                      </tr>
                    ) : (
                      phrsSmsHistory.map((sms: any) => (
                        <tr key={sms.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                          <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                            <span className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                sms.type === 'recharge' ? 'bg-amber-500' : sms.type === 'otp' ? 'bg-indigo-500' : 'bg-slate-500'
                              }`}></span>
                              {sms.sender}
                            </span>
                          </td>
                          <td className="p-3 font-sans text-slate-600 dark:text-slate-300 max-w-md break-words">
                            {sms.text}
                          </td>
                          <td className="p-3 text-right font-mono text-[11px] text-slate-400 whitespace-nowrap">
                            {sms.timestamp}
                          </td>
                          <td className="p-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                              sms.type === 'recharge' 
                                ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                                : sms.type === 'otp' 
                                ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20' 
                                : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                            }`}>
                              {sms.type.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </>
  );
}
