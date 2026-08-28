export interface Project {
  id: string;
  name: string;
  status: 'active' | 'maintenance' | 'idle';
  created_at: string;
  api_hits: number;
}

export interface Deployment {
  id: string;
  name: string;
  subdomain: string;
  port: number;
  techStack: string;
  status: 'ONLINE' | 'BUILDING' | 'OFFLINE';
  cpu: number;
  memory: number;
  visitors: number;
  githubUrl: string;
}

export interface SystemMetric {
  cpu: number;
  memory: number;
  disk: number;
  bandwidth: number;
}

declare global {
  interface Window {
    executeBackendAction?: (msg: string) => Promise<any>;
  }
}

