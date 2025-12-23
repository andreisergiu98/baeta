/** biome-ignore-all lint/complexity/noBannedTypes: Allow empty for source */
import { isPromise } from '../../utils/promise.ts';
import type { Field } from '../field-methods.ts';
import { SubscriptionBuilder } from '../subscription-builder.ts';
import { SubscriptionCompiler } from '../subscription-compiler.ts';
import type { SubscriptionField, SubscriptionFieldWithMake } from '../subscription-methods.ts';
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
		info: MockInfo,
	) => AsyncIterable<{ value: MockResult }> | PromiseLike<AsyncIterable<{ value: MockResult }>>;
	resolve: (
		source: { value: MockResult },
		args: MockArgs,
		ctx: MockContext,
		info: MockInfo,
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
		extensions: [],
		store: new Map(),
		middlewares: [],
	});
}

export function mockSubscriptionFieldResolver(
	fn: (
		methods: SubscriptionField<
			MockResult,
			{ value: MockResult },
			{ value: MockResult },
			MockContext,
			MockArgs,
			MockInfo
		>,
	) => Field<MockResult, MockResult, { value: MockResult }, MockContext, MockArgs, MockInfo>,
) {
	const fieldBuilder = mockSubscriptionFieldBuilder();
	const fieldWithMake = fn(fieldBuilder.toMethods().subscribe(() => mockSubscriptionGenerator(3)));
	return makeMockedSubscriptionField<
		MockResult,
		MockResult,
		{ value: MockResult },
		MockContext,
		MockArgs,
		MockInfo,
		MockSubscriptionSource
	>(fieldWithMake).build([]);
}

export function mockSubscriptionFieldCompiler({
	field = 'field',
}: MockSubscriptionFieldOptions = {}) {
	return new SubscriptionCompiler<
		MockResult,
		{ value: MockResult },
		MockContext,
		MockArgs,
		MockInfo,
		MockSubscriptionSource
	>({
		field,
		store: new Map(),
		middlewares: [],
		subscribe: () => ({ __internal__asyncIterable: mockSubscriptionGenerator(1) }),
		resolver: (params) => params.source.value,
	});
}

export function mockSubscriptionGenerator(steps = 3) {
	return {
		async *[Symbol.asyncIterator]() {
			for (let i = 1; i <= steps; i++) {
				yield { value: `${i}` };
			}
		},
	};
}

export async function executeMockedSubscriptionField(
	field: Field<MockResult, MockResult, { value: MockResult }, MockContext, MockArgs, MockInfo>,
) {
	const resolver = makeMockedSubscriptionField<
		MockResult,
		MockResult,
		{ value: MockResult },
		MockContext,
		MockArgs,
		MockInfo,
		MockSubscriptionSource
	>(field).build([]);

	return executeMockedSubscriptionResolver(resolver);
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
	const info = mockInfo();

	const maybePromise = resolver.subscribe(source, args, ctx, info);
	const generator = isPromise(maybePromise) ? await maybePromise : maybePromise;

	for await (const payload of generator) {
		const resolvedValue = await resolver.resolve(payload, args, ctx, info);
		results.push(resolvedValue);
	}

	return results;
}

export function makeMockedSubscriptionField<
	Result,
	Expected,
	Source,
	Context,
	Args,
	Info,
	SubscriptionSource,
>(field: Field<Result, Expected, Source, Context, Args, Info>) {
	return (
		field as SubscriptionFieldWithMake<
			Result,
			Expected,
			Source,
			Context,
			Args,
			Info,
			SubscriptionSource
		>
	).__make();
}
