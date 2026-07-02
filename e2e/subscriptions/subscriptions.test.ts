import { createApplication } from '@baeta/core';
import type { TypedDocumentNode } from '@baeta/e2e-shared/document-node';
import { execute } from '@baeta/e2e-shared/execute';
import test from '@baeta/testing';
import { type ExecutionResult, subscribe } from 'graphql';
import { graphql } from './src/__generated__/gql/index.ts';
import { createMoviePubSub } from './src/lib/pubsub.ts';
import modules from './src/modules/index.ts';
import type { Context } from './src/types/context.ts';

const { schema } = createApplication({ modules });

const MovieCreatedSubscription = graphql(`
	subscription MovieCreatedSubscription {
		movieCreated {
			id
			title
			year
		}
	}
`);

const MovieTitleChangedSubscription = graphql(`
	subscription MovieTitleChangedSubscription {
		movieTitleChanged
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

function createContext(overrides?: Partial<Context>): Context {
	return {
		pubsub: createMoviePubSub(),
		canSubscribe: true,
		...overrides,
	};
}

function subscribeTo<TResult>(args: {
	document: TypedDocumentNode<TResult, Record<string, never>>;
	contextValue: Context;
}): Promise<AsyncIterableIterator<ExecutionResult<TResult>> | ExecutionResult<TResult>> {
	return Promise.resolve(
		subscribe({
			schema,
			document: args.document,
			contextValue: args.contextValue,
		}),
	) as Promise<AsyncIterableIterator<ExecutionResult<TResult>> | ExecutionResult<TResult>>;
}

function isAsyncIterable<TResult>(
	result: AsyncIterableIterator<ExecutionResult<TResult>> | ExecutionResult<TResult>,
): result is AsyncIterableIterator<ExecutionResult<TResult>> {
	return Symbol.asyncIterator in result;
}

function settle() {
	return new Promise((resolve) => setImmediate(resolve));
}

test('subscription receives event published by a mutation', async (t) => {
	const ctx = createContext();
	const result = await subscribeTo({ document: MovieCreatedSubscription, contextValue: ctx });

	t.true(isAsyncIterable(result));
	if (!isAsyncIterable(result)) return;

	const eventPromise = result.next();
	await settle();

	const mutation = await execute({
		schema,
		document: CreateMovieMutation,
		variableValues: { input: { title: 'Dune', year: 2021 } },
		contextValue: ctx,
	});
	t.falsy(mutation.errors);

	const event = await eventPromise;
	t.false(event.done);
	t.falsy(event.value.errors);
	t.is(event.value.data?.movieCreated.id, '99');
	t.is(event.value.data?.movieCreated.title, 'Dune');
	t.is(event.value.data?.movieCreated.year, 2021);

	await result.return?.();
});

test('subscription delivers multiple events in order', async (t) => {
	const ctx = createContext();
	const result = await subscribeTo({ document: MovieCreatedSubscription, contextValue: ctx });

	t.true(isAsyncIterable(result));
	if (!isAsyncIterable(result)) return;

	const firstPromise = result.next();
	await settle();

	await ctx.pubsub.publish('movie-created', { id: '1', title: 'First', year: 2001 });
	await ctx.pubsub.publish('movie-created', { id: '2', title: 'Second', year: 2002 });

	const first = await firstPromise;
	const second = await result.next();

	t.is(first.value.data?.movieCreated.title, 'First');
	t.is(second.value.data?.movieCreated.title, 'Second');

	await result.return?.();
});

test('resolve step and resolve-phase middleware transform each event', async (t) => {
	const ctx = createContext();
	const result = await subscribeTo({ document: MovieTitleChangedSubscription, contextValue: ctx });

	t.true(isAsyncIterable(result));
	if (!isAsyncIterable(result)) return;

	const eventPromise = result.next();
	await settle();

	await ctx.pubsub.publish('movie-title-changed', 'inception');

	const event = await eventPromise;
	t.falsy(event.value.errors);
	t.is(event.value.data?.movieTitleChanged, 'title: INCEPTION');

	await result.return?.();
});

test('subscribe-phase middleware rejects the subscription', async (t) => {
	const ctx = createContext({ canSubscribe: false });
	const result = await subscribeTo({ document: MovieTitleChangedSubscription, contextValue: ctx });

	t.false(isAsyncIterable(result));
	if (isAsyncIterable(result)) return;

	t.truthy(result.errors);
	t.is(result.errors?.[0]?.message, 'Not allowed to subscribe!');
});

test('subscription completes after return is called', async (t) => {
	const ctx = createContext();
	const result = await subscribeTo({ document: MovieCreatedSubscription, contextValue: ctx });

	t.true(isAsyncIterable(result));
	if (!isAsyncIterable(result)) return;

	const eventPromise = result.next();
	await settle();

	await result.return?.();

	const event = await eventPromise;
	t.true(event.done);
});
