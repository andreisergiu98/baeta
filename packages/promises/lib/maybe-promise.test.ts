import test from '@baeta/testing';
import {
	isPromise,
	mapMaybePromise,
	mapMaybePromiseAll,
	mapMaybePromiseAny,
	thenMaybePromise,
} from './maybe-promise.ts';

declare function setTimeout(callback: () => void, ms: number): void;
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

test('isPromise detects promises and thenables', (t) => {
	t.true(isPromise(Promise.resolve(1)));
	t.true(isPromise({ then: () => {} }));
	t.true(isPromise(Object.assign(() => {}, { then: () => {} })));
});

test('isPromise rejects plain values', (t) => {
	t.false(isPromise(null));
	t.false(isPromise(undefined));
	t.false(isPromise(1));
	t.false(isPromise('then'));
	t.false(isPromise({ then: true }));
});

test('mapMaybePromise maps sync values synchronously', (t) => {
	t.is(
		mapMaybePromise(2, (n) => n * 2),
		4,
	);
});

test('mapMaybePromise chains promises', async (t) => {
	const result = mapMaybePromise(Promise.resolve(2), (n) => n * 2);
	t.true(result instanceof Promise);
	t.is(await result, 4);
});

test('thenMaybePromise runs thenFn synchronously for sync results', (t) => {
	t.is(
		thenMaybePromise(
			() => 2,
			(n) => n * 2,
			() => -1,
		),
		4,
	);
});

test('thenMaybePromise catches sync throws from run', (t) => {
	t.is(
		thenMaybePromise(
			(): number => {
				throw new Error('boom');
			},
			(n) => n * 2,
			() => -1,
		),
		-1,
	);
});

test('thenMaybePromise catches sync throws from thenFn', (t) => {
	t.is(
		thenMaybePromise(
			() => 2,
			(): number => {
				throw new Error('boom');
			},
			() => -1,
		),
		-1,
	);
});

test('thenMaybePromise chains async results', async (t) => {
	const result = thenMaybePromise(
		async () => 2,
		(n) => n * 2,
		() => -1,
	);
	t.true(result instanceof Promise);
	t.is(await result, 4);
});

test('thenMaybePromise catches async rejections from run and thenFn', async (t) => {
	t.is(
		await thenMaybePromise(
			async (): Promise<number> => {
				throw new Error('boom');
			},
			(n) => n * 2,
			() => -1,
		),
		-1,
	);
	t.is(
		await thenMaybePromise(
			() => 2,
			async (): Promise<number> => {
				throw new Error('boom');
			},
			() => -1,
		),
		-1,
	);
});

test('mapMaybePromiseAll returns sync results synchronously', (t) => {
	t.deepEqual(
		mapMaybePromiseAll([1, 2, 3], (n) => n * 2),
		[2, 4, 6],
	);
});

test('mapMaybePromiseAll returns an empty array for no items', (t) => {
	t.deepEqual(
		mapMaybePromiseAll([], () => 1),
		[],
	);
});

test('mapMaybePromiseAll resolves mixed results in order', async (t) => {
	const result = mapMaybePromiseAll([1, 2, 3], async (n) => {
		if (n === 2) return n * 2;
		await delay(5);
		return n * 2;
	});
	t.true(result instanceof Promise);
	t.deepEqual(await result, [2, 4, 6]);
});

test('mapMaybePromiseAll keeps running items after a sync throw', async (t) => {
	const seen: number[] = [];
	const result = mapMaybePromiseAll([1, 2, 3], (n) => {
		seen.push(n);
		if (n === 2) throw new Error('boom');
		return n;
	});

	t.deepEqual(seen, [1, 2, 3]);
	t.true(result instanceof Promise);
	await t.throwsAsync(async () => await result, { message: 'boom' });
});

test('mapMaybePromiseAll rejects with the first error by item order', async (t) => {
	const result = mapMaybePromiseAll([1, 2], (n) => {
		throw new Error(`boom ${n}`);
	});
	await t.throwsAsync(async () => await result, { message: 'boom 1' });
});

test('mapMaybePromiseAny resolves the first async success', async (t) => {
	const seen: number[] = [];
	const result = mapMaybePromiseAny([1, 2, 3], async (n) => {
		seen.push(n);
		if (n === 1) {
			await delay(5);
			throw new Error('slow failure');
		}
		return n;
	});

	t.true(result instanceof Promise);
	t.is(await result, 2);
	t.deepEqual(seen, [1, 2, 3]);
});

test('mapMaybePromiseAny prefers a sync success over pending items', async (t) => {
	const seen: number[] = [];
	const result = mapMaybePromiseAny([1, 2, 3], (n) => {
		seen.push(n);
		if (n === 1) {
			return delay(5).then(() => {
				throw new Error('slow failure');
			});
		}
		if (n === 2) throw new Error('sync failure');
		return n;
	});

	t.is(result, 3);
	t.deepEqual(seen, [1, 2, 3]);
	// The pending rejection must not surface as unhandled
	await delay(10);
});

test('mapMaybePromiseAny rejects with an AggregateError when every item fails', async (t) => {
	const result = mapMaybePromiseAny([1, 2], (n) => {
		throw new Error(`boom ${n}`);
	});

	const error = await t.throwsAsync(async () => await result, { instanceOf: AggregateError });
	t.deepEqual(
		error.errors.map((err: Error) => err.message),
		['boom 1', 'boom 2'],
	);
});

test('mapMaybePromiseAny rejects for no items', async (t) => {
	await t.throwsAsync(async () => await mapMaybePromiseAny([], () => 1), {
		instanceOf: AggregateError,
	});
});
