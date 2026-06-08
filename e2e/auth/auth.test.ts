import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import { authAppPlugin } from './src/lib/auth.ts';
import modules from './src/modules/index.ts';

const { schema } = createApplication({ modules, plugins: [authAppPlugin] });

const MovieQuery = graphql(`
	query MovieQuery($where: MovieWhereUniqueInput!) {
		movie(where: $where) {
			id
			title
			year
		}
	}
`);

const PublicMoviesQuery = graphql(`
	query PublicMoviesQuery {
		publicMovies {
			id
			title
		}
	}
`);

const CreateMovieMutation = graphql(`
	mutation CreateMovieMutation($input: CreateMovieInput!) {
		createMovie(input: $input) {
			id
			title
		}
	}
`);

const MovieWithReviewsQuery = graphql(`
	query MovieWithReviewsQuery($where: MovieWhereUniqueInput!) {
		movie(where: $where) {
			id
			reviews {
				id
				score
				comment
			}
		}
	}
`);

const PublicMoviesWithReviewsQuery = graphql(`
	query PublicMoviesWithReviewsQuery {
		publicMovies {
			id
			reviews {
				id
			}
		}
	}
`);

const ReviewsAfterCreate = graphql(`
	mutation ReviewsAfterCreate($input: CreateMovieInput!) {
		createMovie(input: $input) {
			id
			reviews {
				id
			}
		}
	}
`);

test('logged-in user can query movie', async (t) => {
	const result = await execute({
		schema,
		document: MovieQuery,
		variableValues: { where: { id: '1' } },
		contextValue: { userId: '1', role: 'user' },
	});
	t.falsy(result.errors);
	t.is(result.data?.movie?.id, '1');
	t.is(result.data?.movie?.title, 'Inception');
});

test('unauthenticated user is rejected by default scope', async (t) => {
	const result = await execute({
		schema,
		document: MovieQuery,
		variableValues: { where: { id: '1' } },
		contextValue: {},
	});
	t.truthy(result.errors);
	t.truthy(result.errors?.length);
});

test('publicMovies is accessible without authentication (skipDefaults)', async (t) => {
	const result = await execute({
		schema,
		document: PublicMoviesQuery,
		contextValue: {},
	});
	t.falsy(result.errors);
	t.truthy(result.data?.publicMovies);
	t.is(result.data?.publicMovies?.length, 3);
});

test('non-admin cannot createMovie', async (t) => {
	const result = await execute({
		schema,
		document: CreateMovieMutation,
		variableValues: { input: { title: 'New Movie', year: 2024 } },
		contextValue: { userId: '1', role: 'user' },
	});
	t.truthy(result.errors);
	t.truthy(result.errors?.length);
});

test('admin can createMovie', async (t) => {
	const result = await execute({
		schema,
		document: CreateMovieMutation,
		variableValues: { input: { title: 'New Movie', year: 2024 } },
		contextValue: { userId: '1', role: 'admin' },
	});
	t.falsy(result.errors);
	t.is(result.data?.createMovie.title, 'New Movie');
});

test('reviews are readable on a movie granted readReviews', async (t) => {
	const result = await execute({
		schema,
		document: MovieWithReviewsQuery,
		variableValues: { where: { id: '1' } },
		contextValue: { userId: '1', role: 'user' },
	});
	t.falsy(result.errors);
	t.is(result.data?.movie?.id, '1');
	t.is(result.data?.movie?.reviews?.length, 2);
	t.is(result.data?.movie?.reviews?.[0]?.id, 'r1');
});

test('reviews are gated when the parent resolver does not grant', async (t) => {
	// publicMovies does not call `grants: ['readReviews']`, so the nested
	// Movie.reviews resolver must reject access via scope.$granted.
	const result = await execute({
		schema,
		document: PublicMoviesWithReviewsQuery,
		contextValue: { userId: '1', role: 'user' },
	});
	t.truthy(result.errors);
	t.truthy(result.errors?.length);
});

test('reviews are gated after a Mutation that does not grant', async (t) => {
	// Mutation.createMovie omits `grants`, so the returned Movie should
	// not carry the readReviews grant — even for an admin.
	const result = await execute({
		schema,
		document: ReviewsAfterCreate,
		variableValues: { input: { title: 'X', year: 2024 } },
		contextValue: { userId: '1', role: 'admin' },
	});
	t.truthy(result.errors);
});
