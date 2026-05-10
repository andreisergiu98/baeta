import type { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import type { Middleware } from '../../lib/middleware.ts';
import { FieldBuilder } from '../field-builder.ts';
import { FieldCompiler } from '../field-compiler.ts';
import type { Field, FieldMethods } from '../field-methods.ts';
import { makeField } from '../field.ts';
import {
	type MockArgs,
	type MockContext,
	type MockInfo,
	type MockResult,
	type MockSource,
	mockInfo,
} from './mocks.ts';

interface MockFieldOptions {
	field?: string;
	type?: string;
}

export function mockMiddleware(
	pre?: () => Promise<void>,
	post?: (result: MockResult) => Promise<MockResult>,
): Middleware<MockResult, MockSource, MockContext, MockArgs, MockInfo> {
	return async (next) => {
		await pre?.();
		const result = await next();
		if (post) {
			return await post(result);
		}
		return result;
	};
}

export function mockFieldBuilder({ field = 'field', type = 'Type' }: MockFieldOptions = {}) {
	return new FieldBuilder<MockResult, MockSource, MockContext, MockArgs, MockInfo>({
		type,
		field,
		metadata: new Map(),
		middlewares: [],
		requiredPluginIds: new Set(),
	});
}

export function mockFieldCompiler({ field = 'field', type = 'Type' }: MockFieldOptions = {}) {
	return new FieldCompiler<MockResult, MockSource, MockContext, MockArgs, MockInfo>({
		type,
		field,
		metadata: new Map(),
		middlewares: [],
		requiredPluginIds: new Set(),
		resolver: () => 'test',
	});
}

export function mockResolver(
	fn: (
		methods: FieldMethods<MockResult, MockSource, MockContext, MockArgs, MockInfo>,
	) => Field<MockResult, MockResult, MockSource, MockContext, MockArgs, MockInfo>,
) {
	const fieldBuilder = mockFieldBuilder();
	const fieldWithMake = fn(fieldBuilder.toMethods());
	const fieldCompiler = makeField(fieldWithMake);
	return fieldCompiler.build([]).resolver;
}

export async function executeMockedResolver(
	resolver: GraphQLFieldResolver<
		MockSource,
		MockContext,
		MockArgs,
		MockResult | PromiseLike<MockResult>
	>,
) {
	return await resolver(
		{ name: 'test' },
		{ userId: '123' },
		{ user: { name: 'test' } },
		mockInfo() as GraphQLResolveInfo,
	);
}
