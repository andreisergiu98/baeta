import type { ModuleBuilder, ResolverMapper } from '@baeta/core/sdk';
import test, { sinon } from '@baeta/testing';
import { AuthExtension } from './auth-extension.ts';
import type { GetScopeLoader } from './scope-resolver.ts';
import type { ScopesShape } from './scope-rules.ts';

function createScopeLoader(): GetScopeLoader<ScopesShape, ''> {
	return async () => ({});
}

function createMapper() {
	return {
		getTypes: sinon.stub().returns(['Query']),
		getTypeFields: sinon.stub(() => {
			return ['field1', 'field2'];
		}),
		prependMiddleware: sinon.spy(),
	};
}

function castMapper(mapper: Record<string, unknown>): ResolverMapper {
	return mapper as unknown as ResolverMapper;
}

test('AuthExtension.getTypeExtensions returns auth methods', (t) => {
	const auth = new AuthExtension(createScopeLoader());
	const module = {} as ModuleBuilder;

	const extensions = auth.getTypeExtensions(module, 'Query');

	t.truthy(extensions.$auth);
	t.truthy(extensions.$postAuth);
});

test('AuthExtension.getResolverExtensions returns auth methods', (t) => {
	const auth = new AuthExtension(createScopeLoader());
	const module = {} as ModuleBuilder;

	const extensions = auth.getResolverExtensions(module, 'Query', 'field');

	t.truthy(extensions.$auth);
	t.truthy(extensions.$postAuth);
});

test('AuthExtension.getSubscriptionSubscribeExtensions returns auth method', (t) => {
	const auth = new AuthExtension(createScopeLoader());
	const module = {} as ModuleBuilder;

	const extensions = auth.getSubscriptionSubscribeExtensions(module, 'field');

	t.truthy(extensions.$auth);
});

test('AuthExtension.getSubscriptionResolveExtensions returns auth methods', (t) => {
	const auth = new AuthExtension(createScopeLoader());
	const module = {} as ModuleBuilder;

	const extensions = auth.getSubscriptionResolveExtensions(module, 'field');

	t.truthy(extensions.$auth);
	t.truthy(extensions.$postAuth);
});

test('AuthExtension registers middleware in authMap', (t) => {
	const auth = new AuthExtension(createScopeLoader());
	const module = {} as ModuleBuilder;

	const extensions = auth.getResolverExtensions(module, 'Query', 'field');
	extensions.$auth({});

	t.truthy(auth.getMiddlewareMap().Query.field);
});

test('AuthExtension.build compiles middlewares', (t) => {
	const auth = new AuthExtension(createScopeLoader());
	const module = {} as ModuleBuilder;
	const mapper = createMapper();

	const extensions = auth.getResolverExtensions(module, 'Query', 'field');
	extensions.$auth({});

	auth.build(module, castMapper(mapper));

	t.truthy(
		mapper.prependMiddleware.calledWith('Query', 'field', auth.getMiddlewareMap().Query.field),
	);
});
