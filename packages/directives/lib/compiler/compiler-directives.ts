import { getDirectives } from '@graphql-tools/utils';
import type {
	GraphQLSchema,
	GraphQLArgument,
	GraphQLInputField,
	GraphQLInputObjectType,
} from 'graphql';
import type { InputDirective, InputDirectiveTarget } from '../directive.ts';
import {
	createValidationDirectiveName,
	type Position,
	type ValidationDirectiveName,
} from './compiler-types.ts';

export type AppliedDirective = InputDirective & {
	config: Record<string, unknown>;
	listDepth: number;
};

export function assertTarget(
	directives: AppliedDirective[],
	target: InputDirectiveTarget,
	position: Position,
) {
	for (const directive of directives) {
		if (directive.target === target) {
			continue;
		}
		let expected: string;
		switch (directive.target) {
			case 'scalar':
				expected = 'a scalar or enum';
				break;
			case 'object':
				expected = 'an input object';
				break;
			case 'list':
				expected = `a list at depth ${directive.listDepth}`;
				break;
			default:
				throw new Error(`Unknown directive target: ${directive.target satisfies never}`);
		}
		throw new Error(
			`Input directive @${directive.name} on ${position.coordinate} validates ${expected}, but ${position.coordinate} is ${position.type.toString()}.`,
		);
	}
}

export function getValidationDirectivesFromNode(
	schema: GraphQLSchema,
	registry: ReadonlyMap<ValidationDirectiveName, InputDirective>,
	node: GraphQLArgument | GraphQLInputField | GraphQLInputObjectType,
) {
	const directives: AppliedDirective[] = [];
	for (const annotation of getDirectives(schema, node)) {
		const directive = registry.get(createValidationDirectiveName(annotation.name));
		if (directive == null) continue;
		const config = annotation.args ?? {};
		directives.push({ ...directive, config, listDepth: directive.getListDepth?.(config) ?? 0 });
	}
	return directives;
}
