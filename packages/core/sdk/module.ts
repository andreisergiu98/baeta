import type { DocumentNode, GraphQLSchema } from 'graphql';
import type { Middleware, Resolver, ScalarResolver, TypeResolver } from '../lib/index.ts';
import type { Subscription } from '../lib/subscription.ts';
import { extendFunction, nameFunction } from '../utils/functions.ts';
import {
	type Extension,
	type ExtensionFactory,
	mergeExtensions,
	resolveExtensions,
	withExtensions,
} from './extension.ts';
import type { TypeHashMap } from './hash.ts';
import { createMiddlewareAdapter } from './middleware.ts';
import { ResolverMapper } from './resolver-mapper.ts';
import { createTypeResolverAdapter } from './resolver-type.ts';
import { createResolverAdapter } from './resolver.ts';
import { createSubscriptionAdapter } from './subscription.ts';
import { type SchemaTransformer, transformSchema } from './transformer.ts';

export interface Module<T> {
	id: string;
	dirname: string;
	hashes: TypeHashMap;
	typedef: DocumentNode;
	createManager: (builder: ModuleBuilder) => T;
}

export class ModuleBuilder {
	readonly mapper = new ResolverMapper();
	readonly transformers: SchemaTransformer[] = [];

	constructor(
		readonly id: string,
		readonly dirname: string,
		readonly hashes: TypeHashMap,
		readonly typedef: DocumentNode,
		private readonly extensions: Extension[],
	) {}

	createResolverBuilder<Result, Root, Context, Args>(type: string, field: string) {
		this.mapper.registerTypeField(type, field);

		const builder = (resolver: Resolver<Result, Root, Context, Args>) => {
			nameFunction(resolver, `${type}.${field}`);
			this.mapper.setResolver(type, field, createResolverAdapter(resolver));
		};

		const coreAddons = {
			$use: this.createMiddlewareBuilder<Result, Root, Context, Args>(type, field),
		};

		const addons = withExtensions(
			coreAddons,
			this.getResolverExtensions<Result, Root, Context, Args>(type, field),
		);

		return extendFunction(builder, addons);
	}

	createSubscriptionBuilder<Result, Root, Context, Args>(field: string) {
		this.mapper.registerTypeField('Subscription', field);

		const builder = <Payload>(subscription: Subscription<Payload, Result, Root, Context, Args>) => {
			nameFunction(subscription.subscribe, `${field}.subscribe`);
			nameFunction(subscription.resolve, `${field}.resolve`);
			this.mapper.setSubscription(field, createSubscriptionAdapter(subscription));
		};

		const coreSubscribeAddons = {
			$use: this.createMiddlewareBuilder('Subscription', `${field}.subscribe`) as <Payload>(
				middleware: Middleware<AsyncIterator<Payload>, Root, Context, Args>,
			) => void,
		};

		const coreResolveAddons = {
			$use: this.createMiddlewareBuilder<Result, Root, Context, Args>(
				'Subscription',
				`${field}.resolve`,
			),
		};

		const addons = this.getSubscriptionExtensions<Root, Context, Args>(field);

		const subscribeAddons = withExtensions(
			coreSubscribeAddons,
			this.getSubscriptionSubscribeExtensions<Root, Context, Args>(field),
		);

		const resolveAddons = withExtensions(
			coreResolveAddons,
			this.getSubscriptionResolveExtensions<Result, Root, Context, Args>(field),
		);

		return extendFunction(builder, {
			...addons,
			subscribe: subscribeAddons,
			resolve: resolveAddons,
		});
	}

	createScalarBuilder(scalar: string) {
		const builder = (resolver: ScalarResolver) => {
			this.mapper.setScalar(scalar, resolver);
		};
		return builder;
	}

	createResolveType<Result, Value, Context>(type: string) {
		const builder = (resolver: TypeResolver<Result, Value, Context>) => {
			nameFunction(resolver, `${type}.$resolveType`);
			this.mapper.setTypenameResolver(type, createTypeResolverAdapter(resolver));
		};
		return builder;
	}

	createMiddlewareBuilder<Result, Root, Context, Args>(type: string, field: string) {
		const builder = (middleware: Middleware<Result, Root, Context, Args>) => {
			nameFunction(middleware, `${type}.${field}.$use`);
			this.mapper.addMiddleware(type, field, createMiddlewareAdapter(middleware));
		};
		return builder;
	}

	createTypeMethods<Root, Context>(type: string) {
		const addons = {
			$use: this.createMiddlewareBuilder<unknown, Root, Context, unknown>(type, '*'),
		};
		return withExtensions(addons, this.getTypeExtensions<Root, Context>(type));
	}

	createSubscriptionMethods<Root, Context>() {
		const addons = {
			$use: this.createMiddlewareBuilder<unknown, Root, Context, unknown>('Subscription', '*'),
		};
		return withExtensions(addons, this.createTypeMethods<Root, Context>('Subscription'));
	}

	createModuleMethods<Context>() {
		const addons = {
			$builder: this as ModuleBuilder,
			$use: this.createMiddlewareBuilder<unknown, unknown, Context, unknown>('*', '*'),
			$directive: this.addTransformer,
		};
		return withExtensions(addons, this.getModuleExtensions());
	}

	private getResolverExtensions<Result, Root, Context, Args>(type: string, field: string) {
		return mergeExtensions(this.extensions, (ext) =>
			ext.getResolverExtensions(this, type, field),
		) as unknown as BaetaExtensions.ResolverExtensions<Result, Root, Context, Args>;
	}

	private getTypeExtensions<Root, Context>(type: string) {
		return mergeExtensions(this.extensions, (ext) =>
			ext.getTypeExtensions(this, type),
		) as unknown as BaetaExtensions.TypeExtensions<Root, Context>;
	}

	private getSubscriptionExtensions<Root, Context, Args>(type: string) {
		return mergeExtensions(this.extensions, (ext) =>
			ext.getSubscriptionExtensions(this, type),
		) as unknown as BaetaExtensions.SubscriptionExtensions<Root, Context, Args>;
	}

	private getSubscriptionSubscribeExtensions<Root, Context, Args>(type: string) {
		return mergeExtensions(this.extensions, (ext) =>
			ext.getSubscriptionSubscribeExtensions(this, type),
		) as unknown as BaetaExtensions.SubscriptionSubscribeExtensions<Root, Context, Args>;
	}

	private getSubscriptionResolveExtensions<Result, Root, Context, Args>(type: string) {
		return mergeExtensions(this.extensions, (ext) =>
			ext.getSubscriptionResolveExtensions(this, type),
		) as unknown as BaetaExtensions.SubscriptionResolveExtensions<Result, Root, Context, Args>;
	}

	private getModuleExtensions() {
		return mergeExtensions(this.extensions, (ext) =>
			ext.getModuleExtensions(),
		) as unknown as BaetaExtensions.ModuleExtensions;
	}

	private addTransformer = (transformer: SchemaTransformer) => {
		this.transformers.push(transformer);
	};

	private transform = (schema: GraphQLSchema) => {
		return transformSchema(schema, [
			...this.transformers,
			...this.extensions.flatMap((ext) => ext.getTransformers()),
		]);
	};

	build = () => {
		for (const extension of this.extensions) {
			extension.build(this, this.mapper);
		}

		return {
			typedef: this.typedef,
			resolvers: this.mapper.compose(),
			transform: this.transform,
		};
	};
}

export function getModuleBuilder(module: Record<string, unknown>) {
	if (module.$builder instanceof ModuleBuilder) {
		return module.$builder;
	}
	throw new Error('Invalid module');
}

export function createSingletonModule<T>(create: () => T) {
	let module: T | undefined;
	return () => {
		if (!module) {
			module = create();
		}
		return module;
	};
}

export function createModuleManager<T>(
	moduleMetadata: Module<T>,
	extensions?: ExtensionFactory<Extension>[],
) {
	const moduleBuilder = new ModuleBuilder(
		moduleMetadata.id,
		moduleMetadata.dirname,
		moduleMetadata.hashes,
		moduleMetadata.typedef,
		resolveExtensions(extensions ?? []),
	);
	const manager = moduleMetadata.createManager(moduleBuilder);
	return manager as Omit<T, '$builder'>;
}
