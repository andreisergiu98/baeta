import {
	type GraphQLArgument,
	type GraphQLField,
	type GraphQLInputField,
	type GraphQLInputType,
	type GraphQLScalarType,
	type GraphQLSchema,
	isInputObjectType,
	isInterfaceType,
	isListType,
	isNonNullType,
	isObjectType,
	isScalarType,
} from 'graphql';
import type { ScalarRecord } from './module-compiler.ts';
import type { FieldResolverRecord } from './type-compiler.ts';

interface ModuleResolvers {
	name: string;
	fields: ReadonlyArray<FieldResolverRecord>;
	scalars: ReadonlyArray<ScalarRecord>;
}

const scalarImplementationKeys = [
	'serialize',
	'parseValue',
	'parseLiteral',
	'coerceOutputValue',
	'coerceInputValue',
	'coerceInputLiteral',
	'valueToLiteral',
];

export function attachResolvers(schema: GraphQLSchema, modules: ReadonlyArray<ModuleResolvers>) {
	const fieldOwners = new Map<string, string>();
	const scalarOwners = new Map<string, string>();
	const implementedScalars = new Set<GraphQLScalarType>();
	for (const module of modules) {
		for (const record of module.fields) {
			const coordinate = `${record.type}.${record.field}`;
			const owner = fieldOwners.get(coordinate);
			if (owner != null) {
				throw new Error(
					`${coordinate} is resolved by both module "${owner}" and module "${module.name}". A field can only be resolved by one module.`,
				);
			}
			fieldOwners.set(coordinate, module.name);
			const field = getField(schema, record, module.name);
			field.resolve = record.resolve;
			if (record.subscribe != null) {
				field.subscribe = record.subscribe;
			}
		}
		for (const record of module.scalars) {
			const owner = scalarOwners.get(record.type);
			if (owner != null) {
				throw new Error(
					`Scalar ${record.type} is implemented by both module "${owner}" and module "${module.name}". A scalar can only be implemented by one module.`,
				);
			}
			scalarOwners.set(record.type, module.name);
			const scalar = getScalar(schema, record.type, module.name);
			implementScalar(scalar, record.scalar);
			implementedScalars.add(scalar);
		}
	}
	if (implementedScalars.size > 0) {
		parseDefaultValues(schema, implementedScalars);
	}
}

function getField(
	schema: GraphQLSchema,
	record: FieldResolverRecord,
	module: string,
): GraphQLField<unknown, unknown> {
	const type = schema.getType(record.type);
	if (!isObjectType(type)) {
		throw new Error(
			`Module "${module}" resolves ${record.type}.${record.field}, but ${record.type} isn't an object type in the schema.`,
		);
	}
	const field = type.getFields()[record.field];
	if (field == null) {
		throw new Error(
			`Module "${module}" resolves ${record.type}.${record.field}, but the schema doesn't define that field.`,
		);
	}
	return field;
}

function getScalar(schema: GraphQLSchema, name: string, module: string) {
	const type = schema.getType(name);
	if (!isScalarType(type)) {
		throw new Error(
			`Module "${module}" implements the scalar ${name}, but ${name} isn't a scalar in the schema.`,
		);
	}
	return type;
}

function implementScalar(target: GraphQLScalarType, implementation: GraphQLScalarType) {
	const from = implementation as unknown as Record<string, unknown>;
	const to = target as unknown as Record<string, unknown>;
	for (const key of scalarImplementationKeys) {
		if (typeof from[key] === 'function') {
			to[key] = from[key];
		}
	}
	to.extensions = { ...target.extensions, ...implementation.extensions };
}

function parseDefaultValues(schema: GraphQLSchema, scalars: ReadonlySet<GraphQLScalarType>) {
	for (const directive of schema.getDirectives()) {
		for (const arg of directive.args) {
			parseDefaultValue(arg, scalars);
		}
	}
	for (const type of Object.values(schema.getTypeMap())) {
		if (isObjectType(type) || isInterfaceType(type)) {
			for (const field of Object.values(type.getFields())) {
				for (const arg of field.args) {
					parseDefaultValue(arg, scalars);
				}
			}
		} else if (isInputObjectType(type)) {
			for (const field of Object.values(type.getFields())) {
				parseDefaultValue(field, scalars);
			}
		}
	}
}

function parseDefaultValue(
	inputValue: GraphQLArgument | GraphQLInputField,
	scalars: ReadonlySet<GraphQLScalarType>,
) {
	if (inputValue.defaultValue !== undefined) {
		inputValue.defaultValue = parseInputValue(inputValue.type, inputValue.defaultValue, scalars);
	}
}

function parseInputValue(
	type: GraphQLInputType,
	value: unknown,
	scalars: ReadonlySet<GraphQLScalarType>,
): unknown {
	if (value == null) {
		return value;
	}
	if (isNonNullType(type)) {
		return parseInputValue(type.ofType, value, scalars);
	}
	if (isListType(type)) {
		const items = Array.isArray(value) ? value : [value];
		return items.map((item) => parseInputValue(type.ofType, item, scalars));
	}
	if (isInputObjectType(type)) {
		const fields = type.getFields();
		const parsed: Record<string, unknown> = {};
		for (const [key, item] of Object.entries(value)) {
			const field = fields[key];
			parsed[key] = field == null ? item : parseInputValue(field.type, item, scalars);
		}
		return parsed;
	}
	if (isScalarType(type) && scalars.has(type)) {
		try {
			return type.parseValue(value);
		} catch {
			return value;
		}
	}
	return value;
}
