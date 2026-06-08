import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import { createRelativeExists } from '@baeta/e2e-shared/utils';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import modules from './src/modules/index.ts';

const { schema } = createApplication({ modules });

const MovieQuery = graphql(`
	query MovieQuery($where: MovieWhereUniqueInput!) {
		movie(where: $where) {
			id
			title
		}
	}
`);

const exists = createRelativeExists(import.meta.dirname);

test('exec plugin ran command during generation', async (t) => {
	t.true(await exists('exec-marker.txt'), 'exec-marker.txt should be created by exec plugin');
});

test('exec plugin skipped command when skip returns true', async (t) => {
	t.false(
		await exists('skipped-marker.txt'),
		'skipped-marker.txt should not exist when skip returns true',
	);
});

test('schema still works after exec plugin ran', async (t) => {
	const result = await execute({
		schema,
		document: MovieQuery,
		variableValues: { where: { id: '1' } },
		contextValue: { appVersion: '1.0.0' },
	});
	t.falsy(result.errors);
	t.is(result.data?.movie?.id, '1');
});
