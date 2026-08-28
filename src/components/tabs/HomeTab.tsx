import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function HomeTab({ state }: { state: any }) {
  const { isAutoInternetEnabled, setIsAutoInternetEnabled, isDarkMode, setIsDarkMode, isAuthenticated, setIsAuthenticated, loginView, setLoginView, appIconUrl, setAppIconUrl, pkgName, setPkgName, shaFingerprint, setShaFingerprint, activeTab, setActiveTab, snippetFormat, setSnippetFormat, projects, setProjects, selectedProjectId, setSelectedProjectId, newProjName, setNewProjName, showNewProjModal, setShowNewProjModal, showUpiModal, setShowUpiModal, searchQuery, setSearchQuery, notifications, setNotifications, showNotifications, setShowNotifications, metrics, setMetrics, cpuHistory, setCpuHistory, vpsLogStream, setVpsLogStream, isMiniServerRunning, setIsMiniServerRunning, miniServerPort, setMiniServerPort, miniServerIp, setMiniServerIp, terminalHistory, setTerminalHistory, terminalInput, setTerminalInput, stealthDataBalanceMb, setStealthDataBalanceMb, stealthSmsCredits, setStealthSmsCredits, stealthWalletRupees, setStealthWalletRupees, showStandaloneBanner, setShowStandaloneBanner, localServerIpInput, setLocalServerIpInput, dbData, setDbData, dbRawText, setDbRawText, isRawDbView, setIsRawDbView, dbSuccessMessage, setDbSuccessMessage, isSyncingDb, setIsSyncingDb, dbKeyPath, setDbKeyPath, dbNewVal, setDbNewVal, deployments, setDeployments, githubUrl, setGithubUrl, appName, setAppName, appPort, setAppPort, appTech, setAppTech, buildLogs, setBuildLogs, isBuilding, setIsBuilding, buildProgress, setBuildProgress, activeVirtualApp, setActiveVirtualApp, simulatedVisitorCount, setSimulatedVisitorCount, smartRouteModal, setSmartRouteModal, shortLinks, setShortLinks, linkSlug, setLinkSlug, linkTarget, setLinkTarget, hostFileName, setHostFileName, hostContent, setHostContent, deployedUrl, setDeployedUrl, isDeploying, setIsDeploying, hostedHtml, setHostedHtml, smsGateway, setSmsGateway, smsApiKey, setSmsApiKey, smsAccountSid, setSmsAccountSid, smsSenderId, setSmsSenderId, smsTemplate, setSmsTemplate, testPhoneNumber, setTestPhoneNumber, isSendingOtp, setIsSendingOtp, lastGeneratedOtp, setLastGeneratedOtp, verificationInput, setVerificationInput, verificationStatus, setVerificationStatus, virtualPhoneNotification, setVirtualPhoneNotification, phoneScreenOn, setPhoneScreenOn, apiKeys, setApiKeys, isRoutingActive, setIsRoutingActive, routingHistory, setRoutingHistory, activeRouterPrompt, setActiveRouterPrompt, activeRouterModel, setActiveRouterModel, isRoutingLoading, setIsRoutingLoading, activeExportFile, setActiveExportFile, billingBudget, setBillingBudget, billingAlertAmount, setBillingAlertAmount, billingAlertEmail, setBillingAlertEmail, billingSubTab, setBillingSubTab, envTranslationMappings, setEnvTranslationMappings, secretManagerSubTab, setSecretManagerSubTab, iamMembers, setIamMembers, newMemberEmail, setNewMemberEmail, newMemberRole, setNewMemberRole, selectedMarketplaceApp, setSelectedMarketplaceApp, customSystemPrompt, setCustomSystemPrompt, agentChatInput, setAgentChatInput, agentChatHistory, setAgentChatHistory, k8sPods, setK8sPods, buckets, setBuckets, newBucketName, setNewBucketName, storageFiles, setStorageFiles, uploadFileName, setUploadFileName, uploadTargetBucket, setUploadTargetBucket, isUploading, setIsUploading, firewallPolicy, setFirewallPolicy, sslStatus, setSslStatus, generatedKeyPair, setGeneratedKeyPair, bqQuery, setBqQuery, bqResults, setBqResults, bqRunning, setBqRunning, monitorUptime, setMonitorUptime, activeAlerts, setActiveAlerts, isHybridDevMode, setIsHybridDevMode, isAiServerBypassed, setIsAiServerBypassed, remoteNodeIp, setRemoteNodeIp, deviceSerial, setDeviceSerial, deepseekApiKey, setDeepseekApiKey, showAdminPortal, setShowAdminPortal, isAdminGmailVerified, setIsAdminGmailVerified, adminGmail, setAdminGmail, isVerifyingGmail, setIsVerifyingGmail, uploadedZipName, setUploadedZipName, zipFile, setZipFile, isUploadingZip, setIsUploadingZip, zipUploadProgress, setZipUploadProgress, isCompiling, setIsCompiling, compilationProgress, setCompilationProgress, compilationLogs, setCompilationLogs, tempRemoteNodeIp, setTempRemoteNodeIp, tempDeviceSerial, setTempDeviceSerial, tempDeepseekApiKey, setTempDeepseekApiKey, cloudRunImage, setCloudRunImage, cloudRunEnvVars, setCloudRunEnvVars, revisionTraffic, setRevisionTraffic, subnets, setSubnets, firewallRules, setFirewallRules, newSubnetName, setNewSubnetName, newSubnetRange, setNewSubnetRange, newFireRuleName, setNewFireRuleName, newFireRulePort, setNewFireRulePort, newFireRuleRange, setNewFireRuleRange, newFireRuleAction, setNewFireRuleAction, vpcSubTab, setVpcSubTab, ipInventory, setIpInventory, deviceCarrierIp, setDeviceCarrierIp, networkLatency, setNetworkLatency, mobileIp, setMobileIp, isBridgeActive, setIsBridgeActive, isAdminAuthorized, setIsAdminAuthorized, adminPasswordInput, setAdminPasswordInput, showAuthModal, setShowAuthModal, modificationCount, setModificationCount, showSystemRules, setShowSystemRules, ruleCountdown, setRuleCountdown, protocolStep, setProtocolStep, sqlTables, setSqlTables, newTableName, setNewTableName, newTableCols, setNewTableCols, sqlBackups, setSqlBackups, mapsApiKey, setMapsApiKey, mapsSelectedEndpoint, setMapsSelectedEndpoint, mapsActiveTrackingId, setMapsActiveTrackingId, isSidebarOpen, setIsSidebarOpen, expandedSection, setExpandedSection, selectedSubMenu, setSelectedSubMenu, agents, setAgents, selectedAgentId, setSelectedAgentId, newAgentName, setNewAgentName, newAgentModel, setNewAgentModel, newAgentPrompt, setNewAgentPrompt, agentPlatformSubTab, setAgentPlatformSubTab, securitySubTab, setSecuritySubTab, cloudStorageSubTab, setCloudStorageSubTab, monitoringSubTab, setMonitoringSubTab, iamSubTab, setIamSubTab, apisSubTab, setApisSubTab, cloudRunSubTab, setCloudRunSubTab, cloudHubSubTab, setCloudHubSubTab, phrsMapsSubTab, setPhrsMapsSubTab, bigQuerySubTab, setBigQuerySubTab, phrsDbSubTab, setPhrsDbSubTab, cloudRunJobs, setCloudRunJobs, isCreatingJob, setIsCreatingJob, newJobName, setNewJobName, newJobSchedule, setNewJobSchedule, workerPools, setWorkerPools, isCreatingPool, setIsCreatingPool, newPoolName, setNewPoolName, domainMappings, setDomainMappings, selectedDomain, setSelectedDomain, domainFilterQuery, setDomainFilterQuery, isCreatingDomain, setIsCreatingDomain, newDomainName, setNewDomainName, newDomainService, setNewDomainService, newDomainType, setNewDomainType, isFleetBannerVisible, setIsFleetBannerVisible, isFleetBannerExpanded, setIsFleetBannerExpanded, dbProductFilter, setDbProductFilter, dbLocationFilter, setDbLocationFilter, isProductFilterOpen, setIsProductFilterOpen, isLocationFilterOpen, setIsLocationFilterOpen, phrsUsers, setPhrsUsers, newAuthEmail, setNewAuthEmail, newAuthPassword, setNewAuthPassword, firestoreCollections, setFirestoreCollections, selectedCollection, setSelectedCollection, selectedDocId, setSelectedDocId, isCreatingCollection, setIsCreatingCollection, newCollectionName, setNewCollectionName, isCreatingDoc, setIsCreatingDoc, newDocId, setNewDocId, phrsStorageFiles, setPhrsStorageFiles, isDraggingFile, setIsDraggingFile, deepScanTimer, setDeepScanTimer, isAtomicScanning, setIsAtomicScanning, atomicLogs, setAtomicLogs, homeSubTab, setHomeSubTab, isWelcomeBoardOpen, setIsWelcomeBoardOpen, homeToast, setHomeToast, agentSearchQuery, setAgentSearchQuery, dashboardAgentChatHistory, setDashboardAgentChatHistory, isAgentPanelOpen, setIsAgentPanelOpen, isAgentThinking, setIsAgentThinking, agentModuleMode, setAgentModuleMode, agentImagePrompt, setAgentImagePrompt, agentCodeLanguage, setAgentCodeLanguage, handleTerminalSubmit, handleNetworkChange, handleAgentSubmit, handlePhotoGeneratorClick, handleCodeGeneratorClick, handleCreateProject, handleUpdateRawDb, handleAddDbNode, handleDeleteDbNode, handleSyncDatabase, handleStartDeployment, handleCreateShortLink, handleSendTestSms, handleVerifyOtp, handleSectionClick, handleSubMenuClick, triggerCodeGeneration } = state;
  const { Activity, ArrowRight, ChevronRight, Code, Compass, Copy, Cpu, CreditCard, Database, HardDrive, ImageIcon, Layers, MessageSquare, MoreVertical, RefreshCw, Server, Shield, Sliders, Sparkles, Wifi, X } = LucideIcons;
  return (
        <>
          <div className="space-y-6 animate-fade-in">
            
            {/* Interactive Custom feedback toast notification */}
            {homeToast && (
              <div className="fixed bottom-6 right-6 bg-slate-900 text-white font-mono text-xs px-5 py-3.5 rounded-xl shadow-2xl z-50 flex items-center gap-3 border border-slate-800 animate-bounce">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{homeToast}</span>
                <button onClick={() => setHomeToast(null)} className="text-slate-400 hover:text-white font-bold ml-2 text-sm leading-none">×</button>
              </div>
            )}

            {/* MAIN PHRS STYLE WELCOME CARD */}
            <div className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
              
              {/* Welcome Header & Cloud Logo */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="p-1 rounded-xl bg-slate-50 border border-slate-100 shrink-0 shadow-xs">
                    <svg className="w-12 h-12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="phrsCloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#EA4335" />
                          <stop offset="30%" stopColor="#FBBC05" />
                          <stop offset="65%" stopColor="#34A853" />
                          <stop offset="100%" stopColor="#4285F4" />
                        </linearGradient>
                      </defs>
                      {/* Perfect stylized vector cloud icon representing PHRS */}
                      <path d="M25.8 13.4C24.9 8.8 20.9 5.3 16 5.3c-3.9 0-7.2 2.2-8.9 5.4C4.1 11.1 1 14.5 1 18.7c0 4.4 3.6 8 8 8h16.3c3.7 0 6.7-3 6.7-6.7 0-3.5-2.7-6.4-6.2-6.6z" fill="url(#phrsCloudGrad)"/>
                    </svg>
                  </div>
                  
                  <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900">
                      Welcome
                    </h1>
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
                          phrs-crowd-org
                        </button>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        
                        {selectedProjectId ? (
                          <button 
                            onClick={() => {
                              setHomeToast(`Active workspace: ${projects.find(p => p.id === selectedProjectId)?.name}`);
                              setTimeout(() => setHomeToast(null), 2500);
                            }} 
                            className="text-[#1a73e8] hover:underline font-medium text-[15px]"
                          >
                            {projects.find(p => p.id === selectedProjectId)?.name || 'Unknown Project'}
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[15px] italic">No project selected</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                </div>

                <>
                  {/* Project Metadata Details */}
                  {selectedProjectId ? (
                    <div className="space-y-2 md:space-y-0 md:flex md:items-center md:gap-8 text-xs text-slate-600 font-sans border-b border-slate-100 pb-5 mb-5 mt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-medium">Project number:</span>
                        <span className="font-mono font-bold text-slate-800">{selectedProjectId.replace(/\D/g, '') || Math.floor(Math.random() * 1000000000)}</span>
                        <button 
                          onClick={() => {
                            const num = selectedProjectId.replace(/\D/g, '') || '0';
                            navigator.clipboard.writeText(num);
                            setHomeToast(`✓ Project number copied to clipboard: ${num}`);
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
                        <span className="font-mono font-bold text-slate-800">{selectedProjectId}</span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(selectedProjectId);
                            setHomeToast(`✓ Project ID copied to clipboard: ${selectedProjectId}`);
                            setTimeout(() => setHomeToast(null), 3000);
                          }}
                          className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
                          title="Copy Project ID"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 font-sans border-b border-slate-100 pb-5 mb-5 mt-4">
                      Create a project using the 'Create Project' button above to get started.
                    </div>
                  )}

                  {/* UNIFIED PHRS AGENT CONSOLE */}
                  <div className="mt-6">
                    {isAgentPanelOpen ? (
                      <div className={`p-5 rounded-2xl border transition-all duration-300 animate-fade-in ${
                        isDarkMode ? 'bg-slate-900/95 border-slate-700 shadow-2xl' : 'bg-slate-50/80 border-slate-200/80 shadow-md'
                      }`}>
                        <div className="flex flex-col items-center gap-1.5 pb-2 border-b border-slate-200/40 mb-3">
                          {/* THREE BUTTONS IN ONE COMPACT ROW */}
                          <div className="flex items-center w-full gap-1">
                            <div className="flex flex-1 gap-1">
                              <button 
                                 onClick={() => setAgentModuleMode('chat')}
                                 className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-md border transition-all ${
                                   agentModuleMode === 'chat' 
                                     ? 'bg-blue-600 text-white border-blue-600' 
                                     : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 text-[9px]'
                                 }`}
                              >
                                <span className="text-[10px]">💬</span>
                                <span className="text-[9px] font-bold">Chat</span>
                              </button>

                              <button 
                                 onClick={() => setAgentModuleMode('image')}
                                 className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-md border transition-all ${
                                   agentModuleMode === 'image' 
                                     ? 'bg-emerald-600 text-white border-emerald-600' 
                                     : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 text-[9px]'
                                 }`}
                              >
                                <span className="text-[10px]">🖼️</span>
                                <span className="text-[9px] font-bold">Studio</span>
                              </button>

                              <button 
                                 onClick={() => setAgentModuleMode('code')}
                                 className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-md border transition-all ${
                                   agentModuleMode === 'code' 
                                     ? 'bg-purple-600 text-white border-purple-600' 
                                     : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 text-[9px]'
                                 }`}
                              >
                                <span className="text-[10px]">💻</span>
                                <span className="text-[9px] font-bold">Code</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-0.5 ml-1">
                              <button 
                                 onClick={() => {
                                  setDashboardAgentChatHistory([
                                    {
                                      sender: 'agent',
                                      text: "నేను బ్రహ్మాస్త్ర 3.5 అల్ట్రా ఏజెంట్ ని మీకు ఏ విధంగా సహాయం చేయగలను",
                                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    }
                                  ]);
                                  setAgentModuleMode('chat');
                                }}
                                className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                                title="Clear conversation"
                              >
                                <RefreshCw className="w-2.5 h-2.5" />
                              </button>
                              <button 
                                 onClick={() => setIsAgentPanelOpen(false)}
                                className="p-1 text-slate-400 hover:text-slate-600 transition"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* PHRS AGENT 3.5 ULTRA BRANDING (ENGLISH) WITH GOLD CHAKRA */}
                          <div className="flex items-center gap-1.5 w-full justify-start pl-2 py-1">
                            <Compass className="w-2.5 h-2.5 text-amber-500 animate-[spin_12s_linear_infinite]" />
                            <span className="text-[8px] font-black tracking-[0.15em] text-slate-400 uppercase font-mono italic">PHRS AGENT 3.5 ULTRA</span>
                          </div>
                        </div>

                        {/* MODE 1: CHAT WORKSPACE (Now with Smart Search at bottom) */}
                        {agentModuleMode === 'chat' && (
                          <div className="space-y-4">
                            <div className="min-h-[280px] max-h-[280px] overflow-y-auto space-y-3 pr-1">
                              {dashboardAgentChatHistory.map((msg, index) => (
                                <div 
                                  key={index} 
                                  className={`flex flex-col max-w-[85%] ${
                                    msg.sender === 'user' ? 'ml-auto items-end' : 'items-start'
                                  }`}
                                >
                                  <div className={(msg.text.toLowerCase().trim() === 'hi' || msg.text.trim() === 'హాయ్' || index === 0) 
                                    ? `p-0.5 text-[9px] leading-tight ${msg.sender === "user" ? "text-blue-600 text-right" : "text-slate-500 text-left"}`
                                    : `p-2 rounded-xl text-[11px] leading-relaxed ${
                                        msg.sender === 'user' 
                                          ? 'bg-blue-600 text-white rounded-br-none ml-auto shadow-sm' 
                                          : isDarkMode ? 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                                      }`
                                  }>
                                    <span className={(msg.text.toLowerCase().trim() === 'hi' || index === 0) ? "block" : "whitespace-pre-line"}>{msg.text}</span>
                                    
                                    {msg.type === 'image' && msg.imageUrl && (
                                      <div className="mt-3 rounded-lg overflow-hidden border border-slate-200">
                                        <img src={msg.imageUrl} referrerPolicy="no-referrer" alt="Generated" className="w-full h-auto max-h-48 object-cover" />
                                      </div>
                                    )}

                                    {msg.type === 'code' && msg.codeContent && (
                                      <div className="mt-3 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 p-3 font-mono text-[10px] text-emerald-400">
                                        <pre className="overflow-x-auto whitespace-pre">{msg.codeContent}</pre>
                                      </div>
                                    )}
                                  </div>
                                  
                                </div>
                              ))}
                              {isAgentThinking && (
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono py-1">
                                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                                  <span className="ml-1 text-[10px]">PHRS Agent is thinking...</span>
                                </div>
                              )}
                            </div>
                            
                            {/* SMART SEARCH BAR INTEGRATED HERE */}
                            <div className="mt-2">
                               <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-sm"></div>
                          <div className={`relative ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} border rounded-2xl flex items-center p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/50 transition-all`}>
                            <div className="pl-3 pr-2 text-blue-500">
                              <Sparkles className="w-5 h-5 animate-pulse" />
                            </div>
                            <input
                                type="text"
                               value={agentSearchQuery}
                               onChange={(e) => setAgentSearchQuery(e.target.value)}
                               placeholder="Ask PHRS Agent anything..."
                                className={`w-full bg-transparent border-none focus:outline-none text-sm py-2 px-1 ${isDarkMode ? 'text-slate-200 placeholder-slate-500' : 'text-slate-700 placeholder-slate-400'}`}
                               onKeyDown={(e) => {
                                 if (e.key === 'Enter') {
                                   handleAgentSubmit(agentSearchQuery);
                                   setAgentSearchQuery('');
                                 }
                               }}
                            />
                            <div className="pr-2 flex gap-2">
                              <button
                                  className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                                 title="Generate Photo"
                                 onClick={handlePhotoGeneratorClick}
                              >
                                <ImageIcon className="w-4 h-4" />
                              </button>
                              <button
                                  className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                 title="Create App"
                                 onClick={handleCodeGeneratorClick}
                              >
                                <Code className="w-4 h-4" />
                              </button>
                              <button
                                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                                 onClick={() => {
                                   handleAgentSubmit(agentSearchQuery);
                                   setAgentSearchQuery('');
                                 }}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                            </div>
                          </div>
                        )}

                        {/* MODE 2: IMAGE STUDIO */}
                        {agentModuleMode === 'image' && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-[10px] font-black tracking-wider text-slate-500 uppercase mb-2">IMAGE PROMPT</label>
                              <textarea 
                                value={agentImagePrompt}
                                onChange={(e) => setAgentImagePrompt(e.target.value)}
                                className={`w-full text-xs p-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-500 h-20 resize-none ${
                                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-800'
                                }`}
                                placeholder="Describe the image..."
                              />
                            </div>
                            <button 
                               onClick={() => {
                                  if (!agentImagePrompt.trim()) return;
                                  setIsAgentThinking(true);
                                  const userMsg = { sender: 'user' as const, text: `Generate image: ${agentImagePrompt}`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
                                  setDashboardAgentChatHistory(prev => [...prev, userMsg]);
                                  setAgentImagePrompt('');
                                  setAgentModuleMode('chat');
                                  setTimeout(() => {
                                    setDashboardAgentChatHistory(prev => [...prev, {
                                      sender: 'agent',
                                      text: "🖼️ మీ ప్రోంప్ట్ ప్రకారం ఒక అందమైన ఇమేజ్‌ను జనరేట్ చేసాను.",
                                      type: 'image',
                                      imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
                                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    }]);
                                    setIsAgentThinking(false);
                                  }, 1200);
                               }}
                               className="w-full py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                            >
                               Generate AI Visual Asset
                            </button>
                          </div>
                        )}

                        {/* MODE 3: CODE ARCHITECT */}
                        {agentModuleMode === 'code' && (
                          <div className="space-y-4">
                            <input 
                                type="text"
                                id="codeGenPromptInput"
                                placeholder="Code requirements..."
                                className={`w-full text-xs p-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-800'
                                }`}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                                    triggerCodeGeneration(e.currentTarget.value);
                                    e.currentTarget.value = '';
                                  }
                                }}
                            />
                            <button 
                               onClick={() => {
                                 const inp = document.getElementById('codeGenPromptInput') as HTMLInputElement;
                                 if (inp && inp.value.trim() !== '') {
                                   triggerCodeGeneration(inp.value);
                                   inp.value = '';
                                 }
                               }}
                               className="w-full py-2 bg-purple-600 text-white text-xs font-bold rounded-xl"
                            >
                               Compile & Deploy Sandbox Code
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-4">
                        {/* UNIFIED SEARCH INPUT ENTRY POINT */}
                        <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-sm"></div>
                          <div className={`relative ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} border rounded-2xl flex items-center p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/50 transition-all`}>
                            <div className="pl-3 pr-2 text-blue-500">
                              <Sparkles className="w-5 h-5 animate-pulse" />
                            </div>
                            <input
                                type="text"
                               value={agentSearchQuery}
                               onChange={(e) => setAgentSearchQuery(e.target.value)}
                               placeholder="Ask PHRS Agent anything..."
                                className={`w-full bg-transparent border-none focus:outline-none text-sm py-2 px-1 ${isDarkMode ? 'text-slate-200 placeholder-slate-500' : 'text-slate-700 placeholder-slate-400'}`}
                               onKeyDown={(e) => {
                                 if (e.key === 'Enter') {
                                   handleAgentSubmit(agentSearchQuery);
                                   setAgentSearchQuery('');
                                 }
                               }}
                            />
                            <div className="pr-2 flex gap-2">
                              <button
                                  className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                                 title="Generate Photo"
                                 onClick={handlePhotoGeneratorClick}
                              >
                                <ImageIcon className="w-4 h-4" />
                              </button>
                              <button
                                  className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                 title="Create App"
                                 onClick={handleCodeGeneratorClick}
                              >
                                <Code className="w-4 h-4" />
                              </button>
                              <button
                                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                                 onClick={() => {
                                   handleAgentSubmit(agentSearchQuery);
                                   setAgentSearchQuery('');
                                 }}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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

              {/* SUB-TAB 1: PHRS CLOUD WELCOME DASHBOARD VIEW */}
              {homeSubTab === 'dashboard' && (
                <div className="pt-6 space-y-6">
                  
                  {/* Grid of PHRS Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6">
                    
                    {/* Project Info Card (xl: span 4) */}
                    <div className="xl:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
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

                    {/* Resources Card (xl: span 4) */}
                    <div className="xl:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                      <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-800">Resources</h3>
                        <button className="text-blue-600 hover:bg-blue-50 p-1 rounded transition">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-0 flex-1">
                        <div className="divide-y divide-slate-100">
                          {[
                            { name: 'Compute Engine', val: '2 instances', color: 'text-blue-600', tab: 'cloud_run' },
                            { name: 'Cloud Storage', val: '5 buckets', color: 'text-blue-600', tab: 'cloud_storage' },
                            { name: 'Cloud SQL', val: '1 instance', color: 'text-blue-600', tab: 'cloud_sql' },
                            { name: 'BigQuery', val: '12 datasets', color: 'text-blue-600', tab: 'bigquery' },
                            { name: 'PHRS Database', val: '3 active', color: 'text-[#FFCA28]', tab: 'database' },
                            { name: 'Agent Platform', val: `${agents.length} active`, color: 'text-indigo-600', tab: 'agent_platform' }
                          ].map((res, i) => (
                            <div key={i} onClick={() => setActiveTab(res.tab as any)} className="flex justify-between items-center px-5 py-3 hover:bg-slate-50 transition cursor-pointer group">
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

                    {/* API Status Card (xl: span 4) */}
                    <div className="xl:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
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
                        <button onClick={() => setActiveTab('api_board')} className="text-xs font-bold text-blue-600 hover:underline">Go to APIs overview</button>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="md:col-span-2 xl:col-span-12">
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
                    <div className="md:col-span-2 xl:col-span-12">
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
                    <div className="md:col-span-2 xl:col-span-12 space-y-4">
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
              {/* SUB-TAB 2: ORIGINAL DYNAMIC CLOUD HUB TELEMETRY AND TERMINAL LOOPS WITH SUB-FEATURES */}
              {homeSubTab === 'hub' && (
                <div className="pt-6 space-y-6">
                  {/* Sub-feature Navigation Bar */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-200">
                    {['Home', 'Deployments', 'Health & troubleshooting', 'Security & compliance', 'Optimization', 'Quotas & reservations', 'Maintenance', 'Support', 'App Topology'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => {
                          if (tab === 'Deployments') {
                            setActiveTab('app_studio');
                          } else {
                            setCloudHubSubTab(tab);
                            setHomeToast(`Cloud Hub: Switched to ${tab}`);
                            setTimeout(() => setHomeToast(null), 2000);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition ${
                          cloudHubSubTab === tab && tab !== 'Deployments'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Sub-feature View: Health & troubleshooting */}
                  {cloudHubSubTab === 'Health & troubleshooting' && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Activity className="w-6 h-6 text-emerald-600" />
                            <div>
                              <h3 className="text-base font-bold text-slate-900">System Health & Troubleshooting Diagnostics</h3>
                              <p className="text-xs text-slate-500">Real-time daemon ping, SQLite WAL status, and server connectivity checks.</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setHomeToast('✓ Health diagnostics completed: All 5 daemons operational');
                              setTimeout(() => setHomeToast(null), 3000);
                            }}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-semibold rounded-lg shadow transition"
                          >
                            RUN FULL DIAGNOSTICS
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="text-slate-500 block mb-1">LOCAL PING ({remoteNodeIp})</span>
                            <span className="text-emerald-600 font-bold text-sm">0.42 ms (OPTIMAL)</span>
                          </div>
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="text-slate-500 block mb-1">PM2 DAEMONS STATUS</span>
                            <span className="text-indigo-600 font-bold text-sm">3 / 3 ONLINE</span>
                          </div>
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="text-slate-500 block mb-1">SQLITE INTEGRITY</span>
                            <span className="text-emerald-600 font-bold text-sm">OK (0 CORRUPTIONS)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-feature View: Security & compliance */}
                  {cloudHubSubTab === 'Security & compliance' && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <Shield className="w-6 h-6 text-indigo-600" />
                          <div>
                            <h3 className="text-base font-bold text-slate-900">Security & Compliance Command Center</h3>
                            <p className="text-xs text-slate-500">Active firewall rules, SSL certificate validity, and IAM access controls.</p>
                          </div>
                        </div>
                        <div className="space-y-3 font-mono text-xs">
                          <div className="p-3 rounded-lg bg-slate-50 flex justify-between items-center border border-slate-200">
                            <span>SSL Certificate Status</span>
                            <span className="text-emerald-600 font-bold">Valid (Expires: Oct 2027)</span>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-50 flex justify-between items-center border border-slate-200">
                            <span>Firewall Port Policies</span>
                            <span className="text-indigo-600 font-bold">Port 3000 (Open for VPS & Local IP)</span>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-50 flex justify-between items-center border border-slate-200">
                            <span>Security Posture Score</span>
                            <span className="text-emerald-600 font-bold text-sm">98 / 100 (SECURE)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-feature View: Optimization */}
                  {cloudHubSubTab === 'Optimization' && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Sliders className="w-6 h-6 text-amber-600" />
                            <div>
                              <h3 className="text-base font-bold text-slate-900">Resource Optimization & Auto-Scaling</h3>
                              <p className="text-xs text-slate-500">Memory garbage collection, query performance tuner, and cache tuning.</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setHomeToast('✓ Optimization routines executed successfully');
                              setTimeout(() => setHomeToast(null), 3000);
                            }}
                            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-semibold rounded-lg shadow transition"
                          >
                            OPTIMIZE NOW
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="text-slate-500 block mb-1">CACHE HIT RATIO</span>
                            <span className="text-emerald-600 font-bold text-base">99.4%</span>
                          </div>
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="text-slate-500 block mb-1">SQLITE WAL MODE</span>
                            <span className="text-emerald-600 font-bold text-base">ENABLED (FAST IO)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-feature View: Quotas & reservations */}
                  {cloudHubSubTab === 'Quotas & reservations' && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <Database className="w-6 h-6 text-sky-600" />
                          <div>
                            <h3 className="text-base font-bold text-slate-900">Quotas, Limits & Reservations</h3>
                            <p className="text-xs text-slate-500">Monitor API limits, SQLite storage allocation, and reserved bandwidth.</p>
                          </div>
                        </div>
                        <div className="space-y-4 font-mono text-xs">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-slate-600">SQLite Storage Usage (25GB Limit)</span>
                              <span className="font-bold text-slate-900">12.4 GB (49.6%)</span>
                            </div>
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div className="bg-indigo-600 h-full w-[49.6%]"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-slate-600">Monthly API Requests (100k Quota)</span>
                              <span className="font-bold text-slate-900">48,200 / 100,000</span>
                            </div>
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div className="bg-emerald-600 h-full w-[48.2%]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-feature View: Maintenance */}
                  {cloudHubSubTab === 'Maintenance' && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <RefreshCw className="w-6 h-6 text-indigo-600" />
                            <div>
                              <h3 className="text-base font-bold text-slate-900">Server Maintenance & Backups</h3>
                              <p className="text-xs text-slate-500">Schedule automatic database backups, vacuum sqlite tables, and purge logs.</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setHomeToast('✓ Database Vacuum & Maintenance completed');
                              setTimeout(() => setHomeToast(null), 3000);
                            }}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold rounded-lg shadow transition"
                          >
                            RUN DATABASE VACUUM
                          </button>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700">
                          <p className="font-bold mb-1">Last Backup Timestamp:</p>
                          <p className="text-emerald-600">August 25, 2026 - 10:30 UTC (Snapshot ID: snap_99812)</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-feature View: Support */}
                  {cloudHubSubTab === 'Support' && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <MessageSquare className="w-6 h-6 text-blue-600" />
                          <div>
                            <h3 className="text-base font-bold text-slate-900">VIP Cloud Support & Diagnostics</h3>
                            <p className="text-xs text-slate-500">Direct engineering assistance, documentation, and troubleshooting logs.</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <button
                            onClick={() => {
                              setHomeToast('✓ Diagnostic support bundle generated successfully');
                              setTimeout(() => setHomeToast(null), 3000);
                            }}
                            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold rounded-lg shadow transition"
                          >
                            📦 DOWNLOAD DIAGNOSTIC SUPPORT BUNDLE (.ZIP)
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-feature View: App Topology */}
                  {cloudHubSubTab === 'App Topology' && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <Layers className="w-6 h-6 text-purple-600" />
                          <div>
                            <h3 className="text-base font-bold text-slate-900">Application Topology & Service Mesh Map</h3>
                            <p className="text-xs text-slate-500">Visual interconnection of client requests, reverse proxy, node core, and database.</p>
                          </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-4">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
                            <span>1. Client Browser / Mobile App</span>
                            <span className="text-emerald-400">HTTPS / WSS</span>
                          </div>
                          <div className="text-center text-slate-500">↓</div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
                            <span>2. Nginx Reverse Proxy (Port 3000)</span>
                            <span className="text-indigo-400">Load Balancing Active</span>
                          </div>
                          <div className="text-center text-slate-500">↓</div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
                            <span>3. Node.js Express Core & PM2 Daemon</span>
                            <span className="text-amber-400">3 Instances Running</span>
                          </div>
                          <div className="text-center text-slate-500">↓</div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
                            <span>4. Local SQLite3 & SMS/OTP Gateway</span>
                            <span className="text-emerald-400">0ms Latency</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Default / Home View inside Cloud Hub */}
                  {cloudHubSubTab === 'Home' && (
                    <>
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
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    
                    {/* Left Column: Projects & Active Deployments quicklist */}
                    <div className="xl:col-span-7 space-y-6">
                      
                      {/* Active Services List */}
                      <div className="p-5 rounded-2xl border transition-colors bg-white border-slate-200 shadow-sm">
                        <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">SERVICE DEPLOYMENTS STATUS</h3>
                        
                        <div className="divide-y divide-slate-100">
                          {deployments.map(dep => (
                            <div key={dep.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-50 last:border-0">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100 shrink-0">
                                  <Server className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold text-slate-900 truncate">{dep.name}</p>
                                  <span 
                                    onClick={() => setSmartRouteModal({ url: `${dep.subdomain}.phrscrowd.local`, service: dep.name })}
                                    className="text-[10px] font-mono text-indigo-500 hover:text-indigo-750 cursor-pointer hover:underline break-all block"
                                    title="Click to route mobile domain"
                                  >
                                    http://{dep.subdomain}.phrscrowd.local
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center flex-wrap gap-3 sm:gap-4">
                                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                                  {dep.status}
                                </span>
                                <span className="text-xs font-mono text-slate-500 hidden md:inline">{dep.techStack}</span>
                                <button 
                                  onClick={() => { setActiveVirtualApp(dep); setActiveTab('app_studio'); }}
                                  className="text-xs font-mono text-indigo-600 hover:text-indigo-800 flex items-center gap-1 whitespace-nowrap"
                                >
                                  Open Console
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>



                    </div>

                    {/* Right Column: Interactive VPS Terminal / Kernel Logs */}
                    <div className="xl:col-span-5 space-y-6">
                      


                      {/* Quick Info Tip Card */}
                      <div className="p-4 rounded-xl border text-xs leading-relaxed transition-colors bg-indigo-50 border-indigo-100 text-indigo-900">
                        <p className="font-semibold mb-1">💡 Pro Cloud Tip:</p>
                        Because PHRS Crowd runs directly on a single SQLite engine, database reads have zero TCP latency. It performs at up to 100,000 read operations per second right from your cheap VPS!
                      </div>

                    </div>
                  </div>

                    </>
                  )}

                </div>
              )}

            </div>

          </div>
        </>
  );
}
