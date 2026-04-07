import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import modules from './src/graphql/index.ts';

const fixturePath = resolve(import.meta.dirname, '.');

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

test.serial('module definition uses custom name (module-types.ts)', (t) => {
	t.true(existsSync(resolve(fixturePath, 'src/graphql/movie/module-types.ts')));
});

test.serial('types generated in custom directory (src/custom-types)', (t) => {
	t.true(existsSync(resolve(fixturePath, 'src/custom-types/types.ts')));
	t.true(existsSync(resolve(fixturePath, 'src/custom-types/utility.ts')));
});

test.serial('modules index generated in custom modulesDir (src/graphql)', (t) => {
	t.true(existsSync(resolve(fixturePath, 'src/graphql/index.ts')));
});

test.serial('query execution works with custom paths', async (t) => {
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
