import test from 'ava';
import { GraphQLResolveInfo } from 'graphql';
import { createSubscriptionAdapter } from './subscription';

test('createSubscriptionAdapter should map parameters correctly', async (t) => {
	const root = {};
	const args = {};
	const ctx = {};
	const payload = {};
	const info = {} as GraphQLResolveInfo;

	const getIterator = async function* () {
		yield payload;
	};

	const adapted = createSubscriptionAdapter({
		subscribe: (params) => {
			t.is(params.root, root);
			t.is(params.args, args);
			t.is(params.ctx, ctx);
			t.is(params.info, info);
			return getIterator();
		},
		resolve: (params) => {
			t.is(params.args, args);
			t.is(params.ctx, ctx);
			t.is(params.info, info);
			t.is(params.payload, payload);
			return params.payload;
		},
	});

	if (adapted.resolve == null) {
		t.fail();
		return;
	}

	const subs = adapted.subscribe(root, args, ctx, info) as AsyncGenerator<{}, void, unknown>;

	let iterations = 0;

	for await (const p of subs) {
		const result = adapted.resolve(p, args, ctx, info);
		t.is(result, payload);
		iterations++;
	}

	t.is(iterations, 1);
});
