import type { ExecutionContext } from '@baeta/testing';
import type { IResolvers } from '@graphql-tools/utils';
import type { GraphQLFieldResolver, GraphQLResolveInfo, GraphQLScalarType } from 'graphql';
import gql from 'graphql-tag';
import type { Middleware } from '../../lib/middleware.ts';
import { makeField } from '../field.ts';
import { FieldBuilder } from '../field-builder.ts';
import type { Field, FieldMethods } from '../field-methods.ts';
import { ModuleBuilder } from '../module-builder.ts';
import { ModuleCompiler } from '../module-compiler.ts';
import { TypeBuilder } from '../type-builder.ts';
import { TypeCompiler } from '../type-compiler.ts';
import type { TypeCompilerFactory, TypeMethods } from '../type-methods.ts';

export interface MockUseStoreLike {
	useStore: <T>(key: symbol) => {
		get: () => T | undefined;
		set: (value: Readonly<T>) => void;
	};
}

export interface MockSetStoreLike {
	useStore: <T>(key: symbol) => {
		get: () => T | undefined;
		set: (value: Readonly<T>) => void;
	};
	setStore: <T>(key: symbol, value: Readonly<T>) => void;
}

export type MockSource = {
	name: string;
};

export type MockContext = {
	user: {
		name: string;
	};
};

export type MockArgs = {
	userId: string;
};

export type MockInfo = {
	fieldName: string;
};

export type MockResult = string | null;

export function mockInfo() {
	return {
		fieldName: 'name',
	} as GraphQLResolveInfo;
}

export function mockFieldBuilder(field = 'field', type = 'type') {
	return new FieldBuilder<MockResult, MockSource, MockContext, MockArgs, MockInfo>(
		type,
		field,
		[],
		new Map(),
		[],
	);
}

export function mockResolver(
	fn: (
		methods: FieldMethods<MockResult, MockSource, MockContext, MockArgs, MockInfo>,
	) => Field<MockResult, MockResult, MockSource, MockContext, MockArgs, MockInfo>,
) {
	const fieldBuilder = mockFieldBuilder();
	const fieldWithMake = fn(fieldBuilder.toMethods());
	const fieldCompiler = makeField(fieldWithMake);
	return fieldCompiler.build([]);
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

type MockedTypeBuilders = {
	Builder: {
		field1: FieldMethods<MockResult, MockSource, MockContext, MockArgs, MockInfo>;
		field2: FieldMethods<MockResult, MockSource, MockContext, MockArgs, MockInfo>;
	};
	Resolvers: {
		field1: Field<MockResult, MockResult, MockSource, MockContext, MockArgs, MockInfo>;
		field2: Field<MockResult, MockResult, MockSource, MockContext, MockArgs, MockInfo>;
	};
};

export async function runMockedResolver(
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
		mockInfo(),
	);
}

export function mockTypeBuilder(name = 'type') {
	return new TypeBuilder<
		MockSource,
		MockContext,
		MockInfo,
		MockedTypeBuilders['Builder'],
		MockedTypeBuilders['Resolvers']
	>(
		name,
		{
			field1: mockFieldBuilder('field1', 'type').toMethods(),
			field2: mockFieldBuilder('field2', 'type').toMethods(),
		},
		[],
		new Map(),
		[],
	);
}

type MockedModuleBuilders<Keys extends string> = {
	Builder: {
		[K in Keys]: TypeMethods<
			MockSource,
			MockContext,
			MockInfo,
			MockedTypeBuilders['Builder'],
			MockedTypeBuilders['Resolvers']
		>;
	};
	Resolvers: {
		[K in Keys]: TypeCompilerFactory<
			MockSource,
			MockContext,
			MockInfo,
			MockedTypeBuilders['Resolvers']
		>;
	};
};

export function mockModuleBuilder<Keys extends string>(name: string, keys: Keys[]) {
	const typedef = keys
		.map(
			(key) => `
		type ${key} {
			field1: String
			field2: String
		}
	`,
		)
		.join('\n');

	const builders = keys.reduce(
		(acc, key) => {
			acc[key] = mockTypeBuilder(key).toMethods();
			return acc;
		},
		{} as Record<
			Keys,
			TypeMethods<
				MockSource,
				MockContext,
				MockInfo,
				MockedTypeBuilders['Builder'],
				MockedTypeBuilders['Resolvers']
			>
		>,
	);
	return new ModuleBuilder<
		MockContext,
		MockInfo,
		MockedModuleBuilders<Keys>['Builder'],
		MockedModuleBuilders<Keys>['Resolvers']
	>(name, gql(typedef), builders, {}, [], [], new Map(), []);
}

export function mockDefaultModuleBuilder() {
	return mockModuleBuilder<'Type1' | 'Type2'>('module', ['Type1', 'Type2']);
}

export function mockSchemaForDefaultModuleBuilder(
	mod: ReturnType<ReturnType<typeof mockDefaultModuleBuilder>['toMethods']>,
) {
	return {
		Type1: mod.Type1.$fields({
			field1: mod.Type1.field1.key('name'),
			field2: mod.Type1.field2.key('name'),
		}),
		Type2: mod.Type2.$fields({
			field1: mod.Type2.field1.key('name'),
			field2: mod.Type2.field2.key('name'),
		}),
	};
}

export async function runTypeResolvers(resolvers: IResolvers, fields = ['field1', 'field2']) {
	const results: Record<string, unknown> = {};
	for (const field of fields) {
		results[field] = await runMockedResolver(
			resolvers[field] as GraphQLFieldResolver<MockSource, MockContext, MockArgs, MockResult>,
		);
	}
	return results;
}

export async function runModuleResolvers(
	resolvers: IResolvers,
	types = ['Type1', 'Type2'],
	fields = ['field1', 'field2'],
) {
	const results: Record<string, Record<string, unknown> | undefined> = {};
	for (const type of types) {
		const typeResolvers = resolvers[type] as IResolvers;
		for (const field of fields) {
			results[type] ??= {};
			results[type][field] = await runMockedResolver(
				typeResolvers[field] as GraphQLFieldResolver<MockSource, MockContext, MockArgs, MockResult>,
			);
		}
	}
	return results;
}

export function mockTypeCompiler(name = 'Type') {
	return new TypeCompiler<MockSource, MockContext, MockInfo>(name, new Map(), [], {
		field1: mockFieldBuilder('field1', 'type').toMethods().key('name'),
		field2: mockFieldBuilder('field2', 'type').toMethods().key('name'),
	});
}

export function mockModuleCompiler(
	scalars: Record<string, GraphQLScalarType> = {},
	defaultResolvers: IResolvers = {},
) {
	const type1 = mockTypeBuilder('Type1').toMethods();
	const type2 = mockTypeBuilder('Type2').toMethods();
	return new ModuleCompiler<MockContext, MockInfo>(
		'module',
		new Map(),
		[],
		{
			...scalars,
			Type1: type1.$fields({
				field1: type1.field1.key('name'),
				field2: type1.field2.key('name'),
			}),
			Type2: type2.$fields({
				field1: type2.field1.key('name'),
				field2: type2.field2.key('name'),
			}),
		},
		gql`
            type Type1 {
                field1: String
                field2: String
            }
			type Type2 {
                field1: String
                field2: String
            }
        `,
		defaultResolvers,
		[],
		[],
	);
}

export function testUseStoreLike(t: ExecutionContext, useStoreLike: MockUseStoreLike) {
	const key1 = Symbol('1');
	const key2 = Symbol('2');
	useStoreLike.useStore<number>(key1).set(1);
	useStoreLike.useStore<number>(key1).set(2);
	useStoreLike.useStore<number>(key2).set(3);
	t.is(useStoreLike.useStore<number>(key1).get(), 2);
	t.is(useStoreLike.useStore<number>(key2).get(), 3);
}

export function testSetStoreLike(t: ExecutionContext, setStoreLike: MockSetStoreLike) {
	const key1 = Symbol('1');
	const key2 = Symbol('2');
	setStoreLike.setStore<number>(key1, 1);
	t.is(setStoreLike.useStore<number>(key1).get(), 1);
	t.is(setStoreLike.useStore<number>(key2).get(), undefined);
}

export function testUseStoreMutations(
	t: ExecutionContext,
	useStoreLike1: MockUseStoreLike,
	useStoreLike2: MockUseStoreLike,
) {
	const key1 = Symbol('1');
	const key2 = Symbol('2');
	useStoreLike1.useStore<number>(key1).set(1);
	useStoreLike2.useStore<number>(key1).set(2);
	useStoreLike2.useStore<number>(key2).set(3);
	t.is(useStoreLike1.useStore<number>(key1).get(), 1);
	t.is(useStoreLike2.useStore<number>(key1).get(), 2);
	t.is(useStoreLike1.useStore<number>(key2).get(), undefined);
	t.is(useStoreLike2.useStore<number>(key2).get(), 3);
}
