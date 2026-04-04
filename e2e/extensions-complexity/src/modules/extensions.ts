import { createExtensions } from '@baeta/core';
import { complexityExtension } from '@baeta/extension-complexity';
import type { Context } from '../types/context.ts';

export default createExtensions({
	complexityExtension: complexityExtension<Context>({
		defaultComplexity: 1,
		defaultListMultiplier: 10,
		async limit() {
			return {
				depth: 2,
				breadth: 10,
				complexity: 50,
			};
		},
	}),
});
