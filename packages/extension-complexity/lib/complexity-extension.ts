import {
	Extension,
	type ModuleBuilder,
	type NativeMiddleware,
	type ResolverMapper,
} from '@baeta/core/sdk';
import { ValidationError } from '@baeta/errors';
import {
	type FieldNode,
	type FragmentDefinitionNode,
	type GraphQLError,
	type GraphQLField,
	type GraphQLNamedType,
	type GraphQLResolveInfo,
	type InlineFragmentNode,
	Kind,
	type SelectionNode,
	type SelectionSetNode,
	getArgumentValues,
	getNamedType,
	isInterfaceType,
	isObjectType,
	isOutputType,
} from 'graphql';
import { isListOrNullableList } from '../utils/graphlq.ts';
import { capitalize } from '../utils/string.ts';
import { loadComplexityStore } from './store-loader.ts';
import { getComplexityStore } from './store.ts';

export interface ComplexityLimit {
	depth?: number;
	breadth?: number;
	complexity?: number;
}

type ComplexityResults = {
	depth: number;
	breadth: number;
	complexity: number;
};

const defaultLimits = {
	depth: 10,
	breadth: 50,
	complexity: 1000,
};

export type FieldComplexity = {
	complexity?: number;
	multiplier?: number;
};

export type FieldComplexityFnParams<Root, Context, Args> = {
	args: Args;
	ctx: Context;
};

export type GetComplexity<Root, Context, Args> = (
	params: FieldComplexityFnParams<Root, Context, Args>,
) => FieldComplexity | false;

export type GetComplexityLimit<Context> =
	| ComplexityLimit
	| ((ctx: Context) => ComplexityLimit | Promise<ComplexityLimit>);

export interface ComplexityExtensionOptions<Context> {
	limit?: GetComplexityLimit<Context>;
	defaultComplexity?: number;
	defaultListMultiplier?: number;
	complexityError?: GraphQLError;
}

function normalizeOptions<Context>(options: ComplexityExtensionOptions<Context>) {
	return {
		limit: options.limit ?? defaultLimits,
		defaultComplexity: options.defaultComplexity ?? 1,
		defaultListMultiplier: options.defaultListMultiplier ?? 10,
		complexityError: options.complexityError ?? new ValidationError('Query is too complex'),
	};
}

export class ComplexityExtension<Ctx> extends Extension {
	private readonly options: Required<ComplexityExtensionOptions<Ctx>>;

	constructor(options: ComplexityExtensionOptions<Ctx>) {
		super();
		this.options = normalizeOptions(options);
	}

	private customComplexityMap: Record<
		string,
		// biome-ignore lint/suspicious/noExplicitAny: We need to allow any here to support the dynamic field complexity registration
		Record<string, GetComplexity<any, any, any> | undefined> | undefined
	> = {};

	getTypeExtensions = <Root, Context>(
		module: ModuleBuilder,
		type: string,
	): BaetaExtensions.TypeExtensions<Root, Context> => {
		return {
			$complexity: (fn) => {
				this.registerFieldComplexityFn(type, '*', fn);
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
				this.registerFieldComplexityFn(type, field, fn);
			},
		};
	};

	getSubscriptionExtensions = <Root, Context, Args>(
		_module: ModuleBuilder,
		field: string,
	): BaetaExtensions.SubscriptionExtensions<Root, Context, Args> => {
		return {
			$complexity: (fn) => {
				this.registerFieldComplexityFn('Subscription', field, fn);
			},
		};
	};

	registerFieldComplexityFn<Root, Context, Args>(
		type: string,
		field: string,
		fn: GetComplexity<Root, Context, Args>,
	) {
		this.customComplexityMap[type] ??= {};
		this.customComplexityMap[type][field] = fn;
	}

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
				return this.calculateComplexity(ctx as unknown as Ctx, info);
			});

			if (results.depth > limits.depth) {
				throw this.options.complexityError;
			}

			if (results.breadth > limits.breadth) {
				throw this.options.complexityError;
			}

			if (results.complexity > limits.complexity) {
				throw this.options.complexityError;
			}

			return next(root, args, ctx, info);
		};
	}

	calculateComplexity(ctx: Ctx, info: GraphQLResolveInfo) {
		const operationName = capitalize(info.operation.operation);
		const operationType = info.schema.getType(operationName);

		if (!operationType || !isOutputType(operationType)) {
			throw new ValidationError(`Unsupported operation ${operationName}`);
		}

		return this.complexityFromSelectionSet(ctx, info, operationType, info.operation.selectionSet);
	}

	complexityFromSelectionSet(
		ctx: Ctx,
		info: GraphQLResolveInfo,
		type: GraphQLNamedType,
		selectionSet: SelectionSetNode,
	) {
		const result: ComplexityResults = {
			depth: 0,
			breadth: 0,
			complexity: 0,
		};

		for (const selection of selectionSet.selections) {
			const selectionResult = this.complexityFromSelection(ctx, info, type, selection);

			result.complexity += selectionResult.complexity;
			result.breadth += selectionResult.breadth;
			result.depth = Math.max(result.depth, selectionResult.depth);
		}

		return result;
	}

	complexityFromSelection(
		ctx: Ctx,
		info: GraphQLResolveInfo,
		type: GraphQLNamedType,
		selection: SelectionNode,
	) {
		if (selection.kind === Kind.FIELD) {
			return this.complexityFromField(ctx, info, type, selection);
		}

		if (selection.kind === Kind.FRAGMENT_SPREAD) {
			const fragment = info.fragments[selection.name.value];

			if (!fragment) {
				throw new ValidationError(`Fragment ${selection.name.value} not found`);
			}

			return this.complexityFromFragment(ctx, info, type, fragment);
		}

		return this.complexityFromFragment(ctx, info, type, selection);
	}

	complexityFromFragment(
		ctx: Ctx,
		info: GraphQLResolveInfo,
		type: GraphQLNamedType,
		fragment: FragmentDefinitionNode | InlineFragmentNode,
	) {
		const fragmentType = fragment.typeCondition
			? info.schema.getType(fragment.typeCondition.name.value)
			: type;

		if (!isOutputType(fragmentType)) {
			throw new ValidationError(`Unsupported fragment type ${fragmentType}`);
		}

		if (!fragmentType) {
			throw new ValidationError(`Fragment type ${fragmentType} not found`);
		}

		return this.complexityFromSelectionSet(ctx, info, fragmentType, fragment.selectionSet);
	}

	complexityFromField(
		ctx: Ctx,
		info: GraphQLResolveInfo,
		type: GraphQLNamedType,
		selection: FieldNode,
	) {
		const fieldName = selection.name.value;

		const field =
			isObjectType(type) || isInterfaceType(type) ? type.getFields()[fieldName] : undefined;

		if (!field && !fieldName.startsWith('__')) {
			throw new ValidationError(`Field ${fieldName} not found on type ${type.name}`);
		}

		if (!field) {
			return {
				depth: 0,
				breadth: 0,
				complexity: 0,
			};
		}

		const fieldComplexitySettings = this.getFieldComplexitySettings(
			ctx,
			info,
			type,
			field,
			selection,
			fieldName,
		);

		if (fieldComplexitySettings === false) {
			return {
				depth: 0,
				breadth: 0,
				complexity: 0,
			};
		}

		let depth = 1;
		let breadth = 1;
		let complexity = 0;

		const listMultiplier = fieldComplexitySettings.multiplier ?? this.options.defaultListMultiplier;
		const multiplier = field && isListOrNullableList(field.type) ? listMultiplier : 1;

		complexity +=
			(fieldComplexitySettings.complexity ?? this.options.defaultComplexity) * multiplier;

		if (!field || !selection.selectionSet) {
			return {
				depth,
				breadth,
				complexity,
			};
		}

		const subSelection = this.complexityFromSelectionSet(
			ctx,
			info,
			getNamedType(field.type),
			selection.selectionSet,
		);

		depth += subSelection.depth;
		breadth += subSelection.breadth;
		complexity += subSelection.complexity * Math.max(multiplier, 1);

		return {
			depth,
			breadth,
			complexity,
		};
	}

	getFieldComplexitySettings<Root, Context, Args>(
		ctx: Context,
		info: GraphQLResolveInfo,
		type: GraphQLNamedType,
		field: GraphQLField<unknown, unknown>,
		selection: FieldNode,
		fieldName: string,
	) {
		const args = getArgumentValues(field, selection, info.variableValues);

		const customComplexity = this.customComplexityMap[type.name]?.[fieldName];
		if (customComplexity) {
			return customComplexity({ args, ctx });
		}

		const wildCardComplexity = this.customComplexityMap[type.name]?.['*'];
		if (wildCardComplexity) {
			return wildCardComplexity({ args, ctx });
		}

		return {
			complexity: this.options.defaultComplexity,
			multiplier: this.options.defaultListMultiplier,
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
