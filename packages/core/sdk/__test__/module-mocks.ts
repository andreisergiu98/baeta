import type { IResolvers } from '@graphql-tools/utils';
import { type GraphQLFieldResolver, type GraphQLScalarType, parse as gql } from 'graphql';
import { ModuleBuilder } from '../module-builder.ts';
import { ModuleCompiler } from '../module-compiler.ts';
import type { TypeCompilerFactory, TypeMethods } from '../type-methods.ts';
import { executeMockedResolver } from './field-mocks.ts';
import type { MockArgs, MockContext, MockInfo, MockResult, MockSource } from './mocks.ts';
import { type MockTypeBuilders, mockTypeBuilder } from './type-mocks.ts';

type MockModuleBuilders<Keys extends string> = {
	Builder: {
		[K in Keys]: TypeMethods<
			MockSource,
			MockContext,
			MockInfo,
			MockTypeBuilders['Builder'],
			MockTypeBuilders['Resolvers']
		>;
	};
	Resolvers: {
		[K in Keys]: TypeCompilerFactory<
			MockSource,
			MockContext,
			MockInfo,
			MockTypeBuilders['Resolvers']
		>;
	};
};

export function mockModuleBuilder() {
	return new ModuleBuilder<
		MockContext,
		MockInfo,
		MockModuleBuilders<'Type1' | 'Type2'>['Builder'],
		MockModuleBuilders<'Type1' | 'Type2'>['Resolvers']
	>({
		name: 'module',
		typedef: gql(`
			type Type1 {
				field1: String
				field2: String
			}
			type Type2 {
				field1: String
				field2: String
			}
		`),
		typeBuilders: {
			Type1: mockTypeBuilder({ type: 'Type1' }).toMethods(),
			Type2: mockTypeBuilder({ type: 'Type2' }).toMethods(),
		},
		defaultResolvers: {},
		transformers: [],
		metadata: new Map(),
		middlewares: [],
		requiredPluginIds: new Set(),
	});
}

export function mockSchemaForModuleBuilder(
	mod: ReturnType<ReturnType<typeof mockModuleBuilder>['toMethods']>,
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

export function mockModuleCompiler(
	scalars: Record<string, GraphQLScalarType> = {},
	defaultResolvers: IResolvers = {},
) {
	const type1 = mockTypeBuilder({ type: 'Type1' }).toMethods();
	const type2 = mockTypeBuilder({ type: 'Type2' }).toMethods();
	return new ModuleCompiler<MockContext, MockInfo>({
		name: 'module',
		metadata: new Map(),
		typesMap: {
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
		typedef: gql(`
            type Type1 {
                field1: String
                field2: String
            }
			type Type2 {
                field1: String
                field2: String
            }
        `),
		defaultResolvers,
		transformers: [],
		middlewares: [],
		requiredPluginIds: new Set(),
	});
}

export async function executeMockedModuleResolvers(resolvers: IResolvers) {
	const results: Record<string, Record<string, unknown> | undefined> = {};
	for (const type of ['Type1', 'Type2']) {
		const typeResolvers = resolvers[type] as IResolvers;
		for (const field of ['field1', 'field2']) {
			results[type] ??= {};
			results[type][field] = await executeMockedResolver(
				typeResolvers[field] as GraphQLFieldResolver<MockSource, MockContext, MockArgs, MockResult>,
			);
		}
	}
	return results;
}
