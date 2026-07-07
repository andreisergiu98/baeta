import {
	type FieldNode,
	type GraphQLField,
	type GraphQLNamedType,
	type GraphQLResolveInfo,
	getArgumentValues,
} from 'graphql';

export type FieldSettingsMap = Map<string, Map<string, GetFieldSettings<unknown, unknown>>>;

/**
 * Configuration for field complexity calculation.
 */
export type FieldSettings = {
	complexity?: number;
	multiplier?: number;
};

/**
 * Arguments passed to field settings functions.
 */
export type GetFieldSettingsArgs<Context, Args> = {
	/** Arguments passed to the GraphQL field */
	args: Args;
	/** Request context */
	ctx: Context;
};

/**
 * Function to determine complexity settings for a field.
 * Returns either field settings or false to disable complexity calculation.
 *
 * @param params - Object containing field arguments and context
 * @returns Field settings object or false
 */
export type GetFieldSettings<Context, Args> = (
	params: GetFieldSettingsArgs<Context, Args>,
) => FieldSettings | false;

export function getFieldComplexitySettings<Context>(
	ctx: Context,
	info: GraphQLResolveInfo,
	type: GraphQLNamedType,
	field: GraphQLField<unknown, unknown>,
	selection: FieldNode,
	fieldName: string,
	fieldSettingsMap: FieldSettingsMap,
) {
	const args = getArgumentValues(field, selection, info.variableValues);
	const customComplexity = fieldSettingsMap.get(type.name)?.get(fieldName);

	if (customComplexity) {
		return customComplexity({ args, ctx });
	}

	const wildCardComplexity = fieldSettingsMap.get(type.name)?.get('*');

	if (wildCardComplexity) {
		return wildCardComplexity({ args, ctx });
	}
}

export function registerFieldSettingsSetter<Context, Args>(
	type: string,
	field: string,
	fn: GetFieldSettings<Context, Args>,
	map: FieldSettingsMap,
) {
	let fields = map.get(type);
	if (!fields) {
		fields = new Map();
		map.set(type, fields);
	}
	if (fields.has(field)) {
		const name = field === '*' ? type : `${type}.${field}`;
		throw new Error(`Complexity limits are already registered for "${name}".`);
	}
	fields.set(field, fn as GetFieldSettings<unknown, unknown>);
}
