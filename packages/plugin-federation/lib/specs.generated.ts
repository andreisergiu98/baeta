// Auto-generated from https://github.com/apollographql/specs
// Generated on 2026-04-10T23:33:35.550Z

import type { FederationSpec } from './spec.ts';

export const federationV2_0Spec = {
	version: '2.0',
	directives: [
		{
			name: '@key',
			locations: ['OBJECT', 'INTERFACE'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
				{
					name: 'resolvable',
					type: 'Boolean',
					defaultValue: true,
				},
			],
			repeatable: true,
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requires',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@provides',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@external',
			locations: ['OBJECT', 'FIELD_DEFINITION'],
		},
		{
			name: '@shareable',
			locations: ['FIELD_DEFINITION', 'OBJECT'],
		},
		{
			name: '@extends',
			locations: ['OBJECT', 'INTERFACE'],
		},
		{
			name: '@override',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'from',
					type: 'String!',
				},
			],
		},
		{
			name: '@inaccessible',
			locations: [
				'FIELD_DEFINITION',
				'OBJECT',
				'INTERFACE',
				'UNION',
				'ENUM',
				'ENUM_VALUE',
				'SCALAR',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
				'ARGUMENT_DEFINITION',
			],
		},
		{
			name: '@tag',
			locations: [
				'FIELD_DEFINITION',
				'INTERFACE',
				'OBJECT',
				'UNION',
				'ARGUMENT_DEFINITION',
				'SCALAR',
				'ENUM',
				'ENUM_VALUE',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
			],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
	],
} as const satisfies FederationSpec;

export const federationV2_1Spec = {
	version: '2.1',
	directives: [
		{
			name: '@composeDirective',
			locations: ['SCHEMA'],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
		{
			name: '@extends',
			locations: ['OBJECT', 'INTERFACE'],
		},
		{
			name: '@external',
			locations: ['OBJECT', 'FIELD_DEFINITION'],
		},
		{
			name: '@key',
			locations: ['OBJECT', 'INTERFACE'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
				{
					name: 'resolvable',
					type: 'Boolean',
					defaultValue: true,
				},
			],
			repeatable: true,
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@inaccessible',
			locations: [
				'FIELD_DEFINITION',
				'OBJECT',
				'INTERFACE',
				'UNION',
				'ENUM',
				'ENUM_VALUE',
				'SCALAR',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
				'ARGUMENT_DEFINITION',
			],
		},
		{
			name: '@override',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'from',
					type: 'String!',
				},
			],
		},
		{
			name: '@provides',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requires',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@shareable',
			locations: ['FIELD_DEFINITION', 'OBJECT'],
		},
		{
			name: '@tag',
			locations: [
				'FIELD_DEFINITION',
				'INTERFACE',
				'OBJECT',
				'UNION',
				'ARGUMENT_DEFINITION',
				'SCALAR',
				'ENUM',
				'ENUM_VALUE',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
			],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
	],
} as const satisfies FederationSpec;

export const federationV2_2Spec = {
	version: '2.2',
	directives: [
		{
			name: '@composeDirective',
			locations: ['SCHEMA'],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
		{
			name: '@extends',
			locations: ['OBJECT', 'INTERFACE'],
		},
		{
			name: '@external',
			locations: ['OBJECT', 'FIELD_DEFINITION'],
		},
		{
			name: '@key',
			locations: ['OBJECT', 'INTERFACE'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
				{
					name: 'resolvable',
					type: 'Boolean',
					defaultValue: true,
				},
			],
			repeatable: true,
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@inaccessible',
			locations: [
				'FIELD_DEFINITION',
				'OBJECT',
				'INTERFACE',
				'UNION',
				'ENUM',
				'ENUM_VALUE',
				'SCALAR',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
				'ARGUMENT_DEFINITION',
			],
		},
		{
			name: '@override',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'from',
					type: 'String!',
				},
			],
		},
		{
			name: '@provides',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requires',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@shareable',
			locations: ['FIELD_DEFINITION', 'OBJECT'],
			repeatable: true,
		},
		{
			name: '@tag',
			locations: [
				'FIELD_DEFINITION',
				'INTERFACE',
				'OBJECT',
				'UNION',
				'ARGUMENT_DEFINITION',
				'SCALAR',
				'ENUM',
				'ENUM_VALUE',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
			],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
	],
} as const satisfies FederationSpec;

export const federationV2_3Spec = {
	version: '2.3',
	directives: [
		{
			name: '@composeDirective',
			locations: ['SCHEMA'],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
		{
			name: '@extends',
			locations: ['OBJECT', 'INTERFACE'],
		},
		{
			name: '@external',
			locations: ['OBJECT', 'FIELD_DEFINITION'],
		},
		{
			name: '@key',
			locations: ['OBJECT', 'INTERFACE'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
				{
					name: 'resolvable',
					type: 'Boolean',
					defaultValue: true,
				},
			],
			repeatable: true,
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@inaccessible',
			locations: [
				'FIELD_DEFINITION',
				'OBJECT',
				'INTERFACE',
				'UNION',
				'ENUM',
				'ENUM_VALUE',
				'SCALAR',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
				'ARGUMENT_DEFINITION',
			],
		},
		{
			name: '@interfaceObject',
			locations: ['OBJECT'],
		},
		{
			name: '@override',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'from',
					type: 'String!',
				},
			],
		},
		{
			name: '@provides',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requires',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@shareable',
			locations: ['FIELD_DEFINITION', 'OBJECT'],
			repeatable: true,
		},
		{
			name: '@tag',
			locations: [
				'FIELD_DEFINITION',
				'INTERFACE',
				'OBJECT',
				'UNION',
				'ARGUMENT_DEFINITION',
				'SCALAR',
				'ENUM',
				'ENUM_VALUE',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
			],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
	],
} as const satisfies FederationSpec;

export const federationV2_4Spec = {
	version: '2.4',
	directives: [
		{
			name: '@composeDirective',
			locations: ['SCHEMA'],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
		{
			name: '@extends',
			locations: ['OBJECT', 'INTERFACE'],
		},
		{
			name: '@external',
			locations: ['OBJECT', 'FIELD_DEFINITION'],
		},
		{
			name: '@key',
			locations: ['OBJECT', 'INTERFACE'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
				{
					name: 'resolvable',
					type: 'Boolean',
					defaultValue: true,
				},
			],
			repeatable: true,
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@inaccessible',
			locations: [
				'FIELD_DEFINITION',
				'OBJECT',
				'INTERFACE',
				'UNION',
				'ENUM',
				'ENUM_VALUE',
				'SCALAR',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
				'ARGUMENT_DEFINITION',
			],
		},
		{
			name: '@interfaceObject',
			locations: ['OBJECT'],
		},
		{
			name: '@override',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'from',
					type: 'String!',
				},
			],
		},
		{
			name: '@provides',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requires',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@shareable',
			locations: ['FIELD_DEFINITION', 'OBJECT'],
			repeatable: true,
		},
		{
			name: '@tag',
			locations: [
				'FIELD_DEFINITION',
				'INTERFACE',
				'OBJECT',
				'UNION',
				'ARGUMENT_DEFINITION',
				'SCALAR',
				'ENUM',
				'ENUM_VALUE',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
			],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
	],
} as const satisfies FederationSpec;

export const federationV2_5Spec = {
	version: '2.5',
	directives: [
		{
			name: '@authenticated',
			locations: ['ENUM', 'FIELD_DEFINITION', 'INTERFACE', 'OBJECT', 'SCALAR'],
		},
		{
			name: '@composeDirective',
			locations: ['SCHEMA'],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
		{
			name: '@extends',
			locations: ['OBJECT', 'INTERFACE'],
		},
		{
			name: '@external',
			locations: ['OBJECT', 'FIELD_DEFINITION'],
		},
		{
			name: '@key',
			locations: ['OBJECT', 'INTERFACE'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
				{
					name: 'resolvable',
					type: 'Boolean',
					defaultValue: true,
				},
			],
			repeatable: true,
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@inaccessible',
			locations: [
				'FIELD_DEFINITION',
				'OBJECT',
				'INTERFACE',
				'UNION',
				'ENUM',
				'ENUM_VALUE',
				'SCALAR',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
				'ARGUMENT_DEFINITION',
			],
		},
		{
			name: '@interfaceObject',
			locations: ['OBJECT'],
		},
		{
			name: '@override',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'from',
					type: 'String!',
				},
			],
		},
		{
			name: '@provides',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requires',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requiresScopes',
			locations: ['ENUM', 'FIELD_DEFINITION', 'INTERFACE', 'OBJECT', 'SCALAR'],
			args: [
				{
					name: 'scopes',
					type: '[[Scope!]!]!',
				},
			],
			scalars: [
				{
					name: 'Scope',
					serialize: 'string',
				},
			],
		},
		{
			name: '@shareable',
			locations: ['FIELD_DEFINITION', 'OBJECT'],
			repeatable: true,
		},
		{
			name: '@tag',
			locations: [
				'FIELD_DEFINITION',
				'INTERFACE',
				'OBJECT',
				'UNION',
				'ARGUMENT_DEFINITION',
				'SCALAR',
				'ENUM',
				'ENUM_VALUE',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
			],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
	],
} as const satisfies FederationSpec;

export const federationV2_6Spec = {
	version: '2.6',
	directives: [
		{
			name: '@authenticated',
			locations: ['ENUM', 'FIELD_DEFINITION', 'INTERFACE', 'OBJECT', 'SCALAR'],
		},
		{
			name: '@composeDirective',
			locations: ['SCHEMA'],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
		{
			name: '@extends',
			locations: ['OBJECT', 'INTERFACE'],
		},
		{
			name: '@external',
			locations: ['OBJECT', 'FIELD_DEFINITION'],
		},
		{
			name: '@key',
			locations: ['OBJECT', 'INTERFACE'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
				{
					name: 'resolvable',
					type: 'Boolean',
					defaultValue: true,
				},
			],
			repeatable: true,
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@inaccessible',
			locations: [
				'FIELD_DEFINITION',
				'OBJECT',
				'INTERFACE',
				'UNION',
				'ENUM',
				'ENUM_VALUE',
				'SCALAR',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
				'ARGUMENT_DEFINITION',
			],
		},
		{
			name: '@interfaceObject',
			locations: ['OBJECT'],
		},
		{
			name: '@override',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'from',
					type: 'String!',
				},
			],
		},
		{
			name: '@policy',
			locations: ['ENUM', 'FIELD_DEFINITION', 'INTERFACE', 'OBJECT', 'SCALAR'],
			args: [
				{
					name: 'policies',
					type: '[[Policy!]!]!',
				},
			],
			scalars: [
				{
					name: 'Policy',
					serialize: 'string',
				},
			],
		},
		{
			name: '@provides',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requires',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requiresScopes',
			locations: ['ENUM', 'FIELD_DEFINITION', 'INTERFACE', 'OBJECT', 'SCALAR'],
			args: [
				{
					name: 'scopes',
					type: '[[Scope!]!]!',
				},
			],
			scalars: [
				{
					name: 'Scope',
					serialize: 'string',
				},
			],
		},
		{
			name: '@shareable',
			locations: ['FIELD_DEFINITION', 'OBJECT'],
			repeatable: true,
		},
		{
			name: '@tag',
			locations: [
				'FIELD_DEFINITION',
				'INTERFACE',
				'OBJECT',
				'UNION',
				'ARGUMENT_DEFINITION',
				'SCALAR',
				'ENUM',
				'ENUM_VALUE',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
			],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
	],
} as const satisfies FederationSpec;

export const federationV2_7Spec = {
	version: '2.7',
	directives: [
		{
			name: '@authenticated',
			locations: ['ENUM', 'FIELD_DEFINITION', 'INTERFACE', 'OBJECT', 'SCALAR'],
		},
		{
			name: '@composeDirective',
			locations: ['SCHEMA'],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
		{
			name: '@extends',
			locations: ['OBJECT', 'INTERFACE'],
		},
		{
			name: '@external',
			locations: ['OBJECT', 'FIELD_DEFINITION'],
		},
		{
			name: '@key',
			locations: ['OBJECT', 'INTERFACE'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
				{
					name: 'resolvable',
					type: 'Boolean',
					defaultValue: true,
				},
			],
			repeatable: true,
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@inaccessible',
			locations: [
				'FIELD_DEFINITION',
				'OBJECT',
				'INTERFACE',
				'UNION',
				'ENUM',
				'ENUM_VALUE',
				'SCALAR',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
				'ARGUMENT_DEFINITION',
			],
		},
		{
			name: '@interfaceObject',
			locations: ['OBJECT'],
		},
		{
			name: '@override',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'from',
					type: 'String!',
				},
				{
					name: 'label',
					type: 'String',
				},
			],
		},
		{
			name: '@policy',
			locations: ['ENUM', 'FIELD_DEFINITION', 'INTERFACE', 'OBJECT', 'SCALAR'],
			args: [
				{
					name: 'policies',
					type: '[[Policy!]!]!',
				},
			],
			scalars: [
				{
					name: 'Policy',
					serialize: 'string',
				},
			],
		},
		{
			name: '@provides',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requires',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requiresScopes',
			locations: ['ENUM', 'FIELD_DEFINITION', 'INTERFACE', 'OBJECT', 'SCALAR'],
			args: [
				{
					name: 'scopes',
					type: '[[Scope!]!]!',
				},
			],
			scalars: [
				{
					name: 'Scope',
					serialize: 'string',
				},
			],
		},
		{
			name: '@shareable',
			locations: ['FIELD_DEFINITION', 'OBJECT'],
			repeatable: true,
		},
		{
			name: '@tag',
			locations: [
				'FIELD_DEFINITION',
				'INTERFACE',
				'OBJECT',
				'UNION',
				'ARGUMENT_DEFINITION',
				'SCALAR',
				'ENUM',
				'ENUM_VALUE',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
			],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
	],
} as const satisfies FederationSpec;

export const federationV2_8Spec = {
	version: '2.8',
	directives: [
		{
			name: '@authenticated',
			locations: ['ENUM', 'FIELD_DEFINITION', 'INTERFACE', 'OBJECT', 'SCALAR'],
		},
		{
			name: '@composeDirective',
			locations: ['SCHEMA'],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
		{
			name: '@context',
			locations: ['OBJECT', 'INTERFACE', 'UNION'],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
		},
		{
			name: '@extends',
			locations: ['OBJECT', 'INTERFACE'],
		},
		{
			name: '@external',
			locations: ['OBJECT', 'FIELD_DEFINITION'],
		},
		{
			name: '@fromContext',
			locations: ['ARGUMENT_DEFINITION'],
			args: [
				{
					name: 'field',
					type: 'ContextFieldValue',
				},
			],
			scalars: [
				{
					name: 'ContextFieldValue',
					serialize: 'string',
				},
			],
		},
		{
			name: '@key',
			locations: ['OBJECT', 'INTERFACE'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
				{
					name: 'resolvable',
					type: 'Boolean',
					defaultValue: true,
				},
			],
			repeatable: true,
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@inaccessible',
			locations: [
				'FIELD_DEFINITION',
				'OBJECT',
				'INTERFACE',
				'UNION',
				'ENUM',
				'ENUM_VALUE',
				'SCALAR',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
				'ARGUMENT_DEFINITION',
			],
		},
		{
			name: '@interfaceObject',
			locations: ['OBJECT'],
		},
		{
			name: '@override',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'from',
					type: 'String!',
				},
				{
					name: 'label',
					type: 'String',
				},
			],
		},
		{
			name: '@policy',
			locations: ['ENUM', 'FIELD_DEFINITION', 'INTERFACE', 'OBJECT', 'SCALAR'],
			args: [
				{
					name: 'policies',
					type: '[[Policy!]!]!',
				},
			],
			scalars: [
				{
					name: 'Policy',
					serialize: 'string',
				},
			],
		},
		{
			name: '@provides',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requires',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requiresScopes',
			locations: ['ENUM', 'FIELD_DEFINITION', 'INTERFACE', 'OBJECT', 'SCALAR'],
			args: [
				{
					name: 'scopes',
					type: '[[Scope!]!]!',
				},
			],
			scalars: [
				{
					name: 'Scope',
					serialize: 'string',
				},
			],
		},
		{
			name: '@shareable',
			locations: ['FIELD_DEFINITION', 'OBJECT'],
			repeatable: true,
		},
		{
			name: '@tag',
			locations: [
				'FIELD_DEFINITION',
				'INTERFACE',
				'OBJECT',
				'UNION',
				'ARGUMENT_DEFINITION',
				'SCALAR',
				'ENUM',
				'ENUM_VALUE',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
			],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
	],
} as const satisfies FederationSpec;

export const federationV2_9Spec = {
	version: '2.9',
	directives: [
		{
			name: '@authenticated',
			locations: ['ENUM', 'FIELD_DEFINITION', 'INTERFACE', 'OBJECT', 'SCALAR'],
		},
		{
			name: '@composeDirective',
			locations: ['SCHEMA'],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
		{
			name: '@context',
			locations: ['OBJECT', 'INTERFACE', 'UNION'],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
		},
		{
			name: '@cost',
			locations: [
				'ARGUMENT_DEFINITION',
				'ENUM',
				'FIELD_DEFINITION',
				'INPUT_FIELD_DEFINITION',
				'OBJECT',
				'SCALAR',
			],
			args: [
				{
					name: 'weight',
					type: 'Int!',
				},
			],
		},
		{
			name: '@extends',
			locations: ['OBJECT', 'INTERFACE'],
		},
		{
			name: '@external',
			locations: ['OBJECT', 'FIELD_DEFINITION'],
		},
		{
			name: '@fromContext',
			locations: ['ARGUMENT_DEFINITION'],
			args: [
				{
					name: 'field',
					type: 'ContextFieldValue',
				},
			],
			scalars: [
				{
					name: 'ContextFieldValue',
					serialize: 'string',
				},
			],
		},
		{
			name: '@key',
			locations: ['OBJECT', 'INTERFACE'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
				{
					name: 'resolvable',
					type: 'Boolean',
					defaultValue: true,
				},
			],
			repeatable: true,
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@inaccessible',
			locations: [
				'FIELD_DEFINITION',
				'OBJECT',
				'INTERFACE',
				'UNION',
				'ENUM',
				'ENUM_VALUE',
				'SCALAR',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
				'ARGUMENT_DEFINITION',
			],
		},
		{
			name: '@interfaceObject',
			locations: ['OBJECT'],
		},
		{
			name: '@listSize',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'assumedSize',
					type: 'Int',
				},
				{
					name: 'slicingArguments',
					type: '[String!]',
				},
				{
					name: 'sizedFields',
					type: '[String!]',
				},
				{
					name: 'requireOneSlicingArgument',
					type: 'Boolean',
					defaultValue: true,
				},
			],
		},
		{
			name: '@override',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'from',
					type: 'String!',
				},
				{
					name: 'label',
					type: 'String',
				},
			],
		},
		{
			name: '@policy',
			locations: ['ENUM', 'FIELD_DEFINITION', 'INTERFACE', 'OBJECT', 'SCALAR'],
			args: [
				{
					name: 'policies',
					type: '[[Policy!]!]!',
				},
			],
			scalars: [
				{
					name: 'Policy',
					serialize: 'string',
				},
			],
		},
		{
			name: '@provides',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requires',
			locations: ['FIELD_DEFINITION'],
			args: [
				{
					name: 'fields',
					type: 'FieldSet!',
				},
			],
			scalars: [
				{
					name: 'FieldSet',
					serialize: 'string',
				},
			],
		},
		{
			name: '@requiresScopes',
			locations: ['ENUM', 'FIELD_DEFINITION', 'INTERFACE', 'OBJECT', 'SCALAR'],
			args: [
				{
					name: 'scopes',
					type: '[[Scope!]!]!',
				},
			],
			scalars: [
				{
					name: 'Scope',
					serialize: 'string',
				},
			],
		},
		{
			name: '@shareable',
			locations: ['FIELD_DEFINITION', 'OBJECT'],
			repeatable: true,
		},
		{
			name: '@tag',
			locations: [
				'FIELD_DEFINITION',
				'INTERFACE',
				'OBJECT',
				'UNION',
				'ARGUMENT_DEFINITION',
				'SCALAR',
				'ENUM',
				'ENUM_VALUE',
				'INPUT_OBJECT',
				'INPUT_FIELD_DEFINITION',
			],
			args: [
				{
					name: 'name',
					type: 'String!',
				},
			],
			repeatable: true,
		},
	],
} as const satisfies FederationSpec;

export const federationSpecs = [
	federationV2_0Spec,
	federationV2_1Spec,
	federationV2_2Spec,
	federationV2_3Spec,
	federationV2_4Spec,
	federationV2_5Spec,
	federationV2_6Spec,
	federationV2_7Spec,
	federationV2_8Spec,
	federationV2_9Spec,
] as const;
