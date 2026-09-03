import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function AgentPlatformTab({ state }: { state: any }) {
  const { isAutoInternetEnabled, setIsAutoInternetEnabled, isDarkMode, setIsDarkMode, isAuthenticated, setIsAuthenticated, loginView, setLoginView, appIconUrl, setAppIconUrl, pkgName, setPkgName, shaFingerprint, setShaFingerprint, activeTab, setActiveTab, snippetFormat, setSnippetFormat, projects, setProjects, selectedProjectId, setSelectedProjectId, newProjName, setNewProjName, showNewProjModal, setShowNewProjModal, showUpiModal, setShowUpiModal, searchQuery, setSearchQuery, notifications, setNotifications, showNotifications, setShowNotifications, metrics, setMetrics, cpuHistory, setCpuHistory, vpsLogStream, setVpsLogStream, isMiniServerRunning, setIsMiniServerRunning, miniServerPort, setMiniServerPort, miniServerIp, setMiniServerIp, terminalHistory, setTerminalHistory, terminalInput, setTerminalInput, stealthDataBalanceMb, setStealthDataBalanceMb, stealthSmsCredits, setStealthSmsCredits, stealthWalletRupees, setStealthWalletRupees, showStandaloneBanner, setShowStandaloneBanner, localServerIpInput, setLocalServerIpInput, dbData, setDbData, dbRawText, setDbRawText, isRawDbView, setIsRawDbView, dbSuccessMessage, setDbSuccessMessage, isSyncingDb, setIsSyncingDb, dbKeyPath, setDbKeyPath, dbNewVal, setDbNewVal, deployments, setDeployments, githubUrl, setGithubUrl, appName, setAppName, appPort, setAppPort, appTech, setAppTech, buildLogs, setBuildLogs, isBuilding, setIsBuilding, buildProgress, setBuildProgress, activeVirtualApp, setActiveVirtualApp, simulatedVisitorCount, setSimulatedVisitorCount, smartRouteModal, setSmartRouteModal, shortLinks, setShortLinks, linkSlug, setLinkSlug, linkTarget, setLinkTarget, hostFileName, setHostFileName, hostContent, setHostContent, deployedUrl, setDeployedUrl, isDeploying, setIsDeploying, hostedHtml, setHostedHtml, smsGateway, setSmsGateway, smsApiKey, setSmsApiKey, smsAccountSid, setSmsAccountSid, smsSenderId, setSmsSenderId, smsTemplate, setSmsTemplate, testPhoneNumber, setTestPhoneNumber, isSendingOtp, setIsSendingOtp, lastGeneratedOtp, setLastGeneratedOtp, verificationInput, setVerificationInput, verificationStatus, setVerificationStatus, virtualPhoneNotification, setVirtualPhoneNotification, phoneScreenOn, setPhoneScreenOn, apiKeys, setApiKeys, isRoutingActive, setIsRoutingActive, routingHistory, setRoutingHistory, activeRouterPrompt, setActiveRouterPrompt, activeRouterModel, setActiveRouterModel, isRoutingLoading, setIsRoutingLoading, activeExportFile, setActiveExportFile, billingBudget, setBillingBudget, billingAlertAmount, setBillingAlertAmount, billingAlertEmail, setBillingAlertEmail, billingSubTab, setBillingSubTab, envTranslationMappings, setEnvTranslationMappings, secretManagerSubTab, setSecretManagerSubTab, iamMembers, setIamMembers, newMemberEmail, setNewMemberEmail, newMemberRole, setNewMemberRole, selectedMarketplaceApp, setSelectedMarketplaceApp, customSystemPrompt, setCustomSystemPrompt, agentChatInput, setAgentChatInput, agentChatHistory, setAgentChatHistory, k8sPods, setK8sPods, buckets, setBuckets, newBucketName, setNewBucketName, storageFiles, setStorageFiles, uploadFileName, setUploadFileName, uploadTargetBucket, setUploadTargetBucket, isUploading, setIsUploading, firewallPolicy, setFirewallPolicy, sslStatus, setSslStatus, generatedKeyPair, setGeneratedKeyPair, bqQuery, setBqQuery, bqResults, setBqResults, bqRunning, setBqRunning, monitorUptime, setMonitorUptime, activeAlerts, setActiveAlerts, isHybridDevMode, setIsHybridDevMode, isAiServerBypassed, setIsAiServerBypassed, remoteNodeIp, setRemoteNodeIp, deviceSerial, setDeviceSerial, deepseekApiKey, setDeepseekApiKey, showAdminPortal, setShowAdminPortal, isAdminGmailVerified, setIsAdminGmailVerified, adminGmail, setAdminGmail, isVerifyingGmail, setIsVerifyingGmail, uploadedZipName, setUploadedZipName, zipFile, setZipFile, isUploadingZip, setIsUploadingZip, zipUploadProgress, setZipUploadProgress, isCompiling, setIsCompiling, compilationProgress, setCompilationProgress, compilationLogs, setCompilationLogs, tempRemoteNodeIp, setTempRemoteNodeIp, tempDeviceSerial, setTempDeviceSerial, tempDeepseekApiKey, setTempDeepseekApiKey, cloudRunImage, setCloudRunImage, cloudRunEnvVars, setCloudRunEnvVars, revisionTraffic, setRevisionTraffic, subnets, setSubnets, firewallRules, setFirewallRules, newSubnetName, setNewSubnetName, newSubnetRange, setNewSubnetRange, newFireRuleName, setNewFireRuleName, newFireRulePort, setNewFireRulePort, newFireRuleRange, setNewFireRuleRange, newFireRuleAction, setNewFireRuleAction, vpcSubTab, setVpcSubTab, ipInventory, setIpInventory, deviceCarrierIp, setDeviceCarrierIp, networkLatency, setNetworkLatency, mobileIp, setMobileIp, isBridgeActive, setIsBridgeActive, isAdminAuthorized, setIsAdminAuthorized, adminPasswordInput, setAdminPasswordInput, showAuthModal, setShowAuthModal, modificationCount, setModificationCount, showSystemRules, setShowSystemRules, ruleCountdown, setRuleCountdown, protocolStep, setProtocolStep, sqlTables, setSqlTables, newTableName, setNewTableName, newTableCols, setNewTableCols, sqlBackups, setSqlBackups, mapsApiKey, setMapsApiKey, mapsSelectedEndpoint, setMapsSelectedEndpoint, mapsActiveTrackingId, setMapsActiveTrackingId, isSidebarOpen, setIsSidebarOpen, expandedSection, setExpandedSection, selectedSubMenu, setSelectedSubMenu, agents, setAgents, selectedAgentId, setSelectedAgentId, newAgentName, setNewAgentName, newAgentModel, setNewAgentModel, newAgentPrompt, setNewAgentPrompt, agentPlatformSubTab, setAgentPlatformSubTab, securitySubTab, setSecuritySubTab, cloudStorageSubTab, setCloudStorageSubTab, monitoringSubTab, setMonitoringSubTab, iamSubTab, setIamSubTab, apisSubTab, setApisSubTab, cloudRunSubTab, setCloudRunSubTab, cloudHubSubTab, setCloudHubSubTab, phrsMapsSubTab, setPhrsMapsSubTab, bigQuerySubTab, setBigQuerySubTab, phrsDbSubTab, setPhrsDbSubTab, cloudRunJobs, setCloudRunJobs, isCreatingJob, setIsCreatingJob, newJobName, setNewJobName, newJobSchedule, setNewJobSchedule, workerPools, setWorkerPools, isCreatingPool, setIsCreatingPool, newPoolName, setNewPoolName, domainMappings, setDomainMappings, selectedDomain, setSelectedDomain, domainFilterQuery, setDomainFilterQuery, isCreatingDomain, setIsCreatingDomain, newDomainName, setNewDomainName, newDomainService, setNewDomainService, newDomainType, setNewDomainType, isFleetBannerVisible, setIsFleetBannerVisible, isFleetBannerExpanded, setIsFleetBannerExpanded, dbProductFilter, setDbProductFilter, dbLocationFilter, setDbLocationFilter, isProductFilterOpen, setIsProductFilterOpen, isLocationFilterOpen, setIsLocationFilterOpen, phrsUsers, setPhrsUsers, newAuthEmail, setNewAuthEmail, newAuthPassword, setNewAuthPassword, firestoreCollections, setFirestoreCollections, selectedCollection, setSelectedCollection, selectedDocId, setSelectedDocId, isCreatingCollection, setIsCreatingCollection, newCollectionName, setNewCollectionName, isCreatingDoc, setIsCreatingDoc, newDocId, setNewDocId, phrsStorageFiles, setPhrsStorageFiles, isDraggingFile, setIsDraggingFile, deepScanTimer, setDeepScanTimer, isAtomicScanning, setIsAtomicScanning, atomicLogs, setAtomicLogs, homeSubTab, setHomeSubTab, isWelcomeBoardOpen, setIsWelcomeBoardOpen, homeToast, setHomeToast, agentSearchQuery, setAgentSearchQuery, dashboardAgentChatHistory, setDashboardAgentChatHistory, isAgentPanelOpen, setIsAgentPanelOpen, isAgentThinking, setIsAgentThinking, agentModuleMode, setAgentModuleMode, agentImagePrompt, setAgentImagePrompt, agentCodeLanguage, setAgentCodeLanguage, handleTerminalSubmit, handleNetworkChange, handleAgentSubmit, handlePhotoGeneratorClick, handleCodeGeneratorClick, handleCreateProject, handleUpdateRawDb, handleAddDbNode, handleDeleteDbNode, handleSyncDatabase, handleStartDeployment, handleCreateShortLink, handleSendTestSms, handleVerifyOtp, handleSectionClick, handleSubMenuClick, startAtomicDeepScan } = state;
  const { CheckCircle2, FileCode, Lock, Plus, Send, Sparkles, TerminalIcon, Trash2 } = LucideIcons;
  const ADMIN_PASSWORD = '6606.ok';
  return (
        <>
          <div className="space-y-6 animate-fade-in">
            {/* Header section with PHRS-like sub-navigation */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="p-4 sm:p-6 sm:pb-2 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 leading-tight">Agent Platform <br className="sm:hidden" />(డైనమిక్ కోర్)</h2>
                  </div>
                  <button 
                    onClick={() => {
                      setAgentPlatformSubTab('agents');
                      setHomeToast("Ready to create a new autonomous agent");
                      setTimeout(() => setHomeToast(null), 2500);
                    }}
                    className="flex items-center justify-center w-full sm:w-auto gap-2 px-4 py-2.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition shadow-sm"
                  >
                    <Plus className="w-4 h-4 shrink-0" />
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
                                    setTimeout(() => {
                                      setShowSystemRules(true);
                                      setRuleCountdown(50);
                                    }, 1000);
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
                      <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl font-mono text-xs text-blue-300 space-y-4 shadow-2xl overflow-y-auto max-h-[60vh]">
                        <p className="text-amber-500 font-bold underline">MANDATORY SYSTEM PROTOCOL (40 GOLDEN RULES - 50 SECONDS TIMING)</p>
                        <p>1. Admin Auth: Password 6606.ok and 'OK' mandatory.</p>
                        <p>2. Pin-point Edits: No full file rewrites allowed.</p>
                        <p>3. Zero-Bug Policy: Lint and Build must pass.</p>
                        <p>4. Reporting: Mandatory Audit Report after edits.</p>
                        <p>5. Deep Scan: 50s wait after every 2 edits.</p>
                        <p>6. No Placeholders: Every code block must be functional.</p>
                        <p>7. Security: API keys only via server-side proxy.</p>
                        <p>8. PHRS Network: Node connections must be verified via IP mapping.</p>
                        <p>9. Deployments: Live hosting updates require confirmation.</p>
                        <p>10. Database: Realtime Cluster schema adjustments require validation.</p>
                        <p>11. Authentication: User credentials must be encrypted in SQLite.</p>
                        <p>12. Gateway: SMS & OTP limits strictly enforced at 25 INR recharge.</p>
                        <p>13. Storage: Asset limits restricted to 50MB per upload.</p>
                        <p>14. Kernel Logs: Terminal streams must reflect real container processes.</p>
                        <p>15. UI Consistency: Tailwind CSS standard must be followed strictly.</p>
                        <p>16. Mobile Sync: Android APK endpoints must align with main server routing.</p>
                        <p>17. Firewall: Only whitelisted IP ranges can access the master console.</p>
                        <p>18. Version Control: Local commits trigger auto-sync with the AI agent.</p>
                        <p>19. Hybrid Bridge: AI agent connectivity requires WebSocket confirmation.</p>
                        <p>20. Telemetry: VPS Metrics should update every 2 seconds.</p>
                        <p>21. Rate Limiting: 100 requests per minute per node.</p>
                        <p>22. Secrets: Environment variables must be masked in the dashboard.</p>
                        <p>23. Backup: Nightly database snapshots to local dist/hosted/backups.</p>
                        <p>24. Analytics: Traffic routing logs stored for 30 days.</p>
                        <p>25. Webhooks: Third-party integration requires SSL endpoints.</p>
                        <p>26. Error Handling: Silent catch and log for non-critical exceptions.</p>
                        <p>27. Uptime: Auto-restart PM2 daemons on crash detection.</p>
                        <p>28. Docker: Container orchestration requires root privilege escalations.</p>
                        <p>29. Caching: Memorystore Redis fallback configured for sessions.</p>
                        <p>30. Scale: Horizontal pod autoscaler triggers at 80% CPU.</p>
                        <p>31. Isolation: Multi-tenant schemas must use distinct namespaces.</p>
                        <p>32. Dependencies: NPM audit enforced on every cloud build.</p>
                        <p>33. Access: Read-only views for unauthorized dashboard guests.</p>
                        <p>34. Routing: 404 paths redirect to the custom PHRS fallback page.</p>
                        <p>35. Styling: Dark mode and light mode must switch seamlessly.</p>
                        <p>36. Feedback: Toast notifications must disappear after 3 seconds.</p>
                        <p>37. Responsiveness: Dashboard components must flex on mobile displays.</p>
                        <p>38. Modularity: Reusable React components for terminal loggers.</p>
                        <p>39. Transparency: AI reasoning steps must be logged in audit trails.</p>
                        <p>40. Finality: 50-Second rule timer ensures mandatory review protocol completion.</p>
                        <p className="text-slate-500 italic">...All 40 rules are active and monitored in real-time on PHRS CROWD.</p>
                        <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                          <span className="text-[10px] text-amber-500 italic font-bold">Deep scan in progress... Please wait {ruleCountdown}s.</span>
                          <button 
                            disabled={ruleCountdown > 0}
                            onClick={() => setShowSystemRules(false)}
                            className={`px-4 py-1 rounded font-bold transition ${ruleCountdown > 0 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-500'}`}
                          >
                            {ruleCountdown > 0 ? `LOCKED (${ruleCountdown}s)` : 'ACKNOWLEDGE & RESUME'}
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
                {agentPlatformSubTab === 'security' && (
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/20">
                      <div className="flex items-center gap-3 mb-4">
                        <Lock className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-bold text-blue-900">Admin Protocol Settings & Atomic Deep Scan</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-4">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Protocol Rules & Deep Scan</h4>
                            <button 
                              onClick={() => { setShowSystemRules(true); setRuleCountdown(50); }}
                              className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-700 text-[10px] font-bold rounded transition"
                            >
                              VIEW ALL 40 RULES
                            </button>
                          </div>
                          <ul className="text-[11px] text-slate-600 space-y-3 list-disc pl-4">
                            <li>అడ్మిన్ అనుమతి లేకుండా ఏ చర్య తీసుకోబడదు.</li>
                            <li>ప్రతి మార్పుకు పాస్‌వర్డ్ మరియు కన్ఫర్మేషన్ అవసరం.</li>
                            <li>అక్షరాల స్థాయి సవరణలు మాత్రమే అనుమతించబడతాయి.</li>
                            <li className="text-blue-700 font-bold">100-Second Atomic Deep Scan: ప్రతి సబ్-ఫీచర్, బటన్, మరియు కోడ్ లైన్ నిరంతరం 100 సెకన్ల టైమర్‌తో వెరిఫై చేయപ്പെടాలి.</li>
                            <li className="text-emerald-700 font-bold">Agent Timing Scheduler: ఏజెంట్లు మరియు ఆటోమేటెడ్ టాస్క్‌లు టైమింగ్ సెట్ చేసుకుని బ్యాక్‌గ్రౌండ్‌లో రన్ అవ్వాలి.</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-4">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">100s Atomic Deep Scan Scheduler</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                              <div>
                                <div className="text-xs font-bold text-slate-800">Scan Status</div>
                                <div className="text-[10px] text-slate-500 font-mono">
                                  {isAtomicScanning ? `Scanning... Time remaining: ${deepScanTimer}s` : 'Ready for Atomic Scan'}
                                </div>
                              </div>
                              <button
                                onClick={startAtomicDeepScan}
                                disabled={isAtomicScanning}
                                className={`px-4 py-2 rounded-lg font-bold text-xs text-white transition ${
                                  isAtomicScanning ? 'bg-amber-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                              >
                                {isAtomicScanning ? `SCANNING (${deepScanTimer}s)` : 'START 100s DEEP SCAN'}
                              </button>
                            </div>

                            {/* Live Atomic Scan Logs */}
                            <div className="bg-slate-950 text-emerald-400 font-mono text-[10px] p-3 rounded-xl h-36 overflow-y-auto space-y-1">
                              {atomicLogs.length === 0 ? (
                                <span className="text-slate-500">Click start to run 100s atomic deep scan with live timer...</span>
                              ) : (
                                atomicLogs.map((log, idx) => (
                                  <div key={idx} className="leading-tight">{log}</div>
                                ))
                              )}
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
        </>
  );
}
