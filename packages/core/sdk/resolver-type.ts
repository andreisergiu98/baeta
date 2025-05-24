import type { GraphQLTypeResolver } from 'graphql';
import type { TypeResolver } from '../lib/resolver-type.ts';

export type NativeTypeResolver<
	_Result = unknown,
	Value = unknown,
	Context = unknown,
> = GraphQLTypeResolver<Value, Context>;

export function createTypeResolverAdapter<Result, Value, Context>(
	resolver: TypeResolver<Result, Value, Context>,
): NativeTypeResolver<Result, Value, Context> {
	return function adapter(value, ctx, info, type) {
		return resolver({ value, ctx, info, type }) as string | undefined;
	};
}
