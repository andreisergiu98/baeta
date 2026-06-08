import { resolve } from 'node:path';
import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import { createRelativeExists } from '@baeta/e2e-shared/utils';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import modules from './src/modules/index.ts';

const fixturePath = resolve(import.meta.dirname, '.');

const { schema } = createApplication({ modules });

const MoviesConnectionQuery = graphql(`
	query MoviesConnectionQuery($page: MoviePage!) {
		moviesConnection(page: $page) {
			pageInfo {
				hasNextPage
				hasPreviousPage
			}
			edges {
				cursor
				node {
					id
					title
					year
				}
			}
		}
	}
`);

const exists = createRelativeExists(import.meta.dirname);

test('pagination module is generated', async (t) => {
	t.true(await exists('src/modules/baeta-pagination/connections.gql'));
	t.true(await exists('src/modules/baeta-pagination/index.ts'));
});

test('first page returns correct results', async (t) => {
	const result = await execute({
		schema,
		document: MoviesConnectionQuery,
		variableValues: { page: { limit: 3 } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	const connection = result.data?.moviesConnection;
	t.truthy(connection);
	t.is(connection?.edges?.length, 3);
	t.is(connection?.edges?.[0]?.node?.id, '0');
	t.is(connection?.edges?.[0]?.cursor, '0');
	t.is(connection?.pageInfo.hasPreviousPage, false);
	t.is(connection?.pageInfo.hasNextPage, true);
});

test('pagination with cursor returns next page', async (t) => {
	const result = await execute({
		schema,
		document: MoviesConnectionQuery,
		variableValues: { page: { cursor: '2', limit: 3 } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	const connection = result.data?.moviesConnection;
	t.truthy(connection);
	t.is(connection?.edges?.[0]?.node?.id, '3');
	t.is(connection?.pageInfo.hasPreviousPage, true);
	t.is(connection?.pageInfo.hasNextPage, true);
});

test('last page has hasNextPage false', async (t) => {
	const result = await execute({
		schema,
		document: MoviesConnectionQuery,
		variableValues: { page: { cursor: '7', limit: 5 } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	const connection = result.data?.moviesConnection;
	t.truthy(connection);
	t.is(connection?.pageInfo.hasNextPage, false);
	t.is(connection?.pageInfo.hasPreviousPage, true);
});
