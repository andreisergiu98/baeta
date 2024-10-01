import test from 'ava';
import {
	GraphQLField,
	GraphQLFieldConfig,
	GraphQLInputFieldConfig,
	GraphQLInputObjectType,
} from 'graphql';
import {
	ArgumentValidationsExtension,
	ValidationOptions,
	ValidationsExtension,
	addArgumentValidationsExtension,
	addValidateExtension,
	addValidationsExtension,
	getArgumentValidationsFromExtensions,
	getValidationsFromExtension,
	hasArgumentValidationsExtension,
	hasValidateExtension,
	hasValidationsExtension,
	initArgumentValidationsExtension,
	initValidationsExtension,
} from './input-extensions';

function mockEmptyInputConfig() {
	return { extensions: {} } as GraphQLInputObjectType | GraphQLInputFieldConfig;
}

function mockEmtpyInputObject() {
	return { extensions: {} } as GraphQLInputObjectType;
}

function mockEmtpyFieldConfig() {
	return { extensions: {} } as GraphQLFieldConfig<unknown, unknown, unknown>;
}

test('addValidateExtension adds validate extension to type', (t) => {
	const type = mockEmtpyInputObject();
	addValidateExtension(type);
	t.true(hasValidateExtension(type));
});

test('addValidationsExtension adds validations extension to config', (t) => {
	const config = mockEmptyInputConfig();
	const validationOptions: ValidationOptions = { target: 'list', listDepth: 0, fn: () => {} };

	addValidationsExtension(config, 0, validationOptions);
	const extensions = config.extensions as ValidationsExtension;

	t.deepEqual(extensions.validations, [validationOptions]);
});

test('addArgumentValidationsExtension adds argument validations extension to config', (t) => {
	const config = mockEmtpyFieldConfig();
	const validationOptions: ValidationOptions = { target: 'list', listDepth: 0, fn: () => {} };

	addArgumentValidationsExtension(config, 'field', 0, validationOptions);
	const extensions = config.extensions as ArgumentValidationsExtension;

	t.deepEqual(extensions.argumentValidations.field, [validationOptions]);
});

test('initValidationsExtension initializes validations extension on config', (t) => {
	const config = mockEmptyInputConfig();

	const extensions = initValidationsExtension(config);
	t.deepEqual(config.extensions?.validations, []);
	t.is(config.extensions, extensions);
});

test('initArgumentValidationsExtension initializes argument validations extension on config', (t) => {
	const config = mockEmtpyFieldConfig();
	const extensions = initArgumentValidationsExtension(config);

	t.deepEqual(config.extensions?.argumentValidations, {});
	t.is(config.extensions, extensions);
});

test('hasValidateExtension returns true if type has validate extension', (t) => {
	const type = mockEmtpyInputObject();
	addValidateExtension(type);

	t.true(hasValidateExtension(type));
});

test('hasValidateExtension returns false if type does not have validate extension', (t) => {
	const type = mockEmtpyInputObject();
	t.false(hasValidateExtension(type));
});

test('hasValidationsExtension returns true if config has validations extension', (t) => {
	const config = mockEmtpyInputObject();
	addValidationsExtension(config, 0, { target: 'list', listDepth: 0, fn: () => {} });

	t.true(hasValidationsExtension(config));
});

test('hasValidationsExtension returns false if config does not have validations extension', (t) => {
	const config = mockEmtpyInputObject();
	t.false(hasValidationsExtension(config));
});

test('hasArgumentValidationsExtension returns true if config has argument validations extension', (t) => {
	const config = mockEmtpyFieldConfig();
	addArgumentValidationsExtension(config, 'arg', 0, { target: 'list', listDepth: 0, fn: () => {} });

	t.true(
		hasArgumentValidationsExtension(config as unknown as GraphQLField<unknown, unknown, unknown>),
	);
});

test('hasArgumentValidationsExtension returns false if config does not have argument validations extension', (t) => {
	const config = mockEmtpyFieldConfig();
	t.false(
		hasArgumentValidationsExtension(config as unknown as GraphQLField<unknown, unknown, unknown>),
	);
});

test('getValidationsFromExtension returns validations from extension', (t) => {
	const config = mockEmtpyInputObject();
	const validationOptions: ValidationOptions = { target: 'list', listDepth: 0, fn: () => {} };

	addValidationsExtension(config, 0, validationOptions);
	const validations = getValidationsFromExtension(config);

	t.deepEqual(validationOptions, validations?.[0]);
});

test('getArgumentValidationsFromExtensions returns argument validations from extension', (t) => {
	const config = mockEmtpyFieldConfig();
	const validationOptions: ValidationOptions = { target: 'list', listDepth: 0, fn: () => {} };

	addArgumentValidationsExtension(config, 'arg', 0, validationOptions);
	const validations = getArgumentValidationsFromExtensions(
		config as unknown as GraphQLField<unknown, unknown>,
		'arg',
	);

	t.deepEqual(validationOptions, validations?.[0]);
});
