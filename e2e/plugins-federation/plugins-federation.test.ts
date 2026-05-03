import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
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

test.serial('generates federation files at default module path', (t) => {
	t.true(existsSync(resolve(federationDir, 'index.ts')));
	t.true(existsSync(resolve(federationDir, 'typedef.ts')));
	t.true(existsSync(resolve(federationDir, 'federation-sdl.ts')));
	t.true(existsSync(resolve(federationDir, 'federation-spec.gql')));
	t.true(existsSync(resolve(federationDir, 'federation-types.gql')));
	t.true(existsSync(resolve(federationDir, 'entity-handlers.ts')));
});

test.serial('generates federation types in default typesDir', (t) => {
	t.true(existsSync(resolve(fixturePath, 'src/__generated__/federation.ts')));
});

test.serial('federation-spec.gql declares default directives only', (t) => {
	const spec = readFileSync(resolve(federationDir, 'federation-spec.gql'), 'utf-8');
	t.true(spec.includes('Federation Specification 2.9'));
	t.true(spec.includes('directive @key'));
	t.true(spec.includes('directive @external'));
	t.true(spec.includes('directive @requires'));
	t.true(spec.includes('directive @provides'));
	t.true(spec.includes('directive @extends'));
	t.false(spec.includes('directive @shareable'));
	t.false(spec.includes('directive @inaccessible'));
});

test.serial('federation-types.gql declares _Entity union and _service', (t) => {
	const types = readFileSync(resolve(federationDir, 'federation-types.gql'), 'utf-8');
	t.true(types.includes('union _Entity = Movie | Review'));
	t.true(types.includes('_service: _Service!'));
	t.true(types.includes('_entities(representations: [_Any!]!): [_Entity]!'));
});

test.serial('Query._service returns SDL with default federation @link', async (t) => {
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

test.serial('Query._entities resolves Movie via reference handler', async (t) => {
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

test.serial('Query._entities resolves a mix of entity types in one call', async (t) => {
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

test.serial('regular queries still work alongside federation', async (t) => {
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
