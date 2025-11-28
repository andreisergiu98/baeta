import { Kind, type TypeNode } from 'graphql';
import { isScalarType } from '../../utils/scalar.ts';
import type { DefinitionsMap } from './definitions-map.ts';

export type FieldInfoMap = Map<string, Map<string, { type: string; hasArguments: boolean }>>;

export function createFieldInfoMap(definitionsMap: DefinitionsMap, defaultScalars: string[]) {
	const map: FieldInfoMap = new Map();
	for (const objectType of definitionsMap.objectTypeMap.values()) {
		const objectName = objectType.name.value;
		for (const field of objectType.fields ?? []) {
			const fieldName = field.name.value;
			const type = printNamedType(definitionsMap, defaultScalars, field.type, true);
			const hasArguments = field.arguments != null && field.arguments.length > 0;
			const fieldMap = map.get(objectName) ?? new Map();
			fieldMap.set(fieldName, { type, hasArguments });
			map.set(objectName, fieldMap);
		}
	}
	return map;
}

function printNamedType(
	definitionsMap: DefinitionsMap,
	defaultScalars: string[],
	type: TypeNode,
	nullable = true,
): string {
	const withNullable = nullable ? ' | null' : '';
	switch (type.kind) {
		case Kind.NAMED_TYPE:
			if (isScalarType(definitionsMap, defaultScalars, type)) {
				return `Types.Scalars["${type.name.value}"]${withNullable}`;
			}
			return `Types.${type.name.value}${withNullable}`;
		case Kind.LIST_TYPE:
			return `Array<${printNamedType(definitionsMap, defaultScalars, type.type, nullable)}>${withNullable}`;
		case Kind.NON_NULL_TYPE:
			return printNamedType(definitionsMap, defaultScalars, type.type, false);
		default:
			return type satisfies never;
	}
}
