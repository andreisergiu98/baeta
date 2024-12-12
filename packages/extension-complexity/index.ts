import './lib/global-types.ts';

import type { Extension } from '@baeta/core/sdk';
import { ComplexityExtension } from './lib/complexity-extension.ts';
import type { ComplexityExtensionOptions } from './lib/complexity-options.ts';

export { ComplexityErrorKind, type GetComplexityError } from './lib/complexity-errors.ts';
export type { ComplexityLimit, GetComplexityLimit } from './lib/complexity-limits.ts';
export type { ComplexityExtensionOptions } from './lib/complexity-options.ts';
export type { ComplexityExtensionMethods } from './lib/global-types.ts';
export type {
	FieldSettings,
	GetFieldSettings,
	GetFieldSettingsArgs,
} from './lib/field-settings.ts';

/**
 * Creates a complexity analysis extension for GraphQL queries.
 *
 * @param options - Configuration options for complexity analysis
 * @returns Extension factory function
 *
 * @example
 * ```typescript
 * const complexity = complexityExtension<Context>({
 *   defaultComplexity: 1,
 *   defaultListMultiplier: 10,
 *   limit: {
 *     depth: 5,
 *     breadth: 10,
 *     complexity: 100
 *   }
 * });
 * ```
 */
export function complexityExtension<Ctx>(options?: ComplexityExtensionOptions<Ctx>) {
	return (): Extension => new ComplexityExtension(options);
}
