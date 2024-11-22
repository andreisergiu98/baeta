import {
	type FieldNode,
	type GraphQLField,
	type GraphQLNamedType,
	type GraphQLResolveInfo,
	getArgumentValues,
} from 'graphql';

export type FieldSettingsMap = Record<
	string,
	// biome-ignore lint/suspicious/noExplicitAny: Match any type from the original code
	Record<string, GetFieldSettings<any, any> | undefined> | undefined
>;

export type FieldSettings = {
	complexity?: number;
	multiplier?: number;
};

export type GetFieldSettingsArgs<Context, Args> = {
	args: Args;
	ctx: Context;
};

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
	const customComplexity = fieldSettingsMap[type.name]?.[fieldName];

	if (customComplexity) {
		return customComplexity({ args, ctx });
	}

	const wildCardComplexity = fieldSettingsMap[type.name]?.['*'];

	if (wildCardComplexity) {
		return wildCardComplexity({ args, ctx });
	}
}
