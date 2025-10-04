import { createExtensions } from '@baeta/core';
import { authExt } from '../extensions/auth-extension.ts';

export default createExtensions({
	authExtension: authExt,
});
