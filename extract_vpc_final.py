with open('src/App.tsx', 'r') as f:
    lines = f.readlines()

start = -1
for i, line in enumerate(lines):
    if "activeTab === 'vpc_network'" in line:
        start = i
        break

end = len(lines) - 7 # because 8645 is </main>, etc.

vpc_content = lines[start:end]

# create VpcNetworkTab.tsx
with open('src/components/tabs/VpcNetworkTab.tsx', 'w') as f:
    f.write("import React from 'react';\n")
    f.write("import * as LucideIcons from 'lucide-react';\n\n")
    f.write("export default function VpcNetworkTab({ state }: { state: any }) {\n")
    f.write("  const { Wifi, Cpu, Cloud, WifiOff } = LucideIcons;\n")
    f.write("  const { isAutoInternetEnabled, setIsAutoInternetEnabled, vpcSubTab, setVpcSubTab, networkLatency, subnets, ipInventory, isBridgeActive, isHybridDevMode, setIsHybridDevMode, remoteNodeIp, isAiServerBypassed, setIsAiServerBypassed, setHomeToast } = state;\n")
    f.write("  return (\n")
    f.write("    <>\n")
    # write the content but remove the `{activeTab === 'vpc_network' && (` part
    f.writelines([line.replace("{activeTab === 'vpc_network' && (", "") for line in vpc_content[:-1]])
    
    last_line = vpc_content[-1]
    f.write(last_line.replace(")}", ""))
    
    f.write("    </>\n")
    f.write("  );\n")
    f.write("}\n")

