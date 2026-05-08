import { writeFile } from 'node:fs/promises';
import {
	type ConstValueNode,
	type DirectiveDefinitionNode,
	type DocumentNode,
	Kind,
	parse,
	type TypeNode,
} from 'graphql';
import type {
	FederationDirective,
	FederationDirectiveArg,
	FederationDirectiveScalar,
	FederationSpec,
} from '../lib/spec.ts';

const VERSIONS = ['2.0', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9'];
const SPECS_BASE_URL = 'https://raw.githubusercontent.com/apollographql/specs/main/federation';
const JSON_SCALARS = new Set(['_Any']);

function stringifyType(node: TypeNode): string {
	switch (node.kind) {
		case Kind.NAMED_TYPE:
			return node.name.value;
		case Kind.NON_NULL_TYPE:
			return `${stringifyType(node.type)}!`;
		case Kind.LIST_TYPE:
			return `[${stringifyType(node.type)}]`;
	}
}

function constValueToJS(node?: ConstValueNode): string | number | boolean | undefined {
	if (!node) return undefined;

	switch (node.kind) {
		case Kind.INT:
			return Number.parseInt(node.value, 10);
		case Kind.FLOAT:
			return Number.parseFloat(node.value);
		case Kind.STRING:
		case Kind.ENUM:
			return node.value;
		case Kind.BOOLEAN:
			return node.value;
		case Kind.NULL:
			throw new Error('Unexpected null value');
		case Kind.LIST:
			throw new Error('Unexpected list value');
		case Kind.OBJECT:
			throw new Error('Unexpected object value');
	}
}

function collectScalarNames(doc: DocumentNode): Set<string> {
	const scalars = new Set<string>();
	for (const def of doc.definitions) {
		if (def.kind === Kind.SCALAR_TYPE_DEFINITION) {
			scalars.add(def.name.value);
		}
	}
	return scalars;
}

function findDirectiveScalars(
	directive: DirectiveDefinitionNode,
	knownScalars: Set<string>,
): FederationDirectiveScalar[] {
	const found: FederationDirectiveScalar[] = [];
	const seen = new Set<string>();
	const walk = (node: TypeNode) => {
		if (node.kind === Kind.NAMED_TYPE) {
			const name = node.name.value;
			if (knownScalars.has(name) && !seen.has(name)) {
				seen.add(name);
				found.push({
					name,
					serialize: JSON_SCALARS.has(name) ? 'json' : 'string',
				});
			}
		} else {
			walk(node.type);
		}
	};
	for (const arg of directive.arguments ?? []) {
		walk(arg.type);
	}
	return found;
}

function parseDirective(
	def: DirectiveDefinitionNode,
	knownScalars: Set<string>,
): FederationDirective {
	const directive: FederationDirective = {
		name: `@${def.name.value}`,
		locations: def.locations.map((loc) => loc.value),
	};
	if (def.arguments?.length) {
		directive.args = def.arguments.map((arg): FederationDirectiveArg => {
			const result: FederationDirectiveArg = {
				name: arg.name.value,
				type: stringifyType(arg.type),
			};
			const defaultValue = constValueToJS(arg.defaultValue);
			if (defaultValue !== undefined) {
				result.defaultValue = defaultValue;
			}
			return result;
		});
	}
	if (def.repeatable) {
		directive.repeatable = true;
	}
	const scalars = findDirectiveScalars(def, knownScalars);
	if (scalars.length > 0) {
		directive.scalars = scalars;
	}
	return directive;
}

function parseSpec(version: string, sdl: string): FederationSpec {
	const doc = parse(sdl.replaceAll(';', '')); // Some spec files use semicolons which aren't valid GraphQL SDL
	const knownScalars = collectScalarNames(doc);
	const directives = doc.definitions
		.filter((def): def is DirectiveDefinitionNode => def.kind === Kind.DIRECTIVE_DEFINITION)
		.map((def) => parseDirective(def, knownScalars));
	return { version, directives };
}

async function fetchSpec(version: string): Promise<string> {
	const url = `${SPECS_BASE_URL}/v${version}/federation-v${version}.graphql`;
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`HTTP ${res.status} fetching ${url}`);
	}
	return await res.text();
}

async function fetchAllSpecs(): Promise<FederationSpec[]> {
	const specs: FederationSpec[] = [];
	for (const version of VERSIONS) {
		console.log(`Fetching federation v${version}...`);
		const sdl = await fetchSpec(version);
		const spec = parseSpec(version, sdl);
		specs.push(spec);
		console.log(`  ✓ ${spec.directives.length} directives`);
	}
	return specs;
}

function generateSpecExport(spec: FederationSpec): string {
	const varName = `federationV${spec.version.replace(/\./g, '_')}Spec`;
	return `export const ${varName} = ${JSON.stringify(spec, null, 2)} as const satisfies FederationSpec;\n`;
}

function generateSpecsArray(specs: FederationSpec[]): string {
	const entries = specs.map((s) => `  federationV${s.version.replace(/\./g, '_')}Spec`).join(',\n');
	return `export const federationSpecs = [\n${entries},\n] as const;\n`;
}

function generateFile(specs: FederationSpec[]): string {
	const header = [
		'// Auto-generated from https://github.com/apollographql/specs',
		`// Generated on ${new Date().toISOString()}`,
		'',
		"import type { FederationSpec } from './spec.ts';",
	].join('\n');

	const specExports = specs.map(generateSpecExport).join('\n');
	const arrayExport = generateSpecsArray(specs);

	return [header, specExports, arrayExport].join('\n\n');
}

const specs = await fetchAllSpecs();
const output = generateFile(specs);
const outPath = `${process.cwd()}/lib/specs.generated.ts`;

await writeFile(outPath, output, 'utf-8');
console.log(`\nWritten to ${outPath}`);
