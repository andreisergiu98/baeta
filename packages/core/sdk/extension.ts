import type { GraphQLSchema } from 'graphql';
import type { FieldBuilder } from './field-builder.ts';
import type { ModuleBuilder } from './module-builder.ts';
import type { ModuleCompiler } from './module-compiler.ts';
import type { SubscriptionBuilder } from './subscription-builder.ts';
import type { TypeBuilder } from './type-builder.ts';

export type ExtensionFactory<E extends Extension> = () => E;

interface EditableBuilderLike {
	useStore: <T>(key: symbol) => {
		get: () => T | undefined;
		set: (value: Readonly<T>) => void;
	};
}

export abstract class Extension<Settings = unknown> {
	abstract readonly stateKey: symbol;

	protected schema: GraphQLSchema | null = null;

	setSchema(schema: GraphQLSchema) {
		if (this.schema != null) {
			throw new Error(`Schema already set for extension ${this.constructor.name}`);
		}
		this.schema = schema;
	}

	getSchema() {
		if (this.schema == null) {
			throw new Error(
				`getSchema must be called after the schema is built for extension ${this.constructor.name}`,
			);
		}
		return this.schema;
	}

	getFieldExtensions<
		Result,
		Source,
		Context,
		Args,
		Info,
		ModuleName extends string,
		TypeName extends string,
		FieldName extends string,
	>(_builder: FieldBuilder<Result, Source, Context, Args, Info, ModuleName, TypeName, FieldName>) {
		// To be implemented by the extension if required.
		return {};
	}

	getTypeExtensions<Source, Context, Info, ModuleName extends string, TypeName extends string>(
		_builder: TypeBuilder<Source, Context, Info, ModuleName, TypeName>,
	) {
		// To be implemented by the extension if required.
		return {};
	}

	getModuleExtensions<Context, Info, ModuleName extends string>(
		_builder: ModuleBuilder<Context, Info, ModuleName>,
	) {
		// To be implemented by the extension if required.
		return {};
	}

	getSubscriptionExtensions<
		Result,
		Source,
		Context,
		Args,
		Info,
		ModuleName extends string,
		FieldName extends string,
	>(_builder: SubscriptionBuilder<Result, Source, Context, Args, Info, ModuleName, FieldName>) {
		// To be implemented by the extension if required.
		return {};
	}

	getState(builder: EditableBuilderLike) {
		return builder.useStore<Settings>(this.stateKey).get();
	}

	setState(builder: EditableBuilderLike, settings: Settings) {
		builder.useStore<Settings>(this.stateKey).set(settings);
	}

	mutate(_compilers: ModuleCompiler[]) {
		// To be implemented by the extension if required.
	}
}

export function mergeExtensions<T, K extends Record<string, unknown>>(
	items: Readonly<T[]>,
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
