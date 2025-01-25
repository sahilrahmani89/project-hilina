import { customAlphabet } from "nanoid";

export function generateSecureInteger(length = 6) {
    const nanoid = customAlphabet('1234567890', length);
    return nanoid();  // By default, it generates a 6-digit OTP
}
