import test from '@baeta/testing';
import type { Middleware } from '../lib/middleware.ts';
import { composeMiddlewares } from './middleware.ts';

type TestMiddleware = Middleware<string, unknown, unknown, unknown, unknown>;

const params = { source: undefined, args: undefined, ctx: undefined, info: undefined };

test('composeMiddlewares returns the resolver when there are no middlewares', (t) => {
	const resolver = () => 'value';
	t.is(composeMiddlewares([], resolver), resolver);
});

test('composeMiddlewares keeps sync chains sync', (t) => {
	const order: string[] = [];
	const first: TestMiddleware = (next) => {
		order.push('first');
		return `${next() as string}!`;
	};
	const second: TestMiddleware = (next) => {
		order.push('second');
		return next();
	};
	const resolver = composeMiddlewares([first, second], () => 'value');

	t.is(resolver(params), 'value!');
	t.deepEqual(order, ['first', 'second']);
});

test('composeMiddlewares propagates sync throws synchronously', (t) => {
	const middleware: TestMiddleware = () => {
		throw new Error('rejected');
	};
	const resolver = composeMiddlewares([middleware], () => 'value');

	t.throws(() => resolver(params), { message: 'rejected' });
});

test('composeMiddlewares supports async middlewares and resolvers', async (t) => {
	const middleware: TestMiddleware = async (next) => `${await next()}!`;
	const resolver = composeMiddlewares([middleware], async () => 'value');

	t.is(await resolver(params), 'value!');
});

test('composeMiddlewares lets awaiting middlewares catch sync resolver throws', async (t) => {
	const middleware: TestMiddleware = async (next) => {
		try {
			return await next();
		} catch {
			return 'recovered';
		}
	};
	const resolver = composeMiddlewares([middleware], () => {
		throw new Error('failed');
	});

	t.is(await resolver(params), 'recovered');
});
