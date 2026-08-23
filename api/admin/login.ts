import crypto from 'crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const createSessionToken = () => {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error('SESSION_SECRET is not configured');
  }

  const payload = `admin:${Date.now()}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return `${Buffer.from(payload).toString('base64url')}.${signature}`;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body ?? {};
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    return res.status(500).json({
      error: 'Admin authentication is not configured',
    });
  }

  if (password !== expectedPassword) {
    return res.status(401).json({
      error: 'Invalid password',
    });
  }

  const sessionToken = createSessionToken();

  res.setHeader(
    'Set-Cookie',
    `casette_admin_session=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`,
  );

  return res.status(200).json({
    success: true,
  });
}
