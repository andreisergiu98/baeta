import { createApplication } from '@baeta/core';
import { inputValidationAppPlugin } from '@baeta/directives';
import { execute } from '@baeta/e2e-shared/execute';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import modules from './src/modules/index.ts';

const { schema } = createApplication({ modules, plugins: [inputValidationAppPlugin] });

const CreateMovieMutation = graphql(`
	mutation CreateMovieMutation($input: CreateMovieInput!) {
		createMovie(input: $input) {
			id
			title
			slug
			genre
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

test('generated directives module requires inputValidationAppPlugin', (t) => {
	t.throws(() => createApplication({ modules }), {
		message: /Modules are using the plugin @baeta\/directives/,
	});
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

test('@validInt accepts year within range', async (t) => {
	const result = await execute({
		schema,
		document: CreateMovieMutation,
		variableValues: { input: { title: 'Inception', year: 2010 } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	t.is(result.data?.createMovie.title, 'Inception');
});

test('@validInt rejects year below min', async (t) => {
	const result = await execute({
		schema,
		document: CreateMovieMutation,
		variableValues: { input: { title: 'Inception', year: 1700 } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.truthy(result.errors);
	t.truthy(result.errors?.length);
});

test('@validInt rejects year above max', async (t) => {
	const result = await execute({
		schema,
		document: CreateMovieMutation,
		variableValues: { input: { title: 'Inception', year: 3000 } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.truthy(result.errors);
	t.truthy(result.errors?.length);
});

test('@validFloat accepts rating within range', async (t) => {
	const result = await execute({
		schema,
		document: CreateMovieMutation,
		variableValues: { input: { title: 'Inception', year: 2010, rating: 8.8 } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
});

test('@validFloat rejects rating above max', async (t) => {
	const result = await execute({
		schema,
		document: CreateMovieMutation,
		variableValues: { input: { title: 'Inception', year: 2010, rating: 10.5 } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.truthy(result.errors);
	t.truthy(result.errors?.length);
});
