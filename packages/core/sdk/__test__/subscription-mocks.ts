/** biome-ignore-all lint/complexity/noBannedTypes: Allow empty for source */
import type { GraphQLResolveInfo } from 'graphql';
import { isPromise } from '../../utils/promise.ts';
import { SubscriptionBuilder } from '../subscription-builder.ts';
import { SubscriptionCompiler } from '../subscription-compiler.ts';
import type { SubscriptionField } from '../subscription-methods.ts';
import { makeSymbol } from '../symbols.ts';
import {
	type MockArgs,
	type MockContext,
	type MockInfo,
	type MockResult,
	mockInfo,
} from './mocks.ts';

export type MockSubscriptionSource = {};

interface MockSubscriptionFieldOptions {
	field?: string;
}

type SubscriptionResolver = {
	subscribe: (
		source: MockSubscriptionSource,
		args: MockArgs,
		ctx: MockContext,
		info: GraphQLResolveInfo,
	) => AsyncIterable<{ value: MockResult }> | PromiseLike<AsyncIterable<{ value: MockResult }>>;
	resolve: (
		source: { value: MockResult },
		args: MockArgs,
		ctx: MockContext,
		info: GraphQLResolveInfo,
	) => MockResult | PromiseLike<MockResult>;
};

export function mockSubscriptionFieldBuilder({
	field = 'field',
}: MockSubscriptionFieldOptions = {}) {
	return new SubscriptionBuilder<
		MockResult,
		MockSubscriptionSource,
		MockContext,
		MockArgs,
		MockInfo
	>({
		field,
		metadata: new Map(),
		middlewares: [],
		requiredPluginIds: new Set(),
	});
}

export function mockSubscriptionFieldResolver(
	fn: (
		methods: SubscriptionField<
			MockResult,
			{ value: MockResult },
			MockSubscriptionSource,
			MockContext,
			MockArgs,
			MockInfo,
			{ value: MockResult }
		>,
	) => SubscriptionField<
		MockResult,
		MockResult,
		MockSubscriptionSource,
		MockContext,
		MockArgs,
		MockInfo,
		{ value: MockResult }
	>,
) {
	const fieldBuilder = mockSubscriptionFieldBuilder();
	const subscribed = fieldBuilder.toMethods().subscribe(() => mockSubscriptionGenerator(3));
	const fieldWithMake = fn(subscribed.map((params) => params.source));
	return makeMockedSubscriptionField(fieldWithMake).build([]).resolver;
}

export function mockSubscriptionFieldCompiler({
	field = 'field',
}: MockSubscriptionFieldOptions = {}) {
	return new SubscriptionCompiler<
		MockResult,
		{ value: MockResult },
		MockSubscriptionSource,
		MockContext,
		MockArgs,
		MockInfo
	>({
		field,
		subscribeMetadata: new Map(),
		subscribeMiddlewares: [],
		subscribe: () => mockSubscriptionGenerator(1),
		resolveMetadata: new Map(),
		resolveMiddlewares: [],
		requiredPluginIds: new Set(),
		resolver: (params) => params.source.value,
	});
}

export function mockSubscriptionGenerator(steps = 3): AsyncIterable<{ value: MockResult }> {
	return {
		async *[Symbol.asyncIterator]() {
			for (let i = 1; i <= steps; i++) {
				yield { value: `${i}` };
			}
		},
	};
}

export async function executeMockedSubscriptionField(
	field: SubscriptionField<
		MockResult,
		MockResult,
		MockSubscriptionSource,
		MockContext,
		MockArgs,
		MockInfo,
		{ value: MockResult }
	>,
) {
	const resolver = makeMockedSubscriptionField(field).build([]).resolver;
	return await executeMockedSubscriptionResolver(resolver);
}
export async function executeMockedSubscriptionResolver(resolver: SubscriptionResolver) {
	const results: MockResult[] = [];
	const source = {};
	const args = {
		userId: '123',
	};
	const ctx = {
		user: { name: 'test' },
	};
	const info = mockInfo() as GraphQLResolveInfo;

	const maybePromise = resolver.subscribe(source, args, ctx, info);
	const generator = isPromise(maybePromise) ? await maybePromise : maybePromise;

	for await (const payload of generator) {
		const resolvedValue = await resolver.resolve(payload, args, ctx, info);
		results.push(resolvedValue);
	}

	return results;
}

export function makeMockedSubscriptionField<
	Expected,
	Result,
	ParentSource,
	Context,
	Args,
	Info,
	Source,
>(field: SubscriptionField<Expected, Result, ParentSource, Context, Args, Info, Source>) {
	return field[makeSymbol]();
}
