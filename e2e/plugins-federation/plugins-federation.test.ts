import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import { createRelativeExists } from '@baeta/e2e-shared/utils';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import modules from './src/modules/index.ts';

const fixturePath = resolve(import.meta.dirname, '.');
const federationDir = resolve(fixturePath, 'src/modules/baeta-federation');

const { schema } = createApplication({ modules });

const ServiceQuery = graphql(`
	query ServiceQuery {
		_service {
			sdl
		}
	}
`);

const EntitiesQuery = graphql(`
	query EntitiesQuery($representations: [_Any!]!) {
		_entities(representations: $representations) {
			__typename
			... on Movie {
				id
				title
				year
				rating
			}
			... on Review {
				id
				movieId
				score
				comment
			}
		}
	}
`);

const MovieQuery = graphql(`
	query MovieQuery($where: MovieWhereUniqueInput!) {
		movie(where: $where) {
			id
			title
		}
	}
`);

test('generates federation files at default module path', async (t) => {
	const exists = createRelativeExists(federationDir);
	const files = [
		'index.ts',
		'typedef.ts',
		'federation-sdl.ts',
		'federation-spec.gql',
		'federation-types.gql',
		'entity-handlers.ts',
	];
	const filePromises = files.map(exists);
	const results = await Promise.all(filePromises);
	for (const result of results) {
		t.true(result, 'All federation files should exist');
	}
});

test('generates federation types in default typesDir', async (t) => {
	const exists = createRelativeExists(fixturePath);
	t.true(await exists('src/__generated__/federation.ts'));
});

test('federation-spec.gql declares default directives only', async (t) => {
	const spec = await readFile(resolve(federationDir, 'federation-spec.gql'), 'utf-8');
	t.true(spec.includes('Federation Specification 2.9'));
	t.true(spec.includes('directive @key'));
	t.true(spec.includes('directive @external'));
	t.true(spec.includes('directive @requires'));
	t.true(spec.includes('directive @provides'));
	t.true(spec.includes('directive @extends'));
	t.false(spec.includes('directive @shareable'));
	t.false(spec.includes('directive @inaccessible'));
});

test('federation-types.gql declares _Entity union and _service', async (t) => {
	const types = await readFile(resolve(federationDir, 'federation-types.gql'), 'utf-8');
	t.true(types.includes('union _Entity = Movie | Review'));
	t.true(types.includes('_service: _Service!'));
	t.true(types.includes('_entities(representations: [_Any!]!): [_Entity]!'));
});

test('Query._service returns SDL with default federation @link', async (t) => {
	const result = await execute({
		schema,
		document: ServiceQuery,
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	const sdl = result.data?._service.sdl ?? '';
	t.true(sdl.includes('https://specs.apollo.dev/federation/v2.9'));
	t.true(sdl.includes('"@key"'));
	t.true(sdl.includes('type Movie'));
	t.true(sdl.includes('type Review'));
	t.false(sdl.includes('"@shareable"'));
});

test('Query._entities resolves Movie via reference handler', async (t) => {
	const result = await execute({
		schema,
		document: EntitiesQuery,
		variableValues: {
			representations: [{ __typename: 'Movie', id: '7' }],
		},
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	t.is(result.data?._entities.length, 1);
	const [entity] = result.data?._entities ?? [];
	t.is(entity?.__typename, 'Movie');
	if (entity?.__typename === 'Movie') {
		t.is(entity.id, '7');
		t.is(entity.title, 'Federated Movie 7');
		t.is(entity.year, 2010);
		t.is(entity.rating, 8.8);
	}
});

test('Query._entities resolves a mix of entity types in one call', async (t) => {
	const result = await execute({
		schema,
		document: EntitiesQuery,
		variableValues: {
			representations: [
				{ __typename: 'Movie', id: '1' },
				{ __typename: 'Review', id: 'r-42' },
			],
		},
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	t.is(result.data?._entities.length, 2);
	const [movieEntity, reviewEntity] = result.data?._entities ?? [];
	t.is(movieEntity?.__typename, 'Movie');
	t.is(reviewEntity?.__typename, 'Review');
	if (reviewEntity?.__typename === 'Review') {
		t.is(reviewEntity.id, 'r-42');
		t.is(reviewEntity.score, 5);
		t.is(reviewEntity.comment, 'Federated review r-42');
	}
});

test('regular queries still work alongside federation', async (t) => {
	const result = await execute({
		schema,
		document: MovieQuery,
		variableValues: { where: { id: '1' } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	t.is(result.data?.movie?.id, '1');
	t.is(result.data?.movie?.title, 'Inception');
});
