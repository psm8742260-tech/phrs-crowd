import fs from "fs";
import path from "path";
import { HOSTED_DIR } from "./storage.js";

export async function offloadToVps(fileName: string) {
  const srcPath = path.join(HOSTED_DIR, fileName);
  if (!fs.existsSync(srcPath)) return;

  console.log(`[VPS OFFLOAD] Offloading ${fileName} to permanent storage...`);
  
  // Implementation Note: In a real VPS setup, this would use a secure FTP/SSH client.
  // We simulate the offload by moving it to the persistent cPanel storage path.
  const vpsPath = path.join('/home/phrscrow/public_html/storage', fileName);
  
  try {
    if (!fs.existsSync('/home/phrscrow/public_html/storage')) {
      fs.mkdirSync('/home/phrscrow/public_html/storage', { recursive: true });
    }
    fs.copyFileSync(srcPath, vpsPath);
    fs.unlinkSync(srcPath); // Clean up main server
    console.log(`[VPS OFFLOAD] Successfully moved ${fileName} to VPS storage.`);
  } catch (e) {
    console.error(`[VPS OFFLOAD ERROR] Failed to offload ${fileName}:`, e);
  }
}
