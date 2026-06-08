import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import { createRelativeExists } from '@baeta/e2e-shared/utils';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import modules from './src/graphql/index.ts';

const { schema } = createApplication({ modules });

const MovieQuery = graphql(`
	query MovieQuery($where: MovieWhereUniqueInput!) {
		movie(where: $where) {
			id
			title
			year
		}
	}
`);

const exists = createRelativeExists(import.meta.dirname);

test('module definition uses custom name (module-types.ts)', async (t) => {
	t.true(await exists('src/graphql/movie/module-types.ts'));
});

test('types generated in custom directory (src/custom-types)', async (t) => {
	t.true(await exists('src/custom-types/types.ts'));
	t.true(await exists('src/custom-types/utility.ts'));
});

test('modules index generated in custom modulesDir (src/graphql)', async (t) => {
	t.true(await exists('src/graphql/index.ts'));
});

test('query execution works with custom paths', async (t) => {
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
