export const ADMIN_COOKIE_NAME = 'mgl_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

type AdminSessionPayload = {
  username: string;
  iat: number;
  exp: number;
};

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET;
}

function textEncoder() {
  return new TextEncoder();
}

function base64UrlEncode(input: string) {
  const base64 = btoa(input);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(input: string) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  return atob(padded);
}

async function hmacSha256(data: string, secret: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, textEncoder().encode(data));
  const bytes = Array.from(new Uint8Array(signature));
  const binary = bytes.map((byte) => String.fromCharCode(byte)).join('');
  return base64UrlEncode(binary);
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return result === 0;
}

export function getAdminSessionCookieName() {
  return ADMIN_COOKIE_NAME;
}

export function getAdminSessionMaxAge() {
  return SESSION_TTL_SECONDS;
}

export async function createAdminSessionToken(username: string) {
  const secret = getSecret();
  if (!secret) {
    throw new Error('Admin session secret is not configured.');
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    username,
    iat: now,
    exp: now + SESSION_TTL_SECONDS
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = await hmacSha256(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionToken(token: string | undefined) {
  const secret = getSecret();
  if (!secret || !token) return false;

  const [encodedPayload, suppliedSignature] = token.split('.');
  if (!encodedPayload || !suppliedSignature) return false;

  const expectedSignature = await hmacSha256(encodedPayload, secret);
  if (!safeEqual(expectedSignature, suppliedSignature)) return false;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AdminSessionPayload;
    if (!payload.username || !payload.exp) return false;
    if (payload.username !== process.env.ADMIN_USER) return false;
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
