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

type ComplexityPlugin<Result, Source, Context, Args, Info> = FieldUsePlugin<
	Result,
	Source,
	Context,
	Args,
	Info
> &
	TypeUsePlugin<Source, Context, Info> &
	SubscriptionUsePlugin<Result, Source, Context, Args, Info, 'subscribe'>;

interface ComplexityState {
	fieldSettings: GetFieldSettings<unknown, unknown>;
}

export function createComplexity<Context>(options: ComplexityExtensionOptions<Context>) {
	const id = createAppPluginId('Baeta Complexity');
	const stateKey = Symbol('complexity-settings');
	const normalizedOptions = normalizeOptions(options as ComplexityExtensionOptions<unknown>);

	const complexity = <Result, Source, Context, Args, Info>(
		fn: GetFieldSettings<Context, Args>,
	): ComplexityPlugin<Result, Source, Context, Args, Info> => {
		return {
			[makePluginSymbol]: () => {
				const meta = new Map<symbol, ComplexityState>([
					[
						stateKey,
						{
							fieldSettings: fn as GetFieldSettings<unknown, unknown>,
						},
					],
				]);
				return {
					id,
					meta,
				};
			},
		};
	};

	const complexityAppPlugin: AppPlugin = {
		id,
		name: 'Baeta Complexity',
		mutate: (compilers) => {
			const fieldSettingsMap: FieldSettingsMap = new Map();

			for (const typeCompiler of iterateTypes(compilers)) {
				const typeState = typeCompiler.useMetadata<ComplexityState>(stateKey).get();

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
							? fieldCompiler.useMetadata<ComplexityState>(stateKey).get()
							: fieldCompiler.useSubscribeMetadata<ComplexityState>(stateKey).get();
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
