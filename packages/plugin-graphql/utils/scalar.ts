import type { NamedTypeNode } from 'graphql';
import type { DefinitionsMap } from '../lib/visitors/definitions-map.ts';

export function isScalarType(
	definitionsMap: DefinitionsMap,
	defaultScalars: string[],
	type: NamedTypeNode,
): boolean {
	return (
		definitionsMap.scalarTypeMap.has(type.name.value) || defaultScalars.includes(type.name.value)
	);
}
