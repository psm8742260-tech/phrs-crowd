  useEffect(() => {
    fetch('/api/deployments')
      .then(async res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        const text = await res.text();
        const trimmed = text.trim();
        if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
          throw new Error("Response is not JSON. Text: " + trimmed.substring(0, 50));
        }
        try {
          return JSON.parse(trimmed);
        } catch (e) {
          throw new Error("Invalid JSON: " + (e as Error).message);
        }
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDeployments(data);
        }
      })
      .catch(err => console.error("Error loading deployments:", err));
  }, []);

  useEffect(() => {
    fetch('/api/sms/wallet')
      .then(async res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        const text = await res.text();
        const trimmed = text.trim();
        if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
          throw new Error("Response is not JSON. Text: " + trimmed.substring(0, 50));
        }
        try {
          return JSON.parse(trimmed);
        } catch (e) {
          throw new Error("Invalid JSON: " + (e as Error).message);
        }
      })
      .then(data => {
        if (data.data_balance_mb !== undefined) setStealthDataBalanceMb(data.data_balance_mb);
        if (data.sms_credits !== undefined) setStealthSmsCredits(data.sms_credits);
        if (data.wallet_rupees !== undefined) setStealthWalletRupees(data.wallet_rupees);
      })
      .catch(err => console.error("Error loading SMS wallet:", err));

    fetch('/api/sms/history')
      .then(async res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        const text = await res.text();
        const trimmed = text.trim();
        if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
          throw new Error("Response is not JSON. Text: " + trimmed.substring(0, 50));
        }
        try {
          return JSON.parse(trimmed);
        } catch (e) {
          throw new Error("Invalid JSON: " + (e as Error).message);
        }
      })
      .then(data => {
        if (Array.isArray(data)) setPhrsSmsHistory(data);
      })
      .catch(err => console.error("Error loading SMS history:", err));
  }, []);

  useEffect(() => {
    fetch('/api/db/tables')
      .then(async res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        const text = await res.text();
        const trimmed = text.trim();
        if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
          throw new Error("Response is not JSON. Text: " + trimmed.substring(0, 50));
        }
        try {
          return JSON.parse(trimmed);
        } catch (e) {
          throw new Error("Invalid JSON: " + (e as Error).message);
        }
      })
      .then(data => {
        if (Array.isArray(data)) {
          setSqlTables(data);
        }
      })
      .catch(err => console.error("Error loading DB tables:", err));
  }, []);

