with open('src/App.tsx', 'r') as f:
    lines = f.readlines()

start = -1
for i, line in enumerate(lines):
    if "activeTab === 'vpc_network'" in line:
        start = i
        break

end = len(lines) - 7

# Insert the import at the top
import_statement = "import VpcNetworkTab from './components/tabs/VpcNetworkTab';\n"
lines.insert(1, import_statement)

start += 1 # adjust for the new line
end += 1

global_state = """
  const globalState = {
    isAutoInternetEnabled, setIsAutoInternetEnabled, vpcSubTab, setVpcSubTab, networkLatency, subnets, ipInventory, isBridgeActive, isHybridDevMode, setIsHybridDevMode, remoteNodeIp, isAiServerBypassed, setIsAiServerBypassed, setHomeToast
  };
"""

# replace the block with `<VpcNetworkTab state={globalState} />`
new_lines = lines[:start] + [
    global_state,
    "        {activeTab === 'vpc_network' && (\n",
    "          <VpcNetworkTab state={globalState} />\n",
    "        )}\n"
] + lines[end:]

with open('src/App.tsx', 'w') as f:
    f.writelines(new_lines)
