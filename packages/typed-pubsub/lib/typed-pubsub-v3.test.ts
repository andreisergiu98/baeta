import testFn, { type TestFn } from 'ava';
import { PubSub } from 'graphql-subscriptions-v3';
import { TypedPubSubV3 } from './typed-pubsub.ts';

interface TestEventMap {
	'user:created': { id: string; name: string };
	'user:updated': { id: string; updates: Partial<{ id: string; name: string }> };
}

type Ctx = {
	pubsub: TypedPubSubV3<PubSub, TestEventMap>;
	originalPubsub: PubSub;
};

const test = testFn as TestFn<Ctx>;

function createAsyncCallback<T = null>() {
	let call: (value: T) => void = () => {};
	const promise = new Promise<T>((resolve) => {
		call = resolve;
	});
	return { call, promise };
}

test.beforeEach((t) => {
	const pubsub = new PubSub();
	const typedPubSub = new TypedPubSubV3<PubSub, TestEventMap>(pubsub);
	t.context = {
		pubsub: typedPubSub,
		originalPubsub: pubsub,
	};
});

test('channel prefix should work', async (t) => {
	const pubsub = new TypedPubSubV3<PubSub, TestEventMap>(t.context.originalPubsub, {
		prefix: 'test:',
	});

	const mockedUser = {
		id: '1',
		name: 'John',
	};

	const originalPubsub = t.context.originalPubsub;
	originalPubsub.publish('test:user:created', { id: '1', name: 'John' });

	const typedAsyncIterator = pubsub.asyncIterableIterator('user:created');

	const asyncIteratorPromise = typedAsyncIterator.next();

	originalPubsub.publish('test:user:created', { id: '1', name: 'John' });

	t.deepEqual((await asyncIteratorPromise).value, mockedUser);
});

test('asyncIterableIterator should create iterator for single trigger', async (t) => {
	const { pubsub } = t.context;

	const iterator = pubsub.asyncIterableIterator('user:created');
	const payload = { id: '1', name: 'John' };

	const resultPromise = iterator.next();

	pubsub.publish('user:created', payload);

	const result = await resultPromise;

	t.deepEqual(result.value, payload);
	t.false(result.done);
});

test('asyncIterableIterator should create iterator for multiple triggers', async (t) => {
	const { pubsub } = t.context;

	const iterator = pubsub.asyncIterableIterator(['user:created', 'user:updated']);
	const createdPayload = { id: '1', name: 'John' };
	const updatedPayload = { id: '1', updates: { name: 'John Doe' } };

	const createPromise = iterator.next();
	pubsub.publish('user:created', createdPayload);
	const createResult = await createPromise;

	const updatePromise = iterator.next();
	pubsub.publish('user:updated', updatedPayload);
	const updateResult = await updatePromise;

	t.deepEqual(createResult.value, createdPayload);
	t.deepEqual(updateResult.value, updatedPayload);
});
