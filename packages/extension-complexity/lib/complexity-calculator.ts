/**
 * Originally based on plugin-complexity of Pothos
 * Source: https://github.com/hayes/pothos/blob/main/packages/plugin-complexity/src/calculate-complexity.ts
 * Copyright (c) 2021 Michael Hayes
 * Adapted by Baeta developers
 */
import {
	type FieldNode,
	type FragmentDefinitionNode,
	type GraphQLNamedType,
	type GraphQLResolveInfo,
	getNamedType,
	type InlineFragmentNode,
	isInterfaceType,
	isObjectType,
	isOutputType,
	Kind,
	type SelectionNode,
	type SelectionSetNode,
} from 'graphql';
import { isListOrNullableList } from '../utils/graphlq.ts';
import { capitalize } from '../utils/string.ts';
import { ComplexityError } from './complexity-errors.ts';
import { type FieldSettingsMap, getFieldComplexitySettings } from './field-settings.ts';

interface ComplexityDefaults {
	complexity: number;
	multiplier: number;
}

export function calculateComplexity<Context>(
	ctx: Context,
	info: GraphQLResolveInfo,
	fieldSettingsMap: FieldSettingsMap,
	defaults: ComplexityDefaults,
) {
	const operationName = capitalize(info.operation.operation);
	const operationType = info.schema.getType(operationName);

	if (!operationType || !isOutputType(operationType)) {
		throw new ComplexityError(`Unsupported operation ${operationName}`);
	}

	return complexityFromSelectionSet(
		ctx,
		info,
		operationType,
		info.operation.selectionSet,
		fieldSettingsMap,
		defaults,
	);
}

function complexityFromSelectionSet<Context>(
	ctx: Context,
	info: GraphQLResolveInfo,
	type: GraphQLNamedType,
	selectionSet: SelectionSetNode,
	fieldSettingsMap: FieldSettingsMap,
	defaults: ComplexityDefaults,
) {
	const result = {
		depth: 0,
		breadth: 0,
		complexity: 0,
	};

	for (const selection of selectionSet.selections) {
		const selectionResult = complexityFromSelection(
			ctx,
			info,
			type,
			selection,
			fieldSettingsMap,
			defaults,
		);
		result.complexity += selectionResult.complexity;
		result.breadth += selectionResult.breadth;
		result.depth = Math.max(result.depth, selectionResult.depth);
	}

	return result;
}

function complexityFromSelection<Context>(
	ctx: Context,
	info: GraphQLResolveInfo,
	type: GraphQLNamedType,
	selection: SelectionNode,
	fieldSettingsMap: FieldSettingsMap,
	defaults: ComplexityDefaults,
) {
	if (selection.kind === Kind.FIELD) {
		return complexityFromField(ctx, info, type, selection, fieldSettingsMap, defaults);
	}

	if (selection.kind === Kind.FRAGMENT_SPREAD) {
		const fragment = info.fragments[selection.name.value];

		if (!fragment) {
			throw new ComplexityError(`Fragment ${selection.name.value} not found`);
		}

		return complexityFromFragment(ctx, info, type, fragment, fieldSettingsMap, defaults);
	}

	return complexityFromFragment(ctx, info, type, selection, fieldSettingsMap, defaults);
}

function complexityFromFragment<Context>(
	ctx: Context,
	info: GraphQLResolveInfo,
	type: GraphQLNamedType,
	fragment: FragmentDefinitionNode | InlineFragmentNode,
	fieldSettingsMap: FieldSettingsMap,
	defaults: ComplexityDefaults,
) {
	const fragmentType = fragment.typeCondition
		? info.schema.getType(fragment.typeCondition.name.value)
		: type;

	if (!isOutputType(fragmentType)) {
		throw new ComplexityError(`Unsupported fragment type ${fragmentType}`);
	}

	if (!fragmentType) {
		throw new ComplexityError(`Fragment type ${fragmentType} not found`);
	}

	return complexityFromSelectionSet(
		ctx,
		info,
		fragmentType,
		fragment.selectionSet,
		fieldSettingsMap,
		defaults,
	);
}

function complexityFromField<Context>(
	ctx: Context,
	info: GraphQLResolveInfo,
	type: GraphQLNamedType,
	selection: FieldNode,
	fieldSettingsMap: FieldSettingsMap,
	defaults: ComplexityDefaults,
) {
	const fieldName = selection.name.value;

	const field =
		isObjectType(type) || isInterfaceType(type) ? type.getFields()[fieldName] : undefined;

	if (!field && !fieldName.startsWith('__')) {
		throw new ComplexityError(`Field ${fieldName} not found on type ${type.name}`);
	}

	if (!field) {
		return {
			depth: 1,
			breadth: 1,
			complexity: 1,
		};
	}

	const fieldComplexitySettings = getFieldComplexitySettings(
		ctx,
		info,
		type,
		field,
		selection,
		fieldName,
		fieldSettingsMap,
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

	const listMultiplier = fieldComplexitySettings?.multiplier ?? defaults.multiplier;
	const multiplier = field && isListOrNullableList(field.type) ? listMultiplier : 1;

	complexity += (fieldComplexitySettings?.complexity ?? defaults.complexity) * multiplier;

	if (!field || !selection.selectionSet) {
		return {
			depth,
			breadth,
			complexity,
		};
	}

	const subSelection = complexityFromSelectionSet(
		ctx,
		info,
		getNamedType(field.type),
		selection.selectionSet,
		fieldSettingsMap,
		defaults,
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
