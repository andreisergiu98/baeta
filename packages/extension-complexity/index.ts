import {
	ComplexityExtension,
	type ComplexityExtensionOptions,
} from './lib/complexity-extension.ts';
import './lib/global-types.ts';

export function complexityExtension<Ctx>(options: ComplexityExtensionOptions<Ctx>) {
	return () => new ComplexityExtension(options);
}
