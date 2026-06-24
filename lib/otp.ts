const OTP_LENGTH = 6;

function textEncoder() {
  return new TextEncoder();
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function randomBytes(length: number) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

function randomHex(length: number) {
  return Array.from(randomBytes(length))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return result === 0;
}

export function generateOtpCode() {
  const bytes = randomBytes(4);
  const value = new DataView(bytes.buffer).getUint32(0, false) % 1_000_000;
  return value.toString().padStart(OTP_LENGTH, '0');
}

export async function hashOtpCode(code: string) {
  const salt = randomHex(16);
  const digest = await crypto.subtle.digest('SHA-256', textEncoder().encode(`${salt}:${code}`));
  return `${salt}:${toHex(digest)}`;
}

export async function verifyOtpCode(code: string, hash: string) {
  const [salt, expectedDigest] = hash.split(':');
  if (!salt || !expectedDigest) return false;
  const digest = await crypto.subtle.digest('SHA-256', textEncoder().encode(`${salt}:${code}`));
  return safeEqual(toHex(digest), expectedDigest);
}

export function normaliseContactValue(value: string | null | undefined) {
  return (value ?? '').toLowerCase().replace(/\s+/g, '').trim();
}

export function maskContactValue(value: string | null | undefined) {
  const normalized = normaliseContactValue(value);
  if (!normalized) return 'registered contact';

  if (normalized.includes('@')) {
    const [name, domain] = normalized.split('@');
    const safeName = name.length <= 2 ? `${name[0] ?? '*'}***` : `${name.slice(0, 2)}***`;
    return `${safeName}@${domain ?? 'email'}`;
  }

  if (normalized.length <= 4) return '***';
  return `${normalized.slice(0, 3)}***${normalized.slice(-3)}`;
}
