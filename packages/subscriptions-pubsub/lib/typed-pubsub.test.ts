import testFn, { type TestFn } from 'ava';
import { PubSub as PubSubV2 } from 'graphql-subscriptions-v2';
import { PubSub as PubSubV3 } from 'graphql-subscriptions-v3';
import { type TypedPubSub, createTypedPubSub } from './typed-pubsub.ts';

interface TestEventMap {
	'user:created': { id: string; name: string };
	'user:updated': { id: string; updates: Partial<{ id: string; name: string }> };
}

type Ctx = {
	pubsub: TypedPubSub<PubSubV2, TestEventMap>;
	originalPubsub: PubSubV2;
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
	const pubsub = new PubSubV2();
	const typedPubSub = createTypedPubSub<PubSubV2, TestEventMap>(pubsub);
	t.context = {
		pubsub: typedPubSub,
		originalPubsub: pubsub,
	};
});

test('publish and subscribe should work', async (t) => {
	const pubsub = t.context.pubsub;

	const payload = { id: '1', name: 'John' };
	const cb = createAsyncCallback<typeof payload>();

	await pubsub.subscribe('user:created', (message) => {
		cb.call(message);
	});

	pubsub.publish('user:created', payload);

	const publishedPayload = await cb.promise;

	t.deepEqual(publishedPayload, payload);
});

test('subscribe should handle multiple subscribers', async (t) => {
	const { pubsub } = t.context;

	const payload = { id: '1', name: 'John' };

	const cb1 = createAsyncCallback<typeof payload>();
	const cb2 = createAsyncCallback<typeof payload>();

	await pubsub.subscribe('user:created', (message) => {
		cb1.call(message);
	});

	await pubsub.subscribe('user:created', (message) => {
		cb2.call(message);
	});

	pubsub.publish('user:created', payload);

	const received = await Promise.all([cb1.promise, cb2.promise]);

	t.is(received.length, 2);
	t.deepEqual(received, [payload, payload]);
});

test('unsubscribe should stop receiving messages after unsubscribe', async (t) => {
	const { pubsub } = t.context;

	let receivedCount = 0;

	const subId = await pubsub.subscribe('user:created', () => {
		receivedCount++;
	});

	await pubsub.publish('user:created', { id: '1', name: 'John' });
	await pubsub.publish('user:created', { id: '1', name: 'John' });

	pubsub.unsubscribe(subId);

	for (let i = 3; i < 10; i++) {
		await pubsub.publish('user:created', { id: i.toString(), name: 'John' });
	}

	t.is(receivedCount, 2);
});

test('channel prefix should work', async (t) => {
	const pubsub = createTypedPubSub<PubSubV2, TestEventMap>(t.context.originalPubsub, {
		prefix: 'test:',
	});

	const mockedUser = {
		id: '1',
		name: 'John',
	};

	const originalPubsub = t.context.originalPubsub;

	const typedPublish = createAsyncCallback<{
		id: string;
		name: string;
	}>();

	const typedSubscribe = createAsyncCallback<{
		id: string;
		name: string;
	}>();

	originalPubsub.subscribe('test:user:created', () => {
		typedPublish.call(mockedUser);
	});

	pubsub.publish('user:created', { id: '1', name: 'John' });

	pubsub.subscribe('user:created', () => {
		typedSubscribe.call(mockedUser);
	});

	originalPubsub.publish('test:user:created', { id: '1', name: 'John' });

	const typedAsyncIterator = pubsub.asyncIterator('user:created');

	const asyncIteratorPromise = typedAsyncIterator.next();

	originalPubsub.publish('test:user:created', { id: '1', name: 'John' });

	t.deepEqual(await typedPublish.promise, mockedUser);
	t.deepEqual(await typedSubscribe.promise, mockedUser);
	t.deepEqual((await asyncIteratorPromise).value, mockedUser);
});

test('asyncIterator should create iterator for single trigger', async (t) => {
	const { pubsub } = t.context;

	const iterator = pubsub.asyncIterator('user:created');
	const payload = { id: '1', name: 'John' };

	const resultPromise = iterator.next();

	pubsub.publish('user:created', payload);

	const result = await resultPromise;

	t.deepEqual(result.value, payload);
	t.false(result.done);
});

test('asyncIterator should create iterator for multiple triggers', async (t) => {
	const { pubsub } = t.context;

	const iterator = pubsub.asyncIterator(['user:created', 'user:updated']);
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

test('asyncIterableIterator should work with channel prefix', async (t) => {
	const originalPubsub = new PubSubV3();

	const pubsub = createTypedPubSub<PubSubV3, TestEventMap>(originalPubsub, {
		prefix: 'test:',
	});

	const mockedUser = {
		id: '1',
		name: 'John',
	};

	originalPubsub.publish('test:user:created', { id: '1', name: 'John' });

	const typedAsyncIterator = pubsub.asyncIterableIterator('user:created');

	const asyncIteratorPromise = typedAsyncIterator.next();

	originalPubsub.publish('test:user:created', { id: '1', name: 'John' });

	t.deepEqual((await asyncIteratorPromise).value, mockedUser);
});

test('asyncIterableIterator should create iterator for single trigger', async (t) => {
	const originalPubsub = new PubSubV3();
	const pubsub = createTypedPubSub<PubSubV3, TestEventMap>(originalPubsub);

	const iterator = pubsub.asyncIterableIterator('user:created');
	const payload = { id: '1', name: 'John' };

	const resultPromise = iterator.next();

	pubsub.publish('user:created', payload);

	const result = await resultPromise;

	t.deepEqual(result.value, payload);
	t.false(result.done);
});

test('asyncIterableIterator should create iterator for multiple triggers', async (t) => {
	const originalPubsub = new PubSubV3();
	const pubsub = createTypedPubSub<PubSubV3, TestEventMap>(originalPubsub);

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
