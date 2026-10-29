import { mapMaybePromise } from '@baeta/promises';
import type { Resolver, ResolverParams } from '../lib/resolver.ts';
import { nameFunction } from '../utils/functions.ts';

export function chainMapResolver<Next, Result, Source, Context, Args, Info>(
	name: string,
	resolver: Resolver<Result, Source, Context, Args, Info>,
	map: Resolver<Next, Result, Context, Args, Info>,
) {
	nameFunction(map, name);
	const mapResolver = (params: ResolverParams<Source, Context, Args, Info>) => {
		const result = resolver(params);
		return mapMaybePromise(result, (res) =>
			map({ source: res, args: params.args, ctx: params.ctx, info: params.info }),
		);
	};
	return mapResolver;
}

export function chainKeyResolver<Result, Source, Context, Args, Info, K extends keyof Result>(
	resolver: Resolver<Result, Source, Context, Args, Info>,
	key: K,
) {
	const keyResolver = (params: ResolverParams<Source, Context, Args, Info>) => {
		const result = resolver(params);
		return mapMaybePromise(result, (res) => res[key]);
	};
	return keyResolver;
}

export function chainToResolver<Next, Result, Source, Context, Args, Info>(
	name: string,
	resolver: Resolver<Result, Source, Context, Args, Info>,
	to: (source: Result) => Next,
) {
	nameFunction(to, name);
	const toResolver = (params: ResolverParams<Source, Context, Args, Info>) => {
		const result = resolver(params);
		return mapMaybePromise(result, to);
	};
	return toResolver;
}

export function chainWithDefaultResolver<Next, Result, Source, Context, Args, Info>(
	resolver: Resolver<Result, Source, Context, Args, Info>,
	defaultValue: Next,
) {
	const withDefaultResolver = (params: ResolverParams<Source, Context, Args, Info>) => {
		const result = resolver(params);
		return mapMaybePromise(result, (res) => res ?? defaultValue);
	};
	return withDefaultResolver;
}

export function chainUndefinedAsNullResolver<Result, Source, Context, Args, Info>(
	resolver: Resolver<Result, Source, Context, Args, Info>,
) {
	const withUndefinedAsNullResolver = (params: ResolverParams<Source, Context, Args, Info>) => {
		const result = resolver(params);
		return mapMaybePromise(
			result,
			(res) => (res ?? null) as Result extends undefined ? NonNullable<Result> | null : Result,
		);
	};
	return withUndefinedAsNullResolver;
}
