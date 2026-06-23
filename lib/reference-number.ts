const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function cryptoRandomInt(max: number) {
  if (typeof globalThis.crypto !== 'undefined' && 'getRandomValues' in globalThis.crypto) {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    return array[0] % max;
  }

  return Math.floor(Math.random() * max);
}

export function generateReferenceSegment(length = 6) {
  let value = '';

  for (let index = 0; index < length; index += 1) {
    value += alphabet[cryptoRandomInt(alphabet.length)];
  }

  return value;
}

export function generateIntakeReference(year = new Date().getFullYear()) {
  return `MGL-INTAKE-${year}-${generateReferenceSegment()}`;
}
