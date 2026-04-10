// In-memory OTP store with auto-expiration
const otpStore = new Map();

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function storeOTP(email, otp, userData = null) {
    const key = email.toLowerCase();
    // Clear any existing timer
    if (otpStore.has(key)) {
        clearTimeout(otpStore.get(key).timer);
    }
    const timer = setTimeout(() => otpStore.delete(key), OTP_EXPIRY_MS);
    otpStore.set(key, { otp, timer, createdAt: Date.now(), userData });
}

function verifyOTP(email, otp) {
    const key = email.toLowerCase();
    const entry = otpStore.get(key);
    if (!entry) return { valid: false, reason: "OTP expired or not found" };
    if (entry.otp !== otp) return { valid: false, reason: "Invalid OTP" };

    // OTP is valid — clean up
    clearTimeout(entry.timer);
    const userData = entry.userData;
    otpStore.delete(key);
    return { valid: true, userData };
}

function getOTPData(email) {
    const key = email.toLowerCase();
    return otpStore.get(key);
}

// Password reset OTP (separate from email verification)
const RESET_PREFIX = "reset:";
function storeResetOTP(email, otp) {
    const key = RESET_PREFIX + email.toLowerCase();
    if (otpStore.has(key)) {
        clearTimeout(otpStore.get(key).timer);
    }
    const timer = setTimeout(() => otpStore.delete(key), OTP_EXPIRY_MS);
    otpStore.set(key, { otp, timer, createdAt: Date.now() });
}

function verifyResetOTP(email, otp, deleteOnSuccess = true) {
    const key = RESET_PREFIX + email.toLowerCase();
    const entry = otpStore.get(key);
    if (!entry) return { valid: false, reason: "OTP expired or not found" };
    if (entry.otp !== otp) return { valid: false, reason: "Invalid OTP" };
    if (deleteOnSuccess) {
        clearTimeout(entry.timer);
        otpStore.delete(key);
    }
    return { valid: true };
}

module.exports = { generateOTP, storeOTP, verifyOTP, getOTPData, storeResetOTP, verifyResetOTP };
