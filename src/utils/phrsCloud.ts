// src/utils/phrsCloud.ts

/**
 * PHRS Cloud API Endpoint
 * The secure gateway to push AI Master Studio apps directly to the PHRS Crowd Server.
 */
const PHRS_CLOUD_API = "https://api.phrscrowd.online/receive-studio-app";
// Note: In a real environment, you might use an env variable or relative path if hosted together.
// For local testing on the same node, we'll route to the internal proxy if window.location is available,
// but fallback to the requested domain.
const getEndpoint = () => {
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
     // If we are already on phrscrowd.online or similar, use relative path to hit the same server's backend
     return '/api/receive-studio-app';
  }
  return PHRS_CLOUD_API;
};

export interface PublishPayload {
  name: string;
  subdomain: string;
  html: string;
  css?: string;
  js?: string;
  techStack?: string;
}

export const phrsCloud = {
  /**
   * Publishes the generated project files directly to the PHRS Crowd Server
   */
  async publishApp(payload: PublishPayload) {
    try {
      const endpoint = getEndpoint();
      console.log(`[PHRS Cloud] Publishing app "${payload.name}" to ${endpoint}...`);
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "Bearer YOUR_SECRET_KEY" // Add if needed later
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("[PHRS Cloud] Publish Success:", data);
      return data;
      
    } catch (error: any) {
      console.error("[PHRS Cloud] Publish Error:", error);
      return { success: false, error: error.message };
    }
  }
};
