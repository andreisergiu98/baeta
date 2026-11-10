import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import test from '@baeta/testing';
import { type ExecutionResult, subscribe } from 'graphql';
import { graphql } from './src/__generated__/gql/index.ts';
import { authAppPlugin } from './src/lib/auth.ts';
import { complexityAppPlugin } from './src/lib/complexity.ts';
import sources from './src/modules/index.ts';

const { schema } = createApplication({ sources, plugins: [complexityAppPlugin, authAppPlugin] });

function user() {
	return { userId: '1' };
}

const MoviesAndRatingsQuery = graphql(`
	query MoviesAndRatingsQuery {
		movies {
			id
			title
		}
		ratings {
			movieId
			score
		}
	}
`);

const WideQuery = graphql(`
	query WideQuery {
		a: movies {
			id
		}
		b: movies {
			id
		}
		c: movies {
			id
		}
		d: movies {
			id
		}
	}
`);

const RenameMovieMutation = graphql(`
	mutation RenameMovieMutation($id: ID!, $title: String!) {
		renameMovie(id: $id, title: $title) {
			id
			title
		}
	}
`);

const MovieRenamedSubscription = graphql(`
	subscription MovieRenamedSubscription($id: ID!) {
		movieRenamed(id: $id) {
			id
			title
		}
	}
`);

async function subscribeOnce(contextValue: object) {
	const result = await subscribe({
		schema,
		document: MovieRenamedSubscription,
		variableValues: { id: '2' },
		contextValue,
	});
	if (!(Symbol.asyncIterator in result)) {
		return result;
	}
	const event = await result.next();
	await result.return?.();
	return event.value as ExecutionResult;
}

test('generated sources carry the custom root types', (t) => {
	t.deepEqual(sources.roots, {
		query: 'RootQuery',
		mutation: 'RootMutation',
		subscription: 'RootSubscription',
	});
	t.is(schema.getQueryType()?.name, 'RootQuery');
});

test('query fields from several modules resolve on the custom query root', async (t) => {
	const result = await execute({ schema, document: MoviesAndRatingsQuery, contextValue: user() });

	t.falsy(result.errors);
	t.is(result.data?.movies.length, 2);
	t.deepEqual(result.data?.ratings, [{ movieId: '1', score: 5 }]);
});

test('mutations resolve on the custom mutation root', async (t) => {
	const result = await execute({
		schema,
		document: RenameMovieMutation,
		variableValues: { id: '1', title: 'Tenet' },
		contextValue: user(),
	});

	t.falsy(result.errors);
	t.deepEqual(result.data?.renameMovie, { id: '1', title: 'Tenet' });
});

test('subscriptions resolve on the custom subscription root', async (t) => {
	const result = await subscribeOnce(user());

	t.falsy(result.errors);
	t.deepEqual(result.data, { movieRenamed: { id: '2', title: 'Renamed' } });
});

test('default scopes guard every custom root', async (t) => {
	const query = await execute({ schema, document: MoviesAndRatingsQuery, contextValue: {} });
	const mutation = await execute({
		schema,
		document: RenameMovieMutation,
		variableValues: { id: '1', title: 'Tenet' },
		contextValue: {},
	});
	const subscription = await subscribeOnce({});

	t.is(query.data, null);
	t.is(query.errors?.[0]?.extensions.code, 'FORBIDDEN');
	t.is(mutation.errors?.[0]?.extensions.code, 'FORBIDDEN');
	t.is(subscription.errors?.[0]?.extensions.code, 'FORBIDDEN');
});

test('complexity limits apply to the custom query root', async (t) => {
	const result = await execute({ schema, document: WideQuery, contextValue: user() });

	t.is(result.errors?.[0]?.extensions.code, 'COMPLEXITY_ERROR');
	t.true(result.errors?.[0]?.message.includes('Breadth limit'));
});
