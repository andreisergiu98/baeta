import type { IResolvers } from '@graphql-tools/utils';
import type { Middleware } from '../lib/middleware.ts';
import type { Any } from '../types/any.ts';
import { makeField } from './field.ts';
import type { FieldCompiler } from './field-compiler.ts';
import type { SubscriptionCompiler } from './subscription-compiler.ts';
import type { FieldsResolversMap } from './type-methods.ts';

export class TypeCompiler<
	Source = Any,
	Context = Any,
	Info = Any,
	FieldsResolvers extends FieldsResolversMap<Source, Context, Info> = Any,
> {
	readonly #type: string;
	readonly #store: Map<symbol, unknown>;
	readonly #middlewares: Array<Middleware<Any, Any, Any, Any, Any>>;
	readonly #fields: ReadonlyArray<FieldCompiler | SubscriptionCompiler>;

	constructor(
		type: string,
		store: Map<symbol, unknown>,
		middlewares: Array<Middleware<Any, Any, Any, Any, Any>>,
		fieldsMap: FieldsResolvers,
	) {
		this.#type = type;
		this.#store = store;
		this.#middlewares = middlewares;
		this.#fields = Object.values(fieldsMap).map((field) => makeField(field));
	}

	get type() {
		return this.#type;
	}

	get fields() {
		return this.#fields;
	}

	useStore<T>(key: symbol) {
		const get = () => this.#store.get(key) as T | undefined;
		const set = (value: Readonly<T>) => this.#store.set(key, value);
		return { get, set };
	}

	build(moduleMiddlewares: Middleware<Any, Any, Any, Any, Any>[]) {
		const resolvers: IResolvers = {};
		const allMiddlewares = [...moduleMiddlewares, ...this.#middlewares];
		for (const compiler of this.#fields) {
			resolvers[compiler.field] = compiler.build(allMiddlewares);
		}
		return resolvers;
	}
}
