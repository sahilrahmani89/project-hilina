import { customAlphabet } from "nanoid";

export function generateSecureInteger(length = 6) {
    const nanoid = customAlphabet('1234567890', length);
    return nanoid();  // By default, it generates a 6-digit OTP
}

export function extractProtocolAndDomain(url:URL) {
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;
    const port = parsedUrl.port ? `:${parsedUrl.port}` : ''; // Include port if available
    return `${parsedUrl.protocol}//${domain}${port}/`;
}
