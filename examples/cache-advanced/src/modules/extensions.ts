import { createExtensions } from '@baeta/core';
import { cacheExt } from '../extensions/cache-extension.ts';

export default createExtensions({
	cacheExtension: cacheExt,
});
