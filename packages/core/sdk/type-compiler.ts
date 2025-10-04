import type { IResolvers } from '@graphql-tools/utils';
import type { Middleware } from '../lib/middleware.ts';
import type { Any } from '../types/any.ts';
import { makeField } from './field.ts';
import type { FieldCompiler } from './field-compiler.ts';
import type { FieldsResolversMap } from './type-methods.ts';

export class TypeCompiler<
	Source = Any,
	Context = Any,
	Info = Any,
	FieldsResolvers extends FieldsResolversMap<Source, Context, Info> = Any,
> {
	readonly type: string;
	readonly store: Map<symbol, unknown>;
	readonly middlewares: Array<Middleware<Any, Any, Any, Any, Any>>;
	readonly fields: Array<FieldCompiler>;

	constructor(
		type: string,
		store: Map<symbol, unknown>,
		middlewares: Array<Middleware<Any, Any, Any, Any, Any>>,
		fieldsMap: FieldsResolvers,
	) {
		this.type = type;
		this.store = store;
		this.middlewares = middlewares;
		this.fields = Object.values(fieldsMap).map((field) => makeField(field));
	}

	useStore<T>(key: symbol) {
		return {
			get: () => this.store.get(key) as T | undefined,
			set: (value: Readonly<T>) => this.store.set(key, value),
		};
	}

	build(middlewares: Middleware<Any, Any, Any, Any, Any>[]) {
		const resolvers: IResolvers = {};
		for (const compiler of this.fields) {
			resolvers[compiler.field] = compiler.build(middlewares);
		}
		return resolvers;
	}
}
