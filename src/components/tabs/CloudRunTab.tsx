import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

export default function CloudRunTab({ state }: { state: any }) {
  const [uploadMode, setUploadMode] = React.useState<'code' | 'zip'>('code');
  const [localZipFile, setLocalZipFile] = React.useState<File | null>(null);
  const [deployStatus, setDeployStatus] = React.useState('');
  
  const [realDomainMappings, setRealDomainMappings] = React.useState<Record<string, string>>({});
  const [isMappingLoading, setIsMappingLoading] = React.useState(false);

  React.useEffect(() => {
    if (state.cloudRunSubTab === 'Domain mappings') {
      fetch('/api/domain-mappings')
        .then(r => r.json())
        .then(data => setRealDomainMappings(data))
        .catch(console.error);
    }
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

            {cloudRunSubTab === 'Overview' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5 p-5 rounded-2xl border border-slate-200 bg-white">
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">CONTAINER SETTINGS</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">IMAGE SOURCE URL</label>
                      <input 
                        type="text" 
                        value={cloudRunImage} 
                        onChange={(e) => setCloudRunImage(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-lg border font-mono bg-slate-100 border-slate-300 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">ENVIRONMENT VARIABLES</label>
                      <textarea 
                        rows={3}
                        value={cloudRunEnvVars} 
                        onChange={(e) => setCloudRunEnvVars(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-lg border font-mono bg-slate-100 border-slate-300 text-slate-900"
                      />
                    </div>

                    <button 
                      onClick={() => {
                        setHomeToast("✓ Deployed container image to active Cloud Run service revision!");
                        setTimeout(() => setHomeToast(null), 3000);
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2 rounded-lg font-semibold transition"
                    >
                      DEPLOY ACTIVE REVISION
                    </button>
                  </div>
                </div>

                <div className="md:col-span-7 p-5 rounded-2xl border border-slate-200 bg-white">
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4 font-semibold">TRAFFIC SPLITTING</h3>
                  <p className="text-xs text-slate-500 mb-4">Control what percentage of inbound traffic is routed to the new container image revision (Revision 2).</p>
                  
                  <div className="space-y-4 font-mono text-xs">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">TRAFFIC SPLIT (Revision 1 vs Revision 2)</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={revisionTraffic} 
                        onChange={(e) => setRevisionTraffic(Number(e.target.value))}
                        className="w-full cursor-pointer"
                      />
                      <div className="flex justify-between text-[8px] text-slate-300 mt-0.5">
                        <span>Revision 1 (Stable): {100 - revisionTraffic}%</span>
                        <span>Revision 2 (Candidate): {revisionTraffic}%</span>
                      </div>
                    </div>
                  </div>
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
                      ) : (
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

                          setIsDeploying(true);
                          setDeployStatus('Extracting project files...');
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
                                if (uploadMode === 'zip') {
                                    setDeployStatus('Resolving dependencies (npm install)...');
                                    await new Promise(r => setTimeout(r, 1500));
                                    setDeployStatus('Starting background worker (npm start)...');
                                    await new Promise(r => setTimeout(r, 1000));
                                    setDeployStatus('Generating live public URL...');
                                    await new Promise(r => setTimeout(r, 500));
                                }

                                const tunnelRes = await fetch('/api/tunnel-status');
                                const tunnelData = await tunnelRes.json();
                                const baseUrl = (tunnelData.status === 'online' && tunnelData.url) ? tunnelData.url : window.location.origin;
                                
                                const finalUrl = `https://phrscrowd.online/p/${appName.replace(/[^a-z0-9.-]/gi, "_").toLowerCase()}/`;
                                setDeployedUrl(finalUrl);
                                const updatedProjects = projects.map((p: any) => p.id === selectedProjectId ? { ...p, url: finalUrl } : p);
                                setProjects(updatedProjects);
                                localStorage.setItem('phrs_projects', JSON.stringify(updatedProjects));
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
              <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-mono font-bold text-sm tracking-wider text-slate-800 uppercase">Active Services</h3>
                  <div className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-mono font-bold border border-emerald-100">
                    FLEET: {projects.length} SERVICES ONLINE
                  </div>
                </div>
                <div className="space-y-4">
                  {projects.map((project: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${project.status === 'Running' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} title={project.status}></div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{project.name || 'Untitled Service'}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-slate-500 uppercase font-mono bg-slate-100 px-1.5 py-0.5 rounded">asia-southeast1</span>
                            <span className="text-[10px] text-slate-500 uppercase font-mono bg-slate-100 px-1.5 py-0.5 rounded">100% TRAFFIC</span>
                            {project.url && (
                              <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-[10px] text-indigo-600 font-bold hover:underline flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                VISIT URL
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition" 
                          onClick={() => {
                            setHomeToast(`✓ Pulling logs for ${project.name}...`);
                            setTimeout(() => setHomeToast(null), 2000);
                          }}
                        >
                          Manage
                        </button>
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl">
                      <Globe className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                      <p className="text-xs text-slate-400">No active services deployed yet.</p>
                    </div>
                  )}
                </div>
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
              <div className="p-6 rounded-2xl border bg-white border-slate-200 space-y-6">
                {/* Header matching Screenshot 2 */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Domain mappings</h3>
                    <span className="px-2 py-0.5 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
                      Preview
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsCreatingDomain(!isCreatingDomain)} 
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs px-3.5 py-1.5 rounded-lg font-semibold transition"
                    >
                      {isCreatingDomain ? 'Cancel' : '+ Map Domain'}
                    </button>
                    <button 
                      onClick={() => {
                        setHomeToast('Domain mappings options');
                        setTimeout(() => setHomeToast(null), 2000);
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition"
                      title="More actions"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* DNS Configuration Instructions (Solves "Browser not opening" issue) */}
                <div className="p-5 bg-amber-50/75 border border-amber-100 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-amber-800">
                    <Globe className="w-5 h-5 text-amber-600 shrink-0" />
                    <h4 className="text-sm font-bold">🌐 డొమైన్ యాక్టివేషన్ గైడ్ (Custom Domain Connection Guide)</h4>
                  </div>
                  <div className="text-xs text-amber-900 space-y-2 leading-relaxed">
                    <p>
                      మీరు కొనుగోలు చేసిన కస్టమ్ డొమైన్ (ఉదాహరణకు <strong className="font-mono text-slate-900 font-bold">phrscrowd.com</strong> లేదా <strong className="font-mono text-slate-900 font-bold">phrscrowd.online</strong>) ఏ బ్రౌజర్‌లోనైనా ఓపెన్ కావాలంటే, మీ డొమైన్ రిజిస్ట్రార్ (Cloudflare, GoDaddy, Namecheap మొదలైనవి) లో ఈ కింది విధంగా <strong className="font-semibold text-amber-950">CNAME Record</strong> ను సెట్ చేయాలి:
                    </p>
                    <div className="bg-slate-900 text-slate-100 p-3.5 rounded-lg font-mono text-[11px] space-y-1.5 select-all border border-slate-800">
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-400">Record Type:</span>
                        <span className="text-amber-400 font-bold">CNAME</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-400">Name (Host):</span>
                        <span className="text-emerald-400 font-bold">@</span> (or <span className="text-emerald-400 font-bold">www</span>)
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Target (Points to):</span>
                        <span className="text-indigo-400 font-bold select-all">
                          {typeof window !== 'undefined' ? window.location.hostname : 'ais-dev-o5if7fqu2usa7mc7klx2wp-398230688462.asia-southeast1.run.app'}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-amber-800 font-sans mt-1">
                      💡 <strong>గమనిక:</strong> CNAME రికార్డ్ జోడించిన తర్వాత, DNS వ్యాప్తి (Propagation) కి కొన్ని నిమిషాల సమయం పట్టవచ్చు. ఆ తర్వాత మీ డొమైన్ ప్రపంచవ్యాప్తంగా ఏ బ్రౌజర్‌పైన అయినా పర్ఫెక్ట్ గా ఓపెన్ అవుతుంది!
                    </p>
                  </div>
                </div>

                {isCreatingDomain && (
                  <div className="p-4 border border-indigo-100 bg-indigo-50/20 rounded-xl space-y-4 max-w-md font-mono text-xs animate-fade-in">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">DOMAIN NAME / HOSTNAME</label>
                      <input 
                        type="text" 
                        placeholder="e.g. app.ai.studio or portal.phrs-crowd.local" 
                        value={newDomainName} 
                        onChange={(e) => setNewDomainName(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">ROUTE TO PROJECT (HOSTED DIRECTORY)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. my-awesome-app" 
                        value={newDomainService} 
                        onChange={(e) => setNewDomainService(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white text-slate-800"
                      />
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
                            setVpsLogStream(prev => [...prev, `[ROUTER] Mapped domain: ${newDomainName} -> /hosted/${newDomainService}`]);
                            setNewDomainName('');
                            setNewDomainService('');
                            setIsCreatingDomain(false);
                            setHomeToast('✓ DNS Custom mapping configured and live!');
                          }
                        } catch (err) {
                          console.error(err);
                          alert('Failed to map domain.');
                        } finally {
                          setIsMappingLoading(false);
                          setTimeout(() => setHomeToast(null), 3000);
                        }
                      }}
                      disabled={isMappingLoading}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white py-2 rounded-lg font-semibold"
                    >
                      {isMappingLoading ? 'MAPPING...' : 'VALIDATE & MAP DOMAIN'}
                    </button>
                  </div>
                )}

                {/* Filter / Search Bar matching Screenshot 2 */}
                <div className="flex items-center justify-between gap-4 py-2 px-3 border border-slate-200 rounded-lg bg-slate-50/50">
                  <div className="flex items-center gap-2 flex-1 max-w-md">
                    <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-xs text-slate-500 font-medium">Filter</span>
                    <input 
                      type="text" 
                      placeholder="Filter domains" 
                      value={domainFilterQuery}
                      onChange={(e) => setDomainFilterQuery(e.target.value)}
                      className="bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none w-full ml-1"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      setHomeToast('Columns customized');
                      setTimeout(() => setHomeToast(null), 2000);
                    }}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded transition"
                    title="Configure columns"
                  >
                    <Sliders className="w-4 h-4" />
                  </button>
                </div>

                {/* Domain Mappings Table matching Screenshot 2 */}
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                      <tr>
                        <th className="py-3 px-4 w-8"></th>
                        <th className="py-3 px-2 w-8"></th>
                        <th className="py-3 px-4 font-semibold">URL</th>
                        <th className="py-3 px-4 font-semibold">Type</th>
                        <th className="py-3 px-4 text-right font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {Object.entries(realDomainMappings)
                        .filter(([domain]) => domain.toLowerCase().includes(domainFilterQuery.toLowerCase()))
                        .map(([domain, targetProject], idx) => {
                          const isSelected = selectedDomain === domain;
                        
  return (
                            <tr 
                              key={idx} 
                              onClick={() => setSelectedDomain(domain)}
                              className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/30' : ''}`}
                            >
                              <td className="py-3.5 px-4 w-8">
                                <input 
                                  type="radio" 
                                  name="domain_selection" 
                                  checked={isSelected}
                                  onChange={() => setSelectedDomain(domain)}
                                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                              </td>
                              <td className="py-3.5 px-2 w-8">
                                <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white" title="Active & Validated">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-medium text-slate-900">
                                <a 
                                  href={`https://${domain}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1.5 w-fit"
                                >
                                  <span>{domain}</span>
                                  <ExternalLink className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                </a>
                              </td>
                              <td className="py-3.5 px-4 text-slate-600">Custom URL <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded ml-1 text-slate-500 border border-slate-200">{"->"} {targetProject}</span></td>
                              <td className="py-3.5 px-4 text-right text-slate-400">
                                <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                  <span className="text-slate-300 select-none">—</span>
                                  <button 
                                    onClick={async () => {
                                      if (confirm(`Remove domain mapping for ${domain}?`)) {
                                        try {
                                          const res = await fetch(`/api/domain-mappings/${domain}`, { method: 'DELETE' });
                                          const data = await res.json();
                                          setRealDomainMappings(data.mappings);
                                          setVpsLogStream(prev => [...prev, `[DOMAIN-MAPPING] Removed domain mapping: ${domain}`]);
                                        } catch(e) { console.error(e); }
                                      }
                                    }}
                                    className="text-rose-400 hover:text-rose-600 p-1 rounded transition opacity-0 hover:opacity-100 group-hover:opacity-100"
                                    title="Delete mapping"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      {Object.keys(realDomainMappings).length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-400 font-mono text-xs">
                            No custom domains mapped yet. Map a domain to route to your hosted projects!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
  );
}
