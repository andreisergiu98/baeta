import { createApplication, type Middleware } from '@baeta/core';
import {
	type AppPlugin,
	createFieldBuilder,
	createModuleBuilder,
	createSubscriptionBuilder,
	createTypeBuilder,
} from '@baeta/core/sdk';
import test from '@baeta/testing';
import { type DocumentNode, parse } from 'graphql';
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
	const typedef = typeof options.typeDefs === 'string' ? parse(options.typeDefs) : options.typeDefs;
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
			mapFields(subscriptions, (_, field) => createSubscriptionBuilder(field)),
		);
	}

	const TestModule: any = createModuleBuilder<any, any>('test', typedef, builders, {});

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
		modules: [module.$schema(types)],
		plugins: options.plugins ?? [inputValidationAppPlugin],
	}).schema;
}

function mapFields<T, R>(fields: Record<string, T>, fn: (value: T, field: string) => R) {
	return Object.fromEntries(
		Object.entries(fields).map(([field, value]) => [field, fn(value, field)]),
	);
}

test('pass app helpers', (t) => {
	t.pass();
});
