import { createJSONScalar } from './scalar-json.ts';
import { createStringScalar } from './scalar-string.ts';

export function createFederationScalar<T extends 'string' | 'json'>(
	type: T,
	name: string,
	description?: string,
) {
	if (type === 'string') {
		return createStringScalar(name, description);
	}
	if (type === 'json') {
		return createJSONScalar(name, description);
	}
	return type satisfies never;
}
