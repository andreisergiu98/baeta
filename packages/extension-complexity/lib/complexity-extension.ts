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
	fieldSettings: GetFieldSettings<unknown, unknown>;
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
		this.options = normalizeOptions(options as ComplexityExtensionOptions<unknown>);
	}

	getTypeExtensions<Source, Context, Info, ModuleName extends string, TypeName extends string>(
		builder: TypeBuilder<Source, Context, Info, ModuleName, TypeName>,
	): BaetaExtensions.TypeExtensions<Source, Context, Info, ModuleName, TypeName> {
		return {
			$complexity: (fn) => {
				const editable = builder.edit();
				this.setState(editable, {
					fieldSettings: fn as GetFieldSettings<unknown, unknown>,
				});
				return editable.commitToMethods();
			},
		};
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
	>(
		builder: FieldBuilder<Result, Source, Context, Args, Info, ModuleName, TypeName, FieldName>,
	): BaetaExtensions.FieldExtensions<
		Result,
		Source,
		Context,
		Args,
		Info,
		ModuleName,
		TypeName,
		FieldName
	> {
		return {
			$complexity: (fn) => {
				const editable = builder.edit();
				this.setState(editable, {
					fieldSettings: fn as GetFieldSettings<unknown, unknown>,
				});
				return editable.commitToMethods();
			},
		};
	}

	getSubscriptionExtensions<
		Result,
		Source,
		Context,
		Args,
		Info,
		ModuleName extends string,
		FieldName extends string,
	>(
		builder: SubscriptionBuilder<Result, Source, Context, Args, Info, ModuleName, FieldName>,
	): BaetaExtensions.SubscriptionExtensions<
		Result,
		Source,
		Context,
		Args,
		Info,
		ModuleName,
		FieldName
	> {
		return {
			$complexity: (fn) => {
				const editable = builder.edit();
				this.setState(editable, {
					fieldSettings: fn as GetFieldSettings<unknown, unknown>,
				});
				return editable.commitToMethods();
			},
		};
	}

	mutate(compilers: ModuleCompiler[]): void {
		const fieldSettingsMap: FieldSettingsMap = new Map();

		for (const typeCompiler of this.iterateTypes(compilers)) {
			const typeState = this.getState(typeCompiler);

			if (typeState) {
				registerFieldSettingsSetter(
					typeCompiler.type,
					'*',
					typeState.fieldSettings,
					fieldSettingsMap,
				);
			}

			for (const fieldCompiler of typeCompiler.fields) {
				const fieldState = this.getState(fieldCompiler);
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
			this.options,
			fieldSettingsMap,
		);

		for (const typeCompiler of this.iterateTypes(compilers)) {
			if (!['Query', 'Mutation', 'Subscription'].includes(typeCompiler.type)) {
				continue;
			}
			for (const fieldCompiler of typeCompiler.fields) {
				fieldCompiler.addInitialMiddleware(middleware);
			}
		}
	}

	protected *iterateTypes(compilers: ModuleCompiler[]) {
		for (const compiler of compilers) {
			for (const typeCompiler of compiler.types) {
				yield typeCompiler;
			}
		}
	}
}
