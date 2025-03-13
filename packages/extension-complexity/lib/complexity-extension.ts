import {
	Extension,
	type ModuleBuilder,
	type NativeMiddleware,
	type ResolverMapper,
} from '@baeta/core/sdk';
import { createComplexityMiddleware } from './complexity-middleware.ts';
import { type ComplexityExtensionOptions, normalizeOptions } from './complexity-options.ts';
import { type FieldSettingsMap, registerFieldSettingsSetter } from './field-settings.ts';

export class ComplexityExtension<Ctx> extends Extension {
	private readonly options: Required<ComplexityExtensionOptions<Ctx>>;

	constructor(options: ComplexityExtensionOptions<Ctx> = {}) {
		super();
		this.options = normalizeOptions(options);
	}

	private fieldSettingsMap: FieldSettingsMap = {};

	getTypeExtensions = <Root, Context>(
		_module: ModuleBuilder,
		type: string,
	): BaetaExtensions.TypeExtensions<Root, Context> => {
		return {
			$complexity: (fn) => {
				registerFieldSettingsSetter(type, '*', fn, this.fieldSettingsMap);
			},
		};
	};

	getResolverExtensions = <Result, Root, Context, Args>(
		_module: ModuleBuilder,
		type: string,
		field: string,
	): BaetaExtensions.ResolverExtensions<Result, Root, Context, Args> => {
		return {
			$complexity: (fn) => {
				registerFieldSettingsSetter(type, field, fn, this.fieldSettingsMap);
			},
		};
	};

	getSubscriptionExtensions = <Root, Context, Args>(
		_module: ModuleBuilder,
		field: string,
	): BaetaExtensions.SubscriptionExtensions<Root, Context, Args> => {
		return {
			$complexity: (fn) => {
				registerFieldSettingsSetter('Subscription', field, fn, this.fieldSettingsMap);
			},
		};
	};

	createComplexityMiddleware<Result, Root, Context, Args>(): NativeMiddleware<
		Result,
		Root,
		Context,
		Args
	> {
		return createComplexityMiddleware<Result, Root, Context, Args>(
			this.options as Required<ComplexityExtensionOptions<Context>>,
			this.fieldSettingsMap,
		);
	}

	build = (_module: ModuleBuilder, mapper: ResolverMapper) => {
		for (const type of mapper.getTypes()) {
			if (type !== 'Query' && type !== 'Mutation' && type !== 'Subscription') {
				continue;
			}

			if (type !== 'Subscription') {
				for (const field of mapper.getTypeFields(type)) {
					mapper.prependMiddleware(type, field, this.createComplexityMiddleware());
				}
				continue;
			}

			for (const field of mapper.getTypeFields(type)) {
				mapper.prependMiddleware(type, `${field}.subscribe`, this.createComplexityMiddleware());
			}
		}
	};
}
