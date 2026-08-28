with open('src/App.tsx', 'r') as f:
    lines = f.readlines()

# Remove the broken globalState from the middle
lines = [line for line in lines if not ("const globalState =" in line or "isAutoInternetEnabled, setIsAutoInternetEnabled" in line)]

# Also remove the `  };` that was left behind
# I'll just do a more robust cleanup
text = "".join(lines)
text = text.replace("  };\n  return (", "  return (")

global_state = """
  const globalState = {
    isAutoInternetEnabled, setIsAutoInternetEnabled, vpcSubTab, setVpcSubTab, networkLatency, subnets, ipInventory, isBridgeActive, isHybridDevMode, setIsHybridDevMode, remoteNodeIp, isAiServerBypassed, setIsAiServerBypassed, setHomeToast
  };
"""

# Insert before `  return (`
text = text.replace("  return (", global_state + "  return (", 1)

with open('src/App.tsx', 'w') as f:
    f.write(text)
