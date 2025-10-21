import { pascalCase } from 'change-case-all';
import {
	type EnumTypeDefinitionNode,
	type FieldDefinitionNode,
	type InputObjectTypeDefinitionNode,
	type InputValueDefinitionNode,
	type InterfaceTypeDefinitionNode,
	Kind,
	type ListTypeNode,
	type NamedTypeNode,
	type ObjectTypeDefinitionNode,
	type TypeNode,
	type UnionTypeDefinitionNode,
} from 'graphql';
import { isScalarType } from '../../utils/scalar.ts';
import type { DefinitionsMap } from '../visitors/definitions-map.ts';
import { buildBlock, indent } from './printer-utils.ts';

export interface PrinterConfig {
	globalDefinitions: DefinitionsMap;
	withMaybe: boolean;
	withOptional: boolean;
	defaultScalars: string[];
}

export function printUtilityTypes(): string {
	return [
		'export type Or<A, B> = void extends A ? B : A;',
		'export type Maybe<T> = T | null;',
	].join('\n\n');
}

const defaultScalarTypes: Record<string, string | undefined> = {
	ID: 'string',
	String: 'string',
	Boolean: 'boolean',
	Int: 'number',
	Float: 'number',
};

export function printBaseScalars(config: PrinterConfig): string {
	const defaultScalars = config.defaultScalars
		.map((scalar) => {
			const type = defaultScalarTypes[scalar];
			if (type == null) return null;
			return `${scalar}: ${type};`;
		})
		.filter((el) => el != null);
	const customScalars = [...config.globalDefinitions.scalarTypeMap.values()].map(
		(scalar) => `${scalar.name.value}: unknown;`,
	);

	return buildBlock({
		name: 'export type BaseScalars =',
		lines: [...defaultScalars, ...customScalars],
	});
}

export function printBaseObjectTypes(config: PrinterConfig): string {
	const objectTypes = [...config.globalDefinitions.objectTypeMap.values()].map((t) => t.name.value);
	return buildBlock({
		name: 'export interface BaseObjectTypes',
		lines: objectTypes.map((t) => `${t}: unknown;`),
	});
}

export function printTypesHeaders(): string {
	return [
		'import * as BaetaUtility from "./utility.ts";',
		'import * as BaetaOverrides from "../modules/types.ts";',
		'',
		'export type Scalars = BaetaOverrides.Scalars;',
	].join('\n');
}

export function printRootTypesFromMap(
	config: PrinterConfig,
	rootTypes: string[],
	map: Map<string, ObjectTypeDefinitionNode>,
) {
	return [...map.values()]
		.filter((type) => rootTypes.includes(type.name.value))
		.map((type) => printObjectType(config, type))
		.join('\n\n');
}

export function printObjectTypeTypesFromMap(
	config: PrinterConfig,
	map: Map<string, ObjectTypeDefinitionNode>,
) {
	return [...map.values()].map((type) => printObjectType(config, type));
}

function printObjectType(config: PrinterConfig, type: ObjectTypeDefinitionNode) {
	const fields = type.fields?.map((field) => printObjectTypeField(config, field));
	return `export type ${type.name.value} = ${printOrObjectType(type, fields)}`;
}

function printObjectTypeField(config: PrinterConfig, field: FieldDefinitionNode) {
	const optionalMarker = printOptionalMarker(config, field.type);
	return `${field.name.value}${optionalMarker}: ${printType(config, field.type)}`;
}

export function printEnumTypesFromMap(map: Map<string, EnumTypeDefinitionNode>) {
	return [...map.values()].map(printEnumType);
}

function printEnumType(type: EnumTypeDefinitionNode) {
	const values = type.values?.map((value) => `'${value.name.value}'`);
	return `export type ${type.name.value} = ${values?.join(' | ') || 'never'}`;
}

export function printInterfaceTypesFromMap(
	config: PrinterConfig,
	map: Map<string, InterfaceTypeDefinitionNode>,
) {
	return [...map.values()].map((type) => printInterfaceType(config, type));
}

function printInterfaceType(config: PrinterConfig, type: InterfaceTypeDefinitionNode) {
	const objectTypes = Array.from(config.globalDefinitions.objectTypeMap.values());
	const implementingTypes = objectTypes.filter((t) =>
		t.interfaces?.some((i) => i.name.value === type.name.value),
	);
	const types = implementingTypes.map((t) => printNamedTypeForInterface(t.name.value));
	return `export type ${type.name.value} = ${types.join(' | ') || 'never'}`;
}

function printNamedTypeForInterface(name: string) {
	return `${name} & {__typename: "${name}"}`;
}

export function printUnionTypesFromMap(
	config: PrinterConfig,
	map: Map<string, UnionTypeDefinitionNode>,
) {
	return [...map.values()].map((type) => printUnionType(config, type));
}

function printUnionType(config: PrinterConfig, type: UnionTypeDefinitionNode) {
	const types = type.types?.map((type) => printNamedTypeForUnion(config, type));
	return `export type ${type.name.value} = ${types?.join(' | ') || 'never'}`;
}

function printNamedTypeForUnion(config: PrinterConfig, type: NamedTypeNode) {
	return `${printNamedType(config, type, false)} & {__typename: "${type.name.value}"}`;
}

export function printInputObjectTypeTypesFromMap(
	config: PrinterConfig,
	map: Map<string, InputObjectTypeDefinitionNode>,
) {
	return [...map.values()].map((type) => printInputObjectType(config, type));
}

function printInputObjectType(config: PrinterConfig, type: InputObjectTypeDefinitionNode) {
	const fields = type.fields?.map((field) => printInputObjectTypeField(config, field));
	return buildBlock({
		name: `export type ${type.name.value} =`,
		lines: fields ?? [],
	});
}

function printInputObjectTypeField(config: PrinterConfig, field: InputValueDefinitionNode) {
	const optionalMarker = printOptionalMarker(config, field.type);
	return `${field.name.value}${optionalMarker}: ${printType(config, field.type)}`;
}

export function printObjectTypeFieldsArgsFromMap(
	config: PrinterConfig,
	map: Map<string, ObjectTypeDefinitionNode>,
) {
	return [...map.values()].flatMap((type) => printObjectTypeArgs(config, type));
}

function printObjectTypeArgs(config: PrinterConfig, type: ObjectTypeDefinitionNode) {
	if (type.fields == null) {
		return [];
	}
	return type.fields
		.map((field) => printObjectTypeFieldArgs(config, type.name.value, field))
		.filter(Boolean);
}

function printObjectTypeFieldArgs(
	config: PrinterConfig,
	typeName: string,
	field: FieldDefinitionNode,
) {
	const name = `${typeName + pascalCase(field.name.value)}Args`;
	return buildBlock({
		name: `export type ${name} =`,
		lines: field.arguments?.map((arg) => printObjectTypeFieldArg(config, arg)) ?? [],
	});
}

function printObjectTypeFieldArg(config: PrinterConfig, arg: InputValueDefinitionNode) {
	return `${arg.name.value}: ${printType(config, arg.type)}`;
}

function printType(config: PrinterConfig, type: TypeNode, nullable = true): string {
	switch (type.kind) {
		case Kind.NAMED_TYPE:
			return printNamedType(config, type, nullable);
		case Kind.LIST_TYPE:
			return printListType(config, type, nullable);
		case Kind.NON_NULL_TYPE:
			return printType(config, type.type, false);
		default:
			return type satisfies never;
	}
}

function printListType(config: PrinterConfig, type: ListTypeNode, nullable = true): string {
	return printValue(config, `Array<${printType(config, type.type)}>`, nullable);
}

function printNamedType(config: PrinterConfig, type: NamedTypeNode, nullable = true): string {
	if (isScalarType(config.globalDefinitions, config.defaultScalars, type)) {
		return printScalarType(config, type, nullable);
	}
	return printValue(config, type.name.value, nullable);
}

function printScalarType(config: PrinterConfig, type: NamedTypeNode, nullable = true): string {
	return printValue(config, `Scalars["${type.name.value}"]`, nullable);
}

function printValue(config: PrinterConfig, value: string, nullable: boolean): string {
	if (!nullable) {
		return value;
	}
	if (config.withMaybe) {
		return `BaetaUtility.Maybe<${value}>`;
	}
	return `${value} | null`;
}

function printOptionalMarker(config: PrinterConfig, type: TypeNode): string {
	return config.withOptional && type.kind !== Kind.NON_NULL_TYPE ? '?' : '';
}

function printOrObjectType(type: ObjectTypeDefinitionNode, fields?: string[]): string {
	return `BaetaUtility.Or<BaetaOverrides.ObjectTypes["${type.name.value}"], {\n${fields?.map(indent(2)).join('\n') ?? ''}\n}>`;
}
