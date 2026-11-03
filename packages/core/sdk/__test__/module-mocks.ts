import type { GraphQLFieldResolver, GraphQLScalarType } from 'graphql';
import { createBuilderContext, createEmptyBuilderContext } from '../builder-context.ts';
import { ModuleBuilder } from '../module-builder.ts';
import { ModuleCompiler } from '../module-compiler.ts';
import type { FieldResolverRecord } from '../type-compiler.ts';
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
		typeBuilders: {
			Type1: mockTypeBuilder({ type: 'Type1' }).toMethods(),
			Type2: mockTypeBuilder({ type: 'Type2' }).toMethods(),
		},
		context: createEmptyBuilderContext(),
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
	state: Map<symbol, unknown> = new Map(),
) {
	const type1 = mockTypeBuilder({ type: 'Type1' }).toMethods();
	const type2 = mockTypeBuilder({ type: 'Type2' }).toMethods();
	return new ModuleCompiler<MockContext, MockInfo>({
		name: 'module',
		typeNames: ['Type1', 'Type2'],
		context: createBuilderContext({
			state,
			middlewares: [],
			requiredPluginIds: new Set(),
		}),
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
	});
}

export async function executeMockedModuleResolvers(fields: readonly FieldResolverRecord[]) {
	const results: Record<string, Record<string, unknown>> = {};
	for (const record of fields) {
		results[record.type] ??= {};
		results[record.type][record.field] = await executeMockedResolver({
			resolve: record.resolve as GraphQLFieldResolver<
				MockSource,
				MockContext,
				MockArgs,
				MockResult
			>,
		});
	}
	return results;
}
