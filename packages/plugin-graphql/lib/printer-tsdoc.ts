import {
	type ConstDirectiveNode,
	type EnumTypeDefinitionNode,
	type FieldDefinitionNode,
	type InputValueDefinitionNode,
	Kind,
	print,
	type ScalarTypeDefinitionNode,
	type StringValueNode,
} from 'graphql';
import { findDirective } from './printer-utils.ts';

export function withTsdoc(tsdoc: string | null, code: string) {
	return tsdoc == null ? code : `${tsdoc}\n${code}`;
}

export function printTypeTsdoc(type: { readonly description?: StringValueNode }) {
	return printTsdoc([type.description?.value]);
}

export function printFieldTsdoc(
	config: { deprecatedTsdoc: boolean },
	field: FieldDefinitionNode | InputValueDefinitionNode,
) {
	const deprecation = getDeprecation(field);
	const tags: string[] = [];
	if (field.kind === Kind.INPUT_VALUE_DEFINITION && field.defaultValue != null) {
		tags.push(`@defaultValue \`${print(field.defaultValue)}\``);
	}
	if (deprecation != null && config.deprecatedTsdoc) {
		tags.push(deprecation.reason == null ? '@deprecated' : `@deprecated ${deprecation.reason}`);
	}
	return printTsdoc([
		field.description?.value,
		deprecation != null && !config.deprecatedTsdoc ? printDeprecatedNote(deprecation) : undefined,
		tags.join('\n'),
	]);
}

export function printEnumTsdoc(type: EnumTypeDefinitionNode) {
	const values = (type.values ?? []).flatMap((value) => {
		const deprecation = getDeprecation(value);
		const notes = [
			value.description?.value,
			deprecation == null ? undefined : printDeprecatedNote(deprecation),
		].filter((note) => note != null);
		if (notes.length === 0) {
			return [];
		}
		return [`- \`${value.name.value}\`: ${notes.join(' ').replaceAll('\n', '\n  ')}`];
	});
	return printTsdoc([type.description?.value, values.join('\n')]);
}

export function printScalarTsdoc(scalar: ScalarTypeDefinitionNode) {
	const specifiedBy = findDirective(scalar, 'specifiedBy');
	const url = specifiedBy && getStringArgument(specifiedBy, 'url');
	return printTsdoc([scalar.description?.value, url == null ? undefined : `@see ${url}`]);
}

function printTsdoc(sections: Array<string | undefined>) {
	const content = sections.filter((section) => section != null && section !== '').join('\n\n');
	if (content === '') {
		return null;
	}
	const lines = content.replaceAll('*/', '*\\/').split('\n');
	if (lines.length === 1) {
		return `/** ${lines[0]} */`;
	}
	return ['/**', ...lines.map((line) => (line === '' ? ' *' : ` * ${line}`)), ' */'].join('\n');
}

function getDeprecation(node: { readonly directives?: readonly ConstDirectiveNode[] }) {
	const directive = findDirective(node, 'deprecated');
	return directive == null ? undefined : { reason: getStringArgument(directive, 'reason') };
}

function printDeprecatedNote(deprecation: { reason: string | undefined }) {
	return deprecation.reason == null ? '**Deprecated.**' : `**Deprecated:** ${deprecation.reason}`;
}

function getStringArgument(directive: ConstDirectiveNode, name: string) {
	const value = directive.arguments?.find((arg) => arg.name.value === name)?.value;
	return value?.kind === Kind.STRING ? value.value : undefined;
}
