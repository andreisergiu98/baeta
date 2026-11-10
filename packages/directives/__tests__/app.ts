import { createApplication, type Middleware } from '@baeta/core';
import {
	type AppPlugin,
	type RootTypes,
	createFieldBuilder,
	createModuleBuilder,
	createSubscriptionBuilder,
	createTypeBuilder,
} from '@baeta/core/sdk';
import test from '@baeta/testing';
import { buildSchema, type DocumentNode, print } from 'graphql';
import type { InputDirective } from '../lib/directive.ts';
import { inputDirectives, inputValidationAppPlugin } from '../lib/plugin.ts';

type TestResolver = (params: { source: any; args: any; ctx: any; info: any }) => unknown;

type TestSubscription = {
	subscribe: (params: { source: any; args: any; ctx: any; info: any }) => AsyncIterable<unknown>;
	resolve?: TestResolver;
};

export type TestSchemaOptions = {
	typeDefs: string | DocumentNode;
	directives: InputDirective[];
	resolvers?: Record<string, Record<string, TestResolver>>;
	subscriptions?: Record<string, TestSubscription>;
	middleware?: Middleware<any, unknown, unknown, unknown, unknown>;
	plugins?: AppPlugin<any, any>[];
};

export function createTestSchema(options: TestSchemaOptions) {
	const sdl = typeof options.typeDefs === 'string' ? options.typeDefs : print(options.typeDefs);
	const resolvers = options.resolvers ?? {};
	const subscriptions = options.subscriptions ?? {};

	const builders: Record<string, any> = {};
	for (const [type, fields] of Object.entries(resolvers)) {
		builders[type] = createTypeBuilder(
			type,
			mapFields(fields, (_, field) => createFieldBuilder(type, field)),
		);
	}
	if (Object.keys(subscriptions).length > 0) {
		builders.Subscription = createTypeBuilder(
			'Subscription',
			mapFields(subscriptions, (_, field) => createSubscriptionBuilder('Subscription', field)),
		);
	}

	const TestModule: any = createModuleBuilder<any, any>('test', builders);

	const types: Record<string, any> = {};
	for (const [type, fields] of Object.entries(resolvers)) {
		types[type] = TestModule[type].$fields(
			mapFields(fields, (resolve, field) => TestModule[type][field].resolve(resolve)),
		);
	}
	if (Object.keys(subscriptions).length > 0) {
		types.Subscription = TestModule.Subscription.$fields(
			mapFields(subscriptions, (subscription, field) =>
				TestModule.Subscription[field]
					.subscribe(subscription.subscribe)
					.resolve(subscription.resolve ?? (({ source }: { source: unknown }) => source)),
			),
		);
	}

	let module = TestModule;
	if (options.directives.length > 0) {
		module = module.$use(inputDirectives(options.directives));
	}
	if (options.middleware) {
		module = module.$use(options.middleware);
	}

	return createApplication({
		sources: { sdl, roots: getRootTypes(sdl), modules: [module.$schema(types)] },
		plugins: options.plugins ?? [inputValidationAppPlugin],
	}).schema;
}

function getRootTypes(sdl: string): RootTypes {
	const schema = buildSchema(sdl);
	return {
		query: schema.getQueryType()?.name ?? 'Query',
		mutation: schema.getMutationType()?.name,
		subscription: schema.getSubscriptionType()?.name,
	};
}

function mapFields<T, R>(fields: Record<string, T>, fn: (value: T, field: string) => R) {
	return Object.fromEntries(
		Object.entries(fields).map(([field, value]) => [field, fn(value, field)]),
	);
}

test('pass app helpers', (t) => {
	t.pass();
});
