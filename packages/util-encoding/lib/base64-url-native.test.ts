import { createBase64UrlTests } from './__test__/base64-url.ts';
import { nativeDecodeBase64Url, nativeEncodeBase64Url } from './base64-url-native.ts';

createBase64UrlTests(nativeEncodeBase64Url, nativeDecodeBase64Url);
