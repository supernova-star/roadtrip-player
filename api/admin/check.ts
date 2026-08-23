import crypto from 'crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const getCookie = (cookieHeader: string | undefined, name: string) => {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());

  const matchingCookie = cookies.find((cookie) =>
    cookie.startsWith(`${name}=`),
  );

  return matchingCookie
    ? decodeURIComponent(matchingCookie.slice(name.length + 1))
    : null;
};

const isValidSession = (token: string) => {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    return false;
  }

  const [encodedPayload, signature] = token.split('.');

  if (!encodedPayload || !signature) {
    return false;
  }

  const payload = Buffer.from(encodedPayload, 'base64url').toString('utf8');

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  if (signature.length !== expectedSignature.length) {
    return false;
  }

  if (
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    )
  ) {
    return false;
  }

  if (!payload.startsWith('admin:')) {
    return false;
  }

  const createdAt = Number(payload.slice('admin:'.length));

  if (!Number.isFinite(createdAt)) {
    return false;
  }

  const sessionAge = Date.now() - createdAt;
  const maxSessionAge = 24 * 60 * 60 * 1000;

  return sessionAge >= 0 && sessionAge <= maxSessionAge;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sessionToken = getCookie(req.headers.cookie, 'casette_admin_session');

  if (!sessionToken || !isValidSession(sessionToken)) {
    return res.status(401).json({
      authenticated: false,
    });
  }

  return res.status(200).json({
    authenticated: true,
  });
}
