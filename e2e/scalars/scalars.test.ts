import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import modules from './src/modules/index.ts';

const { schema } = createApplication({ modules });

const MovieWithDateQuery = graphql(`
	query MovieWithDateQuery($where: MovieWhereUniqueInput!) {
		movie(where: $where) {
			id
			title
			createdAt
		}
	}
`);

test('DateTime scalar serializes correctly', async (t) => {
	const result = await execute({
		schema,
		document: MovieWithDateQuery,
		variableValues: { where: { id: '1' } },
		contextValue: { appVersion: '1.0.0' },
	});

	t.falsy(result.errors);
	t.is(result.data?.movie?.id, '1');
	t.is(result.data?.movie?.title, 'Inception');
	t.truthy(result.data?.movie?.createdAt);
	t.true(result.data?.movie?.createdAt instanceof Date);
	t.is((result.data?.movie?.createdAt as Date).getFullYear(), 2010);
});
