import type { IResolvers } from '@graphql-tools/utils';
import type { Middleware } from '../lib/middleware.ts';
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
	store: Map<symbol, unknown>;
	middlewares: Array<Middleware<unknown, Source, Context, unknown, Info>>;
	fieldsMap: FieldsResolvers;
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
	readonly #type: string;
	readonly #store: Map<symbol, unknown>;
	readonly #middlewares: Array<Middleware<unknown, Source, Context, unknown, Info>>;
	readonly #fields: ReadonlyArray<
		| FieldCompiler<unknown, Source, Context, unknown, Info>
		| SubscriptionCompiler<unknown, unknown, Context, unknown, Info, Source>
	>;

	constructor(options: TypeCompilerOptions<Source, Context, Info, FieldsResolvers>) {
		this.#type = options.type;
		this.#store = options.store;
		this.#middlewares = options.middlewares;
		this.#fields = Object.values(options.fieldsMap).map((field) => makeField(field));
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

	useStore<T>(key: symbol) {
		const get = () => this.#store.get(key) as T | undefined;
		const set = (value: Readonly<T>) => this.#store.set(key, value);
		return { get, set };
	}

	build(moduleMiddlewares: Middleware<unknown, unknown, Context, unknown, Info>[]) {
		const resolvers: IResolvers = {};
		const allMiddlewares = concatMiddlewares<unknown, Source, Context, unknown, Info>(
			moduleMiddlewares,
			this.#middlewares,
		);
		for (const compiler of this.#fields) {
			resolvers[compiler.field] = compiler.build(allMiddlewares);
		}
		return resolvers;
	}
}
