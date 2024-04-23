declare function btoa(encodedString: string): string;
declare function atob(decodedString: string): string;

export function encodeBase64(value: string): string {
  return btoa(value);
}

export function decodeBase64(value: string): string {
  return atob(value);
}
