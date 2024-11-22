import {
	Extension,
	type ModuleBuilder,
	type NativeMiddleware,
	type ResolverMapper,
} from '@baeta/core/sdk';
import { calculateComplexity } from './complexity-calculator.ts';
import { ComplexityErrorKind } from './complexity-errors.ts';
import {
	type ComplexityExtensionOptions,
	defaultLimits,
	normalizeOptions,
} from './complexity-options.ts';
import { type FieldSettingsMap, registerFieldSettingsSetter } from './field-settings.ts';
import { loadComplexityStore } from './store-loader.ts';
import { getComplexityStore } from './store.ts';

export class ComplexityExtension<Ctx> extends Extension {
	private readonly options: Required<ComplexityExtensionOptions<Ctx>>;

	constructor(options: ComplexityExtensionOptions<Ctx>) {
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
		return (next) => async (root, args, ctx, info) => {
			loadComplexityStore(ctx as unknown as Ctx, this.options.limit, defaultLimits);

			const store = await getComplexityStore(ctx);

			const limits = store.limits;

			const results = store.cacheComplexity(() => {
				return calculateComplexity(ctx as unknown as Ctx, info, this.fieldSettingsMap, {
					complexity: this.options.defaultComplexity,
					multiplier: this.options.defaultListMultiplier,
				});
			});

			if (results.depth > limits.depth) {
				throw this.options.complexityError(ComplexityErrorKind.Depth, limits.depth, results.depth);
			}

			if (results.breadth > limits.breadth) {
				throw this.options.complexityError(
					ComplexityErrorKind.Breadth,
					limits.breadth,
					results.breadth,
				);
			}

			if (results.complexity > limits.complexity) {
				throw this.options.complexityError(
					ComplexityErrorKind.Complexity,
					limits.complexity,
					results.complexity,
				);
			}

			return next(root, args, ctx, info);
		};
	}

	build = (_module: ModuleBuilder, mapper: ResolverMapper) => {
		for (const type of mapper.getTypes()) {
			if (type !== 'Query' && type !== 'Mutation' && type !== 'Subscription') {
				continue;
			}

			if (type !== 'Subscription') {
				for (const field of mapper.getTypeFields(type)) {
					mapper.addMiddleware(type, field, this.createComplexityMiddleware());
				}
				continue;
			}

			for (const field of mapper.getTypeFields(type)) {
				mapper.addMiddleware(type, `${field}.subscribe`, this.createComplexityMiddleware());
			}
		}
	};
}
