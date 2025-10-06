import {
	Extension,
	type FieldBuilder,
	type ModuleCompiler,
	type SubscriptionBuilder,
	type TypeBuilder,
} from '@baeta/core/sdk';
import { createComplexityMiddleware } from './complexity-middleware.ts';
import { type ComplexityExtensionOptions, normalizeOptions } from './complexity-options.ts';
import {
	type FieldSettingsMap,
	type GetFieldSettings,
	registerFieldSettingsSetter,
} from './field-settings.ts';

interface ComplexityState {
	fieldSettings: GetFieldSettings<any, any>;
}

declare global {
	export namespace BaetaExtensions {
		export interface Extensions {
			complexityExtension: ComplexityExtension<unknown>;
		}
	}
}

export class ComplexityExtension<Ctx> extends Extension<ComplexityState> {
	readonly stateKey = Symbol('complexity-settings');
	private readonly options: Required<ComplexityExtensionOptions<unknown>>;

	constructor(options: ComplexityExtensionOptions<Ctx> = {}) {
		super();
		this.options = normalizeOptions(options);
	}

	getTypeExtensions = <Source, Context, Info>(
		builder: TypeBuilder<Source, Context, Info>,
	): BaetaExtensions.TypeExtensions<Source, Context, Info, TypeBuilder<Source, Context, Info>> => {
		return {
			$complexity: (fn) => {
				const editable = builder.edit();
				this.setState(editable, {
					fieldSettings: fn,
				});
				return editable.commitToMethods();
			},
		};
	};

	getFieldExtensions = <Result, Source, Context, Args, Info>(
		builder: FieldBuilder<Result, Source, Context, Args, Info>,
	): BaetaExtensions.FieldExtensions<
		Result,
		Source,
		Context,
		Args,
		Info,
		FieldBuilder<Result, Source, Context, Args, Info>
	> => {
		return {
			$complexity: (fn) => {
				const editable = builder.edit();
				this.setState(editable, {
					fieldSettings: fn,
				});
				return editable.commitToMethods();
			},
		};
	};

	getSubscriptionExtensions = <Result, Source, Context, Args, Info>(
		builder: SubscriptionBuilder<Result, Source, Context, Args, Info>,
	): BaetaExtensions.SubscriptionExtensions<
		Result,
		Source,
		Context,
		Args,
		Info,
		SubscriptionBuilder<Result, Source, Context, Args, Info>
	> => {
		return {
			$complexity: (fn) => {
				const editable = builder.edit();
				this.setState(editable, {
					fieldSettings: fn,
				});
				return editable.commitToMethods();
			},
		};
	};

	mutate(compilers: ModuleCompiler[]): void {
		const fieldSettingsMap: FieldSettingsMap = {};

		for (const compiler of compilers) {
			for (const typeCompiler of compiler.types) {
				const state = this.getState(typeCompiler);
				if (!state) continue;
				registerFieldSettingsSetter(typeCompiler.type, '*', state.fieldSettings, fieldSettingsMap);
				for (const fieldCompiler of typeCompiler.fields) {
					const state = this.getState(fieldCompiler);
					if (!state) continue;
					registerFieldSettingsSetter(
						typeCompiler.type,
						fieldCompiler.field,
						state.fieldSettings,
						fieldSettingsMap,
					);
				}
			}
		}

		const middleware = createComplexityMiddleware<unknown, unknown, unknown, unknown, unknown>(
			this.options,
			fieldSettingsMap,
		);

		for (const compiler of compilers) {
			for (const typeCompiler of compiler.types) {
				if (!['Query', 'Mutation', 'Subscription'].includes(typeCompiler.type)) {
					continue;
				}
				for (const fieldCompiler of typeCompiler.fields) {
					fieldCompiler.initialMiddlewares.push(middleware);
				}
			}
		}
	}
}
