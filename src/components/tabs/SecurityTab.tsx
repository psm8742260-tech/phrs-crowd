import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function SecurityTab({ state }: { state: any }) {
  const { isAutoInternetEnabled, setIsAutoInternetEnabled, isDarkMode, setIsDarkMode, isAuthenticated, setIsAuthenticated, loginView, setLoginView, appIconUrl, setAppIconUrl, pkgName, setPkgName, shaFingerprint, setShaFingerprint, activeTab, setActiveTab, snippetFormat, setSnippetFormat, projects, setProjects, selectedProjectId, setSelectedProjectId, newProjName, setNewProjName, showNewProjModal, setShowNewProjModal, showUpiModal, setShowUpiModal, searchQuery, setSearchQuery, notifications, setNotifications, showNotifications, setShowNotifications, metrics, setMetrics, cpuHistory, setCpuHistory, vpsLogStream, setVpsLogStream, isMiniServerRunning, setIsMiniServerRunning, miniServerPort, setMiniServerPort, miniServerIp, setMiniServerIp, terminalHistory, setTerminalHistory, terminalInput, setTerminalInput, stealthDataBalanceMb, setStealthDataBalanceMb, stealthSmsCredits, setStealthSmsCredits, stealthWalletRupees, setStealthWalletRupees, showStandaloneBanner, setShowStandaloneBanner, localServerIpInput, setLocalServerIpInput, dbData, setDbData, dbRawText, setDbRawText, isRawDbView, setIsRawDbView, dbSuccessMessage, setDbSuccessMessage, isSyncingDb, setIsSyncingDb, dbKeyPath, setDbKeyPath, dbNewVal, setDbNewVal, deployments, setDeployments, githubUrl, setGithubUrl, appName, setAppName, appPort, setAppPort, appTech, setAppTech, buildLogs, setBuildLogs, isBuilding, setIsBuilding, buildProgress, setBuildProgress, activeVirtualApp, setActiveVirtualApp, simulatedVisitorCount, setSimulatedVisitorCount, smartRouteModal, setSmartRouteModal, shortLinks, setShortLinks, linkSlug, setLinkSlug, linkTarget, setLinkTarget, hostFileName, setHostFileName, hostContent, setHostContent, deployedUrl, setDeployedUrl, isDeploying, setIsDeploying, hostedHtml, setHostedHtml, smsGateway, setSmsGateway, smsApiKey, setSmsApiKey, smsAccountSid, setSmsAccountSid, smsSenderId, setSmsSenderId, smsTemplate, setSmsTemplate, testPhoneNumber, setTestPhoneNumber, isSendingOtp, setIsSendingOtp, lastGeneratedOtp, setLastGeneratedOtp, verificationInput, setVerificationInput, verificationStatus, setVerificationStatus, virtualPhoneNotification, setVirtualPhoneNotification, phoneScreenOn, setPhoneScreenOn, apiKeys, setApiKeys, isRoutingActive, setIsRoutingActive, routingHistory, setRoutingHistory, activeRouterPrompt, setActiveRouterPrompt, activeRouterModel, setActiveRouterModel, isRoutingLoading, setIsRoutingLoading, activeExportFile, setActiveExportFile, billingBudget, setBillingBudget, billingAlertAmount, setBillingAlertAmount, billingAlertEmail, setBillingAlertEmail, billingSubTab, setBillingSubTab, envTranslationMappings, setEnvTranslationMappings, secretManagerSubTab, setSecretManagerSubTab, iamMembers, setIamMembers, newMemberEmail, setNewMemberEmail, newMemberRole, setNewMemberRole, selectedMarketplaceApp, setSelectedMarketplaceApp, customSystemPrompt, setCustomSystemPrompt, agentChatInput, setAgentChatInput, agentChatHistory, setAgentChatHistory, k8sPods, setK8sPods, buckets, setBuckets, newBucketName, setNewBucketName, storageFiles, setStorageFiles, uploadFileName, setUploadFileName, uploadTargetBucket, setUploadTargetBucket, isUploading, setIsUploading, firewallPolicy, setFirewallPolicy, sslStatus, setSslStatus, generatedKeyPair, setGeneratedKeyPair, bqQuery, setBqQuery, bqResults, setBqResults, bqRunning, setBqRunning, monitorUptime, setMonitorUptime, activeAlerts, setActiveAlerts, isHybridDevMode, setIsHybridDevMode, isAiServerBypassed, setIsAiServerBypassed, remoteNodeIp, setRemoteNodeIp, deviceSerial, setDeviceSerial, deepseekApiKey, setDeepseekApiKey, showAdminPortal, setShowAdminPortal, isAdminGmailVerified, setIsAdminGmailVerified, adminGmail, setAdminGmail, isVerifyingGmail, setIsVerifyingGmail, uploadedZipName, setUploadedZipName, zipFile, setZipFile, isUploadingZip, setIsUploadingZip, zipUploadProgress, setZipUploadProgress, isCompiling, setIsCompiling, compilationProgress, setCompilationProgress, compilationLogs, setCompilationLogs, tempRemoteNodeIp, setTempRemoteNodeIp, tempDeviceSerial, setTempDeviceSerial, tempDeepseekApiKey, setTempDeepseekApiKey, cloudRunImage, setCloudRunImage, cloudRunEnvVars, setCloudRunEnvVars, revisionTraffic, setRevisionTraffic, subnets, setSubnets, firewallRules, setFirewallRules, newSubnetName, setNewSubnetName, newSubnetRange, setNewSubnetRange, newFireRuleName, setNewFireRuleName, newFireRulePort, setNewFireRulePort, newFireRuleRange, setNewFireRuleRange, newFireRuleAction, setNewFireRuleAction, vpcSubTab, setVpcSubTab, ipInventory, setIpInventory, deviceCarrierIp, setDeviceCarrierIp, networkLatency, setNetworkLatency, mobileIp, setMobileIp, isBridgeActive, setIsBridgeActive, isAdminAuthorized, setIsAdminAuthorized, adminPasswordInput, setAdminPasswordInput, showAuthModal, setShowAuthModal, modificationCount, setModificationCount, showSystemRules, setShowSystemRules, ruleCountdown, setRuleCountdown, protocolStep, setProtocolStep, sqlTables, setSqlTables, newTableName, setNewTableName, newTableCols, setNewTableCols, sqlBackups, setSqlBackups, mapsApiKey, setMapsApiKey, mapsSelectedEndpoint, setMapsSelectedEndpoint, mapsActiveTrackingId, setMapsActiveTrackingId, isSidebarOpen, setIsSidebarOpen, expandedSection, setExpandedSection, selectedSubMenu, setSelectedSubMenu, agents, setAgents, selectedAgentId, setSelectedAgentId, newAgentName, setNewAgentName, newAgentModel, setNewAgentModel, newAgentPrompt, setNewAgentPrompt, agentPlatformSubTab, setAgentPlatformSubTab, securitySubTab, setSecuritySubTab, cloudStorageSubTab, setCloudStorageSubTab, monitoringSubTab, setMonitoringSubTab, iamSubTab, setIamSubTab, apisSubTab, setApisSubTab, cloudRunSubTab, setCloudRunSubTab, cloudHubSubTab, setCloudHubSubTab, phrsMapsSubTab, setPhrsMapsSubTab, bigQuerySubTab, setBigQuerySubTab, phrsDbSubTab, setPhrsDbSubTab, cloudRunJobs, setCloudRunJobs, isCreatingJob, setIsCreatingJob, newJobName, setNewJobName, newJobSchedule, setNewJobSchedule, workerPools, setWorkerPools, isCreatingPool, setIsCreatingPool, newPoolName, setNewPoolName, domainMappings, setDomainMappings, selectedDomain, setSelectedDomain, domainFilterQuery, setDomainFilterQuery, isCreatingDomain, setIsCreatingDomain, newDomainName, setNewDomainName, newDomainService, setNewDomainService, newDomainType, setNewDomainType, isFleetBannerVisible, setIsFleetBannerVisible, isFleetBannerExpanded, setIsFleetBannerExpanded, dbProductFilter, setDbProductFilter, dbLocationFilter, setDbLocationFilter, isProductFilterOpen, setIsProductFilterOpen, isLocationFilterOpen, setIsLocationFilterOpen, phrsUsers, setPhrsUsers, newAuthEmail, setNewAuthEmail, newAuthPassword, setNewAuthPassword, firestoreCollections, setFirestoreCollections, selectedCollection, setSelectedCollection, selectedDocId, setSelectedDocId, isCreatingCollection, setIsCreatingCollection, newCollectionName, setNewCollectionName, isCreatingDoc, setIsCreatingDoc, newDocId, setNewDocId, phrsStorageFiles, setPhrsStorageFiles, isDraggingFile, setIsDraggingFile, deepScanTimer, setDeepScanTimer, isAtomicScanning, setIsAtomicScanning, atomicLogs, setAtomicLogs, homeSubTab, setHomeSubTab, isWelcomeBoardOpen, setIsWelcomeBoardOpen, homeToast, setHomeToast, agentSearchQuery, setAgentSearchQuery, dashboardAgentChatHistory, setDashboardAgentChatHistory, isAgentPanelOpen, setIsAgentPanelOpen, isAgentThinking, setIsAgentThinking, agentModuleMode, setAgentModuleMode, agentImagePrompt, setAgentImagePrompt, agentCodeLanguage, setAgentCodeLanguage, handleTerminalSubmit, handleNetworkChange, handleAgentSubmit, handlePhotoGeneratorClick, handleCodeGeneratorClick, handleCreateProject, handleUpdateRawDb, handleAddDbNode, handleDeleteDbNode, handleSyncDatabase, handleStartDeployment, handleCreateShortLink, handleSendTestSms, handleVerifyOtp, handleSectionClick, handleSubMenuClick } = state;
  const { CheckCircle2, Lock } = LucideIcons;
  return (
        <>
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">Security Command Center</h2>
                    <p className="text-xs text-slate-500 max-w-2xl mt-1">
                      Centralized security, compliance, and posture management for all configured cloud environments.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-4 border-b border-slate-100">
                {['Security Command Center', 'Overview', 'Graph Search', 'Issues', 'Findings', 'Assets', 'Compliance', 'Posture Management'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => {
                      setSecuritySubTab(tab);
                      setHomeToast(`Security: Navigated to ${tab}`);
                      setTimeout(() => setHomeToast(null), 2500);
                    }}
                    className={`px-4 py-2 rounded-t-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      securitySubTab === tab
                        ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                        : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {securitySubTab === 'Security Command Center' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5 p-5 rounded-2xl border border-slate-200 bg-white">
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">TERMINAL KEYPAIR GENERATOR</h3>
                  <p className="text-xs text-slate-500 mb-4">Click below to generate a secure RSA 2048-bit keypair for root ssh operations onto standalone local networks.</p>
                  
                  <button 
                    onClick={() => {
                      const randomId = Math.random().toString(36).substring(7);
                      setGeneratedKeyPair({
                        public: `ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC8u6PHRS_${randomId}...`,
                        private: `-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAsPHRS_${randomId}...\n-----END RSA PRIVATE KEY-----`
                      });
                      setHomeToast("✓ Cryptographic SSH Keypair compiled!");
                      setTimeout(() => setHomeToast(null), 3000);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2.5 rounded-lg font-semibold transition mb-4"
                  >
                    GENERATE 2048-BIT SSH KEYPAIR
                  </button>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[9px] font-mono text-slate-400 mb-1">ACTIVE PROTECTION ROUTE POLICY</label>
                      <div className="flex gap-2">
                        {['strict', 'balanced', 'permissive'].map((policy) => (
                          <button 
                            key={policy}
                            onClick={() => setFirewallPolicy(policy)}
                            className={`flex-1 py-1.5 px-2 text-[10px] font-mono rounded border transition ${firewallPolicy === policy ? 'bg-indigo-50 border-indigo-500 text-indigo-600 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                          >
                            {policy.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 p-5 rounded-2xl border border-slate-200 bg-white">
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4 font-semibold">SECURITY BLUEPRINTS & CREDENTIALS</h3>
                  {generatedKeyPair ? (
                    <div className="space-y-4 font-mono text-[10px]">
                      <div>
                        <span className="text-indigo-500 font-bold block mb-1">PUBLIC KEY (remote authorized_keys):</span>
                        <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg select-all max-h-[60px] overflow-y-auto">
                          {generatedKeyPair.public}
                        </div>
                      </div>
                      <div>
                        <span className="text-amber-600 font-bold block mb-1">PRIVATE KEY (local server identification - keep secret!):</span>
                        <div className="p-3 bg-slate-900 text-emerald-400 border border-slate-800 rounded-lg select-all max-h-[100px] overflow-y-auto whitespace-pre">
                          {generatedKeyPair.private}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[200px] text-slate-400 font-mono text-xs italic">
                      No keys generated yet. Click generate on the left.
                    </div>
                  )}
                </div>
              </div>
            )}


            {securitySubTab === 'Overview' && (
              <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-mono font-bold text-sm tracking-wider text-slate-800 uppercase">Security Command Center Overview</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                   <div className="p-6 bg-rose-50 border border-rose-100 rounded-xl hover:shadow-md transition cursor-pointer">
                     <p className="text-sm font-semibold text-rose-900 mb-1">Critical Vulnerabilities</p>
                     <p className="text-4xl font-black text-rose-600">2</p>
                   </div>
                   <div className="p-6 bg-amber-50 border border-amber-100 rounded-xl hover:shadow-md transition cursor-pointer">
                     <p className="text-sm font-semibold text-amber-900 mb-1">Open Security Issues</p>
                     <p className="text-4xl font-black text-amber-600">14</p>
                   </div>
                   <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-xl hover:shadow-md transition cursor-pointer">
                     <p className="text-sm font-semibold text-emerald-900 mb-1">Threats Blocked (24h)</p>
                     <p className="text-4xl font-black text-emerald-600">83</p>
                   </div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center">
                  <p className="text-xs text-slate-600"><strong>System Status:</strong> Overall security posture is stable. 2 Critical patches require immediate attention.</p>
                  <button onClick={() => setSecuritySubTab('Issues')} className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold shadow-sm hover:bg-slate-50">View Issues</button>
                </div>
              </div>
            )}

            {securitySubTab === 'Graph Search' && (
              <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm animate-fade-in">
                <h3 className="font-mono font-bold text-sm tracking-wider text-slate-800 uppercase mb-4">Graph Search Builder</h3>
                <p className="text-xs text-slate-500 mb-4">Run complex security queries across your PHRS Crowd resources to identify access paths and vulnerabilities.</p>
                <div className="flex gap-4">
                  <input type="text" defaultValue="MATCH (n:VirtualMachine) WHERE n.publicIp IS NOT NULL RETURN n" className="flex-1 p-3 border border-slate-200 rounded-lg font-mono text-xs focus:ring-1 focus:ring-indigo-500 bg-slate-50" />
                  <button onClick={() => alert('Executing graph query on analytical backend...')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-500 transition shadow-sm">SEARCH</button>
                </div>
                <div className="mt-6 border-2 border-dashed border-slate-200 rounded-xl h-40 flex items-center justify-center text-slate-400 font-mono text-xs bg-slate-50">
                  Ready to execute CYPHER query...
                </div>
              </div>
            )}

            {securitySubTab === 'Issues' && (
              <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-mono font-bold text-sm tracking-wider text-slate-800 uppercase">Active Security Issues</h3>
                  <button onClick={() => alert('Exporting issues as CSV...')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded transition">Export CSV</button>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'SEC-001', title: 'Open SSH port exposed to internet', severity: 'Critical', resource: 'vps-core-node-1' },
                    { id: 'SEC-002', title: 'IAM policy grants overly broad permissions', severity: 'High', resource: 'Project Wide' },
                    { id: 'SEC-003', title: 'Unencrypted storage bucket detected', severity: 'High', resource: 'static-phrs-assets' },
                    { id: 'SEC-004', title: 'Weak SSL Cipher Suite in Load Balancer', severity: 'Medium', resource: 'load-balancer-int' }
                  ].map((issue, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className={`mt-0.5 w-3 h-3 rounded-full ${issue.severity === 'Critical' ? 'bg-rose-500' : issue.severity === 'High' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{issue.title}</p>
                          <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 font-mono">
                            <span className="font-bold">ID: {issue.id}</span>
                            <span>•</span>
                            <span>Resource: {issue.resource}</span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => alert(`Initiating automated fix for ${issue.id}...`)} className="mt-4 sm:mt-0 px-4 py-1.5 bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 rounded-lg text-xs font-medium text-slate-700 shadow-sm transition-colors">
                        Resolve Issue
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {securitySubTab === 'Findings' && (
              <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-mono font-bold text-sm tracking-wider text-slate-800 uppercase">Vulnerability Findings</h3>
                  <button onClick={() => alert('Running deep vulnerability scanner...')} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded hover:bg-indigo-100">Scan System</button>
                </div>
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                      <th className="py-3 px-4 font-bold">FINDING CATEGORY</th>
                      <th className="py-3 px-4 font-bold">DETECTOR MODULE</th>
                      <th className="py-3 px-4 font-bold">CURRENT STATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-bold text-slate-700">Container Privilege Escalation</td>
                      <td className="py-4 px-4 text-slate-600">Event Threat Detection</td>
                      <td className="py-4 px-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded font-bold text-[10px]">MITIGATED</span></td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-bold text-slate-700">Anomalous IAM Grant</td>
                      <td className="py-4 px-4 text-slate-600">Web Security Scanner</td>
                      <td className="py-4 px-4"><span className="px-2 py-1 bg-rose-100 text-rose-700 rounded font-bold text-[10px]">ACTIVE</span></td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-bold text-slate-700">Exposed API Key in Codebase</td>
                      <td className="py-4 px-4 text-slate-600">Secret Manager Agent</td>
                      <td className="py-4 px-4"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded font-bold text-[10px]">INVESTIGATING</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {securitySubTab === 'Assets' && (
              <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-mono font-bold text-sm tracking-wider text-slate-800 uppercase">Discovered Assets Inventory</h3>
                  <button onClick={() => alert('Triggering network asset discovery scan...')} className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 shadow-sm">Discover Assets</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Compute Instances', count: 14, icon: '🖥️' },
                    { label: 'Storage Buckets', count: 8, icon: '🪣' },
                    { label: 'Cloud SQL DBs', count: 3, icon: '🗄️' },
                    { label: 'VPC Networks', count: 2, icon: '🌐' }
                  ].map(asset => (
                    <div key={asset.label} className="p-5 border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition rounded-xl text-center cursor-pointer" onClick={() => alert(`Viewing details for ${asset.label}`)}>
                      <div className="text-3xl mb-3">{asset.icon}</div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{asset.label}</p>
                      <p className="text-3xl font-black text-slate-800 mt-1">{asset.count}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {securitySubTab === 'Compliance' && (
              <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-mono font-bold text-sm tracking-wider text-slate-800 uppercase">Compliance Frameworks</h3>
                  <button onClick={() => alert('Downloading compliance report...')} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded">Export Report</button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'CIS Google Cloud Computing Foundations v1.2.0', score: 85, pass: 42, fail: 8 },
                    { name: 'PCI DSS v3.2.1', score: 92, pass: 104, fail: 3 },
                    { name: 'ISO 27001', score: 78, pass: 88, fail: 15 }
                  ].map(standard => (
                    <div key={standard.name} className="p-5 border border-slate-200 rounded-xl flex flex-col md:flex-row md:justify-between md:items-center bg-slate-50 hover:bg-white hover:shadow-sm transition cursor-pointer" onClick={() => alert(`Generating detailed PDF report for ${standard.name}`)}>
                      <div className="font-bold text-sm text-slate-800 mb-4 md:mb-0">{standard.name}</div>
                      <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
                        <div className="flex gap-4 text-xs justify-between md:justify-start w-full md:w-auto">
                          <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">{standard.pass} PASS</span>
                          <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded">{standard.fail} FAIL</span>
                        </div>
                        <div className="w-full md:w-48 bg-slate-200 rounded-full h-2.5">
                          <div className={`h-2.5 rounded-full ${standard.score > 90 ? 'bg-emerald-500' : standard.score > 80 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{width: standard.score + "%"}}></div>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-700">{standard.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {securitySubTab === 'Posture Management' && (
              <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm animate-fade-in">
                <h3 className="font-mono font-bold text-sm tracking-wider text-slate-800 uppercase mb-4">Security Posture Dashboard</h3>
                <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Posture is Healthy</h4>
                  <p className="text-sm text-slate-500 max-w-md mx-auto">No major organizational misconfigurations detected. All VPC perimeters are secured and IAM grants are within acceptable bounds.</p>
                  <button onClick={() => alert('Refreshing organization posture state...')} className="mt-6 px-6 py-2 bg-slate-900 shadow-md rounded-lg text-sm font-bold text-white hover:bg-slate-800 transition">Run Full Posture Scan</button>
                </div>
              </div>
            )}
          </div>
        </>
  );
}
