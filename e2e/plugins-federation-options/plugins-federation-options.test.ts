import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import modules from './src/graphql/index.ts';

const fixturePath = resolve(import.meta.dirname, '.');
const apolloDir = resolve(fixturePath, 'src/graphql/apollo');
const typesDir = resolve(fixturePath, 'src/types-gen');

const { schema } = createApplication({ modules });

const ServiceQuery = graphql(`
	query ServiceQuery {
		_service {
			sdl
		}
	}
`);

test.serial('generates federation files at custom moduleName path', (t) => {
	t.true(existsSync(resolve(apolloDir, 'index.ts')));
	t.true(existsSync(resolve(apolloDir, 'federation-sdl.ts')));
	t.true(existsSync(resolve(apolloDir, 'federation-spec.gql')));
	t.true(existsSync(resolve(apolloDir, 'federation-types.gql')));
});

test.serial('uses custom moduleDefinitionName for federation typedef', (t) => {
	t.true(existsSync(resolve(apolloDir, 'module-types.ts')));
	t.false(existsSync(resolve(apolloDir, 'typedef.ts')));
});

test.serial('seeds entity-handlers.ts as a writable starter', (t) => {
	t.true(existsSync(resolve(apolloDir, 'entity-handlers.ts')));
});

test.serial('places federation.ts in custom typesDir', (t) => {
	t.true(existsSync(resolve(typesDir, 'federation.ts')));
	t.false(existsSync(resolve(fixturePath, 'src/__generated__/federation.ts')));
});

test.serial('federation-spec.gql declares the targeted version 2.0', (t) => {
	const spec = readFileSync(resolve(apolloDir, 'federation-spec.gql'), 'utf-8');
	t.true(spec.includes('Federation Specification 2.0'));
});

test.serial("include: 'all' brings in every v2.0 directive", (t) => {
	const spec = readFileSync(resolve(apolloDir, 'federation-spec.gql'), 'utf-8');
	const expected = [
		'@key',
		'@external',
		'@requires',
		'@provides',
		'@extends',
		'@shareable',
		'@inaccessible',
		'@override',
		'@tag',
	];
	for (const directive of expected) {
		t.true(
			spec.includes(`directive ${directive}`),
			`expected federation-spec.gql to declare ${directive}`,
		);
	}
});

test.serial('resolver imports use the custom moduleDefinitionName', (t) => {
	const resolverIndex = readFileSync(resolve(apolloDir, 'index.ts'), 'utf-8');
	t.true(resolverIndex.includes('./module-types.ts'));
	t.false(resolverIndex.includes('./typedef.ts'));
});

test.serial('resolver does not import entity handlers when no entities exist', (t) => {
	const resolverIndex = readFileSync(resolve(apolloDir, 'index.ts'), 'utf-8');
	t.false(resolverIndex.includes('entity-handlers'));
});

test.serial('SDL @link uses the targeted v2.0 URL', async (t) => {
	const result = await execute({
		schema,
		document: ServiceQuery,
		contextValue: { appVersion: '1.0.0' },
	});

	t.falsy(result.errors);
	const sdl = result.data?._service.sdl ?? '';
	t.true(sdl.includes('https://specs.apollo.dev/federation/v2.0'));
	t.false(sdl.includes('https://specs.apollo.dev/federation/v2.9'));
});

test.serial(
	'SDL @link import only contains directives actually applied in the schema',
	async (t) => {
		const result = await execute({
			schema,
			document: ServiceQuery,
			contextValue: { appVersion: '1.0.0' },
		});

		t.falsy(result.errors);
		const sdl = result.data?._service.sdl ?? '';
		t.true(sdl.includes('"@shareable"'));
		t.false(sdl.includes('"@key"'));
		t.false(sdl.includes('"@inaccessible"'));
	},
);

test.serial('schema does not expose _entities when no entities are declared', (t) => {
	const queryType = schema.getQueryType();
	const fields = queryType?.getFields() ?? {};
	t.truthy(fields._service);
	t.falsy(fields._entities);
	t.falsy(schema.getType('_Entity'));
});
