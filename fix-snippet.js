const fs = require('fs');
let content = fs.readFileSync('src/components/tabs/ConsoleTab.tsx', 'utf8');

// Replace body in sendOTP
content = content.replace('body: JSON.stringify({ to: phoneNumber })', 'body: JSON.stringify({ phone: phoneNumber, otp: Math.floor(100000 + Math.random() * 900000).toString() })');

// Replace body in verifyOTP
content = content.replace('body: JSON.stringify({ phone: phoneNumber, code: otpCode })', 'body: JSON.stringify({ phone: phoneNumber, otp: otpCode })');

// Replace catch blocks to return error
content = content.replace('console.error("SMS Send Error:", err);\n  }', 'console.error("SMS Send Error:", err);\n    return { success: false, error: err.message };\n  }');
content = content.replace('console.error("OTP Verify Error:", err);\n  }', 'console.error("OTP Verify Error:", err);\n    return { success: false, error: err.message };\n  }');

// Same replacements for the copy button content
content = content.replace('body: JSON.stringify({ to: phoneNumber })', 'body: JSON.stringify({ phone: phoneNumber, otp: Math.floor(100000 + Math.random() * 900000).toString() })');
content = content.replace('body: JSON.stringify({ phone: phoneNumber, code: otpCode })', 'body: JSON.stringify({ phone: phoneNumber, otp: otpCode })');
content = content.replace('console.error("SMS Send Error:", err);\\n  }', 'console.error("SMS Send Error:", err);\\n    return { success: false, error: err.message };\\n  }');
content = content.replace('console.error("OTP Verify Error:", err);\\n  }', 'console.error("OTP Verify Error:", err);\\n    return { success: false, error: err.message };\\n  }');


fs.writeFileSync('src/components/tabs/ConsoleTab.tsx', content);
