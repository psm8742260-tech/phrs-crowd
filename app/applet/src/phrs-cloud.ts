export interface PhrsConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
}

// 1. Master Config
export const phrsConfig: PhrsConfig = {
  apiKey: "PHRS_AUTH_8742260",
  authDomain: "157.50.81.156",
  projectId: "phrs-master-cloud",
  appId: "1:8742260:web:phrs_master_node"
};

export function initializeApp(config: PhrsConfig) {
  console.log("PHRS Master Cloud Initialized with config:", config);
  return {
    name: "phrs-master-app",
    config,
    initialized: true,
  };
}

export const app = initializeApp(phrsConfig);

// 2. Initialize Core Services (App, DB, Auth)
export const PHRS = {
  init(host: string) {
    console.log(`PHRS Core initialized on host: ${host}`);
  },
  status: "active",
  host: "157.50.81.156"
};

export const db = {
  host: "157.50.81.156",
  connected: true,
  query(sql: string) {
    console.log(`[PHRS DB @ ${this.host}] Executing:`, sql);
    return [];
  }
};

export const OTP = {
  node(host: string) {
    console.log(`OTP Node connected to host: ${host}`);
  },
  send(phone: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[PHRS OTP Node @ 157.50.81.156] Sent OTP ${code} to ${phone}`);
    return code;
  }
};

// Execute initializations immediately as requested
PHRS.init("157.50.81.156");
db.host = "157.50.81.156";
OTP.node("157.50.81.156");
