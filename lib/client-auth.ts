export const CLIENT_COOKIE_NAME = 'mgl_client_session';
const SESSION_TTL_SECONDS = 60 * 60 * 4;

type ClientSessionPayload = {
  matterId: string;
  matterCode: string;
  clientDisplayName?: string | null;
  iat: number;
  exp: number;
};

function getSecret() {
  return process.env.CLIENT_SESSION_SECRET;
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

export function getClientSessionCookieName() {
  return CLIENT_COOKIE_NAME;
}

export function getClientSessionMaxAge() {
  return SESSION_TTL_SECONDS;
}

export async function createClientSessionToken(payload: Omit<ClientSessionPayload, 'iat' | 'exp'>) {
  const secret = getSecret();
  if (!secret) {
    throw new Error('Client session secret is not configured.');
  }

  const now = Math.floor(Date.now() / 1000);
  const sessionPayload: ClientSessionPayload = {
    ...payload,
    iat: now,
    exp: now + SESSION_TTL_SECONDS
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(sessionPayload));
  const signature = await hmacSha256(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export async function verifyClientSessionToken(token: string | undefined) {
  const secret = getSecret();
  if (!secret || !token) return null;

  const [encodedPayload, suppliedSignature] = token.split('.');
  if (!encodedPayload || !suppliedSignature) return null;

  const expectedSignature = await hmacSha256(encodedPayload, secret);
  if (!safeEqual(expectedSignature, suppliedSignature)) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as ClientSessionPayload;
    if (!payload.matterId || !payload.matterCode || !payload.exp) return null;
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
