import type { ScalarResolver } from '../lib/scalar.ts';
import type { NativeMiddleware } from './middleware.ts';
import type { NativeTypeResolver } from './resolver-type.ts';
import type { NativeResolver } from './resolver.ts';
import type { NativeSubscription } from './subscription.ts';

export type FieldResolvers = Record<string, NativeResolver> & {
	__resolveType?: NativeTypeResolver;
};

export type SubscriptionsResolvers = {
	Subscription?: Record<string, NativeSubscription | undefined>;
};

export type ResolversMap = {
	[type: string]: FieldResolvers | undefined;
} & SubscriptionsResolvers;

export type ScalarsMap = Record<string, ScalarResolver | undefined>;
export type MiddlewareMap = Record<string, NativeMiddleware[] | undefined>;

export function mergeMiddlewareMaps(target: MiddlewareMap, source: MiddlewareMap): MiddlewareMap {
	const map: MiddlewareMap = { ...target };

	for (const type in source) {
		if (source[type]) {
			map[type] ??= [];
			map[type].push(...source[type]);
		}
	}
	return map;
}
