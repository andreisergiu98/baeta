export function encodeBase64Url(value: string): string {
  const utf8Bytes = new TextEncoder().encode(value);
  const base64Encoded = btoa(String.fromCharCode(...utf8Bytes));
  return base64Encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function createPadding(length: number): string {
  const padding = 4 - (length % 4);
  if (padding < 4) {
    return '='.repeat(padding);
  }
  return '';
}

export function decodeBase64Url(base64Url: string): string {
  const base64Encoded = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const padding = createPadding(base64Url.length);
  const base64WithPadding = base64Encoded + padding;

  const binaryString = atob(base64WithPadding);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new TextDecoder().decode(bytes);
}
