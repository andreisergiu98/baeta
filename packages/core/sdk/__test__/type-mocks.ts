import type { IResolvers } from '@graphql-tools/utils';
import type { GraphQLFieldResolver } from 'graphql';
import type { Middleware } from '../../lib/middleware.ts';
import type { Field, FieldMethods } from '../field-methods.ts';
import { TypeBuilder } from '../type-builder.ts';
import { TypeCompiler } from '../type-compiler.ts';
import { executeMockedResolver, mockFieldBuilder, mockMiddleware } from './field-mocks.ts';
import type { MockArgs, MockContext, MockInfo, MockResult, MockSource } from './mocks.ts';

interface MockTypeOptions {
	type?: string;
}

export type MockTypeBuilders = {
	Builder: {
		field1: FieldMethods<MockResult, MockSource, MockContext, MockArgs, MockInfo>;
		field2: FieldMethods<MockResult, MockSource, MockContext, MockArgs, MockInfo>;
	};
	Resolvers: {
		field1: Field<MockResult, MockResult, MockSource, MockContext, MockArgs, MockInfo>;
		field2: Field<MockResult, MockResult, MockSource, MockContext, MockArgs, MockInfo>;
	};
};

export function mockTypeMiddleware(
	pre?: () => Promise<void>,
	post?: (result: MockResult) => Promise<MockResult>,
): Middleware<unknown, MockSource, MockContext, unknown, MockInfo> {
	return mockMiddleware(pre, post) as Middleware<
		unknown,
		MockSource,
		MockContext,
		unknown,
		MockInfo
	>;
}

export function mockTypeBuilder({ type = 'Type' }: MockTypeOptions = {}) {
	return new TypeBuilder<
		MockSource,
		MockContext,
		MockInfo,
		MockTypeBuilders['Builder'],
		MockTypeBuilders['Resolvers']
	>({
		type,
		fieldBuilders: {
			field1: mockFieldBuilder({ field: 'field1', type }).toMethods(),
			field2: mockFieldBuilder({ field: 'field2', type }).toMethods(),
		},
		state: new Map(),
		middlewares: [],
		requiredPluginIds: new Set(),
	});
}

export function mockTypeCompiler({ type = 'Type' }: MockTypeOptions = {}) {
	return new TypeCompiler<MockSource, MockContext, MockInfo>({
		type,
		state: new Map(),
		middlewares: [],
		requiredPluginIds: new Set(),
		fieldsMap: {
			field1: mockFieldBuilder({ field: 'field1', type }).toMethods().key('name'),
			field2: mockFieldBuilder({ field: 'field2', type }).toMethods().key('name'),
		},
	});
}

export async function executeMockedTypeResolvers(resolvers: IResolvers) {
	const results: Record<string, unknown> = {};
	for (const field of ['field1', 'field2']) {
		results[field] = await executeMockedResolver(
			resolvers[field] as GraphQLFieldResolver<MockSource, MockContext, MockArgs, MockResult>,
		);
	}
	return results;
}
