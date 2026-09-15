/**
 * PHRS Crowd - Secure SMS & OTP Gateway SDK
 * 
 * Usage in external projects:
 * import { sendOTP, verifyOTP } from './phrs-sms-sdk.js';
 */

const PHRS_GATEWAY = "https://aims.phrscrowd.online";
const PROJECT_KEY = "6606.0k"; // Default API key/authorization if required

export async function sendOTP(phoneNumber) {
  try {
    const response = await fetch(`${PHRS_GATEWAY}/api/otp/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PROJECT_KEY}`
      },
      // Uses "phone" instead of "to" as per our updated backend handler
      body: JSON.stringify({ phone: phoneNumber, otp: Math.floor(100000 + Math.random() * 900000).toString() })
    });
    return await response.json();
  } catch (err) {
    console.error("SMS Send Error:", err);
    return { success: false, error: err.message };
  }
}

export async function verifyOTP(phoneNumber, otpCode) {
  try {
    const response = await fetch(`${PHRS_GATEWAY}/api/sms/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PROJECT_KEY}`
      },
      // Uses "phone" and "otp" to match backend expectation
      body: JSON.stringify({ phone: phoneNumber, otp: otpCode })
    });
    return await response.json();
  } catch (err) {
    console.error("OTP Verify Error:", err);
    return { success: false, error: err.message };
  }
}
