import { createComplexity } from '@baeta/complexity';
import type { Context } from '../types/context.ts';

export const { complexity, complexityAppPlugin } = createComplexity<Context>({
	defaultComplexity: 1,
	defaultListMultiplier: 10,
	async limit() {
		return {
			depth: 2,
			breadth: 10,
			complexity: 50,
		};
	},
});
