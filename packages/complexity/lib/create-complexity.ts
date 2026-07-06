import {
	createAppPluginId,
	type ModuleCompiler,
	type AppPlugin,
	type FieldUsePlugin,
	type SubscriptionUsePlugin,
	type TypeUsePlugin,
	makePluginSymbol,
} from '@baeta/core/sdk';
import { createComplexityMiddleware } from './complexity-middleware.ts';
import { normalizeOptions, type ComplexityExtensionOptions } from './complexity-options.ts';
import { createComplexityStore } from './complexity-store.ts';
import {
	registerFieldSettingsSetter,
	type FieldSettingsMap,
	type GetFieldSettings,
} from './field-settings.ts';

interface ComplexityState {
	fieldSettings: GetFieldSettings<unknown, unknown>;
}

type ComplexityPlugin<Result, Source, Context, Args, Info> = FieldUsePlugin<
	Result,
	Source,
	Context,
	Args,
	Info,
	ComplexityState
> &
	TypeUsePlugin<Source, Context, Info, ComplexityState> &
	SubscriptionUsePlugin<Result, Source, Context, Args, Info, 'subscribe', ComplexityState>;

export function createComplexity<Context>(options: ComplexityExtensionOptions<Context>) {
	const id = createAppPluginId<ComplexityState>('@baeta/complexity');
	const cacheStore = createComplexityStore<unknown>();
	const normalizedOptions = normalizeOptions(options as ComplexityExtensionOptions<unknown>);

	const complexity = <Result, Source, Context, Args, Info>(
		fn: GetFieldSettings<Context, Args>,
	): ComplexityPlugin<Result, Source, Context, Args, Info> => {
		return {
			[makePluginSymbol]: {
				id,
				make: (session, metadata) => {
					if (session.hasPluginState(id)) {
						const field = metadata.kind !== 'type' ? metadata.field : undefined;
						const name = [metadata.type, field].filter((el) => el).join('.');
						throw new Error(`Complexity limits are already registered for "${name}".`);
					}
					session.setPluginState(id, {
						fieldSettings: fn as GetFieldSettings<unknown, unknown>,
					});
				},
			},
		};
	};

	const complexityAppPlugin: AppPlugin<ComplexityState> = {
		id,
		mutate: (compilers) => {
			const fieldSettingsMap: FieldSettingsMap = new Map();

			for (const typeCompiler of iterateTypes(compilers)) {
				const typeState = typeCompiler.getPluginState(id);

				if (typeState) {
					registerFieldSettingsSetter(
						typeCompiler.type,
						'*',
						typeState.fieldSettings,
						fieldSettingsMap,
					);
				}

				for (const fieldCompiler of typeCompiler.fields) {
					const fieldState =
						fieldCompiler.kind === 'Field'
							? fieldCompiler.getPluginState(id)
							: fieldCompiler.subscribe.getPluginState(id);
					if (!fieldState) continue;
					registerFieldSettingsSetter(
						typeCompiler.type,
						fieldCompiler.field,
						fieldState.fieldSettings,
						fieldSettingsMap,
					);
				}
			}

			const middleware = createComplexityMiddleware<any, unknown, unknown, unknown, unknown>(
				normalizedOptions,
				fieldSettingsMap,
				cacheStore,
			);

			for (const typeCompiler of iterateTypes(compilers)) {
				if (!['Query', 'Mutation', 'Subscription'].includes(typeCompiler.type)) {
					continue;
				}
				for (const fieldCompiler of typeCompiler.fields) {
					if (fieldCompiler.kind === 'Field') {
						fieldCompiler.addTopLevelMiddleware(middleware);
					} else {
						fieldCompiler.subscribe.addTopLevelMiddleware(middleware);
					}
				}
			}
		},
	};

	return {
		complexity,
		complexityAppPlugin,
	};
}

function* iterateTypes(compilers: ModuleCompiler[]) {
	for (const compiler of compilers) {
		for (const typeCompiler of compiler.types) {
			yield typeCompiler;
		}
	}
}
