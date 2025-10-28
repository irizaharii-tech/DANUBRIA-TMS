/**
 * Helper CLI to generate signed tokens for testing.
 * Usage: ts-node src/tools/genSignedLink.ts <orderId> <action> [expiresHours]
 */
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const [,, orderId, action, expiresHoursRaw] = process.argv;
if (!orderId || !action) {
  console.log('Usage: ts-node src/tools/genSignedLink.ts <orderId> <action> [expiresHours]');
  process.exit(1);
}
const expiresHours = Number(expiresHoursRaw || process.env.SIGNED_LINK_EXPIRY_HOURS || 72);
const payload = { orderId, action, expiresAt: new Date(Date.now() + expiresHours * 3600 * 1000).toISOString() };
const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
const hmac = crypto.createHmac('sha256', process.env.HMAC_SECRET || 'dev_hmac');
hmac.update(payloadB64);
const sig = hmac.digest('hex');
const token = `${payloadB64}.${sig}`;
console.log('SIGNED_TOKEN=', token);
console.log('Public URL (POST): POST /api/public/update { token: "<token>" }');
