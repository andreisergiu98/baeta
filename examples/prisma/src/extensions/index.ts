import { createExtensions } from '@baeta/core';
import { authExt } from './auth-extension.js';
import { cacheExt } from './cache-extension.js';

export default createExtensions(authExt, cacheExt);
