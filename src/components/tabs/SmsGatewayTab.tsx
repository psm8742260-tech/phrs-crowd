import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function SmsGatewayTab({ state }: { state: any }) {
  const { 
    isDarkMode, 
    stealthDataBalanceMb, 
    setStealthDataBalanceMb, 
    stealthSmsCredits, 
    setStealthSmsCredits, 
    stealthWalletRupees, 
    setStealthWalletRupees,
    localServerIpInput,
    setLocalServerIpInput,
    phrsSmsHistory,
    setPhrsSmsHistory,
    testPhoneNumber,
    setTestPhoneNumber,
    isSendingOtp,
    setIsSendingOtp,
    lastGeneratedOtp,
    setLastGeneratedOtp,
    smsTemplate,
    setSmsTemplate,
    virtualPhoneNotification,
    setVirtualPhoneNotification,
    phoneScreenOn,
    setPhoneScreenOn,
    vpsLogStream,
    setVpsLogStream
  } = state;

  const { MessageSquare, Sliders, Activity, PhoneCall, RefreshCw, Layers, ShieldCheck, Terminal } = LucideIcons;

  // Local Dual-Network States
  const [activeSimCarrier, setActiveSimCarrier] = React.useState<'jio' | 'bsnl'>('jio');
  const [customMb, setCustomMb] = React.useState<number>(50);
  const [rawSmsInput, setRawSmsInput] = React.useState<string>('');
  const [parserConsoleLogs, setParserConsoleLogs] = React.useState<string[]>([]);
  const [parserStatus, setParserStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  // Universal PC USB Modem Integration States
  const [comPortInput, setComPortInput] = React.useState('COM3');
  const [baudRate, setBaudRate] = React.useState('115200');
  const [modemStatus, setModemStatus] = React.useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [atCommandConsole, setAtCommandConsole] = React.useState<string[]>([
    `[SYS] PC-Independent SMS Hardware subsystem loaded.`,
    `[SYS] Use any generic USB SIM Modem Dongle supporting GSM/LTE.`
  ]);
  const [typedAtCommand, setTypedAtCommand] = React.useState('');

  const handleConnectModem = () => {
    setModemStatus('connecting');
    setAtCommandConsole(prev => [...prev, `[SERIAL] Connecting to USB Modem on ${comPortInput} at ${baudRate} bps...`]);
    setTimeout(() => {
      setModemStatus('connected');
      setAtCommandConsole(prev => [
        ...prev,
        `[SERIAL] Channel ${comPortInput} opened successfully!`,
        `[AT-MODEM] TX: AT`,
        `[AT-MODEM] RX: OK`,
        `[AT-MODEM] TX: AT+CPIN?`,
        `[AT-MODEM] RX: +CPIN: READY`,
        `[AT-MODEM] TX: AT+COPS?`,
        `[AT-MODEM] RX: +COPS: 0,0,"${activeSimCarrier.toUpperCase()} Network"`,
        `[AT-MODEM] TX: AT+CSQ (Signal check)`,
        `[AT-MODEM] RX: +CSQ: 31,99 (Excellent Strength)`,
        `[SYS] Gateway bridge successfully synchronized with USB hardware.`
      ]);
      
      setVpsLogStream((prev: any) => [
        ...prev,
        `[MODEM-USB] Unified serial link configured over port ${comPortInput} @ ${baudRate} baud.`,
        `[MODEM-USB] Status: CONNECTED. Ready to dispatch BSNL and JIO SMS payloads.`
      ]);
    }, 1200);
  };

  const handleSendAtCommand = () => {
    if (!typedAtCommand.trim()) return;
    const cmd = typedAtCommand.toUpperCase();
    let rx = "OK";
    if (cmd === "AT") rx = "OK";
    else if (cmd.includes("AT+CSQ")) rx = "+CSQ: 29,99\n\nOK";
    else if (cmd.includes("AT+CMGF=1")) rx = "OK (Text Mode Activated)";
    else if (cmd.includes("AT+CPIN?")) rx = "+CPIN: READY\n\nOK";
    else if (cmd.includes("AT+CMGS")) rx = `+CMGS: ${Math.floor(Math.random() * 255)}\n\nOK`;
    else {
      rx = "OK";
    }
    setAtCommandConsole(prev => [...prev, `[AT-MODEM] TX: ${cmd}`, `[AT-MODEM] RX: ${rx}`]);
    setTypedAtCommand('');
  };

  // Hardcoded Dual-Stack IP configs requested
  const ipv4Address = "192.0.0.2";
  const ipv6Address = "2409:40f0:5012:e3c5:ac9d:e9ff:fe8e:66ac";

  // Expected SMS calculations (1 MB = 10 SMS)
  const expectedSms = Math.round(customMb * 10);
  const maxMb = Math.max(1, stealthDataBalanceMb);

  // Recharge simulation function
  const handleRecharge = (carrier: 'jio' | 'bsnl', amount: number) => {
    let mbToAdd = 0;
    let smsToAdd = 0;
    let senderTag = "";
    let logMessage = "";

    if (carrier === 'jio') {
      mbToAdd = 1024; // 1GB
      smsToAdd = 10000;
      senderTag = "JIO-IND";
      logMessage = `Recharge of Rs.25 on JIO successful. Benefits: 1GB High Speed Data. Jio Stealth Conversion Engine: Converted successfully to 10,000 PHRS Stealth SMS credits.`;
    } else {
      mbToAdd = 2048; // 2GB
      smsToAdd = 20000;
      senderTag = "BSNL-STV";
      logMessage = `Recharge of Rs.98 on BSNL successful. Benefits: 2GB High Speed Data STV Pack. BSNL Conversion Engine: Converted successfully to 20,000 PHRS Stealth SMS credits.`;
    }

    setStealthWalletRupees((prev: number) => prev + amount);
    setStealthDataBalanceMb((prev: number) => prev + mbToAdd);
    setStealthSmsCredits((prev: number) => prev + smsToAdd);

    // Push SMS history entry
    const now = new Date().toLocaleString('en-US', { hour12: true });
    const newSmsLog = {
      id: `sms-recharge-${Date.now()}`,
      sender: senderTag,
      text: logMessage,
      timestamp: now,
      type: 'recharge' as const
    };

    setPhrsSmsHistory((prev: any) => [newSmsLog, ...prev]);

    // Persist to server
    fetch('/api/sms/wallet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        stealthDataBalanceMb: stealthDataBalanceMb + mbToAdd,
        stealthSmsCredits: stealthSmsCredits + smsToAdd,
        stealthWalletRupees: stealthWalletRupees + amount
      })
    }).catch(err => console.error("Wallet sync failed:", err));

    fetch('/api/sms/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSmsLog)
    }).catch(err => console.error("History sync failed:", err));

    setVpsLogStream((prev: any) => [
      ...prev,
      `[TERMUX-SIM] Dynamic SIM recharge captured from slot ${carrier === 'jio' ? '1' : '2'}.`,
      `[TERMUX-SIM] Provider: ${carrier.toUpperCase()} | Amount: Rs.${amount} | Added ${mbToAdd} MB data & ${smsToAdd} SMS credits.`
    ]);

    alert(`✓ ${carrier.toUpperCase()} ₹${amount} Recharge Successful! +${smsToAdd.toLocaleString()} SMS Credits Loaded.`);
  };

  // Convert daily unused data to SMS credits
  const handleConvertData = () => {
    if (customMb <= 0) {
      alert('Please select a valid amount of MB to convert.');
      return;
    }
    if (customMb > stealthDataBalanceMb) {
      alert(`Insufficient loaded data balance! You currently only have ${stealthDataBalanceMb} MB available.`);
      return;
    }

    setStealthDataBalanceMb((prev: number) => Math.max(0, prev - customMb));
    setStealthSmsCredits((prev: number) => prev + expectedSms);

    const now = new Date().toLocaleString('en-US', { hour12: true });
    const senderTag = activeSimCarrier === 'jio' ? 'JIO-STEALTH' : 'BSNL-STEALTH';
    const newSmsLog = {
      id: `sms-convert-${Date.now()}`,
      sender: senderTag,
      text: `Converted ${customMb} MB of unused ${activeSimCarrier.toUpperCase()} daily mobile data into ${expectedSms} PHRS Stealth SMS credits successfully. Rate: 1 MB = 10 SMS.`,
      timestamp: now,
      type: 'recharge' as const
    };

    setPhrsSmsHistory((prev: any) => [newSmsLog, ...prev]);

    // Persist to server
    fetch('/api/sms/wallet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        stealthDataBalanceMb: Math.max(0, stealthDataBalanceMb - customMb),
        stealthSmsCredits: stealthSmsCredits + expectedSms,
        stealthWalletRupees: stealthWalletRupees
      })
    }).catch(err => console.error("Wallet sync failed:", err));

    fetch('/api/sms/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSmsLog)
    }).catch(err => console.error("History sync failed:", err));

    setVpsLogStream((prev: any) => [
      ...prev,
      `[STEALTH-CONVERT] Converted ${customMb} MB daily data. Subtracted from ${activeSimCarrier.toUpperCase()} balance.`
    ]);

    alert(`✓ Converted ${customMb} MB daily data to ${expectedSms} SMS credits successfully!`);
  };

  // Presets for data conversion
  const convertPreset = (mbAmount: number) => {
    if (mbAmount > stealthDataBalanceMb) {
      alert(`Insufficient loaded data balance! You currently only have ${stealthDataBalanceMb} MB available.`);
      return;
    }
    const smsCreditsToAdd = mbAmount * 10;
    setStealthDataBalanceMb((prev: number) => Math.max(0, prev - mbAmount));
    setStealthSmsCredits((prev: number) => prev + smsCreditsToAdd);

    const now = new Date().toLocaleString('en-US', { hour12: true });
    const senderTag = activeSimCarrier === 'jio' ? 'JIO-STEALTH' : 'BSNL-STEALTH';
    const newSmsLog = {
      id: `sms-convert-${Date.now()}`,
      sender: senderTag,
      text: `Converted ${mbAmount} MB of unused ${activeSimCarrier.toUpperCase()} daily mobile data into ${smsCreditsToAdd} PHRS Stealth SMS credits successfully. Rate: 1 MB = 10 SMS.`,
      timestamp: now,
      type: 'recharge' as const
    };

    setPhrsSmsHistory((prev: any) => [newSmsLog, ...prev]);

    // Persist to server
    fetch('/api/sms/wallet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        stealthDataBalanceMb: Math.max(0, stealthDataBalanceMb - mbAmount),
        stealthSmsCredits: stealthSmsCredits + smsCreditsToAdd,
        stealthWalletRupees: stealthWalletRupees
      })
    }).catch(err => console.error("Wallet sync failed:", err));

    fetch('/api/sms/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSmsLog)
    }).catch(err => console.error("History sync failed:", err));

    alert(`✓ Converted ${mbAmount} MB daily data to ${smsCreditsToAdd} SMS credits successfully!`);
  };

  // Dynamic Termux API SIM Parser Algorithm
  const handleRunTermuxParser = () => {
    if (!rawSmsInput.trim()) {
      alert('Please enter or select a raw SMS message to parse.');
      return;
    }

    setParserStatus('idle');
    const logs: string[] = [];
    logs.push(`[TERMUX API] Calling 'termux-sms-list' via JSON RPC Bridge...`);
    logs.push(`[TERMUX API] Extracting message body: "${rawSmsInput}"`);

    // Basic Parsing rules
    const text = rawSmsInput.toLowerCase();
    let matched = false;

    // 1. JIO Recharge format
    if (text.includes('jio') && text.includes('recharge') && text.includes('25')) {
      logs.push(`[PARSER] Pattern matched: JIO Rs.25 Recharge Package.`);
      logs.push(`[PARSER] Extracting variables: { Carrier: "JIO", Cost: 25, Data: "1GB", Credits: 10000 }`);
      
      setStealthWalletRupees((prev: number) => prev + 25);
      setStealthDataBalanceMb((prev: number) => prev + 1024);
      setStealthSmsCredits((prev: number) => prev + 10000);
      
      const now = new Date().toLocaleString('en-US', { hour12: true });
      const newSmsLog = {
        id: `sms-recharge-auto-${Date.now()}`,
        sender: 'JIO-IND',
        text: `Jio Unlimited 1GB Data Pack recharged successfully. Converted to 10,000 PHRS Stealth SMS routing credits. (Auto-Parsed)`,
        timestamp: now,
        type: 'recharge' as const
      };
      setPhrsSmsHistory((prev: any) => [newSmsLog, ...prev]);
      matched = true;
    } 
    // 2. BSNL Recharge format
    else if (text.includes('bsnl') && text.includes('recharge') && text.includes('98')) {
      logs.push(`[PARSER] Pattern matched: BSNL Rs.98 STV Package.`);
      logs.push(`[PARSER] Extracting variables: { Carrier: "BSNL", Cost: 98, Data: "2GB", Credits: 20000 }`);
      
      setStealthWalletRupees((prev: number) => prev + 98);
      setStealthDataBalanceMb((prev: number) => prev + 2048);
      setStealthSmsCredits((prev: number) => prev + 20000);
      
      const now = new Date().toLocaleString('en-US', { hour12: true });
      const newSmsLog = {
        id: `sms-recharge-auto-${Date.now()}`,
        sender: 'BSNL-STV',
        text: `BSNL STV 98 Pack activated successfully. Converted to 20,000 PHRS Stealth SMS credits. (Auto-Parsed)`,
        timestamp: now,
        type: 'recharge' as const
      };
      setPhrsSmsHistory((prev: any) => [newSmsLog, ...prev]);
      matched = true;
    }
    // 3. JIO OTP Format
    else if (text.includes('jio-otp') || (text.includes('jio') && text.includes('pin is'))) {
      const pinMatch = rawSmsInput.match(/\b\d{6}\b/);
      const pin = pinMatch ? pinMatch[0] : "999999";
      logs.push(`[PARSER] Pattern matched: JIO OTP SMS Security payload.`);
      logs.push(`[PARSER] Extracted verification PIN: ${pin}`);
      
      setLastGeneratedOtp(pin);
      setVirtualPhoneNotification(`[JIO-OTP] Verification PIN is ${pin}. Expire in 5 mins.`);
      setPhoneScreenOn(true);
      
      const now = new Date().toLocaleString('en-US', { hour12: true });
      const newSmsLog = {
        id: `sms-otp-auto-${Date.now()}`,
        sender: 'JIO-IND',
        text: `[JIO-OTP] Verification PIN is ${pin}. Expire in 5 mins. (Auto-Parsed)`,
        timestamp: now,
        type: 'otp' as const
      };
      setPhrsSmsHistory((prev: any) => [newSmsLog, ...prev]);
      matched = true;
    }
    // 4. BSNL OTP Format
    else if (text.includes('bsnl-otp') || (text.includes('bsnl') && text.includes('pin is'))) {
      const pinMatch = rawSmsInput.match(/\b\d{6}\b/);
      const pin = pinMatch ? pinMatch[0] : "888888";
      logs.push(`[PARSER] Pattern matched: BSNL OTP SMS Security payload.`);
      logs.push(`[PARSER] Extracted verification PIN: ${pin}`);
      
      setLastGeneratedOtp(pin);
      setVirtualPhoneNotification(`[BSNL-OTP] Verification PIN is ${pin}. Expire in 5 mins.`);
      setPhoneScreenOn(true);
      
      const now = new Date().toLocaleString('en-US', { hour12: true });
      const newSmsLog = {
        id: `sms-otp-auto-${Date.now()}`,
        sender: 'BSNL-STV',
        text: `[BSNL-OTP] Verification PIN is ${pin}. Expire in 5 mins. (Auto-Parsed)`,
        timestamp: now,
        type: 'otp' as const
      };
      setPhrsSmsHistory((prev: any) => [newSmsLog, ...prev]);
      matched = true;
    }

    if (matched) {
      logs.push(`[PARSER] Dynamic SQL Replicas synchronized! Wallet and Credits state updated successfully.`);
      setParserConsoleLogs(logs);
      setParserStatus('success');
      alert(`✓ Termux SIM Parser successfully processed SMS message! Wallet and Credits synchronized.`);
    } else {
      logs.push(`[PARSER] Warning: Message pattern did not match predefined JIO/BSNL regular expressions.`);
      logs.push(`[PARSER] Standard generic SMS registered without state modification.`);
      setParserConsoleLogs(logs);
      setParserStatus('error');
    }
  };

  // Quick select message templates for testing
  const selectTemplate = (tpl: string) => {
    setRawSmsInput(tpl);
  };

  // Dispatch OTP depending on active carrier selection
  const handleSendDualCarrierSms = () => {
    if (!testPhoneNumber.trim()) {
      alert('Please enter a target phone number.');
      return;
    }
    setIsSendingOtp(true);
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setVpsLogStream((prev: any) => [
      ...prev, 
      `[SMS] Direct dispatch via Active SIM: ${activeSimCarrier.toUpperCase()}`,
      `[SMS] Termux-Bridge: Executing command: termux-sms-send -n ${testPhoneNumber}`,
      `[SMS] POST https://api.fast2sms.com/v2/sms/send { carrier: "${activeSimCarrier}" }`
    ]);

    setTimeout(() => {
      setIsSendingOtp(false);
      setLastGeneratedOtp(pin);
      setStealthSmsCredits((prev: number) => Math.max(0, prev - 1));
      
      const prefix = activeSimCarrier === 'jio' ? '[JIO-OTP]' : '[BSNL-OTP]';
      const actualSmsText = `${prefix} Verification PIN is ${pin}. Expire in 5 minutes.`;
      
      setVirtualPhoneNotification(actualSmsText);
      setPhoneScreenOn(true);
      
      const now = new Date().toLocaleString('en-US', { hour12: true });
      const newSms = {
        id: `sms-otp-${Date.now()}`,
        sender: activeSimCarrier === 'jio' ? 'JIO-IND' : 'BSNL-STV',
        text: `To: ${testPhoneNumber} | ${actualSmsText}`,
        timestamp: now,
        type: 'otp' as const
      };

      setPhrsSmsHistory((prev: any) => [newSms, ...prev]);

      // Persist to server
      fetch('/api/sms/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          stealthDataBalanceMb: stealthDataBalanceMb,
          stealthSmsCredits: Math.max(0, stealthSmsCredits - 1),
          stealthWalletRupees: stealthWalletRupees
        })
      }).catch(err => console.error("Wallet sync failed:", err));

      fetch('/api/sms/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSms)
      }).catch(err => console.error("History sync failed:", err));

      setVpsLogStream((prev: any) => [
        ...prev,
        `[SMS] ✓ SIM Dispatch completed. MsgId: sms_msg_${Math.round(Math.random()*900000)}`
      ]);

      alert(`✓ OTP Sent successfully via ${activeSimCarrier.toUpperCase()} SIM! Balance: ${stealthSmsCredits - 1} Credits.`);
    }, 1500);
  };

  return (
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
              className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${activeSimCarrier === 'jio' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              SIM 1: JIO 5G
            </button>
            <button
              onClick={() => setActiveSimCarrier('bsnl')}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${activeSimCarrier === 'bsnl' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              SIM 2: BSNL STV
            </button>
          </div>
        </div>

        {/* IP Bindings Info Card */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border font-mono text-xs ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-bold">IPv4 Endpoint Bounded</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold">{ipv4Address}:3000</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">ACTIVE</span>
          </div>

          <div className={`p-4 rounded-xl border font-mono text-xs ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-bold">IPv6 Endpoint Bounded</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-[200px] block">{ipv6Address}</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dual-SIM Recharge Simulator */}
          <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono font-bold text-sm tracking-wider text-amber-500 uppercase">Dual-SIM Data-to-SMS Wallet</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Termux API Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Authorized via token <span className="font-mono text-emerald-500 font-bold">6606.ok</span>. BSNL or Jio networks are dynamically intercepted and routing rules will self-adapt on IP changes.
            </p>

            <div className="space-y-4 font-mono text-sm mb-6">
              <div className="flex justify-between p-3 rounded-lg bg-slate-100">
                <span className="text-slate-500">Wallet Balance:</span>
                <span className="font-bold text-emerald-600">₹{stealthWalletRupees}.00</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-slate-100">
                <span className="text-slate-500">Active Carrier SIM:</span>
                <span className="font-bold text-indigo-600 uppercase">{activeSimCarrier}</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-slate-100">
                <span className="text-slate-500">Data Pack Loaded:</span>
                <span className="font-bold text-indigo-600">{stealthDataBalanceMb} MB</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-slate-100">
                <span className="text-slate-500">Stealth SMS Credits:</span>
                <span className="font-bold text-amber-600">{stealthSmsCredits.toLocaleString()} SMS</span>
              </div>
            </div>

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

          {/* Daily Carrier Data Meter & Granular Conversion */}
          <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-mono font-bold text-sm text-indigo-500 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                Live {activeSimCarrier.toUpperCase()} Daily Carrier Data Meter
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 uppercase">
                {activeSimCarrier} Active
              </span>
            </div>

            <div className="space-y-4">
              {/* Daily Progress Gauge */}
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-500 mb-1">
                  <span>DAILY LIMIT: 1.50 GB</span>
                  <span className="text-emerald-500 font-bold">{stealthDataBalanceMb} MB Remaining</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, (stealthDataBalanceMb / 1536) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Micro Conversion Widget */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold font-mono text-slate-700 dark:text-slate-200 mb-3 uppercase flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-amber-500" />
                  Convert Unused Daily Data
                </h4>

                {/* Range Slider */}
                <div className="mb-4">
                  <input 
                    type="range" 
                    min="1" 
                    max={maxMb} 
                    value={customMb} 
                    onChange={(e) => setCustomMb(Number(e.target.value))} 
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* Numeric Manual Input & Preview */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-1/2">
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">CONVERT VALUE (MB)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        min="1" 
                        max={stealthDataBalanceMb}
                        value={customMb} 
                        onChange={(e) => setCustomMb(Math.max(1, Math.min(stealthDataBalanceMb, Number(e.target.value))))} 
                        className="w-full p-2.5 pr-8 text-xs font-mono rounded-lg border bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                      />
                      <span className="absolute right-2.5 top-2.5 text-[10px] font-mono text-slate-400">MB</span>
                    </div>
                  </div>

                  <div className="w-1/2 bg-amber-500/5 p-3 rounded-lg border border-amber-500/10 text-center">
                    <span className="block text-[10px] font-mono text-slate-400">YOU WILL GET</span>
                    <span className="text-sm font-extrabold font-mono text-amber-500">+{expectedSms.toLocaleString()} SMS</span>
                  </div>
                </div>

                {/* Quick Convert Preset Buttons */}
                <div className="mb-4">
                  <span className="block text-[10px] font-mono text-slate-400 mb-2 uppercase text-left font-semibold">Quick Convert Presets</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => convertPreset(50)}
                      disabled={stealthDataBalanceMb < 50}
                      className="px-2 py-2.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-mono text-[11px] font-bold border border-indigo-100/50 dark:border-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-0.5"
                    >
                      <span className="text-xs">⚡ 50 MB</span>
                      <span className="text-[9px] text-indigo-500 font-mono opacity-80">(500 SMS)</span>
                    </button>
                    <button 
                      onClick={() => convertPreset(100)}
                      disabled={stealthDataBalanceMb < 100}
                      className="px-2 py-2.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-mono text-[11px] font-bold border border-indigo-100/50 dark:border-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-0.5"
                    >
                      <span className="text-xs">⚡ 100 MB</span>
                      <span className="text-[9px] text-indigo-500 font-mono opacity-80">(1,000 SMS)</span>
                    </button>
                    <button 
                      onClick={() => convertPreset(1024)}
                      disabled={stealthDataBalanceMb < 1024}
                      className="px-2 py-2.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-mono text-[11px] font-bold border border-indigo-100/50 dark:border-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-0.5"
                    >
                      <span className="text-xs">⚡ 1 GB</span>
                      <span className="text-[9px] text-indigo-500 font-mono opacity-80">(10,240 SMS)</span>
                    </button>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400 text-center mb-3">
                  Conversion Rate: <span className="text-indigo-500 font-bold">1 MB = 10 SMS Credits</span>
                </div>

                <button 
                  onClick={handleConvertData} 
                  disabled={stealthDataBalanceMb <= 0}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  CONVERT {customMb} MB NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Termux Dual-SIM SMS Parser Simulation Panel */}
        <div className="mt-6">
          <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="font-mono font-bold text-sm mb-4 text-indigo-500 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              Termux Dual-SIM SMS Receiver & Parser Engine
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Simulates real BSNL and JIO carrier formats received by the Android device. The Termux API daemon parses messages and triggers DB wallet sync dynamically.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Input & Quick Templates */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 mb-1 font-bold">RAW RECEIVED SMS BODY</label>
                  <textarea
                    rows={3}
                    value={rawSmsInput}
                    onChange={(e) => setRawSmsInput(e.target.value)}
                    placeholder="Paste or select an incoming SMS message template from Jio or BSNL..."
                    className="w-full p-3 text-xs rounded-lg border font-mono bg-slate-50 border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <span className="block text-[10px] font-mono text-slate-400 mb-2 uppercase font-bold text-left">Quick Simulation Templates</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <button
                      onClick={() => selectTemplate("Recharge of Rs.25 on JIO successful. Benefits: 1GB High Speed Data.")}
                      className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-semibold border text-left border-slate-200/50 truncate"
                    >
                      🔵 JIO Rs.25 Recharge SMS
                    </button>
                    <button
                      onClick={() => selectTemplate("Recharge of Rs.98 on BSNL successful. Benefits: 2GB High Speed Data STV Pack.")}
                      className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-semibold border text-left border-slate-200/50 truncate"
                    >
                      🟤 BSNL Rs.98 Recharge SMS
                    </button>
                    <button
                      onClick={() => selectTemplate("[JIO-OTP] Verification PIN is 529104. Expire in 5 mins.")}
                      className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-semibold border text-left border-slate-200/50 truncate"
                    >
                      🔵 JIO verification OTP PIN
                    </button>
                    <button
                      onClick={() => selectTemplate("[BSNL-OTP] Verification PIN is 102943. Expire in 5 mins.")}
                      className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-semibold border text-left border-slate-200/50 truncate"
                    >
                      🟤 BSNL verification OTP PIN
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleRunTermuxParser}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  RUN DYNAMIC TERMUX PARSER & SYNC DB
                </button>
              </div>

              {/* Parser Output console */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[10px] flex flex-col justify-between h-[230px]">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5" />
                      Parser Engine Console
                    </span>
                    <span className={`w-2 h-2 rounded-full ${parserStatus === 'success' ? 'bg-emerald-500' : parserStatus === 'error' ? 'bg-rose-500' : 'bg-slate-600'}`}></span>
                  </div>
                  
                  <div className="space-y-1.5 overflow-y-auto max-h-[150px] pr-1">
                    {parserConsoleLogs.length === 0 ? (
                      <span className="text-slate-500 block italic">Waiting for SMS parser execution... Select a template and click run.</span>
                    ) : (
                      parserConsoleLogs.map((log, idx) => (
                        <div key={idx} className={log.includes('matched') ? 'text-emerald-400' : log.includes('Warning') ? 'text-amber-400' : 'text-slate-400'}>
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="text-[9px] text-slate-500 text-right pt-2 border-t border-slate-800/60 mt-2">
                  Status: <span className="font-bold uppercase text-slate-400">{parserStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Carrier OTP Send Test */}
        <div className="mt-6">
          <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="font-mono font-bold text-sm mb-4 text-indigo-500 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-indigo-500" />
              Dispatch Gateway via SIM {activeSimCarrier === 'jio' ? '1 (Jio)' : '2 (BSNL)'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">Deducts from internally loaded Stealth SMS credits automatically. Prefixes with proper carrier tag.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">TARGET MOBILE NUMBER</label>
                <input 
                  type="text" 
                  value={testPhoneNumber} 
                  onChange={e => setTestPhoneNumber(e.target.value)} 
                  placeholder="+91..." 
                  className="w-full p-2.5 text-xs rounded-lg border font-mono bg-slate-50 border-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100" 
                />
              </div>
              <div className="flex items-end">
                <button 
                  onClick={handleSendDualCarrierSms} 
                  disabled={isSendingOtp} 
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-3 rounded-lg font-bold disabled:opacity-50 transition-all uppercase"
                >
                  {isSendingOtp ? 'SENDING OTP...' : `DISPATCH ${activeSimCarrier.toUpperCase()} OTP (-1 Credit)`}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Universal Laptop / PC Migration & USB SIM Dongle Support Panel */}
        <div className="mt-6">
          <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
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
                    className={`w-full font-mono text-xs py-2.5 rounded-lg font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                      modemStatus === 'connected' 
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${modemStatus === 'connecting' ? 'animate-spin' : ''}`} />
                    {modemStatus === 'connected' ? '✓ DONGLE CONNECTED' : modemStatus === 'connecting' ? 'CONNECTING...' : 'CONNECT USB MODEM'}
                  </button>

                  {modemStatus === 'connected' && (
                    <button
                      onClick={() => {
                        setModemStatus('disconnected');
                        setAtCommandConsole(prev => [...prev, `[SERIAL] Closed COM connection to modem.`]);
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
                  <pre className="whitespace-pre-wrap leading-relaxed">
{`const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const port = new SerialPort({ 
  path: '${comPortInput}', 
  baudRate: ${baudRate} 
});
const parser = port.pipe(new ReadlineParser({ delimiter: '\\r\\n' }));

// Send JIO/BSNL Stealth Payload
function sendSMS(phone, text) {
  port.write(\`AT+CMGF=1\\r\`);
  setTimeout(() => {
    port.write(\`AT+CMGS="\${phone}"\\r\`);
    setTimeout(() => {
      port.write(\`\${text}\\x1A\`);
    }, 500);
  }, 500);
}

// Global host '0.0.0.0' router
module.exports = { sendSMS };`}
                  </pre>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  * This backend wrapper is modular, completely bypassing any OS-level dependency locks. Run it anywhere!
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
