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

	getFieldExtensions<Result, Source, Context, Args, Info>(
		_builder: FieldBuilder<Result, Source, Context, Args, Info>,
	) {
		return {};
	}

	getTypeExtensions<Source, Context, Info>(_builder: TypeBuilder<Source, Context, Info>) {
		return {};
	}

	getModuleExtensions<Context, Info>(_builder: ModuleBuilder<Context, Info>) {
		return {};
	}

	getSubscriptionExtensions<Result, Source, Context, Args, Info>(
		_builder: SubscriptionBuilder<Result, Source, Context, Args, Info>,
	) {
		return {};
	}

	getState(builder: EditableBuilderLike) {
		return builder.useStore<Settings>(this.stateKey).get();
	}

	setState(builder: EditableBuilderLike, settings: Settings) {
		builder.useStore<Settings>(this.stateKey).set(settings);
	}

	mutate(_compilers: ModuleCompiler[]) {}
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
