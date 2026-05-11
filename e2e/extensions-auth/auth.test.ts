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

test.serial('logged-in user can query movie', async (t) => {
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

test.serial('unauthenticated user is rejected by default scope', async (t) => {
	const result = await execute({
		schema,
		document: MovieQuery,
		variableValues: { where: { id: '1' } },
		contextValue: {},
	});

	t.truthy(result.errors);
	t.truthy(result.errors?.length);
});

test.serial('publicMovies is accessible without authentication (skipDefaults)', async (t) => {
	const result = await execute({
		schema,
		document: PublicMoviesQuery,
		contextValue: {},
	});

	t.falsy(result.errors);
	t.truthy(result.data?.publicMovies);
	t.is(result.data?.publicMovies?.length, 3);
});

test.serial('non-admin cannot createMovie', async (t) => {
	const result = await execute({
		schema,
		document: CreateMovieMutation,
		variableValues: { input: { title: 'New Movie', year: 2024 } },
		contextValue: { userId: '1', role: 'user' },
	});

	t.truthy(result.errors);
	t.truthy(result.errors?.length);
});

test.serial('admin can createMovie', async (t) => {
	const result = await execute({
		schema,
		document: CreateMovieMutation,
		variableValues: { input: { title: 'New Movie', year: 2024 } },
		contextValue: { userId: '1', role: 'admin' },
	});

	t.falsy(result.errors);
	t.is(result.data?.createMovie.title, 'New Movie');
});
