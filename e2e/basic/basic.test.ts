import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import modules from './src/modules/index.ts';

const { schema } = createApplication({ modules });

const MovieQuery = graphql(`
	query MovieQuery($where: MovieWhereUniqueInput!) {
		movie(where: $where) {
			id
			title
			year
			rating
		}
	}
`);

const MoviesQuery = graphql(`
	query MoviesQuery {
		movies {
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
			year
		}
	}
`);

const MovieWithReviewsQuery = graphql(`
	query MovieWithReviewsQuery($where: MovieWhereUniqueInput!) {
		movie(where: $where) {
			id
			reviews {
				id
				movieId
				score
				comment
			}
		}
	}
`);

const MovieByIdQuery = graphql(`
	query MovieByIdQuery($where: MovieWhereUniqueInput!) {
		movie(where: $where) {
			id
		}
	}
`);

test('Query.movie returns a movie', async (t) => {
	const result = await execute({
		schema,
		document: MovieQuery,
		variableValues: { where: { id: '1' } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	t.is(result.data?.movie?.id, '1');
	t.is(result.data?.movie?.title, 'Inception');
	t.is(result.data?.movie?.year, 2010);
	t.is(result.data?.movie?.rating, 8.8);
});

test('Query.movies returns a list', async (t) => {
	const result = await execute({
		schema,
		document: MoviesQuery,
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	t.is(result.data?.movies?.length, 3);
});

test('Mutation.createMovie creates a movie', async (t) => {
	const result = await execute({
		schema,
		document: CreateMovieMutation,
		variableValues: { input: { title: 'New Movie', year: 2024 } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	t.is(result.data?.createMovie.title, 'New Movie');
	t.is(result.data?.createMovie.year, 2024);
});

test('Movie.reviews resolves cross-module relationship', async (t) => {
	const result = await execute({
		schema,
		document: MovieWithReviewsQuery,
		variableValues: { where: { id: '1' } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	t.is(result.data?.movie?.reviews?.length, 2);
	for (const review of result.data?.movie?.reviews ?? []) {
		t.is(review.movieId, '1');
		t.truthy(review.comment);
	}
});

test('$use middleware runs on resolvers', async (t) => {
	const result = await execute({
		schema,
		document: MovieByIdQuery,
		variableValues: { where: { id: '42' } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	t.is(result.data?.movie?.id, '42');
});
