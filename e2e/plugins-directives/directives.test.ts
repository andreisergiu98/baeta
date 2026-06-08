import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import modules from './src/modules/index.ts';

const { schema } = createApplication({ modules });

const CreateMovieMutation = graphql(`
	mutation CreateMovieMutation($input: CreateMovieInput!) {
		createMovie(input: $input) {
			id
			title
		}
	}
`);

const MovieQuery = graphql(`
	query MovieQuery($where: MovieWhereUniqueInput!) {
		movie(where: $where) {
			id
		}
	}
`);

test('@trim transforms input', async (t) => {
	const result = await execute({
		schema,
		document: CreateMovieMutation,
		variableValues: { input: { title: '  Inception  ', year: 2010, rating: 8.8 } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	t.is(result.data?.createMovie.title, 'Inception');
});

test('@validString rejects empty title', async (t) => {
	const result = await execute({
		schema,
		document: CreateMovieMutation,
		variableValues: { input: { title: '', year: 2010 } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.truthy(result.errors);
	t.truthy(result.errors?.length);
});

test('@constraints rejects too many fields in where input', async (t) => {
	const result = await execute({
		schema,
		document: MovieQuery,
		variableValues: { where: { id: '1', title: 'Inception' } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.truthy(result.errors);
	t.truthy(result.errors?.length);
});
