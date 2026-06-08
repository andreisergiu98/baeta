import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import { exists, createRelativeExists } from '@baeta/e2e-shared/utils';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import modules from './src/graphql/index.ts';

const apolloDir = resolve(import.meta.dirname, 'src/graphql/apollo');
const typesDir = resolve(import.meta.dirname, 'src/types-gen');

const { schema } = createApplication({ modules });

const ServiceQuery = graphql(`
	query ServiceQuery {
		_service {
			sdl
		}
	}
`);

test('generates federation files at custom moduleName path', async (t) => {
	const exists = createRelativeExists(apolloDir);
	const files = ['index.ts', 'federation-sdl.ts', 'federation-spec.gql', 'federation-types.gql'];
	const filesPromises = files.map(exists);
	const results = await Promise.all(filesPromises);
	results.forEach((result, index) => {
		t.true(result, `${files[index]} should be generated in ${apolloDir}`);
	});
});

test('uses custom moduleDefinitionName for federation typedef', async (t) => {
	const exists = createRelativeExists(apolloDir);
	t.true(await exists('module-types.ts'));
	t.false(await exists('typedef.ts'));
});

test('seeds entity-handlers.ts as a writable starter', async (t) => {
	const exists = createRelativeExists(apolloDir);
	t.true(await exists('entity-handlers.ts'));
});

test('places federation.ts in custom typesDir', async (t) => {
	t.true(await exists(resolve(typesDir, 'federation.ts')));
	t.false(await exists(resolve(import.meta.dirname, 'src/__generated__/federation.ts')));
});

test('federation-spec.gql declares the targeted version 2.0', async (t) => {
	const spec = await readFile(resolve(apolloDir, 'federation-spec.gql'), 'utf-8');
	t.true(spec.includes('Federation Specification 2.0'));
});

test("include: 'all' brings in every v2.0 directive", async (t) => {
	const spec = await readFile(resolve(apolloDir, 'federation-spec.gql'), 'utf-8');
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

test('resolver imports use the custom moduleDefinitionName', async (t) => {
	const resolverIndex = await readFile(resolve(apolloDir, 'index.ts'), 'utf-8');
	t.true(resolverIndex.includes('./module-types.ts'));
	t.false(resolverIndex.includes('./typedef.ts'));
});

test('resolver does not import entity handlers when no entities exist', async (t) => {
	const resolverIndex = await readFile(resolve(apolloDir, 'index.ts'), 'utf-8');
	t.false(resolverIndex.includes('entity-handlers'));
});

test('SDL @link uses the targeted v2.0 URL', async (t) => {
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

test('SDL @link import only contains directives actually applied in the schema', async (t) => {
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
});

test('schema does not expose _entities when no entities are declared', (t) => {
	const queryType = schema.getQueryType();
	const fields = queryType?.getFields() ?? {};
	t.truthy(fields._service);
	t.falsy(fields._entities);
	t.falsy(schema.getType('_Entity'));
});
