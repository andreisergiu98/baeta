import type { Resolver, ResolverParams } from '../lib/resolver.ts';
import { nameFunction } from '../utils/functions.ts';
import { BuilderEditor, type BuilderContext } from './builder-context.ts';
import { FieldCompiler } from './field-compiler.ts';
import type { Field, FieldMethods } from './field-methods.ts';
import {
	chainKeyResolver,
	chainMapResolver,
	chainToResolver,
	chainUndefinedAsNullResolver,
	chainWithDefaultResolver,
} from './resolver-chain.ts';
import { makeSymbol } from './symbols.ts';

export interface FieldBuilderOptions<Result, Source, Context, Args, Info> {
	type: string;
	field: string;
	context: BuilderContext<Result, Source, Context, Args, Info>;
}

export class FieldBuilder<Result, Source, Context, Args, Info> {
	readonly #type: string;
	readonly #field: string;
	readonly #context: BuilderContext<Result, Source, Context, Args, Info>;

	constructor(options: FieldBuilderOptions<Result, Source, Context, Args, Info>) {
		this.#type = options.type;
		this.#field = options.field;
		this.#context = options.context;
	}

	get type() {
		return this.#type;
	}

	get field() {
		return this.#field;
	}

	edit() {
		return new BuilderEditor<
			Result,
			Source,
			Context,
			Args,
			Info,
			FieldMethods<Result, Source, Context, Args, Info>,
			FieldBuilder<Result, Source, Context, Args, Info>
		>(this.#context, (nextContext) => {
			return new FieldBuilder({
				type: this.#type,
				field: this.#field,
				context: nextContext,
			});
		});
	}

	toMethods(): FieldMethods<Result, Source, Context, Args, Info> {
		const make = <T>(resolver: Resolver<T, Source, Context, Args, Info>) => {
			return createFieldWithMake({
				type: this.#type,
				field: this.#field,
				context: this.#context,
				resolver,
			});
		};
		return {
			$use: (input) => {
				return this.edit()
					.use(input, `${this.#type}.${this.#field}.use`, {
						kind: 'field',
						type: this.#type,
						field: this.#field,
					})
					.commitToMethods();
			},
			key: <K extends keyof Source>(key: K) => {
				const resolver = (params: ResolverParams<Source, Context, Args, Info>) => {
					return params.source[key];
				};
				return make(resolver);
			},
			map: (resolver) => {
				nameFunction(resolver, `${this.#type}.${this.#field}.map`);
				return make(resolver);
			},
			resolve: (resolver) => {
				nameFunction(resolver, `${this.#type}.${this.#field}.resolve`);
				return make(resolver);
			},
		};
	}
}

interface FieldWithMakeOptions<Expected, Result, Source, Context, Args, Info> {
	type: string;
	field: string;
	context: BuilderContext<Expected, Source, Context, Args, Info>;
	resolver: Resolver<Result, Source, Context, Args, Info>;
}

function createFieldWithMake<Expected, Result, Source, Context, Args, Info>(
	options: FieldWithMakeOptions<Expected, Result, Source, Context, Args, Info>,
): Field<Expected, Result, Source, Context, Args, Info> {
	const prefix = `${options.type}.${options.field}`;
	const make = <R>(resolver: Resolver<R, Source, Context, Args, Info>) => {
		return createFieldWithMake<Expected, R, Source, Context, Args, Info>({
			type: options.type,
			field: options.field,
			context: options.context,
			resolver,
		});
	};
	return {
		map: (fn) => make(chainMapResolver(`${prefix}.map`, options.resolver, fn)),
		resolve: (fn) => make(chainMapResolver(`${prefix}.resolve`, options.resolver, fn)),
		key: (key) => make(chainKeyResolver(options.resolver, key)),
		to: (fn) => make(chainToResolver(`${prefix}.to`, options.resolver, fn)),
		withDefault: (value) => make(chainWithDefaultResolver(options.resolver, value)),
		undefinedAsNull: () => make(chainUndefinedAsNullResolver(options.resolver)),
		[makeSymbol]: () =>
			new FieldCompiler<Expected, Source, Context, Args, Info>({
				type: options.type,
				field: options.field,
				context: options.context,
				resolver: options.resolver as unknown as Resolver<Expected, Source, Context, Args, Info>,
			}),
	};
}
