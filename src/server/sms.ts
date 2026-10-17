import fs from "fs";
import path from "path";

export async function sendSms(phone: string, message: string) {
  const configPath = path.join(process.cwd(), "dist", "sms_config.json");
  if (!fs.existsSync(configPath)) return;
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  
  if (config.provider === 'fast2sms') {
    // Basic implementation for Fast2SMS
    console.log(`[SMS] Sending to ${phone} via Fast2SMS: ${message}`);
    // fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=${config.apiKey}&sender_id=${config.sender}&message=${encodeURIComponent(message)}&route=q&numbers=${phone}`)
  }
}
