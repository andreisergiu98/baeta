declare function btoa(encodedString: string): string;
declare function atob(decodedString: string): string;

interface TextEncoder {
  encode(input?: string): Uint8Array;
}
declare const TextEncoder: {
  prototype: TextEncoder;
  new (): TextEncoder;
};

interface TextDecoder {
  decode(input?: BufferSource, options?: TextDecoderOptions): string;
}
declare const TextDecoder: {
  prototype: TextDecoder;
  new (label?: string, options?: TextDecoderOptions): TextDecoder;
};
