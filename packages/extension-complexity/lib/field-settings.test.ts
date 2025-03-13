import test from '@baeta/testing';
import { sinon } from '@baeta/testing';
import type { FieldNode, GraphQLField, GraphQLNamedType, GraphQLResolveInfo } from 'graphql';
import {
	type FieldSettingsMap,
	type GetFieldSettingsArgs,
	getFieldComplexitySettings,
	registerFieldSettingsSetter,
} from './field-settings.ts';

const mockFieldName = 'testField';
const mockType = { name: 'TestType' } as unknown as GraphQLNamedType;
const mockField = {
	type: { toString: () => 'String' },
	args: [],
} as unknown as GraphQLField<unknown, unknown>;
const mockSelection = {
	name: { value: mockFieldName },
	arguments: [],
} as unknown as FieldNode;
const mockInfo = { variableValues: {} } as unknown as GraphQLResolveInfo;

test('getFieldComplexitySettings should return type-specific field settings', (t) => {
	const map: FieldSettingsMap = {};
	const expectedSettings = { complexity: 5 };
	const settingsFn = () => expectedSettings;

	registerFieldSettingsSetter('TestType', mockFieldName, settingsFn, map);

	const result = getFieldComplexitySettings(
		{},
		mockInfo,
		mockType,
		mockField,
		mockSelection,
		mockFieldName,
		map,
	);

	t.deepEqual(result, expectedSettings);
});

test('getFieldComplexitySettings should fallback to wildcard settings', (t) => {
	const map: FieldSettingsMap = {};
	const expectedSettings = { complexity: 3 };
	const wildcardFn = () => expectedSettings;

	registerFieldSettingsSetter('TestType', '*', wildcardFn, map);

	const result = getFieldComplexitySettings(
		{},
		mockInfo,
		mockType,
		mockField,
		mockSelection,
		'unknownField',
		map,
	);

	t.deepEqual(result, expectedSettings);
});

test('getFieldComplexitySettings should return undefined when no settings found', (t) => {
	const map: FieldSettingsMap = {};

	const result = getFieldComplexitySettings(
		{},
		mockInfo,
		mockType,
		mockField,
		mockSelection,
		'unknownField',
		map,
	);

	t.is(result, undefined);
});

test('getFieldComplexitySettings should call the settings function', (t) => {
	const map: FieldSettingsMap = {};

	const settingsFn = sinon.spy((_params: GetFieldSettingsArgs<unknown, unknown>) => {
		return { complexity: 11 };
	});

	registerFieldSettingsSetter('TestType', mockFieldName, settingsFn, map);

	const result = getFieldComplexitySettings(
		{},
		mockInfo,
		mockType,
		mockField,
		mockSelection,
		mockFieldName,
		map,
	);

	t.deepEqual(result, { complexity: 11 });
	t.is(settingsFn.called, true);
});
