import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import { complexityAppPlugin } from './src/lib/complexity.ts';
import modules from './src/modules/index.ts';

const { schema } = createApplication({ modules, plugins: [complexityAppPlugin] });

const MovieQuery = graphql(`
	query MovieQuery($where: MovieWhereUniqueInput!) {
		movie(where: $where) {
			id
			title
			year
		}
	}
`);

const MovieWithReviewsQuery = graphql(`
	query MovieWithReviewsQuery($where: MovieWhereUniqueInput!) {
		movie(where: $where) {
			reviews {
				comment
			}
		}
	}
`);

const MoviesQuery = graphql(`
	query MoviesQuery {
		movies {
			id
			title
			year
		}
	}
`);

const ScreeningQuery = graphql(`
	query ScreeningQuery($id: ID!) {
		screening(id: $id) {
			id
			theater
			availableSeats
		}
	}
`);

const ScreeningsQuery = graphql(`
	query ScreeningsQuery($limit: Int) {
		screenings(limit: $limit) {
			id
			theater
		}
	}
`);

const ScreeningsFullQuery = graphql(`
	query ScreeningsFullQuery($limit: Int) {
		screenings(limit: $limit) {
			id
			theater
			availableSeats
		}
	}
`);

test.serial('simple query within limits succeeds', async (t) => {
	const result = await execute({
		schema,
		document: MovieQuery,
		variableValues: { where: { id: '1' } },
		contextValue: { appVersion: '1.0.0' },
	});

	t.falsy(result.errors);
	t.is(result.data?.movie?.id, '1');
});

test.serial('query exceeding depth limit fails', async (t) => {
	const result = await execute({
		schema,
		document: MovieWithReviewsQuery,
		variableValues: { where: { id: '1' } },
		contextValue: { appVersion: '1.0.0' },
	});

	t.truthy(result.errors);
	t.truthy(result.errors?.some((e) => e.message.includes('Depth limit')));
});

test.serial('$complexity multiplier affects calculation', async (t) => {
	const result = await execute({
		schema,
		document: MoviesQuery,
		contextValue: { appVersion: '1.0.0' },
	});

	t.falsy(result.errors);
	t.truthy(result.data?.movies);
});

test.serial('screening query with small limit succeeds', async (t) => {
	const result = await execute({
		schema,
		document: ScreeningQuery,
		variableValues: { id: 's1' },
		contextValue: { appVersion: '1.0.0' },
	});

	t.falsy(result.errors);
	t.is(result.data?.screening?.id, 's1');
	t.is(result.data?.screening?.theater, 'Theater 1');
});

test.serial('screening query with args-based complexity within limits', async (t) => {
	const result = await execute({
		schema,
		document: ScreeningsQuery,
		variableValues: { limit: 2 },
		contextValue: { appVersion: '1.0.0' },
	});

	t.falsy(result.errors);
	t.is(result.data?.screenings?.length, 2);
});

test.serial('screening query with high limit exceeds complexity', async (t) => {
	const result = await execute({
		schema,
		document: ScreeningsFullQuery,
		variableValues: { limit: 100 },
		contextValue: { appVersion: '1.0.0' },
	});

	t.truthy(result.errors);
	t.truthy(result.errors?.some((e) => e.message.includes('Complexity limit')));
});
