with open('src/App.tsx', 'r') as f:
    text = f.read()

# Remove the invalid globalState block
text = text.replace("""  const globalState = {
    isAutoInternetEnabled, setIsAutoInternetEnabled, vpcSubTab, setVpcSubTab, networkLatency, subnets, ipInventory, isBridgeActive, isHybridDevMode, setIsHybridDevMode, remoteNodeIp, isAiServerBypassed, setIsAiServerBypassed, setHomeToast
  };""", "")

# Find return (
return_idx = text.rfind("  return (")

global_state = """
  const globalState = {
    isAutoInternetEnabled, setIsAutoInternetEnabled, vpcSubTab, setVpcSubTab, networkLatency, subnets, ipInventory, isBridgeActive, isHybridDevMode, setIsHybridDevMode, remoteNodeIp, isAiServerBypassed, setIsAiServerBypassed, setHomeToast
  };
"""

text = text[:return_idx] + global_state + text[return_idx:]

# Also fix the `)}` at the end
# The sed output showed:
#        )}
#        {/* ==============================================
#            TAB 19: VPC NETWORK CONTROLLER
#            ============================================== */}
#        {activeTab === 'vpc_network' && (
#          <VpcNetworkTab state={globalState} />
#        )}
#        )}

text = text.replace("""        )}
        )}
      </main>""", """        )}
      </main>""")

with open('src/App.tsx', 'w') as f:
    f.write(text)
