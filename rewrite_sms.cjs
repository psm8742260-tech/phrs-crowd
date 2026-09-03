const fs = require('fs');

const before = fs.readFileSync('/tmp/before.txt', 'utf-8');
const after = fs.readFileSync('/tmp/after.txt', 'utf-8');

// Add selectedSubMenu to destructuring
const beforeModified = before.replace('    isDarkMode,', '    selectedSubMenu,\n    isDarkMode,');

const newRender = `return (
    <>
      <div className="p-6">
        {/* Header with dual carrier indicators */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-800 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-amber-500 animate-pulse" />
              Dual-SIM SMS Gateway
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Dual Stack Ingress Active | Host Bound: <span className="text-emerald-500 font-bold">0.0.0.0</span> / <span className="text-emerald-500 font-bold">localhost</span>
            </p>
          </div>

          {/* Active Carrier Toggle Buttons */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800">
            <button
              onClick={() => setActiveSimCarrier('jio')}
              className={\`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 \${activeSimCarrier === 'jio' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}\`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              SIM 1: JIO 5G
            </button>
            <button
              onClick={() => setActiveSimCarrier('bsnl')}
              className={\`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 \${activeSimCarrier === 'bsnl' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}\`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              SIM 2: BSNL STV
            </button>
          </div>
        </div>

        {selectedSubMenu === 'Gateway Dashboard' && (
          <div className="animate-fade-in space-y-6">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={\`p-4 rounded-xl border font-mono text-xs \${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'} flex items-center justify-between\`}>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">IPv4 Endpoint Bounded</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">{localServerIpInput || '104.21.42.180'}:3000</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">ACTIVE</span>
              </div>
              <div className={\`p-4 rounded-xl border font-mono text-xs \${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'} flex items-center justify-between\`}>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">Modem / Hardware Interface</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">{comPortInput} | {baudRate} BPS</span>
                </div>
                <span className={\`px-2 py-0.5 rounded text-[9px] font-bold \${modemStatus === 'connected' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}\`}>
                  {modemStatus === 'connected' ? 'CONNECTED' : 'DISCONNECTED'}
                </span>
              </div>
            </div>

            <div className={\`p-6 rounded-2xl border \${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}\`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-mono font-bold text-sm text-indigo-600 dark:text-indigo-400 uppercase flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                    యూనివర్సల్ లాప్‌టాప్ / పీసీ మైగ్రేషన్ (Universal Laptop & USB Dongle Bridge)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    100% Platform-Independent Core Architecture. Ready for Windows, Linux, macOS or Dongles.
                  </p>
                </div>
                <span className="text-[10px] bg-indigo-600/10 text-indigo-600 font-mono font-bold px-2 py-0.5 rounded border border-indigo-600/20">
                  Migration Ready
                </span>
              </div>
              
              <p className="text-xs text-slate-500 leading-relaxed mb-6 font-mono">
                ఈ సిస్టమ్ కేవలం ఏదైనా ఒక డివైజ్‌కు మాత్రమే పరిమితం కాకుండా, భవిష్యత్తులో మీరు ఈ సర్వర్‌ను ఏ లాప్‌టాప్‌కైనా లేదా USB 4G/5G SIM డాంగ్లే మోడమ్‌కైనా (HUAWEI, ZTE, etc.) ఎలాంటి కోడ్ మార్పులు లేకుండా సులభంగా తరలించుకోవచ్చు. దీని కోసం డ్యూయల్-అడాప్టర్ మోడ్ ఇక్కడ సిద్ధంగా అమర్చబడింది.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* COM Port Config Card */}
                <div className="lg:col-span-1 space-y-4">
                  <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">HARDWARE CONFIGURATION</span>
                  
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">USB COM PORT / SERIAL DEVICE</label>
                    <input
                      type="text"
                      value={comPortInput}
                      onChange={(e) => setComPortInput(e.target.value)}
                      placeholder="e.g. COM3 or /dev/ttyUSB0"
                      className="w-full p-2.5 text-xs font-mono rounded-lg border bg-slate-50 text-slate-800 focus:ring-1 focus:ring-indigo-500"
                    />
                    <p className="text-[9px] text-slate-400 font-mono mt-1">
                      * Windows: COM1-COM256 | Linux: /dev/ttyUSB0 | macOS: /dev/cu.usbserial
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">BAUD RATE (BPS)</label>
                    <select
                      value={baudRate}
                      onChange={(e) => setBaudRate(e.target.value)}
                      className="w-full p-2.5 text-xs font-mono rounded-lg border bg-slate-50 text-slate-800 focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="9600">9600 Baud</option>
                      <option value="19200">19200 Baud</option>
                      <option value="57600">57600 Baud</option>
                      <option value="115200">115200 Baud (Standard)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleConnectModem}
                      disabled={modemStatus === 'connecting'}
                      className={\`w-full font-mono text-xs py-2.5 rounded-lg font-bold transition-all shadow-sm flex items-center justify-center gap-2 \${
                        modemStatus === 'connected' 
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }\`}
                    >
                      <RefreshCw className={\`w-3.5 h-3.5 \${modemStatus === 'connecting' ? 'animate-spin' : ''}\`} />
                      {modemStatus === 'connected' ? '✓ DONGLE CONNECTED' : modemStatus === 'connecting' ? 'CONNECTING...' : 'CONNECT USB MODEM'}
                    </button>
                    {modemStatus === 'connected' && (
                      <button
                        onClick={() => {
                          setModemStatus('disconnected');
                          setAtCommandConsole(prev => [...prev, \`[SERIAL] Closed COM connection to modem.\`]);
                        }}
                        className="w-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs py-1.5 rounded-lg font-bold"
                      >
                        Disconnect Hardware
                      </button>
                    )}
                  </div>
                </div>

                {/* AT Commands Interactive Console */}
                <div className="lg:col-span-1 flex flex-col justify-between">
                  <div>
                    <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">LIVE AT-COMMANDS MONITOR</span>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-mono text-slate-300 h-[175px] overflow-y-auto space-y-1">
                      {atCommandConsole.map((line, idx) => (
                        <div key={idx} className={line.includes('RX: OK') || line.includes('READY') ? 'text-emerald-400' : line.includes('TX:') ? 'text-indigo-400' : 'text-slate-400'}>
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    <input
                      type="text"
                      value={typedAtCommand}
                      onChange={(e) => setTypedAtCommand(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendAtCommand()}
                      placeholder="Enter AT command (e.g. AT+CSQ)..."
                      className="flex-1 p-2 text-[10px] font-mono rounded-lg border bg-slate-50 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 uppercase"
                    />
                    <button
                      onClick={handleSendAtCommand}
                      className="px-3 bg-slate-800 hover:bg-slate-700 text-white font-mono text-[10px] font-bold rounded-lg"
                    >
                      SEND
                    </button>
                  </div>
                </div>

                {/* Modular Code Export Guide */}
                <div className="lg:col-span-1 space-y-2">
                  <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">PLATFORM INDEPENDENT ENGINE SPEC</span>
                  <div className="p-3 bg-slate-950 text-[9px] font-mono text-indigo-300 rounded-lg border border-slate-800/80 max-h-[200px] overflow-y-auto">
                    <div className="text-slate-400 uppercase font-semibold border-b border-slate-800 pb-1 mb-1.5 text-[8px]">
                      // node-serialport micro-service preview
                    </div>
                    <pre className="whitespace-pre-wrap leading-relaxed">{\`const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const port = new SerialPort({ 
  path: '\${comPortInput}', 
  baudRate: \${baudRate} 
});
const parser = port.pipe(new ReadlineParser({ delimiter: '\\\\r\\\\n' }));

// Send JIO/BSNL Stealth Payload
function sendSMS(phone, text) {
  port.write(\\\`AT+CMGF=1\\\\r\\\`);
  setTimeout(() => {
    port.write(\\\`AT+CMGS="\${phone}"\\\\r\\\`);
    setTimeout(() => {
      port.write(\\\`\${text}\\\\x1A\\\`);
    }, 500);
  }, 500);
}

// Global host '0.0.0.0' router
module.exports = { sendSMS };\`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedSubMenu === 'Recharge (₹25) Config' && (
          <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dual-SIM Recharge Simulator */}
            <div className={\`p-6 rounded-2xl border \${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}\`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-mono font-bold text-sm tracking-wider text-amber-500 uppercase">Dual-SIM Data-to-SMS Wallet</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono mb-6 leading-relaxed">
                Recharge mobile data to automatically convert into PHRS Stealth SMS credits via Telco gateways.
              </p>

              {/* Wallet Balances */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="block text-[9px] font-mono font-bold text-slate-400 mb-1">RECHARGE BAL</span>
                  <div className="text-lg font-bold font-mono text-slate-800 dark:text-white">₹{stealthWalletRupees}</div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/50">
                  <span className="block text-[9px] font-mono font-bold text-blue-500 dark:text-blue-400 mb-1">UNUSED DATA</span>
                  <div className="text-lg font-bold font-mono text-blue-700 dark:text-blue-300">{stealthDataBalanceMb} MB</div>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/50">
                  <span className="block text-[9px] font-mono font-bold text-amber-600 dark:text-amber-400 mb-1">SMS CREDITS</span>
                  <div className="text-lg font-bold font-mono text-amber-700 dark:text-amber-300">{stealthSmsCredits.toLocaleString()}</div>
                </div>
              </div>

              {/* Quick Recharges */}
              <div className="space-y-4">
                <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1">
                  Direct Top-Up Simulation
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleRecharge('jio', 25)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-3 rounded-lg font-bold shadow-md transition-all flex flex-col items-center justify-center gap-0.5"
                  >
                    <span>⚡ RECHARGE ₹25 JIO</span>
                    <span className="text-[9px] font-normal opacity-80">(1GB → 10,000 SMS)</span>
                  </button>
                  <button
                    onClick={() => handleRecharge('bsnl', 98)}
                    className="bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs py-3 rounded-lg font-bold shadow-md transition-all flex flex-col items-center justify-center gap-0.5"
                  >
                    <span>⚡ RECHARGE ₹98 BSNL</span>
                    <span className="text-[9px] font-normal opacity-80">(2GB → 20,000 SMS)</span>
                  </button>
                </div>
              </div>

              {/* Custom Conversion */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Custom Data-to-SMS Conversion
                </span>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="number"
                      value={customMb}
                      onChange={(e) => setCustomMb(parseInt(e.target.value) || 0)}
                      className="w-full pl-3 pr-10 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <span className="absolute right-3 top-2 text-[10px] font-bold text-slate-400">MB</span>
                  </div>
                  <button
                    onClick={handleConvertData}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-mono text-xs font-bold rounded-lg flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    CONVERT
                  </button>
                </div>
                <div className="mt-2 text-[10px] font-mono text-slate-500 text-right">
                  Yield: <span className="font-bold text-amber-500">{(customMb * 10).toLocaleString()} SMS Credits</span>
                </div>
              </div>
            </div>

            {/* Auto SMS Parser Engine */}
            <div className={\`p-6 rounded-2xl border flex flex-col \${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}\`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-mono font-bold text-sm tracking-wider text-indigo-500 uppercase flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Auto SMS Parser Engine
                </h3>
                <span className={\`px-2 py-0.5 rounded text-[10px] font-mono font-bold border flex items-center gap-1 \${
                  parserStatus === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                  parserStatus === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                  'bg-slate-500/10 text-slate-500 border-slate-500/20'
                }\`}>
                  {parserStatus === 'success' ? 'MATCHED' : parserStatus === 'error' ? 'NO MATCH' : 'LISTENING'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono mb-4 leading-relaxed">
                Paste raw SMS content here. The Termux background service will parse it via Regex to auto-recharge your wallet or verify OTPs without manual intervention.
              </p>
              
              <div className="flex-1 flex flex-col gap-3">
                <div className="relative">
                  <textarea
                    value={rawSmsInput}
                    onChange={(e) => setRawSmsInput(e.target.value)}
                    placeholder="Paste incoming SMS text here (e.g., 'Recharge of Rs.25 on JIO successful...')"
                    className="w-full h-28 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed"
                  />
                  <button 
                    onClick={handleSimulateParse}
                    disabled={!rawSmsInput.trim()}
                    className="absolute bottom-3 right-3 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white font-mono text-[10px] font-bold rounded-lg shadow-sm"
                  >
                    RUN PARSER
                  </button>
                </div>
                
                <div className="flex-1 min-h-[120px] bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-[10px] overflow-y-auto flex flex-col gap-1">
                  {parserConsoleLogs.length === 0 ? (
                    <div className="text-slate-600 italic mt-auto mb-auto text-center">Waiting for SMS input...</div>
                  ) : (
                    parserConsoleLogs.map((log, i) => (
                      <div key={i} className={\`\${log.includes('[ERROR]') ? 'text-red-400' : log.includes('SUCCESS') || log.includes('Credits:') ? 'text-emerald-400' : 'text-slate-300'}\`}>
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedSubMenu === 'OTP Logs' && (
          <div className="animate-fade-in">
            <div className={\`p-6 rounded-2xl border \${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}\`}>
              <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="font-mono font-bold text-sm tracking-wider text-slate-800 dark:text-slate-200 uppercase flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-500" />
                  Termux / Gateway Broadcast Logs
                </h3>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded font-mono text-[10px] border border-slate-200 dark:border-slate-700">
                  Total: {phrsSmsHistory.length}
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="py-3 px-4 text-slate-400 font-semibold w-1/6">Timestamp</th>
                      <th className="py-3 px-4 text-slate-400 font-semibold w-1/6">Type</th>
                      <th className="py-3 px-4 text-slate-400 font-semibold w-1/6">Sender</th>
                      <th className="py-3 px-4 text-slate-400 font-semibold w-3/6">Message Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phrsSmsHistory.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-500 italic">No logs generated yet.</td>
                      </tr>
                    ) : (
                      phrsSmsHistory.map((log: any) => (
                        <tr key={log.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-4 text-slate-500">{log.timestamp}</td>
                          <td className="py-3 px-4">
                            <span className={\`px-2 py-0.5 rounded text-[9px] font-bold uppercase \${
                              log.type === 'otp' ? 'bg-indigo-500/10 text-indigo-600' :
                              log.type === 'recharge' ? 'bg-emerald-500/10 text-emerald-600' :
                              'bg-amber-500/10 text-amber-600'
                            }\`}>
                              {log.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">{log.sender}</td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400 leading-relaxed truncate max-w-md">
                            {log.text}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedSubMenu === 'API Access' && (
          <div className="animate-fade-in space-y-6">
            <div className={\`p-6 rounded-2xl border \${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}\`}>
              <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="font-mono font-bold text-sm tracking-wider text-slate-800 dark:text-slate-200 uppercase flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-500" />
                  Manual SMS Gateway Test Panel & API Docs
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-mono mb-6 leading-relaxed">
                Test the SMS delivery capability directly using the interface below. Or use the provided API endpoints to integrate sending into your own external applications.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Manual Sender */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1 font-bold uppercase">Target Phone Number</label>
                    <input
                      type="text"
                      value={testPhoneNumber}
                      onChange={(e) => setTestPhoneNumber(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full p-3 text-xs font-mono rounded-xl border bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[10px] font-mono text-slate-500 font-bold uppercase">Message Content / OTP</label>
                      <button onClick={handleGenerateRandomOtp} className="text-[9px] font-mono text-indigo-500 hover:text-indigo-600 font-bold flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" /> AUTO OTP
                      </button>
                    </div>
                    <textarea
                      value={smsTemplate}
                      onChange={(e) => setSmsTemplate(e.target.value)}
                      className="w-full h-24 p-3 text-xs font-mono rounded-xl border bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSendManualSms}
                    disabled={isSendingOtp || stealthSmsCredits <= 0}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-mono text-xs py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isSendingOtp ? <RefreshCw className="w-4 h-4 animate-spin" /> : <PhoneCall className="w-4 h-4" />}
                    {isSendingOtp ? 'ROUTING SMS...' : 'SEND TEST SMS'}
                  </button>
                  {stealthSmsCredits <= 0 && (
                    <p className="text-[10px] text-red-500 font-mono text-center mt-2">
                      Insufficient Stealth SMS Credits. Please recharge Data first.
                    </p>
                  )}
                </div>

                {/* API Docs */}
                <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col">
                  <div className="flex items-center bg-slate-900 border-b border-slate-800">
                    <button className="px-4 py-2 text-[10px] font-mono text-indigo-400 border-b-2 border-indigo-500 font-bold bg-slate-800/50">cURL</button>
                    <button className="px-4 py-2 text-[10px] font-mono text-slate-500 hover:text-slate-300 font-bold">Node.js</button>
                    <button className="px-4 py-2 text-[10px] font-mono text-slate-500 hover:text-slate-300 font-bold">Python</button>
                  </div>
                  <div className="p-4 overflow-y-auto flex-1">
                    <pre className="text-[10px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
{\`curl -X POST http://\${localServerIpInput || '104.21.42.180'}:3000/api/sms/send \\\\
  -H "Content-Type: application/json" \\\\
  -H "Authorization: Bearer YOUR_API_KEY" \\\\
  -d '{
    "to": "\${testPhoneNumber || '+919876543210'}",
    "message": "\${smsTemplate || 'Your OTP is 123456.'}",
    "carrier": "\${activeSimCarrier}"
  }'\`}
                    </pre>
                  </div>
                  <div className="p-3 bg-slate-900/80 border-t border-slate-800">
                    <p className="text-[9px] text-slate-400 font-mono italic flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      Endpoints are secured and locally bound. Rate limit: 100/sec.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
`;

const combined = beforeModified + newRender;
fs.writeFileSync('src/components/tabs/SmsGatewayTab.tsx', combined);
console.log('Rewrite complete!');
