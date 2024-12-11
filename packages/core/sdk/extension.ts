import type { ModuleBuilder } from './module.ts';
import type { ResolverMapper } from './resolver-mapper.ts';
import type { SchemaTransformer } from './transformer.ts';

declare global {
	export namespace BaetaExtensions {
		export interface ResolverExtensions<Result, Root, Context, Args> {}

		export interface TypeExtensions<Root, Context> {}

		export interface SubscriptionExtensions<Root, Context, Args> {}

		export interface SubscriptionSubscribeExtensions<Root, Context, Args> {}

		export interface SubscriptionResolveExtensions<Result, Root, Context, Args> {}

		export interface ModuleExtensions {}
	}
}

export type { BaetaExtensions };

export enum ExtensionVersion {
	V1 = 'v1',
}

export type ExtensionFactory<E extends Extension> = () => E;

export class Extension {
	version = ExtensionVersion.V1;

	getModuleExtensions() {
		return {};
	}

	getTypeExtensions<Result, Context>(module: ModuleBuilder, type: string) {
		return {};
	}

	getResolverExtensions<Result, Root, Context, Args>(
		module: ModuleBuilder,
		type: string,
		field: string,
	) {
		return {};
	}

	getSubscriptionExtensions<Root, Context, Args>(module: ModuleBuilder, field: string) {
		return {};
	}

	getSubscriptionSubscribeExtensions<Iterator, Root, Context, Args>(
		module: ModuleBuilder,
		field: string,
	) {
		return {};
	}

	getSubscriptionResolveExtensions<Result, Root, Context, Args>(
		module: ModuleBuilder,
		field: string,
	) {
		return {};
	}

	getTransformers(): SchemaTransformer[] {
		return [];
	}

	build(module: ModuleBuilder, mapper: ResolverMapper): void {}
}

export function resolveExtensions<T>(list: Array<() => T>): T[] {
	return list.map((ext) => ext());
}

export function mergeExtensions<T, K extends Record<string, unknown>>(
	items: T[],
	callback: (item: T) => K,
) {
	const list = items.map(callback);

	const merged: Record<string, unknown> = {};

	for (const item of list) {
		for (const key in item) {
			merged[key] = item[key];
		}
	}

	return merged;
}

export function withExtensions<Core, Ext>(core: Core, ext: Ext): Ext & Core {
	return {
		...ext,
		...core,
	};
}
