import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import modules from './src/modules/index.ts';

const fixturePath = resolve(import.meta.dirname, '.');

const { schema } = createApplication({ modules });

const MovieQuery = graphql(`
	query MovieQuery($where: MovieWhereUniqueInput!) {
		movie(where: $where) {
			id
			title
		}
	}
`);

test.serial('exec plugin ran command during generation', (t) => {
	t.true(
		existsSync(resolve(fixturePath, 'exec-marker.txt')),
		'exec-marker.txt should be created by exec plugin',
	);
});

test.serial('exec plugin skipped command when skip returns true', (t) => {
	t.false(
		existsSync(resolve(fixturePath, 'skipped-marker.txt')),
		'skipped-marker.txt should not exist when skip returns true',
	);
});

test.serial('schema still works after exec plugin ran', async (t) => {
	const result = await execute({
		schema,
		document: MovieQuery,
		variableValues: { where: { id: '1' } },
		contextValue: { appVersion: '1.0.0' },
	});

	t.falsy(result.errors);
	t.is(result.data?.movie?.id, '1');
});
