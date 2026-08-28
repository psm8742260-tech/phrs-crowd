with open('src/App.tsx', 'r') as f:
    text = f.read()

# 1. Remove the globalState block near line 285
global_state = """
  const globalState = {
    isAutoInternetEnabled, setIsAutoInternetEnabled, vpcSubTab, setVpcSubTab, networkLatency, subnets, ipInventory, isBridgeActive, isHybridDevMode, setIsHybridDevMode, remoteNodeIp, isAiServerBypassed, setIsAiServerBypassed, setHomeToast
  };
"""
text = text.replace(global_state, "")

# 2. Find the main `return (` which should be around line 1400.
# It is preceded by `if (loginView === 'admin' && !isAuthenticated) { ... }` or something.
# We can search for the start of the JSX tree:
#   return (
#     <div className={`min-h-screen

idx = text.find("  return (\n    <div className={`min-h-screen")
if idx == -1:
    print("Could not find main return")
else:
    text = text[:idx] + global_state + text[idx:]
    with open('src/App.tsx', 'w') as f:
        f.write(text)
    print("Fixed!")

