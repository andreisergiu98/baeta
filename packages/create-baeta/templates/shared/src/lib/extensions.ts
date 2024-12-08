import { createExtensions } from '@baeta/core';
import { complexityExtension } from '@baeta/extension-complexity';
import type { Context } from '../types/context.ts';

const complexity = complexityExtension<Context>({
	defaultComplexity: 1,
	defaultListMultiplier: 10,
	async limit(ctx) {
		return {
			depth: 10,
			breadth: 50,
			complexity: 1000,
		};
	},
});

export default createExtensions(complexity);
