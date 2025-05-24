import { createExtensions } from '@baeta/core';
import { complexityExtension } from '@baeta/extension-complexity';
import type { Context } from './types/context.ts';

export default createExtensions(
	complexityExtension<Context>({
		defaultComplexity: 1,
		defaultListMultiplier: 10,
		async limit(_ctx) {
			// Set limits dynamically based on user permissions, plan, etc.
			return {
				depth: 10,
				breadth: 50,
				complexity: 1000,
			};
		},
	}),
);
