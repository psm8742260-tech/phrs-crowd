/**
 * PHRS Crowd - SDK (v6.0)
 * Auto-Registration / Heartbeat Ping
 * 
 * Include this script in your web application to automatically register 
 * it with the PHRS Master Server Dashboard.
 */
(function() {
  // Configurable options via global window.PHRS_CONFIG
  const config = window.PHRS_CONFIG || {};
  
  const payload = {
    id: config.id || "",
    name: config.name || document.title || "Unknown App",
    subdomain: config.subdomain || window.location.hostname.split('.')[0] || "unknown",
    port: config.port || window.location.port || 80,
    techStack: config.techStack || "HTML/JS SDK",
    githubUrl: config.githubUrl || ""
  };

  const masterServer = config.masterServer || "https://aims.phrscrowd.online";

  console.log("[PHRS SDK] Initiating Auto-Registration Ping to Master Server...", payload);

  fetch(`${masterServer}/api/deployments/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      console.log("[PHRS SDK] ✅ Successfully registered with Master Dashboard!", data.deployment);
    } else {
      console.warn("[PHRS SDK] ⚠️ Registration warning:", data);
    }
  })
  .catch(err => {
    console.error("[PHRS SDK] ❌ Failed to register with Master Server:", err);
  });
})();
