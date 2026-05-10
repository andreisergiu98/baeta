import type { IResolvers } from '@graphql-tools/utils';
import type { Middleware } from '../lib/middleware.ts';
import type { PluginId } from './app-plugin.ts';
import type { FieldCompiler } from './field-compiler.ts';
import { makeField } from './field.ts';
import { concatMiddlewares } from './middleware.ts';
import type { SubscriptionCompiler } from './subscription-compiler.ts';
import type { FieldsResolversMap } from './type-methods.ts';

export interface TypeCompilerOptions<
	Source,
	Context,
	Info,
	FieldsResolvers extends FieldsResolversMap<Source, Context, Info> = FieldsResolversMap<
		Source,
		Context,
		Info
	>,
> {
	type: string;
	metadata: Map<symbol, unknown>;
	middlewares: Array<Middleware<unknown, Source, Context, unknown, Info>>;
	fieldsMap: FieldsResolvers;
	requiredPluginIds: Set<PluginId>;
}

export class TypeCompiler<
	Source,
	Context,
	Info,
	FieldsResolvers extends FieldsResolversMap<Source, Context, Info> = FieldsResolversMap<
		Source,
		Context,
		Info
	>,
> {
	readonly kind = 'Type';
	readonly #type: string;
	readonly #metadata: Map<symbol, unknown>;
	readonly #middlewares: Array<Middleware<unknown, Source, Context, unknown, Info>>;
	readonly #fields: ReadonlyArray<
		| FieldCompiler<unknown, Source, Context, unknown, Info>
		| SubscriptionCompiler<unknown, unknown, Source, Context, unknown, Info>
	>;
	readonly requiredPluginIds: Set<PluginId>;

	constructor(options: TypeCompilerOptions<Source, Context, Info, FieldsResolvers>) {
		this.#type = options.type;
		this.#metadata = options.metadata;
		this.#middlewares = options.middlewares;
		this.#fields = Object.values(options.fieldsMap).map((field) => makeField(field));
		this.requiredPluginIds = options.requiredPluginIds;
	}

	get type() {
		return this.#type;
	}

	get fields() {
		return this.#fields;
	}

	addMiddleware(middleware: Middleware<unknown, Source, Context, unknown, Info>) {
		this.#middlewares.push(middleware);
	}

	useMetadata<T>(key: symbol) {
		const get = () => this.#metadata.get(key) as T | undefined;
		const set = (value: Readonly<T>) => this.#metadata.set(key, value);
		return { get, set };
	}

	build(moduleMiddlewares: Middleware<unknown, unknown, Context, unknown, Info>[]) {
		const resolvers: IResolvers = {};
		const allRequiredPluginIds = new Set(this.requiredPluginIds);
		const allMiddlewares = concatMiddlewares<unknown, Source, Context, unknown, Info>(
			moduleMiddlewares,
			this.#middlewares,
		);
		for (const compiler of this.#fields) {
			const { resolver, requiredPluginIds } = compiler.build(allMiddlewares);
			resolvers[compiler.field] = resolver;
			requiredPluginIds.forEach((id) => allRequiredPluginIds.add(id));
		}
		return { resolvers, requiredPluginIds: allRequiredPluginIds };
	}
}
