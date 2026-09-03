const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix padding
const targetPadding = `                    {/* Collapsible submenus */}
                    {isExpanded && isSidebarOpen && (
                      <div className="pl-4 sm:pl-5 pr-2 py-1.5 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 ml-4 sm:ml-5 my-1">
                        {sec.subMenus.map((subMenu) => {
                          const isSubSelected = selectedSubMenu === subMenu;
                          return (
                            <button
                              key={subMenu}
                              onClick={() => handleSubMenuClick(sec.id, subMenu)}
                              className={\`w-full text-left px-3 py-1.5 rounded-lg text-[12px] font-sans transition-colors truncate block \${
                                isSubSelected
                                  ? 'bg-blue-50 text-[#0b57d0] font-semibold dark:bg-blue-900/30 dark:text-blue-300'
                                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                              }\`}
                              title={subMenu}
                            >
                              {subMenu}
                            </button>
                          );
                        })}
                      </div>
                    )}`;

const replacementPadding = `                    {/* Collapsible submenus */}
                    {isExpanded && isSidebarOpen && (
                      <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-slate-200 dark:border-slate-800 ml-[1.125rem] my-1">
                        {sec.subMenus.map((subMenu) => {
                          const isSubSelected = selectedSubMenu === subMenu;
                          return (
                            <button
                              key={subMenu}
                              onClick={() => handleSubMenuClick(sec.id, subMenu)}
                              className={\`w-full text-left px-3 py-1.5 rounded-lg text-[12px] font-sans transition-colors truncate block \${
                                isSubSelected
                                  ? 'bg-blue-50 text-blue-600 font-semibold dark:bg-blue-900/30 dark:text-blue-400'
                                  : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                              }\`}
                              title={subMenu}
                            >
                              {subMenu}
                            </button>
                          );
                        })}
                      </div>
                    )}`;

if (content.includes(targetPadding)) {
    content = content.replace(targetPadding, replacementPadding);
    console.log("Success: padding fixed");
} else {
    console.log("Failed: padding target not found");
}

// 2. Fix routing logic
const targetRouting = `  const handleSubMenuClick = (sectionId: string, subMenu: string) => {
    setSelectedSubMenu(subMenu);
    
    // Clean, clever tab routing:
    if (sectionId === 'secret_manager') {
      setActiveTab('secret_manager');
      setHomeToast('Secret Manager opened');
      setTimeout(() => setHomeToast(null), 2000);
    } else if (sectionId === 'cloud_build') {
      setActiveTab('cloud_build');
      setHomeToast('Cloud Build Console launched');
      setTimeout(() => setHomeToast(null), 2000);
    } else if (sectionId === 'cloud_hub') {
      setCloudHubSubTab(subMenu);
      if (subMenu === 'Deployments') {
        setActiveTab('app_studio'); // VPS hosting & deployments
      } else {
        setActiveTab('home');
        setHomeSubTab('hub');
      }
    } else if (sectionId === 'cloud_overview') {
      setActiveTab('home');
      setHomeSubTab('dashboard');
    } else if (sectionId === 'solutions') {
      setActiveTab('solutions');
    } else if (sectionId === 'recently_visited') {
      setActiveTab('recently_visited');
    } else if (sectionId === 'billing') {
      setActiveTab('billing');
      if (subMenu === 'Account billing management') setBillingSubTab('management');
      else if (subMenu === 'Cost tracking') setBillingSubTab('tracking');
      else if (subMenu === 'Linked accounts') setBillingSubTab('accounts');
    } else if (sectionId === 'iam_admin') {
      setActiveTab('iam');
      setIamSubTab(subMenu);
    } else if (sectionId === 'marketplace') {
      setActiveTab('marketplace');
    } else if (sectionId === 'apis_services') {
      setActiveTab('api_board');
      setApisSubTab(subMenu);
    } else if (sectionId === 'agent_platform') {
      setActiveTab('agent_platform');
    } else if (sectionId === 'compute_engine') {
      setActiveTab('app_studio'); 
      setComputeSubTab(subMenu);
    } else if (sectionId === 'kubernetes_engine') {`;

const replacementRouting = `  const handleSubMenuClick = (sectionId: string, subMenu: string) => {
    setSelectedSubMenu(subMenu);
    
    // Clean, clever tab routing:
    if (sectionId === 'secret_manager') {
      setActiveTab('secret_manager');
      setSecretManagerSubTab(subMenu);
    } else if (sectionId === 'cloud_build') {
      setActiveTab('cloud_build');
    } else if (sectionId === 'cloud_hub') {
      setCloudHubSubTab(subMenu);
      if (subMenu === 'Deployments') {
        setActiveTab('app_studio'); // VPS hosting & deployments
        setComputeSubTab('Overview');
      } else {
        setActiveTab('home');
        setHomeSubTab('hub');
      }
    } else if (sectionId === 'cloud_overview') {
      setActiveTab('home');
      setHomeSubTab('dashboard');
    } else if (sectionId === 'solutions') {
      setActiveTab('solutions');
    } else if (sectionId === 'recently_visited') {
      setActiveTab('recently_visited');
    } else if (sectionId === 'billing') {
      setActiveTab('billing');
      if (subMenu === 'Account billing management') setBillingSubTab('management');
      else if (subMenu === 'Cost tracking') setBillingSubTab('tracking');
      else if (subMenu === 'Linked accounts') setBillingSubTab('accounts');
    } else if (sectionId === 'iam_admin') {
      setActiveTab('iam');
      setIamSubTab(subMenu);
    } else if (sectionId === 'marketplace') {
      setActiveTab('marketplace');
    } else if (sectionId === 'apis_services') {
      setActiveTab('api_board');
      setApisSubTab(subMenu);
    } else if (sectionId === 'agent_platform') {
      setActiveTab('agent_platform');
    } else if (sectionId === 'compute_engine') {
      setActiveTab('app_studio'); 
      setComputeSubTab(subMenu);
    } else if (sectionId === 'kubernetes_engine') {`;

if (content.includes(targetRouting)) {
    content = content.replace(targetRouting, replacementRouting);
    console.log("Success: routing fixed");
} else {
    console.log("Failed: routing target not found");
}

fs.writeFileSync(file, content);
