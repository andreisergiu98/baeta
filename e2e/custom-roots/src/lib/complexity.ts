import { createComplexity } from '@baeta/complexity';
import type { Context } from '../types/context.ts';

export const { complexity, complexityAppPlugin } = createComplexity<Context>({
	limit: { depth: 5, breadth: 6, complexity: 1000 },
});
