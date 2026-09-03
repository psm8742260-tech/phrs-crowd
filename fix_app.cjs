const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `                    {/* Collapsible submenus */}
                    {isExpanded && isSidebarOpen && (
                      <div className="pl-7 pr-2 py-1 space-y-1 border-l border-slate-200 dark:border-slate-850 ml-5">
                        {sec.subMenus.map((subMenu) => {
                          const isSubSelected = selectedSubMenu === subMenu;
                          return (
                            <button
                              key={subMenu}
                              onClick={() => handleSubMenuClick(sec.id, subMenu)}
                              className={\`w-full text-left px-2 py-1.5 rounded-md text-[11px] font-sans transition-colors truncate block \${
                                isSubSelected
                                  ? 'bg-blue-500/10 text-[#1A73E8] font-semibold'
                                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-850 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                              }\`}
                              title={subMenu}
                            >
                              {subMenu}
                            </button>
                          );
                        })}
                      </div>
                    )}`;

const replacement = `                    {/* Collapsible submenus */}
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

if (content.includes(target)) {
    fs.writeFileSync(file, content.replace(target, replacement));
    console.log("Success: App.tsx");
} else {
    console.log("Target not found in App.tsx");
}
