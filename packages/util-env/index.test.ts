import test from '@baeta/testing';
import { getEnv, isDevelopmentMode } from './index.ts';

const createNodeGlobal = (envVars: Record<string, string | undefined> = {}) => ({
	process: {
		env: envVars,
	},
});

const createDenoGlobal = (envVars: Record<string, string | undefined> = {}) => ({
	Deno: {
		env: {
			get: (key: string) => envVars[key],
		},
	},
});

const createGlobalEnv = (envVars: Record<string, string | undefined> = {}) => ({
	env: envVars,
});

test('getEnv: should get environment variable in Node.js environment', (t) => {
	const mockGlobal = createNodeGlobal({ TEST_VAR: 'test-value' });
	t.is(getEnv('TEST_VAR', mockGlobal), 'test-value');
});

test('getEnv: should get environment variable in Deno environment', (t) => {
	const mockGlobal = createDenoGlobal({ TEST_VAR: 'test-value' });
	t.is(getEnv('TEST_VAR', mockGlobal), 'test-value');
});

test('getEnv: should get environment variable in global env environment', (t) => {
	const mockGlobal = createGlobalEnv({ TEST_VAR: 'test-value' });
	t.is(getEnv('TEST_VAR', mockGlobal), 'test-value');
});

test('getEnv: should return undefined for non-existent variable', (t) => {
	const mockGlobal = createNodeGlobal();
	t.is(getEnv('NON_EXISTENT_VAR', mockGlobal), undefined);
});

test('getEnv: should return undefined when no environment system is available', (t) => {
	const mockGlobal = {};
	t.is(getEnv('TEST_VAR', mockGlobal), undefined);
});

test('getEnv: should handle empty string values', (t) => {
	const mockGlobal = createNodeGlobal({ EMPTY_VAR: '' });
	t.is(getEnv('EMPTY_VAR', mockGlobal), '');
});

test('getEnv: should handle undefined values', (t) => {
	const mockGlobal = createNodeGlobal({ UNDEFINED_VAR: undefined });
	t.is(getEnv('UNDEFINED_VAR', mockGlobal), undefined);
});

test('getEnv: should work with mixed environment variables', (t) => {
	const mockGlobal = createNodeGlobal({
		NODE_VAR: 'node-value',
		COMMON_VAR: 'node-common',
	});
	t.is(getEnv('NODE_VAR', mockGlobal), 'node-value');
	t.is(getEnv('COMMON_VAR', mockGlobal), 'node-common');
});

test('isDevelopmentMode: should return true when NODE_ENV is development', (t) => {
	const mockGlobal = createNodeGlobal({ NODE_ENV: 'development' });
	t.true(isDevelopmentMode(mockGlobal));
});

test('isDevelopmentMode: should return true when BAETA_ENV is development', (t) => {
	const mockGlobal = createNodeGlobal({ BAETA_ENV: 'development' });
	t.true(isDevelopmentMode(mockGlobal));
});

test('isDevelopmentMode: should return true when ENVIRONMENT is development', (t) => {
	const mockGlobal = createNodeGlobal({ ENVIRONMENT: 'development' });
	t.true(isDevelopmentMode(mockGlobal));
});

test('isDevelopmentMode: should return false when NODE_ENV is production', (t) => {
	const mockGlobal = createNodeGlobal({ NODE_ENV: 'production' });
	t.false(isDevelopmentMode(mockGlobal));
});

test('isDevelopmentMode: should return false when no environment variables are set', (t) => {
	const mockGlobal = createNodeGlobal();
	t.false(isDevelopmentMode(mockGlobal));
});

test('isDevelopmentMode: should prioritize production over development', (t) => {
	const mockGlobal = createNodeGlobal({
		NODE_ENV: 'production',
		BAETA_ENV: 'development',
	});
	t.false(isDevelopmentMode(mockGlobal));
});

test('Environment detection: should correctly identify Node.js environment', (t) => {
	const mockGlobal = createNodeGlobal();
	t.true('process' in mockGlobal);
	t.true('env' in mockGlobal.process);
});

test('Environment detection: should correctly identify Deno environment', (t) => {
	const mockGlobal = createDenoGlobal();
	t.true('Deno' in mockGlobal);
	t.true('env' in mockGlobal.Deno);
});
