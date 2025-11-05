import test from '@baeta/testing';
import type { DocumentNode } from 'graphql';
import { Extension, mergeExtensions } from './extension.ts';
import { FieldBuilder } from './field-builder.ts';
import { ModuleBuilder } from './module-builder.ts';
import { SubscriptionBuilder } from './subscription-builder.ts';
import { TypeBuilder } from './type-builder.ts';

class TestExtension extends Extension<{ test: number }> {
	readonly stateKey = Symbol('testExtension');
}

function mockEditableBuilder() {
	const map = new Map();
	return {
		useStore: <T>(k: symbol) => ({
			get: () => map.get(k) as T | undefined,
			set: (value: T) => map.set(k, value),
		}),
	};
}

function mockFieldBuilder() {
	return new FieldBuilder({
		type: 'test',
		field: 'test',
		extensions: [],
		store: new Map(),
		middlewares: [],
	});
}

function mockTypeBuilder() {
	return new TypeBuilder({
		type: 'test',
		fieldBuilders: {},
		extensions: [],
		store: new Map(),
		middlewares: [],
	});
}

function mockModuleBuilder() {
	return new ModuleBuilder({
		name: 'test',
		typedef: {} as DocumentNode,
		typeBuilders: {},
		defaultResolvers: {},
		extensions: [],
		transformers: [],
		store: new Map(),
		middlewares: [],
	});
}

function mockSubscriptionBuilder() {
	return new SubscriptionBuilder({
		field: 'test',
		extensions: [],
		store: new Map(),
		middlewares: [],
	});
}

test('mergeExtensions merges items correctly', (t) => {
	const items = [
		{ name: 'Extension 1', version: '1.0.0' },
		{ name: 'Extension 2', version: '2.0.0' },
		{ name: 'Extension 3', version: '3.0.0' },
	];

	const callback = (item: { name: string; version: string }) => ({ [item.name]: item.version });

	const merged = mergeExtensions(items, callback);

	t.deepEqual(merged, {
		'Extension 1': '1.0.0',
		'Extension 2': '2.0.0',
		'Extension 3': '3.0.0',
	});
});

test('mergeExtensions handles empty items array', (t) => {
	const items: Array<{ name: string; version: string }> = [];
	const callback = (item: { name: string; version: string }) => ({ [item.name]: item.version });

	const merged = mergeExtensions(items, callback);

	t.deepEqual(merged, {});
});

test('Extension should work with default methods', (t) => {
	const extension = new TestExtension();
	t.deepEqual(extension.getFieldExtensions(mockFieldBuilder()), {});
	t.deepEqual(extension.getTypeExtensions(mockTypeBuilder()), {});
	t.deepEqual(extension.getModuleExtensions(mockModuleBuilder()), {});
	t.deepEqual(extension.getSubscriptionExtensions(mockSubscriptionBuilder()), {});
	t.notThrows(() => extension.mutate([]));
});

test('Extension should work with state', (t) => {
	const extension = new TestExtension();
	const builder = mockEditableBuilder();
	const mockSettings = { test: 1 };
	t.is(extension.getState(builder), undefined);
	extension.setState(builder, mockSettings);
	t.is(extension.getState(builder), mockSettings);
});
