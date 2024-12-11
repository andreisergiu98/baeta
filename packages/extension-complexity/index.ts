import './lib/global-types.ts';

import type { Extension } from '@baeta/core/sdk';
import { ComplexityExtension } from './lib/complexity-extension.ts';
import type { ComplexityExtensionOptions } from './lib/complexity-options.ts';

export { ComplexityErrorKind, type GetComplexityError } from './lib/complexity-errors.ts';
export type { ComplexityLimit, GetComplexityLimit } from './lib/complexity-limits.ts';
export type { ComplexityExtensionOptions } from './lib/complexity-options.ts';

export function complexityExtension<Ctx>(options?: ComplexityExtensionOptions<Ctx>) {
	return (): Extension => new ComplexityExtension(options);
}
