import {
	getNamedType,
	type GraphQLInputField,
	type GraphQLInputObjectType,
	type GraphQLInputType,
	type GraphQLObjectType,
	type GraphQLSchema,
	isInputObjectType,
	isIntrospectionType,
	isListType,
	isNonNullType,
	isObjectType,
} from 'graphql';
import type { InputDirective } from '../directive.ts';
import {
	atKey,
	createArgumentsCheck,
	eachItem,
	runAll,
	runDirectives,
	withDirectives,
} from './compiler-checks.ts';
import {
	type AppliedDirective,
	assertTarget,
	getValidationDirectivesFromNode,
} from './compiler-directives.ts';
import {
	type ArgumentsCheck,
	type Check,
	createArgumentCoordinate,
	createInputFieldCoordinate,
	createInputTypeCoordinate,
	createValidationCoordinate,
	type Position,
	type ValidationCoordinate,
	type ValidationDirectiveName,
} from './compiler-types.ts';

type InputTypeChecks = ReadonlyMap<GraphQLInputObjectType, Check[]>;

/**
 * Compiles a check for every object field with arguments that use input directives, keyed by
 * `Type.field`. Throws when a directive is used where its target can never apply.
 */
export function compileArgumentChecks(
	schema: GraphQLSchema,
	registry: ReadonlyMap<ValidationDirectiveName, InputDirective>,
) {
	const inputTypes: GraphQLInputObjectType[] = [];
	const objectTypes: GraphQLObjectType[] = [];
	for (const type of Object.values(schema.getTypeMap())) {
		if (isIntrospectionType(type)) {
			continue;
		}
		if (isInputObjectType(type)) {
			inputTypes.push(type);
		} else if (isObjectType(type)) {
			objectTypes.push(type);
		}
	}

	const inputTypeChecks = new Map<GraphQLInputObjectType, Check[]>();
	for (const inputType of findValidatedInputTypes(schema, registry, inputTypes)) {
		inputTypeChecks.set(inputType, []);
	}

	for (const [type, checks] of inputTypeChecks) {
		const typeDirectives = getValidationDirectivesFromNode(schema, registry, type);
		const typeCoordinate = createInputTypeCoordinate(type.name);
		assertTarget(typeDirectives, 'object', { type, coordinate: typeCoordinate });

		if (typeDirectives.length > 0) {
			checks.push((value, path, env) => {
				runDirectives(typeDirectives, value, type, path, env);
			});
		}

		for (const field of Object.values(type.getFields())) {
			const fieldCheck = compileType(
				inputTypeChecks,
				field.type,
				getValidationDirectivesFromNode(schema, registry, field),
				0,
				{
					coordinate: createInputFieldCoordinate(type.name, field.name),
					type: field.type,
				},
			);
			if (fieldCheck) {
				checks.push(atKey(field.name, fieldCheck));
			}
		}
	}

	const argumentsChecks = new Map<ValidationCoordinate, ArgumentsCheck>();
	for (const type of objectTypes) {
		for (const field of Object.values(type.getFields())) {
			const checks: Check[] = [];
			for (const argument of field.args) {
				const argumentCheck = compileType(
					inputTypeChecks,
					argument.type,
					getValidationDirectivesFromNode(schema, registry, argument),
					0,
					{
						coordinate: createArgumentCoordinate(type.name, field.name, argument.name),
						type: argument.type,
					},
				);
				if (argumentCheck) {
					checks.push(atKey(argument.name, argumentCheck));
				}
			}
			if (checks.length > 0) {
				argumentsChecks.set(
					createValidationCoordinate(type.name, field.name),
					createArgumentsCheck(runAll(checks)),
				);
			}
		}
	}

	return argumentsChecks;
}

function compileType(
	inputTypeChecks: InputTypeChecks,
	type: GraphQLInputType,
	directives: AppliedDirective[],
	listDepth: number,
	position: Position,
): Check | null {
	if (isNonNullType(type)) {
		return compileType(inputTypeChecks, type.ofType, directives, listDepth, position);
	}

	if (isListType(type)) {
		const listDirectives: AppliedDirective[] = [];
		const itemDirectives: AppliedDirective[] = [];
		for (const directive of directives) {
			if (directive.target === 'list' && directive.listDepth === listDepth) {
				listDirectives.push(directive);
			} else {
				itemDirectives.push(directive);
			}
		}
		const itemCheck = compileType(
			inputTypeChecks,
			type.ofType,
			itemDirectives,
			listDepth + 1,
			position,
		);
		return withDirectives(listDirectives, type, itemCheck && eachItem(itemCheck));
	}

	if (isInputObjectType(type)) {
		assertTarget(directives, 'object', position);
		const checks = inputTypeChecks.get(type);
		return withDirectives(directives, type, checks ? runAll(checks) : null);
	}

	assertTarget(directives, 'scalar', position);
	return withDirectives(directives, type, null);
}

function findValidatedInputTypes(
	schema: GraphQLSchema,
	registry: ReadonlyMap<ValidationDirectiveName, InputDirective>,
	inputTypes: GraphQLInputObjectType[],
) {
	const validated = new Set<GraphQLInputObjectType>();
	const unvalidated = new Set<GraphQLInputObjectType>();

	const hasDirectives = (node: GraphQLInputField | GraphQLInputObjectType) => {
		return getValidationDirectivesFromNode(schema, registry, node).length > 0;
	};

	const reachesDirectives = (
		type: GraphQLInputObjectType,
		visited: Set<GraphQLInputObjectType>,
	): boolean => {
		if (validated.has(type)) {
			return true;
		}
		if (unvalidated.has(type) || visited.has(type)) {
			return false;
		}
		visited.add(type);
		if (hasDirectives(type)) {
			return true;
		}
		for (const field of Object.values(type.getFields())) {
			if (hasDirectives(field)) {
				return true;
			}
			const fieldType = getNamedType(field.type);
			if (isInputObjectType(fieldType) && reachesDirectives(fieldType, visited)) {
				return true;
			}
		}
		return false;
	};

	for (const type of inputTypes) {
		const visited = new Set<GraphQLInputObjectType>();
		if (reachesDirectives(type, visited)) {
			validated.add(type);
		} else {
			for (const visitedType of visited) {
				unvalidated.add(visitedType);
			}
		}
	}

	return validated;
}
