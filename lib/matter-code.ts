const typeCodeMap: Record<string, string> = {
  'Land/property': 'LAND',
  'Police invitation/criminal defence': 'POL',
  'Business/company': 'BUS',
  'Debt/recovery': 'DEBT',
  'Family/inheritance': 'FAM',
  Employment: 'EMP',
  'Contract/document review': 'CON',
  'Litigation/court matter': 'LIT',
  'Political/party matter': 'POLP',
  Other: 'GEN'
};

function randomSegment(length = 6) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let value = '';

  for (let index = 0; index < length; index += 1) {
    value += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return value;
}

export function sanitiseMatterType(matterType: string) {
  if (typeCodeMap[matterType]) {
    return typeCodeMap[matterType];
  }

  const cleaned = matterType
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((part) => part.slice(0, 3))
    .join('')
    .slice(0, 5);

  return cleaned || 'GEN';
}

export function generateMatterCode(matterType: string, year = new Date().getFullYear()) {
  const typeCode = sanitiseMatterType(matterType);
  return `MGL-${year}-${typeCode}-${randomSegment()}`;
}
