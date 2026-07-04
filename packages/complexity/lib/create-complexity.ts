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
	const normalizedOptions = normalizeOptions(options as ComplexityExtensionOptions<unknown>);

	const complexity = <Result, Source, Context, Args, Info>(
		fn: GetFieldSettings<Context, Args>,
	): ComplexityPlugin<Result, Source, Context, Args, Info> => {
		return {
			[makePluginSymbol]: () => {
				return {
					id,
					state: {
						fieldSettings: fn as GetFieldSettings<unknown, unknown>,
					},
				};
			},
		};
	};

	const complexityAppPlugin: AppPlugin<ComplexityState> = {
		id,
		mutate: (compilers) => {
			const fieldSettingsMap: FieldSettingsMap = new Map();

			for (const typeCompiler of iterateTypes(compilers)) {
				const typeState = typeCompiler.usePluginState(id).get();

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
							? fieldCompiler.usePluginState(id).get()
							: fieldCompiler.useSubscribePluginState(id).get();
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
			);

			for (const typeCompiler of iterateTypes(compilers)) {
				if (!['Query', 'Mutation', 'Subscription'].includes(typeCompiler.type)) {
					continue;
				}
				for (const fieldCompiler of typeCompiler.fields) {
					if (fieldCompiler.kind === 'Field') {
						fieldCompiler.addTopLevelMiddleware(middleware);
					} else {
						fieldCompiler.addTopLevelSubscribeMiddleware(middleware);
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
