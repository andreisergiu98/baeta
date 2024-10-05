import type { GraphQLAbstractType, GraphQLResolveInfo } from 'graphql';

export type TypeResolver<Result, Value, Context> = (
	params: TypeResolverParams<Value, Context>,
) => Result | Promise<Result>;

export type TypeResolverParams<Value, Context> = {
	value: Value;
	ctx: Context;
	info: GraphQLResolveInfo;
	type: GraphQLAbstractType;
};
