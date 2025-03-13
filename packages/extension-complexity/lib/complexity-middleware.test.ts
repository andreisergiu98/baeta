import test from '@baeta/testing';
import { sinon } from '@baeta/testing';
import type { GraphQLResolveInfo } from 'graphql';
import { ComplexityErrorKind } from './complexity-errors.ts';
import type { ComplexityLimit } from './complexity-limits.ts';
import { createComplexityMiddleware } from './complexity-middleware.ts';
import type { ComplexityExtensionOptions } from './complexity-options.ts';
import type { FieldSettingsMap } from './field-settings.ts';
import { loadComplexityStore } from './store-loader.ts';
import { getComplexityStore } from './store.ts';

const createMocks = async (
	limit: Required<ComplexityLimit> = {
		depth: 1,
		breadth: 1,
		complexity: 1,
	},
) => {
	const next = sinon.stub().resolves({ data: 'result' });

	const options: Required<ComplexityExtensionOptions<unknown>> = {
		limit,
		defaultComplexity: 1,
		defaultListMultiplier: 10,
		complexityError: sinon.stub().returns(new Error('Complexity error')),
	};

	const mockContext = {};
	const mockRoot = {};
	const mockArgs = {};
	const mockInfo = {};

	const mockResults = {
		depth: 1,
		breadth: 1,
		complexity: 1,
	};

	loadComplexityStore(mockContext, options.limit, limit);
	const mockStore = await getComplexityStore(mockContext);

	return {
		next,
		options,
		mockResults,
		mockStore: sinon.stub(mockStore),
		mockContext,
		mockRoot,
		mockArgs,
		mockInfo: mockInfo as GraphQLResolveInfo,
	};
};

test('middleware calls next when complexity is under limits', async (t) => {
	const { options, next, mockStore, mockContext, mockRoot, mockArgs, mockInfo } = await createMocks(
		{
			depth: 10,
			breadth: 20,
			complexity: 200,
		},
	);

	mockStore.cacheComplexity.returns({
		depth: 5,
		breadth: 10,
		complexity: 100,
	});

	const fieldSettingsMap: FieldSettingsMap = {};
	const middleware = createComplexityMiddleware(options, fieldSettingsMap);
	const wrappedResolver = middleware(next);

	await wrappedResolver(mockRoot, mockArgs, mockContext, mockInfo);

	t.true(next.calledOnce);
	t.true(next.calledWith(mockRoot, mockArgs, mockContext, mockInfo));
});

test('middleware throws when depth limit is exceeded', async (t) => {
	const { options, next, mockStore, mockContext, mockRoot, mockArgs, mockInfo } = await createMocks(
		{
			depth: 10,
			breadth: 20,
			complexity: 200,
		},
	);

	mockStore.cacheComplexity.returns({
		depth: 11,
		breadth: 10,
		complexity: 100,
	});

	const fieldSettingsMap: FieldSettingsMap = {};
	const middleware = createComplexityMiddleware(options, fieldSettingsMap);
	const wrappedResolver = middleware(next);

	await t.throwsAsync(async () => wrappedResolver(mockRoot, mockArgs, mockContext, mockInfo), {
		message: 'Complexity error',
	});

	t.true(
		(options.complexityError as sinon.SinonStub).calledWith(
			ComplexityErrorKind.Depth,
			mockStore.limits.depth,
			11,
		),
	);
	t.false(next.called);
});

test('middleware throws when breadth limit is exceeded', async (t) => {
	const { options, next, mockStore, mockContext, mockRoot, mockArgs, mockInfo } = await createMocks(
		{
			depth: 10,
			breadth: 20,
			complexity: 200,
		},
	);

	mockStore.cacheComplexity.returns({
		depth: 5,
		breadth: 21,
		complexity: 100,
	});

	const fieldSettingsMap: FieldSettingsMap = {};
	const middleware = createComplexityMiddleware(options, fieldSettingsMap);
	const wrappedResolver = middleware(next);

	await t.throwsAsync(async () => wrappedResolver(mockRoot, mockArgs, mockContext, mockInfo), {
		message: 'Complexity error',
	});

	t.true(
		(options.complexityError as sinon.SinonStub).calledWith(
			ComplexityErrorKind.Breadth,
			mockStore.limits.breadth,
			21,
		),
	);
	t.false(next.called);
});

test('middleware throws when complexity limit is exceeded', async (t) => {
	const { options, next, mockStore, mockContext, mockRoot, mockArgs, mockInfo } = await createMocks(
		{
			depth: 10,
			breadth: 20,
			complexity: 200,
		},
	);

	// Set up results to exceed complexity limit
	mockStore.cacheComplexity.returns({
		depth: 5,
		breadth: 10,
		complexity: 201,
	});

	const fieldSettingsMap: FieldSettingsMap = {};
	const middleware = createComplexityMiddleware(options, fieldSettingsMap);
	const wrappedResolver = middleware(next);

	await t.throwsAsync(async () => wrappedResolver(mockRoot, mockArgs, mockContext, mockInfo), {
		message: 'Complexity error',
	});

	t.true(
		(options.complexityError as sinon.SinonStub).calledWith(
			ComplexityErrorKind.Complexity,
			mockStore.limits.complexity,
			201,
		),
	);
	t.false(next.called);
});
