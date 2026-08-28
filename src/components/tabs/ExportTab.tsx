import React from 'react';
import * as LucideIcons from 'lucide-react';
import { vpsServerJs, vpsReadmeMd, vpsPackageJson } from '../../vpsCodeTemplates';

export default function ExportTab({ state }: { state: any }) {
  const { isAutoInternetEnabled, setIsAutoInternetEnabled, isDarkMode, setIsDarkMode, isAuthenticated, setIsAuthenticated, loginView, setLoginView, appIconUrl, setAppIconUrl, pkgName, setPkgName, shaFingerprint, setShaFingerprint, activeTab, setActiveTab, snippetFormat, setSnippetFormat, projects, setProjects, selectedProjectId, setSelectedProjectId, newProjName, setNewProjName, showNewProjModal, setShowNewProjModal, showUpiModal, setShowUpiModal, searchQuery, setSearchQuery, notifications, setNotifications, showNotifications, setShowNotifications, metrics, setMetrics, cpuHistory, setCpuHistory, vpsLogStream, setVpsLogStream, isMiniServerRunning, setIsMiniServerRunning, miniServerPort, setMiniServerPort, miniServerIp, setMiniServerIp, terminalHistory, setTerminalHistory, terminalInput, setTerminalInput, stealthDataBalanceMb, setStealthDataBalanceMb, stealthSmsCredits, setStealthSmsCredits, stealthWalletRupees, setStealthWalletRupees, showStandaloneBanner, setShowStandaloneBanner, localServerIpInput, setLocalServerIpInput, dbData, setDbData, dbRawText, setDbRawText, isRawDbView, setIsRawDbView, dbSuccessMessage, setDbSuccessMessage, isSyncingDb, setIsSyncingDb, dbKeyPath, setDbKeyPath, dbNewVal, setDbNewVal, deployments, setDeployments, githubUrl, setGithubUrl, appName, setAppName, appPort, setAppPort, appTech, setAppTech, buildLogs, setBuildLogs, isBuilding, setIsBuilding, buildProgress, setBuildProgress, activeVirtualApp, setActiveVirtualApp, simulatedVisitorCount, setSimulatedVisitorCount, smartRouteModal, setSmartRouteModal, shortLinks, setShortLinks, linkSlug, setLinkSlug, linkTarget, setLinkTarget, hostFileName, setHostFileName, hostContent, setHostContent, deployedUrl, setDeployedUrl, isDeploying, setIsDeploying, hostedHtml, setHostedHtml, smsGateway, setSmsGateway, smsApiKey, setSmsApiKey, smsAccountSid, setSmsAccountSid, smsSenderId, setSmsSenderId, smsTemplate, setSmsTemplate, testPhoneNumber, setTestPhoneNumber, isSendingOtp, setIsSendingOtp, lastGeneratedOtp, setLastGeneratedOtp, verificationInput, setVerificationInput, verificationStatus, setVerificationStatus, virtualPhoneNotification, setVirtualPhoneNotification, phoneScreenOn, setPhoneScreenOn, apiKeys, setApiKeys, isRoutingActive, setIsRoutingActive, routingHistory, setRoutingHistory, activeRouterPrompt, setActiveRouterPrompt, activeRouterModel, setActiveRouterModel, isRoutingLoading, setIsRoutingLoading, activeExportFile, setActiveExportFile, billingBudget, setBillingBudget, billingAlertAmount, setBillingAlertAmount, billingAlertEmail, setBillingAlertEmail, billingSubTab, setBillingSubTab, envTranslationMappings, setEnvTranslationMappings, secretManagerSubTab, setSecretManagerSubTab, iamMembers, setIamMembers, newMemberEmail, setNewMemberEmail, newMemberRole, setNewMemberRole, selectedMarketplaceApp, setSelectedMarketplaceApp, customSystemPrompt, setCustomSystemPrompt, agentChatInput, setAgentChatInput, agentChatHistory, setAgentChatHistory, k8sPods, setK8sPods, buckets, setBuckets, newBucketName, setNewBucketName, storageFiles, setStorageFiles, uploadFileName, setUploadFileName, uploadTargetBucket, setUploadTargetBucket, isUploading, setIsUploading, firewallPolicy, setFirewallPolicy, sslStatus, setSslStatus, generatedKeyPair, setGeneratedKeyPair, bqQuery, setBqQuery, bqResults, setBqResults, bqRunning, setBqRunning, monitorUptime, setMonitorUptime, activeAlerts, setActiveAlerts, isHybridDevMode, setIsHybridDevMode, isAiServerBypassed, setIsAiServerBypassed, remoteNodeIp, setRemoteNodeIp, deviceSerial, setDeviceSerial, deepseekApiKey, setDeepseekApiKey, showAdminPortal, setShowAdminPortal, isAdminGmailVerified, setIsAdminGmailVerified, adminGmail, setAdminGmail, isVerifyingGmail, setIsVerifyingGmail, uploadedZipName, setUploadedZipName, zipFile, setZipFile, isUploadingZip, setIsUploadingZip, zipUploadProgress, setZipUploadProgress, isCompiling, setIsCompiling, compilationProgress, setCompilationProgress, compilationLogs, setCompilationLogs, tempRemoteNodeIp, setTempRemoteNodeIp, tempDeviceSerial, setTempDeviceSerial, tempDeepseekApiKey, setTempDeepseekApiKey, cloudRunImage, setCloudRunImage, cloudRunEnvVars, setCloudRunEnvVars, revisionTraffic, setRevisionTraffic, subnets, setSubnets, firewallRules, setFirewallRules, newSubnetName, setNewSubnetName, newSubnetRange, setNewSubnetRange, newFireRuleName, setNewFireRuleName, newFireRulePort, setNewFireRulePort, newFireRuleRange, setNewFireRuleRange, newFireRuleAction, setNewFireRuleAction, vpcSubTab, setVpcSubTab, ipInventory, setIpInventory, deviceCarrierIp, setDeviceCarrierIp, networkLatency, setNetworkLatency, mobileIp, setMobileIp, isBridgeActive, setIsBridgeActive, isAdminAuthorized, setIsAdminAuthorized, adminPasswordInput, setAdminPasswordInput, showAuthModal, setShowAuthModal, modificationCount, setModificationCount, showSystemRules, setShowSystemRules, ruleCountdown, setRuleCountdown, protocolStep, setProtocolStep, sqlTables, setSqlTables, newTableName, setNewTableName, newTableCols, setNewTableCols, sqlBackups, setSqlBackups, mapsApiKey, setMapsApiKey, mapsSelectedEndpoint, setMapsSelectedEndpoint, mapsActiveTrackingId, setMapsActiveTrackingId, isSidebarOpen, setIsSidebarOpen, expandedSection, setExpandedSection, selectedSubMenu, setSelectedSubMenu, agents, setAgents, selectedAgentId, setSelectedAgentId, newAgentName, setNewAgentName, newAgentModel, setNewAgentModel, newAgentPrompt, setNewAgentPrompt, agentPlatformSubTab, setAgentPlatformSubTab, securitySubTab, setSecuritySubTab, cloudStorageSubTab, setCloudStorageSubTab, monitoringSubTab, setMonitoringSubTab, iamSubTab, setIamSubTab, apisSubTab, setApisSubTab, cloudRunSubTab, setCloudRunSubTab, cloudHubSubTab, setCloudHubSubTab, phrsMapsSubTab, setPhrsMapsSubTab, bigQuerySubTab, setBigQuerySubTab, phrsDbSubTab, setPhrsDbSubTab, cloudRunJobs, setCloudRunJobs, isCreatingJob, setIsCreatingJob, newJobName, setNewJobName, newJobSchedule, setNewJobSchedule, workerPools, setWorkerPools, isCreatingPool, setIsCreatingPool, newPoolName, setNewPoolName, domainMappings, setDomainMappings, selectedDomain, setSelectedDomain, domainFilterQuery, setDomainFilterQuery, isCreatingDomain, setIsCreatingDomain, newDomainName, setNewDomainName, newDomainService, setNewDomainService, newDomainType, setNewDomainType, isFleetBannerVisible, setIsFleetBannerVisible, isFleetBannerExpanded, setIsFleetBannerExpanded, dbProductFilter, setDbProductFilter, dbLocationFilter, setDbLocationFilter, isProductFilterOpen, setIsProductFilterOpen, isLocationFilterOpen, setIsLocationFilterOpen, phrsUsers, setPhrsUsers, newAuthEmail, setNewAuthEmail, newAuthPassword, setNewAuthPassword, firestoreCollections, setFirestoreCollections, selectedCollection, setSelectedCollection, selectedDocId, setSelectedDocId, isCreatingCollection, setIsCreatingCollection, newCollectionName, setNewCollectionName, isCreatingDoc, setIsCreatingDoc, newDocId, setNewDocId, phrsStorageFiles, setPhrsStorageFiles, isDraggingFile, setIsDraggingFile, deepScanTimer, setDeepScanTimer, isAtomicScanning, setIsAtomicScanning, atomicLogs, setAtomicLogs, homeSubTab, setHomeSubTab, isWelcomeBoardOpen, setIsWelcomeBoardOpen, homeToast, setHomeToast, agentSearchQuery, setAgentSearchQuery, dashboardAgentChatHistory, setDashboardAgentChatHistory, isAgentPanelOpen, setIsAgentPanelOpen, isAgentThinking, setIsAgentThinking, agentModuleMode, setAgentModuleMode, agentImagePrompt, setAgentImagePrompt, agentCodeLanguage, setAgentCodeLanguage, handleTerminalSubmit, handleNetworkChange, handleAgentSubmit, handlePhotoGeneratorClick, handleCodeGeneratorClick, handleCreateProject, handleUpdateRawDb, handleAddDbNode, handleDeleteDbNode, handleSyncDatabase, handleStartDeployment, handleCreateShortLink, handleSendTestSms, handleVerifyOtp, handleSectionClick, handleSubMenuClick } = state;
  const { Download, FileCode } = LucideIcons;
  return (
        <>
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
        </>
  );
}
